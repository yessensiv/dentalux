export default function Logo({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="DentaLux логотип"
    >
      {/* Strict minimalist logo: sharp lines, no gradients */}
      <path
        d="M12 6H36V18C36 24 30 30 28 36L26 42H22L20 36C18 30 12 24 12 18V6Z"
        fill="black"
      />
      <rect x="22" y="16" width="4" height="12" fill="white" />
      <rect x="18" y="20" width="12" height="4" fill="white" />
    </svg>
  );
}
