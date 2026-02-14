// app/offers/page.tsx
import { sql } from '../lib/db';
import { formatPrice } from '../lib/pricing';
import Header from '../components/Header';
import OffersClient from './OffersClient';

export default async function WeeklyOffersPage() {
  // Fetch all active weekly offers with product details
  const offers = await sql`
    SELECT wo.*, p.* 
    FROM weekly_offers wo
    JOIN products p ON wo.product_id = p.id
    WHERE wo.is_active = true AND NOW() BETWEEN wo.start_date AND wo.end_date
    ORDER BY wo.end_date ASC
  `;

  // Convert dates to strings for serialization
  const serializedOffers = offers.map((offer: any) => ({
    ...offer,
    start_date: offer.start_date.toISOString(),
    end_date: offer.end_date.toISOString(),
    created_at: offer.created_at?.toISOString(),
  }));

  return (
    <>
      <Header />
      <OffersClient initialOffers={serializedOffers} />
    </>
  );
}