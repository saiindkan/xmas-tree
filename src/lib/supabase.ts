import { createBrowserClient, createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Client for browser/client-side operations
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

// Function to get server client with proper cookie handling
export function createServerSupabaseClient() {
  const cookieStore = cookies();
  
  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
}

// Admin client for server-side operations with elevated privileges
export function createServerSupabaseAdminClient() {
  const cookieStore = cookies();
  
  return createServerClient(
    supabaseUrl,
    supabaseServiceKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
}

// Admin client for server-side operations with elevated privileges
export const supabaseAdmin = createServerClient(
  supabaseUrl,
  supabaseServiceKey,
  {
    cookies: {
      get() {
        return '';
      },
    },
  }
);

export default supabase;
