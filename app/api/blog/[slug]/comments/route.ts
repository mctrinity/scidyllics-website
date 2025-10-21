import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request, { params }: { params: { slug: string } }) {
  const data = await req.json();
  const { name, email, text } = data || {};
  if (!name || !email || !text) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  try {
    const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } });
    if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({ data: { name, email } });
    }
    const comment = await prisma.comment.create({ data: { postId: post.id, authorId: user.id, text } });
    return NextResponse.json(comment, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
  }
}
