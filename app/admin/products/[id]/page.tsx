// app/admin/products/[id]/page.tsx
import { sql } from '../../../lib/db';
import { notFound } from 'next/navigation';
import ProductEditForm from './ProductEditForm';
import { Product } from '../../../types';

interface EditProductPageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id);

  if (isNaN(productId)) {
    notFound();
  }

  const product = await sql`
    SELECT * FROM products WHERE id = ${productId}
  `;

  if (!product.length) {
    notFound();
  }

  // Serialize the product data with all fields
  const rawProduct = product[0];
  const serializedProduct: Product = {
    id: rawProduct.id,
    name: rawProduct.name,
    description: rawProduct.description,
    buy_price: parseFloat(rawProduct.buy_price),
    sell_price: parseFloat(rawProduct.sell_price),
    category: rawProduct.category,
    stock: parseInt(rawProduct.stock),
    image_url: rawProduct.image_url,
    created_at: rawProduct.created_at,
    updated_at: rawProduct.updated_at
  };

  return <ProductEditForm product={serializedProduct} />;
}