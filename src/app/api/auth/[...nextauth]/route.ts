import NextAuth, { type DefaultSession, type DefaultUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
// Import the Prisma client from the local lib instead of directly from @prisma/client/edge
import { prisma } from '@/lib/prisma';

// Types are now defined in src/types/next-auth.d.ts

export const authOptions: any = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "email",
          auth_type: "rerequest", // Always prompt for permissions
        },
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("[NextAuth] Authorize called with:", { 
          email: credentials?.email, 
          passwordProvided: !!credentials?.password 
        });

        if (!credentials?.email || !credentials?.password) {
          console.log("[NextAuth] Missing credentials");
          throw new Error("Email and password are required");
        }

        const email = credentials.email;
        const password = credentials.password;

        try {
          console.log("[NextAuth] Looking for user with email:", email);
          
          // Find the user with case-insensitive email search
          const user = await prisma.user.findFirst({
            where: {
              email: {
                equals: email.toLowerCase(),
                // mode: 'insensitive'
              }
            }
          });

          console.log("[NextAuth] User found:", user ? { 
            id: user.id, 
            name: user.name, 
            email: user.email,
            hasPassword: !!user.password 
          } : null);

          if (!user) {
            console.log("[NextAuth] User not found");
            throw new Error("No user found with this email");
          }

          if (!user.password) {
            console.log("[NextAuth] No password set for user");
            throw new Error("This email is registered with a social account. Please use the social login option.");
          }

          console.log("[NextAuth] Comparing passwords...");
          const isValidPassword = await bcrypt.compare(password, user.password);

          console.log("[NextAuth] Password valid:", isValidPassword);

          if (!isValidPassword) {
            console.log("[NextAuth] Invalid password");
            throw new Error("Incorrect password");
          }

          console.log("[NextAuth] Authentication successful");
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            image: null,
          };
        } catch (error) {
          console.error("[NextAuth] Authentication error:", error);
          throw error; // Let NextAuth handle the error with the error page
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
    maxAge: 24 * 60 * 60, // 24 hours session duration
    updateAge: 0, // Don't extend session on activity - this is key!
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: false,
        // No maxAge = session cookie (expires when browser closes)
      }
    }
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
        // Add cart ID to the token if available
        if (user.cartId) {
          token.cartId = user.cartId;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.cartId = token.cartId as number | undefined;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // After successful authentication, redirect to home
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return baseUrl;
    },
    async signIn({ user, account, profile }) {
      if (user?.email) {
        try {
          // First try to find the user
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
            select: { 
              id: true
            }
          });

          if (existingUser) {
            // Check if user has a cart using raw query to avoid type issues
            const userCart = await prisma.$queryRaw<Array<{ id: number }>>`
              SELECT id FROM "Cart" 
              WHERE "userId" = ${existingUser.id} 
              LIMIT 1
            `;

            // If no cart exists, create one
            if (!userCart || userCart.length === 0) {
              // Create cart using raw query to avoid type issues
              const [cart] = await prisma.$queryRaw<Array<{ id: number }>>`
                INSERT INTO "Cart" ("createdAt", "updatedAt")
                VALUES (NOW(), NOW())
                RETURNING id;
              `;
              
              // Update the user with the cart ID
              await prisma.$executeRaw`
                UPDATE "User"
                SET "cartId" = ${cart.id}
                WHERE id = ${existingUser.id};
              `;
            }
          }
        } catch (error) {
          console.error("Error in signIn callback:", error);
        }
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

// @ts-ignore - NextAuth types are not fully compatible with App Router yet
const handler = NextAuth(authOptions) as any;

export { handler as GET, handler as POST };
