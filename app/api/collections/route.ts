// app/api/collections/route.ts
import { NextResponse } from 'next/server';
import { sql } from '../../lib/db';

export async function GET() {
  try {
    const collections = await sql`
      SELECT * FROM collections 
      ORDER BY created_at DESC
    `;
    
    return NextResponse.json(collections);
  } catch (error) {
    console.error('Error fetching collections:', error);
    return NextResponse.json(
      { error: 'Failed to fetch collections' },
      { status: 500 }
    );
  }
}