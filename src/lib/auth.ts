

import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { supabaseAdmin } from '@/lib/supabase';
import { type AuthOptions } from "next-auth";
import { sendEmail } from './email';



export const authOptions: AuthOptions = {
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
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
          
          const { data, error } = await supabaseAdmin.auth.signInWithPassword({
            email,
            password,
          });

          if (error || !data.user) {
            console.log("[NextAuth] Supabase sign-in error:", error?.message);
            // Use the specific error message from Supabase for better feedback
            throw new Error(error?.message || "Invalid login credentials");
          }

          const user = data.user;
          console.log("[NextAuth] Authentication successful for:", email);

          // Ensure a public profile exists for the user.
          const { data: publicProfile } = await supabaseAdmin
            .from('users')
            .select('id')
            .eq('id', user.id)
            .single();

          if (!publicProfile) {
            console.log('[NextAuth] Public profile not found. Creating one for:', user.email);
            const { error: insertError } = await supabaseAdmin
              .from('users')
              .insert({ 
                id: user.id, 
                name: user.user_metadata.name || user.email,
                email: user.email,
              });

            if (insertError) {
              console.error('[NextAuth] Error creating public profile for credential user:', insertError);
              throw new Error('Failed to create user profile after login.');
            }
          }
          
          return {
            id: user.id,
            email: user.email!,
            name: user.user_metadata.name || null,
            image: user.user_metadata.picture || null,
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
  events: {
    async signIn({ user }) {
      if (user.email) {
        try {
          const loginSubject = '🔒 Successful Login to Indkan Christmas Tree Store Account';
          const loginTime = new Date().toLocaleString();     
          const loginText = `Hello ${user.name || 'Valued Customer'},

We noticed a successful login to your Indkan Christmas Tree Store account.

Details of this login:
- Time: ${loginTime}

Best regards,
The Indkan Christmas Tree Store Security Team`;

          const loginHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
              <h2 style="color: #2e7d32;">🔒 Successful Login Detected</h2>
              
              <p>Hello ${user.name || 'Valued Customer'},</p>
              
              <p>We noticed a successful login to your Indkan Christmas Tree Store account.</p>

              <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #2e7d32;">
                <h3 style="margin-top: 0; color: #2e7d32;">Login Details</h3>
                <p><strong>Time:</strong> ${loginTime}</p>
              </div>
              
              
              <p style="color: #666; font-size: 0.9em;">For security reasons, this is an automated message. Please do not reply to this email.</p>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #777;">
                <p>© ${new Date().getFullYear()} Indkan Christmas Tree Store. All rights reserved.</p>
                <p>This email was sent to ${user.email} as part of our security notifications.</p>
              </div>
            </div>
          `;

          await sendEmail({
            to: user.email,
            subject: loginSubject,
            text: loginText,
            html: loginHtml
          });
        } catch (error) {
          console.error('Failed to send login email:', error);
        }
      }
    }
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


      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
