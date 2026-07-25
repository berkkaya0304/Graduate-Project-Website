import React from "react";
import Full3DPageClient from "@/components/Full3DPageClient";
import { listPublicPdfs } from "@/lib/pdf";

export default function Home() {
  const pdfs = listPublicPdfs().map((p) => ({ name: p.name, href: p.href }));
  return <Full3DPageClient initialPdfs={pdfs} />;
}
