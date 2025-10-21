import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { prisma } from "@/lib/prisma";
import { resolveRemoteThumbnail } from "@/lib/resolve-thumbnail";

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  const cookieStore = cookies();
  if (cookieStore.get('isAdmin')?.value !== '1') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const data = await req.json();
  const { title, slug: newSlug, content, thumbnailUrl, author } = data;
  if (!title || !newSlug || !content || !author) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }
  try {
    let cleanThumbnail = thumbnailUrl && typeof thumbnailUrl === 'string' ? thumbnailUrl.trim() || null : null;
    if (cleanThumbnail) {
      cleanThumbnail = await resolveRemoteThumbnail(cleanThumbnail);
    }
    const updated = await prisma.blogPost.update({
      where: { slug: params.slug },
      data: {
        title,
        slug: newSlug,
        content,
        thumbnailUrl: cleanThumbnail,
        author,
      },
    });
    return NextResponse.json(updated, { status: 200 });
  } catch (err: any) {
    // Prisma unique constraint violation
    if (err?.code === "P2002") {
      return NextResponse.json({ error: "Slug already exists." }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to update post." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { slug: string } }) {
  const cookieStore = cookies();
  if (cookieStore.get('isAdmin')?.value !== '1') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    await prisma.blogPost.delete({ where: { slug: params.slug } });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to delete post." }, { status: 500 });
  }
}
