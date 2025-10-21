import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const data = await req.json();
  const { email, password } = data || {};
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Server not configured: ADMIN_PASSWORD missing." }, { status: 500 });
  }
  if (!email || !password) {
    return NextResponse.json({ error: "Missing email or password." }, { status: 400 });
  }
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: "Admin account not found in database." }, { status: 404 });
  }

  const res = NextResponse.json({ ok: true });
  // Set an HttpOnly cookie to mark the session as admin
  const maxAge = 60 * 60 * 24 * 7; // 7 days
  res.headers.set(
    "Set-Cookie",
    `isAdmin=1; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}`
  );
  return res;
}
