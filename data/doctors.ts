export interface Doctor {
  id: string;
  slug: string;
  name: string;
  position: string;
  specialization: string;
  experience: number;
  photo: string;
  education: string[];
  services: string[];
  shortBio: string;
  fullBio: string;
}

export const doctors: Doctor[] = [
  {
    id: "ivanova",
    slug: "ivanova-anna",
    name: "Иванова Анна Сергеевна",
    position: "Главный врач",
    specialization: "Терапевт, детский стоматолог",
    experience: 15,
    photo: "/images/doctors/ivanova.jpg",
    education: [
      "КазНМУ им. С.Д. Асфендиярова, стоматология (2011)",
      "Курсы повышения квалификации по эндодонтии (Германия, 2015)",
      "Сертификация по детской стоматологии (2017)",
      "Мастер-класс по эстетической реставрации (Москва, 2020)",
    ],
    services: ["therapy", "whitening", "pediatric", "hygiene"],
    shortBio: "Опытный терапевт с особым подходом к детям. Находит общий язык с пациентами любого возраста.",
    fullBio:
      "Анна Сергеевна — главный врач клиники DentaLux с 15-летним стажем. Специализируется на терапевтической и детской стоматологии. Регулярно проходит обучение в лучших клиниках мира. Её кредо — безболезненное лечение с максимальным комфортом для пациента.",
  },
  {
    id: "petrov",
    slug: "petrov-dmitriy",
    name: "Петров Дмитрий Александрович",
    position: "Стоматолог-ортопед",
    specialization: "Протезирование, имплантация",
    experience: 12,
    photo: "/images/doctors/petrov.jpg",
    education: [
      "Медицинский университет Астана, стоматология (2014)",
      "Ординатура по ортопедической стоматологии (2016)",
      "Курсы по CAD/CAM технологиям (Швейцария, 2018)",
      "Сертификация по имплантологии (Израиль, 2021)",
    ],
    services: ["prosthetics", "implantation", "therapy"],
    shortBio: "Виртуоз протезирования. Создаёт улыбки, неотличимые от натуральных.",
    fullBio:
      "Дмитрий Александрович — ведущий ортопед клиники с опытом более 12 лет. Владеет всеми современными технологиями протезирования, включая CAD/CAM. Установил более 3000 коронок и виниров. Каждая работа — произведение искусства.",
  },
  {
    id: "smirnov",
    slug: "smirnov-aleksey",
    name: "Смирнов Алексей Игоревич",
    position: "Хирург-имплантолог",
    specialization: "Имплантация, хирургия",
    experience: 18,
    photo: "/images/doctors/smirnov.jpg",
    education: [
      "Первый МГМУ им. И.М. Сеченова, стоматология (2008)",
      "Ординатура по хирургической стоматологии (2010)",
      "Сертификация Straumann (Швейцария, 2014)",
      "Курсы по навигационной имплантации (Германия, 2022)",
    ],
    services: ["implantation", "surgery", "prosthetics"],
    shortBio: "Один из лучших имплантологов региона. Более 5000 установленных имплантатов.",
    fullBio:
      "Алексей Игоревич — хирург-имплантолог высшей категории с 18-летним стажем. Выполнил более 5000 операций по имплантации зубов. Работает с системами Straumann, Nobel Biocare, Osstem. Регулярно выступает на международных конференциях.",
  },
  {
    id: "kozlova",
    slug: "kozlova-marina",
    name: "Козлова Марина Викторовна",
    position: "Врач-ортодонт",
    specialization: "Ортодонтия, исправление прикуса",
    experience: 10,
    photo: "/images/doctors/kozlova.jpg",
    education: [
      "КазНМУ им. С.Д. Асфендиярова, стоматология (2016)",
      "Ординатура по ортодонтии (2018)",
      "Сертификация по системе Invisalign (США, 2019)",
      "Курсы по цифровой ортодонтии (Южная Корея, 2023)",
    ],
    services: ["orthodontics"],
    shortBio: "Создаёт идеальные улыбки с помощью брекетов и элайнеров. Эксперт по Invisalign.",
    fullBio:
      "Марина Викторовна — врач-ортодонт, эксперт по элайнерам Invisalign. За 10 лет практики исправила прикус более 1500 пациентам. Использует 3D-планирование для предсказуемого результата. Любимая фраза: «Ровные зубы — это не роскошь, а инвестиция в здоровье».",
  },
];

export function getDoctorBySlug(slug: string): Doctor | undefined {
  return doctors.find((d) => d.slug === slug);
}

export function getDoctorById(id: string): Doctor | undefined {
  return doctors.find((d) => d.id === id);
}
