import { Metadata } from "next";
import Link from "next/link";
import ServiceCard from "@/components/ui/ServiceCard";
import Section from "@/components/ui/Section";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Услуги",
  description: "Полный спектр стоматологических услуг: терапия, имплантация, ортодонтия, отбеливание, протезирование, хирургия, детская стоматология.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-white border-b border-gray-200 py-16 md:py-24">
        <div className="section-container">
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">Наши услуги</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Мы предлагаем полный спектр стоматологических услуг — от профилактики до сложной
            хирургии. Используем передовые технологии и лучшие материалы.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </Section>

      <Section className="bg-gray-blue">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="section-title mb-4">Не нашли нужную услугу?</h2>
          <p className="text-gray-600 mb-6">
            Позвоните нам или запишитесь на бесплатную консультацию — врач подберёт оптимальный план лечения.
          </p>
          <Link href="/appointment" className="btn-primary">
            Записаться на консультацию
          </Link>
        </div>
      </Section>
    </>
  );
}
