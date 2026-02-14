// app/api/weekly-offers/[id]/route.ts
import { NextResponse } from 'next/server';
import { sql } from '../../../lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const offerId = parseInt(resolvedParams.id);
    
    if (isNaN(offerId) || offerId <= 0) {
      return NextResponse.json(
        { error: 'Invalid offer ID' },
        { status: 400 }
      );
    }

    const offer = await sql`
      SELECT wo.*, p.* 
      FROM weekly_offers wo
      JOIN products p ON wo.product_id = p.id
      WHERE wo.id = ${offerId}
    `;

    if (!offer.length) {
      return NextResponse.json(
        { error: 'Weekly offer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(offer[0]);
  } catch (error) {
    console.error('Error fetching weekly offer:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weekly offer' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const offerId = parseInt(resolvedParams.id);
    
    if (isNaN(offerId) || offerId <= 0) {
      return NextResponse.json(
        { error: 'Invalid offer ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { product_id, offer_description, offer_price, start_date, end_date, is_active } = body;

    if (!product_id || !offer_description || !offer_price || !start_date || !end_date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if offer exists
    const existing = await sql`SELECT id FROM weekly_offers WHERE id = ${offerId}`;
    if (!existing.length) {
      return NextResponse.json(
        { error: 'Weekly offer not found' },
        { status: 404 }
      );
    }

    await sql`
      UPDATE weekly_offers 
      SET 
        product_id = ${product_id},
        offer_description = ${offer_description},
        offer_price = ${offer_price},
        start_date = ${start_date},
        end_date = ${end_date},
        is_active = ${is_active !== undefined ? is_active : true}
      WHERE id = ${offerId}
    `;

    return NextResponse.json({ 
      success: true,
      message: 'Weekly offer updated successfully' 
    });
  } catch (error) {
    console.error('Error updating weekly offer:', error);
    return NextResponse.json(
      { error: 'Failed to update weekly offer' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const offerId = parseInt(resolvedParams.id);
    
    if (isNaN(offerId) || offerId <= 0) {
      return NextResponse.json(
        { error: 'Invalid offer ID' },
        { status: 400 }
      );
    }

    const existing = await sql`SELECT id FROM weekly_offers WHERE id = ${offerId}`;
    if (!existing.length) {
      return NextResponse.json(
        { error: 'Weekly offer not found' },
        { status: 404 }
      );
    }

    await sql`DELETE FROM weekly_offers WHERE id = ${offerId}`;

    return NextResponse.json({ 
      success: true,
      message: 'Weekly offer deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting weekly offer:', error);
    return NextResponse.json(
      { error: 'Failed to delete weekly offer' },
      { status: 500 }
    );
  }
}