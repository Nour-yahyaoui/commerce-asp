// app/page.tsx
import { sql } from './lib/db';
import ProductCard from './components/productCard';
import Link from 'next/link';
import { cache } from 'react';
import { ArrowRight, Sparkles, Clock, Tag, Crown, Gem, Heart, Github, Linkedin, Mail } from 'lucide-react';
import Header from './components/Header';

const getProductsWithPrices = cache(async () => {
  const products = await sql`
    WITH active_offers AS (
      SELECT 
        wo.product_id,
        wo.offer_price,
        wo.offer_description
      FROM weekly_offers wo
      WHERE wo.is_active = true 
        AND NOW() BETWEEN wo.start_date AND wo.end_date
    ),
    active_soldes AS (
      SELECT 
        sp.product_id,
        s.discount_percent,
        s.discount_fixed
      FROM soldes_products sp
      JOIN soldes s ON sp.solde_id = s.id
      WHERE s.is_active = true 
        AND NOW() BETWEEN s.start_date AND s.end_date
    )
    SELECT 
      p.*,
      COALESCE(wo.offer_price, 
        CASE 
          WHEN s.discount_percent IS NOT NULL THEN p.sell_price * (1 - s.discount_percent/100)
          WHEN s.discount_fixed IS NOT NULL THEN p.sell_price - s.discount_fixed
          ELSE p.sell_price
        END
      ) as final_price,
      wo.offer_description,
      CASE 
        WHEN wo.product_id IS NOT NULL THEN 'weekly'
        WHEN s.product_id IS NOT NULL THEN 'solde'
        ELSE 'regular'
      END as discount_type,
      s.discount_percent,
      s.discount_fixed
    FROM products p
    LEFT JOIN active_offers wo ON p.id = wo.product_id
    LEFT JOIN active_soldes s ON p.id = s.product_id
    ORDER BY p.created_at DESC
    LIMIT 8
  `;
  
  return products;
});

const getActivePromotions = cache(async () => {
  const [activeSoldes, activeOffers] = await Promise.all([
    sql`SELECT COUNT(*) as count FROM soldes WHERE is_active = true AND NOW() BETWEEN start_date AND end_date`,
    sql`SELECT COUNT(*) as count FROM weekly_offers WHERE is_active = true AND NOW() BETWEEN start_date AND end_date`
  ]);
  
  return {
    soldesCount: activeSoldes[0]?.count || 0,
    offersCount: activeOffers[0]?.count || 0
  };
});

