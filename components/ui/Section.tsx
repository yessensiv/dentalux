import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function Section({ children, className = "", id }: SectionProps) {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 scroll-mt-28 ${className}`}
    >
      <div className="section-container">{children}</div>
    </section>
  );
}

export function SectionHeader({
  title,
  subtitle,
  centered = false,
}: {
  title: string;
  subtitle?: string;
  centered?: boolean;
}) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className={`section-subtitle ${centered ? "mx-auto" : ""}`}>{subtitle}</p>}
    </div>
  );
}
