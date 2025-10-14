import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const lead = await prisma.lead.create({
    data: {
      name: 'Alice Doe',
      email: 'alice@example.com',
      company: 'Acme Corp',
      message: 'Excited to collaborate!',
    },
  });
  console.log('✅ Lead created:', lead);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
