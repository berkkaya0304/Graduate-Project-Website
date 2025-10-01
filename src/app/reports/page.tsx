import React from "react";

export const metadata = {
  title: "Raporlar | Bitirme Takımı",
  description: "Haftalık ve teslim raporları zaman çizelgesi.",
};

export default function ReportsPage() {
  const milestones = [
    { date: "2025-10-01", title: "Proje Tanımı", detail: "Kapsam ve hedefler belirlendi." },
    { date: "2025-10-15", title: "Analiz Raporu", detail: "Gereksinim analizi ve kullanıcı hikayeleri." },
    { date: "2025-11-01", title: "Tasarım Teslimi", detail: "Bilgi mimarisi ve arayüz prototipleri." },
    { date: "2025-11-20", title: "Ara Sunum", detail: "İlerleme sunumu ve geri bildirimler." },
    { date: "2025-12-10", title: "Geliştirme Aşaması", detail: "Çekirdek modüller tamamlandı." },
    { date: "2025-12-25", title: "Test ve Düzeltmeler", detail: "Birim/entegrasyon testleri ve hatalar." },
    { date: "2026-01-05", title: "Final Sunumu", detail: "Canlı demo ve dokümantasyon teslimi." },
  ];

  return (
    <div className="grid gap-6">
      <header className="card p-6">
        <h1 className="text-2xl font-semibold">Raporlar ve Teslimler</h1>
        <p className="mt-2 opacity-90">
          Aşağıda projemizin önemli kilometre taşları ve teslim tarihleri yer alır.
        </p>
      </header>

      <section className="card p-6">
        <ol className="relative border-s border-[var(--border)] ps-6 space-y-5">
          {milestones.map((m) => (
            <li key={m.date} className="grid gap-1">
              <span className="absolute -start-1.5 mt-2 h-3 w-3 rounded-full bg-[var(--color-primary-600)]"></span>
              <div className="text-sm opacity-80">{new Date(m.date).toLocaleDateString("tr-TR")}</div>
              <h3 className="font-medium">{m.title}</h3>
              <p className="opacity-80 text-sm">{m.detail}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}


