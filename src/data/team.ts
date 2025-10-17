import { type Member } from "@/components/TeamClient";

// Main team members (5 students)
export const teamMembers: Member[] = [
  {
    name: "Berk Kaya",
    role: "Proje Yöneticisi / Full-stack",
    email: "berk@example.com",
    avatarUrl: "/vercel.svg",
    github: "https://github.com/berkk",
    linkedin: "https://www.linkedin.com/in/berkkaya",
    responsibilities: [
      "Sprint planlama ve koordinasyon",
      "Back-end API tasarımı",
      "DevOps ve dağıtım",
    ],
    skills: ["Node.js", "Next.js", "PostgreSQL", "Docker", "CI/CD"],
    bio: "Takım koordinasyonu ve teknik mimariden sorumlu. Performans ve güvenlik konularına odaklanır.",
  },
  {
    name: "Onur Turan",
    role: "Front-end Geliştirici",
    avatarUrl: "/next.svg",
    email: "onur@example.com",
    responsibilities: ["Arayüz geliştirme", "Durum yönetimi", "Erişilebilirlik"],
    skills: ["React", "TypeScript", "Tailwind", "Vitest"],
    bio: "Kullanıcı deneyimi ve erişilebilirlik önceliğiyle arayüzleri geliştirir.",
  },
  {
    name: "Alperen Aktaş",
    role: "Görüntü İşleme / CV",
    avatarUrl: "/globe.svg",
    email: "alperen@example.com",
    responsibilities: ["UV floresans analizi", "Görüntü önişleme", "Model eğitimi"],
    skills: ["OpenCV", "PyTorch", "NumPy", "Scikit-image", "UV Imaging"],
    bio: "UV ışık altında aflatoksin floresansı tespiti üzerinde çalışır.",
  },
  {
    name: "İrem Ayça Uçankale",
    role: "Veri Bilimi / Analiz",
    avatarUrl: "/logo.svg",
    email: "irem@example.com",
    responsibilities: ["Veri analizi", "Model doğrulama", "İstatistiksel değerlendirme"],
    skills: ["Pandas", "Scikit-learn", "Matplotlib", "Statistics"],
    bio: "Aflatoksin kontaminasyonu ile görsel özellikler arasındaki korelasyonu analiz eder.",
  },
  {
    name: "İlhan Ün",
    role: "Mobil / QA",
    avatarUrl: "/window.svg",
    email: "ilhan@example.com",
    responsibilities: ["Mobil entegrasyon", "Test otomasyonu", "Kalite kontrol"],
    skills: ["Flutter", "Playwright", "Cypress", "Mobile Testing"],
    bio: "Test otomasyonu ve kalite süreçlerini yönetir. Mobil uygulama entegrasyonlarını yürütür.",
  },
];

// Advisor
export const advisor: Member = {
  name: "Emin Kuğu",
  role: "Danışman Hoca",
  avatarUrl: "/file.svg",
  email: "emin.kugu@university.edu",
  responsibilities: ["Proje danışmanlığı", "Teknik rehberlik", "Akademik değerlendirme"],
  skills: ["Academic Supervision", "Research Methodology", "Project Management"],
  bio: "Proje danışmanı olarak teknik rehberlik sağlar ve akademik standartları belirler.",
};

// Jury members
export const juryMembers: Member[] = [
  {
    name: "Tolga Kurtuluş Çapın",
    role: "Jüri Üyesi",
    avatarUrl: "/globe.svg",
    email: "tolga.capin@university.edu",
    responsibilities: ["Proje değerlendirme", "Jüri üyeliği", "Teknik inceleme"],
    skills: ["Project Evaluation", "Technical Review", "Academic Assessment"],
    bio: "Jüri üyesi olarak proje değerlendirme ve teknik inceleme süreçlerinde yer alır.",
  },
  {
    name: "Ayşe Yasemin Seydim",
    role: "Jüri Üyesi",
    avatarUrl: "/vercel.svg",
    email: "ayse.seydim@university.edu",
    responsibilities: ["Proje değerlendirme", "Jüri üyeliği", "Akademik değerlendirme"],
    skills: ["Project Evaluation", "Academic Assessment", "Research Review"],
    bio: "Jüri üyesi olarak proje değerlendirme ve akademik standartların belirlenmesinde rol alır.",
  },
];


