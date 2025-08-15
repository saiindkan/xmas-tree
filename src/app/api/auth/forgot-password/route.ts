import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseAdminClient } from '@/lib/supabase';
import { sendEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  const supabaseAdmin = createServerSupabaseAdminClient();
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const { data, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'recovery',
      email: email,
    });

    if (linkError) {
      console.error('Error generating recovery link:', linkError);
      return NextResponse.json({ error: 'Failed to generate reset link.' }, { status: 500 });
    }

    const resetLink = data.properties.action_link;

    await sendEmail({
      to: email,
      subject: 'Reset Your Password',
      text: `Click the link to reset your password: ${resetLink}`,
      html: `<p>Click the link to reset your password: <a href="${resetLink}">Reset Password</a></p>`,
    });

    return NextResponse.json({ message: 'Password reset link sent successfully.' });

  } catch (e) {
    console.error('Forgot password error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
