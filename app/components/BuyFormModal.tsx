// components/BuyFormModal.tsx
'use client';

import { useState } from 'react';
import { Product, PriceInfo, BuyFormData } from '../types';
import { formatPrice } from '../lib/pricing';

interface BuyFormModalProps {
  product: Product;
  priceInfo: PriceInfo;
  onClose: () => void;
}

export default function BuyFormModal({ product, priceInfo, onClose }: BuyFormModalProps) {
  const [formData, setFormData] = useState<BuyFormData>({
    customer_name: '',
    customer_phone: '',
    customer_location: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: product.id,
          ...formData
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to place order');
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <div className="text-center">
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <h3 className="text-xl font-bold mb-2">Order Placed Successfully!</h3>
            <p className="text-gray-600 mb-4">Thank you for your purchase.</p>
            <button
              onClick={onClose}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Complete Your Purchase</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="mb-4 p-3 bg-gray-50 rounded">
          <p className="font-semibold">{product.name}</p>
          <p className="text-lg text-green-600">
            Total: {formatPrice(priceInfo.finalPrice)}
          </p>
          {priceInfo.discountType && (
            <p className="text-sm text-gray-500">
              Original price: {formatPrice(priceInfo.originalPrice)}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
              placeholder="John Doe"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              name="customer_phone"
              value={formData.customer_phone}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
              placeholder="+225 00 00 00 00"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Delivery Location *
            </label>
            <textarea
              name="customer_location"
              value={formData.customer_location}
              onChange={handleChange}
              required
              rows={3}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter your full address for delivery"
            />
          </div>

          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-green-300"
            >
              {isSubmitting ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}