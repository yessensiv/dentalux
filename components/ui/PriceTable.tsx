"use client";

import { useState } from "react";
import { formatPrice } from "@/data/prices";
import type { PriceItem } from "@/data/prices";

interface PriceTableProps {
  items: PriceItem[];
  searchable?: boolean;
}

export default function PriceTable({ items, searchable = false }: PriceTableProps) {
  const [search, setSearch] = useState("");

  const filtered = searchable
    ? items.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    : items;

  return (
    <div>
      {searchable && (
        <div className="mb-6">
          <input
            type="text"
            placeholder="Поиск по названию услуги..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field"
            aria-label="Поиск услуги"
          />
        </div>
      )}
      <div className="overflow-hidden rounded-none border border-gray-100">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-4 text-sm font-semibold text-navy">Услуга</th>
              <th className="text-right p-4 text-sm font-semibold text-navy">Стоимость</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, i) => (
              <tr
                key={i}
                className="border-t border-gray-100 hover:bg-gray-50/50 transition-colors"
              >
                <td className="p-4 text-sm text-gray-700">{item.name}</td>
                <td className="p-4 text-sm text-right font-medium text-navy whitespace-nowrap">
                  {item.note ? (
                    <span className="text-primary font-semibold">{item.note}</span>
                  ) : item.priceMax ? (
                    `${formatPrice(item.price)} – ${formatPrice(item.priceMax)}`
                  ) : (
                    formatPrice(item.price)
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={2} className="p-8 text-center text-gray-400">
                  Ничего не найдено
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
