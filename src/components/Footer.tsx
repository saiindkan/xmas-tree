export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-10 py-8 text-sm text-gray-700">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:justify-between gap-6">
        <div>
          <div className="text-green-900 font-bold text-xl mb-2">Indkan Xmas Trees</div>
          <div className="mb-2">Premium American Christmas Trees & Holiday Decor</div>
          <div className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Indkan Xmas Trees. All rights reserved.</div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-semibold mb-1">Shop</span>
          <a href="/products" className="hover:underline">Artificial Trees</a>
          <a href="/collections" className="hover:underline">Collections</a>
          <a href="/deals" className="hover:underline">Deals</a>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-semibold mb-1">Customer Service</span>
          <a href="/contact" className="hover:underline">Contact Us</a>
          <a href="/about" className="hover:underline">About</a>
          <a href="/account" className="hover:underline">Account</a>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-semibold mb-1">Newsletter</span>
          <form className="flex flex-col sm:flex-row gap-2">
            <input type="email" placeholder="Your email address" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
            <button type="submit" className="w-full sm:w-auto px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition">Subscribe</button>
          </form>
        </div>
      </div>
    </footer>
  );
}
