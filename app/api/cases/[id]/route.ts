import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/cases/:id
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const caseStudy = await prisma.caseStudy.findUnique({
      where: { id: params.id },
    });

    if (!caseStudy) {
      return new NextResponse("Not found", { status: 404 });
    }

    return NextResponse.json(caseStudy);
  } catch (error) {
    console.error("GET /api/cases/[id] error:", error);
    return new NextResponse("Server error", { status: 500 });
  }
}
