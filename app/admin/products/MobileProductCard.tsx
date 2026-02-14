// app/admin/products/MobileProductCard.tsx
'use client';

import Link from 'next/link';
import { Edit, Eye, Trash2, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import DeleteProductButton from './DeleteProductButton';

interface MobileProductCardProps {
  product: any;
}

export default function MobileProductCard({ product }: MobileProductCardProps) {
  const [expanded, setExpanded] = useState(false);
  const profit = product.sell_price - product.buy_price;

  return (
    <div className="bg-[#1a1a1a] border border-[#404040] rounded-xl overflow-hidden">
      {/* Main Card Content */}
      <div className="p-3">
        <div className="flex items-center gap-3">
          <img 
            src={product.image_url || 'https://via.placeholder.com/50'} 
            alt={product.name}
            className="w-12 h-12 object-cover rounded-lg"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium text-sm truncate">{product.name}</h3>
            <p className="text-xs text-gray-400">{product.category || 'Uncategorized'}</p>
          </div>
          <button 
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 bg-[#2d2d2d] rounded-lg"
          >
            <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${expanded ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {/* Quick Info */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#404040]">
          <div>
            <p className="text-xs text-gray-400">Price</p>
            <p className="text-sm font-medium text-[#c4a962]">${product.sell_price}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Stock</p>
            <p className={`text-sm font-medium ${
              product.stock > 10 ? 'text-green-500' :
              product.stock > 0 ? 'text-yellow-500' : 'text-red-500'
            }`}>
              {product.stock}
            </p>
          </div>
        </div>

        {/* Expanded Details */}
        {expanded && (
          <div className="mt-3 pt-3 border-t border-[#404040] space-y-2">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-xs text-gray-400">Buy Price</p>
                <p className="text-white">${product.buy_price}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Profit</p>
                <p className={profit > 0 ? 'text-green-500' : 'text-red-500'}>
                  ${profit.toFixed(2)}
                </p>
              </div>
            </div>
            
            {product.description && (
              <div>
                <p className="text-xs text-gray-400 mb-1">Description</p>
                <p className="text-sm text-gray-300">{product.description}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 mt-3">
              <Link
                href={`/admin/products/${product.id}`}
                className="flex-1 flex items-center justify-center gap-1 bg-[#2d2d2d] py-2 rounded-lg text-[#c4a962] text-sm"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Link>
              <Link
                href={`/product/${product.id}`}
                target="_blank"
                className="flex-1 flex items-center justify-center gap-1 bg-[#2d2d2d] py-2 rounded-lg text-gray-400 text-sm"
              >
                <Eye className="w-4 h-4" />
                View
              </Link>
              <DeleteProductButton productId={product.id} productName={product.name} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}