// app/api/products/[id]/route.ts
import { NextResponse } from 'next/server';
import { sql } from '../../../lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Resolve the params Promise
    const resolvedParams = await params;
    const productId = parseInt(resolvedParams.id);
    
    // Validate the ID
    if (isNaN(productId) || productId <= 0) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }
    
    const product = await sql`
      SELECT * FROM products 
      WHERE id = ${productId}
    `;
    
    if (!product.length) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(product[0]);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

// Add PUT method for updating a product
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const productId = parseInt(resolvedParams.id);
    
    if (isNaN(productId) || productId <= 0) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, description, buy_price, sell_price, category, stock, image_url } = body;

    // Validate required fields
    if (!name || !buy_price || !sell_price || stock === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if product exists
    const existing = await sql`SELECT id FROM products WHERE id = ${productId}`;
    if (!existing.length) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    await sql`
      UPDATE products 
      SET 
        name = ${name},
        description = ${description || null},
        buy_price = ${buy_price},
        sell_price = ${sell_price},
        category = ${category || null},
        stock = ${stock},
        image_url = ${image_url || null},
        updated_at = NOW()
      WHERE id = ${productId}
    `;

    return NextResponse.json({ 
      success: true,
      message: 'Product updated successfully' 
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// Add DELETE method for deleting a product
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const productId = parseInt(resolvedParams.id);
    
    if (isNaN(productId) || productId <= 0) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    // Check if product exists
    const existing = await sql`SELECT id FROM products WHERE id = ${productId}`;
    if (!existing.length) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Check if product has any orders
    const orders = await sql`SELECT id FROM orders WHERE product_id = ${productId} LIMIT 1`;
    if (orders.length) {
      return NextResponse.json(
        { error: 'Cannot delete product that has existing orders' },
        { status: 400 }
      );
    }

    // Delete the product
    await sql`DELETE FROM products WHERE id = ${productId}`;

    return NextResponse.json({ 
      success: true,
      message: 'Product deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}