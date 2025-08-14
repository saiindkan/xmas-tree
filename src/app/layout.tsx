"use client";

import { ReactNode, useEffect } from "react";
import "../app/globals.css";
import "../styles/ChristmasTheme.module.css";
import PromoBar from "../components/PromoBar";
import Navbar from "../components/Navbar";
import TrustBar from "../components/TrustBar";
import PressBar from "../components/PressBar";
import Footer from "../components/Footer";
import { CartProvider } from "../context/CartContext";
import { SessionProvider } from "../components/SessionProvider";
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';

// Dynamically import components that use the window object
const ChristmasCursor = dynamic(
  () => import('../components/ChristmasCursor'),
  { ssr: false }
);

const Snowflakes = dynamic(
  () => import('../components/Snowflakes'),
  { ssr: false }
);

const ChristmasMusicPlayer = dynamic(
  () => import('../components/ChristmasMusicPlayer'),
  { ssr: false }
);

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: ReactNode }) {
  // Add Christmas theme class to body
  useEffect(() => {
    document.body.classList.add('christmasBackground');
    
    // Add hover effect to all shop items
    const shopItems = document.querySelectorAll('.product-card, .card, .shop-item');
    shopItems.forEach(item => {
      item.classList.add('shopItem');
    });
    
    return () => {
      document.body.classList.remove('christmasBackground');
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <title>🎄 Indkan Xmas Trees</title>
        <meta name="description" content="Premium American Christmas trees, wreaths, and decor" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎄</text></svg>" />
        <link href="https://fonts.googleapis.com/css2?family=Mountains+of+Christmas:wght@400;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} bg-white min-h-screen text-green-900 font-sans relative`}>
        <SessionProvider>
          <CartProvider>
            <ChristmasCursor />
            <Snowflakes />
            <ChristmasMusicPlayer />
            <PromoBar />
            <Navbar />
            <TrustBar />
            <div className="relative z-10">
              {children}
            </div>
            <PressBar />
            <Footer />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
