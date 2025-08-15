import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseAdminClient } from '@/lib/supabase';
import { sendEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  const supabaseAdmin = createServerSupabaseAdminClient();
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      email_confirm: true, // Set to true to send a confirmation email
    });

    if (error) {
      console.error('Supabase signup error:', error);
      // Check for a specific error, like user already exists
      if (error.message.includes('already exists')) {
          return NextResponse.json({ error: 'User already exists' }, { status: 409 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const user = data.user;

    // Also add the user to the public 'users' table
    const { error: insertError } = await supabaseAdmin
      .from('users')
      .insert({
        id: user.id, 
        name: user.user_metadata.name,
        email: user.email,
      });

    if (insertError) {
      console.error('Error inserting user into public table:', insertError);
      // If user creation in auth succeeded but public table insert failed,
      // it's best to delete the auth user to avoid inconsistent state.
      await supabaseAdmin.auth.admin.deleteUser(user.id);
      return NextResponse.json({ error: 'Failed to create user profile.' }, { status: 500 });
    }

        // Send a welcome email
    try {
      const welcomeSubject = `Welcome to IndkanChristmas Tree Store, ${user.user_metadata.name}! 🎄`;
      const welcomeText = `Hi ${user.user_metadata.name},

Thank you for joining IndkanChristmas Tree Store! We're excited to have you here!!!.

Your account has been successfully created with the email: ${user.email}

Start exploring our collection of beautiful Christmas trees and decorations today!

Best regards,
The Indkan Christmas Tree Store Team`;

      const welcomeHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2e7d32;">Welcome to Xmas Tree Shop, ${user.user_metadata.name}! 🎄</h1>
          <p>Thank you for joining Xmas Tree Shop! We're excited to have you on board.</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Your account details:</strong></p>
            <p>Email: ${user.email}</p>
            <p>Account created: ${new Date().toLocaleDateString()}</p>
          </div>
          
          <p>Start exploring our collection of beautiful Christmas trees and decorations today!</p>
          
          <a href="https://www.indkanchristmastree.com" 
             style="display: inline-block; padding: 10px 20px; background-color: #2e7d32; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
            Start Shopping Now
          </a>
          
          <p>If you have any questions, feel free to reply to this email.</p>
          
          <p>Best regards,<br/>The IndkanChristmas Tree Store Team</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #777;">
            <p>You're receiving this email because you recently created a new Indkan Christmas Tree Store account.</p>
            <p>© ${new Date().getFullYear()} Indkan Christmas Tree Store. All rights reserved.</p>
          </div>
        </div>
      `;

      await sendEmail({
        to: user.email!,
        subject: welcomeSubject,
        text: welcomeText,
        html: welcomeHtml
      });
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // Not returning an error to the client as the user was already created.
    }

    return NextResponse.json({ user: { id: user.id, name: user.user_metadata.name, email: user.email } });
  } catch (e) {
    console.error('Signup route error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
