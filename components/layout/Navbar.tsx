"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import { CLINIC_INFO } from "@/lib/utils";

const links = [
  { href: "/services", label: "Услуги" },
  { href: "/doctors", label: "Врачи" },
  { href: "/prices", label: "Цены" },
  { href: "/about", label: "О клинике" },
  { href: "/contacts", label: "Контакты" },
];
const extraLinks = [
  { href: "/cases", label: "Результаты лечения" },
  { href: "/reviews", label: "Отзывы" },
  { href: "/promotions", label: "Акции" },
  { href: "/blog", label: "Блог" },
];

export default function Navbar() {
  const pathname = usePathname();
  return <Navigation key={pathname} pathname={pathname} />;
}

function Navigation({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    if (open) element?.showModal(); else element?.close();
    const previousOverflow = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);
  return <>
    <div className="hidden lg:block border-b border-gray-200 bg-gray-blue">
      <div className="section-container flex justify-between gap-5 py-2 text-xs text-gray-600">
        <span>{CLINIC_INFO.address}</span><span>{CLINIC_INFO.workingHours.weekdays}</span>
        <a href={`tel:${CLINIC_INFO.phoneRaw}`} className="font-semibold text-navy">{CLINIC_INFO.phone}</a>
      </div>
    </div>
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <nav aria-label="Главная навигация" className="section-container flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5" aria-label="DentaLux — главная"><Logo size={34} /><span className="text-2xl font-semibold tracking-tight">DentaLux</span></Link>
        <div className="hidden lg:flex items-center gap-7">
          {links.map((link) => link.href === "/about" ? <details key={link.href} className="relative">
            <summary className="cursor-pointer text-sm text-gray-600">О клинике</summary>
            <div className="absolute top-full left-0 mt-5 w-56 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
              {[link, ...extraLinks].map((item) => <Link key={item.href} href={item.href} className="block rounded-lg px-4 py-3 text-sm hover:bg-gray-blue">{item.label}</Link>)}
            </div>
          </details> : <Link key={link.href} href={link.href} aria-current={pathname.startsWith(link.href) ? "page" : undefined} className={`py-3 text-sm transition-colors hover:text-black ${pathname.startsWith(link.href) ? "text-black font-semibold" : "text-gray-600"}`}>{link.label}</Link>)}
        </div>
        <Link href="/appointment" className="btn-primary hidden lg:inline-flex">Записаться</Link>
        <button type="button" onClick={() => setOpen(true)} className="flex h-11 items-center gap-2 rounded-lg border border-gray-200 px-4 text-sm lg:hidden" aria-label="Открыть меню" aria-haspopup="dialog" aria-expanded={open}>
          Меню <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 8h16M4 16h16" /></svg>
        </button>
      </nav>
    </header>
    <dialog ref={dialog} className="mobile-menu" onCancel={() => setOpen(false)} onClose={() => setOpen(false)} aria-labelledby="menu-title">
      <div className="flex items-center justify-between gap-3 border-b border-gray-200 pb-5">
        <h2 id="menu-title" className="text-xl font-semibold">DentaLux</h2>
        <button type="button" onClick={() => setOpen(false)} aria-label="Закрыть меню" className="h-11 w-11 rounded-full border border-gray-200 text-2xl">×</button>
      </div>
      <nav aria-label="Мобильная навигация" className="grid gap-1 py-4">
        {[{ href: "/", label: "Главная" }, ...links, ...extraLinks].map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} aria-current={pathname === link.href ? "page" : undefined} className="rounded-lg px-3 py-3 text-base hover:bg-gray-blue">{link.label}</Link>)}
      </nav>
      <Link href="/appointment" onClick={() => setOpen(false)} className="btn-primary flex">Записаться на приём</Link>
      <a href={`tel:${CLINIC_INFO.phoneRaw}`} className="mt-5 block text-center font-medium">{CLINIC_INFO.phone}</a>
      <p className="mt-3 text-center text-sm text-gray-600">{CLINIC_INFO.workingHours.weekdays}<br />{CLINIC_INFO.workingHours.weekend}</p>
    </dialog>
  </>;
}
