"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import Section, { SectionHeader } from "@/components/ui/Section";
import ServicesShowcase from "@/components/ui/ServicesShowcase";
import DoctorCard from "@/components/ui/DoctorCard";
import ReviewCard from "@/components/ui/ReviewCard";
import Accordion from "@/components/ui/Accordion";
import PriceTable from "@/components/ui/PriceTable";
import QuickAppointmentForm from "@/components/forms/QuickAppointmentForm";
import { services } from "@/data/services";
import { doctors } from "@/data/doctors";
import { reviews } from "@/data/reviews";
import { faqItems } from "@/data/faq";
import { priceCategories } from "@/data/prices";
import { CLINIC_INFO } from "@/lib/utils";


const whyUs = [
  {
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Современное оборудование",
    description: "Цифровой 3D-томограф, лазерные системы, микроскоп Carl Zeiss — технологии мирового уровня.",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Бережное лечение",
    description: "Компьютерная и бережная анестезия европейскими препаратами. Подбираем обезболивание с учётом ваших особенностей.",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "100% стерильность",
    description: "Многоступенчатая стерилизация по строгим международным протоколам и индивидуальные наборы.",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: "Гарантия качества",
    description: "Письменная официальная гарантия на все виды лечения и имплантации. Прозрачная ценовая политика.",
  },
];

