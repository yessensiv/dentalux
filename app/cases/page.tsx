"use client";

import { useState } from "react";
import Image from "next/image";
import Section from "@/components/ui/Section";
import { motion } from "framer-motion";

const cases = [
  { id: "1", image: "/images/services/whitening.jpg", category: "Отбеливание", title: "Отбеливание Zoom 4", description: "Профессиональное осветление оттенка эмали" },
  { id: "2", image: "/images/services/implantation.jpg", category: "Имплантация", title: "Имплантация All-on-4", description: "Полное восстановление зубного ряда нижней челюсти" },
  { id: "3", image: "/images/services/prosthetics.jpg", category: "Виниры", title: "8 виниров E-max", description: "Полная трансформация улыбки керамическими винирами" },
  { id: "4", image: "/images/services/orthodontics.jpg", category: "Ортодонтия", title: "Лечение элайнерами", description: "Поэтапное исправление положения зубов" },
  { id: "5", image: "/images/services/whitening.jpg", category: "Отбеливание", title: "Отбеливание Beyond", description: "Осветление эмали с индивидуальным подбором процедуры" },
  { id: "6", image: "/images/services/implantation.jpg", category: "Имплантация", title: "Имплантация Straumann", description: "Восстановление двух жевательных зубов" },
];

const categories = ["Все", ...Array.from(new Set(cases.map((c) => c.category)))];


export default function CasesPage() {
  const [filter, setFilter] = useState("Все");
  const filtered = filter === "Все" ? cases : cases.filter((c) => c.category === filter);

  return (
    <>
      <section className="bg-white border-b border-gray-200 py-16 md:py-24">
        <div className="section-container">
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">До и После</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Примеры направлений лечения. Фотографии реальных результатов будут опубликованы после получения согласия пациентов.
          </p>
        </div>
      </section>

      <Section>
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className={`px-4 py-2 rounded-none text-sm font-medium transition-all ${
                filter === cat
                  ? "bg-primary text-white  shadow-primary/25"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.05  }}
              className="card overflow-hidden"
            >
              <div className="relative h-52 overflow-hidden bg-gray-blue">
                <Image src={item.image} alt={`Иллюстрация направления: ${item.category}`} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1.5 text-xs text-gray-700">Иллюстрация процедуры</span>
              </div>
              <div className="p-5">
                <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">
                  {item.category}
                </span>
                <h3 className="font-semibold text-navy mt-3 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  );
}
