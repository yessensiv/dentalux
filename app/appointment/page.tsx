import { Metadata } from "next";
import AppointmentForm from "@/components/forms/AppointmentForm";
import Section from "@/components/ui/Section";
import { connection } from "next/server";
import { PORTFOLIO_DEMO } from "@/lib/demo";

export const metadata: Metadata = {
  title: "Запись на приём",
  description: "Запишитесь на приём в стоматологическую клинику DentaLux онлайн. Выберите услугу, врача и удобное время.",
};

export default async function AppointmentPage() {
  await connection();
  return (
    <>
      <section className="bg-white border-b border-gray-200 py-16 md:py-24">
        <div className="section-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">Запись на приём</h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            {PORTFOLIO_DEMO ? "Попробуйте выбрать услугу, врача и удобное время. Это демо-форма: запись не создаётся." : "Выберите услугу и желаемое время. Отправьте заявку в WhatsApp — администратор подтвердит возможность записи."}
          </p>
        </div>
      </section>

      <Section>
        <div className="max-w-3xl mx-auto">
          <div className="card p-6 md:p-10">
            <AppointmentForm />
          </div>
        </div>
      </Section>
    </>
  );
}
