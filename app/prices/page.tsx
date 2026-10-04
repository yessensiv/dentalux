"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";
import Tabs from "@/components/ui/Tabs";
import { priceCategories, formatPrice } from "@/data/prices";
import Link from "next/link";

const allItems = priceCategories.flatMap((c) => c.items);

export default function PricesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [calcServices, setCalcServices] = useState<{ name: string; price: number }[]>([]);

  const tabs = [
    { id: "all", label: "Все" },
    ...priceCategories.map((c) => ({ id: c.id, label: c.name })),
  ];

  const currentItems = activeTab === "all" ? allItems : priceCategories.find((c) => c.id === activeTab)?.items || [];
  const filtered = search
    ? currentItems.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    : currentItems;

  const calcTotal = calcServices.reduce((sum, s) => sum + s.price, 0);

  return (
    <>
      <section className="bg-white border-b border-gray-200 py-16 md:py-24">
        <div className="section-container">
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">Цены</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Прозрачные цены без скрытых платежей. Стоимость зависит от сложности случая
            и выбранных материалов. Точную стоимость определит врач на консультации.
          </p>
        </div>
      </section>

      <Section>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Поиск по названию услуги..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field max-w-md"
            aria-label="Поиск услуги"
          />
        </div>
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-2 sm:p-4 text-sm font-semibold text-navy">Услуга</th>
                <th className="text-right p-2 sm:p-4 text-sm font-semibold text-navy w-28 sm:w-48">Стоимость</th>
                <th className="text-center p-2 sm:p-4 text-sm font-semibold text-navy w-16 sm:w-20">Расчёт</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => {
                const isAdded = calcServices.some((s) => s.name === item.name);
                return (
                  <tr key={i} className="border-t border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="p-2 sm:p-4 text-sm text-gray-700 break-words">{item.name}</td>
                    <td className="p-2 sm:p-4 text-sm text-right font-medium text-navy">
                      {item.note ? (
                        <span className="text-primary font-semibold">{item.note}</span>
                      ) : item.priceMax ? (
                        <span className="flex flex-col sm:flex-row sm:justify-end sm:gap-1">
                          <span className="whitespace-nowrap">{formatPrice(item.price)}</span>
                          <span className="whitespace-nowrap">– {formatPrice(item.priceMax)}</span>
                        </span>
                      ) : (
                        formatPrice(item.price)
                      )}
                    </td>
                    <td className="p-2 sm:p-4 text-center">
                      {!item.note && (
                        <button
                          onClick={() => {
                            if (isAdded) {
                              setCalcServices((prev) => prev.filter((s) => s.name !== item.name));
                            } else {
                              setCalcServices((prev) => [...prev, { name: item.name, price: item.price }]);
                            }
                          }}
                          className={`w-11 h-11 rounded-lg text-sm transition-colors ${
                            isAdded
                              ? "bg-primary text-white"
                              : "bg-gray-100 text-gray-400 hover:bg-primary/10 hover:text-primary"
                          }`}
                          aria-label={`${isAdded ? "Убрать из расчёта" : "Добавить в расчёт"}: ${item.name}`}
                          aria-pressed={isAdded}
                        >
                          {isAdded ? "✓" : "+"}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-gray-400">Ничего не найдено</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Cost Calculator */}
      {calcServices.length > 0 && (
        <div className="fixed bottom-[calc(96px+env(safe-area-inset-bottom))] lg:bottom-4 left-4 right-4 lg:left-auto lg:right-4 lg:w-96 z-30">
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-navy">Калькулятор стоимости</h3>
              <button
                onClick={() => setCalcServices([])}
                className="min-h-11 px-2 text-sm text-gray-600 hover:text-red-700 transition-colors"
              >
                Очистить
              </button>
            </div>
            <div className="space-y-1 max-h-32 overflow-y-auto mb-3">
              {calcServices.map((s) => (
                <div key={s.name} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 truncate mr-2">{s.name}</span>
                  <span className="text-navy font-medium shrink-0">{formatPrice(s.price)}</span>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
              <span className="font-semibold text-navy">Итого:</span>
              <span className="text-xl font-bold text-primary">{formatPrice(calcTotal)}</span>
            </div>
            <Link href="/appointment" className="btn-primary w-full mt-3 text-center block text-sm">
              Записаться
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
