// app/soldes/page.tsx
import { sql } from '../lib/db';
import { getProductPriceInfo } from '../lib/pricing';
import Header from '../components/Header';
import SoldesClient from './SoldesClient';

export default async function SoldesPage() {
  // Fetch all active soldes with their products
  const soldes = await sql`
    SELECT s.*, 
      (SELECT json_agg(p.*) 
       FROM products p 
       JOIN soldes_products sp ON p.id = sp.product_id 
       WHERE sp.solde_id = s.id) as products
    FROM soldes s
    WHERE s.is_active = true AND NOW() BETWEEN s.start_date AND s.end_date
    ORDER BY s.end_date ASC
  `;

  // Serialize the data for client component
  const serializedSoldes = soldes.map((solde: any) => {
    // Parse products if they're in JSON format
    const products = typeof solde.products === 'string' 
      ? JSON.parse(solde.products) 
      : solde.products || [];
    
    return {
      ...solde,
      id: solde.id,
      name: solde.name,
      description: solde.description,
      discount_percent: solde.discount_percent ? parseFloat(solde.discount_percent) : null,
      discount_fixed: solde.discount_fixed ? parseFloat(solde.discount_fixed) : null,
      start_date: solde.start_date?.toISOString(),
      end_date: solde.end_date?.toISOString(),
      created_at: solde.created_at?.toISOString(),
      products: products.map((p: any) => ({
        ...p,
        id: p.id,
        buy_price: parseFloat(p.buy_price),
        sell_price: parseFloat(p.sell_price),
        stock: parseInt(p.stock)
      }))
    };
  });

  // Calculate total products on sale
  const totalProductsOnSale = serializedSoldes.reduce((acc: number, solde: any) => {
    return acc + (solde.products?.length || 0);
  }, 0);

  return (
    <>
      <Header />
      <SoldesClient 
        initialSoldes={serializedSoldes}
        totalProductsOnSale={totalProductsOnSale}
      />
    </>
  );
}