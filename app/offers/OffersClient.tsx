// app/offers/OffersClient.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProductCard from '../components/productCard';
import { formatPrice } from '../lib/pricing';
import { Clock, Tag, ArrowRight, Sparkles, Timer, Gift } from 'lucide-react';

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
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#0b0b0b] pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header Section with Decorative Elements */}
        <div className="relative mb-16">
          {/* Background glow - moved to global CSS or use style tag */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#c4a962] rounded-full mix-blend-overlay filter blur-3xl opacity-5 floating"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#c4a962] rounded-full mix-blend-overlay filter blur-3xl opacity-5 floating animation-delay-2000"></div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-[#1a1a1a] rounded-2xl flex items-center justify-center border border-[#c4a962]/30">
                    <Timer className="w-8 h-8 text-[#c4a962]" />
                  </div>
                  {/* Decorative dot */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#c4a962] rounded-full animate-pulse"></div>
                </div>
                <div>
                  <span className="text-sm uppercase tracking-[0.3em] text-[#c4a962] font-medium">
                    Limited Time
                  </span>
                  <h1 className="text-5xl md:text-6xl font-light text-white mt-2">
                    Weekly<span className="font-bold text-[#c4a962] ml-3">Offers</span>
                  </h1>
                </div>
              </div>
              
              <p className="text-gray-400 text-lg max-w-2xl ml-20">
                Exclusive deals that change every week. Grab them before they're gone — 
                each offer is available for a limited time only.
              </p>
            </div>

            {/* Quick stats */}
            {offers.length > 0 && (
              <div className="flex gap-4 ml-20 md:ml-0">
                <div className="bg-[#1a1a1a] border border-[#404040] rounded-2xl px-6 py-4">
                  <p className="text-3xl font-bold text-[#c4a962]">{offers.length}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Active Offers</p>
                </div>
                <div className="bg-[#1a1a1a] border border-[#404040] rounded-2xl px-6 py-4">
                  <p className="text-3xl font-bold text-[#c4a962]">
                    {Math.max(...offers.map((o: any) => 
                      Math.round(((o.sell_price - o.offer_price) / o.sell_price) * 100)
                    ))}%
                  </p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Max Savings</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {offers.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-16">
            {/* Empty state illustration */}
            <div className="relative mb-8">
              <div className="w-32 h-32 mx-auto bg-[#1a1a1a] rounded-full flex items-center justify-center border-2 border-[#404040]">
                <Gift className="w-16 h-16 text-[#404040]" />
              </div>
              
              {/* Decorative rings */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 border-2 border-[#c4a962]/10 rounded-full scale-150 animate-pulse"></div>
                <div className="absolute inset-0 border-2 border-[#c4a962]/5 rounded-full scale-125"></div>
              </div>
            </div>
            
            <h2 className="text-3xl font-light text-white mb-3">
              No<span className="font-bold text-[#c4a962] ml-2">offers</span> available
            </h2>
            
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              New weekly offers are coming soon. Check back later for exclusive deals and limited-time discounts.
            </p>
            
            <Link 
              href="/" 
              className="group bg-[#c4a962] text-[#0b0b0b] px-8 py-4 rounded-full font-medium hover:bg-[#d4b97a] transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-gold"
            >
              Browse Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ) : (
          <>
            {/* Filter/Sort Bar */}
            <div className="bg-[#1a1a1a] border border-[#404040] rounded-xl p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#c4a962]" />
                  <span className="text-gray-300">
                    <span className="text-white font-bold">{offers.length}</span> active offers
                  </span>
                </div>
                <div className="w-px h-6 bg-[#404040] hidden sm:block"></div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#c4a962]" />
                  <span className="text-gray-300">
                    Save up to{' '}
                    <span className="text-white font-bold">
                      {Math.max(...offers.map((o: any) => 
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

            {/* Offers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    className="group bg-[#1a1a1a] rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-[#404040] hover:border-[#c4a962]/30"
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
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="bg-[#c4a962] text-[#0b0b0b] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                          -{discountPercent}%
                        </span>
                        <span className="bg-[#1a1a1a]/90 backdrop-blur-sm text-[#c4a962] text-xs font-medium px-3 py-1.5 rounded-full border border-[#c4a962]/30">
                          🔥 Limited
                        </span>
                      </div>
                      
                      {/* Time Badge */}
                      <div className="absolute bottom-4 right-4 bg-[#0b0b0b]/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#404040]">
                        <span className="text-xs text-gray-300 flex items-center gap-1">
                          <Timer className="w-3 h-3 text-[#c4a962]" />
                          {daysRemaining > 0 
                            ? `${daysRemaining} ${daysRemaining === 1 ? 'day' : 'days'} left`
                            : `${hoursRemaining} hours left`
                          }
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-medium text-white mb-2 group-hover:text-[#c4a962] transition-colors">
                        {offer.name}
                      </h3>
                      
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {offer.offer_description}
                      </p>
                      
                      {/* Price */}
                      <div className="mb-4">
                        <div className="flex items-baseline gap-3">
                          <span className="text-2xl font-bold text-[#c4a962]">
                            {formatPrice(offer.offer_price)}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(offer.sell_price)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          You save {formatPrice(offer.sell_price - offer.offer_price)}
                        </p>
                      </div>
                      
                      {/* Progress Bar (visual representation of time left) */}
                      <div className="mb-5">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Available until</span>
                          <span className="text-[#c4a962]">
                            {endDate.toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
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
                      
                      {/* Action Button */}
                      <Link 
                        href={`/product/${offer.product_id}`}
                        className="block w-full bg-[#2d2d2d] hover:bg-[#c4a962] text-center text-white hover:text-[#0b0b0b] px-6 py-3 rounded-xl font-medium transition-all duration-300 border border-[#404040] hover:border-[#c4a962] group"
                      >
                        <span className="flex items-center justify-center gap-2">
                          View Deal
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Note */}
            <div className="mt-16 text-center">
              <div className="inline-flex items-center gap-3 bg-[#1a1a1a] border border-[#404040] rounded-full px-6 py-3">
                <Timer className="w-4 h-4 text-[#c4a962]" />
                <p className="text-sm text-gray-400">
                  All offers are valid while supplies last or until the deadline expires.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}