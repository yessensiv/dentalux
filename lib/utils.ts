export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length <= 1) return /^[78]$/.test(digits) ? "+7" : `+7${digits}`;
  
  let formatted = "+7";
  const rest = digits.startsWith("7") || digits.startsWith("8") ? digits.slice(1) : digits;
  
  if (rest.length > 0) formatted += ` (${rest.slice(0, 3)}`;
  if (rest.length >= 3) formatted += `)`;
  if (rest.length > 3) formatted += ` ${rest.slice(3, 6)}`;
  if (rest.length > 6) formatted += `-${rest.slice(6, 8)}`;
  if (rest.length > 8) formatted += `-${rest.slice(8, 10)}`;
  
  return formatted;
}

export const CLINIC_INFO = {
  name: "DentaLux",
  phone: "+7 (727) 123-45-67",
  phoneRaw: "+77271234567",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "77271234567",
  email: "info@dentalux.kz",
  address: "г. Алматы, ул. Абая 150, БЦ «Алатау», 2 этаж",
  workingHours: {
    weekdays: "Пн–Пт: 9:00 – 21:00",
    weekend: "Сб–Вс: 10:00 – 18:00",
  },
  social: {
    instagram: "https://instagram.com/dentalux_kz",
    telegram: "https://t.me/dentalux_kz",
    youtube: "https://youtube.com/@dentalux_kz",
  },
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2906.4440744476!2d76.9286!3d43.2382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sru!2skz!4v1",
  yearFounded: 2012,
  patientsCount: "15 000+",
  doctorsCount: "12",
  warrantyYears: "5",
} as const;
