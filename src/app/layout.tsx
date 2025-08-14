"use client";

import type { ReactNode } from "react";
import "./globals.css";
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
      <body className="bg-white min-h-screen text-green-900 font-sans flex flex-col">
        <SessionProvider>
          <CartProvider>
            <div className="flex flex-col flex-grow">
              <PromoBar />
              <Navbar />
              <TrustBar />
              <main className="flex-grow">
                {children}
              </main>
              <PressBar />
              <Footer />
            </div>
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