const howItWorks = [
  { step: "01", title: "Запись", description: "Запишитесь онлайн, по телефону или в WhatsApp" },
  { step: "02", title: "Консультация", description: "Бесплатный осмотр и составление плана лечения" },
  { step: "03", title: "Лечение", description: "Безболезненные процедуры с использованием современных технологий" },
  { step: "04", title: "Гарантия", description: "Контрольные осмотры и гарантия на все работы" },
];

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="section-container">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="mb-6 text-sm text-gray-600 flex items-center gap-3"><span className="h-px w-8 bg-gray-400" aria-hidden="true" />Стоматология в Алматы</p>
              <h1>Здоровая улыбка.<br />Спокойствие за результат.</h1>
              <p className="hero-description">От первого осмотра до новой улыбки — с понятным планом лечения, вниманием к деталям и заботой о вашем комфорте.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/appointment" className="btn-primary">Выбрать время приёма</Link>
                <Link href="/services" className="btn-secondary">Посмотреть услуги</Link>
              </div>
              <div className="hero-facts">
                <div><strong>С 2012 года</strong><span>Заботимся об улыбках</span></div>
                <div><strong>8 направлений</strong><span>Взрослым и детям</span></div>
                <div><strong>Понятные цены</strong><span>План до начала лечения</span></div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-photo">
                <Image src="/images/services/hygiene.jpg" alt="Врач объясняет пациенту результаты диагностики зубов" fill preload sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
              </div>
              <div className="hero-caption">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m5 12 4 4L19 6" /></svg></div>
                <div><p className="font-medium text-white">Сначала объясним. Потом лечим.</p><p className="mt-1 text-sm text-gray-300">Диагностика, варианты и стоимость — вместе с врачом.</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <Section id="services">
        <SectionHeader
          title="Наши направления и услуги"
          subtitle="Полный спектр стоматологических услуг премиального уровня для всей семьи"
        />
        <ServicesShowcase services={services} />
      </Section>

      {/* Why Us */}
      <Section className="bg-gray-blue">
        <SectionHeader
          title="Почему выбирают нас"
          subtitle="Внимание к деталям на каждом этапе лечения"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {whyUs.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
              className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200"
            >
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-slate-900 flex items-center justify-center mb-5">
                {item.icon}
              </div>
              <h3 className="font-bold text-slate-900 mb-3 text-base sm:text-lg">{item.title}</h3>
              <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Doctors */}
      <Section>
        <SectionHeader
          title="Наши врачи"
          subtitle="Команда профессионалов с международным опытом"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {doctors.map((doctor, i) => (
            <DoctorCard key={doctor.id} doctor={doctor} index={i} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/doctors" className="btn-outline inline-block">
            Все врачи
          </Link>
        </div>
      </Section>

      {/* Price preview */}
      <Section className="bg-gray-blue">
        <SectionHeader
          title="Стоимость услуг"
          subtitle="Прозрачные цены без скрытых платежей"
        />
        <div className="max-w-3xl mx-auto">
          <PriceTable items={priceCategories[0].items.slice(0, 5)} />
        </div>
        <div className="text-center mt-8">
          <Link href="/prices" className="btn-outline">
            Полный прайс-лист
          </Link>
        </div>
      </Section>

      {/* How it works */}
      <Section>
        <SectionHeader
          title="Как мы работаем"
          subtitle="Простой и понятный путь к здоровой улыбке"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {howItWorks.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
              className="relative text-center p-6 rounded-2xl bg-slate-50/70 border border-slate-100 md:bg-transparent md:border-0 md:p-0"
            >
              <div className="w-14 h-14 sm:w-18 sm:h-18 bg-white md:bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-sm border border-slate-200/60 md:border-0">
                <span className="text-xl sm:text-2xl font-bold text-slate-900">{item.step}</span>
              </div>
              <h3 className="font-bold text-slate-900 mb-2 text-base">{item.title}</h3>
              <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">{item.description}</p>
              {i < howItWorks.length - 1 && (
                <div className="hidden md:block absolute top-9 left-[calc(50%+45px)] w-[calc(100%-90px)] h-px bg-slate-200" />
              )}
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Reviews */}
      <Section className="bg-gray-blue">
        <SectionHeader
          title="Отзывы пациентов"
          subtitle="Нам доверяют более 15 000 пациентов"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 6).map((review, i) => (
            <ReviewCard key={review.id} review={review} index={i} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/reviews" className="btn-outline">
            Все отзывы
          </Link>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeader
          title="Частые вопросы"
          subtitle="Ответы на самые популярные вопросы наших пациентов"
        />
        <div className="max-w-3xl mx-auto">
          <Accordion items={faqItems.slice(0, 6)} />
        </div>
      </Section>

      {/* Appointment + Contacts */}
      <Section className="bg-gray-blue">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <h2 className="section-title mb-3">Запишитесь на приём</h2>
            <p className="text-gray-600 mb-8 text-sm sm:text-base">
              Расскажите, как с вами связаться. Мы подготовим сообщение для WhatsApp — отправьте его, чтобы согласовать визит.
            </p>
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
              <QuickAppointmentForm />
            </div>
          </div>
          <div>
            <h2 className="section-title mb-3">Контакты</h2>
            <p className="text-gray-600 mb-8 text-sm sm:text-base">Ждём вас в нашей клинике</p>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Адрес</p>
                  <p className="text-sm text-slate-600">{CLINIC_INFO.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Телефон</p>
                  <a href={`tel:${CLINIC_INFO.phoneRaw}`} className="text-sm font-medium text-slate-900 hover:text-black">
                    {CLINIC_INFO.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Режим работы</p>
                  <p className="text-sm text-slate-600">{CLINIC_INFO.workingHours.weekdays}</p>
                  <p className="text-sm text-slate-600">{CLINIC_INFO.workingHours.weekend}</p>
                </div>
              </div>
            </div>

            {/* Interactive Clinic Location Card */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-950 text-white p-5 sm:p-6 shadow-lg">
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Удобная парковка & Метро
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">БЦ «Алатау», 2 этаж</span>
              </div>

              <div className="space-y-1 mb-5">
                <div className="text-base sm:text-lg font-bold text-white">
                  {CLINIC_INFO.address}
                </div>
                <p className="text-xs text-slate-400 font-light">
                  5 минут от ст. метро «Алатау» / «Театр им. Ауэзова». Бесплатный подземный и наземный паркинг для пациентов.
                </p>
              </div>

              {/* Direct navigation buttons for mobile & desktop */}
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={`https://2gis.kz/almaty/search/${encodeURIComponent(CLINIC_INFO.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/25 text-white text-xs font-semibold transition-all border border-white/10"
                >
                  <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span>2GIS Навигатор</span>
                </a>

                <a
                  href={`https://yandex.kz/maps/?text=${encodeURIComponent(CLINIC_INFO.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/25 text-white text-xs font-semibold transition-all border border-white/10"
                >
                  <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <span>Яндекс Карты</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
