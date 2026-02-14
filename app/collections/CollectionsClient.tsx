// app/collections/CollectionsClient.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LayoutGrid, ArrowRight, Package, Sparkles, Search } from 'lucide-react';

interface Collection {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  product_count: number;
  created_at: string;
}

interface CollectionsClientProps {
  initialCollections: Collection[];
}

export default function CollectionsClient({ initialCollections }: CollectionsClientProps) {
  const [collections] = useState(initialCollections);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Filter collections based on search
  const filteredCollections = collections.filter(collection =>
    collection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collection.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort collections
  const sortedCollections = [...filteredCollections].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === 'products') {
      return b.product_count - a.product_count;
    }
    return 0;
  });

  // Calculate total products
  const totalProducts = collections.reduce((acc, col) => acc + col.product_count, 0);

  return (
    <div className="min-h-screen bg-[#0b0b0b] pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="relative mb-12">
          {/* Background glow */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#c4a962] rounded-full mix-blend-overlay filter blur-3xl opacity-5 floating"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#c4a962] rounded-full mix-blend-overlay filter blur-3xl opacity-5 floating animation-delay-2000"></div>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-[#1a1a1a] rounded-2xl flex items-center justify-center border border-[#c4a962]/30">
                <LayoutGrid className="w-8 h-8 text-[#c4a962]" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#c4a962] rounded-full animate-pulse"></div>
            </div>
            <div>
              <span className="text-sm uppercase tracking-[0.3em] text-[#c4a962] font-medium">
                Curated Selections
              </span>
              <h1 className="text-5xl md:text-6xl font-light text-white mt-2">
                Our<span className="font-bold text-[#c4a962] ml-3">Collections</span>
              </h1>
            </div>
          </div>
          
          <p className="text-gray-400 text-lg max-w-2xl ml-20">
            Discover our thoughtfully curated collections, each telling a unique story 
            through carefully selected pieces that embody elegance and sophistication.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-[#1a1a1a] border border-[#404040] rounded-xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search collections..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#2d2d2d] text-white border border-[#404040] rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-[#c4a962] transition-colors"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#2d2d2d] text-gray-300 border border-[#404040] rounded-lg px-3 py-2 focus:outline-none focus:border-[#c4a962] transition-colors"
              >
                <option value="newest">Newest</option>
                <option value="name">Name</option>
                <option value="products">Most Products</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-[#c4a962]" />
              <span className="text-gray-300">
                <span className="text-white font-bold">{collections.length}</span> collections
              </span>
            </div>
            <div className="w-px h-6 bg-[#404040]"></div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#c4a962]" />
              <span className="text-gray-300">
                <span className="text-white font-bold">{totalProducts}</span> total products
              </span>
            </div>
          </div>
        </div>

        {/* Collections Grid */}
        {sortedCollections.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="relative mb-8">
              <div className="w-32 h-32 mx-auto bg-[#1a1a1a] rounded-full flex items-center justify-center border-2 border-[#404040]">
                <LayoutGrid className="w-16 h-16 text-[#404040]" />
              </div>
              
              <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 border-2 border-[#c4a962]/10 rounded-full scale-150 animate-pulse"></div>
                <div className="absolute inset-0 border-2 border-[#c4a962]/5 rounded-full scale-125"></div>
              </div>
            </div>
            
            <h2 className="text-3xl font-light text-white mb-3">
              No<span className="font-bold text-[#c4a962] ml-2">collections</span> found
            </h2>
            
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              {searchTerm ? `No collections matching "${searchTerm}"` : 'Collections are being curated. Check back soon.'}
            </p>
            
            {searchTerm ? (
              <button 
                onClick={() => setSearchTerm('')}
                className="group bg-[#c4a962] text-[#0b0b0b] px-8 py-4 rounded-full font-medium hover:bg-[#d4b97a] transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-gold"
              >
                Clear Search
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <Link 
                href="/" 
                className="group bg-[#c4a962] text-[#0b0b0b] px-8 py-4 rounded-full font-medium hover:bg-[#d4b97a] transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-gold"
              >
                Browse Products
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedCollections.map((collection, index) => (
                <Link 
                  key={collection.id}
                  href={`/collections/${collection.id}`}
                  className="group animate-fadeIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-[#404040] hover:border-[#c4a962]/30 h-full flex flex-col">
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img 
                        src={collection.image_url || 'https://via.placeholder.com/600'} 
                        alt={collection.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-transparent opacity-60"></div>
                      
                      {/* Product Count Badge */}
                      <div className="absolute bottom-4 right-4 bg-[#c4a962] text-[#0b0b0b] text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                        {collection.product_count} {collection.product_count === 1 ? 'item' : 'items'}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h2 className="text-2xl font-medium text-white mb-2 group-hover:text-[#c4a962] transition-colors">
                        {collection.name}
                      </h2>
                      
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                        {collection.description || 'Discover our curated selection of premium products.'}
                      </p>
                      
                      {/* View Collection Link */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#404040]">
                        <span className="text-sm text-gray-500">
                          View collection
                        </span>
                        <ArrowRight className="w-5 h-5 text-[#c4a962] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Results Summary */}
            <div className="mt-8 text-center text-sm text-gray-500">
              Showing {sortedCollections.length} of {collections.length} collections
            </div>

            {/* Footer Note */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-3 bg-[#1a1a1a] border border-[#404040] rounded-full px-6 py-3">
                <Sparkles className="w-4 h-4 text-[#c4a962]" />
                <p className="text-sm text-gray-400">
                  New collections added regularly. Stay tuned for more curated selections.
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .floating {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}