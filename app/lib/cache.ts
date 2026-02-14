// lib/cache.ts
import { cache } from 'react';
import { sql } from './db';

// Cache database queries
export const getCachedProducts = cache(async () => {
  return await sql`SELECT * FROM products ORDER BY created_at DESC`;
});

export const getCachedCollections = cache(async () => {
  return await sql`SELECT * FROM collections ORDER BY created_at DESC`;
});

export const getCachedActiveSoldes = cache(async () => {
  return await sql`
    SELECT * FROM soldes 
    WHERE is_active = true AND NOW() BETWEEN start_date AND end_date
  `;
});

export const getCachedActiveOffers = cache(async () => {
  return await sql`
    SELECT wo.*, p.name as product_name 
    FROM weekly_offers wo
    JOIN products p ON wo.product_id = p.id
    WHERE wo.is_active = true AND NOW() BETWEEN wo.start_date AND wo.end_date
  `;
});