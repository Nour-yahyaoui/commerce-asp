// app/api/collections/[id]/route.ts
import { NextResponse } from 'next/server';
import { sql } from '../../../lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Resolve the params Promise
    const resolvedParams = await params;
    const collectionId = parseInt(resolvedParams.id);
    
    // Validate the ID
    if (isNaN(collectionId) || collectionId <= 0) {
      return NextResponse.json(
        { error: 'Invalid collection ID' },
        { status: 400 }
      );
    }
    
    // Get collection details
    const collection = await sql`
      SELECT * FROM collections 
      WHERE id = ${collectionId}
    `;
    
    if (!collection.length) {
      return NextResponse.json(
        { error: 'Collection not found' },
        { status: 404 }
      );
    }
    
    // Get products in this collection
    const products = await sql`
      SELECT p.* FROM products p
      JOIN collection_products cp ON p.id = cp.product_id
      WHERE cp.collection_id = ${collectionId}
    `;
    
    return NextResponse.json({
      ...collection[0],
      products
    });
  } catch (error) {
    console.error('Error fetching collection:', error);
    return NextResponse.json(
      { error: 'Failed to fetch collection' },
      { status: 500 }
    );
  }
}

// Add DELETE method if needed
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const collectionId = parseInt(resolvedParams.id);
    
    if (isNaN(collectionId) || collectionId <= 0) {
      return NextResponse.json(
        { error: 'Invalid collection ID' },
        { status: 400 }
      );
    }

    // Check if collection exists
    const existing = await sql`SELECT id FROM collections WHERE id = ${collectionId}`;
    if (!existing.length) {
      return NextResponse.json(
        { error: 'Collection not found' },
        { status: 404 }
      );
    }

    // Delete the collection (junction table will auto-delete due to CASCADE)
    await sql`DELETE FROM collections WHERE id = ${collectionId}`;

    return NextResponse.json({ 
      success: true,
      message: 'Collection deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting collection:', error);
    return NextResponse.json(
      { error: 'Failed to delete collection' },
      { status: 500 }
    );
  }
}

// Add PUT method for updates
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const collectionId = parseInt(resolvedParams.id);
    
    if (isNaN(collectionId) || collectionId <= 0) {
      return NextResponse.json(
        { error: 'Invalid collection ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, description, image_url } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Collection name is required' },
        { status: 400 }
      );
    }

    // Check if collection exists
    const existing = await sql`SELECT id FROM collections WHERE id = ${collectionId}`;
    if (!existing.length) {
      return NextResponse.json(
        { error: 'Collection not found' },
        { status: 404 }
      );
    }

    await sql`
      UPDATE collections 
      SET 
        name = ${name},
        description = ${description || null},
        image_url = ${image_url || null}
      WHERE id = ${collectionId}
    `;

    return NextResponse.json({ 
      success: true,
      message: 'Collection updated successfully' 
    });
  } catch (error) {
    console.error('Error updating collection:', error);
    return NextResponse.json(
      { error: 'Failed to update collection' },
      { status: 500 }
    );
  }
}