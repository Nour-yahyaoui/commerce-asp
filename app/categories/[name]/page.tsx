// app/categories/[name]/page.tsx
import { sql } from '../../lib/db';
import Header from '../../components/Header';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Package } from 'lucide-react';
import ProductCard from '../../components/productCard';

interface CategoryPageProps {
  params: Promise<{ name: string }> | { name: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const categoryName = decodeURIComponent(resolvedParams.name);

  // Fetch products in this category
  const products = await sql`
    SELECT * FROM products 
    WHERE category = ${categoryName}
    ORDER BY created_at DESC
  `;

  if (!products.length) {
    notFound();
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#0b0b0b] pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back button */}
          <Link 
            href="/categories" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#c4a962] transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Categories
          </Link>

          {/* Category Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-light text-white mb-3">
              {categoryName}
            </h1>
            <div className="flex items-center gap-2 text-gray-400">
              <Package className="w-4 h-4" />
              <span>{products.length} products available</span>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}