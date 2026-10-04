"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Doctor } from "@/data/doctors";

export default function DoctorCard({
  doctor,
  index = 0,
}: {
  doctor: Doctor;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.1  }}
    >
      <Link
        href={`/doctors/${doctor.slug}`}
        className="card group block overflow-hidden h-full"
      >
        <div className="relative h-64 w-full overflow-hidden bg-gray-100">
          <Image
            src={doctor.photo}
            alt={doctor.name}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-3 left-3">
            <span className="bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
              Стаж {doctor.experience} лет
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-navy group-hover:text-primary transition-colors mb-1">
            {doctor.name}
          </h3>
          <p className="text-sm text-primary font-medium mb-2">{doctor.position}</p>
          <p className="text-sm text-gray-600 line-clamp-2">{doctor.shortBio}</p>
        </div>
      </Link>
    </motion.div>
  );
}
