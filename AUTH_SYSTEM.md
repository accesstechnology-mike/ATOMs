# Simplified Authentication System

The ATOMs Framework Tool uses a simple, passwordless authentication system based on magic links.

## How It Works

1. **Single Auth Page**: `/auth` - combines sign up and sign in
2. **Email Only**: Users just enter their email address
3. **Magic Link**: A secure link is sent to their email
4. **Automatic Account Creation**: If email doesn't exist, account is created automatically
5. **Session Management**: Secure sessions with 30-day expiration

## User Flow

```
1. User visits /auth
2. Enters email address
3. Clicks "Send Magic Link"
4. Receives email with magic link (in dev: shown on screen)
5. Clicks magic link
6. Automatically signed in and redirected to dashboard
```

## Technical Implementation

### Database Tables Used
- `users` - User accounts (id, email, name, emailVerified, createdAt)
- `sessions` - Active sessions (id, userId, token, expiresAt, ipAddress, userAgent)
- `verifications` - Magic link tokens (id, identifier, value, expiresAt)

### API Routes
- `POST /api/auth/send-magic-link` - Creates user (if needed) and sends magic link
- `POST /api/auth/verify-magic-link` - Verifies token and creates session
- `POST /api/auth/signout` - Destroys session

### Session Management
- Sessions stored as HTTP-only cookies
- 30-day expiration
- Automatic cleanup of expired tokens
- Secure session verification for protected routes

## Development vs Production

### Development Mode
- Magic links are displayed in the browser for easy testing
- Console logs the magic link URL
- Uses HTTP cookies (secure in production)

### Production Setup
- Magic links sent via email (requires email service configuration)
- HTTPS-only secure cookies
- Environment variables for email provider

## Security Features

✅ **No Passwords**: Eliminates password-related security issues
✅ **Token Expiration**: Magic link tokens expire in 15 minutes
✅ **Session Security**: HTTP-only cookies prevent XSS attacks
✅ **Secure Tokens**: Cryptographically secure random tokens
✅ **Single Use**: Verification tokens are deleted after use
✅ **Session Cleanup**: Expired sessions automatically cleaned up

## Email Configuration (Production)

To enable email sending in production, add an email service:

```typescript
// In /api/auth/send-magic-link/route.ts
// Replace the console.log with actual email sending:

await sendEmail({
  to: email,
  subject: "Sign in to ATOMs Framework",
  html: `
    <p>Click the link below to sign in:</p>
    <a href="${magicLink}">Sign in to ATOMs Framework</a>
    <p>This link expires in 15 minutes.</p>
  `
});
```

Popular email services:
- Resend
- SendGrid  
- Amazon SES
- Mailgun
- Postmark

## Environment Variables

```bash
# Required
DATABASE_URL="postgresql://..."
BETTER_AUTH_SECRET="secure-random-string"
BETTER_AUTH_URL="https://your-domain.com"
NEXT_PUBLIC_BETTER_AUTH_URL="https://your-domain.com"

# Optional (for email service)
EMAIL_API_KEY="your-email-service-api-key"
```

## Testing the System

### Local Testing
1. Go to http://localhost:3000/auth
2. Enter any email address
3. Look for the magic link in the browser success message
4. Click the link to sign in

### Production Testing
1. Configure email service
2. Deploy to production
3. Enter real email address
4. Check email for magic link
5. Click to sign in

## Advantages of This System

🚀 **Simple UX**: No password complexity requirements
🔒 **Secure**: No password storage or breaches
📱 **Mobile Friendly**: Works great on all devices
⚡ **Fast**: No password reset flows needed
✨ **Modern**: Follows current best practices

## Extending the System

### Add Social Login
Add OAuth providers (Google, GitHub) alongside magic links:

```typescript
// Future enhancement: OAuth buttons on /auth page
// Can coexist with magic link authentication
```

### Add Two-Factor Authentication
For high-security needs, add TOTP after magic link verification.

### Add Organization Support
Extend user model to support teams/organizations:

```sql
ALTER TABLE users ADD COLUMN organization_id UUID;
```

## Troubleshooting

### "Magic link expired"
- Links expire in 15 minutes
- Generate a new link

### "Session expired"  
- Sessions last 30 days
- Sign in again with new magic link

### Email not received
- Check spam folder
- Verify email service configuration
- Check server logs for email sending errors

---

The magic link system provides excellent security and user experience while keeping the codebase simple and maintainable.
