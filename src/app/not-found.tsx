import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid place-items-center py-16 text-center">
      <div className="card p-8 max-w-md">
        <h1 className="text-3xl font-semibold">Sayfa Bulunamadı</h1>
        <p className="mt-2 opacity-80">Aradığınız sayfa mevcut değil veya taşınmış olabilir.</p>
        <Link href="/" className="btn-primary inline-block mt-5">Ana sayfaya dön</Link>
      </div>
    </div>
  );
}


