// app/soldes/SoldesClient.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { formatPrice } from "../lib/pricing";
import ProductCard from "../components/productCard";
import { Product } from "../types";
import {
  Tag,
  Clock,
  ArrowRight,
  Sparkles,
  Gift,
  Percent,
  Coins,
  Filter,
} from "lucide-react";

interface SoldeProduct {
  id: number;
  name: string;
  description: string | null;
  buy_price: number;
  sell_price: number;
  image_url: string | null;
  category: string | null;
  stock: number;
  created_at?: string;
  updated_at?: string;
}

interface Solde {
  id: number;
  name: string;
  description: string | null;
  discount_percent: number | null;
  discount_fixed: number | null;
  start_date: string;
  end_date: string;
  products: SoldeProduct[];
}

interface SoldesClientProps {
  initialSoldes: Solde[];
  totalProductsOnSale: number;
}

export default function SoldesClient({
  initialSoldes,
  totalProductsOnSale,
}: SoldesClientProps) {
  const [soldes] = useState(initialSoldes);
  const [expandedSale, setExpandedSale] = useState<number | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortBy, setSortBy] = useState("ending-soon");

  // Sort soldes
  const sortedSoldes = [...soldes].sort((a, b) => {
    if (sortBy === "ending-soon") {
      return new Date(a.end_date).getTime() - new Date(b.end_date).getTime();
    }
    if (sortBy === "biggest-discount") {
      const discountA = a.discount_percent || 0;
      const discountB = b.discount_percent || 0;
      return discountB - discountA;
    }
    if (sortBy === "most-products") {
      return (b.products?.length || 0) - (a.products?.length || 0);
    }
    return 0;
  });

  const toggleSale = (saleId: number) => {
    setExpandedSale(expandedSale === saleId ? null : saleId);
  };

  // Transform function to convert SoldeProduct to Product
  const transformToProduct = (product: SoldeProduct): Product => ({
    id: product.id,
    name: product.name,
    description: product.description,
    buy_price: product.buy_price,
    sell_price: product.sell_price,
    image_url: product.image_url,
    category: product.category,
    stock: product.stock,
    created_at: product.created_at ? new Date(product.created_at) : new Date(),
    updated_at: product.updated_at ? new Date(product.updated_at) : new Date(),
  });

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
              <Tag className="w-6 h-6 text-[#c4a962]" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#c4a962] font-medium">
                Special Offers
              </span>
              <h1 className="text-2xl font-light text-white">
                Active
                <span className="font-bold text-[#c4a962] ml-2">Sales</span>
              </h1>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-[#1a1a1a] rounded-2xl flex items-center justify-center border border-[#c4a962]/30">
                <Tag className="w-8 h-8 text-[#c4a962]" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#c4a962] rounded-full animate-pulse"></div>
            </div>
            <div>
              <span className="text-sm uppercase tracking-[0.3em] text-[#c4a962] font-medium">
                Special Offers
              </span>
              <h1 className="text-5xl font-light text-white mt-2">
                Active
                <span className="font-bold text-[#c4a962] ml-3">Sales</span>
              </h1>
            </div>
          </div>

          <p className="text-sm md:text-lg text-gray-400 max-w-2xl md:ml-20">
            Discover our current promotions and exclusive discounts.
            Limited-time offers on our finest selections.
          </p>
        </div>

        {/* Mobile Stats Row - Horizontal Scroll */}
        {soldes.length > 0 && (
          <div className="md:hidden flex gap-2 overflow-x-auto pb-4 -mx-3 px-3 scrollbar-hide mb-4">
            <div className="flex-shrink-0 bg-[#1a1a1a] border border-[#404040] rounded-xl p-3 min-w-[120px]">
              <p className="text-xs text-gray-400">Active Sales</p>
              <p className="text-lg font-bold text-white">{soldes.length}</p>
            </div>
            <div className="flex-shrink-0 bg-[#1a1a1a] border border-[#404040] rounded-xl p-3 min-w-[120px]">
              <p className="text-xs text-gray-400">Products on Sale</p>
              <p className="text-lg font-bold text-[#c4a962]">
                {totalProductsOnSale}
              </p>
            </div>
            <div className="flex-shrink-0 bg-[#1a1a1a] border border-[#404040] rounded-xl p-3 min-w-[120px]">
              <p className="text-xs text-gray-400">Today's Date</p>
              <p className="text-sm font-bold text-gray-300">
                {new Date().toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        )}

        {/* Desktop Stats Bar */}
        {soldes.length > 0 && (
          <div className="hidden md:flex bg-[#1a1a1a] border border-[#404040] rounded-xl p-4 mb-8 flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-[#c4a962]" />
                <span className="text-gray-300">
                  <span className="text-white font-bold">{soldes.length}</span>{" "}
                  active sales
                </span>
              </div>
              <div className="w-px h-6 bg-[#404040]"></div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#c4a962]" />
                <span className="text-gray-300">
                  <span className="text-white font-bold">
                    {totalProductsOnSale}
                  </span>{" "}
                  products on sale
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#2d2d2d] text-gray-300 border border-[#404040] rounded-lg px-4 py-2 focus:outline-none focus:border-[#c4a962] transition-colors"
              >
                <option value="ending-soon">Ending Soon</option>
                <option value="biggest-discount">Biggest Discount</option>
                <option value="most-products">Most Products</option>
              </select>
            </div>
          </div>
        )}

        {soldes.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-8 md:py-16">
            {/* Empty state illustration */}
            <div className="relative mb-6 md:mb-8">
              <div className="w-20 h-20 md:w-32 md:h-32 mx-auto bg-[#1a1a1a] rounded-full flex items-center justify-center border-2 border-[#404040]">
                <Tag className="w-10 h-10 md:w-16 md:h-16 text-[#404040]" />
              </div>

              {/* Decorative rings */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 border-2 border-[#c4a962]/10 rounded-full scale-150 animate-pulse"></div>
                <div className="absolute inset-0 border-2 border-[#c4a962]/5 rounded-full scale-125"></div>
              </div>
            </div>

            <h2 className="text-xl md:text-3xl font-light text-white mb-2 md:mb-3">
              No
              <span className="font-bold text-[#c4a962] ml-2">
                active sales
              </span>{" "}
              at the moment
            </h2>

            <p className="text-sm md:text-base text-gray-400 mb-6 md:mb-8 max-w-md mx-auto">
              New promotions are coming soon. Check back later for exclusive
              discounts and special offers.
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
          <div className="space-y-4 md:space-y-6">
            {/* Mobile Sort Button */}
            <div className="md:hidden flex justify-end mb-2">
              <button
                onClick={() => setShowMobileFilters(true)}
                className="flex items-center gap-2 bg-[#2d2d2d] px-4 py-2 rounded-lg border border-[#404040]"
              >
                <Filter className="w-4 h-4 text-[#c4a962]" />
                <span className="text-sm text-gray-300">Sort Sales</span>
              </button>
            </div>

            {/* Mobile Sort Modal */}
            {showMobileFilters && (
              <div className="fixed inset-0 bg-black/50 z-50 md:hidden">
                <div className="absolute bottom-0 left-0 right-0 bg-[#1a1a1a] rounded-t-2xl p-4 animate-slide-up">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-white">
                      Sort Sales
                    </h3>
                    <button onClick={() => setShowMobileFilters(false)}>
                      <span className="text-gray-400">✕</span>
                    </button>
                  </div>
                  <div className="space-y-2">
                    {[
                      { value: "ending-soon", label: "Ending Soon" },
                      { value: "biggest-discount", label: "Biggest Discount" },
                      { value: "most-products", label: "Most Products" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setShowMobileFilters(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg ${
                          sortBy === option.value
                            ? "bg-[#c4a962] text-[#0b0b0b]"
                            : "bg-[#2d2d2d] text-gray-300"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {sortedSoldes.map((solde, index) => {
              const isExpanded = expandedSale === solde.id;
              const hasPercentage = solde.discount_percent !== null;
              const hasFixed = solde.discount_fixed !== null;
              const endDate = new Date(solde.end_date);
              const now = new Date();
              const daysRemaining = Math.ceil(
                (endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
              );
              const hoursRemaining = Math.ceil(
                (endDate.getTime() - now.getTime()) / (1000 * 60 * 60),
              );

              return (
                <div
                  key={solde.id}
                  className="bg-[#1a1a1a] rounded-xl md:rounded-2xl overflow-hidden border border-[#404040] hover:border-[#c4a962]/30 transition-all duration-500 animate-fadeIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Sale Header - Clickable */}
                  <div
                    className="relative bg-gradient-to-r from-[#2d2d2d] to-[#1a1a1a] p-4 md:p-6 cursor-pointer hover:bg-[#2d2d2d] transition-colors"
                    onClick={() => toggleSale(solde.id)}
                  >
                    {/* Mobile: Compact Header */}
                    <div className="md:hidden">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-[#c4a962]/10 rounded-full flex items-center justify-center">
                            <Percent className="w-4 h-4 text-[#c4a962]" />
                          </div>
                          <span className="text-xs uppercase tracking-wider text-[#c4a962] font-medium">
                            Limited Time
                          </span>
                        </div>
                        <div className="bg-[#2d2d2d] rounded-full px-3 py-1 border border-[#404040]">
                          <span className="text-xs text-gray-300">
                            {daysRemaining > 0
                              ? `${daysRemaining}d left`
                              : `${hoursRemaining}h left`}
                          </span>
                        </div>
                      </div>

                      <h2 className="text-lg font-medium text-white mb-2">
                        {solde.name}
                      </h2>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {hasPercentage ? (
                            <>
                              <Percent className="w-4 h-4 text-[#c4a962]" />
                              <span className="text-white font-bold text-sm">
                                {solde.discount_percent}% OFF
                              </span>
                            </>
                          ) : hasFixed ? (
                            <>
                              <Coins className="w-4 h-4 text-[#c4a962]" />
                              <span className="text-white font-bold text-sm">
                                {formatPrice(solde.discount_fixed || 0)} OFF
                              </span>
                            </>
                          ) : null}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">
                            {solde.products?.length || 0} products
                          </span>
                          <ArrowRight
                            className={`w-4 h-4 text-[#c4a962] transition-transform ${isExpanded ? "rotate-90" : ""}`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Desktop: Full Header */}
                    <div className="hidden md:block">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-[#c4a962]/10 rounded-full flex items-center justify-center">
                              <Percent className="w-5 h-5 text-[#c4a962]" />
                            </div>
                            <span className="text-sm uppercase tracking-wider text-[#c4a962] font-medium">
                              Limited Time Offer
                            </span>
                          </div>

                          <h2 className="text-2xl font-light text-white mb-2">
                            {solde.name}
                          </h2>

                          {solde.description && (
                            <p className="text-gray-400 text-sm mb-4 max-w-2xl">
                              {solde.description}
                            </p>
                          )}

                          <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-[#2d2d2d] rounded-full px-4 py-2 border border-[#404040]">
                              {hasPercentage ? (
                                <>
                                  <Percent className="w-4 h-4 text-[#c4a962]" />
                                  <span className="text-white font-bold">
                                    {solde.discount_percent}% OFF
                                  </span>
                                </>
                              ) : hasFixed ? (
                                <>
                                  <Coins className="w-4 h-4 text-[#c4a962]" />
                                  <span className="text-white font-bold">
                                    {formatPrice(solde.discount_fixed || 0)} OFF
                                  </span>
                                </>
                              ) : null}
                            </div>

                            <div className="flex items-center gap-2 bg-[#2d2d2d] rounded-full px-4 py-2 border border-[#404040]">
                              <Clock className="w-4 h-4 text-[#c4a962]" />
                              <span className="text-gray-300">
                                {daysRemaining}{" "}
                                {daysRemaining === 1 ? "day" : "days"} left
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="bg-[#2d2d2d] rounded-xl px-6 py-3 text-center border border-[#404040]">
                            <p className="text-2xl font-bold text-[#c4a962]">
                              {solde.products?.length || 0}
                            </p>
                            <p className="text-xs text-gray-500">Products</p>
                          </div>
                          <ArrowRight
                            className={`w-5 h-5 text-[#c4a962] transition-transform ${isExpanded ? "rotate-90" : ""}`}
                          />
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-4 max-w-md">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-500">Valid until</span>
                          <span className="text-[#c4a962]">
                            {endDate.toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="h-1.5 bg-[#2d2d2d] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#c4a962] rounded-full"
                            style={{
                              width: `${Math.min(100, (daysRemaining / 30) * 100)}%`,
                              opacity: 0.8,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Products */}
                  {isExpanded &&
                    solde.products &&
                    solde.products.length > 0 && (
                      <div className="p-3 md:p-6 pt-0 border-t border-[#404040]">
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 mt-4">
                          {solde.products.slice(0, 4).map((product) => (
                            <ProductCard
                              key={product.id}
                              product={transformToProduct(product)}
                            />
                          ))}
                        </div>

                        {solde.products.length > 4 && (
                          <div className="mt-4 text-center">
                            <Link
                              href={`/soldes/${solde.id}`}
                              className="inline-flex items-center gap-2 text-sm text-[#c4a962] hover:underline"
                            >
                              View all {solde.products.length} products
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                        )}
                      </div>
                    )}
                </div>
              );
            })}

            {/* Footer Note */}
            <div className="mt-8 md:mt-12 text-center">
              <div className="inline-flex items-center gap-2 md:gap-3 bg-[#1a1a1a] border border-[#404040] rounded-full px-4 md:px-6 py-2 md:py-3">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-[#c4a962" />
                <p className="text-xs md:text-sm text-gray-400">
                  All sales valid while supplies last
                </p>
              </div>
            </div>
          </div>
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
          0%,
          100% {
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
