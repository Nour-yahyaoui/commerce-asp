// app/categories/CategoriesClient.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Grid3x3, 
  Search, 
  ArrowRight, 
  Sparkles, 
  Package, 
  ChevronDown,
  ChevronUp,
  LayoutList,
  Grid2X2
} from 'lucide-react';
import ProductCard from '../components/productCard';
import { Product } from '../types';

interface Category {
  category: string;
  product_count: number;
  sample_image: string | null;
  min_price: number;
  max_price: number;
}

interface CategoryProduct {
  id: number;
  name: string;
  description: string | null;
  sell_price: number;
  image_url: string | null;
  category: string;
  stock: number;
  // Add default values for missing fields
  buy_price?: number;
  created_at?: string;
  updated_at?: string;
}

interface CategoriesClientProps {
  initialCategories: Category[];
  initialProductsByCategory: {
    category: string;
    products: CategoryProduct[];
  }[];
}

export default function CategoriesClient({ 
  initialCategories, 
  initialProductsByCategory 
}: CategoriesClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');

  // Filter categories based on search
  const filteredCategories = initialCategories.filter(cat =>
    cat.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort categories
  const sortedCategories = [...filteredCategories].sort((a, b) => {
    if (sortBy === 'name') {
      return a.category.localeCompare(b.category);
    }
    if (sortBy === 'count') {
      return b.product_count - a.product_count;
    }
    return 0;
  });

  // Calculate total products
  const totalProducts = initialCategories.reduce((acc, cat) => acc + cat.product_count, 0);

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  // Transform category products to match Product type
  const transformToProduct = (catProduct: CategoryProduct): Product => ({
    id: catProduct.id,
    name: catProduct.name,
    description: catProduct.description,
    buy_price: catProduct.buy_price || 0, // Provide default if missing
    sell_price: catProduct.sell_price,
    image_url: catProduct.image_url,
    category: catProduct.category,
    stock: catProduct.stock,
    created_at: catProduct.created_at ? new Date(catProduct.created_at) : new Date(),
    updated_at: catProduct.updated_at ? new Date(catProduct.updated_at) : new Date()
  });

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
                <Grid3x3 className="w-8 h-8 text-[#c4a962]" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#c4a962] rounded-full animate-pulse"></div>
            </div>
            <div>
              <span className="text-sm uppercase tracking-[0.3em] text-[#c4a962] font-medium">
                Browse by
              </span>
              <h1 className="text-5xl md:text-6xl font-light text-white mt-2">
                Product<span className="font-bold text-[#c4a962] ml-3">Categories</span>
              </h1>
            </div>
          </div>
          
          <p className="text-gray-400 text-lg max-w-2xl ml-20">
            Explore our products organized by category. From electronics to fashion, 
            find exactly what you're looking for.
          </p>
        </div>

        {/* Stats and Search Bar */}
        <div className="bg-[#1a1a1a] border border-[#404040] rounded-xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search categories..."
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
                <option value="name">Category Name</option>
                <option value="count">Most Products</option>
              </select>
            </div>

            {/* View mode toggle */}
            <div className="flex items-center gap-1 bg-[#2d2d2d] rounded-lg border border-[#404040] p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid' ? 'bg-[#c4a962] text-[#0b0b0b]' : 'text-gray-400 hover:text-[#c4a962]'
                }`}
              >
                <Grid2X2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list' ? 'bg-[#c4a962] text-[#0b0b0b]' : 'text-gray-400 hover:text-[#c4a962]'
                }`}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-[#c4a962]" />
              <span className="text-gray-300">
                <span className="text-white font-bold">{initialCategories.length}</span> categories
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

        {/* Categories Grid/List */}
        {sortedCategories.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="relative mb-8">
              <div className="w-32 h-32 mx-auto bg-[#1a1a1a] rounded-full flex items-center justify-center border-2 border-[#404040]">
                <Grid3x3 className="w-16 h-16 text-[#404040]" />
              </div>
              
              <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 border-2 border-[#c4a962]/10 rounded-full scale-150 animate-pulse"></div>
                <div className="absolute inset-0 border-2 border-[#c4a962]/5 rounded-full scale-125"></div>
              </div>
            </div>
            
            <h2 className="text-3xl font-light text-white mb-3">
              No<span className="font-bold text-[#c4a962] ml-2">categories</span> found
            </h2>
            
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              {searchTerm ? `No categories matching "${searchTerm}"` : 'Categories are being organized.'}
            </p>
            
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="group bg-[#c4a962] text-[#0b0b0b] px-8 py-4 rounded-full font-medium hover:bg-[#d4b97a] transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-gold"
              >
                Clear Search
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {sortedCategories.map((category, index) => {
              const categoryProducts = initialProductsByCategory.find(
                item => item.category === category.category
              )?.products || [];

              const isExpanded = expandedCategory === category.category;

              return (
                <div 
                  key={category.category}
                  className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#404040] hover:border-[#c4a962]/30 transition-all duration-500 animate-fadeIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Category Header */}
                  <div 
                    className="p-6 cursor-pointer hover:bg-[#2d2d2d] transition-colors"
                    onClick={() => toggleCategory(category.category)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        {/* Category Image/Icon */}
                        <div className="w-16 h-16 bg-[#2d2d2d] rounded-xl overflow-hidden border border-[#404040]">
                          {category.sample_image ? (
                            <img 
                              src={category.sample_image} 
                              alt={category.category}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-2xl">
                              📦
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <h2 className="text-2xl font-medium text-white mb-1">
                            {category.category}
                          </h2>
                          
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-[#c4a962]">
                              {category.product_count} products
                            </span>
                            <span className="text-gray-500">
                              Price range: {formatPrice(category.min_price)} - {formatPrice(category.max_price)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <Link
                          href={`/categories/${encodeURIComponent(category.category)}`}
                          className="text-sm text-[#c4a962] hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View all
                        </Link>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-[#c4a962]" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-[#c4a962]" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Products */}
                  {isExpanded && categoryProducts.length > 0 && (
                    <div className="p-6 pt-0 border-t border-[#404040]">
                      {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                          {categoryProducts.map((product) => (
                            <ProductCard 
                              key={product.id} 
                              product={transformToProduct(product)} 
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-3 mt-6">
                          {categoryProducts.map((product) => (
                            <Link
                              key={product.id}
                              href={`/product/${product.id}`}
                              className="block bg-[#2d2d2d] rounded-lg p-4 hover:bg-[#404040] transition-colors"
                            >
                              <div className="flex items-center gap-4">
                                <img 
                                  src={product.image_url || 'https://via.placeholder.com/60'} 
                                  alt={product.name}
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                  <h3 className="text-white font-medium mb-1">{product.name}</h3>
                                  <p className="text-sm text-gray-400 line-clamp-1">{product.description}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-lg font-bold text-[#c4a962]">{formatPrice(product.sell_price)}</p>
                                  <p className="text-xs text-gray-500">Stock: {product.stock}</p>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                      
                      {categoryProducts.length === 4 && (
                        <div className="mt-4 text-center">
                          <Link
                            href={`/categories/${encodeURIComponent(category.category)}`}
                            className="inline-flex items-center gap-2 text-[#c4a962] hover:underline"
                          >
                            View all {category.product_count} products
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
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

// Helper function for price formatting
function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}