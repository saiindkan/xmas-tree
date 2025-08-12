"use client";
import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setEmail("");
  }

  return (
    <section className="w-full py-10 flex flex-col items-center mt-10 bg-green-50 rounded-lg shadow max-w-2xl mx-auto">
      <h3 className="text-xl font-bold mb-2 text-green-800">🎁 Get Holiday Offers!</h3>
      <p className="mb-4 text-green-700">Sign up for our newsletter and get exclusive Xmas deals and decorating tips from Indkan Xmas Trees.</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="flex-1 px-4 py-2 rounded-l-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Your email address"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-green-700 text-white rounded-r-md font-semibold hover:bg-green-800 transition"
        >
          Subscribe
        </button>
      </form>
      {submitted && <div className="mt-3 text-green-600">Thank you for subscribing!</div>}
    </section>
  );
}
