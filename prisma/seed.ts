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

  // Ensure an admin cookie secret exists for local development
  if (!process.env.ADMIN_COOKIE_SECRET) {
    const crypto = await import('crypto');
    const secret = crypto.randomBytes(32).toString('hex');
    console.log('No ADMIN_COOKIE_SECRET found — generated one for you (dev only):', secret);
    // Persist to .env.local if it doesn't already define it
    const fs = await import('fs');
    const path = await import('path');
    const envLocal = path.join(process.cwd(), '.env.local');
    let doWrite = true;
    if (fs.existsSync(envLocal)) {
      const contents = fs.readFileSync(envLocal, 'utf-8');
      if (/^\s*ADMIN_COOKIE_SECRET\s*=\s*/m.test(contents)) doWrite = false;
    }
    if (doWrite) {
      const line = `ADMIN_COOKIE_SECRET=${secret}\n`;
      fs.appendFileSync(envLocal, line, 'utf-8');
      console.log('Wrote ADMIN_COOKIE_SECRET to .env.local');
    } else {
      console.log('.env.local already contains ADMIN_COOKIE_SECRET; not overwriting.');
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
