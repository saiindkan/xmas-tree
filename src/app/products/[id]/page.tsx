"use client";
import { notFound, useRouter } from "next/navigation";
import products from "../../../data/products";
import { useCart } from "../../../context/CartContext";
import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const product = products.find((p) => p.id.toString() === params.id);
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  if (!product) return notFound();

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.images[0],
    }, quantity);
    setTimeout(() => setIsAdding(false), 1000);
  };

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  return (
    <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <button 
          onClick={() => router.back()}
          className="text-green-700 hover:text-green-900 font-medium flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back to Products
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column: Image Slideshow */}
        <div className="flex flex-col gap-4">
          <Swiper
            modules={[Navigation, Pagination, Thumbs]}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            spaceBetween={10}
            navigation
            pagination={{ clickable: true }}
            className="w-full rounded-lg shadow-lg overflow-hidden"
          >
            {product.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} alt={`${product.name} - image ${index + 1}`} className="w-full h-auto object-contain aspect-square" />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[Thumbs]}
            className="w-full h-24"
          >
            {product.images.map((image, index) => (
              <SwiperSlide key={index} className="cursor-pointer rounded-md overflow-hidden border-2 border-transparent hover:border-green-500">
                <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-contain" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right Column: Product Details */}
        <div className="flex flex-col justify-center">
          {product.badge && (
            <span className="bg-green-700 text-white text-xs font-bold px-3 py-1 rounded-full self-start mb-3">
              {product.badge}
            </span>
          )}
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6 text-lg">{product.description}</p>
          
          <div className="flex items-center gap-6 mb-6">
            <div className="text-sm text-gray-600"><span className="font-semibold text-gray-800">Height:</span> {product.height}</div>
            <div className="text-sm text-gray-600"><span className="font-semibold text-gray-800">Shape:</span> {product.shape}</div>
            <div className="text-sm text-gray-600"><span className="font-semibold text-gray-800">Light:</span> {product.light}</div>
          </div>

          <div className="text-4xl font-bold text-green-600 mb-8">${product.price.toFixed(2)}</div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button 
                onClick={() => handleQuantityChange(-1)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-5 py-2 bg-white text-lg font-medium">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(1)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold text-white text-lg transition-all duration-300 transform hover:scale-105 ${
                isAdding 
                  ? 'bg-green-400 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isAdding ? 'Added!' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
