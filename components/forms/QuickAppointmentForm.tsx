"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quickAppointmentSchema, type QuickAppointmentFormData } from "@/lib/validation";
import { useState } from "react";
import { formatPhone } from "@/lib/utils";
import WhatsAppConfirmation from "./WhatsAppConfirmation";
import Consent from "./Consent";
import DemoConfirmation from "./DemoConfirmation";
import { PORTFOLIO_DEMO } from "@/lib/demo";

export default function QuickAppointmentForm() {
  const [whatsappUrl, setWhatsAppUrl] = useState("");
  const [demoComplete, setDemoComplete] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<QuickAppointmentFormData>({
    resolver: zodResolver(quickAppointmentSchema),
  });

  const onSubmit = async (data: QuickAppointmentFormData) => {
    setError("");
    if (PORTFOLIO_DEMO) {
      setDemoComplete(true);
      return;
    }
    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "callback", data }),
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
        <label htmlFor="quick-name" className="field-label">Ваше имя</label>
        <input
          {...register("name")}
          id="quick-name" autoComplete="name"
          type="text"
          placeholder="Ваше имя"
          className="input-field"
          aria-label="Ваше имя"
        />
        {errors.name && (
          <p role="alert" className="text-red-700 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="quick-phone" className="field-label">Телефон</label>
        <input
          {...register("phone")}
          id="quick-phone" autoComplete="tel"
          type="tel"
          placeholder="+7 (___) ___-__-__"
          className="input-field"
          aria-label="Номер телефона"
          onChange={(e) => {
            const formatted = formatPhone(e.target.value);
            setValue("phone", formatted);
          }}
        />
        {errors.phone && (
          <p role="alert" className="text-red-700 text-xs mt-1">{errors.phone.message}</p>
        )}
      </div>
      <Consent {...register("consent")} error={errors.consent?.message} />
      {error && <p role="alert" className="text-red-700 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full disabled:opacity-50"
      >
        {isSubmitting ? "Проверка..." : PORTFOLIO_DEMO ? "Проверить демо-форму" : "Продолжить в WhatsApp"}
      </button>
      <p className="text-xs text-gray-400 text-center">
        {PORTFOLIO_DEMO ? "Демо-проект: данные не сохраняются и не отправляются" : "После сохранения откройте WhatsApp и отправьте готовое сообщение"}
      </p>
    </form>
  );
}
