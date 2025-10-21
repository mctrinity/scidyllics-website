import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function main() {
  const comments = await prisma.comment.findMany({ include: { author: true, post: true } });
  if (comments.length === 0) {
    console.log('No comments found.');
    return;
  }
  console.log('Comments:');
  for (const c of comments) {
    console.log({ id: c.id, postSlug: c.post.slug, authorEmail: c.author.email, authorName: c.author.name, text: c.text, createdAt: c.createdAt });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
