// app/collections/CollectionsClient.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LayoutGrid, ArrowRight, Package, Sparkles, Search, Filter, X } from 'lucide-react';

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
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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
    <div className="min-h-screen bg-[#0b0b0b] pt-20 md:pt-24 pb-8 md:pb-16">
      <div className="container mx-auto px-3 md:px-4">
        {/* Header Section - Mobile Optimized */}
        <div className="relative mb-6 md:mb-12">
          {/* Background glow - hidden on mobile */}
          <div className="hidden md:block absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#c4a962] rounded-full mix-blend-overlay filter blur-3xl opacity-5 floating"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#c4a962] rounded-full mix-blend-overlay filter blur-3xl opacity-5 floating animation-delay-2000"></div>
          </div>

          {/* Mobile Header */}
          <div className="flex items-center gap-3 mb-2 md:hidden">
            <div className="w-12 h-12 bg-[#1a1a1a] rounded-xl flex items-center justify-center border border-[#c4a962]/30">
              <LayoutGrid className="w-6 h-6 text-[#c4a962]" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#c4a962] font-medium">
                Curated Selections
              </span>
              <h1 className="text-2xl font-light text-white">
                Our<span className="font-bold text-[#c4a962] ml-2">Collections</span>
              </h1>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex items-center gap-4 mb-4">
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
              <h1 className="text-5xl font-light text-white mt-2">
                Our<span className="font-bold text-[#c4a962] ml-3">Collections</span>
              </h1>
            </div>
          </div>
          
          <p className="text-sm md:text-lg text-gray-400 max-w-2xl md:ml-20">
            Discover our thoughtfully curated collections, each telling a unique story 
            through carefully selected pieces that embody elegance and sophistication.
          </p>
        </div>

        {/* Mobile Stats Row - Horizontal Scroll */}
        <div className="md:hidden flex gap-2 overflow-x-auto pb-4 -mx-3 px-3 scrollbar-hide mb-4">
          <div className="flex-shrink-0 bg-[#1a1a1a] border border-[#404040] rounded-xl p-3 min-w-[120px]">
            <p className="text-xs text-gray-400">Collections</p>
            <p className="text-lg font-bold text-white">{collections.length}</p>
          </div>
          <div className="flex-shrink-0 bg-[#1a1a1a] border border-[#404040] rounded-xl p-3 min-w-[120px]">
            <p className="text-xs text-gray-400">Total Products</p>
            <p className="text-lg font-bold text-[#c4a962]">{totalProducts}</p>
          </div>
          <div className="flex-shrink-0 bg-[#1a1a1a] border border-[#404040] rounded-xl p-3 min-w-[120px]">
            <p className="text-xs text-gray-400">Newest</p>
            <p className="text-sm font-bold text-green-500">
              {new Date(collections[0]?.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Desktop Stats */}
        <div className="hidden md:flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-[#c4a962]" />
            <span className="text-gray-300">
              <span className="text-white font-bold">{collections.length}</span> collections
            </span>
          </div>
          <div className="w-px h-6 bg-[#404040]"></div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#c4a962" />
            <span className="text-gray-300">
              <span className="text-white font-bold">{totalProducts}</span> total products
            </span>
          </div>
        </div>

        {/* Search and Filter Bar - Mobile Optimized */}
        <div className="bg-[#1a1a1a] border border-[#404040] rounded-xl p-3 md:p-4 mb-6 md:mb-8">
          {/* Mobile: Search + Filter Button */}
          <div className="flex gap-2 md:hidden">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search collections..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#2d2d2d] text-white border border-[#404040] rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-[#c4a962] transition-colors"
              />
            </div>
            <button
              onClick={() => setShowMobileFilters(true)}
              className="px-3 py-2.5 bg-[#2d2d2d] rounded-lg border border-[#404040] text-[#c4a962]"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop: Full controls */}
          <div className="hidden md:flex items-center gap-4 flex-1">
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
        </div>

        {/* Mobile Filter Modal */}
        {showMobileFilters && (
          <div className="fixed inset-0 bg-black/50 z-50 md:hidden">
            <div className="absolute bottom-0 left-0 right-0 bg-[#1a1a1a] rounded-t-2xl p-4 animate-slide-up">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">Sort Collections</h3>
                <button onClick={() => setShowMobileFilters(false)}>
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <div className="space-y-2">
                {[
                  { value: 'newest', label: 'Newest' },
                  { value: 'name', label: 'Name' },
                  { value: 'products', label: 'Most Products' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setShowMobileFilters(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg ${
                      sortBy === option.value
                        ? 'bg-[#c4a962] text-[#0b0b0b]'
                        : 'bg-[#2d2d2d] text-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Collections Grid - Mobile Optimized */}
        {sortedCollections.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-8 md:py-16">
            <div className="relative mb-6 md:mb-8">
              <div className="w-20 h-20 md:w-32 md:h-32 mx-auto bg-[#1a1a1a] rounded-full flex items-center justify-center border-2 border-[#404040]">
                <LayoutGrid className="w-10 h-10 md:w-16 md:h-16 text-[#404040]" />
              </div>
              
              <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 border-2 border-[#c4a962]/10 rounded-full scale-150 animate-pulse"></div>
                <div className="absolute inset-0 border-2 border-[#c4a962]/5 rounded-full scale-125"></div>
              </div>
            </div>
            
            <h2 className="text-xl md:text-3xl font-light text-white mb-2 md:mb-3">
              No<span className="font-bold text-[#c4a962] ml-2">collections</span> found
            </h2>
            
            <p className="text-sm md:text-base text-gray-400 mb-6 md:mb-8 max-w-md mx-auto">
              {searchTerm ? `No collections matching "${searchTerm}"` : 'Collections are being curated. Check back soon.'}
            </p>
            
            {searchTerm ? (
              <button 
                onClick={() => setSearchTerm('')}
                className="group bg-[#c4a962] text-[#0b0b0b] px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-base font-medium hover:bg-[#d4b97a] transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-gold"
              >
                Clear Search
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <Link 
                href="/" 
                className="group bg-[#c4a962] text-[#0b0b0b] px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-base font-medium hover:bg-[#d4b97a] transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-gold"
              >
                Browse Products
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
              {sortedCollections.map((collection, index) => (
                <Link 
                  key={collection.id}
                  href={`/collections/${collection.id}`}
                  className="group animate-fadeIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-[#1a1a1a] rounded-xl md:rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-[#404040] hover:border-[#c4a962]/30 h-full flex flex-col">
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img 
                        src={collection.image_url || 'https://via.placeholder.com/600'} 
                        alt={collection.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-transparent opacity-60"></div>
                      
                      {/* Product Count Badge - Mobile Optimized */}
                      <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-[#c4a962] text-[#0b0b0b] text-xs md:text-sm font-bold px-2 py-1 md:px-4 md:py-2 rounded-full shadow-lg">
                        {collection.product_count} {collection.product_count === 1 ? 'item' : 'items'}
                      </div>
                    </div>
                    
                    {/* Content - Mobile Optimized */}
                    <div className="p-3 md:p-6 flex-1 flex flex-col">
                      <h2 className="text-base md:text-2xl font-medium text-white mb-1 md:mb-2 group-hover:text-[#c4a962] transition-colors line-clamp-1">
                        {collection.name}
                      </h2>
                      
                      <p className="text-xs md:text-sm text-gray-400 mb-3 md:mb-4 line-clamp-2 flex-1">
                        {collection.description || 'Discover our curated selection of premium products.'}
                      </p>
                      
                      {/* View Collection Link - Mobile Optimized */}
                      <div className="flex items-center justify-between mt-2 md:mt-4 pt-2 md:pt-4 border-t border-[#404040]">
                        <span className="text-xs md:text-sm text-gray-500">
                          View collection
                        </span>
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-[#c4a962] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Results Summary - Mobile Optimized */}
            <div className="mt-6 md:mt-8 text-center text-xs md:text-sm text-gray-500">
              Showing {sortedCollections.length} of {collections.length} collections
            </div>

            {/* Footer Note - Mobile Optimized */}
            <div className="mt-8 md:mt-12 text-center">
              <div className="inline-flex items-center gap-2 md:gap-3 bg-[#1a1a1a] border border-[#404040] rounded-full px-4 md:px-6 py-2 md:py-3">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-[#c4a962]" />
                <p className="text-xs md:text-sm text-gray-400">
                  New collections added regularly
                </p>
              </div>
            </div>
          </>
        )}
      </div>

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
        
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
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

        /* Hide scrollbar for mobile stats */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}