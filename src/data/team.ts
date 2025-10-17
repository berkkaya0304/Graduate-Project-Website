import { type Member } from "@/components/TeamClient";

// Main team members (5 students)
export const teamMembers: Member[] = [
  {
    name: "Berk Kaya",
    role: "Project Manager / Full-stack",
    email: "berk@example.com",
    avatarUrl: "/vercel.svg",
    github: "https://github.com/berkk",
    linkedin: "https://www.linkedin.com/in/berkkaya",
    responsibilities: [
      "Sprint planning and coordination",
      "Back-end API design",
      "DevOps and deployment",
    ],
    skills: ["Node.js", "Next.js", "PostgreSQL", "Docker", "CI/CD"],
    bio: "Proje yöneticisi ve full-stack geliştirici olarak takım koordinasyonu ve teknik mimari tasarımından sorumlu. Performans ve güvenlik konularında uzmanlaşmış. Aflatoxin analiz sisteminin backend altyapısını ve deployment süreçlerini yönetiyor.",
  },
  {
    name: "Onur Turan",
    role: "Front-end Developer",
    avatarUrl: "/next.svg",
    email: "onur@example.com",
    responsibilities: ["Interface development", "State management", "Accessibility"],
    skills: ["React", "TypeScript", "Tailwind", "Vitest"],
    bio: "Frontend geliştirici olarak kullanıcı arayüzü tasarımı ve geliştirme süreçlerinde uzman. React ve TypeScript teknolojileri ile modern web uygulamaları geliştiriyor. Erişilebilirlik ve kullanıcı deneyimi odaklı çalışmalar yürütüyor.",
  },
  {
    name: "Alperen Aktaş",
    role: "Image Processing / CV",
    avatarUrl: "/globe.svg",
    email: "alperen@example.com",
    responsibilities: ["UV fluorescence analysis", "Image preprocessing", "Model training"],
    skills: ["OpenCV", "PyTorch", "NumPy", "Scikit-image", "UV Imaging"],
    bio: "Görüntü işleme ve bilgisayarlı görü uzmanı. UV ışık altında aflatoxin floresans tespiti konusunda çalışmalar yürütüyor. OpenCV ve PyTorch kullanarak makine öğrenmesi modelleri geliştiriyor. Görüntü ön işleme ve analiz algoritmaları tasarlıyor.",
  },
  {
    name: "İrem Ayça Uçankale",
    role: "Data Science / Analysis",
    avatarUrl: "/logo.svg",
    email: "irem@example.com",
    responsibilities: ["Data analysis", "Model validation", "Statistical evaluation"],
    skills: ["Pandas", "Scikit-learn", "Matplotlib", "Statistics"],
    bio: "Veri bilimi ve istatistiksel analiz uzmanı. Aflatoxin kontaminasyonu ile görsel özellikler arasındaki korelasyonu analiz ediyor. Pandas ve Scikit-learn kullanarak veri analizi ve model doğrulama süreçlerini yürütüyor. İstatistiksel değerlendirme ve raporlama konularında uzman.",
  },
  {
    name: "İlhan Ün",
    role: "Mobile / QA",
    avatarUrl: "/window.svg",
    email: "ilhan@example.com",
    responsibilities: ["Mobile integration", "Test automation", "Quality control"],
    skills: ["Flutter", "Playwright", "Cypress", "Mobile Testing"],
    bio: "Mobil uygulama geliştirme ve kalite güvencesi uzmanı. Flutter ile mobil uygulama entegrasyonları yapıyor. Test otomasyonu ve kalite kontrol süreçlerini yönetiyor. Playwright ve Cypress kullanarak end-to-end testler geliştiriyor.",
  },
];

// Advisor
export const advisor: Member = {
  name: "Emin Kuğu",
  role: "Advisor",
  avatarUrl: "/file.svg",
  email: "emin.kugu@university.edu",
  responsibilities: ["Project advisory", "Technical guidance", "Academic evaluation"],
  skills: ["Academic Supervision", "Research Methodology", "Project Management"],
  bio: "Proje danışmanı olarak teknik rehberlik sağlıyor ve akademik standartları belirliyor. Araştırma metodolojisi ve proje yönetimi konularında uzman. Takımın akademik gelişimini destekliyor ve proje kalitesini değerlendiriyor.",
};

// Jury members
export const juryMembers: Member[] = [
  {
    name: "Tolga Kurtuluş Çapın",
    role: "Jury Member",
    avatarUrl: "/globe.svg",
    email: "tolga.capin@university.edu",
    responsibilities: ["Project evaluation", "Jury membership", "Technical review"],
    skills: ["Project Evaluation", "Technical Review", "Academic Assessment"],
    bio: "Jüri üyesi olarak proje değerlendirme ve teknik inceleme süreçlerinde yer alıyor. Akademik değerlendirme ve teknik gözden geçirme konularında uzman. Proje kalitesini ve akademik standartları değerlendiriyor.",
  },
  {
    name: "Ayşe Yasemin Seydim",
    role: "Jury Member",
    avatarUrl: "/vercel.svg",
    email: "ayse.seydim@university.edu",
    responsibilities: ["Project evaluation", "Jury membership", "Academic evaluation"],
    skills: ["Project Evaluation", "Academic Assessment", "Research Review"],
    bio: "Jüri üyesi olarak proje değerlendirme ve akademik standartları belirleme süreçlerinde görev alıyor. Araştırma gözden geçirme ve akademik değerlendirme konularında uzman. Proje kalitesini ve akademik başarıyı değerlendiriyor.",
  },
];


