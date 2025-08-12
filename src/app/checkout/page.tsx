"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCart } from '../../context/CartContext';
import { loadStripe } from '@stripe/stripe-js/pure';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Type definitions
type BillingInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

// Stripe Checkout Form Component
const CheckoutForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/order-confirmation`,
        },
        redirect: 'if_required',
      });

      if (stripeError) {
        throw stripeError;
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        onSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

// Main Checkout Page Component
export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const { data: session } = useSession();
  
  // State management
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [isSecureConnection, setIsSecureConnection] = useState(true);
  const [stripePromise, setStripePromise] = useState<Promise<import('@stripe/stripe-js').Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState('');
  
  // Calculate order totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  // Calculate shipping (example: $5.99 flat rate for orders under $50, free otherwise)
  const shippingCost = subtotal >= 50 ? 0 : 5.99;
  
  // Calculate tax (example: 8% tax rate)
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  
  // Calculate total
  const total = subtotal + shippingCost + tax;
  
  // Form state
  const [billingInfo, setBillingInfo] = useState<BillingInfo>({
    firstName: '',
    lastName: '',
    email: session?.user?.email || '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States'
  });

  // Initialize Stripe and fetch client secret
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check for secure connection
      const isHTTPS = window.location.protocol === 'https:';
      const isLocalhost = window.location.hostname === 'localhost' || 
                         window.location.hostname === '127.0.0.1';
      setIsSecureConnection(isHTTPS || isLocalhost);
      
      // Load Stripe
      setStripePromise(loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''));
      
      // Fetch client secret
      const fetchClientSecret = async () => {
        try {
          const response = await fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ items: cart }),
          });
          
          if (!response.ok) {
            throw new Error('Failed to create payment intent');
          }
          
          const data = await response.json();
          setClientSecret(data.clientSecret);
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setIsLoading(false);
        }
      };
      
      if (cart.length > 0) {
        fetchClientSecret();
      } else {
        setIsLoading(false);
      }
    }
  }, [cart]);

  const handlePaymentSuccess = () => {
    setPaymentComplete(true);
    clearCart();
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (cart.length === 0 && !paymentComplete) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                We're sorry, but we can't process your payment at this time. Please add items to your cart before checking out.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/products')}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (paymentComplete) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-green-50 border-l-4 border-green-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">
                Thank you for your order! A confirmation email has been sent to {billingInfo.email}.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      
      {!isSecureConnection && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                For security reasons, please ensure you're using HTTPS in production.
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={billingInfo.email}
                  onChange={(e) => setBillingInfo({...billingInfo, email: e.target.value})}
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={billingInfo.firstName}
                  onChange={(e) => setBillingInfo({...billingInfo, firstName: e.target.value})}
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={billingInfo.lastName}
                  onChange={(e) => setBillingInfo({...billingInfo, lastName: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label htmlFor="address1" className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                id="address1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 mb-2"
                value={billingInfo.address1}
                onChange={(e) => setBillingInfo({...billingInfo, address1: e.target.value})}
                placeholder="Street address"
                required
              />
              <input
                type="text"
                id="address2"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={billingInfo.address2}
                onChange={(e) => setBillingInfo({...billingInfo, address2: e.target.value})}
                placeholder="Apartment, suite, etc. (optional)"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={billingInfo.city}
                  onChange={(e) => setBillingInfo({...billingInfo, city: e.target.value})}
                  required
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  State/Province
                </label>
                <input
                  type="text"
                  id="state"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={billingInfo.state}
                  onChange={(e) => setBillingInfo({...billingInfo, state: e.target.value})}
                  required
                />
              </div>
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP/Postal code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={billingInfo.postalCode}
                  onChange={(e) => setBillingInfo({...billingInfo, postalCode: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Country/Region
              </label>
              <select
                id="country"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={billingInfo.country}
                onChange={(e) => setBillingInfo({...billingInfo, country: e.target.value})}
                required
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="mt-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={billingInfo.phone}
                onChange={(e) => setBillingInfo({...billingInfo, phone: e.target.value})}
                required
              />
              <p className="mt-1 text-xs text-gray-500">For delivery updates and order notifications</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Payment</h2>
            <div className="bg-gray-50 p-4 rounded-md">
              {clientSecret && stripePromise ? (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm onSuccess={handlePaymentSuccess} />
                </Elements>
              ) : (
                <div className="text-center py-8">
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                    <div className="h-12 bg-gray-200 rounded"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white p-6 rounded-lg shadow sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              
              <div className="border-t pt-4 mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>
                    $
                    {cart
                      .reduce((sum, item) => sum + item.price * item.quantity, 0)
                      .toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>
                    {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                    {subtotal < 50 && subtotal > 0 && (
                      <span className="text-xs text-green-600 ml-1">
                        {subtotal > 0 && `(Spend $${(50 - subtotal).toFixed(2)} more for free shipping!)`}
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium pt-2 border-t mt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
