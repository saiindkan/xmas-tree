"use client";
import { useState, useEffect, useMemo } from "react";
import productsData from "../../data/products";
import { useCart } from "../../context/CartContext";

// Constants for filters
const treeHeights = ["2'", "6.5' - 9'", "6.5' - 12'", "8' - 10'"];
const lightTypes = ["LED", "Unlit"];
const shapes = ["Full", "Slim"];

// Type for product filters
interface ProductFilters {
  heights: string[];
  lights: string[];
  shapes: string[];
  searchQuery: string;
}

// Product Item Component
function ProductItem({ 
  product, 
  quantity, 
  onQuantityChange, 
  onAddToCart, 
  cartQuantity 
}: {
  product: typeof productsData[0];
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  onAddToCart: () => void;
  cartQuantity: number;
}) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart();
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {/* Product Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-green-700 text-white text-xs font-bold px-3 py-1 rounded-full">
            {product.badge}
          </span>
        )}
        {cartQuantity > 0 && (
          <span className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
            {cartQuantity}
          </span>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 flex-1">{product.description}</p>
        
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-green-700">${product.price.toFixed(2)}</span>
          <div className="text-sm text-gray-500">
            {product.height} • {product.light} • {product.shape}
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center border rounded-md overflow-hidden">
            <button 
              onClick={() => onQuantityChange(quantity - 1)}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600"
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="px-3 py-1 bg-white">{quantity}</span>
            <button 
              onClick={() => onQuantityChange(quantity + 1)}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600"
            >
              +
            </button>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`px-4 py-2 rounded-md font-medium text-white ${
              isAdding 
                ? 'bg-green-400' 
                : 'bg-green-600 hover:bg-green-700'
            } transition-colors`}
          >
            {isAdding ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const { addToCart, getItemQuantity } = useCart();
  
  // State for filters and sorting
  const [selectedTab, setSelectedTab] = useState("All");
  const [sort, setSort] = useState("Featured");
  const [filters, setFilters] = useState<ProductFilters>({
    heights: [],
    lights: [],
    shapes: [],
    searchQuery: "",
  });
  
  // State for product quantities
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  // Initialize quantities with 1 for each product
  useEffect(() => {
    const initialQuantities = productsData.reduce((acc, product) => {
      acc[product.id] = 1;
      return acc;
    }, {} as Record<number, number>);
    setQuantities(initialQuantities);
  }, []);

  // Handle quantity changes
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantities(prev => ({
      ...prev,
      [productId]: newQuantity
    }));
  };

  // Memoize filtered products to prevent unnecessary recalculations
  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const heightMatch = filters.heights.length === 0 || filters.heights.includes(product.height);
      const lightMatch = filters.lights.length === 0 || filters.lights.includes(product.light);
      const shapeMatch = filters.shapes.length === 0 || filters.shapes.includes(product.shape);
      const searchMatch = !filters.searchQuery || 
        product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.searchQuery.toLowerCase());
      
      let tabMatch = true;
      if (selectedTab === "Best Sellers") tabMatch = product.badge === "Best Seller";
      if (selectedTab === "Staff Picks") tabMatch = product.id === 2;
      
      return heightMatch && lightMatch && shapeMatch && tabMatch && searchMatch;
    });
  }, [filters.heights, filters.lights, filters.shapes, filters.searchQuery, selectedTab]);

  // Sort the memoized filtered products
  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];
    switch (sort) {
      case "Price: Low to High":
        return products.sort((a, b) => a.price - b.price);
      case "Price: High to Low":
        return products.sort((a, b) => b.price - a.price);
      case "Alphabetically, A-Z":
        return products.sort((a, b) => a.name.localeCompare(b.name));
      case "Alphabetically, Z-A":
        return products.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return products;
    }
  }, [filteredProducts, sort]);

  // Handle filter changes
  const handleFilterChange = (filterType: keyof Omit<ProductFilters, 'searchQuery'>, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(v => v !== value)
        : [...prev[filterType], value]
    }));
  };

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      searchQuery: e.target.value
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      heights: [],
      lights: [],
      shapes: [],
      searchQuery: "",
    });
    setSelectedTab("All");
    setSort("Featured");
  };

  return (
    <main className="max-w-7xl mx-auto py-8 px-2 sm:px-4 flex flex-col lg:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-72 mb-6 lg:mb-0">
        <div className="bg-white p-4 rounded-lg shadow-md sticky top-4">
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search products..."
              value={filters.searchQuery}
              onChange={handleSearch}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="text-sm text-green-700 hover:text-green-900 mb-4 font-medium"
          >
            Clear all filters
          </button>

          {/* Tree Height Filter */}
          <div className="mb-6">
            <h3 className="font-bold mb-3 text-gray-800">Tree Height</h3>
            <div className="space-y-2">
              {treeHeights.map((height) => (
                <div key={height} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`height-${height}`}
                    checked={filters.heights.includes(height)}
                    onChange={() => handleFilterChange('heights', height)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`height-${height}`} className="ml-2 text-sm text-gray-700">
                    {height}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Light Type Filter */}
          <div className="mb-6">
            <h3 className="font-bold mb-3 text-gray-800">Light Type</h3>
            <div className="space-y-2">
              {lightTypes.map((light) => (
                <div key={light} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`light-${light}`}
                    checked={filters.lights.includes(light)}
                    onChange={() => handleFilterChange('lights', light)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`light-${light}`} className="ml-2 text-sm text-gray-700">
                    {light}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Shape Filter */}
          <div className="mb-6">
            <h3 className="font-bold mb-3 text-gray-800">Shape</h3>
            <div className="space-y-2">
              {shapes.map((shape) => (
                <div key={shape} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`shape-${shape}`}
                    checked={filters.shapes.includes(shape)}
                    onChange={() => handleFilterChange('shapes', shape)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`shape-${shape}`} className="ml-2 text-sm text-gray-700">
                    {shape}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <section className="flex-1">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {["All", "Best Sellers", "Staff Picks"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-full border font-semibold transition whitespace-nowrap ${
                  selectedTab === tab
                    ? "bg-green-700 text-white border-green-700"
                    : "bg-white text-green-900 border-gray-200 hover:bg-gray-100"
                }`}
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700 font-medium">Sort by:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Alphabetically, A-Z</option>
              <option>Alphabetically, Z-A</option>
            </select>
          </div>
        </div>
        
        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            <button
              onClick={clearFilters}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product) => {
              const cartQuantity = getItemQuantity(product.id);
              const quantity = quantities[product.id] || 1;

              const handleAddToCart = () => {
                addToCart(
                  {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    img: product.img,
                  },
                  quantity
                );
                
                // Reset quantity after adding to cart
                setQuantities(prev => ({
                  ...prev,
                  [product.id]: 1
                }));
              };

              return (
                <ProductItem
                  key={product.id}
                  product={product}
                  quantity={quantity}
                  onQuantityChange={(newQuantity) => handleQuantityChange(product.id, newQuantity)}
                  onAddToCart={handleAddToCart}
                  cartQuantity={cartQuantity}
                />
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
