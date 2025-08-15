import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseAdminClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  const { email, token, newPassword } = await request.json();

  if (!email || !token || !newPassword) {
    return NextResponse.json(
      { error: 'Email, token and new password are required' },
      { status: 400 }
    );
  }

  if (newPassword.length < 8) {
    return NextResponse.json(
      { error: 'Password must be at least 8 characters' },
      { status: 400 }
    );
  }

  try {
    const supabase = createServerSupabaseAdminClient();
    
    // Verify the reset token
    const { data } = await supabase
      .from('password_resets')
      .select('*')
      .eq('email', email)
      .eq('reset_token', token)
      .gt('reset_token_expires_at', new Date().toISOString())
      .single();

    if (!data) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    // Get the user ID
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (userError || !userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Update the user's password
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      userData.id,
      { password: newPassword }
    );

    if (updateError) throw updateError;

    // Clean up
    await supabase
      .from('password_resets')
      .delete()
      .eq('email', email);

    return NextResponse.json({ 
      success: true,
      message: 'Password updated successfully' 
    });
  } catch (error: any) {
    console.error('Error resetting password:', error);
    return NextResponse.json(
      { error: 'Failed to reset password. Please try again.' },
      { status: 500 }
    );
  }
}
