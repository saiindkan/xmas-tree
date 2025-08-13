'use client';

import { createBrowserClient } from '@supabase/ssr';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function TestAuthPage() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Authentication Test</h1>
      
      {session ? (
        <div className="space-y-4">
          <div className="p-4 bg-green-100 border border-green-400 rounded">
            <h2 className="font-semibold text-green-800">Signed In</h2>
            <p><strong>Name:</strong> {session.user?.name}</p>
            <p><strong>Email:</strong> {session.user?.email}</p>
          </div>
          
          <button
            onClick={() => signOut()}
            className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-red-100 border border-red-400 rounded">
            <h2 className="font-semibold text-red-800">Not Signed In</h2>
            <p>You need to authenticate to access this page.</p>
          </div>
          
          <div className="space-y-2">
            <button
              onClick={async () => {
              await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${location.origin}/auth/callback` } });
            }}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Sign In with Google
            </button>
            

            
            <button
              onClick={() => signIn('credentials')}
              className="w-full bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
            >
              Sign In with Credentials
            </button>
          </div>
        </div>
      )}
      
      <div className="mt-8 p-4 bg-gray-100 border rounded">
        <h3 className="font-semibold mb-2">Test Instructions:</h3>
        <ol className="text-sm space-y-1">
          <li>1. Sign in with Google or credentials</li>
          <li>2. Sign out</li>
          <li>3. Refresh the page or close/reopen browser</li>
          <li>4. Check if you're still signed in</li>
        </ol>
      </div>
    </div>
  );
}
