// app/product/[id]/page.tsx
import { sql } from '../../lib/db';
import { getProductPriceInfo } from '../../lib/pricing';
import PriceDisplay from '../../components/PriceDisplay';
import BuyButton from '../../components/BuyButton';
import LikeButton from '../../components/LikeButton';
import Header from '../../components/Header';
import { notFound } from 'next/navigation';
import { Product } from '../../types';
import Link from 'next/link';
import { ArrowLeft, Package, Tag, Shield, Truck } from 'lucide-react';

interface ProductPageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Handle both resolved and unresolved params
  const resolvedParams = await params;
  
  // Validate that id exists and is a number
  if (!resolvedParams?.id) {
    console.error('Product ID is missing');
    notFound();
  }

  const productId = parseInt(resolvedParams.id);
  
  // Check if parsing resulted in a valid number
  if (isNaN(productId) || productId <= 0) {
    console.error('Invalid product ID:', resolvedParams.id);
    notFound();
  }
  
  try {
    // Fetch product and cast to Product type
    const productResult = await sql`
      SELECT * FROM products WHERE id = ${productId}
    `;
    
    if (!productResult || !productResult.length) {
      console.error('Product not found for ID:', productId);
      notFound();
    }
    
    // Cast the result to Product type
    const product = productResult[0] as Product;
    
    // Ensure product has required fields
    if (!product || !product.id) {
      console.error('Invalid product data:', product);
      notFound();
    }
    
    const priceInfo = await getProductPriceInfo(productId);

    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#0b0b0b] pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Back navigation */}
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-[#c4a962] transition-colors mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#1a1a1a] border border-[#404040] group">
                  <img 
                    src={product.image_url || 'https://via.placeholder.com/800'} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-transparent opacity-60"></div>
                  
                  {/* Discount badge */}
                  {priceInfo.originalPrice !== priceInfo.finalPrice && (
                    <div className="absolute top-6 left-6 bg-[#c4a962] text-[#0b0b0b] text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                      {priceInfo.discountType === 'percentage' 
                        ? `-${priceInfo.discountValue}% OFF` 
                        : 'SALE'}
                    </div>
                  )}
                  
                  {/* Like button */}
                  <div className="absolute top-6 right-6">
                    <LikeButton productId={product.id} />
                  </div>
                </div>
                
                {/* Thumbnail preview (placeholder) */}
                <div className="grid grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className="aspect-square rounded-xl bg-[#1a1a1a] border border-[#404040] hover:border-[#c4a962] transition-colors cursor-pointer"
                    >
                      <img 
                        src={product.image_url || 'https://via.placeholder.com/200'} 
                        alt={`${product.name} view ${i}`}
                        className="w-full h-full object-cover rounded-xl opacity-50 hover:opacity-100 transition-opacity"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm">
                  <Link href="/" className="text-gray-500 hover:text-[#c4a962] transition-colors">Home</Link>
                  <span className="text-gray-500">/</span>
                  <Link href="/collections" className="text-gray-500 hover:text-[#c4a962] transition-colors">Collections</Link>
                  <span className="text-gray-500">/</span>
                  <span className="text-[#c4a962]">{product.category}</span>
                </div>

                {/* Title */}
                <div>
                  <h1 className="text-4xl md:text-5xl font-light text-white mb-3">
                    {product.name}
                  </h1>
                  <p className="text-gray-400 text-lg">{product.description}</p>
                </div>

                {/* Price */}
                <div className="py-6 border-y border-[#404040]">
                  <div className="flex items-baseline gap-4 mb-2">
                    <PriceDisplay priceInfo={priceInfo} />
                    {priceInfo.originalPrice !== priceInfo.finalPrice && (
                      <span className="text-sm text-gray-500">
                        You save {formatPrice(priceInfo.originalPrice - priceInfo.finalPrice)}
                      </span>
                    )}
                  </div>
                  
                  {/* Tax info */}
                  <p className="text-xs text-gray-500">Inclusive of all taxes</p>
                </div>

                {/* Stock status */}
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    product.stock > 0 ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                  }`}></div>
                  <span className={product.stock > 0 ? 'text-green-500' : 'text-red-500'}>
                    {product.stock > 0 
                      ? `${product.stock} items in stock` 
                      : 'Out of stock'
                    }
                  </span>
                </div>

                {/* Category and tags */}
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#404040] rounded-full px-4 py-2">
                    <Tag className="w-4 h-4 text-[#c4a962]" />
                    <span className="text-sm text-gray-300">{product.category}</span>
                  </div>
                  {priceInfo.discountType === 'weekly' && priceInfo.offerDescription && (
                    <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#c4a962]/30 rounded-full px-4 py-2">
                      <span className="text-sm text-[#c4a962]">✨ {priceInfo.offerDescription}</span>
                    </div>
                  )}
                </div>

                {/* Buy button */}
                {product.stock > 0 ? (
                  <div className="pt-4">
                    <BuyButton 
                      product={product} 
                      priceInfo={priceInfo}
                    />
                  </div>
                ) : (
                  <button 
                    disabled
                    className="w-full bg-[#2d2d2d] text-gray-500 px-8 py-5 rounded-xl cursor-not-allowed border border-[#404040]"
                  >
                    Out of Stock
                  </button>
                )}

                {/* Features grid */}
                <div className="grid grid-cols-3 gap-4 pt-6">
                  <div className="text-center p-4 bg-[#1a1a1a] rounded-xl border border-[#404040]">
                    <Truck className="w-5 h-5 text-[#c4a962] mx-auto mb-2" />
                    <p className="text-xs text-gray-400">Free Shipping</p>
                  </div>
                  <div className="text-center p-4 bg-[#1a1a1a] rounded-xl border border-[#404040]">
                    <Shield className="w-5 h-5 text-[#c4a962] mx-auto mb-2" />
                    <p className="text-xs text-gray-400">2 Year Warranty</p>
                  </div>
                  <div className="text-center p-4 bg-[#1a1a1a] rounded-xl border border-[#404040]">
                    <Package className="w-5 h-5 text-[#c4a962] mx-auto mb-2" />
                    <p className="text-xs text-gray-400">Secure Packaging</p>
                  </div>
                </div>

                {/* Additional info */}
                <details className="group bg-[#1a1a1a] rounded-xl border border-[#404040]">
                  <summary className="flex items-center justify-between p-4 cursor-pointer">
                    <span className="text-white font-medium">Shipping Information</span>
                    <ArrowLeft className="w-4 h-4 text-[#c4a962] rotate-180 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-4 pb-4 text-gray-400 text-sm border-t border-[#404040] pt-4">
                    <p>• Free shipping on orders over $500</p>
                    <p>• Estimated delivery: 3-5 business days</p>
                    <p>• Express shipping available at checkout</p>
                    <p>• International shipping to select countries</p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#0b0b0b] pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-[#1a1a1a] border border-red-500/20 text-red-400 px-6 py-8 rounded-2xl mb-6">
                <div className="text-6xl mb-4">😕</div>
                <h2 className="text-2xl font-light text-white mb-2">Oops! Something went wrong</h2>
                <p className="text-gray-400 mb-6">We couldn't load this product. Please try again later.</p>
                <Link 
                  href="/" 
                  className="inline-flex items-center gap-2 bg-[#c4a962] text-[#0b0b0b] px-6 py-3 rounded-full hover:bg-[#d4b97a] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

// Helper function for formatting price (import if not available)
function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}