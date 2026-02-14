// app/liked/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '../components/productCard';
import { useLikes } from '../context/LikesContext';
import { Product } from '../types';
import Header from '../components/Header';
import { Heart, ArrowLeft, ShoppingBag } from 'lucide-react';

export default function LikedPage() {
  const { likedIds, isLoading: likesLoading } = useLikes();
  const [likedProducts, setLikedProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (likesLoading || productsLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#0b0b0b] pt-24">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="text-center">
                <div className="relative">
                  {/* Spinner with gold accent */}
                  <div className="w-16 h-16 border-4 border-[#404040] border-t-[#c4a962] rounded-full animate-spin mx-auto"></div>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-[#c4a962] rounded-full filter blur-xl opacity-20 animate-pulse"></div>
                </div>
                <p className="mt-6 text-gray-400">Loading your collection...</p>
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
      <div className="min-h-screen bg-[#0b0b0b] pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back to home link */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#c4a962] transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Heart className="w-6 h-6 text-[#c4a962]" />
                <span className="text-sm uppercase tracking-[0.2em] text-[#c4a962]">Your Selection</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-light text-white">
                Liked<span className="font-bold text-[#c4a962] ml-2">Items</span>
              </h1>
            </div>
            
            {likedProducts.length > 0 && (
              <div className="bg-[#1a1a1a] border border-[#404040] rounded-full px-6 py-3">
                <span className="text-[#c4a962] font-medium">{likedProducts.length}</span>
                <span className="text-gray-400 ml-2">items</span>
              </div>
            )}
          </div>

          {error && (
            <div className="bg-[#1a1a1a] border border-red-500/20 text-red-400 px-6 py-4 rounded-xl mb-8">
              {error}
            </div>
          )}

          {likedProducts.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center py-16">
              {/* Empty state illustration */}
              <div className="relative mb-8">
                <div className="w-32 h-32 mx-auto bg-[#1a1a1a] rounded-full flex items-center justify-center border-2 border-[#404040]">
                  <Heart className="w-16 h-16 text-[#404040]" />
                </div>
                
                {/* Decorative rings */}
                <div className="absolute inset-0 -z-10">
                  <div className="absolute inset-0 border-2 border-[#c4a962]/10 rounded-full scale-150 animate-pulse"></div>
                  <div className="absolute inset-0 border-2 border-[#c4a962]/5 rounded-full scale-125"></div>
                </div>
              </div>
              
              <h2 className="text-3xl font-light text-white mb-3">
                Your<span className="font-bold text-[#c4a962] ml-2">wishlist</span> is empty
              </h2>
              
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Discover our collection and click the heart icon on items you love. They'll appear here, waiting for you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/" 
                  className="group bg-[#c4a962] text-[#0b0b0b] px-8 py-4 rounded-full font-medium hover:bg-[#d4b97a] transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-gold"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Browse Products
                </Link>
                
                <Link 
                  href="/collections" 
                  className="group bg-[#1a1a1a] text-white px-8 py-4 rounded-full font-medium hover:bg-[#2d2d2d] transition-all duration-300 inline-flex items-center justify-center gap-2 border border-[#404040] hover:border-[#c4a962]/30"
                >
                  View Collections
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Results summary */}
              <div className="flex items-center justify-between mb-8 p-4 bg-[#1a1a1a] rounded-xl border border-[#404040]">
                <p className="text-gray-400">
                  Showing <span className="text-white font-medium">{likedProducts.length}</span> items you love
                </p>
                
                {/* Sort dropdown (optional) */}
                <select className="bg-[#2d2d2d] text-gray-300 border border-[#404040] rounded-lg px-4 py-2 focus:outline-none focus:border-[#c4a962] transition-colors">
                  <option>Sort by: Latest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
              
              {/* Products grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {likedProducts.map((product) => (
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
    </>
  );
}