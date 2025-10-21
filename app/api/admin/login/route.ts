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
  const secret = process.env.ADMIN_COOKIE_SECRET;
  // If a secret is configured, set a signed persistent cookie; otherwise fall back to a session-only unsigned cookie
  if (secret) {
    const maxAge = 60 * 60 * 24 * 7; // 7 days
    const signature = await import('crypto').then(c => c.createHmac('sha256', secret).update('1').digest('hex'));
    const cookieVal = `1--${signature}`;
    // Secure flag only in production
    const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
    res.headers.set(
      "Set-Cookie",
      `isAdminSigned=${cookieVal}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`
    );
  } else {
    // Only allow the insecure session-only fallback in development
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: "Server not configured: ADMIN_COOKIE_SECRET missing." }, { status: 500 });
    }
    // Session-only unsigned cookie (no Max-Age) — will be cleared when browser closes
    res.headers.set("Set-Cookie", `isAdmin=1; Path=/; HttpOnly; SameSite=Lax`);
  }
  return res;
}
