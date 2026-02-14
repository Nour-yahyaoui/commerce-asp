// app/offers/OffersClient.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProductCard from '../components/productCard';
import { formatPrice } from '../lib/pricing';
import { Clock, Tag, ArrowRight, Sparkles, Timer, Gift, Filter } from 'lucide-react';

interface Offer {
  id: number;
  product_id: number;
  name: string;
  description: string;
  offer_description: string;
  offer_price: number;
  sell_price: number;
  image_url: string;
  start_date: string;
  end_date: string;
}

interface OffersClientProps {
  initialOffers: Offer[];
}

export default function OffersClient({ initialOffers }: OffersClientProps) {
  const [offers] = useState(initialOffers);
  const [sortBy, setSortBy] = useState('ending-soon');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Add sorting logic here if needed
  const sortedOffers = [...offers].sort((a, b) => {
    if (sortBy === 'ending-soon') {
      return new Date(a.end_date).getTime() - new Date(b.end_date).getTime();
    }
    if (sortBy === 'biggest-savings') {
      const savingsA = a.sell_price - a.offer_price;
      const savingsB = b.sell_price - b.offer_price;
      return savingsB - savingsA;
    }
    if (sortBy === 'price-low') {
      return a.offer_price - b.offer_price;
    }
    if (sortBy === 'price-high') {
      return b.offer_price - a.offer_price;
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#0b0b0b] pt-20 md:pt-24 pb-8 md:pb-16">
      <div className="container mx-auto px-3 md:px-4">
        {/* Header Section - Mobile Optimized */}
        <div className="relative mb-6 md:mb-16">
          {/* Background glow - hidden on mobile */}
          <div className="hidden md:block absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#c4a962] rounded-full mix-blend-overlay filter blur-3xl opacity-5 floating"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#c4a962] rounded-full mix-blend-overlay filter blur-3xl opacity-5 floating animation-delay-2000"></div>
          </div>

          {/* Mobile Header */}
          <div className="flex items-center gap-3 mb-2 md:hidden">
            <div className="w-12 h-12 bg-[#1a1a1a] rounded-xl flex items-center justify-center border border-[#c4a962]/30">
              <Timer className="w-6 h-6 text-[#c4a962]" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#c4a962] font-medium">
                Limited Time
              </span>
              <h1 className="text-2xl font-light text-white">
                Weekly<span className="font-bold text-[#c4a962] ml-2">Offers</span>
              </h1>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-[#1a1a1a] rounded-2xl flex items-center justify-center border border-[#c4a962]/30">
                    <Timer className="w-8 h-8 text-[#c4a962]" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#c4a962] rounded-full animate-pulse"></div>
                </div>
                <div>
                  <span className="text-sm uppercase tracking-[0.3em] text-[#c4a962] font-medium">
                    Limited Time
                  </span>
                  <h1 className="text-5xl font-light text-white mt-2">
                    Weekly<span className="font-bold text-[#c4a962] ml-3">Offers</span>
                  </h1>
                </div>
              </div>
              
              <p className="text-gray-400 text-lg max-w-2xl ml-20">
                Exclusive deals that change every week. Grab them before they're gone — 
                each offer is available for a limited time only.
              </p>
            </div>
          </div>

          {/* Mobile Description */}
          <p className="text-sm text-gray-400 md:hidden mt-2">
            Exclusive deals that change every week. Limited time only.
          </p>
        </div>

        {/* Mobile Stats Row - Horizontal Scroll */}
        {offers.length > 0 && (
          <div className="md:hidden flex gap-2 overflow-x-auto pb-4 -mx-3 px-3 scrollbar-hide mb-4">
            <div className="flex-shrink-0 bg-[#1a1a1a] border border-[#404040] rounded-xl p-3 min-w-[120px]">
              <p className="text-xs text-gray-400">Active Offers</p>
              <p className="text-lg font-bold text-white">{offers.length}</p>
            </div>
            <div className="flex-shrink-0 bg-[#1a1a1a] border border-[#404040] rounded-xl p-3 min-w-[120px]">
              <p className="text-xs text-gray-400">Max Savings</p>
              <p className="text-lg font-bold text-[#c4a962]">
                {Math.max(...offers.map((o) => 
                  Math.round(((o.sell_price - o.offer_price) / o.sell_price) * 100)
                ))}%
              </p>
            </div>
            <div className="flex-shrink-0 bg-[#1a1a1a] border border-[#404040] rounded-xl p-3 min-w-[120px]">
              <p className="text-xs text-gray-400">Ending Soon</p>
              <p className="text-sm font-bold text-yellow-500">
                {offers.filter(o => {
                  const daysLeft = Math.ceil((new Date(o.end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                  return daysLeft <= 2;
                }).length} offers
              </p>
            </div>
          </div>
        )}

        {/* Desktop Quick Stats */}
        {offers.length > 0 && (
          <div className="hidden md:flex gap-4 ml-20 mb-8">
            <div className="bg-[#1a1a1a] border border-[#404040] rounded-2xl px-6 py-4">
              <p className="text-3xl font-bold text-[#c4a962]">{offers.length}</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Active Offers</p>
            </div>
            <div className="bg-[#1a1a1a] border border-[#404040] rounded-2xl px-6 py-4">
              <p className="text-3xl font-bold text-[#c4a962]">
                {Math.max(...offers.map((o) => 
                  Math.round(((o.sell_price - o.offer_price) / o.sell_price) * 100)
                ))}%
              </p>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Max Savings</p>
            </div>
          </div>
        )}

        {offers.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-8 md:py-16">
            {/* Empty state illustration */}
            <div className="relative mb-6 md:mb-8">
              <div className="w-20 h-20 md:w-32 md:h-32 mx-auto bg-[#1a1a1a] rounded-full flex items-center justify-center border-2 border-[#404040]">
                <Gift className="w-10 h-10 md:w-16 md:h-16 text-[#404040]" />
              </div>
              
              {/* Decorative rings */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 border-2 border-[#c4a962]/10 rounded-full scale-150 animate-pulse"></div>
                <div className="absolute inset-0 border-2 border-[#c4a962]/5 rounded-full scale-125"></div>
              </div>
            </div>
            
            <h2 className="text-xl md:text-3xl font-light text-white mb-2 md:mb-3">
              No<span className="font-bold text-[#c4a962] ml-2">offers</span> available
            </h2>
            
            <p className="text-sm md:text-base text-gray-400 mb-6 md:mb-8 max-w-md mx-auto">
              New weekly offers are coming soon. Check back later for exclusive deals and limited-time discounts.
            </p>
            
            <Link 
              href="/" 
              className="group bg-[#c4a962] text-[#0b0b0b] px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-base font-medium hover:bg-[#d4b97a] transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-gold"
            >
              Browse Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ) : (
          <>
            {/* Filter/Sort Bar - Mobile Optimized */}
            <div className="bg-[#1a1a1a] border border-[#404040] rounded-xl p-3 md:p-4 mb-4 md:mb-8">
              {/* Mobile: Filter Button and Sort Dropdown */}
              <div className="flex items-center gap-2 md:hidden">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="flex items-center gap-2 bg-[#2d2d2d] px-4 py-2.5 rounded-lg border border-[#404040]"
                >
                  <Filter className="w-4 h-4 text-[#c4a962]" />
                  <span className="text-sm text-gray-300">Filter</span>
                </button>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex-1 bg-[#2d2d2d] text-gray-300 border border-[#404040] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#c4a962]"
                >
                  <option value="ending-soon">Ending Soon</option>
                  <option value="biggest-savings">Biggest Savings</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {/* Desktop: Full controls */}
              <div className="hidden md:flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#c4a962]" />
                    <span className="text-gray-300">
                      <span className="text-white font-bold">{offers.length}</span> active offers
                    </span>
                  </div>
                  <div className="w-px h-6 bg-[#404040]"></div>
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#c4a962]" />
                    <span className="text-gray-300">
                      Save up to{' '}
                      <span className="text-white font-bold">
                        {Math.max(...offers.map((o) => 
                          Math.round(((o.sell_price - o.offer_price) / o.sell_price) * 100)
                        ))}%
                      </span>
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">Sort by:</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-[#2d2d2d] text-gray-300 border border-[#404040] rounded-lg px-4 py-2 focus:outline-none focus:border-[#c4a962] transition-colors"
                  >
                    <option value="ending-soon">Ending Soon</option>
                    <option value="biggest-savings">Biggest Savings</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Mobile Filter Modal */}
            {showMobileFilters && (
              <div className="fixed inset-0 bg-black/50 z-50 md:hidden">
                <div className="absolute bottom-0 left-0 right-0 bg-[#1a1a1a] rounded-t-2xl p-4 animate-slide-up">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-white">Sort Options</h3>
                    <button onClick={() => setShowMobileFilters(false)}>
                      <span className="text-gray-400">✕</span>
                    </button>
                  </div>
                  <div className="space-y-2">
                    {[
                      { value: 'ending-soon', label: 'Ending Soon' },
                      { value: 'biggest-savings', label: 'Biggest Savings' },
                      { value: 'price-low', label: 'Price: Low to High' },
                      { value: 'price-high', label: 'Price: High to Low' },
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

            {/* Offers Grid - Mobile Optimized */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
              {sortedOffers.map((offer: any, index: number) => {
                // Calculate discount percentage
                const discountPercent = Math.round(
                  ((offer.sell_price - offer.offer_price) / offer.sell_price) * 100
                );
                
                // Calculate time remaining
                const endDate = new Date(offer.end_date);
                const now = new Date();
                const daysRemaining = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                const hoursRemaining = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60));
                
                return (
                  <div 
                    key={offer.id} 
                    className="group bg-[#1a1a1a] rounded-xl md:rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-[#404040] hover:border-[#c4a962]/30 animate-fadeIn"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img 
                        src={offer.image_url || 'https://via.placeholder.com/600'} 
                        alt={offer.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-transparent"></div>
                      
                      {/* Tags */}
                      <div className="absolute top-2 left-2 md:top-4 md:left-4 flex gap-1 md:gap-2">
                        <span className="bg-[#c4a962] text-[#0b0b0b] text-xs font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-lg">
                          -{discountPercent}%
                        </span>
                        <span className="bg-[#1a1a1a]/90 backdrop-blur-sm text-[#c4a962] text-xs font-medium px-2 py-1 md:px-3 md:py-1.5 rounded-full border border-[#c4a962]/30">
                          🔥 Limited
                        </span>
                      </div>
                      
                      {/* Time Badge */}
                      <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-[#0b0b0b]/90 backdrop-blur-sm px-2 py-1 md:px-3 md:py-1.5 rounded-full border border-[#404040]">
                        <span className="text-xs text-gray-300 flex items-center gap-1">
                          <Timer className="w-3 h-3 text-[#c4a962]" />
                          {daysRemaining > 0 
                            ? `${daysRemaining}d`
                            : `${hoursRemaining}h`
                          }
                        </span>
                      </div>
                    </div>
                    
                    {/* Content - Mobile Optimized */}
                    <div className="p-3 md:p-6">
                      <h3 className="text-sm md:text-xl font-medium text-white mb-1 md:mb-2 group-hover:text-[#c4a962] transition-colors line-clamp-1">
                        {offer.name}
                      </h3>
                      
                      <p className="text-xs md:text-sm text-gray-400 mb-2 md:mb-4 line-clamp-2">
                        {offer.offer_description}
                      </p>
                      
                      {/* Price - Mobile Optimized */}
                      <div className="mb-2 md:mb-4">
                        <div className="flex items-baseline gap-2 md:gap-3">
                          <span className="text-base md:text-2xl font-bold text-[#c4a962]">
                            {formatPrice(offer.offer_price)}
                          </span>
                          <span className="text-xs md:text-sm text-gray-500 line-through">
                            {formatPrice(offer.sell_price)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 hidden md:block">
                          You save {formatPrice(offer.sell_price - offer.offer_price)}
                        </p>
                      </div>
                      
                      {/* Mobile: Savings text */}
                      <p className="text-xs text-green-500 mb-2 md:hidden">
                        Save {formatPrice(offer.sell_price - offer.offer_price)}
                      </p>
                      
                      {/* Progress Bar - Hidden on mobile */}
                      <div className="hidden md:block mb-5">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Available until</span>
                          <span className="text-[#c4a962]">
                            {endDate.toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="h-1.5 bg-[#2d2d2d] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#c4a962] rounded-full"
                            style={{ 
                              width: `${Math.min(100, (daysRemaining / 7) * 100)}%`,
                              opacity: 0.8
                            }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* Action Button - Mobile Optimized */}
                      <Link 
                        href={`/product/${offer.product_id}`}
                        className="block w-full bg-[#2d2d2d] hover:bg-[#c4a962] text-center text-white hover:text-[#0b0b0b] px-3 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl text-xs md:text-base font-medium transition-all duration-300 border border-[#404040] hover:border-[#c4a962]"
                      >
                        <span className="flex items-center justify-center gap-1 md:gap-2">
                          View Deal
                          <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Note - Mobile Optimized */}
            <div className="mt-8 md:mt-16 text-center">
              <div className="inline-flex items-center gap-2 md:gap-3 bg-[#1a1a1a] border border-[#404040] rounded-full px-4 md:px-6 py-2 md:py-3">
                <Timer className="w-3 h-3 md:w-4 md:h-4 text-[#c4a962]" />
                <p className="text-xs md:text-sm text-gray-400">
                  All offers valid while supplies last
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