import { NextResponse } from "next/server";
import { listPublicPdfs } from "@/lib/pdf";

export const dynamic = "force-dynamic"; // ensure fresh list in dev

export async function GET() {
  try {
    const pdfs = listPublicPdfs();
    return NextResponse.json({ pdfs });
  } catch {
    return NextResponse.json({ pdfs: [], error: "Failed to read PDFs" }, { status: 500 });
  }
}


