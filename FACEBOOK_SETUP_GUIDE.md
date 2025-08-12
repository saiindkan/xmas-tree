# Facebook OAuth Setup Guide

## Step 1: Create a Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "My Apps" → "Create App"
3. Select "Consumer" app type
4. Fill in app details:
   - App Name: "Christmas Tree Shop"
   - App Contact Email: your email
   - App Purpose: "Yourself or your own business"

## Step 2: Configure Facebook Login

1. In your app dashboard, click "Add Product"
2. Find "Facebook Login" and click "Set Up"
3. Select "Web" platform
4. Enter your site URL: `http://localhost:3000`

## Step 3: Configure OAuth Settings

1. Go to Facebook Login → Settings
2. Add these Valid OAuth Redirect URIs:
   ```
   http://localhost:3000/api/auth/callback/facebook
   https://your-production-domain.com/api/auth/callback/facebook
   ```
3. Enable "Use Strict Mode for Redirect URIs"

## Step 4: Get App Credentials

1. Go to Settings → Basic
2. Copy your "App ID" (this is your FACEBOOK_CLIENT_ID)
3. Copy your "App Secret" (this is your FACEBOOK_CLIENT_SECRET)

## Step 5: Update Environment Variables

Replace the placeholder values in `.env.local`:

```env
FACEBOOK_CLIENT_ID=your_actual_app_id_here
FACEBOOK_CLIENT_SECRET=your_actual_app_secret_here
```

## Step 6: Test the Integration

1. Restart your development server: `npm run dev`
2. Go to `/auth/signup` or `/auth/signin`
3. Click "Sign up with Facebook"
4. Complete the Facebook OAuth flow

## Troubleshooting

- **Invalid App ID Error**: Make sure you're using the correct App ID from Facebook Developer Console
- **Redirect URI Mismatch**: Ensure the redirect URI in Facebook settings matches exactly: `http://localhost:3000/api/auth/callback/facebook`
- **App Not Live**: For production, you'll need to make your Facebook app "Live" in the App Review section

## Production Deployment

Before going live:
1. Add your production domain to Valid OAuth Redirect URIs
2. Submit your app for Facebook App Review if required
3. Update NEXTAUTH_URL to your production domain
4. Make sure your app is set to "Live" mode
