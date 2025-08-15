import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export async function POST(request: Request) {
  const { email, otp } = await request.json();

  if (!email || !otp) {
    return NextResponse.json(
      { error: 'Email and OTP are required' },
      { status: 400 }
    );
  }

  try {
    const supabase = createServerSupabaseClient();
    
    // Get the stored OTP
    const { data, error } = await supabase
      .from('password_resets')
      .select('*')
      .eq('email', email)
      .eq('otp', otp)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: 'Invalid or expired OTP' },
        { status: 400 }
      );
    }

    // Generate a secure token for password reset
    const resetToken = crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // Token expires in 1 hour

    // Store the reset token
    await supabase
      .from('password_resets')
      .update({ 
        reset_token: resetToken,
        reset_token_expires_at: expiresAt.toISOString()
      })
      .eq('email', email);

    return NextResponse.json({ 
      success: true,
      resetToken 
    });
  } catch (error: any) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json(
      { error: 'Failed to verify OTP. Please try again.' },
      { status: 500 }
    );
  }
}
