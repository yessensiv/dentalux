import type { Metadata } from "next";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyMobileBar from "@/components/layout/StickyMobileBar";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import MotionProvider from "@/components/layout/MotionProvider";
import { PORTFOLIO_DEMO } from "@/lib/demo";

export const metadata: Metadata = {
  title: {
    template: "%s | DentaLux — Стоматология в Алматы",
    default: "DentaLux — Современная стоматология в Алматы",
  },
  description:
    "Современная стоматологическая клиника DentaLux в Алматы. Имплантация, протезирование, ортодонтия, отбеливание. Безболезненное лечение, гарантия качества.",
  keywords: [
    "стоматология алматы",
    "стоматолог",
    "имплантация зубов",
    "протезирование",
    "ортодонтия",
    "отбеливание",
    "лечение зубов",
    "DentaLux",
  ],
  openGraph: {
    title: "DentaLux — Современная стоматология в Алматы",
    description:
      "Безболезненное лечение, передовые технологии, гарантия качества. Запишитесь на бесплатную консультацию.",
    locale: "ru_RU",
    type: "website",
    siteName: "DentaLux",
  },
  robots: {
    index: !PORTFOLIO_DEMO,
    follow: !PORTFOLIO_DEMO,
  },
  metadataBase: new URL("https://dentalux.kz"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- Shared App Router root font stylesheet. */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {!PORTFOLIO_DEMO && <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Dentist",
              name: "DentaLux",
              description: "Современная стоматологическая клиника в Алматы",
              url: "https://dentalux.kz",
              telephone: "+77271234567",
              email: "info@dentalux.kz",
              address: {
                "@type": "PostalAddress",
                streetAddress: "ул. Абая 150, БЦ «Алатау», 2 этаж",
                addressLocality: "Алматы",
                addressCountry: "KZ",
              },
              openingHours: ["Mo-Fr 09:00-21:00", "Sa-Su 10:00-18:00"],
              priceRange: "₸₸",
              image: "https://dentalux.kz/opengraph-image",
              geo: {
                "@type": "GeoCoordinates",
                latitude: "43.2382",
                longitude: "76.9286",
              },
            }),
          }}
        />}
      </head>
      <body className="pb-24 lg:pb-0">
        <a href="#main-content" className="skip-link">Перейти к содержимому</a>
        <MotionProvider>
        {PORTFOLIO_DEMO && <div className="bg-slate-950 px-4 py-2 text-center text-xs font-medium tracking-wide text-white">Демонстрационный проект для портфолио · Контакты и отзывы вымышлены</div>}
        <Navbar />
        <main id="main-content" className="min-h-screen" tabIndex={-1}>{children}</main>
        <Footer />
        <StickyMobileBar />
        <WhatsAppButton />
        </MotionProvider>
      </body>
    </html>
  );
}
