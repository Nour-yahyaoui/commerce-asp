// components/PriceDisplay.tsx
'use client';

import { PriceInfo } from '../types';
import { formatPrice } from '../lib/pricing';
import { ArrowRight } from 'lucide-react';

interface PriceDisplayProps {
  priceInfo: PriceInfo;
  className?: string;
}

export default function PriceDisplay({ priceInfo, className = '' }: PriceDisplayProps) {
  const { originalPrice, finalPrice, discountType, discountValue, offerDescription } = priceInfo;
  const hasDiscount = originalPrice !== finalPrice;

  if (!hasDiscount) {
    return (
      <p className={`text-xl font-medium text-white `}>
        {formatPrice(finalPrice)}
      </p>
    );
  }

  return (
    <div className={`space-y-1 ${className}`}>
      {discountType === 'weekly' && offerDescription && (
        <p className="text-xs text-[#c4a962] font-medium flex items-center gap-1">
          <span className="w-1 h-1 bg-[#c4a962] rounded-full"></span>
          {offerDescription}
        </p>
      )}
      <div className="flex items-center gap-2 flex-wrap">
        <p className="text-xl font-bold text-[#c4a962]">
          {formatPrice(finalPrice)}
        </p>
        <p className="text-sm text-gray-500 line-through">
          {formatPrice(originalPrice)}
        </p>
      </div>
    </div>
  );
}