// app/soldes/page.tsx
import Link from 'next/link';
import { sql } from '../lib/db';
import { getProductPriceInfo, formatPrice } from '../lib/pricing';
import ProductCard from '../components/productCard';
import Header from '../components/Header';
import { Tag, Clock, ArrowRight, Sparkles, Gift, Percent, Coins } from 'lucide-react';

export default async function SoldesPage() {
  // Fetch all active soldes with their products
  const soldes = await sql`
    SELECT s.*, 
      (SELECT json_agg(p.*) 
       FROM products p 
       JOIN soldes_products sp ON p.id = sp.product_id 
       WHERE sp.solde_id = s.id) as products
    FROM soldes s
    WHERE s.is_active = true AND NOW() BETWEEN s.start_date AND s.end_date
    ORDER BY s.end_date ASC
  `;

  // Calculate total products on sale
  const totalProductsOnSale = soldes.reduce((acc: number, solde: any) => {
    return acc + (solde.products?.length || 0);
  }, 0);

  return (
    <>
      <Header />
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
                  <Tag className="w-8 h-8 text-[#c4a962]" />
                </div>
                {/* Decorative dot */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#c4a962] rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-sm uppercase tracking-[0.3em] text-[#c4a962] font-medium">
                  Special Offers
                </span>
                <h1 className="text-5xl md:text-6xl font-light text-white mt-2">
                  Active<span className="font-bold text-[#c4a962] ml-3">Sales</span>
                </h1>
              </div>
            </div>
            
            <p className="text-gray-400 text-lg max-w-2xl ml-20">
              Discover our current promotions and exclusive discounts. 
              Limited-time offers on our finest selections.
            </p>
          </div>

          {/* Stats Bar */}
          {soldes.length > 0 && (
            <div className="bg-[#1a1a1a] border border-[#404040] rounded-xl p-4 mb-10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-[#c4a962]" />
                  <span className="text-gray-300">
                    <span className="text-white font-bold">{soldes.length}</span> active sales
                  </span>
                </div>
                <div className="w-px h-6 bg-[#404040]"></div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#c4a962]" />
                  <span className="text-gray-300">
                    <span className="text-white font-bold">{totalProductsOnSale}</span> products on sale
                  </span>
                </div>
              </div>
              
              <div className="text-sm text-gray-500">
                {new Date().toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            </div>
          )}

          {soldes.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center py-16">
              {/* Empty state illustration */}
              <div className="relative mb-8">
                <div className="w-32 h-32 mx-auto bg-[#1a1a1a] rounded-full flex items-center justify-center border-2 border-[#404040]">
                  <Tag className="w-16 h-16 text-[#404040]" />
                </div>
                
                {/* Decorative rings */}
                <div className="absolute inset-0 -z-10">
                  <div className="absolute inset-0 border-2 border-[#c4a962]/10 rounded-full scale-150 animate-pulse"></div>
                  <div className="absolute inset-0 border-2 border-[#c4a962]/5 rounded-full scale-125"></div>
                </div>
              </div>
              
              <h2 className="text-3xl font-light text-white mb-3">
                No<span className="font-bold text-[#c4a962] ml-2">active sales</span> at the moment
              </h2>
              
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                New promotions are coming soon. Check back later for exclusive discounts and special offers.
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
            <div className="space-y-10">
              {soldes.map((solde: any, index: number) => {
                // Parse products from JSON if needed
                const products = typeof solde.products === 'string' 
                  ? JSON.parse(solde.products) 
                  : solde.products || [];
                
                // Calculate discount type and value
                const hasPercentage = solde.discount_percent !== null;
                const hasFixed = solde.discount_fixed !== null;
                
                // Calculate end date
                const endDate = new Date(solde.end_date);
                const now = new Date();
                const daysRemaining = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                
                return (
                  <div 
                    key={solde.id} 
                    className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#404040] hover:border-[#c4a962]/30 transition-all duration-500 animate-fadeIn"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Sale Header */}
                    <div className="relative bg-gradient-to-r from-[#2d2d2d] to-[#1a1a1a] p-8 border-b border-[#404040]">
                      {/* Background decoration */}
                      <div className="absolute top-0 right-0 w-64 h-64 bg-[#c4a962] rounded-full mix-blend-overlay filter blur-3xl opacity-5"></div>
                      
                      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-[#c4a962]/10 rounded-full flex items-center justify-center">
                              <Percent className="w-5 h-5 text-[#c4a962]" />
                            </div>
                            <span className="text-sm uppercase tracking-wider text-[#c4a962] font-medium">
                              Limited Time Offer
                            </span>
                          </div>
                          
                          <h2 className="text-3xl md:text-4xl font-light text-white mb-3">
                            {solde.name}
                          </h2>
                          
                          <p className="text-gray-400 text-lg mb-4 max-w-2xl">
                            {solde.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-[#2d2d2d] rounded-full px-4 py-2 border border-[#404040]">
                              {hasPercentage ? (
                                <>
                                  <Percent className="w-4 h-4 text-[#c4a962]" />
                                  <span className="text-white font-bold">{solde.discount_percent}% OFF</span>
                                </>
                              ) : hasFixed ? (
                                <>
                                  <Coins className="w-4 h-4 text-[#c4a962]" />
                                  <span className="text-white font-bold">{formatPrice(solde.discount_fixed)} OFF</span>
                                </>
                              ) : null}
                            </div>
                            
                            <div className="flex items-center gap-2 bg-[#2d2d2d] rounded-full px-4 py-2 border border-[#404040]">
                              <Clock className="w-4 h-4 text-[#c4a962]" />
                              <span className="text-gray-300">
                                {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} left
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Quick stats */}
                        <div className="flex gap-3">
                          <div className="bg-[#2d2d2d] rounded-xl px-6 py-4 text-center border border-[#404040]">
                            <p className="text-2xl font-bold text-[#c4a962]">{products.length}</p>
                            <p className="text-xs text-gray-500">Products</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="mt-6 max-w-md">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-500">Valid until</span>
                          <span className="text-[#c4a962]">
                            {endDate.toLocaleDateString('en-US', { 
                              month: 'long', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="h-1.5 bg-[#2d2d2d] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#c4a962] rounded-full"
                            style={{ 
                              width: `${Math.min(100, (daysRemaining / 30) * 100)}%`,
                              opacity: 0.8
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Products Grid */}
                    {products.length > 0 ? (
                      <div className="p-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                          {products.map(async (product: any) => {
                            const priceInfo = await getProductPriceInfo(product.id);
                            return (
                              <ProductCard 
                                key={product.id} 
                                product={product} 
                                priceInfo={priceInfo}
                              />
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-gray-500">No products in this sale</p>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Footer Note */}
              <div className="mt-12 text-center">
                <div className="inline-flex items-center gap-3 bg-[#1a1a1a] border border-[#404040] rounded-full px-6 py-3">
                  <Sparkles className="w-4 h-4 text-[#c4a962]" />
                  <p className="text-sm text-gray-400">
                    All sales are valid while supplies last or until the specified end date.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      
    </>
  );
}