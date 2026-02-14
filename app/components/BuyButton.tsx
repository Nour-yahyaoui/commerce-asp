// components/BuyButton.tsx
'use client';

import { useState } from 'react';
import { Product, PriceInfo } from '../types';
import { formatPrice } from '../lib/pricing';
import BuyFormModal from './BuyFormModal';

interface BuyButtonProps {
  product: Product;
  priceInfo: PriceInfo;
}

export default function BuyButton({ product, priceInfo }: BuyButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 w-full"
      >
        Buy Now - {formatPrice(priceInfo.finalPrice)}
      </button>

      {isModalOpen && (
        <BuyFormModal
          product={product}
          priceInfo={priceInfo}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}