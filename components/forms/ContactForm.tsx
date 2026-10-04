"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormData } from "@/lib/validation";
import { useState } from "react";
import { formatPhone } from "@/lib/utils";
import WhatsAppConfirmation from "./WhatsAppConfirmation";
import Consent from "./Consent";
import DemoConfirmation from "./DemoConfirmation";
import { PORTFOLIO_DEMO } from "@/lib/demo";

export default function ContactForm() {
  const [whatsappUrl, setWhatsAppUrl] = useState("");
  const [demoComplete, setDemoComplete] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setError("");
    if (PORTFOLIO_DEMO) {
      setDemoComplete(true);
      return;
    }
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok || !result.whatsappUrl) throw new Error(result.message || "Не удалось подготовить заявку");
      setWhatsAppUrl(result.whatsappUrl);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Не удалось подготовить заявку. Попробуйте ещё раз.");
    }
  };

  if (demoComplete) return <DemoConfirmation />;
  if (whatsappUrl) return <WhatsAppConfirmation url={whatsappUrl} />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="contact-name" className="field-label">Ваше имя</label>
        <input
          {...register("name")}
          type="text"
          id="contact-name" placeholder="Ваше имя" autoComplete="name"
          className="input-field"
        />
        {errors.name && <p role="alert" className="text-red-700 text-xs mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="contact-phone" className="field-label">Телефон</label>
        <input
          {...register("phone")}
          type="tel"
          id="contact-phone" placeholder="+7 (___) ___-__-__" autoComplete="tel"
          className="input-field"
          onChange={(e) => {
            const formatted = formatPhone(e.target.value);
            setValue("phone", formatted);
          }}
        />
        {errors.phone && <p role="alert" className="text-red-700 text-xs mt-1">{errors.phone.message}</p>}
      </div>
      <div>
        <label htmlFor="contact-email" className="field-label">Email (необязательно)</label>
        <input
          {...register("email")}
          type="email"
          id="contact-email" placeholder="you@example.com" autoComplete="email"
          className="input-field"
        />
        {errors.email && <p role="alert" className="text-red-700 text-xs mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="contact-message" className="field-label">Сообщение</label>
        <textarea
          {...register("message")}
          id="contact-message" placeholder="Как мы можем помочь?"
          rows={4}
          className="input-field resize-none"
        />
        {errors.message && <p role="alert" className="text-red-700 text-xs mt-1">{errors.message.message}</p>}
      </div>
      <Consent {...register("consent")} error={errors.consent?.message} />
      {error && <p role="alert" className="text-red-700 text-sm">{error}</p>}
      <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-50">
        {isSubmitting ? "Проверка..." : PORTFOLIO_DEMO ? "Проверить демо-форму" : "Продолжить в WhatsApp"}
      </button>
      {PORTFOLIO_DEMO && <p className="text-xs text-gray-500 text-center">Демо-проект: данные не сохраняются и не отправляются</p>}
    </form>
  );
}
