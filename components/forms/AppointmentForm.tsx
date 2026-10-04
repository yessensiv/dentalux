"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { appointmentSchema, type AppointmentFormData } from "@/lib/validation";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/data/services";
import { doctors } from "@/data/doctors";
import { formatPhone } from "@/lib/utils";
import WhatsAppConfirmation from "./WhatsAppConfirmation";
import Consent from "./Consent";
import DemoConfirmation from "./DemoConfirmation";
import { PORTFOLIO_DEMO } from "@/lib/demo";

import { bookingDates, bookingTimes } from "@/lib/booking";
import { getDentalIcon } from "@/components/ui/DentalIcons";

const steps = [
  { id: 1, title: "Услуга" },
  { id: 2, title: "Врач" },
  { id: 3, title: "Дата и время" },
  { id: 4, title: "Контакты" },
];

export default function AppointmentForm() {
  const [step, setStep] = useState(1);
  const [whatsappUrl, setWhatsAppUrl] = useState("");
  const [demoComplete, setDemoComplete] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    control,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: { service: "", doctor: "", date: "", time: "", name: "", phone: "", comment: "", consent: false },
  });

  const selectedService = useWatch({ control, name: "service" });
  const selectedDoctor = useWatch({ control, name: "doctor" });
  const selectedDate = useWatch({ control, name: "date" });
  const selectedTime = useWatch({ control, name: "time" });

  const filteredDoctors = selectedService
    ? doctors.filter((d) => d.services.includes(selectedService))
    : doctors;

  const nextStep = async () => {
    let valid = true;
    if (step === 1) valid = await trigger("service");
    if (step === 3) valid = await trigger(["date", "time"]);
    if (valid) setStep((s) => Math.min(s + 1, 4));
  };

  const onSubmit = async (data: AppointmentFormData) => {
    setError("");
    if (PORTFOLIO_DEMO) {
      setDemoComplete(true);
      return;
    }
    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "appointment", data }),
      });
      const result = await res.json();
      if (!res.ok || !result.whatsappUrl) throw new Error(result.message || "Не удалось подготовить заявку");
      setWhatsAppUrl(result.whatsappUrl);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Не удалось подготовить заявку. Попробуйте ещё раз.");
    }
  };

  const dates = bookingDates();
  const timeSlots = bookingTimes(selectedDate);

  if (demoComplete) return <DemoConfirmation />;
  if (whatsappUrl) return <WhatsAppConfirmation url={whatsappUrl} />;

  return (
    <div>
      {/* Step indicator */}
      <div className="mb-8 mx-auto flex w-full max-w-lg items-start" aria-label="Шаги записи">
        {steps.map((s, i) => (
          <div key={s.id} className={`flex min-w-0 items-start ${i < steps.length - 1 ? "flex-1" : "shrink-0"}`}>
            <div className="flex shrink-0 flex-col items-center">
              <div
                aria-current={step === s.id ? "step" : undefined}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  step >= s.id
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {step > s.id ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  s.id
                )}
              </div>
              <span className="text-xs mt-1 text-gray-600 hidden sm:block">{s.title}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`mx-1 mt-5 h-0.5 min-w-0 flex-1 sm:mx-2 ${step > s.id ? "bg-primary" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">Шаг {step} из 4: {steps[step - 1].title}</p>
      <form onSubmit={handleSubmit(onSubmit, (fields) => {
        if (fields.service) setStep(1);
        else if (fields.doctor) setStep(2);
        else if (fields.date || fields.time) setStep(3);
      })}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              <h3 className="text-lg font-semibold text-navy mb-4">Выберите услугу</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    aria-pressed={selectedService === s.id}
                    onClick={() => {
                      setValue("service", s.id, { shouldValidate: true });
                      setValue("doctor", "");
                      nextStep();
                    }}
                    className={`p-4 rounded-lg border text-left transition-all hover:border-primary/50 ${
                      selectedService === s.id
                        ? "border-primary bg-primary/5"
                        : "border-gray-200"
                    }`}
                  >
                    <span className="text-2xl">{getDentalIcon(s.id, "h-6 w-6")}</span>
                    <p className="font-medium text-navy mt-2">{s.title}</p>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-1">{s.shortDescription}</p>
                  </button>
                ))}
              </div>
              {errors.service && <p role="alert" className="text-red-700 text-sm">{errors.service.message}</p>}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              <h3 className="text-lg font-semibold text-navy mb-4">Выберите врача (необязательно)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredDoctors.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setValue("doctor", d.id)}
                    aria-pressed={selectedDoctor === d.id}
                    className={`p-4 rounded-lg border text-left transition-all hover:border-primary/50 ${
                      selectedDoctor === d.id ? "border-primary bg-primary/5" : "border-gray-200"
                    }`}
                  >
                    <p className="font-medium text-navy">{d.name}</p>
                    <p className="text-xs text-primary">{d.position}</p>
                    <p className="text-xs text-gray-600 mt-1">Стаж {d.experience} лет</p>
                  </button>
                ))}
              </div>
              {errors.doctor && <p role="alert" className="text-red-700 text-sm">{errors.doctor.message}</p>}
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setStep(1)} className="btn-secondary">
                  Назад
                </button>
                <button type="button" onClick={nextStep} className="btn-primary flex-1">
                  Далее
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-semibold text-navy mb-4">Желаемая дата</h3>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {dates.map((d) => (
                    <button
                      key={d.value}
                      type="button"
                      onClick={() => { setValue("date", d.value, { shouldValidate: true }); setValue("time", ""); }}
                      aria-pressed={selectedDate === d.value}
                      className={`shrink-0 px-4 py-3 rounded-lg border text-center transition-all min-w-[80px] ${
                        selectedDate === d.value
                          ? "border-primary bg-primary text-white"
                          : "border-gray-200 hover:border-primary/50"
                      }`}
                    >
                      <p className="text-sm font-medium capitalize">{d.label}</p>
                    </button>
                  ))}
                </div>
                {errors.date && <p role="alert" className="text-red-700 text-sm mt-1">{errors.date.message}</p>}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-navy mb-4">Желаемое время</h3>
                <p className="mb-4 text-sm text-gray-600">{PORTFOLIO_DEMO ? "Время указано по Алматы. Выбор даты и времени показан для демонстрации интерфейса." : "Время указано по Алматы. Администратор проверит свободные места и подтвердит запись в WhatsApp."}</p>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {!selectedDate && <p className="col-span-full text-sm text-gray-600">Сначала выберите дату</p>}
                  {timeSlots.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setValue("time", t)}
                      aria-pressed={selectedTime === t}
                      className={`py-2 rounded-lg border text-sm transition-all ${
                        selectedTime === t
                          ? "border-primary bg-primary text-white"
                          : "border-gray-200 hover:border-primary/50"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                {errors.time && <p role="alert" className="text-red-700 text-sm mt-1">{errors.time.message}</p>}
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(2)} className="btn-secondary">
                  Назад
                </button>
                <button type="button" onClick={nextStep} className="btn-primary flex-1">
                  Далее
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4 max-w-md mx-auto"
            >
              <h3 className="text-lg font-semibold text-navy mb-4">Контактные данные</h3>
              <div>
                <label htmlFor="appointment-name" className="field-label">Ваше имя</label>
                <input
                  {...register("name")}
                  type="text"
                  id="appointment-name" placeholder="Ваше имя" autoComplete="name"
                  className="input-field"
                />
                {errors.name && <p role="alert" className="text-red-700 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="appointment-phone" className="field-label">Телефон</label>
                <input
                  {...register("phone")}
                  type="tel"
                  id="appointment-phone" placeholder="+7 (___) ___-__-__" autoComplete="tel"
                  className="input-field"
                  onChange={(e) => {
                    const formatted = formatPhone(e.target.value);
                    setValue("phone", formatted);
                  }}
                />
                {errors.phone && <p role="alert" className="text-red-700 text-xs mt-1">{errors.phone.message}</p>}
              </div>
              <div>
                <label htmlFor="appointment-comment" className="field-label">Комментарий (необязательно)</label>
                <textarea
                  {...register("comment")}
                  id="appointment-comment" placeholder="Что нам стоит знать перед визитом?"
                  rows={3}
                  className="input-field resize-none"
                />
              </div>
              <Consent {...register("consent")} error={errors.consent?.message} />
              {error && <p role="alert" className="text-red-700 text-sm">{error}</p>}
              <div className="flex flex-col-reverse gap-3 sm:flex-row">
                <button type="button" onClick={() => setStep(3)} className="btn-secondary">
                  Назад
                </button>
                <button type="submit" disabled={isSubmitting} className="btn-primary flex-1 disabled:opacity-50">
                  {isSubmitting ? "Проверка..." : PORTFOLIO_DEMO ? "Завершить демо" : "Продолжить в WhatsApp"}
                </button>
              </div>
              <p className="text-xs text-gray-400 text-center">
                {PORTFOLIO_DEMO ? "Демо-проект: данные не сохраняются и не отправляются" : "После сохранения откройте WhatsApp и отправьте готовое сообщение"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
