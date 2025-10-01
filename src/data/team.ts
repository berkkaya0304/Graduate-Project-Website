import { type Member } from "@/components/TeamClient";

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
    name: "Üye 2",
    role: "Front-end Geliştirici",
    avatarUrl: "/next.svg",
    email: "uye2@example.com",
    responsibilities: ["Arayüz geliştirme", "Durum yönetimi", "Erişilebilirlik"],
    skills: ["React", "TypeScript", "Tailwind", "Vitest"],
    bio: "Kullanıcı deneyimi ve erişilebilirlik önceliğiyle arayüzleri geliştirir.",
  },
  {
    name: "Üye 3",
    role: "Mobil / QA",
    avatarUrl: "/globe.svg",
    email: "uye3@example.com",
    responsibilities: ["Mobil entegrasyon", "Test otomasyonu", "Hata raporlama"],
    skills: ["Flutter", "Playwright", "Cypress"],
    bio: "Test otomasyonu ve kalite süreçlerini yönetir. Mobil uygulama entegrasyonlarını yürütür.",
  },
];


