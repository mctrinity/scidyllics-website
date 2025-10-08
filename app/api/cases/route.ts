
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.caseStudy.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, summary, impact } = body;
    if (!title || !summary) return new NextResponse("Missing fields", { status: 400 });
    const created = await prisma.caseStudy.create({ data: { title, summary, impact: impact || "" } });
    return NextResponse.json(created);
  } catch (e) {
    return new NextResponse("Server error", { status: 500 });
  }
}
