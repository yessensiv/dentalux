export interface PriceCategory {
  id: string;
  name: string;
  items: PriceItem[];
}

export interface PriceItem {
  name: string;
  price: number;
  priceMax?: number;
  unit?: string;
  note?: string;
}

export const priceCategories: PriceCategory[] = [
  {
    id: "therapy",
    name: "Терапия",
    items: [
      { name: "Консультация стоматолога", price: 0, note: "Бесплатно" },
      { name: "Лечение кариеса (одна поверхность)", price: 8000, priceMax: 12000 },
      { name: "Лечение кариеса (две поверхности)", price: 12000, priceMax: 18000 },
      { name: "Лечение пульпита (одноканальный зуб)", price: 20000, priceMax: 25000 },
      { name: "Лечение пульпита (многоканальный зуб)", price: 30000, priceMax: 45000 },
      { name: "Лечение периодонтита", price: 25000, priceMax: 50000 },
      { name: "Художественная реставрация зуба", price: 15000, priceMax: 25000 },
      { name: "Пломба световой полимеризации", price: 8000, priceMax: 15000 },
    ],
  },
  {
    id: "implantation",
    name: "Имплантация",
    items: [
      { name: "Имплантат Osstem (Южная Корея)", price: 120000, priceMax: 150000 },
      { name: "Имплантат Straumann (Швейцария)", price: 250000, priceMax: 320000 },
      { name: "Имплантат Nobel Biocare (Швейцария)", price: 280000, priceMax: 350000 },
      { name: "Костная пластика", price: 80000, priceMax: 150000 },
      { name: "Синус-лифтинг (открытый)", price: 150000, priceMax: 250000 },
      { name: "Синус-лифтинг (закрытый)", price: 80000, priceMax: 120000 },
      { name: "Формирователь десны", price: 15000, priceMax: 25000 },
      { name: "All-on-4 (одна челюсть)", price: 800000, priceMax: 1200000 },
    ],
  },
  {
    id: "orthodontics",
    name: "Ортодонтия",
    items: [
      { name: "Консультация ортодонта", price: 5000 },
      { name: "Металлические брекеты (одна челюсть)", price: 150000, priceMax: 200000 },
      { name: "Керамические брекеты (одна челюсть)", price: 200000, priceMax: 280000 },
      { name: "Сапфировые брекеты (одна челюсть)", price: 250000, priceMax: 320000 },
      { name: "Элайнеры Invisalign (полный курс)", price: 500000, priceMax: 800000 },
      { name: "Элайнеры Star Smile (полный курс)", price: 300000, priceMax: 450000 },
      { name: "Ретейнер (установка)", price: 15000, priceMax: 25000 },
    ],
  },
  {
    id: "prosthetics",
    name: "Протезирование",
    items: [
      { name: "Металлокерамическая коронка", price: 35000, priceMax: 45000 },
      { name: "Коронка из диоксида циркония", price: 55000, priceMax: 75000 },
      { name: "Коронка E-max", price: 60000, priceMax: 80000 },
      { name: "Винир керамический", price: 70000, priceMax: 100000 },
      { name: "Винир E-max", price: 80000, priceMax: 120000 },
      { name: "Съёмный протез (частичный)", price: 50000, priceMax: 80000 },
      { name: "Съёмный протез (полный)", price: 80000, priceMax: 150000 },
      { name: "Вкладка керамическая", price: 25000, priceMax: 40000 },
    ],
  },
  {
    id: "surgery",
    name: "Хирургия",
    items: [
      { name: "Удаление зуба (простое)", price: 10000, priceMax: 15000 },
      { name: "Удаление зуба (сложное)", price: 15000, priceMax: 25000 },
      { name: "Удаление зуба мудрости", price: 20000, priceMax: 35000 },
      { name: "Удаление ретинированного зуба", price: 30000, priceMax: 50000 },
      { name: "Резекция верхушки корня", price: 25000, priceMax: 40000 },
      { name: "Пластика уздечки", price: 10000, priceMax: 15000 },
    ],
  },
  {
    id: "hygiene",
    name: "Гигиена и отбеливание",
    items: [
      { name: "Профессиональная чистка (комплекс)", price: 12000, priceMax: 18000 },
      { name: "Ультразвуковая чистка", price: 6000, priceMax: 8000 },
      { name: "Air Flow", price: 5000, priceMax: 8000 },
      { name: "Фторирование (все зубы)", price: 5000, priceMax: 8000 },
      { name: "Отбеливание Zoom 4", price: 45000, priceMax: 65000 },
      { name: "Отбеливание Beyond", price: 25000, priceMax: 40000 },
      { name: "Домашнее отбеливание (набор)", price: 15000, priceMax: 25000 },
    ],
  },
  {
    id: "pediatric",
    name: "Детская стоматология",
    items: [
      { name: "Осмотр и консультация", price: 0, note: "Бесплатно" },
      { name: "Лечение кариеса молочного зуба", price: 5000, priceMax: 10000 },
      { name: "Серебрение зубов (один зуб)", price: 2000, priceMax: 3000 },
      { name: "Герметизация фиссур (один зуб)", price: 4000, priceMax: 6000 },
      { name: "Удаление молочного зуба", price: 3000, priceMax: 5000 },
      { name: "Пластика уздечки у детей", price: 8000, priceMax: 12000 },
    ],
  },
];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ru-RU").format(price) + " ₸";
}
