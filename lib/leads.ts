import { randomUUID, createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";
import type { ZodType } from "zod";
import { services } from "@/data/services";
import { doctors } from "@/data/doctors";
import { CLINIC_INFO } from "./utils";
import { PORTFOLIO_DEMO } from "./demo";

const recent = new Map<string, number[]>();
const MAX_BODY_BYTES = 16_384;

async function readBody(request: NextRequest) {
  if (!request.body) throw new Error("empty");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY_BYTES) { await reader.cancel(); throw new Error("large"); }
    chunks.push(value);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function whatsappText(kind: string, data: Record<string, unknown>, id: string) {
  const lines = ["Здравствуйте! Заявка с сайта DentaLux.", `Номер заявки: ${id}`, `Имя: ${data.name}`, `Телефон: ${data.phone}`];
  if (kind === "appointment") {
    lines.push(`Услуга: ${services.find((s) => s.id === data.service)?.title}`);
    lines.push(`Врач: ${doctors.find((d) => d.id === data.doctor)?.name ?? "Любой подходящий специалист"}`);
    lines.push(`Желаемые дата и время: ${data.date}, ${data.time} (Алматы)`);
    if (data.comment) lines.push(`Комментарий: ${data.comment}`);
    lines.push("Пожалуйста, подтвердите возможность записи.");
  } else if (kind === "contact") {
    if (data.email) lines.push(`Email: ${data.email}`);
    lines.push(`Сообщение: ${data.message}`);
  } else lines.push("Хочу записаться на консультацию. Свяжитесь со мной, пожалуйста.");
  return lines.join("\n");
}

export async function receiveLead<T>(request: NextRequest, schema: ZodType<T>, kind: "appointment" | "contact") {
  if (PORTFOLIO_DEMO) {
    return NextResponse.json({ success: false, message: "Это демо-сайт. Заявки не принимаются." }, { status: 403 });
  }
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) {
    return NextResponse.json({ success: false, message: "Отправьте форму с сайта клиники" }, { status: 403 });
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ success: false, message: "Нужен формат JSON" }, { status: 415 });
  }
  let body: unknown;
  try { body = await readBody(request); } catch (error) {
    const large = error instanceof Error && error.message === "large";
    return NextResponse.json({ success: false, message: large ? "Сообщение слишком большое" : "Некорректный запрос" }, { status: large ? 413 : 400 });
  }
  const result = schema.safeParse(body);
  if (!result.success) return NextResponse.json({ success: false, errors: result.error.flatten().fieldErrors, message: "Проверьте поля формы" }, { status: 400 });
  const envelope = result.data as Record<string, unknown>;
  const leadKind = kind === "contact" ? "contact" : String(envelope.kind);
  const data = (kind === "contact" ? envelope : envelope.data) as Record<string, unknown>;
  const key = createHash("sha256").update(String(data.phone).replace(/\D/g, "")).digest("hex");
  const now = Date.now();
  for (const [entry, times] of recent) if (times.at(-1)! < now - 600_000) recent.delete(entry);
  const times = (recent.get(key) ?? []).filter((time) => time > now - 600_000);
  if (times.length >= 3 || recent.size >= 10_000) {
    return NextResponse.json({ success: false, message: "Слишком много заявок. Попробуйте через 10 минут или напишите в WhatsApp напрямую." }, { status: 429, headers: { "Retry-After": "600" } });
  }
  recent.set(key, [...times, now]);
  try {
    const number = CLINIC_INFO.whatsapp;
    if (!/^[1-9]\d{9,14}$/.test(number)) throw new Error("invalid WhatsApp configuration");
    // A serverless temporary filesystem must never masquerade as persistent storage.
    if (process.env.NODE_ENV === "production" && !process.env.LEADS_DIRECTORY) throw new Error("LEADS_DIRECTORY required in production");
    // Runtime storage is provisioned separately; never bundle patient files.
    const directory = path.resolve(/*turbopackIgnore: true*/ process.env.LEADS_DIRECTORY ?? path.join(process.cwd(), ".private", "leads"));
    await mkdir(directory, { recursive: true, mode: 0o700 });
    const id = randomUUID();
    await writeFile(path.join(directory, `${id}.json`), JSON.stringify({ id, kind: leadKind, createdAt: new Date().toISOString(), status: "pending_whatsapp", data }, null, 2), { flag: "wx", mode: 0o600 });
    return NextResponse.json({ success: true, id, whatsappUrl: `https://wa.me/${number}?text=${encodeURIComponent(whatsappText(leadKind, data, id))}` }, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch {
    // No patient names, phone numbers or message bodies in server logs.
    console.error("Unable to persist clinic enquiry. Check storage and WhatsApp configuration.");
    return NextResponse.json({ success: false, message: "Не удалось сохранить заявку. Попробуйте позже или напишите в WhatsApp напрямую." }, { status: 503 });
  }
}
