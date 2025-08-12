import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";

import { supabaseAdmin } from '@/lib/supabase';
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
          const { data: existingUser, error: userError } = await supabaseAdmin
            .from('users')
            .select('id')
            .eq('email', user.email!)
            .single();

          if (userError && userError.code !== 'PGRST116') { // PGRST116 = no rows found
            console.error("[NextAuth] Error checking for Supabase user:", userError);
            return false; // Prevent sign-in on error
          }

          if (!existingUser) {
            console.log("[NextAuth] Creating new auth user from OAuth:", user.email);
            const { data: newAuthUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
              email: user.email!,
              email_confirm: true, // Assuming OAuth email is verified
              user_metadata: {
                name: user.name,
                avatar_url: user.image,
              },
            });

            if (createError) {
              console.error("[NextAuth] Error creating Supabase auth user:", createError);
              return false; // Prevent sign-in on error
            }

            console.log("[NextAuth] Creating new public user profile for:", user.email);
            const { error: insertError } = await supabaseAdmin
              .from('users')
              .insert({
                id: newAuthUser.user.id,
                name: user.name,
                email: user.email,
              });
            
            if (insertError) {
                console.error("[NextAuth] Error creating public user profile:", insertError);
                // Rollback auth user creation
                await supabaseAdmin.auth.admin.deleteUser(newAuthUser.user.id);
                return false; // Prevent sign-in
            }

            // Attach the new user's ID to the user object for the JWT callback
            user.id = newAuthUser.user.id;

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
