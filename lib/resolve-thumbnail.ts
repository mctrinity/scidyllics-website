export async function resolveRemoteThumbnail(url?: string | null) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes('imgur.com')) return url;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });
    if (!res.ok) return url;
    const html = await res.text();
    const ogMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
    const twMatch = html.match(/<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/i);
    const candidate = ogMatch?.[1] || twMatch?.[1];
    if (candidate) return candidate.startsWith('//') ? `https:${candidate}` : candidate;
    const imgMatch = html.match(/(?:https?:)?\/\/i\.imgur\.com\/[\w%\-]+\.(?:jpg|jpeg|png|gif|webp)/i);
    if (imgMatch?.[0]) return imgMatch[0].startsWith('//') ? `https:${imgMatch[0]}` : imgMatch[0];
    return url;
  } catch (err) {
    return url;
  }
}
