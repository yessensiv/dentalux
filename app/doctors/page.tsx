import { Metadata } from "next";
import DoctorCard from "@/components/ui/DoctorCard";
import Section from "@/components/ui/Section";
import { doctors } from "@/data/doctors";

export const metadata: Metadata = {
  title: "Врачи",
  description: "Команда профессиональных стоматологов клиники DentaLux. Опыт, квалификация и индивидуальный подход к каждому пациенту.",
};

export default function DoctorsPage() {
  return (
    <>
      <section className="bg-white border-b border-gray-200 py-16 md:py-24">
        <div className="section-container">
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">Наши врачи</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Команда профессионалов с международным опытом. Каждый врач — эксперт
            в своей области с постоянным повышением квалификации.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor, i) => (
            <DoctorCard key={doctor.id} doctor={doctor} index={i} />
          ))}
        </div>
      </Section>
    </>
  );
}
