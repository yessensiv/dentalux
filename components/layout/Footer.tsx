import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { CLINIC_INFO } from "@/lib/utils";

const footerLinks = [
  {
    title: "Услуги",
    links: [
      { href: "/services/terapiya", label: "Терапия" },
      { href: "/services/implantatsiya", label: "Имплантация" },
      { href: "/services/ortodontiya", label: "Ортодонтия" },
      { href: "/services/otbelivanie", label: "Отбеливание" },
      { href: "/services/detskaya-stomatologiya", label: "Детская стоматология" },
      { href: "/services/protezirovanie", label: "Протезирование" },
      { href: "/services/khirurgiya", label: "Хирургия" },
      { href: "/services/gigiena", label: "Гигиена" },
    ],
  },
  {
    title: "Клиника",
    links: [
      { href: "/about", label: "О нас" },
      { href: "/doctors", label: "Врачи" },
      { href: "/prices", label: "Цены" },
      { href: "/promotions", label: "Акции" },
      { href: "/reviews", label: "Отзывы" },
      { href: "/blog", label: "Блог" },
    ],
  },
  {
    title: "Пациентам",
    links: [
      { href: "/appointment", label: "Записаться" },
      { href: "/cases", label: "До и После" },
      { href: "/contacts", label: "Контакты" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Logo size={36} />
              <span className="text-xl font-bold">
                Denta<span className="text-primary">Lux</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Современная стоматологическая клиника в Алматы. Безболезненное лечение,
              передовые технологии и заботливый подход к каждому пациенту.
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-300">
                <span className="text-gray-600">Адрес: </span>
                {CLINIC_INFO.address}
              </p>
              <p className="text-gray-300">
                <span className="text-gray-600">Телефон: </span>
                <a href={`tel:${CLINIC_INFO.phoneRaw}`} className="hover:text-primary transition-colors">
                  {CLINIC_INFO.phone}
                </a>
              </p>
              <p className="text-gray-300">
                <span className="text-gray-600">Email: </span>
                <a href={`mailto:${CLINIC_INFO.email}`} className="hover:text-primary transition-colors">
                  {CLINIC_INFO.email}
                </a>
              </p>
            </div>

            {/* Working hours */}
            <div className="mt-4 space-y-1 text-sm text-gray-400">
              <p>{CLINIC_INFO.workingHours.weekdays}</p>
              <p>{CLINIC_INFO.workingHours.weekend}</p>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h3 className="font-semibold text-white mb-4">{col.title}</h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social links */}
        <div className="flex items-center gap-4 mt-10 pt-8 border-t border-white/10">
          <a
            href={CLINIC_INFO.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-none bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
            aria-label="Instagram"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </a>
          <a
            href={CLINIC_INFO.social.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-none bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
            aria-label="Telegram"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
          </a>
          <a
            href={CLINIC_INFO.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-none bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
            aria-label="YouTube"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} DentaLux. Все права защищены.</p>
          <Link href="/privacy" className="text-gray-300 hover:text-white underline underline-offset-4">Политика конфиденциальности</Link>
        </div>
      </div>
    </footer>
  );
}
