import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    // ✅ Lazy import Prisma only at runtime
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();

    const items = await prisma.caseStudy.findMany({
      orderBy: { createdAt: "desc" },
    });

    await prisma.$disconnect();

    return NextResponse.json(items);
  } catch (error) {
    console.error("GET /api/cases error:", error);
    return new NextResponse("Server error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();

    const { title, summary, impact } = await req.json();
    if (!title || !summary)
      return new NextResponse("Missing fields", { status: 400 });

    const created = await prisma.caseStudy.create({
      data: { title, summary, impact: impact || "" },
    });

    await prisma.$disconnect();

    return NextResponse.json(created);
  } catch (error) {
    console.error("POST /api/cases error:", error);
    return new NextResponse("Server error", { status: 500 });
  }
}
