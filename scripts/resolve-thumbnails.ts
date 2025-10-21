import { PrismaClient } from '@prisma/client';
async function resolveRemoteThumbnail(url?: string | null) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes('imgur.com')) return url;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
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
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function main() {
  const posts = await prisma.blogPost.findMany({ where: { thumbnailUrl: { not: null } } });
  for (const p of posts) {
    const resolved = await resolveRemoteThumbnail(p.thumbnailUrl);
    if (resolved && resolved !== p.thumbnailUrl) {
      console.log(`Updating post ${p.slug}: ${p.thumbnailUrl} -> ${resolved}`);
      await prisma.blogPost.update({ where: { id: p.id }, data: { thumbnailUrl: resolved } });
    } else {
      console.log(`Skipping ${p.slug} (no change)`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
