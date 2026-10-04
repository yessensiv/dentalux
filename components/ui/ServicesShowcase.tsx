"use client";
import { useState } from "react";
import Link from "next/link";
import type { Service } from "@/data/services";
import ServiceCard from "./ServiceCard";

const categories = [
  { id: "all", label: "Все услуги" }, { id: "therapy", label: "Здоровье зубов" },
  { id: "aesthetic", label: "Эстетика улыбки" }, { id: "surgery", label: "Хирургия" }, { id: "kids", label: "Детям" },
];
export default function ServicesShowcase({ services }: { services: Service[] }) {
  const [category, setCategory] = useState("all");
  const filtered = services.filter((s) => category === "all" || (category === "kids" ? s.id === "pediatric" : s.category === category));
  return <div>
    <div className="mb-8 flex flex-wrap gap-2" aria-label="Фильтр услуг">
      {categories.map((item) => <button key={item.id} type="button" aria-pressed={category === item.id} onClick={() => setCategory(item.id)} className={`filter-chip ${category === item.id ? "is-active" : ""}`}>{item.label}</button>)}
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" aria-live="polite">
      {filtered.map((service) => <ServiceCard key={service.id} service={service} />)}
    </div>
    <div className="consultation-banner mt-10">
      <div><h3 className="text-2xl font-semibold tracking-tight mb-2">Начнём с консультации</h3><p className="max-w-xl text-sm leading-relaxed text-gray-600">Врач поможет разобраться, сравнит варианты лечения и составит план с понятной стоимостью.</p></div>
      <Link href="/appointment" className="btn-primary shrink-0">Записаться на консультацию</Link>
    </div>
  </div>;
}
