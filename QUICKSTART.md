# Quick Start Guide

## Your ATOMs Framework Tool is Ready! 🎉

The application has been successfully created and is running in `/home/mike/ATOMs`.

## What's Been Set Up

✅ **Database**: Neon PostgreSQL project created (`wild-truth-48606514`)
✅ **Schema**: All tables created (users, sessions, evaluations, etc.)
✅ **Framework**: Next.js 14+ with TypeScript and Tailwind CSS
✅ **Authentication**: Magic link authentication configured (no passwords needed)
✅ **Forms**: All 9 framework sections implemented
✅ **Results**: Priority action items view (3s and 2s)

## Running Locally

The dev server is currently running on **http://localhost:3000**

To start/stop the server:

```bash
cd /home/mike/ATOMs

# Start development server
npm run dev

# Stop (if running in background)
pkill -f "next dev"
```

## Test the Application

1. **View Framework**: http://localhost:3000
   - See all 9 sections with descriptors
   - No login required

2. **Create Account**: 
   - Click "Get Started" or "Sign up"
   - Use any email/password

3. **Create Evaluation**:
   - Go to Dashboard
   - Click "New Evaluation"
   - Enter client name and date
   - Rate all 9 sections (1-3)
   - Add notes and action items
   - Complete evaluation

4. **View Results**:
   - See priority items (rated 3)
   - See secondary items (rated 2)
   - Print or export to PDF

## Project Structure

```
/home/mike/ATOMs/
├── app/                    # Next.js pages
│   ├── page.tsx           # Landing page (public framework)
│   ├── dashboard/         # User evaluations list
│   ├── evaluate/          # Evaluation forms and results
│   └── api/               # API routes
├── components/            # React components
├── lib/                   # Utilities and config
│   ├── db/               # Database schema and connection
│   ├── auth.ts           # Auth configuration
│   └── framework-data.ts # Framework sections
├── .env.local            # Environment variables (DO NOT COMMIT)
├── README.md             # Full documentation
└── DEPLOYMENT.md         # Vercel deployment guide
```

## Next Steps

### 1. Customize (Optional)

- **Brand Colors**: Edit `app/globals.css` or Tailwind config
- **Social Auth**: Add GitHub/Google OAuth credentials to `.env.local`
- **Email Verification**: Configure email provider in Better Auth

### 2. Deploy to Vercel

See `DEPLOYMENT.md` for detailed instructions:

```bash
# Quick deploy
npm install -g vercel
vercel
```

Then set environment variables in Vercel dashboard.

### 3. Set Up Git Remote

```bash
cd /home/mike/ATOMs

# Add your remote repository
git remote add origin YOUR_REPO_URL

# Push to GitHub
git add .
git commit -m "Initial commit: ATOMs Framework Tool"
git push -u origin main
```

## Database Info

- **Project ID**: `wild-truth-48606514`
- **Database**: `neondb`
- **Connection**: Already configured in `.env.local`

## Key Features Implemented

### Public Framework View ✅
- All 9 sections visible without login
- Quality of Life (4 sections)
- AT buy-in (2 sections)
- AT technical knowledge (3 sections)

### Authentication ✅
- Email/password sign up/login
- Session management
- Protected routes

### Evaluation Form ✅
- Single-page scrollable design
- All sections visible at once
- Radio button ratings (1-3)
- Notes and action fields
- Draft and complete options

### Dashboard ✅
- List all evaluations
- Filter by status
- Edit existing evaluations
- View results

### Results Page ✅
- Priority items (rating 3) shown first
- Secondary items (rating 2) shown second
- Notes and actions displayed
- Print/PDF export ready

## Environment Variables

Located in `.env.local` (already configured):

```
DATABASE_URL=<Neon connection string>
BETTER_AUTH_SECRET=<auth secret>
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

## Troubleshooting

### Port Already in Use

If you see "Port 3000 is in use", the app will use port 3001:
```
http://localhost:3001
```

Or kill the existing process:
```bash
pkill -f "next dev"
```

### Database Connection Issues

Verify the `DATABASE_URL` in `.env.local` is correct.

### Build Errors

Run locally first to catch errors:
```bash
npm run build
```

## Support

- **Documentation**: See `README.md` for full details
- **Deployment**: See `DEPLOYMENT.md` for Vercel setup
- **Framework Source**: See `ATOMs - Support Team Observation Framework.md`

## Quick Commands Reference

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Run production build

# Database
npx drizzle-kit generate # Generate migrations
npx drizzle-kit push     # Push schema to DB

# Deployment
vercel                   # Deploy to Vercel
vercel --prod            # Deploy to production

# Git
git status               # Check status
git add .                # Stage all files
git commit -m "message"  # Commit changes
git push                 # Push to remote
```

---

**Your application is ready to use!** Open http://localhost:3000 in your browser to get started.

