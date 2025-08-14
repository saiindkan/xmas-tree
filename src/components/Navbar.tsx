"use client";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const { cart } = useCart();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const closeMenus = () => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 w-full bg-white border-b border-gray-200 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="text-green-900 font-bold text-2xl tracking-tight" onClick={closeMenus}>
          Indkan Xmas Trees
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link href="/products" className="hover:underline">Shop</Link>
          <Link href="/collections" className="hover:underline">Collections</Link>
          <Link href="/deals" className="hover:underline">Deals</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
          
          {status === 'authenticated' ? (
            <div className="relative">
              <button onClick={toggleDropdown} className="flex items-center gap-1 hover:text-green-700 transition-colors">
                <span className="hidden sm:inline">{session.user?.name || 'Account'}</span>
                <svg className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={closeMenus}>My Account</Link>
                  <button onClick={() => { signOut({ callbackUrl: '/' }); closeMenus(); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/auth/signin" className="text-gray-700 hover:text-green-600 transition-colors" onClick={closeMenus}>Sign In</Link>
              <Link href="/auth/signup" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors" onClick={closeMenus}>Sign Up</Link>
            </div>
          )}
          
          <Link href="/cart" className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25A3.75 3.75 0 0011.25 18h1.5a3.75 3.75 0 003.75-3.75v-1.5m-9 0V6.75m0 0L5.106 5.272A1.125 1.125 0 016.08 3.75h11.84c.474 0 .855.427.974.893l1.32 5.287a2.25 2.25 0 01-2.19 2.82H7.5m0 0h9" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">{count}</span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Link href="/cart" className="relative mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25A3.75 3.75 0 0011.25 18h1.5a3.75 3.75 0 003.75-3.75v-1.5m-9 0V6.75m0 0L5.106 5.272A1.125 1.125 0 016.08 3.75h11.84c.474 0 .855.427.974.893l1.32 5.287a2.25 2.25 0 01-2.19 2.82H7.5m0 0h9" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">{count}</span>
            )}
          </Link>
          <button onClick={toggleMobileMenu} className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div onClick={closeMenus} className={`fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out md:hidden ${
        isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg shadow-xl w-11/12 max-w-sm p-6 text-center">
          <div className="flex flex-col space-y-4">
            <Link href="/products" className="text-lg font-medium text-gray-700 hover:text-green-600" onClick={closeMenus}>Shop</Link>
            <Link href="/collections" className="text-lg font-medium text-gray-700 hover:text-green-600" onClick={closeMenus}>Collections</Link>
            <Link href="/deals" className="text-lg font-medium text-gray-700 hover:text-green-600" onClick={closeMenus}>Deals</Link>
            <Link href="/about" className="text-lg font-medium text-gray-700 hover:text-green-600" onClick={closeMenus}>About</Link>
            <Link href="/contact" className="text-lg font-medium text-gray-700 hover:text-green-600" onClick={closeMenus}>Contact</Link>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              {status === 'authenticated' ? (
                <div className="space-y-4">
                   <div>
                    <div className="font-bold text-gray-800">{session.user?.name}</div>
                    <div className="text-sm text-gray-500">{session.user?.email}</div>
                  </div>
                  <Link href="/account" className="block text-lg font-medium text-gray-700 hover:text-green-600" onClick={closeMenus}>My Account</Link>
                  <button onClick={() => { signOut({ callbackUrl: '/' }); closeMenus(); }} className="w-full text-lg font-medium text-gray-700 hover:text-green-600">Sign Out</button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link href="/auth/signin" className="block w-full bg-green-600 text-white px-4 py-3 rounded-md hover:bg-green-700 transition-colors" onClick={closeMenus}>Sign In</Link>
                  <Link href="/auth/signup" className="block w-full bg-gray-200 text-gray-800 px-4 py-3 rounded-md hover:bg-gray-300 transition-colors" onClick={closeMenus}>Sign Up</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>


    </nav>
  );
}
