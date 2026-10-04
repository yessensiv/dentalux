export const CLINIC_TIMEZONE = "Asia/Almaty";

export function clinicDate(now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: CLINIC_TIMEZONE, year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now);
  const part = (type: string) => parts.find((p) => p.type === type)?.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}

export function bookingDates(now = new Date()) {
  const today = new Date(`${clinicDate(now)}T12:00:00+05:00`);
  return Array.from({ length: 14 }, (_, i) => {
    const date = new Date(today.getTime() + (i + 1) * 86400000);
    return {
      value: clinicDate(date),
      label: date.toLocaleDateString("ru-RU", { timeZone: CLINIC_TIMEZONE, weekday: "short", day: "numeric", month: "short" }),
    };
  });
}

// Preferred times for an enquiry, not a live availability calendar.
export function bookingTimes(date: string): string[] {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return [];
  const parsed = new Date(`${date}T12:00:00+05:00`);
  if (Number.isNaN(parsed.getTime()) || clinicDate(parsed) !== date) return [];
  const weekend = [0, 6].includes(parsed.getUTCDay());
  const start = weekend ? 10 : 9;
  const end = weekend ? 18 : 21;
  return Array.from({ length: (end - start) * 2 }, (_, i) =>
    `${String(start + Math.floor(i / 2)).padStart(2, "0")}:${i % 2 ? "30" : "00"}`,
  );
}
