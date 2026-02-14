// app/liked/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '../components/productCard';
import { useLikes } from '../context/LikesContext';
import { Product } from '../types';
import Header from '../components/Header';
import { Heart, ArrowLeft, ShoppingBag, Filter } from 'lucide-react';

export default function LikedPage() {
  const { likedIds, isLoading: likesLoading } = useLikes();
  const [likedProducts, setLikedProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('latest');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    async function fetchLikedProducts() {
      if (likesLoading) return;
      
      try {
        setProductsLoading(true);
        
        console.log('Liked IDs from context:', likedIds);
        
        if (likedIds.length === 0) {
          setLikedProducts([]);
          return;
        }

        // Fetch all products
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const allProducts: Product[] = await response.json();
        
        // Filter only liked products
        const filtered = allProducts.filter(product => 
          likedIds.includes(product.id)
        );
        
        console.log('Filtered liked products:', filtered);
        setLikedProducts(filtered);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching liked products:', err);
      } finally {
        setProductsLoading(false);
      }
    }

    fetchLikedProducts();
  }, [likedIds, likesLoading]);

  // Sort products
  const sortedProducts = [...likedProducts].sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    if (sortBy === 'price-low') {
      return a.sell_price - b.sell_price;
    }
    if (sortBy === 'price-high') {
      return b.sell_price - a.sell_price;
    }
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  if (likesLoading || productsLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#0b0b0b] pt-20 md:pt-24">
          <div className="container mx-auto px-3 md:px-4">
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="text-center">
                <div className="relative">
                  {/* Spinner with gold accent */}
                  <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-[#404040] border-t-[#c4a962] rounded-full animate-spin mx-auto"></div>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-[#c4a962] rounded-full filter blur-xl opacity-20 animate-pulse"></div>
                </div>
                <p className="mt-4 md:mt-6 text-sm md:text-base text-gray-400">Loading your collection...</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#0b0b0b] pt-20 md:pt-24 pb-8 md:pb-16">
        <div className="container mx-auto px-3 md:px-4">
          {/* Back to home link - Mobile Optimized */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-1 md:gap-2 text-xs md:text-sm text-gray-400 hover:text-[#c4a962] transition-colors mb-4 md:mb-6 group"
          >
            <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>

          {/* Header - Mobile Optimized */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 md:mb-8">
            <div>
              <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                <Heart className="w-5 h-5 md:w-6 md:h-6 text-[#c4a962]" />
                <span className="text-xs md:text-sm uppercase tracking-[0.2em] text-[#c4a962]">Your Selection</span>
              </div>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-light text-white">
                Liked<span className="font-bold text-[#c4a962] ml-2">Items</span>
              </h1>
            </div>
            
            {likedProducts.length > 0 && (
              <div className="bg-[#1a1a1a] border border-[#404040] rounded-full px-4 md:px-6 py-2 md:py-3 self-start sm:self-auto">
                <span className="text-[#c4a962] font-medium text-sm md:text-base">{likedProducts.length}</span>
                <span className="text-gray-400 ml-1 md:ml-2 text-xs md:text-sm">items</span>
              </div>
            )}
          </div>

          {error && (
            <div className="bg-[#1a1a1a] border border-red-500/20 text-red-400 px-4 md:px-6 py-3 md:py-4 rounded-xl mb-6 md:mb-8 text-sm md:text-base">
              {error}
            </div>
          )}

          {likedProducts.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center py-8 md:py-16">
              {/* Empty state illustration */}
              <div className="relative mb-6 md:mb-8">
                <div className="w-20 h-20 md:w-32 md:h-32 mx-auto bg-[#1a1a1a] rounded-full flex items-center justify-center border-2 border-[#404040]">
                  <Heart className="w-10 h-10 md:w-16 md:h-16 text-[#404040]" />
                </div>
                
                {/* Decorative rings */}
                <div className="absolute inset-0 -z-10">
                  <div className="absolute inset-0 border-2 border-[#c4a962]/10 rounded-full scale-150 animate-pulse"></div>
                  <div className="absolute inset-0 border-2 border-[#c4a962]/5 rounded-full scale-125"></div>
                </div>
              </div>
              
              <h2 className="text-xl md:text-3xl font-light text-white mb-2 md:mb-3">
                Your<span className="font-bold text-[#c4a962] ml-2">wishlist</span> is empty
              </h2>
              
              <p className="text-sm md:text-base text-gray-400 mb-6 md:mb-8 max-w-md mx-auto">
                Discover our collection and click the heart icon on items you love. They'll appear here, waiting for you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
                <Link 
                  href="/" 
                  className="group bg-[#c4a962] text-[#0b0b0b] px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-base font-medium hover:bg-[#d4b97a] transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-gold"
                >
                  <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
                  Browse Products
                </Link>
                
                <Link 
                  href="/collections" 
                  className="group bg-[#1a1a1a] text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-base font-medium hover:bg-[#2d2d2d] transition-all duration-300 inline-flex items-center justify-center gap-2 border border-[#404040] hover:border-[#c4a962]/30"
                >
                  View Collections
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Results summary and sort - Mobile Optimized */}
              <div className="bg-[#1a1a1a] border border-[#404040] rounded-xl p-3 md:p-4 mb-6 md:mb-8">
                {/* Mobile: Sort button and count */}
                <div className="flex items-center justify-between md:hidden">
                  <p className="text-sm text-gray-400">
                    <span className="text-white font-medium">{likedProducts.length}</span> items
                  </p>
                  <button
                    onClick={() => setShowMobileFilters(true)}
                    className="flex items-center gap-2 bg-[#2d2d2d] px-4 py-2 rounded-lg border border-[#404040]"
                  >
                    <Filter className="w-4 h-4 text-[#c4a962]" />
                    <span className="text-sm text-gray-300">Sort</span>
                  </button>
                </div>

                {/* Desktop: Full controls */}
                <div className="hidden md:flex items-center justify-between">
                  <p className="text-gray-400">
                    Showing <span className="text-white font-medium">{likedProducts.length}</span> items you love
                  </p>
                  
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-[#2d2d2d] text-gray-300 border border-[#404040] rounded-lg px-4 py-2 focus:outline-none focus:border-[#c4a962] transition-colors"
                  >
                    <option value="latest">Sort by: Latest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name</option>
                  </select>
                </div>
              </div>

              {/* Mobile Sort Modal */}
              {showMobileFilters && (
                <div className="fixed inset-0 bg-black/50 z-50 md:hidden">
                  <div className="absolute bottom-0 left-0 right-0 bg-[#1a1a1a] rounded-t-2xl p-4 animate-slide-up">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-white">Sort Items</h3>
                      <button onClick={() => setShowMobileFilters(false)}>
                        <span className="text-gray-400">✕</span>
                      </button>
                    </div>
                    <div className="space-y-2">
                      {[
                        { value: 'latest', label: 'Latest' },
                        { value: 'price-low', label: 'Price: Low to High' },
                        { value: 'price-high', label: 'Price: High to Low' },
                        { value: 'name', label: 'Name' },
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
              
              {/* Products grid - Mobile Optimized */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
}