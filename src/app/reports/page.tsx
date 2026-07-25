import { listPublicPdfs } from "@/lib/pdf";

export const metadata = {
  title: "Reports",
  description: "Project reports and documents",
};

export default function ReportsPage() {
  const pdfs = listPublicPdfs();
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold">Reports</h1>
      <p className="mt-2 opacity-80">Project PDFs available for viewing and download.</p>
      <div className="mt-6 space-y-3">
        {pdfs.length === 0 ? (
          <p className="opacity-70">No PDFs found in <code className="font-mono">public/pdfs</code>.</p>
        ) : (
          pdfs.map((f) => (
            <div key={f.href} className="flex items-center justify-between border rounded px-3 py-2">
              <div className="min-w-0">
                <div className="font-medium truncate">{decodeURIComponent(f.href.replace("/pdfs/", ""))}</div>
                <div className="text-xs opacity-70">{(f.sizeBytes / 1024).toFixed(1)} KB</div>
              </div>
              <div className="flex items-center gap-2">
                <a className="text-sm border rounded px-3 py-1 hover:border-[var(--color-primary-600)]" href={f.href} target="_blank" rel="noreferrer">View</a>
                <a className="text-sm border rounded px-3 py-1 hover:border-[var(--color-primary-600)]" href={f.href} download>Download</a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}


