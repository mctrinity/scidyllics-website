import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // ✅ Import Prisma only when needed (lazy import)
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();

    const caseStudy = await prisma.caseStudy.findUnique({
      where: { id: params.id },
    });

    await prisma.$disconnect();

    if (!caseStudy) {
      return new NextResponse("Not found", { status: 404 });
    }

    return NextResponse.json(caseStudy);
  } catch (error) {
    console.error("GET /api/cases/[id] error:", error);
    return new NextResponse("Server error", { status: 500 });
  }
}
