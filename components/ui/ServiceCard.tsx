import Link from "next/link";
import Image from "next/image";
import type { Service } from "@/data/services";
import { formatPrice } from "@/data/prices";

export default function ServiceCard({ service }: { service: Service; index?: number }) {
  return <Link href={`/services/${service.slug}`} className="service-card group">
    <div className="relative aspect-[4/3] overflow-hidden bg-gray-blue">
      <Image src={service.image} alt={service.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
      {service.badge && <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1.5 text-xs text-navy">{service.badge}</span>}
    </div>
    <div className="flex flex-1 flex-col p-5">
      <h3 className="mb-2 text-xl font-semibold tracking-tight">{service.title}</h3>
      <p className="mb-6 text-sm leading-relaxed text-gray-600">{service.shortDescription}</p>
      <div className="mt-auto flex items-center justify-between gap-2 border-t border-gray-200 pt-4">
        <span className="font-medium">от {formatPrice(service.priceFrom)}</span>
        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
      </div>
    </div>
  </Link>;
}
