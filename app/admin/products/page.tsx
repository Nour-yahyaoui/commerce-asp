// app/admin/products/page.tsx
import { sql } from '../../lib/db';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, Search, Filter } from 'lucide-react';
import DeleteProductButton from './DeleteProductButton';
import MobileProductCard from './MobileProductCard';

export default async function ProductsPage() {
  const products = await sql`
    SELECT * FROM products 
    ORDER BY created_at DESC
  `;

  const totalValue = products.reduce((acc: number, p: any) => 
    acc + (p.buy_price * p.stock), 0
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-light text-white">Products</h1>
          <p className="text-sm text-gray-400 mt-1">Manage your inventory</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center justify-center gap-2 bg-[#c4a962] text-[#0b0b0b] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#d4b97a] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      {/* Quick Stats - Mobile Horizontal Scroll */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        <div className="flex-shrink-0 bg-[#1a1a1a] border border-[#404040] rounded-lg p-3 min-w-[120px]">
          <p className="text-xs text-gray-400">Total</p>
          <p className="text-lg font-bold text-white">{products.length}</p>
        </div>
        <div className="flex-shrink-0 bg-[#1a1a1a] border border-[#404040] rounded-lg p-3 min-w-[120px]">
          <p className="text-xs text-gray-400">Stock Value</p>
          <p className="text-lg font-bold text-[#c4a962]">${totalValue.toLocaleString()}</p>
        </div>
        <div className="flex-shrink-0 bg-[#1a1a1a] border border-[#404040] rounded-lg p-3 min-w-[120px]">
          <p className="text-xs text-gray-400">Low Stock</p>
          <p className="text-lg font-bold text-yellow-500">
            {products.filter((p: any) => p.stock < 10).length}
          </p>
        </div>
        <div className="flex-shrink-0 bg-[#1a1a1a] border border-[#404040] rounded-lg p-3 min-w-[120px]">
          <p className="text-xs text-gray-400">Categories</p>
          <p className="text-lg font-bold text-purple-500">
            {new Set(products.map((p: any) => p.category)).size}
          </p>
        </div>
      </div>

      {/* Search Bar - Mobile */}
      <div className="sm:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full bg-[#1a1a1a] border border-[#404040] rounded-lg pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-[#c4a962]"
          />
        </div>
      </div>

      {/* Mobile Product Cards */}
      <div className="sm:hidden space-y-3">
        {products.map((product: any) => (
          <MobileProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block bg-[#1a1a1a] border border-[#404040] rounded-xl overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-[#2d2d2d] border-b border-[#404040]">
            <tr>
              <th className="text-left p-3 text-gray-400 text-sm font-medium">ID</th>
              <th className="text-left p-3 text-gray-400 text-sm font-medium">Image</th>
              <th className="text-left p-3 text-gray-400 text-sm font-medium">Name</th>
              <th className="text-left p-3 text-gray-400 text-sm font-medium">Category</th>
              <th className="text-left p-3 text-gray-400 text-sm font-medium">Buy</th>
              <th className="text-left p-3 text-gray-400 text-sm font-medium">Sell</th>
              <th className="text-left p-3 text-gray-400 text-sm font-medium">Profit</th>
              <th className="text-left p-3 text-gray-400 text-sm font-medium">Stock</th>
              <th className="text-left p-3 text-gray-400 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: any) => {
              const profit = product.sell_price - product.buy_price;
              return (
                <tr key={product.id} className="border-b border-[#404040] hover:bg-[#2d2d2d]">
                  <td className="p-3 text-white text-sm">#{product.id}</td>
                  <td className="p-3">
                    <img 
                      src={product.image_url || 'https://via.placeholder.com/40'} 
                      alt={product.name}
                      className="w-8 h-8 object-cover rounded"
                    />
                  </td>
                  <td className="p-3">
                    <p className="text-white text-sm font-medium">{product.name}</p>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-[#2d2d2d] rounded-full text-xs text-gray-300">
                      {product.category || '-'}
                    </span>
                  </td>
                  <td className="p-3 text-gray-400 text-sm">${product.buy_price}</td>
                  <td className="p-3 text-[#c4a962] text-sm font-medium">${product.sell_price}</td>
                  <td className="p-3">
                    <span className={profit > 0 ? 'text-green-500 text-sm' : 'text-red-500 text-sm'}>
                      ${profit.toFixed(2)}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      product.stock > 10 ? 'bg-green-500/20 text-green-500' :
                      product.stock > 0 ? 'bg-yellow-500/20 text-yellow-500' :
                      'bg-red-500/20 text-red-500'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/products/${product.id}`} className="p-1.5 bg-[#2d2d2d] rounded hover:bg-[#404040]">
                        <Edit className="w-4 h-4 text-[#c4a962]" />
                      </Link>
                      <Link href={`/product/${product.id}`} target="_blank" className="p-1.5 bg-[#2d2d2d] rounded hover:bg-[#404040]">
                        <Eye className="w-4 h-4 text-gray-400" />
                      </Link>
                      <DeleteProductButton productId={product.id} productName={product.name} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}