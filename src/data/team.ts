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
    bio: "Responsible for team coordination and technical architecture. Focuses on performance and security issues.",
  },
  {
    name: "Onur Turan",
    role: "Front-end Developer",
    avatarUrl: "/next.svg",
    email: "onur@example.com",
    responsibilities: ["Interface development", "State management", "Accessibility"],
    skills: ["React", "TypeScript", "Tailwind", "Vitest"],
    bio: "Develops interfaces with a focus on user experience and accessibility.",
  },
  {
    name: "Alperen Aktaş",
    role: "Image Processing / CV",
    avatarUrl: "/globe.svg",
    email: "alperen@example.com",
    responsibilities: ["UV fluorescence analysis", "Image preprocessing", "Model training"],
    skills: ["OpenCV", "PyTorch", "NumPy", "Scikit-image", "UV Imaging"],
    bio: "Works on aflatoxin fluorescence detection under UV light.",
  },
  {
    name: "İrem Ayça Uçankale",
    role: "Data Science / Analysis",
    avatarUrl: "/logo.svg",
    email: "irem@example.com",
    responsibilities: ["Data analysis", "Model validation", "Statistical evaluation"],
    skills: ["Pandas", "Scikit-learn", "Matplotlib", "Statistics"],
    bio: "Analyzes the correlation between aflatoxin contamination and visual characteristics.",
  },
  {
    name: "İlhan Ün",
    role: "Mobile / QA",
    avatarUrl: "/window.svg",
    email: "ilhan@example.com",
    responsibilities: ["Mobile integration", "Test automation", "Quality control"],
    skills: ["Flutter", "Playwright", "Cypress", "Mobile Testing"],
    bio: "Manages test automation and quality processes. Conducts mobile application integrations.",
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
  bio: "Provides technical guidance as project advisor and sets academic standards.",
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
    bio: "Participates in project evaluation and technical review processes as a jury member.",
  },
  {
    name: "Ayşe Yasemin Seydim",
    role: "Jury Member",
    avatarUrl: "/vercel.svg",
    email: "ayse.seydim@university.edu",
    responsibilities: ["Project evaluation", "Jury membership", "Academic evaluation"],
    skills: ["Project Evaluation", "Academic Assessment", "Research Review"],
    bio: "Takes part in project evaluation and setting academic standards as a jury member.",
  },
];


