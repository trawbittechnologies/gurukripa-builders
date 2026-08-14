# 🚀 Deploying Gurukripa Builders to Vercel

This full-stack **Next.js 15 App Router** application contains both the **Frontend** and **Backend API** (CMS database, lead intake, admin auth, upload engine) built to run seamlessly on Vercel.

---

## ⚡ Option 1: Deploy with Git (Recommended)

1. Push this project to GitHub / GitLab / Bitbucket.
2. Go to **[vercel.com](https://vercel.com)** and click **"Add New Project"**.
3. Import your repository.
4. **Root Directory**:
   - If your repository root is `gurukripa-builders`, set Root Directory to `./` (or `gurukripa-builders` if within a subfolder).
5. **Environment Variables**:
   Add the following in Vercel Project Settings > Environment Variables:
   - `ADMIN_USERNAME`: `admin`
   - `ADMIN_PASSWORD`: `gurukripa@2026` (or your custom password)
   - `ADMIN_SECRET`: `gurukripa_luxury_super_secret_jwt_2026_key`
6. Click **Deploy**! 🚀

---

## ⚡ Option 2: Deploy with Vercel CLI

From this directory (`d:\gurukripa builders\gurukripa-builders`), run:

```bash
# 1. Install Vercel CLI (if not already installed)
npm i -g vercel

# 2. Deploy to preview
vercel

# 3. Deploy to production
vercel --prod
```

---

## 🌐 Routes Overview on Vercel

| Endpoint | Description |
| :--- | :--- |
| **`https://your-domain.vercel.app/`** | Dynamic Homepage (Hero video, Stats, Journey, Services, Portfolio, Testimonials, Form) |
| **`https://your-domain.vercel.app/about`** | About Gurukripa Builders |
| **`https://your-domain.vercel.app/services`** | Construction & Interior Design Services |
| **`https://your-domain.vercel.app/projects`** | Portfolio & Gallery with Category Filters |
| **`https://your-domain.vercel.app/contact`** | Consultation Booking & Inquiry Form |
| **`https://your-domain.vercel.app/admin`** | Full Dynamic CMS & Admin Dashboard |
| **`https://your-domain.vercel.app/admin/login`** | Secure Glassmorphic Admin Login |
| **`https://your-domain.vercel.app/api/*`** | Backend Serverless APIs (Data, Contact, Inquiries, Auth, Upload) |

---

## 🔐 Admin Login Details

- **Login URL**: `/admin/login`
- **Default Username**: `admin`
- **Default Password**: `gurukripa@2026`
