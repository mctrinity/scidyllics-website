
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const updated = await prisma.caseStudy.update({ where: { id: params.id }, data: body });
    return NextResponse.json(updated);
  } catch (e) {
    return new NextResponse("Not found", { status: 404 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.caseStudy.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return new NextResponse("Not found", { status: 404 });
  }
}
