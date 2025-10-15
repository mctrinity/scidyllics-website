import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch IP and currency info from ipapi.co server-side
    const res = await fetch("https://ipapi.co/json/");
    if (!res.ok) throw new Error("Failed to fetch geo info");
    const data = await res.json();
    return NextResponse.json({
      city: data.city,
      country_code: data.country_code,
      currency: data.currency
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
