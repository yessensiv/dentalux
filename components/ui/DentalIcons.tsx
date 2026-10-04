import React from "react";

interface IconProps {
  className?: string;
}

export function TherapyIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 3C4.8 3 3 5 3 8c0 3 1.2 6 2 9.5C5.5 20 7 21 8.5 21s2-1.5 2.5-3.5c.3-1 .7-1.5 1-1.5s.7.5 1 1.5C13.5 19.5 14 21 15.5 21s3-1 3.5-3.5c.8-3.5 2-6.5 2-9.5 0-3-1.8-5-4-5-2 0-3.5 1-5 1S9 3 7 3z" fill="currentColor" fillOpacity={0.1} />
      <path d="M12 7v6m-3-3h6" strokeWidth={2} />
    </svg>
  );
}

export function ImplantIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 3h12a2 2 0 0 1 2 2v3a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V5a2 2 0 0 1 2-2z" fill="currentColor" fillOpacity={0.15} />
      <path d="M10 11v8l2 2 2-2v-8" strokeWidth={1.8} />
      <line x1="9" y1="13" x2="15" y2="13" strokeWidth={2} />
      <line x1="9.5" y1="16" x2="14.5" y2="16" strokeWidth={2} />
      <line x1="10" y1="19" x2="14" y2="19" strokeWidth={2} />
    </svg>
  );
}

export function OrthodonticsIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 7c4 2.5 14 2.5 18 0" strokeWidth={1.5} />
      <path d="M2 13.5c5 3.5 15 3.5 20 0" strokeWidth={2} />
      <rect x="5.5" y="11" width="3" height="3" rx="0.5" fill="currentColor" strokeWidth={1.5} />
      <rect x="10.5" y="12.5" width="3" height="3" rx="0.5" fill="currentColor" strokeWidth={1.5} />
      <rect x="15.5" y="11" width="3" height="3" rx="0.5" fill="currentColor" strokeWidth={1.5} />
    </svg>
  );
}

export function WhiteningIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 4C4.8 4 3 6 3 9c0 3 1.2 6 2 9.5C5.5 21 7 22 8.5 22s2-1.5 2.5-3.5c.3-1 .7-1.5 1-1.5s.7.5 1 1.5C13.5 20.5 14 22 15.5 22s3-1 3.5-3.5c.8-3.5 2-6.5 2-9.5 0-3-1.8-5-4-5-2 0-3.5 1-5 1S9 4 7 4z" fill="currentColor" fillOpacity={0.1} />
      <path d="M19 2v4m-2-2h4" strokeWidth={2} />
      <circle cx="12" cy="11" r="1.5" fill="currentColor" />
      <line x1="12" y1="8" x2="12" y2="9.5" strokeWidth={1.5} />
      <line x1="12" y1="12.5" x2="12" y2="14" strokeWidth={1.5} />
      <line x1="9" y1="11" x2="10.5" y2="11" strokeWidth={1.5} />
      <line x1="13.5" y1="11" x2="15" y2="11" strokeWidth={1.5} />
    </svg>
  );
}

export function PediatricIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 4C4.8 4 3 6 3 9c0 3 1.2 6 2 9.5C5.5 21 7 22 8.5 22s2-1.5 2.5-3.5c.3-1 .7-1.5 1-1.5s.7.5 1 1.5C13.5 20.5 14 22 15.5 22s3-1 3.5-3.5c.8-3.5 2-6.5 2-9.5 0-3-1.8-5-4-5-2 0-3.5 1-5 1S9 4 7 4z" fill="currentColor" fillOpacity={0.1} />
      <circle cx="9" cy="9.5" r="1" fill="currentColor" />
      <circle cx="15" cy="9.5" r="1" fill="currentColor" />
      <path d="M9.5 13c1 1.2 4 1.2 5 0" strokeWidth={1.8} strokeLinecap="round" />
    </svg>
  );
}

export function ProstheticsIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 11l2-7 3.5 4L12 4l2.5 4L18 4l2 7H4z" fill="currentColor" fillOpacity={0.18} />
      <path d="M5 13c0 4 1.5 7 2.5 8s1.5-1 2-2.5c.3-1 .8-1.5 1.5-1.5s1.2.5 1.5 1.5c.5 1.5 1 3.5 2 2.5s2.5-4 2.5-8" />
    </svg>
  );
}

export function SurgeryIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2l7 3v6c0 5.2-3.3 9.8-7 11-3.7-1.2-7-5.8-7-11V5l7-3z" fill="currentColor" fillOpacity={0.1} />
      <path d="M12 7v8m-4-4h8" strokeWidth={2.2} strokeLinecap="round" />
    </svg>
  );
}

export function HygieneIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 4C4.8 4 3 6 3 9c0 3 1.2 6 2 9.5C5.5 21 7 22 8.5 22s2-1.5 2.5-3.5c.3-1 .7-1.5 1-1.5s.7.5 1 1.5C13.5 20.5 14 22 15.5 22s3-1 3.5-3.5c.8-3.5 2-6.5 2-9.5 0-3-1.8-5-4-5-2 0-3.5 1-5 1S9 4 7 4z" fill="currentColor" fillOpacity={0.08} />
      <path d="M12 7c-1.5 2-2.5 3-2.5 4.5a2.5 2.5 0 0 0 5 0C14.5 10 13.5 9 12 7z" fill="currentColor" fillOpacity={0.3} />
      <circle cx="18" cy="6" r="1.5" />
      <circle cx="5" cy="8" r="1" />
    </svg>
  );
}

export function getDentalIcon(id: string, className = "w-5 h-5") {
  switch (id) {
    case "therapy":
      return <TherapyIcon className={className} />;
    case "implantation":
      return <ImplantIcon className={className} />;
    case "orthodontics":
      return <OrthodonticsIcon className={className} />;
    case "whitening":
      return <WhiteningIcon className={className} />;
    case "pediatric":
      return <PediatricIcon className={className} />;
    case "prosthetics":
      return <ProstheticsIcon className={className} />;
    case "surgery":
      return <SurgeryIcon className={className} />;
    case "hygiene":
      return <HygieneIcon className={className} />;
    default:
      return <TherapyIcon className={className} />;
  }
}
