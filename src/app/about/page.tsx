import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-6">
            About INDKAN World Wide Exim LLC
          </h1>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-700 leading-relaxed">
            Bringing you the finest, most natural Christmas trees from America's pristine forests
          </p>
        </div>

        {/* Company Overview */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <div className="w-3 h-8 bg-green-600 mr-4"></div>
            <h2 className="text-2xl font-bold text-green-900">Our Story</h2>
          </div>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            🔹 <strong>INDKAN World Wide Exim LLC</strong> is a U.S.-based import-export specialist committed to delivering premium-grade agri-commodities, pharmaceuticals, and global distribution services. With a mission to revolutionize global trade through data-driven strategies and operational agility, INDKAN empowers local producers, fosters sustainable growth, and builds strategic partnerships across markets.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl mb-2">🌱</div>
              <h3 className="font-semibold text-green-900 mb-2">Fresh Produce & Spices</h3>
              <p className="text-sm text-gray-600">Premium agricultural commodities</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl mb-2">🏥</div>
              <h3 className="font-semibold text-green-900 mb-2">Healthcare Supplies</h3>
              <p className="text-sm text-gray-600">Nutraceutical and pharmaceutical products</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl mb-2">🚛</div>
              <h3 className="font-semibold text-green-900 mb-2">Logistics & Distribution</h3>
              <p className="text-sm text-gray-600">Multimodal wholesale distribution</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">
            We are rapidly expanding our footprint across the United States, with plans to establish offices and warehouses in all 50 states by the end of 2025. Through innovation, customer-first agility, and a strong logistics backbone, INDKAN is redefining industry benchmarks and enabling smarter, faster, and more sustainable trade.
          </p>
        </div>

        {/* Christmas Trees Section */}
        <div className="bg-gradient-to-r from-green-800 to-green-700 text-white rounded-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <div className="text-4xl mr-4">🎄</div>
            <h2 className="text-3xl font-bold">Our Natural Christmas Trees</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-100">100% Natural & Sustainable</h3>
              <ul className="space-y-3 text-green-50">
                <li className="flex items-start">
                  <span className="text-green-300 mr-2">🌲</span>
                  <span>Sourced from certified sustainable tree farms across the Pacific Northwest</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-300 mr-2">🌿</span>
                  <span>No artificial preservatives or chemicals - just pure, natural freshness</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-300 mr-2">🏔️</span>
                  <span>Grown in pristine mountain environments with clean air and pure water</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-300 mr-2">♻️</span>
                  <span>Eco-friendly harvesting practices that support forest regeneration</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-100">Premium Quality Promise</h3>
              <ul className="space-y-3 text-green-50">
                <li className="flex items-start">
                  <span className="text-green-300 mr-2">✨</span>
                  <span>Hand-selected for perfect shape, fullness, and needle retention</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-300 mr-2">🚚</span>
                  <span>Fresh-cut and delivered within 48 hours of harvest</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-300 mr-2">🎯</span>
                  <span>Rigorous quality control ensures only the finest trees reach your home</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-300 mr-2">🏠</span>
                  <span>Long-lasting freshness that fills your home with natural pine fragrance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tree Varieties */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-green-900 mb-6 text-center">Our Natural Tree Varieties</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-green-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-4xl mb-3">🌲</div>
              <h3 className="font-semibold text-green-900 mb-2">Noble Fir</h3>
              <p className="text-sm text-gray-600 mb-3">The premium choice with excellent needle retention and sturdy branches</p>
              <div className="text-xs text-green-700 bg-green-50 px-2 py-1 rounded">100% Natural</div>
            </div>
            
            <div className="text-center p-6 border border-green-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-4xl mb-3">🎄</div>
              <h3 className="font-semibold text-green-900 mb-2">Douglas Fir</h3>
              <p className="text-sm text-gray-600 mb-3">Classic Christmas tree with sweet fragrance and full, pyramid shape</p>
              <div className="text-xs text-green-700 bg-green-50 px-2 py-1 rounded">Sustainably Grown</div>
            </div>
            
            <div className="text-center p-6 border border-green-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-4xl mb-3">🌿</div>
              <h3 className="font-semibold text-green-900 mb-2">Grand Fir</h3>
              <p className="text-sm text-gray-600 mb-3">Glossy green needles with citrus scent and excellent fullness</p>
              <div className="text-xs text-green-700 bg-green-50 px-2 py-1 rounded">Forest Fresh</div>
            </div>
          </div>
        </div>

        {/* Environmental Commitment */}
        <div className="bg-green-50 rounded-lg p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-green-900 mb-4">Our Environmental Commitment</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Every tree we sell represents our commitment to environmental stewardship and sustainable forestry practices.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="text-3xl">🌍</div>
              <div>
                <h3 className="font-semibold text-green-900 mb-2">Carbon Neutral Operations</h3>
                <p className="text-gray-600 text-sm">Our tree farms actively absorb CO₂, making each purchase carbon-positive for the environment.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="text-3xl">🦋</div>
              <div>
                <h3 className="font-semibold text-green-900 mb-2">Wildlife Habitat Protection</h3>
                <p className="text-gray-600 text-sm">Our sustainable farming practices preserve natural habitats for local wildlife.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="text-3xl">💧</div>
              <div>
                <h3 className="font-semibold text-green-900 mb-2">Water Conservation</h3>
                <p className="text-gray-600 text-sm">Advanced irrigation systems minimize water usage while maintaining tree health.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="text-3xl">🌱</div>
              <div>
                <h3 className="font-semibold text-green-900 mb-2">Regenerative Practices</h3>
                <p className="text-gray-600 text-sm">For every tree harvested, multiple seedlings are planted to ensure forest renewal.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-green-900 mb-4">Experience the Natural Difference</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Join thousands of families who trust INDKAN for their natural Christmas trees. 
            Experience the difference that comes from truly sustainable, premium-quality trees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/products" 
              className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors font-semibold"
            >
              Shop Natural Trees
            </a>
            <a 
              href="mailto:info@indkan.com" 
              className="px-6 py-3 border-2 border-green-700 text-green-700 rounded-lg hover:bg-green-50 transition-colors font-semibold"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
