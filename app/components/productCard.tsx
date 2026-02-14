// components/ProductCard.tsx
'use client';

import Link from 'next/link';
import { Product } from '../types';
import { PriceInfo } from '../types';
import { formatPrice } from '../lib/pricing';
import { useLikes } from '../context/LikesContext';
import PriceDisplay from './PriceDisplay';
import { useState, useEffect } from 'react';
import { Heart, Eye, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  priceInfo?: PriceInfo;
}

export default function ProductCard({ product, priceInfo }: ProductCardProps) {
  const { isLiked, toggleLike, isLoading } = useLikes();
  const [liked, setLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setLiked(isLiked(product.id));
    }
  }, [isLiked, product.id, isLoading]);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newLikedState = toggleLike(product.id);
    setLiked(newLikedState);
  };

  const displayPrice = priceInfo || {
    originalPrice: product.sell_price,
    finalPrice: product.sell_price
  };

  return (
    <div 
      className="group relative bg-[#1a1a1a] rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-[#404040] hover:border-[#c4a962]/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-[#2d2d2d]">
        <img 
          src={product.image_url || 'https://via.placeholder.com/400'} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-transparent transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}></div>
        
        {/* Like Button */}
        <button
          onClick={handleLikeClick}
          className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-sm transition-all duration-300 z-10 ${
            liked 
              ? 'bg-[#c4a962] text-[#0b0b0b]' 
              : 'bg-[#2d2d2d] text-gray-400 hover:text-[#c4a962] hover:bg-[#404040]'
          }`}
          aria-label={liked ? 'Unlike' : 'Like'}
        >
          <Heart className={`w-4 h-4 transition-transform ${liked ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button */}
        <Link
          href={`/product/${product.id}`}
          className={`absolute bottom-4 left-4 right-4 bg-[#c4a962] text-[#0b0b0b] py-3 rounded-full font-medium text-center transition-all duration-500 transform ${
            isHovered 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-10 opacity-0'
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <Eye className="w-4 h-4" />
            Quick View
          </span>
        </Link>

        {/* Discount Badge */}
        {displayPrice.originalPrice !== displayPrice.finalPrice && (
          <div className="absolute top-4 left-4 bg-[#c4a962] text-[#0b0b0b] text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-lg">
            {priceInfo?.discountType === 'percentage' 
              ? `-${priceInfo.discountValue}%` 
              : 'SALE'}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-white font-medium mb-2 hover:text-[#c4a962] transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        <PriceDisplay priceInfo={displayPrice} />
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#404040]">
          <span className={`text-xs px-3 py-1.5 rounded-full ${
            product.stock > 0 
              ? 'bg-[#2d2d2d] text-[#c4a962] border border-[#c4a962]/30' 
              : 'bg-[#2d2d2d] text-gray-500'
          }`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>

          <Link 
            href={`/product/${product.id}`}
            className="text-sm text-gray-400 hover:text-[#c4a962] transition-colors flex items-center gap-1"
          >
            Details
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}