"use client";

import type { ReactNode } from "react";
import "./globals.css";
import "../styles/globals.css";
import PromoBar from "../components/PromoBar";
import Navbar from "../components/Navbar";
import TrustBar from "../components/TrustBar";
import PressBar from "../components/PressBar";
import Footer from "../components/Footer";
import { CartProvider } from "../context/CartContext";
import { SessionProvider } from "../components/SessionProvider";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Indkan Xmas Trees</title>
        <meta name="description" content="Premium American Christmas trees, wreaths, and decor" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-white min-h-screen text-green-900 font-sans">
        <SessionProvider>
          <CartProvider>
            <PromoBar />
            <Navbar />
            <TrustBar />
            {children}
            <PressBar />
            <Footer />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
