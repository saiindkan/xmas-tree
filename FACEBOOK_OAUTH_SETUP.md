# Facebook OAuth Setup Guide

## Quick Fix for Current Error

The "Invalid app ID" error occurs because Facebook OAuth credentials are not properly configured. I've temporarily disabled the Facebook provider to prevent this error.

## How to Enable Facebook OAuth

### Step 1: Create Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "Create App" → Choose "Consumer" type
3. Fill in app details:
   - **App Name**: Your app name (e.g., "Xmas Tree Shop")
   - **Contact Email**: Your email
   - **App Purpose**: Authentication

### Step 2: Add Facebook Login Product

1. In your Facebook app dashboard, click "Add Product"
2. Find "Facebook Login" and click "Set Up"
3. Choose "Web" platform

### Step 3: Configure OAuth Settings

1. Go to "Facebook Login" → "Settings"
2. Add these **Valid OAuth Redirect URIs**:
   ```
   http://localhost:3000/api/auth/callback/facebook
   https://yourdomain.com/api/auth/callback/facebook
   ```
3. Set **App Domains**: `localhost` (for development)

### Step 4: Get Your Credentials

1. Go to "Settings" → "Basic"
2. Copy your **App ID**
3. Copy your **App Secret** (click "Show")

### Step 5: Update Environment Variables

Replace the placeholder values in `.env.local`:

```bash
# Replace these with your actual Facebook app credentials
FACEBOOK_CLIENT_ID=your_actual_facebook_app_id
FACEBOOK_CLIENT_SECRET=your_actual_facebook_app_secret
```

### Step 6: Enable Facebook Provider

In `/src/app/api/auth/[...nextauth]/route.ts`, uncomment the Facebook provider:

```typescript
FacebookProvider({
  clientId: process.env.FACEBOOK_CLIENT_ID!,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
  authorization: {
    params: {
      auth_type: "rerequest", // Always prompt for permissions
    },
  },
}),
```

### Step 7: Test Facebook OAuth

1. Restart your development server: `npm run dev`
2. Visit `/test-auth` or `/auth/signin`
3. Click "Sign in with Facebook"
4. Should redirect to Facebook login and prompt for account selection

## Security Notes

- **Development**: Use `http://localhost:3000` for local testing
- **Production**: Use `https://yourdomain.com` and enable secure cookies
- **App Review**: For production, submit your app for Facebook review
- **Permissions**: Request only necessary permissions (email, public_profile)

## Troubleshooting

- **Invalid app ID**: Check that `FACEBOOK_CLIENT_ID` matches your Facebook app ID
- **Invalid redirect URI**: Ensure redirect URI in Facebook app matches NextAuth callback URL
- **App not live**: Make sure your Facebook app is in "Live" mode (not Development mode)
- **Domain verification**: Add your domain to Facebook app settings

Once you complete these steps, Facebook OAuth will work alongside Google OAuth and credentials authentication!
