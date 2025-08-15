import {createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

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

async function checkTables() {
  try {
    console.log('🔍 Checking password_resets table...');
    
    // Test if we can query the password_resets table
    const { data: testData, error: testError } = await supabase
      .from('password_resets')
      .select('*')
      .limit(1);
    
    if (testError) {
      console.error('❌ Error accessing password_resets table:', testError);
      console.log('\nPlease make sure the table was created with the correct permissions.');
      return;
    }
    
    console.log('✅ Successfully connected to password_resets table');
    
    // Test inserting a test reset request
    const testEmail = 'test@example.com';
    const testOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);
    
    console.log('\n🚀 Testing password reset flow...');
    console.log(`- Email: ${testEmail}`);
    console.log(`- OTP: ${testOtp}`);
    
    // Insert a test reset request
    const { data: insertData, error: insertError } = await supabase
      .from('password_resets')
      .upsert({
        email: testEmail,
        otp: testOtp,
        expires_at: expiresAt.toISOString(),
        reset_token: null,
        reset_token_expires_at: null
      }, {
        onConflict: 'email'
      })
      .select();
    
    if (insertError) {
      console.error('❌ Error inserting test reset request:', insertError);
      return;
    }
    
    console.log('✅ Successfully inserted test reset request');
    
    // Verify we can retrieve the test request
    const { data: verifyData, error: verifyError } = await supabase
      .from('password_resets')
      .select('*')
      .eq('email', testEmail)
      .single();
    
    if (verifyError || !verifyData) {
      console.error('❌ Error verifying test reset request:', verifyError);
      return;
    }
    
    console.log('✅ Successfully verified test reset request');
    console.log('\n📋 Test reset request details:');
    console.log(verifyData);
    
    // Clean up test data
    console.log('\n🧹 Cleaning up test data...');
    const { error: deleteError } = await supabase
      .from('password_resets')
      .delete()
      .eq('email', testEmail);
    
    if (deleteError) {
      console.error('❌ Error cleaning up test data:', deleteError);
    } else {
      console.log('✅ Successfully cleaned up test data');
    }
    
    console.log('\n🎉 Password reset flow test completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Test the forgot password flow in the UI');
    console.log('2. Verify the email with OTP');
    console.log('3. Reset the password');

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

checkTables();
