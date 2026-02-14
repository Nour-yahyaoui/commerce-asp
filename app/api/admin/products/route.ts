// app/api/admin/products/route.ts
import { NextResponse } from 'next/server';
import { sql } from '../../../lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, buy_price, sell_price, category, stock, image_url } = body;

    const result = await sql`
      INSERT INTO products (name, description, buy_price, sell_price, category, stock, image_url)
      VALUES (${name}, ${description}, ${buy_price}, ${sell_price}, ${category}, ${stock}, ${image_url})
      RETURNING id
    `;

    return NextResponse.json({ success: true, id: result[0].id });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, description, buy_price, sell_price, category, stock, image_url } = body;

    await sql`
      UPDATE products 
      SET name = ${name}, 
          description = ${description}, 
          buy_price = ${buy_price}, 
          sell_price = ${sell_price}, 
          category = ${category}, 
          stock = ${stock}, 
          image_url = ${image_url},
          updated_at = NOW()
      WHERE id = ${id}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    await sql`DELETE FROM products WHERE id = ${id}`;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}