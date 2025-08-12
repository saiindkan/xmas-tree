import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from '@/lib/prisma';
import { type AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
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
          console.log("[NextAuth] Looking up user:", email);
          
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user) {
            console.log("[NextAuth] User not found:", email);
            throw new Error("Invalid email or password");
          }

          console.log("[NextAuth] User found, checking password");
          
          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
            console.log("[NextAuth] Invalid password for user:", email);
            throw new Error("Invalid email or password");
          }

          console.log("[NextAuth] Authentication successful for:", email);
          
          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            image: null,
          };
        } catch (error) {
          console.error("[NextAuth] Authorization error:", error);
          throw error;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
    maxAge: 24 * 60 * 60, // 24 hours session duration
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async signIn({ user, account }) {
      console.log("[NextAuth] SignIn callback called", { 
        user: user?.email, 
        account: account?.provider 
      });

      if (account?.provider === "google" || account?.provider === "facebook") {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
          });

          if (!existingUser) {
            console.log("[NextAuth] Creating new user from OAuth:", user.email);
            await prisma.user.create({
              data: {
                email: user.email!,
                name: user.name || "",
                password: "", // OAuth users don't need a password
              },
            });
          } else {
            console.log("[NextAuth] Existing OAuth user found:", user.email);
          }
        } catch (error) {
          console.error("[NextAuth] Error handling OAuth user:", error);
          return false;
        }
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
