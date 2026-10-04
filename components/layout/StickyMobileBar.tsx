"use client";

import Link from "next/link";
import { CLINIC_INFO } from "@/lib/utils";
import { PORTFOLIO_DEMO } from "@/lib/demo";

export default function StickyMobileBar() {
  if (PORTFOLIO_DEMO) return null;
  return (
    <div className="fixed bottom-[max(12px,env(safe-area-inset-bottom))] inset-x-3 sm:inset-x-6 z-30 lg:hidden">
      <div className="bg-slate-950/92 backdrop-blur-xl border border-white/15 shadow-2xl rounded-2xl p-1.5 sm:p-2 flex items-center justify-between gap-2 text-white">
        {/* Call button */}
        <a
          href={`tel:${CLINIC_INFO.phoneRaw}`}
          className="flex flex-col items-center justify-center py-2 px-3 rounded-xl hover:bg-white/10 active:bg-white/20 transition-all text-slate-300 hover:text-white shrink-0"
          aria-label="Позвонить в клинику"
        >
          <svg className="w-5 h-5 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="text-[10px] font-medium leading-none">Звонок</span>
        </a>

        {/* WhatsApp button */}
        <a
          href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=${encodeURIComponent("Здравствуйте! Хочу записаться на консультацию в DentaLux.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-3 rounded-xl hover:bg-white/10 active:bg-white/20 transition-all text-emerald-400 shrink-0"
          aria-label="Написать в WhatsApp"
        >
          <svg className="w-5 h-5 mb-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span className="text-[10px] font-medium leading-none">WhatsApp</span>
        </a>

        {/* Separator */}
        <div className="w-px h-7 bg-white/15 my-auto" />

        {/* Main Appointment CTA */}
        <Link
          href="/appointment"
          className="flex-1 bg-white hover:bg-slate-100 active:scale-[0.98] text-slate-950 font-bold text-xs sm:text-sm py-3 px-4 rounded-xl text-center shadow-lg transition-all flex items-center justify-center gap-1.5"
        >
          <span>Записаться на приём</span>
          <svg className="w-3.5 h-3.5 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
