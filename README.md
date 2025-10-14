# ATOMs Framework - Support Team Observation Tool

A web application for evaluating support teams using the **access: technology** Support Team Observation Framework.

> **Note**: This application is located directly in the `/home/mike/ATOMs` directory.

## Features

- 📋 **Public Framework View** - View all framework sections without authentication
- 🔐 **Authentication** - Simple magic link authentication via email
- 📝 **Evaluation Forms** - Single-page scrollable forms with all 9 framework sections
- 💾 **Save & Edit** - Save evaluations as drafts or complete them
- 📊 **Results Dashboard** - View prioritized action items (3s and 2s)
- 🖨️ **Export** - Print or export results to PDF
- 📱 **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Neon PostgreSQL
- **ORM**: Drizzle ORM
- **Auth**: Better Auth
- **Hosting**: Vercel

## Framework Sections

### Quality of Life considerations (4 sections)
1. Understanding of client's needs
2. Supportive of client intentions
3. Facilitate client autonomy and independence
4. Respectful & fair age/capacity-appropriate expectations

### AT buy-in (2 sections)
1. Recognise the positive impact AT can have
2. Understand and demonstrate AT best practice

### AT technical knowledge & understanding (3 sections)
1. Understand how the AT solution works and what it can do
2. Can identify and create opportunities for client to use AT solutions
3. Can troubleshoot and resolve technical barriers

## Local Development

### Prerequisites

- Node.js 18+ and npm
- A Neon PostgreSQL database (already configured)

### Setup

1. Install dependencies:
```bash
npm install
```

2. Environment variables are already configured in `.env.local`:
   - `DATABASE_URL` - Neon database connection string
   - `BETTER_AUTH_SECRET` - Auth secret key
   - `BETTER_AUTH_URL` - App URL (http://localhost:3000 for development)

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Schema

The database includes the following tables:
- `users` - User accounts
- `sessions` - Authentication sessions
- `accounts` - OAuth accounts
- `verifications` - Email verifications
- `evaluations` - Evaluation metadata (client, date, status)
- `evaluation_responses` - Individual section responses with ratings and notes

## Deployment to Vercel

### Option 1: Via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard:
   - `DATABASE_URL` - Your Neon database URL
   - `BETTER_AUTH_SECRET` - Generate a secure random string
   - `BETTER_AUTH_URL` - Your production URL (e.g., https://your-app.vercel.app)
   - `NEXT_PUBLIC_BETTER_AUTH_URL` - Same as BETTER_AUTH_URL

### Option 2: Via Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your repository
5. Add the environment variables listed above
6. Click "Deploy"

### Post-Deployment

After deploying, update your `.env.local` for production URLs if testing production features locally.

## Project Structure

```
/app
  /api
    /auth/[...all]/route.ts    # Better Auth routes
    /evaluations/route.ts      # Evaluation CRUD API
  /auth
    /login/page.tsx            # Login page
    /signup/page.tsx           # Signup page
  /dashboard/page.tsx          # User dashboard
  /evaluate
    /new/page.tsx              # New evaluation form
    /[id]/page.tsx             # Edit evaluation
    /[id]/results/page.tsx     # Results & next steps
  /page.tsx                    # Landing page
  /layout.tsx                  # Root layout

/components
  /evaluation-form.tsx         # Main evaluation form component
  /sign-out-button.tsx         # Sign out button

/lib
  /db
    /schema.ts                 # Drizzle database schema
    /index.ts                  # Database connection
  /auth.ts                     # Better Auth config
  /auth-client.ts              # Client-side auth
  /framework-data.ts           # Framework sections data
```

## Rating System

Each section uses a 3-point rating scale:

- **Rating 1** (Green) - Excellent performance, exceeds expectations
- **Rating 2** (Amber) - Good performance, meets expectations
- **Rating 3** (Red) - Needs improvement, action required

## Results View

After completing an evaluation, users see:
1. **Priority Items** - All sections rated 3 (red) with notes and actions
2. **Secondary Items** - All sections rated 2 (amber) with notes and actions
3. **Summary Statistics** - Count of ratings across all categories

## Support

For questions or support, contact access: technology.

## License

© 2025 access: technology. All rights reserved.
