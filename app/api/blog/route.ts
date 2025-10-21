import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { isAdminServer } from '@/lib/admin';
import { prisma } from "@/lib/prisma";
import { resolveRemoteThumbnail } from "@/lib/resolve-thumbnail";

export async function POST(req: Request) {
  if (!isAdminServer()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const data = await req.json();
  const { title, slug, content, thumbnailUrl, author } = data;
  if (!title || !slug || !content || !author) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }
  try {
    let cleanThumbnail = thumbnailUrl && typeof thumbnailUrl === 'string' ? thumbnailUrl.trim() || null : null;
    if (cleanThumbnail) {
      cleanThumbnail = await resolveRemoteThumbnail(cleanThumbnail);
    }
    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        content,
        thumbnailUrl: cleanThumbnail,
        author,
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create post." }, { status: 500 });
  }
}
