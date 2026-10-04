import { Metadata } from "next";
import ReviewCard from "@/components/ui/ReviewCard";
import Section from "@/components/ui/Section";
import { reviews } from "@/data/reviews";

export const metadata: Metadata = {
  title: "Отзывы",
  description: "Отзывы пациентов стоматологической клиники DentaLux в Алматы. Реальные истории о лечении.",
};

export default function ReviewsPage() {
  return (
    <>
      <section className="bg-white border-b border-gray-200 py-16 md:py-24">
        <div className="section-container">
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">Отзывы пациентов</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Нам доверяют более 15 000 пациентов. Читайте реальные отзывы о лечении в нашей клинике.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-lg font-semibold text-navy">4.9</span>
            <span className="text-gray-600">на основе {reviews.length} отзывов</span>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <ReviewCard key={review.id} review={review} index={i} />
          ))}
        </div>
      </Section>
    </>
  );
}
