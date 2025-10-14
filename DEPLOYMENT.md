# Deployment Guide for ATOMs Framework Tool

## Prerequisites

1. A Vercel account ([sign up here](https://vercel.com))
2. Your Neon database is already set up with connection string
3. Your code in a Git repository (GitHub, GitLab, or Bitbucket)

## Quick Deploy to Vercel

### Method 1: Vercel CLI (Recommended for First-Time)

1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Navigate to your project directory:
```bash
cd /home/mike/ATOMs
```

3. Login to Vercel:
```bash
vercel login
```

4. Deploy:
```bash
vercel
```

5. Follow the prompts:
   - Link to existing project? **No**
   - What's your project's name? **atoms-framework-tool**
   - In which directory is your code located? **./**
   - Auto-detected settings? **Yes**

6. After deployment, add environment variables:
```bash
vercel env add DATABASE_URL
vercel env add BETTER_AUTH_SECRET
vercel env add BETTER_AUTH_URL
vercel env add NEXT_PUBLIC_BETTER_AUTH_URL
```

For each variable:
- **Environment**: Production, Preview, Development
- **Value**: Enter the appropriate value

### Method 2: Vercel Dashboard

1. Push your code to GitHub (or GitLab/Bitbucket):
```bash
cd /home/mike/ATOMs
git add .
git commit -m "Initial commit: ATOMs Framework Tool"
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

2. Go to [vercel.com/new](https://vercel.com/new)

3. Click "Import Project" and select your repository

4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: .next
   - **Install Command**: `npm install`

5. Add Environment Variables:

Click "Environment Variables" and add:

| Name | Value | Environment |
|------|-------|-------------|
| `DATABASE_URL` | Your Neon connection string | Production, Preview |
| `BETTER_AUTH_SECRET` | Generate secure random string | Production, Preview |
| `BETTER_AUTH_URL` | Your production URL | Production |
| `BETTER_AUTH_URL` | Your preview URL (optional) | Preview |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | Same as BETTER_AUTH_URL | Production, Preview |

**Important**: For BETTER_AUTH_URL in production, use your final Vercel URL (e.g., `https://atoms-framework-tool.vercel.app`)

6. Click "Deploy"

## Post-Deployment Steps

### 1. Update Better Auth URLs

After your first deployment, you'll get a Vercel URL like `https://atoms-framework-tool.vercel.app`

Update these environment variables in Vercel dashboard:
- `BETTER_AUTH_URL` → `https://your-actual-domain.vercel.app`
- `NEXT_PUBLIC_BETTER_AUTH_URL` → `https://your-actual-domain.vercel.app`

Then redeploy or wait for the next deployment.

### 2. Test Your Deployment

1. Visit your Vercel URL
2. Create a test account
3. Create a test evaluation
4. Complete an evaluation and view results
5. Test the print/PDF export functionality

### 3. Custom Domain (Optional)

To add a custom domain:

1. Go to your project in Vercel dashboard
2. Navigate to "Settings" → "Domains"
3. Add your domain
4. Update DNS records as instructed
5. Update `BETTER_AUTH_URL` and `NEXT_PUBLIC_BETTER_AUTH_URL` to use your custom domain
6. Redeploy

## Environment Variables Reference

### Required for Production

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Neon PostgreSQL connection string | `postgresql://user:pass@host/db` |
| `BETTER_AUTH_SECRET` | Secret key for auth (min 32 chars) | Generate with `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | Your production URL | `https://atoms-framework.vercel.app` |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | Public auth URL (same as above) | `https://atoms-framework.vercel.app` |

### Optional (Social Auth)

| Variable | Description |
|----------|-------------|
| `GITHUB_CLIENT_ID` | GitHub OAuth App Client ID |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth App Client Secret |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret |

## Troubleshooting

### Build Errors

**Issue**: Build fails with "Cannot find module"
- **Solution**: Make sure all dependencies are in `package.json`
- Run `npm install` locally to verify

**Issue**: Type errors during build
- **Solution**: Run `npm run build` locally to catch TypeScript errors

### Authentication Issues

**Issue**: Cannot sign up or log in
- **Solution**: Check that `BETTER_AUTH_URL` matches your deployment URL
- Verify `DATABASE_URL` is correct and database is accessible

**Issue**: Session expires immediately
- **Solution**: Make sure `BETTER_AUTH_SECRET` is set and is a strong secret

### Database Connection Issues

**Issue**: Cannot connect to database
- **Solution**: Verify `DATABASE_URL` is correct
- Check Neon database is active and accepting connections
- Ensure connection string includes `?sslmode=require`

## Monitoring and Maintenance

### View Logs

```bash
vercel logs YOUR_DEPLOYMENT_URL
```

Or visit the Vercel dashboard → Your Project → Logs

### Redeploy

To trigger a new deployment:
```bash
vercel --prod
```

Or push to your main branch (if using Git integration)

### Database Migrations

If you need to update the database schema:

1. Update `lib/db/schema.ts`
2. Generate migration: `npx drizzle-kit generate`
3. Apply via Neon MCP or run migration manually
4. Deploy updated code

## Performance Tips

1. **Edge Functions**: Most routes are already optimized for edge deployment
2. **Image Optimization**: Next.js automatically optimizes images
3. **Caching**: Static pages are cached at the edge
4. **Database**: Use Neon's pooled connections for better performance

## Security Best Practices

1. **Environment Variables**: Never commit `.env.local` to Git
2. **Auth Secret**: Use a strong random secret (min 32 characters)
3. **Database**: Keep connection string private
4. **HTTPS**: Always use HTTPS in production (Vercel provides this automatically)
5. **Rate Limiting**: Consider adding rate limiting for API routes if needed

## Support

For issues or questions:
- Check [Vercel Documentation](https://vercel.com/docs)
- Check [Next.js Documentation](https://nextjs.org/docs)
- Contact access: technology support

## Rollback

If you need to rollback to a previous deployment:

1. Go to Vercel Dashboard → Your Project → Deployments
2. Find the working deployment
3. Click the three dots → "Promote to Production"

