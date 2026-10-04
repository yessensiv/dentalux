import Link from "next/link";
import Logo from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <div className="flex justify-center mb-6">
          <Logo size={64} />
        </div>
        <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold text-navy mb-3">Страница не найдена</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          К сожалению, запрашиваемая страница не существует. Возможно, она была удалена
          или вы перешли по неправильной ссылке.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">
            На главную
          </Link>
          <Link href="/contacts" className="btn-secondary">
            Связаться с нами
          </Link>
        </div>
      </div>
    </div>
  );
}
