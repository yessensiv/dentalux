import { Metadata } from "next";
import Section from "@/components/ui/Section";
import ContactForm from "@/components/forms/ContactForm";
import { CLINIC_INFO } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Контакты стоматологической клиники DentaLux в Алматы. Адрес, телефон, режим работы, форма обратной связи.",
};

export default function ContactsPage() {
  return (
    <>
      <section className="bg-white border-b border-gray-200 py-16 md:py-24">
        <div className="section-container">
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">Контакты</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Мы всегда рады вас видеть. Приходите, звоните или напишите нам.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-navy mb-6">Как нас найти</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-none flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-navy mb-1">Адрес</h3>
                  <p className="text-gray-600">{CLINIC_INFO.address}</p>
                  <p className="text-sm text-gray-400 mt-1">Удобная парковка, рядом остановка автобуса</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-none flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-navy mb-1">Телефон</h3>
                  <a href={`tel:${CLINIC_INFO.phoneRaw}`} className="text-primary text-lg font-medium hover:underline">
                    {CLINIC_INFO.phone}
                  </a>
                  <p className="text-sm text-gray-400 mt-1">Звоните в рабочее время</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-none flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-navy mb-1">Email</h3>
                  <a href={`mailto:${CLINIC_INFO.email}`} className="text-primary hover:underline">
                    {CLINIC_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-none flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-navy mb-1">Режим работы</h3>
                  <p className="text-gray-600">{CLINIC_INFO.workingHours.weekdays}</p>
                  <p className="text-gray-600">{CLINIC_INFO.workingHours.weekend}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-xl border border-gray-200 bg-gray-blue p-6">
              <h3 className="text-lg font-semibold mb-2">Как добраться</h3>
              <p className="text-sm text-gray-600 mb-5">Откройте адрес клиники в привычном приложении карт.</p>
              <div className="flex flex-wrap gap-3">
                <a href={`https://2gis.kz/almaty/search/${encodeURIComponent(CLINIC_INFO.address)}`} target="_blank" rel="noopener noreferrer" className="btn-secondary">Открыть 2GIS</a>
                <a href={`https://yandex.kz/maps/?text=${encodeURIComponent(CLINIC_INFO.address)}`} target="_blank" rel="noopener noreferrer" className="btn-secondary">Яндекс Карты</a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-navy mb-6">Напишите нам</h2>
            <div className="card p-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
