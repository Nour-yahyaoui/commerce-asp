// app/collections/page.tsx
import { sql } from '../lib/db';
import Header from '../components/Header';
import CollectionsClient from './CollectionsClient';

export default async function CollectionsPage() {
  const collections = await sql`
    SELECT c.*, 
      (SELECT COUNT(*) FROM collection_products WHERE collection_id = c.id) as product_count
    FROM collections c
    ORDER BY c.created_at DESC
  `;

  // Serialize the data for client component
  const serializedCollections = collections.map((collection: any) => ({
    ...collection,
    product_count: parseInt(collection.product_count),
    created_at: collection.created_at?.toISOString(),
  }));

  return (
    <>
      <Header />
      <CollectionsClient initialCollections={serializedCollections} />
    </>
  );
}