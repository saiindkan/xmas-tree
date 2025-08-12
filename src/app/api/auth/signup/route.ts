import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
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

    return NextResponse.json({ user: { id: user.id, name: user.user_metadata.name, email: user.email } });
  } catch (e) {
    console.error('Signup route error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
