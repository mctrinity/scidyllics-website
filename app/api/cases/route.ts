import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/cases — list all case studies
export async function GET() {
  const items = await prisma.caseStudy.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(items);
}

// POST /api/cases — create a new case study
export async function POST(req: NextRequest) {
  try {
    const { title, summary, impact } = await req.json();
    if (!title || !summary) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const created = await prisma.caseStudy.create({
      data: { title, summary, impact: impact || "" },
    });
    return NextResponse.json(created);
  } catch (error) {
    console.error("POST /api/cases error:", error);
    return new NextResponse("Server error", { status: 500 });
  }
}
