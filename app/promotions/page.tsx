import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Section from "@/components/ui/Section";
import { promotions } from "@/data/promotions";

export const metadata: Metadata = {
  title: "Акции",
  description: "Акции и специальные предложения стоматологической клиники DentaLux в Алматы.",
};

export default function PromotionsPage() {
  return (
    <>
      <section className="bg-white border-b border-gray-200 py-16 md:py-24">
        <div className="section-container">
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">Акции и предложения</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Выгодные предложения для новых и постоянных пациентов. Следите за обновлениями!
          </p>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {promotions.map((promo) => (
            <div key={promo.id} className="card overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={promo.image}
                  alt={promo.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {promo.badge && (
                  <span className="absolute top-4 left-4 bg-primary text-white text-sm font-semibold px-3 py-1 rounded-full">
                    {promo.badge}
                  </span>
                )}
                <div className="absolute bottom-4 left-4">
                  <span className="text-2xl font-bold text-white">{promo.discount}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-navy mb-2">{promo.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{promo.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    До {new Date(promo.validUntil).toLocaleDateString("ru-RU")}
                  </span>
                  <Link href="/appointment" className="btn-primary text-sm py-2 px-4">
                    Записаться
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
