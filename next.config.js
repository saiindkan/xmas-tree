// Code modified by Tharun
/** @type {import('next').NextConfig} */
// Determine if we're in development or production
const isDev = process.env.NODE_ENV !== 'production';
const repo = 'your-repo-name'; // Replace with your repository name

const nextConfig = {
  // Disable static export for NextAuth compatibility
  // output: 'export', // Commented out - incompatible with NextAuth and API routes
  // Set the base path to your repository name if using GitHub Pages (only for static sites)
  // basePath: isDev ? '' : `/${repo}`,
  // Set the asset prefix for static assets (only for static sites)
  // assetPrefix: isDev ? '' : `/${repo}/`,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'nyykggssyasvxrtjhhhb.supabase.co',
      },
    ],
  },
  webpack: (config) => {
    // Add path aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/lib': `${__dirname}/src/lib`,
      '@/auth': `${__dirname}/src/auth.ts`,
    };
    return config;
  },
  // Security headers
  async headers() {
    const isDev = process.env.NODE_ENV !== 'production';
    const baseDomain = isDev ? 'http://localhost:3000' : 'https://your-production-domain.com';
    
    return [
      {
        source: '/(.*)',
        headers: [
          // ✅ Enhanced Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self' ${isDev ? 'http://localhost:*' : ''};
              script-src 'self' 'unsafe-inline' 'unsafe-eval';
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              img-src 'self' data: blob: https://images.unsplash.com https://nyykggssyasvxrtjhhhb.supabase.co;
              font-src 'self' data: https://fonts.gstatic.com;
              connect-src 'self' ${isDev ? 'http://localhost:3000' : baseDomain};
              media-src 'self';
              object-src 'none';
              base-uri 'self';
              form-action 'self';
              frame-ancestors 'self';
              worker-src 'self' blob:;
              prefetch-src 'self' ${isDev ? 'http://localhost:*' : ''};
              ${!isDev ? "upgrade-insecure-requests;" : ""}
              block-all-mixed-content;
            `.replace(/\s+/g, ' ').trim(),
          },
          // Additional security headers
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()'
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-site'
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp'
          },
          {
            key: 'X-Permitted-Cross-Domain-Policies',
            value: 'none'
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'Expect-CT',
            value: 'enforce, max-age=30'
          },
          {
            key: 'Feature-Policy',
            value: "camera 'none'; microphone 'none'; geolocation 'none'; payment 'none'"
          }
        ],
      },
      {
        // Extra security for checkout and payment pages
        source: '/(checkout|order-confirmation)/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate'
          },
          {
            key: 'Pragma',
            value: 'no-cache'
          },
          {
            key: 'Expires',
            value: '0'
          }
        ],
      }
    ]
  },
  // Redirect HTTP to HTTPS in production
  async redirects() {
    return process.env.NODE_ENV === 'production' ? [
      {
        source: '/(.*)',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://your-domain.com/:path*',
        permanent: true,
      },
    ] : []
  },
}

module.exports = nextConfig
