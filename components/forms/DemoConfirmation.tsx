export default function DemoConfirmation() {
  return (
    <div className="space-y-4 py-8 text-center" role="status">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m5 12 4 4L19 6" /></svg>
      </div>
      <h2 className="text-2xl font-semibold">Форма работает</h2>
      <p className="text-gray-600">Это демонстрационный сайт для портфолио. Данные никуда не отправлены, запись не создана.</p>
    </div>
  );
}
