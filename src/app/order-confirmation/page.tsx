"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function OrderConfirmationPage() {
  const [isClient, setIsClient] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');

  useEffect(() => {
    // This effect only runs on the client side
    setIsClient(true);
    
    // Set up countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    
    // Auto-redirect to home after 10 seconds
    const redirectTimer = setTimeout(() => {
      router.push('/');
    }, 10000);

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  // Don't render anything until we're on the client side
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-700">Loading your order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            {/* Success Icon */}
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Order Confirmed!
            </h1>

            <p className="text-gray-600 mb-6">
              Thank you for your purchase! Your Christmas trees will be delivered soon.
            </p>

            {orderNumber && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700">
                  Order #: <span className="font-medium">{orderNumber}</span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  We've sent a confirmation email with your order details.
                </p>
              </div>
            )}

            <div className="mt-6 space-y-4">
              <Link
                href="/account"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                View Order History
              </Link>
              <Link
                href="/products"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Continue Shopping
              </Link>
              <p className="mt-4 text-sm text-gray-600">
                You'll be redirected to the home page in <span className="font-medium">{countdown}</span> second{countdown !== 1 ? 's' : ''}...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
