// app/api/soldes/active/route.ts
import { NextResponse } from 'next/server';
import { sql } from '../../../lib/db';

export async function GET() {
  try {
    const soldes = await sql`
      SELECT s.*, 
        (SELECT json_agg(p.*) 
         FROM products p 
         JOIN soldes_products sp ON p.id = sp.product_id 
         WHERE sp.solde_id = s.id) as products
      FROM soldes s
      WHERE s.is_active = true 
        AND NOW() BETWEEN s.start_date AND s.end_date
      ORDER BY s.created_at DESC
    `;
    
    // Serialize the data
    const serializedSoldes = soldes.map((solde: any) => ({
      ...solde,
      id: solde.id,
      discount_percent: solde.discount_percent ? parseFloat(solde.discount_percent) : null,
      discount_fixed: solde.discount_fixed ? parseFloat(solde.discount_fixed) : null,
      start_date: solde.start_date?.toISOString(),
      end_date: solde.end_date?.toISOString(),
      created_at: solde.created_at?.toISOString(),
      products: solde.products ? JSON.parse(solde.products) : []
    }));
    
    return NextResponse.json(serializedSoldes);
  } catch (error) {
    console.error('Error fetching active soldes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch active soldes' },
      { status: 500 }
    );
  }
}