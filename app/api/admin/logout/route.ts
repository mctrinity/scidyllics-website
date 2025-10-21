import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  // Clear signed cookie
  // Clear both signed and session cookies (whichever may have been set)
  res.headers.set("Set-Cookie", `isAdminSigned=0; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
  res.headers.append("Set-Cookie", `isAdmin=0; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
  return res;
}
