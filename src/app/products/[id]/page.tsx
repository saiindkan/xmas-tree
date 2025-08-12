"use client";
import { notFound } from "next/navigation";
import products from "../../../data/products";
import { useCart } from "../../../context/CartContext";
import { useState } from "react";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id.toString() === params.id);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  if (!product) return notFound();

  function handleAdd() {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row gap-10 bg-white rounded-xl shadow-lg p-6 md:p-10">
        <div className="flex-1 flex flex-col items-center">
          <img src={product.img} alt={product.name} className="w-full max-w-xs md:max-w-sm rounded-lg shadow mb-4" />
          {product.badge && (
            <span className="bg-green-700 text-white text-xs font-bold px-4 py-1 rounded-full shadow mb-2">{product.badge}</span>
          )}
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-green-900 mb-3">{product.name}</h1>
          <div className="text-2xl text-green-800 font-bold mb-2">${product.price}</div>
          <div className="mb-4 text-gray-700 text-lg">{product.description}</div>
          <div className="flex gap-6 mb-6">
            <div className="text-sm text-gray-600"><span className="font-semibold text-green-900">Height:</span> {product.height}</div>
            <div className="text-sm text-gray-600"><span className="font-semibold text-green-900">Shape:</span> {product.shape}</div>
            <div className="text-sm text-gray-600"><span className="font-semibold text-green-900">Light:</span> {product.light}</div>
          </div>
          <button
            className={`w-full py-3 rounded-full font-semibold text-lg transition ${added ? "bg-green-300 text-green-900" : "bg-green-700 text-white hover:bg-green-800"}`}
            onClick={handleAdd}
            disabled={added}
          >
            {added ? "Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </main>
  );
}
