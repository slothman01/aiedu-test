import { NextResponse } from "next/server";
import { generateMockMetadata } from "@/lib/mock-ai";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const rawText = typeof body.rawText === "string" ? body.rawText : "";

    const metadata = generateMockMetadata(rawText);
    return NextResponse.json(metadata);
  } catch {
    return NextResponse.json(
      { error: "Failed to generate metadata" },
      { status: 500 }
    );
  }
}
