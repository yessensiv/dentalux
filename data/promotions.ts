export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  image: string;
  badge?: string;
}

export const promotions: Promotion[] = [
  {
    id: "1",
    title: "Бесплатная консультация",
    description:
      "Запишитесь на бесплатную консультацию стоматолога. Осмотр, диагностика и составление плана лечения — без оплаты.",
    discount: "Бесплатно",
    validUntil: "2026-12-31",
    image: "/images/services/therapy.jpg",
    badge: "Хит",
  },
  {
    id: "2",
    title: "Скидка 20% на отбеливание",
    description:
      "Профессиональное отбеливание Zoom 4 со скидкой 20%. Результат до 8 тонов за одно посещение. Красивая улыбка по выгодной цене!",
    discount: "-20%",
    validUntil: "2026-11-30",
    image: "/images/services/whitening.jpg",
    badge: "Скидка",
  },
  {
    id: "3",
    title: "Профгигиена + фторирование",
    description:
      "Комплексная профессиональная чистка (ультразвук + Air Flow + полировка) + фторирование всех зубов по специальной цене.",
    discount: "12 000 ₸",
    validUntil: "2026-12-31",
    image: "/images/services/hygiene.jpg",
    badge: "Выгодно",
  },
  {
    id: "4",
    title: "Рассрочка 0% на имплантацию",
    description:
      "Установите имплантат с рассрочкой до 12 месяцев без процентов и переплат. Доступно для всех систем имплантатов.",
    discount: "0%",
    validUntil: "2026-12-31",
    image: "/images/services/implantation.jpg",
    badge: "Рассрочка",
  },
];
