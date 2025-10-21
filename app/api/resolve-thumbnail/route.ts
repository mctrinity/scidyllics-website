import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url).searchParams.get('url');
  if (!url) return NextResponse.json({ error: 'Missing url' }, { status: 400 });
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch (err) {
    return NextResponse.json({ error: 'Invalid url' }, { status: 400 });
  }

  const host = parsed.hostname.toLowerCase();
  // Only support imgur for now
  if (!host.includes('imgur.com')) {
    return NextResponse.json({ resolved: url });
  }

  try {
    // Use a common browser user agent to increase chance of getting full HTML
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });
    if (!res.ok) return NextResponse.json({ resolved: url });
    const html = await res.text();
    // Look for og:image or twitter:image
    const ogMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
    const twMatch = html.match(/<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/i);
    const candidate = ogMatch?.[1] || twMatch?.[1];
    if (candidate) {
      // normalize to https
      const resolved = candidate.startsWith('//') ? `https:${candidate}` : candidate;
      return NextResponse.json({ resolved });
    }

    // Fallback: search the HTML for any i.imgur.com image links
    const imgMatch = html.match(/(?:https?:)?\/\/i\.imgur\.com\/[\w%\-]+\.(?:jpg|jpeg|png|gif|webp)/i);
    if (imgMatch?.[0]) {
      const resolved = imgMatch[0].startsWith('//') ? `https:${imgMatch[0]}` : imgMatch[0];
      return NextResponse.json({ resolved });
    }
    return NextResponse.json({ resolved: url });
  } catch (err) {
    return NextResponse.json({ resolved: url });
  }
}
