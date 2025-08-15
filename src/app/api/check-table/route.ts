import { NextResponse } from 'next/server';
import { createServerSupabaseAdminClient } from '@/lib/supabase';

export async function GET() {
  const supabase = createServerSupabaseAdminClient();
  
  try {
    // Check if password_resets table exists
    const { data, error } = await supabase
      .from('password_resets')
      .select('*')
      .limit(1);

    if (error) {
      return NextResponse.json(
        { 
          error: 'Error checking password_resets table',
          details: error.message,
          hint: 'The table might not exist or there might be a permission issue.'
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      tableExists: true,
      message: 'password_resets table exists',
      data: data || []
    });
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Unexpected error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
