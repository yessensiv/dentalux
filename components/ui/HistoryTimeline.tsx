"use client";

import { motion } from "framer-motion";
import React from "react";

interface Milestone {
  year: string;
  badge: string;
  title: string;
  description: string;
  metric?: string;
  icon: React.ReactNode;
}

const MILESTONES: Milestone[] = [
  {
    year: "2012",
    badge: "Основание клиники",
    title: "Открытие DentaLux",
    description: "Первые шаги: открытие клиники с 2 современными кабинетами и командой из 3 преданных своему делу врачей.",
    metric: "2 кабинета · 3 врача",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    year: "2015",
    badge: "Масштабирование",
    title: "Новые направления",
    description: "Формирование специализированных хирургического и ортодонтического отделений, запуск детского стоматологического приёма.",
    metric: "+2 отделения",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    year: "2018",
    badge: "Цифровизация",
    title: "Цифровые 3D-технологии",
    description: "Внедрение японского 3D-томографа, интраорального сканирования и немецкой зуботехнической CAD/CAM лаборатории.",
    metric: "3D КТ & CAD/CAM",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    year: "2021",
    badge: "Большой рубеж",
    title: "10 000 здоровых улыбок",
    description: "Преодолели планку в 10 000 постоянных пациентов. Расширение команды до 12 сертифицированных специалистов международного уровня.",
    metric: "10 000+ пациентов",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    year: "2024",
    badge: "Премиум-стандарт",
    title: "Полная модернизация",
    description: "Комплексный редизайн клиники, замена оборудования на немецкие установки последнего поколения и внедрение AI-анализа снимков.",
    metric: "Флагманский уровень",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
];

export default function HistoryTimeline() {
  return (
    <div className="relative max-w-4xl mx-auto py-8">
      {/* Central Animated Line for desktop / Left line for mobile */}
      <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-slate-200">
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full bg-gradient-to-b from-black via-slate-800 to-slate-400"
        />
      </div>

      <div className="space-y-12 md:space-y-16">
        {MILESTONES.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 30, x: isEven ? -20 : 20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.12,
              }}
              className={`relative flex items-center md:justify-between ${
                isEven ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              {/* Empty placeholder for balance on desktop */}
              <div className="hidden md:block md:w-[45%]" />

              {/* Central Glowing Year Node */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  className="relative group cursor-pointer"
                >
                  {/* Pulsing ring aura */}
                  <div className="absolute inset-0 rounded-full bg-black/15 animate-ping opacity-75" />
                  
                  {/* Outer circle */}
                  <div className="relative w-12 h-12 rounded-full bg-white border-2 border-black flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:bg-black group-hover:text-white text-black">
                    <span className="text-xs font-bold font-mono tracking-tight">
                      {item.year.slice(2)}
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Milestone Card */}
              <div className="ml-16 md:ml-0 w-full md:w-[45%]">
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group relative bg-white p-6 sm:p-7 rounded-2xl md:rounded-3xl border border-slate-200/90 hover:border-black shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {/* Top Bar inside card: Year badge + Category */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold tracking-wider">
                      {item.year}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  {/* Header with Icon */}
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-black group-hover:text-white text-slate-800 flex items-center justify-center transition-colors duration-300 shrink-0">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-black transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Bottom Metric Pill */}
                  {item.metric && (
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                      <span className="flex items-center gap-1.5 text-slate-900 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-black" />
                        {item.metric}
                      </span>
                      <span className="text-slate-400 group-hover:text-black group-hover:translate-x-1 transition-all">
                        Подробнее →
                      </span>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Final Milestone Achievement Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-16 text-center"
      >
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-slate-200 shadow-md text-slate-800 text-xs sm:text-sm font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>2026 год: 14 лет непрерывного развития и заботы о вашем здоровье</span>
        </div>
      </motion.div>
    </div>
  );
}
