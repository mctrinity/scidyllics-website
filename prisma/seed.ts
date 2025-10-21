import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const name = process.env.ADMIN_NAME || 'Admin';
  if (!email) {
    console.error('Please set ADMIN_EMAIL in your environment');
    process.exit(1);
  }
  const user = await prisma.user.upsert({
    where: { email },
    update: { name },
    create: { email, name },
  });
  console.log('Admin user upserted:', user.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
