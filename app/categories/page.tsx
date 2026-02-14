// app/categories/page.tsx
import { sql } from '../lib/db';
import Header from '../components/Header';
import CategoriesClient from './CategoriesClient';

export default async function CategoriesPage() {
  // Fetch all categories with product counts
  const categories = await sql`
    SELECT 
      category,
      COUNT(*) as product_count,
      MIN(image_url) as sample_image,
      MIN(sell_price) as min_price,
      MAX(sell_price) as max_price
    FROM products 
    WHERE category IS NOT NULL AND category != ''
    GROUP BY category 
    ORDER BY category ASC
  `;

  // Fetch products for each category (for the grid view)
  const productsByCategory = await Promise.all(
    categories.map(async (cat: any) => {
      const products = await sql`
        SELECT * FROM products 
        WHERE category = ${cat.category}
        ORDER BY created_at DESC
        LIMIT 4
      `;
      return {
        category: cat.category,
        products: products
      };
    })
  );

  // Serialize the data
  const serializedCategories = categories.map((cat: any) => ({
    ...cat,
    product_count: parseInt(cat.product_count),
    min_price: parseFloat(cat.min_price),
    max_price: parseFloat(cat.max_price)
  }));

  const serializedProductsByCategory = productsByCategory.map((item: any) => ({
    category: item.category,
    products: item.products.map((p: any) => ({
      ...p,
      buy_price: parseFloat(p.buy_price),
      sell_price: parseFloat(p.sell_price)
    }))
  }));

  return (
    <>
      <Header />
      <CategoriesClient 
        initialCategories={serializedCategories}
        initialProductsByCategory={serializedProductsByCategory}
      />
    </>
  );
}