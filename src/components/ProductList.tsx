import Link from "next/link";
import { motion } from 'framer-motion';

const trees = [
  {
    id: 1,
    name: "Classic Fir",
    desc: "6-8 ft, Fresh, Fragrant",
    price: "$89.99",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    tag: "🎄 Best Seller"
  },
  {
    id: 2,
    name: "Blue Spruce",
    desc: "7-9 ft, Silvery Needles",
    price: "$109.99",
    img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
    tag: "✨ Premium"
  },
  {
    id: 3,
    name: "Decorated Pine",
    desc: "5-7 ft, Pre-Decorated",
    price: "$129.99",
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    tag: "🎁 Ready to Gift"
  },
  {
    id: 4,
    name: "Mini Tabletop Tree",
    desc: "2 ft, Perfect for desks",
    price: "$39.99",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    tag: "🏠 Small Space"
  },
  {
    id: 5,
    name: "Luxury Noble Fir",
    desc: "8-10 ft, Premium",
    price: "$189.99",
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    tag: "💎 Luxury"
  },
];

const ProductCard = ({ tree }) => (
  <motion.div 
    className="product-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 relative group"
    whileHover={{ scale: 1.02 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {tree.tag && (
      <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
        {tree.tag}
      </div>
    )}
    <div className="relative overflow-hidden h-64">
      <img 
        src={tree.img} 
        alt={tree.name} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <div className="text-white">
          <h3 className="font-bold text-xl">{tree.name}</h3>
          <p className="text-sm">{tree.desc}</p>
        </div>
      </div>
    </div>
    <div className="p-4">
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold text-green-800">{tree.price}</span>
        <Link 
          href={`/products/${tree.id}`} 
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 transform hover:scale-105 inline-flex items-center"
          data-hover-effect
        >
          View Details
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
    <div className="absolute inset-0 border-2 border-transparent group-hover:border-green-400 rounded-xl pointer-events-none transition-all duration-300"></div>
  </motion.div>
);

export default function ProductList() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 max-w-7xl mx-auto">
      {trees.map((tree) => (
        <ProductCard key={tree.id} tree={tree} />
      ))}
    </section>
  );
}

