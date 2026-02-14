// app/admin/products/new/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    buy_price: '',
    sell_price: '',
    category: '',
    stock: '',
    image_url: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          buy_price: parseFloat(formData.buy_price),
          sell_price: parseFloat(formData.sell_price),
          stock: parseInt(formData.stock)
        })
      });

      if (response.ok) {
        router.push('/admin/products');
      }
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Link href="/admin/products" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#c4a962] mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Products
      </Link>

      <h1 className="text-3xl font-light text-white mb-8">Add New Product</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl bg-[#1a1a1a] border border-[#404040] rounded-xl p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Product Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#2d2d2d] border border-[#404040] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#c4a962]"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full bg-[#2d2d2d] border border-[#404040] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#c4a962]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Buy Price ($) *</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.buy_price}
                onChange={(e) => setFormData({ ...formData, buy_price: e.target.value })}
                className="w-full bg-[#2d2d2d] border border-[#404040] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#c4a962]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Sell Price ($) *</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.sell_price}
                onChange={(e) => setFormData({ ...formData, sell_price: e.target.value })}
                className="w-full bg-[#2d2d2d] border border-[#404040] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#c4a962]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-[#2d2d2d] border border-[#404040] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#c4a962]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Stock *</label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full bg-[#2d2d2d] border border-[#404040] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#c4a962]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Image URL</label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full bg-[#2d2d2d] border border-[#404040] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#c4a962]"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-[#c4a962] text-[#0b0b0b] px-6 py-3 rounded-lg font-medium hover:bg-[#d4b97a] transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {loading ? 'Saving...' : 'Save Product'}
          </button>
          <Link
            href="/admin/products"
            className="px-6 py-3 bg-[#2d2d2d] text-gray-300 rounded-lg hover:bg-[#404040] transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}