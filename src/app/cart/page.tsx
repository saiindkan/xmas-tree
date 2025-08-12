"use client";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const router = useRouter();
  const { data: session } = useSession();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      return; // Cart page will show empty message
    }

    if (!session) {
      // Redirect to sign in if not authenticated
      router.push('/auth/signin?callbackUrl=/checkout');
      return;
    }

    // Redirect to checkout page
    router.push('/checkout');
  };

  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-extrabold text-green-900 mb-8 text-center">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center text-gray-600">Your cart is empty.</div>
      ) : (
        <>
          <ul className="divide-y divide-gray-200 mb-8">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center gap-4 py-4">
                <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded border" />
                <div className="flex-1">
                  <div className="font-semibold text-green-900">{item.name}</div>
                  <div className="text-sm text-gray-700">${item.price} × {item.quantity}</div>
                </div>
                <button
                  className="text-red-600 hover:underline text-sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-bold text-green-900">Total: ${total}</div>
            <button
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
          <button 
            onClick={handleCheckout}
            className="w-full py-3 bg-green-700 text-white rounded-full font-semibold text-lg hover:bg-green-800 transition"
          >
            Checkout
          </button>
        </>
      )}
    </main>
  );
}
