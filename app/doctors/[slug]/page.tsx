import { getDentalIcon } from "@/components/ui/DentalIcons";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { doctors, getDoctorBySlug } from "@/data/doctors";
import { services } from "@/data/services";
import Section, { SectionHeader } from "@/components/ui/Section";

export function generateStaticParams() {
  return doctors.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const doctor = getDoctorBySlug(slug);
  if (!doctor) return { title: "Врач не найден" };
  return {
    title: doctor.name,
    description: `${doctor.position} — ${doctor.specialization}. Стаж ${doctor.experience} лет.`,
  };
}

export default async function DoctorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const { slug } = await Promise.resolve(params);
  const doctor = getDoctorBySlug(slug);
  if (!doctor) notFound();

  const doctorServices = services.filter((s) => doctor.services.includes(s.id));

  return (
    <>
      <section className="bg-white border-b border-gray-200 py-16 md:py-24">
        <div className="section-container">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
            <span>/</span>
            <Link href="/doctors" className="hover:text-primary transition-colors">Врачи</Link>
            <span>/</span>
            <span className="text-navy">{doctor.name}</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="relative h-80 lg:h-full rounded-none overflow-hidden">
              <Image
                src={doctor.photo}
                alt={doctor.name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 33vw"
                priority
              />
            </div>
            <div className="lg:col-span-2">
              <h1 className="text-3xl md:text-4xl font-bold text-navy mb-2">{doctor.name}</h1>
              <p className="text-lg text-primary font-medium mb-1">{doctor.position}</p>
              <p className="text-gray-600 mb-4">{doctor.specialization}</p>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Стаж {doctor.experience} лет
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">{doctor.fullBio}</p>
              <Link href="/appointment" className="btn-primary">
                Записаться к {doctor.name.split(" ")[0]}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <Section>
        <SectionHeader title="Образование и сертификаты" centered={false} />
        <div className="space-y-3 max-w-2xl">
          {doctor.education.map((edu, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
              <p className="text-gray-600">{edu}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Services */}
      {doctorServices.length > 0 && (
        <Section className="bg-gray-blue">
          <SectionHeader title="Специализация" subtitle="Услуги, которые оказывает врач" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctorServices.map((s) => (
              <Link
                key={s.id}
                href={`/services/${s.slug}`}
                className="card p-5 flex items-center gap-4 hover:border-primary/30"
              >
                <span className="text-3xl">{getDentalIcon(s.id, "h-10 w-10")}</span>
                <div>
                  <h3 className="font-medium text-navy">{s.title}</h3>
                  <p className="text-xs text-gray-600 line-clamp-1">{s.shortDescription}</p>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
