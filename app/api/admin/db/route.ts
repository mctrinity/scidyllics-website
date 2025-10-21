import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const cookieStore = cookies();
  if (cookieStore.get('isAdmin')?.value !== '1') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const users = await prisma.user.findMany({ select: { id: true, name: true, email: true, avatarUrl: true } });
  const posts = await prisma.blogPost.findMany({ select: { id: true, title: true, slug: true, thumbnailUrl: true, author: true } });
  return NextResponse.json({ users, posts });
}
