
# Scidyllics — Next.js + Tailwind + Prisma (SQLite)

**Full-stack template** for your AI + DevOps consulting portfolio.

## 🚀 Quick Start

```bash
# 1) Install deps
npm i

# 2) Configure env
cp .env.example .env

# 3) Generate Prisma client and DB
npx prisma db push

# 4) Run development servers
npm run dev          # Next.js app (http://localhost:3000)
npx prisma studio    # Database UI (http://localhost:5555)
```

Open http://localhost:3000 for your app and http://localhost:5555 for database management.

## 🔧 Development Workflow

For the best development experience, run both servers:

**Terminal 1 - Next.js Development Server:**
```bash
npm run dev
```

**Terminal 2 - Prisma Studio (Database UI):**
```bash
npx prisma studio
```

This gives you:
- **localhost:3000** - Your Next.js application
- **localhost:5555** - Prisma Studio for viewing/managing database records

### Database Management
- View contact form submissions in real-time via Prisma Studio
- Monitor database changes as you develop
- Easy data inspection and debugging

## 🧱 Tech Stack

### Frontend & Framework
- **Next.js 14** - React framework with App Router and API routes
- **TypeScript** - Type-safe JavaScript development
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for smooth transitions
- **Lucide Icons** - Beautiful icon library

### Database & ORM
- **Prisma ORM** - Type-safe database toolkit
- **SQLite** - Local development database (easily switch to PostgreSQL for production)
- **Prisma Studio** - Database management UI for development

### APIs & Services
- **Resend API** - Email service for contact form notifications
- **Next.js API Routes** - Backend API endpoints

### Development Tools
- **PowerShell** - Windows development environment
- **npm** - Package management

## 🗂 Structure
- `app/page.tsx` — Frontend (landing/portfolio)
- `app/api/contact/route.ts` — Stores contact leads to DB
- `app/api/cases/*` — Simple Case Study CRUD
- `prisma/schema.prisma` — Data models
- `lib/prisma.ts` — Prisma client

## 🔒 Notes
- Email functionality configured with Resend API but temporarily disabled for stability
- Contact form submissions are saved to SQLite database and viewable in Prisma Studio
- Rate limiting & auth are not included; add if exposing write APIs publicly
- Admin authentication: set ADMIN_PASSWORD in your environment and create an admin User record (matching email) in the DB to sign in at /admin/login
- Admin database viewer: after logging in at /admin/login, visit /admin/db to inspect users and blog posts. This endpoint requires the admin cookie and should be disabled or gated for production.

Seeding an initial admin user:
1. Set the environment variables in your local `.env` (or in Render):
	- `ADMIN_EMAIL` — the admin account email (e.g. admin@example.com)
	- `ADMIN_NAME` — optional display name (defaults to "Admin")
	- `ADMIN_PASSWORD` — password used to sign in at `/admin/login`
	- `ADMIN_COOKIE_SECRET` — a random long secret used to sign admin session cookies (required)
2. Install dev dependencies and run the seed script:

```bash
npm i
npm run seed
```

This will upsert the `User` with the `ADMIN_EMAIL`. After that, sign in at `/admin/login` with the email and `ADMIN_PASSWORD`, and you should see admin controls.
- Database file (`dev.db`) is excluded from git - run `npx prisma db push` after cloning

© 2025 Scidyllics
