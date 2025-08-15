'use client';

import { useState } from 'react';

export default function TestPasswordReset() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);

  const handleTestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      // Test forgot password flow using our test endpoint
      const res = await fetch('/api/test-password-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setMessage(`Test password reset initiated for ${email}. OTP: ${data.testOtp}`);
        
        // Check the password_resets table
        const tableRes = await fetch('/api/test-reset');
        const tableData = await tableRes.json();
        
        if (tableData.success) {
          setTableData(tableData.data || []);
        } else {
          setMessage(`Warning: Could not verify password reset in database. ${tableData.error}`);
        }
      } else {
        setMessage(`Error: ${data.error || 'Failed to initiate test password reset'}`);
      }
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Test Password Reset
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleTestReset}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Test Password Reset'}
            </button>
          </div>
        </form>

        {message && (
          <div className={`p-4 rounded-md ${message.startsWith('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
            {message}
          </div>
        )}

        {tableData.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Password Reset Entries</h3>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {tableData.map((entry) => (
                  <li key={entry.id} className="px-4 py-4">
                    <div className="text-sm text-gray-900">Email: {entry.email}</div>
                    <div className="text-sm text-gray-500">OTP: {entry.otp}</div>
                    <div className="text-sm text-gray-500">Expires: {new Date(entry.expires_at).toLocaleString()}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
