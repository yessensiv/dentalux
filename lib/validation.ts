import { z } from "zod";
import { services } from "@/data/services";
import { doctors } from "@/data/doctors";
import { bookingDates, bookingTimes } from "./booking";

const phoneSchema = z.string().trim().max(30).regex(/^[\d\s+()\-]+$/, "Некорректный формат номера")
  .refine((value) => /^7\d{10}$/.test(value.replace(/\D/g, "")), "Введите номер полностью: +7 и 10 цифр");
const contactFields = {
  name: z.string().trim().min(2, "Введите имя (минимум 2 символа)").max(100, "Не более 100 символов"),
  phone: phoneSchema,
  consent: z.boolean().refine((value) => value, "Подтвердите согласие на обработку данных"),
};

export const appointmentSchema = z.object({
  ...contactFields,
  service: z.string().refine((id) => services.some((s) => s.id === id), "Выберите услугу из списка"),
  doctor: z.string().optional(),
  date: z.string().refine((date) => bookingDates().some((d) => d.value === date), "Выберите дату в ближайшие 14 дней"),
  time: z.string().min(1, "Выберите время"),
  comment: z.string().trim().max(1000, "Не более 1000 символов").optional(),
}).superRefine((data, ctx) => {
  if (data.doctor && !doctors.some((d) => d.id === data.doctor && d.services.includes(data.service))) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["doctor"], message: "Этот врач не оказывает выбранную услугу" });
  }
  if (!bookingTimes(data.date).includes(data.time)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["time"], message: "Выберите время в часы работы клиники" });
  }
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;

export const contactSchema = z.object({
  ...contactFields,
  email: z.string().trim().max(254).email("Введите корректный email").optional().or(z.literal("")),
  message: z.string().trim().min(10, "Сообщение должно содержать минимум 10 символов").max(2000, "Не более 2000 символов"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const quickAppointmentSchema = z.object(contactFields);

export type QuickAppointmentFormData = z.infer<typeof quickAppointmentSchema>;

export const appointmentRequestSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("appointment"), data: appointmentSchema }),
  z.object({ kind: z.literal("callback"), data: quickAppointmentSchema }),
]);
