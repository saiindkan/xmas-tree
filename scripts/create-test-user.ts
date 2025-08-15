const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Missing required environment variables');
  console.log('Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  }
});

async function createTestUser() {
  const testEmail = 'test@example.com';
  const testPassword = 'Test@1234';
  
  try {
    console.log('Creating test user...');
    
    // First, check if user already exists
    const { data: existingUser, error: userError } = await supabase
      .from('users')
      .select('id, email')
      .eq('email', testEmail)
      .maybeSingle();
    
    if (existingUser) {
      console.log('ℹ️ Test user already exists, updating password...');
      
      // Update the user's password
      const { data: authData, error: authError } = await supabase.auth.admin.updateUserById(
        existingUser.id,
        { password: testPassword }
      );
      
      if (authError) throw authError;
      
      console.log('✅ Successfully updated test user password');
      console.log('\nTest user credentials:');
      console.log(`Email: ${testEmail}`);
      console.log(`Password: ${testPassword}`);
      return;
    }
    
    // Create a new auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: testEmail,
      password: testPassword,
      email_confirm: true
    });
    
    if (authError) throw authError;
    
    const userId = authData.user.id;
    
    // Create a user profile
    const { error: profileError } = await supabase
      .from('users')
      .insert([
        {
          id: userId,
          email: testEmail,
          name: 'Test User'
        }
      ]);
    
    if (profileError) throw profileError;
    
    console.log('✅ Successfully created test user');
    console.log('\nTest user credentials:');
    console.log(`Email: ${testEmail}`);
    console.log(`Password: ${testPassword}`);
    
  } catch (error) {
    console.error('Error creating test user:', error);
    process.exit(1);
  }
}

createTestUser();
