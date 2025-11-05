import fs from "fs";
import path from "path";

export type PdfFile = {
  name: string; // display name
  href: string; // public path starting with /pdfs/
  sizeBytes: number;
  modifiedAt: number; // epoch ms
};

export function listPublicPdfs(): PdfFile[] {
  const publicDir = path.join(process.cwd(), "public");
  const pdfDir = path.join(publicDir, "pdfs");
  if (!fs.existsSync(pdfDir)) return [];

  const entries = fs.readdirSync(pdfDir, { withFileTypes: true });
  const pdfs: PdfFile[] = [];
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    if (!entry.name.toLowerCase().endsWith(".pdf")) continue;
    const filePath = path.join(pdfDir, entry.name);
    const stat = fs.statSync(filePath);
    pdfs.push({
      name: entry.name,
      href: "/pdfs/" + encodeURIComponent(entry.name),
      sizeBytes: stat.size,
      modifiedAt: stat.mtimeMs,
    });
  }

  // Sort by modified date desc
  pdfs.sort((a, b) => b.modifiedAt - a.modifiedAt);
  return pdfs;
}


