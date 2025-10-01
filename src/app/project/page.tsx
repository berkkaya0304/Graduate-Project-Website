import React from "react";
export const metadata = {
  title: "Proje | Bitirme Takımı",
  description: "Proje amacı, teknoloji yığını ve zaman çizelgesi",
};

export default function ProjectPage() {
  const tech = [
    { name: "Next.js 15", desc: "App Router, Server Components" },
    { name: "React 19", desc: "Yeni use API'leri ve concurrency" },
    { name: "TypeScript", desc: "Tür güvenliği" },
    { name: "Tailwind v4", desc: "Hızlı stil oluşturma" },
  ];

  return (
    <div className="grid gap-6">
      <header className="card p-6">
        <h1 className="text-2xl font-semibold">Proje Bilgileri</h1>
        <p className="mt-2 opacity-90">
          Bu proje, gerçek dünya senaryosunu temel alan bir web uygulamasının uçtan uca
          analiz, tasarım, geliştirme ve yayınlama aşamalarını kapsar.
        </p>
      </header>

      <section className="card p-6 grid gap-3">
        <h2 className="font-medium">Hedefler</h2>
        <ul className="list-disc ms-5 opacity-90 text-sm space-y-1">
          <li>Ölçeklenebilir ve modüler mimari kurmak</li>
          <li>Erişilebilir ve performanslı arayüz geliştirmek</li>
          <li>Otomatik test ve CI/CD boru hattı oluşturmak</li>
        </ul>
      </section>

      <section className="card p-6 grid gap-3">
        <h2 className="font-medium">Teknoloji Yığını</h2>
        <ul className="grid sm:grid-cols-2 gap-3">
          {tech.map((t) => (
            <li key={t.name} className="p-4 border border-[var(--border)] rounded-lg">
              <div className="font-medium">{t.name}</div>
              <div className="text-sm opacity-80">{t.desc}</div>
            </li>
          ))}
        </ul>
      </section>

      <section className="card p-6 grid gap-3">
        <h2 className="font-medium">Zaman Çizelgesi</h2>
        <div className="text-sm opacity-90">
          Toplam 12 haftalık periyot: 3 hafta analiz, 3 hafta tasarım, 4 hafta geliştirme, 2 hafta test.
        </div>
      </section>
    </div>
  );
}


