import Link from "next/link";
import type { InputHTMLAttributes } from "react";
import { PORTFOLIO_DEMO } from "@/lib/demo";

export default function Consent({ error, ...props }: InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3 py-2 text-sm leading-relaxed text-gray-600">
        <input {...props} type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-black" aria-invalid={!!error} />
        <span>{PORTFOLIO_DEMO ? "Понимаю, что это демо-форма и мои данные не отправляются." : "Согласен на обработку контактных данных для ответа на заявку."} <Link href="/privacy" className="underline underline-offset-4">Политика конфиденциальности</Link></span>
      </label>
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
    </div>
  );
}
