import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { mkdtemp, readdir, readFile, unlink, rmdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { tmpdir } from "node:os";
import { createRequire } from "node:module";
import ts from "typescript";

// Exercise the real server-side booking flow; the public portfolio build uses demo mode.
process.env.NEXT_PUBLIC_PORTFOLIO_DEMO = "false";

// Execute the actual TypeScript modules without an additional test dependency.
const require = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, "..");
const cache = new Map();
function load(filename) {
  const file = path.resolve(root, filename);
  if (cache.has(file)) return cache.get(file).exports;
  const testModule = { exports: {} }; cache.set(file, testModule);
  const output = ts.transpileModule(readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  const localRequire = (id) => {
    if (id.startsWith("@/") || id.startsWith(".")) {
      let target = id.startsWith("@/") ? path.join(root, id.slice(2)) : path.resolve(path.dirname(file), id);
      if (existsSync(`${target}.ts`)) target += ".ts";
      return load(target);
    }
    return require(id);
  };
  new Function("require", "module", "exports", "__filename", "__dirname", output)(localRequire, testModule, testModule.exports, file, path.dirname(file));
  return testModule.exports;
}
const { clinicDate, bookingDates, bookingTimes } = load("lib/booking.ts");
const { appointmentSchema, quickAppointmentSchema, contactSchema, appointmentRequestSchema } = load("lib/validation.ts");
const { formatPhone } = load("lib/utils.ts");
const { receiveLead } = load("lib/leads.ts");
const { NextRequest } = require("next/server");
const base = { name: "Тестовый пациент", phone: "+7 (700) 000-00-01", consent: true };
const date = bookingDates()[0].value;
const appointment = { ...base, service: "therapy", doctor: "ivanova", date, time: bookingTimes(date)[0] };

test("phone validation rejects punctuation and incomplete numbers", () => {
  for (const phone of ["----------", "+7 (123) 45", "", "abcdefghij", "+1 (700) 000-00-01"]) {
    assert.equal(quickAppointmentSchema.safeParse({ ...base, phone }).success, false);
  }
  assert.equal(quickAppointmentSchema.safeParse(base).success, true);
  assert.equal(quickAppointmentSchema.safeParse({ ...base, consent: false }).success, false);
  assert.equal(formatPhone(""), "");
  assert.equal(formatPhone("87001234567"), "+7 (700) 123-45-67");
});
test("dates use the clinic timezone at the UTC day boundary", () => {
  assert.equal(clinicDate(new Date("2026-10-03T21:00:00Z")), "2026-10-04");
  const dates = bookingDates(new Date("2026-10-03T21:00:00Z"));
  assert.equal(dates[0].value, "2026-10-05");
  assert.equal(dates.at(-1).value, "2026-10-18");
  assert.equal(new Set(dates.map((d) => d.value)).size, 14);
});
test("weekend and weekday hours differ; invalid calendar dates are rejected", () => {
  assert.equal(bookingTimes("2026-10-04")[0], "10:00");
  assert.equal(bookingTimes("2026-10-04").at(-1), "17:30");
  assert.equal(bookingTimes("2026-10-05")[0], "09:00");
  assert.equal(bookingTimes("2026-10-05").at(-1), "20:30");
  assert.deepEqual(bookingTimes("2026-02-30"), []);
});
test("appointments reject unknown services, mismatched doctors and stale dates", () => {
  assert.equal(appointmentSchema.safeParse(appointment).success, true);
  for (const invalid of [{ service: "invented" }, { doctor: "kozlova" }, { date: "2020-01-01" }, { time: "23:00" }, { consent: false }]) {
    assert.equal(appointmentSchema.safeParse({ ...appointment, ...invalid }).success, false);
  }
  assert.equal(appointmentRequestSchema.safeParse({ kind: "callback", data: base }).success, true);
  assert.equal(appointmentSchema.safeParse({ ...appointment, date: "Ближайшее время", time: "Любое" }).success, false);
  assert.equal(contactSchema.safeParse({ ...base, message: "x" }).success, false);
});
function request(body, headers = {}) {
  return new NextRequest("http://localhost:3000/api/appointment", { method: "POST", headers: { "content-type": "application/json", ...headers }, body: typeof body === "string" ? body : JSON.stringify(body) });
}
test("API saves the exact enquiry and returns a WhatsApp draft, never a sent confirmation", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "dentalux-test-"));
  const previous = process.env.LEADS_DIRECTORY;
  process.env.LEADS_DIRECTORY = directory;
  try {
    const response = await receiveLead(request({ kind: "appointment", data: appointment }), appointmentRequestSchema, "appointment");
    assert.equal(response.status, 201);
    const result = await response.json();
    assert.equal(result.success, true);
    const saved = JSON.parse(await readFile(path.join(directory, `${result.id}.json`), "utf8"));
    assert.deepEqual(saved.data, appointment);
    assert.equal(saved.status, "pending_whatsapp");
    const url = new URL(result.whatsappUrl);
    assert.equal(url.hostname, "wa.me");
    assert.ok(url.searchParams.get("text").includes("Терапия"));
    assert.ok(url.searchParams.get("text").includes(appointment.date));
    assert.ok(url.searchParams.get("text").includes(result.id));
  } finally {
    for (const file of await readdir(directory)) await unlink(path.join(directory, file));
    await rmdir(directory);
    if (previous === undefined) delete process.env.LEADS_DIRECTORY; else process.env.LEADS_DIRECTORY = previous;
  }
});
test("API rejects malformed JSON, foreign origins, wrong content type and oversized bodies", async () => {
  assert.equal((await receiveLead(request("{"), appointmentRequestSchema, "appointment")).status, 400);
  assert.equal((await receiveLead(request({}, { origin: "https://untrusted.example" }), appointmentRequestSchema, "appointment")).status, 403);
  assert.equal((await receiveLead(request({}, { "content-type": "text/plain" }), appointmentRequestSchema, "appointment")).status, 415);
  assert.equal((await receiveLead(request("x".repeat(20_000)), appointmentRequestSchema, "appointment")).status, 413);
  assert.equal((await receiveLead(request({ kind: "callback", data: { ...base, phone: "----------" } }), appointmentRequestSchema, "appointment")).status, 400);
});
test("storage failure returns an error instead of a false success", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "dentalux-test-"));
  const blocker = path.join(directory, "not-a-directory");
  await writeFile(blocker, "fixture");
  const previous = process.env.LEADS_DIRECTORY;
  process.env.LEADS_DIRECTORY = blocker;
  try {
    const response = await receiveLead(request({ kind: "callback", data: { ...base, phone: "+77000000002" } }), appointmentRequestSchema, "appointment");
    assert.equal(response.status, 503);
    assert.equal((await response.json()).success, false);
  } finally {
    await unlink(blocker); await rmdir(directory);
    if (previous === undefined) delete process.env.LEADS_DIRECTORY; else process.env.LEADS_DIRECTORY = previous;
  }
});
test("repeated valid submissions are throttled", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "dentalux-test-"));
  const previous = process.env.LEADS_DIRECTORY;
  process.env.LEADS_DIRECTORY = directory;
  try {
    const body = { kind: "callback", data: { ...base, phone: "+77000000003" } };
    for (let i = 0; i < 3; i++) assert.equal((await receiveLead(request(body), appointmentRequestSchema, "appointment")).status, 201);
    assert.equal((await receiveLead(request(body), appointmentRequestSchema, "appointment")).status, 429);
    assert.equal((await readdir(directory)).length, 3);
  } finally {
    for (const file of await readdir(directory)) await unlink(path.join(directory, file));
    await rmdir(directory);
    if (previous === undefined) delete process.env.LEADS_DIRECTORY; else process.env.LEADS_DIRECTORY = previous;
  }
});
