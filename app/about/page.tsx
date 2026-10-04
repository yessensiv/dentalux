import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Section, { SectionHeader } from "@/components/ui/Section";
import HistoryTimeline from "@/components/ui/HistoryTimeline";

export const metadata: Metadata = {
  title: "О клинике",
  description: "Стоматологическая клиника DentaLux — современные технологии, опытные врачи и забота о каждом пациенте с 2012 года.",
};



const equipment = [
  "3D компьютерный томограф",
  "Дентальный микроскоп",
  "Диодный лазер",
  "Система CAD/CAM",
  "Аппарат Air Flow",
  "Пьезохирургический аппарат",
  "Система отбеливания Zoom 4",
  "Автоклав класса B",
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-white border-b border-gray-200 py-16 md:py-24">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6">
                О клинике <span className="text-primary">DentaLux</span>
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                DentaLux — это современная стоматологическая клиника в Алматы, работающая
                с 2012 года. Наша миссия — сделать качественную стоматологию доступной
                и комфортной для каждого.
              </p>
              <p className="text-gray-600 mb-6">
                За 14 лет работы мы помогли более 15 000 пациентам обрести здоровую и красивую
                улыбку. Наша команда — это 12 врачей с международным опытом и постоянным
                стремлением к совершенству.
              </p>
              <Link href="/doctors" className="btn-primary">Наши врачи</Link>
            </div>
            <div className="relative h-64 md:h-80 rounded-none overflow-hidden">
              <Image
                src="/images/clinic/interior.jpg"
                alt="Клиника DentaLux"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <Section>
        <SectionHeader title="Наши ценности" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { 
              icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>, 
              title: "Забота", 
              text: "Каждый пациент для нас — член семьи. Мы заботимся о вашем комфорте на каждом этапе лечения." 
            },
            { 
              icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>, 
              title: "Качество", 
              text: "Мы используем только проверенные материалы и методики. Каждая работа — на высшем уровне." 
            },
            { 
              icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>, 
              title: "Инновации", 
              text: "Постоянно внедряем новые технологии и методы лечения для лучших результатов." 
            },
          ].map((v) => (
            <div key={v.title} className="card p-6 text-center flex flex-col items-center">
              <div className="mb-4 text-black">{v.icon}</div>
              <h3 className="font-semibold text-navy mb-2">{v.title}</h3>
              <p className="text-sm text-gray-600">{v.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Timeline */}
      <Section className="bg-gray-blue">
        <SectionHeader
          title="Наша история"
          subtitle="Путь от 2 стоматологических кабинетов до ведущего медицинского центра"
        />
        <HistoryTimeline />
      </Section>

      {/* Equipment */}
      <Section>
        <SectionHeader title="Оборудование" subtitle="Мы работаем на лучшем оборудовании мировых производителей" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {equipment.map((e) => (
            <div key={e} className="card p-4 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-none flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-navy">{e}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Licenses */}
      <Section className="bg-gray-blue">
        <SectionHeader title="Лицензии и сертификаты" />
        <div className="text-center max-w-xl mx-auto">
          <p className="text-gray-600 mb-6">
            Клиника DentaLux имеет все необходимые лицензии и сертификаты для осуществления
            стоматологической деятельности. Наши врачи регулярно проходят сертификацию
            и повышение квалификации.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[3/4] bg-white rounded-none border border-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-300">
                  <svg className="w-8 h-8 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-xs">Лицензия {i}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
