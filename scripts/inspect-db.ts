import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const users = await prisma.user.findMany();
    const posts = await prisma.blogPost.findMany();
    console.log('Users:');
    console.table(users.map(u => ({ id: u.id, name: u.name, email: u.email, avatarUrl: u.avatarUrl })));
    console.log('\nBlog Posts:');
    console.table(posts.map(p => ({ id: p.id, title: p.title, slug: p.slug, thumbnailUrl: p.thumbnailUrl })));
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
