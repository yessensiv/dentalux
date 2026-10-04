import { CLINIC_INFO } from "@/lib/utils";

export default function WhatsAppConfirmation({ url }: { url: string }) {
  return (
    <div className="space-y-5 py-8 text-center" role="status">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m5 12 4 4L19 6" /></svg>
      </div>
      <h2 className="text-2xl font-semibold">Заявка сохранена</h2>
      <p className="text-gray-600">Остался один шаг: откройте WhatsApp и отправьте готовое сообщение. Администратор подтвердит дату и время в чате.</p>
      <a href={url} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex">Отправить в WhatsApp</a>
      <p className="text-sm text-gray-600">Если WhatsApp недоступен, позвоните: <a href={`tel:${CLINIC_INFO.phoneRaw}`} className="underline">{CLINIC_INFO.phone}</a></p>
    </div>
  );
}
