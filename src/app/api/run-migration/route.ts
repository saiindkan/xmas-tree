import { NextResponse } from 'next/server';
import { createServerSupabaseAdminClient } from '@/lib/supabase';

export async function POST() {
  const supabase = createServerSupabaseAdminClient();
  
  try {
    // Run the migration to create the password_resets table
    const { data, error } = await supabase.rpc('exec', {
      query: `
        CREATE TABLE IF NOT EXISTS public.password_resets (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          email TEXT NOT NULL,
          otp TEXT NOT NULL,
          reset_token TEXT,
          expires_at TIMESTAMPTZ NOT NULL,
          reset_token_expires_at TIMESTAMPTZ,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          CONSTRAINT unique_email_reset UNIQUE (email)
        );

        -- Add index for faster lookups
        CREATE INDEX IF NOT EXISTS idx_password_resets_email ON public.password_resets (email);
        CREATE INDEX IF NOT EXISTS idx_password_resets_reset_token ON public.password_resets (reset_token);
      `
    });

    if (error) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Error running migration',
          details: error.message
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Migration completed successfully',
      data
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false,
        error: 'Unexpected error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
