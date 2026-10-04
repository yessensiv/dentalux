import { getDentalIcon } from "@/components/ui/DentalIcons";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { services, getServiceBySlug } from "@/data/services";
import { doctors, getDoctorById } from "@/data/doctors";
import { priceCategories, formatPrice } from "@/data/prices";
import Section, { SectionHeader } from "@/components/ui/Section";
import Accordion from "@/components/ui/Accordion";
import DoctorCard from "@/components/ui/DoctorCard";
import PriceTable from "@/components/ui/PriceTable";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Услуга не найдена" };
  return {
    title: service.title,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const { slug } = await Promise.resolve(params);
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const relatedDoctors = service.relatedDoctorIds
    .map((id) => getDoctorById(id))
    .filter(Boolean) as typeof doctors;

  const priceCategory = priceCategories.find((c) => c.id === service.id);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-white border-b border-gray-200 py-16 md:py-24">
        <div className="section-container">
          <div className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-primary transition-colors">Услуги</Link>
            <span>/</span>
            <span className="min-w-0 break-words text-navy">{service.title}</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-5xl mb-4 block">{getDentalIcon(service.id, "h-10 w-10")}</span>
              <h1 className="mb-4 break-words text-[clamp(26px,8vw,36px)] font-bold text-navy md:text-5xl">{service.title}</h1>
              <p className="text-lg text-gray-600 mb-6">{service.description}</p>
              <div className="flex items-center gap-4">
                <Link href="/appointment" className="btn-primary">Записаться</Link>
                <span className="text-lg font-semibold text-primary">
                  от {formatPrice(service.priceFrom)}
                </span>
              </div>
            </div>
            <div className="relative h-64 md:h-80 rounded-none overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <Section>
        <SectionHeader title="Этапы лечения" subtitle="Понятный и прозрачный процесс" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {service.steps.map((step, i) => (
            <div key={i} className="relative">
              <div className="card p-6">
                <div className="w-10 h-10 bg-primary/10 rounded-none flex items-center justify-center mb-4">
                  <span className="text-lg font-bold text-primary">{i + 1}</span>
                </div>
                <h3 className="font-semibold text-navy mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Prices */}
      {priceCategory && (
        <Section className="bg-gray-blue">
          <SectionHeader title="Стоимость" />
          <div className="max-w-3xl mx-auto">
            <PriceTable items={priceCategory.items} />
          </div>
        </Section>
      )}

      {/* Related Doctors */}
      {relatedDoctors.length > 0 && (
        <Section>
          <SectionHeader title="Врачи" subtitle="Специалисты по данному направлению" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedDoctors.map((doc, i) => (
              <DoctorCard key={doc.id} doctor={doc} index={i} />
            ))}
          </div>
        </Section>
      )}

      {/* FAQ */}
      {service.faq.length > 0 && (
        <Section className="bg-gray-blue">
          <SectionHeader title="Частые вопросы" />
          <div className="max-w-3xl mx-auto">
            <Accordion items={service.faq} />
          </div>
        </Section>
      )}

      {/* CTA */}
      <Section>
        <div className="text-center max-w-xl mx-auto">
          <h2 className="section-title mb-4">Готовы записаться?</h2>
          <p className="text-gray-600 mb-6">
            Запишитесь на бесплатную консультацию и получите индивидуальный план лечения.
          </p>
          <Link href="/appointment" className="btn-primary text-lg py-4 px-8">
            Записаться на приём
          </Link>
        </div>
      </Section>
    </>
  );
}
