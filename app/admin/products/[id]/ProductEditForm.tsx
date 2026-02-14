// app/admin/products/[id]/ProductEditForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Trash2, AlertTriangle } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string | null;
  buy_price: number;
  sell_price: number;
  category: string | null;
  stock: number;
  image_url: string | null;
}

interface ProductEditFormProps {
  product: Product;
}

export default function ProductEditForm({ product }: ProductEditFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    name: product.name || '',
    description: product.description || '',
    buy_price: product.buy_price.toString(),
    sell_price: product.sell_price.toString(),
    category: product.category || '',
    stock: product.stock.toString(),
    image_url: product.image_url || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: product.id,
          ...formData,
          buy_price: parseFloat(formData.buy_price),
          sell_price: parseFloat(formData.sell_price),
          stock: parseInt(formData.stock)
        })
      });

      if (response.ok) {
        router.push('/admin/products');
        router.refresh();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('An error occurred while updating the product');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleteLoading(true);

    try {
      const response = await fetch(`/api/admin/products?id=${product.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        router.push('/admin/products');
        router.refresh();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('An error occurred while deleting the product');
    } finally {
      setDeleteLoading(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <div>
      <Link href="/admin/products" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#c4a962] mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Products
      </Link>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-light text-white">Edit Product</h1>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="flex items-center gap-2 bg-red-500/10 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500/20 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Delete Product
        </button>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl bg-[#1a1a1a] border border-[#404040] rounded-xl p-6">
        <div className="space-y-4">
          {/* Product Image Preview */}
          {formData.image_url && (
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">Image Preview</label>
              <img 
                src={formData.image_url} 
                alt="Product preview"
                className="w-32 h-32 object-cover rounded-lg border border-[#404040]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/128';
                }}
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-400 mb-2">Product Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#2d2d2d] border border-[#404040] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#c4a962] transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full bg-[#2d2d2d] border border-[#404040] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#c4a962] transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Buy Price ($) *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={formData.buy_price}
                onChange={(e) => setFormData({ ...formData, buy_price: e.target.value })}
                className="w-full bg-[#2d2d2d] border border-[#404040] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#c4a962] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Sell Price ($) *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={formData.sell_price}
                onChange={(e) => setFormData({ ...formData, sell_price: e.target.value })}
                className="w-full bg-[#2d2d2d] border border-[#404040] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#c4a962] transition-colors"
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
                className="w-full bg-[#2d2d2d] border border-[#404040] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#c4a962] transition-colors"
                placeholder="e.g., Electronics"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Stock *</label>
              <input
                type="number"
                min="0"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full bg-[#2d2d2d] border border-[#404040] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#c4a962] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Image URL</label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full bg-[#2d2d2d] border border-[#404040] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#c4a962] transition-colors"
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
            {loading ? 'Saving...' : 'Update Product'}
          </button>
          <Link
            href="/admin/products"
            className="px-6 py-3 bg-[#2d2d2d] text-gray-300 rounded-lg hover:bg-[#404040] transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] border border-[#404040] rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 text-red-500 mb-4">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-xl font-medium">Delete Product</h3>
            </div>
            
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete <span className="text-white font-medium">"{product.name}"</span>? 
              This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {deleteLoading ? 'Deleting...' : 'Delete'}
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-[#2d2d2d] text-gray-300 px-4 py-2 rounded-lg hover:bg-[#404040] transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}