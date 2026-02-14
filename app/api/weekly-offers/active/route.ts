// app/api/weekly-offers/active/route.ts
import { NextResponse } from 'next/server';
import { sql } from '../../../lib/db';

export async function GET() {
  try {
    const offers = await sql`
      SELECT 
        wo.*,
        p.id as product_id,
        p.name,
        p.description,
        p.sell_price,
        p.image_url,
        p.category,
        p.stock
      FROM weekly_offers wo
      JOIN products p ON wo.product_id = p.id
      WHERE wo.is_active = true 
        AND NOW() BETWEEN wo.start_date AND wo.end_date
      ORDER BY wo.end_date ASC
    `;
    
    // Serialize the data to ensure proper types
    const serializedOffers = offers.map((offer: any) => ({
      ...offer,
      id: offer.id,
      product_id: offer.product_id,
      offer_price: parseFloat(offer.offer_price),
      sell_price: parseFloat(offer.sell_price),
      start_date: offer.start_date?.toISOString(),
      end_date: offer.end_date?.toISOString(),
      created_at: offer.created_at?.toISOString()
    }));
    
    return NextResponse.json(serializedOffers);
  } catch (error) {
    console.error('Error fetching active weekly offers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch active weekly offers' },
      { status: 500 }
    );
  }
}