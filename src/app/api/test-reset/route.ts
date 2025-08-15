import { NextResponse } from 'next/server';
import { createServerSupabaseAdminClient } from '@/lib/supabase';

export async function GET() {
  const supabase = createServerSupabaseAdminClient();
  
  try {
    // Try to query the password_resets table
    const { data, error } = await supabase
      .from('password_resets')
      .select('*')
      .limit(5);

    if (error) {
      return NextResponse.json({
        success: false,
        error: 'Error querying password_resets table',
        details: error.message,
        hint: 'The table might not exist or there might be a permission issue.'
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      tableExists: true,
      count: data?.length || 0,
      data: data || []
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Unexpected error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
