"use client";

import { motion } from "framer-motion";
import { Review } from "@/data/reviews";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Оценка: ${rating} из 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewCard({
  review,
  index = 0,
}: {
  review: Review;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.1  }}
      className="card p-6 h-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-3">
        <StarRating rating={review.rating} />
        <span className="text-xs text-gray-400">
          {new Date(review.date).toLocaleDateString("ru-RU")}
        </span>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">{review.text}</p>
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
            {review.name[0]}
          </div>
          <span className="text-sm font-medium text-navy">{review.name}</span>
        </div>
        <span className="text-xs text-gray-400">{review.service}</span>
      </div>
      {review.doctorName && (
        <p className="text-xs text-gray-400 mt-2">Врач: {review.doctorName}</p>
      )}
    </motion.div>
  );
}
