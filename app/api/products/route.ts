// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { sql } from '../../lib/db';

export async function GET() {
  try {
    const products = await sql`
      SELECT * FROM products 
      ORDER BY created_at DESC
    `;
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}