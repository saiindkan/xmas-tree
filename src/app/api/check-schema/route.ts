import { NextResponse } from 'next/server';
import { createServerSupabaseAdminClient } from '@/lib/supabase';

async function listAllTables(supabase: any) {
  try {
    // First, try to get tables using information_schema
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');

    if (error) throw error;
    
    return data.map((t: any) => t.table_name);
  } catch (error) {
    console.error('Error listing tables:', error);
    throw error;
  }
}

export async function GET() {
  const supabase = createServerSupabaseAdminClient();
  
  try {
    const tables = await listAllTables(supabase);
    const passwordResetsExists = tables.includes('password_resets');
    
    return NextResponse.json({
      success: true,
      tables,
      passwordResetsExists,
      message: passwordResetsExists 
        ? 'password_resets table exists' 
        : 'password_resets table does not exist. Please run the migration.'
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
