# Gurukripa Builders — Website & Admin CMS

A production Next.js 15 website and content management system for **Gurukripa Builders**, a premium construction company based in Kerala, India.

## Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: Neon Serverless PostgreSQL via `pg` (node-postgres)
- **Styling**: Vanilla CSS (globals.css)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Inter + Syne (Google Fonts)
- **Deployment**: Vercel

## Project Structure

```
app/                  # Next.js App Router pages
  layout.jsx          # Root layout — fonts, global providers
  page.jsx            # Public homepage
  about/              # About page
  contact/            # Contact page
  projects/           # Projects/gallery page
  services/           # Services page
  admin/              # Admin CMS (protected)
    login/            # Admin login
    page.jsx          # Dashboard overview
    projects/         # Manage portfolio projects
    services/         # Manage services
    inquiries/        # View & manage client leads
    testimonials/     # Manage testimonials
    settings/         # Site settings & company info
  api/
    auth/             # Login, logout, session check
    contact/          # Public contact form submission
    data/             # Site content CRUD (GET/PUT)
    inquiries/        # Inquiry management (GET/PATCH/DELETE)
    upload/           # File upload handler

components/           # Shared UI components
context/              # React context (DataContext)
lib/
  db.js               # PostgreSQL pool, all DB operations
  auth.js             # Admin session verification
data/
  db.json             # Fallback site content (when DB unavailable)
  inquiries.json      # Fallback inquiries (when DB unavailable)
prisma/
  schema.prisma       # DB schema reference (not used at runtime)
scripts/
  seed-db.js          # One-time DB seeding script
public/               # Static assets
```

## Getting Started

### 1. Clone & Install

```bash
npm install
```

### 2. Set Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:
- `DATABASE_URL` — Neon PostgreSQL connection string
- `ADMIN_USERNAME` — Admin login username
- `ADMIN_PASSWORD` — Admin login password  
- `ADMIN_SECRET` — Random secret used as admin session cookie value

### 3. Seed the Database

Run once to create tables and seed initial data:

```bash
npm run seed
```

> ⚠️ Requires `DATABASE_URL` to be set in your environment.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

### 5. Build for Production

```bash
npm run build
```

## Database Architecture

The app uses a **PostgreSQL-first with local fallback** pattern:

- **Primary**: Neon Serverless PostgreSQL (3 tables: `admins`, `site_data`, `inquiries`)
- **Fallback**: Local `data/db.json` and `data/inquiries.json` files

The `site_data` table stores the entire site content as a single JSONB blob, editable via the admin CMS.

## Deployment

See [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md) for Vercel-specific instructions.
