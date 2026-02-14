// app/admin/categories/page.tsx
import { sql } from '../../lib/db';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default async function CategoriesPage() {
  const categories = await sql`
    SELECT 
      category,
      COUNT(*) as product_count,
      MIN(sell_price) as min_price,
      MAX(sell_price) as max_price
    FROM products 
    WHERE category IS NOT NULL AND category != ''
    GROUP BY category 
    ORDER BY category ASC
  `;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-light text-white mb-2">Categories</h1>
          <p className="text-gray-400">Manage product categories</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat: any) => (
          <div key={cat.category} className="bg-[#1a1a1a] border border-[#404040] rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-medium text-white">{cat.category}</h2>
              <span className="px-3 py-1 bg-[#2d2d2d] rounded-full text-sm text-[#c4a962]">
                {cat.product_count} products
              </span>
            </div>
            
            <p className="text-sm text-gray-400 mb-4">
              Price range: ${cat.min_price} - ${cat.max_price}
            </p>

            <div className="flex gap-2">
              <Link
                href={`/categories/${encodeURIComponent(cat.category)}`}
                className="flex-1 text-center px-4 py-2 bg-[#2d2d2d] text-gray-300 rounded-lg hover:bg-[#404040] transition-colors"
              >
                View Products
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}