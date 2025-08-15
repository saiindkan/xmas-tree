import { NextResponse } from 'next/server';
import { createServerSupabaseAdminClient } from '@/lib/supabase';

export async function GET() {
  const supabase = createServerSupabaseAdminClient();
  
  try {
    // Test connection by querying a system table
    const { data: testQuery, error: testError } = await supabase
      .rpc('version')
      .single();

    if (testError) {
      // If RPC fails, try a simple query
      const { data: tables, error: tablesError } = await supabase
        .from('pg_catalog.pg_tables')
        .select('tablename')
        .eq('schemaname', 'public')
        .limit(5);

      if (tablesError) {
        return NextResponse.json({
          success: false,
          error: 'Database connection failed',
          details: tablesError.message,
          hint: 'Check your database connection settings and ensure Supabase is running.'
        }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        message: 'Database connection successful',
        tables: tables?.map(t => t.tablename) || []
      });
    }

    // If we got here, the RPC call worked
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      version: testQuery
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Unexpected error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