export default async function HomePage() {
  const [products, { soldesCount, offersCount }] = await Promise.all([
    getProductsWithPrices(),
    getActivePromotions()
  ]);

  const hasPromotions = soldesCount > 0 || offersCount > 0;

  return (
    <>
    <Header />
    <div className="min-h-screen bg-[#0b0b0b]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0b0b0b] via-[#1a1a1a] to-[#0b0b0b] py-24 lg:py-32">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#c4a962] rounded-full mix-blend-overlay filter blur-3xl opacity-5 animate-float"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#c4a962] rounded-full mix-blend-overlay filter blur-3xl opacity-5 animate-float animation-delay-2000"></div>
        
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#1a1a1a] border border-[#c4a962]/20 px-4 py-2 rounded-full mb-8 shadow-lg">
              <Crown className="w-4 h-4 text-[#c4a962]" />
              <span className="text-sm text-[#c4a962]">Luxury Collection 2026</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 tracking-tight">
              Black
              <span className="block font-bold text-[#c4a962] text-shadow-gold"> Velvet</span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Experience unparalleled elegance with our curated selection of premium products. 
              Where darkness meets sophistication.
            </p>

            {hasPromotions && (
              <div className="flex flex-wrap gap-4 justify-center">
                {soldesCount > 0 && (
                  <Link 
                    href="/soldes"
                    className="group relative overflow-hidden bg-[#1a1a1a] hover:bg-[#2d2d2d] border border-[#c4a962]/30 hover:border-[#c4a962] px-8 py-4 rounded-full transition-all duration-500"
                  >
                    <span className="relative flex items-center gap-3 text-white">
                      <Tag className="w-5 h-5 text-[#c4a962]" />
                      <span>Exclusive Sales ({soldesCount})</span>
                      <ArrowRight className="w-4 h-4 text-[#c4a962] group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                )}
                {offersCount > 0 && (
                  <Link 
                    href="/offers"
                    className="group relative overflow-hidden bg-[#c4a962] hover:bg-[#d4b97a] px-8 py-4 rounded-full transition-all duration-500"
                  >
                    <span className="relative flex items-center gap-3 text-[#0b0b0b] font-medium">
                      <Clock className="w-5 h-5" />
                      <span>Weekly Offers ({offersCount})</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0b0b0b] to-transparent"></div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-[#0b0b0b]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Gem className="w-5 h-5 text-[#c4a962]" />
                <span className="text-sm uppercase tracking-[0.2em] text-[#c4a962]">Curated Selection</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-white">
                Signature<span className="font-bold text-[#c4a962] ml-2">Pieces</span>
              </h2>
            </div>
            
            <Link 
              href="/collections"
              className="group hidden sm:flex items-center gap-2 text-gray-400 hover:text-[#c4a962] transition-colors border-b border-transparent hover:border-[#c4a962] pb-1"
            >
              View all
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product: any) => {
              const priceInfo = {
                originalPrice: product.sell_price,
                finalPrice: product.final_price,
                discountType: product.discount_type !== 'regular' ? product.discount_type : undefined,
                discountValue: product.discount_percent || product.discount_fixed,
                offerDescription: product.offer_description
              };
              
              return (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  priceInfo={priceInfo}
                />
              );
            })}
          </div>

          {/* Mobile view all link */}
          <div className="sm:hidden text-center mt-8">
            <Link 
              href="/collections"
              className="inline-flex items-center gap-2 text-[#c4a962] hover:underline"
            >
              View all products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>


      {/* Demo App Attribution Section */}
      <section className="py-16 bg-gradient-to-b from-[#0b0b0b] to-[#1a1a1a] border-t border-[#404040]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Decorative element */}
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-[#c4a962] rounded-full blur-xl opacity-20"></div>
              <div className="relative w-20 h-20 bg-[#1a1a1a] rounded-full flex items-center justify-center border-2 border-[#c4a962]/30">
                <Heart className="w-8 h-8 text-[#c4a962]" />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
              Demo<span className="font-bold text-[#c4a962] ml-2">Application</span>
            </h2>
            
            <p className="text-gray-400 text-lg mb-6">
              This is a demonstration e-commerce app created to showcase full-stack development skills 
              with Next.js, TypeScript, and NeonDB.
            </p>

            <div className="bg-[#1a1a1a] border border-[#404040] rounded-2xl p-8 mb-8">
              <div className="flex flex-col items-center gap-6">
                {/* Creator Info */}
                <div className="text-center">
                  <p className="text-sm uppercase tracking-wider text-[#c4a962] mb-2">Created by</p>
                  <h3 className="text-3xl font-bold text-white mb-3">Nour Yahyaoui</h3>
                  <p className="text-gray-400">Full Stack Developer</p>
                </div>

                {/* Contact Info */}
                <div className="w-full max-w-md space-y-3">
                  <a 
                    href="https://github.com/nouryahyaoui" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full bg-[#2d2d2d] hover:bg-[#404040] px-5 py-3 rounded-xl transition-colors group"
                  >
                    <span className="flex items-center gap-3">
                      <Github className="w-5 h-5 text-[#c4a962]" />
                      <span className="text-gray-300">github.com/nouryahyaoui</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[#c4a962] group-hover:translate-x-1 transition-all" />
                  </a>

                  <a 
                    href="https://wa.me/25739896" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full bg-[#2d2d2d] hover:bg-[#404040] px-5 py-3 rounded-xl transition-colors group"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-[#c4a962] text-xl">📱</span>
                      <span className="text-gray-300">+216 25 739 896</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[#c4a962] group-hover:translate-x-1 transition-all" />
                  </a>

                  <a 
                    href="mailto:nourryahyaoui@gmail.com"
                    className="flex items-center justify-between w-full bg-[#2d2d2d] hover:bg-[#404040] px-5 py-3 rounded-xl transition-colors group"
                  >
                    <span className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-[#c4a962]" />
                      <span className="text-gray-300">nourryahyaoui@gmail.com</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[#c4a962] group-hover:translate-x-1 transition-all" />
                  </a>
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-[#1a1a1a] border border-[#404040] rounded-full text-sm text-gray-400">
                Next.js 16
              </span>
              <span className="px-4 py-2 bg-[#1a1a1a] border border-[#404040] rounded-full text-sm text-gray-400">
                TypeScript
              </span>
              <span className="px-4 py-2 bg-[#1a1a1a] border border-[#404040] rounded-full text-sm text-gray-400">
                NeonDB
              </span>
              <span className="px-4 py-2 bg-[#1a1a1a] border border-[#404040] rounded-full text-sm text-gray-400">
                Tailwind CSS
              </span>
              <span className="px-4 py-2 bg-[#1a1a1a] border border-[#404040] rounded-full text-sm text-gray-400">
                PostgreSQL
              </span>
            </div>

            {/* Copyright */}
            <p className="text-sm text-gray-500 mt-8">
              © {new Date().getFullYear()} Nour Yahyaoui. All rights reserved. This is a demo project.
            </p>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}