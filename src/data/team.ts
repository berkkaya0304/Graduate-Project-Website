import { type Member } from "@/components/TeamClient";

// Main team members (5 students)
export const teamMembers: Member[] = [
  {
    name: "Berk Kaya",
    role: "Project Member",
    email: "berk.kaya@tedu.edu.tr",
    avatarUrl: "/members/1.jpg",
    github: "https://github.com/berkkaya0304",
    linkedin: "https://www.linkedin.com/in/berkkaya",
    responsibilities: [
      "Frontend Development",
      "Website Maintenance",
      "Data Gathering",
      "DevOps - Cloud Computing",
      "Documentation",
    ],

    bio: "Senior Computer Engineering student at TED University",
  },
  {
    name: "Onur Turan",
    role: "Project Member",
    avatarUrl: "/members/2.jpg",
    email: "onur.turan@tedu.edu.tr",
    responsibilities: [
      "Data Gathering",
      "Image Processing",
      "AI Model Training",
      "Documentation",
    ],

    bio: "Senior Computer Engineering student at TED University",
  },
  {
    name: "Alperen Aktaş",
    role: "Project Member",
    avatarUrl: "/members/5.jpg",
    email: "alperen.aktas@tedu.edu.tr",
    responsibilities: [
      "AI Model Training",
      "Quality Assurance",
      "Testing",
      "Data Gathering",
      "Documentation",
    ],

    bio: "Senior Computer Engineering student at TED University",
  },
  {
    name: "İrem Ayça Uçankale",
      role: "Project Member",
    avatarUrl: "/members/4.jpg",
    email: "irem.ucankale@tedu.edu.tr",
    responsibilities: [
      "AI/ML Engineering",
      "Image Processing",
      "Data Pipeline",
      "Data Gathering",
      "Documentation",
    ],

    bio: "Senior Computer Engineering student at TED University",
  },
  {
    name: "İlhan Ün",
    role: "Project Member",
    avatarUrl: "/members/3.jpg",
    email: "ilhan.un@tedu.edu.tr",
    responsibilities: [
      "Database Management",
      "Data Gathering",
      "AI/ML Engineering",
      "Documentation",
    ],

    bio: "Senior Computer Engineering student at TED University",
  },
];

// Advisors
export const advisors: (Member & { project: string })[] = [
  {
    name: "Emin Kuğu",
    role: "Advisor",
    project: "Senior Project 1",
    avatarUrl: "/members/6.jpg",
    email: "emin.kugu@tedu.edu.tr",
    responsibilities: ["Project advisory", "Technical guidance", "Academic evaluation"],
    bio: "Dr. Emin Kuğu received his bachelor's degree from Istanbul University Computer Science Engineering Department, his master's degree from the Air Force Academy of Aeronautics and Space Technologies Institute Software Engineering, and his doctorate from Old Dominion University Electrical and Computer Engineering program. In addition to being a faculty member of the Department of Computer Engineering of the Air Force Academy, he worked as a part-time lecturer at different universities located in Istanbul and Ankara. He worked as a project manager in the Turkish Air Force Command Information System (HvBS) project and worked in software development processes of international defense projects. He has been working as a professor at TEDU in the Software Engineering Department as of May 2020",
  },
  {
    name: "Gökçe Nur Yılmaz",
    role: "Advisor",
    project: "Senior Project 2",
    avatarUrl: "/members/9.webp",
    email: "gokce.yilmaz@tedu.edu.tr",
    responsibilities: ["Project advisory", "Technical guidance", "Academic evaluation"],
    bio: "Gokce Nur Yilmaz received her Ph.D. degree from the I-Lab Multimedia Communication Research Group, part of the Centre for Vision, Speech and Signal Processing, University of Surrey, UK, in 2011. She is a Professor at the Department of Computer Engineering and acts as the Head of the Department at TED University. Her entrepreneur and academic experience positions her to play a pivotal role in many multidisciplinary EU (e.g., Horizon, COST, etc.) and national (e.g., TUBITAK, Ministry of Transport and Infrastructure, etc.) projects. She is the author of many scholarly publications in high-impact international journals, book chapters, and conference proceedings in collaboration with prestigious authors. Her entrepreneurial initiatives support her to serve as an R&D advisor for many companies. She has been serving as an organizer and scientific committee member of many international conferences and workshops. She was elevated to the grade of Senior Member of the Institute of Electrical and Electronics Engineers (IEEE), which is held only by 10% of the IEEE members and reflects professional maturity and documented achievements of significance.",
  },
];

// Keep backward-compat alias (first advisor = SP1)
export const advisor = advisors[0];

// Jury members
export const juryMembers: Member[] = [
  {
    name: "Tolga Kurtuluş Çapın",
    role: "Jury Member",
    avatarUrl: "/members/7.webp",
    email: "tolga.capin@tedu.edu.tr",
    responsibilities: ["Project evaluation", "Jury membership", "Technical review"],

    bio: "Tolga K. Çapın received his B.S. and M.S. degrees in Computer Engineering from Bilkent University in 1991 and 1993, and Ph.D. degree in Computer Sciences from Ecole Polytechnique Federale de Lausanne (EPFL) in 1998. Before joining TED University Computer Engineering Department, he worked at Nokia Research Center U.S.A. and worked on various projects related to the fields of mobile graphics, mobile interaction and augmented reality between 2000-2006. He worked as a member of staff at Computer Engineering Department of Bilkent University between 2006-2014.",
  },
  {
    name: "Ayşe Yasemin Seydim",
    role: "Jury Member",
    avatarUrl: "/members/8.jpeg",
    email: "yasemin.seydim@tedu.edu.tr",
    responsibilities: ["Project evaluation", "Jury membership", "Academic evaluation"],

    bio: "Ayşe Yasemin Seydim received her B.Sc. and M.Sc. degrees in Computer Engineering from Middle East Technical University (METU), Ankara, Turkey, in 1986 and 1989 respectively. She worked as a Systems Specialist/Researcher in the Central Bank of the Republic of Turkey (CBRT). As a graduate scholar of CBRT and researcher for NSF, she received her Ph.D. degree in Computer Science from Southern Methodist University, Dallas, Texas, USA, in 2003.  After her doctorate, she worked as a part- time faculty member at METU and worked on quality and risk management, IT Service Management, IT Strategy, and Project Portfolio Management at CBRT. She is interested in database management, mobile computing, wireless communications, and data mining.",
  },
];


