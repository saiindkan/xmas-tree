"use client";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const { cart } = useCart();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav className="sticky top-0 w-full bg-white border-b border-gray-200 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="text-green-900 font-bold text-2xl tracking-tight">
          Indkan Xmas Trees
        </Link>
        <div className="flex gap-6 items-center">
          <Link href="/products" className="hover:underline">Shop</Link>
          <Link href="/collections" className="hover:underline">Collections</Link>
          <Link href="/deals" className="hover:underline">Deals</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
          
          {status === 'authenticated' ? (
            <div className="relative">
              <button 
                onClick={toggleDropdown}
                className="flex items-center gap-1 hover:text-green-700 transition-colors"
              >
                <span className="hidden sm:inline">{session.user?.name || 'Account'}</span>
                <svg 
                  className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link 
                    href="/account" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    My Account
                  </Link>
                  <button
                    onClick={() => {
                      signOut({ callbackUrl: '/' });
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link 
                href="/auth/signin" 
                className="text-gray-700 hover:text-green-600 transition-colors"
                onClick={() => setIsDropdownOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                onClick={() => setIsDropdownOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
          
          <Link href="/cart" className="relative">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-7 h-7"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25A3.75 3.75 0 0011.25 18h1.5a3.75 3.75 0 003.75-3.75v-1.5m-9 0V6.75m0 0L5.106 5.272A1.125 1.125 0 016.08 3.75h11.84c.474 0 .855.427.974.893l1.32 5.287a2.25 2.25 0 01-2.19 2.82H7.5m0 0h9" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
      
      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </nav>
  );
}
