import { NextResponse } from 'next/server';
import { createServerSupabaseAdminClient } from '@/lib/supabase';

export async function POST(request: Request) {
  const supabase = createServerSupabaseAdminClient();
  const { email } = await request.json();
  
  try {
    // 1. First, check if the user exists
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, email')
      .eq('email', email)
      .single();

    if (userError || !userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // 2. Generate a test OTP (in a real app, this would be a secure random string)
    const testOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // 1 hour from now

    // 3. Create or update the password reset entry
    const { data: resetData, error: resetError } = await supabase
      .from('password_resets')
      .upsert(
        {
          email,
          otp: testOtp,
          expires_at: expiresAt.toISOString(),
        },
        { onConflict: 'email' }
      )
      .select()
      .single();

    if (resetError) {
      console.error('Error creating password reset entry:', resetError);
      return NextResponse.json(
        { 
          error: 'Failed to create password reset entry',
          details: resetError.message 
        },
        { status: 500 }
      );
    }

    // 4. In a real app, you would send an email with the OTP here
    // For testing, we'll just return it in the response
    return NextResponse.json({
      success: true,
      message: 'Test password reset initiated',
      testOtp,
      resetData
    });

  } catch (error) {
    console.error('Unexpected error in test password reset:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
