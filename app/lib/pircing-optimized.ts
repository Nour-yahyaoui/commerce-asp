// lib/pricing-optimized.ts
import { sql } from './db';
import { PriceInfo } from '../types';

export async function getProductsWithPriceInfo() {
  // Single query to get all products with their active offers and soldes
  const products = await sql`
    WITH active_offers AS (
      SELECT 
        wo.product_id,
        wo.offer_price,
        wo.offer_description,
        'weekly' as discount_type
      FROM weekly_offers wo
      WHERE wo.is_active = true 
        AND NOW() BETWEEN wo.start_date AND wo.end_date
    ),
    active_soldes AS (
      SELECT 
        sp.product_id,
        s.discount_percent,
        s.discount_fixed,
        'solde' as discount_type
      FROM soldes_products sp
      JOIN soldes s ON sp.solde_id = s.id
      WHERE s.is_active = true 
        AND NOW() BETWEEN s.start_date AND s.end_date
    )
    SELECT 
      p.*,
      COALESCE(wo.offer_price, 
        CASE 
          WHEN s.discount_percent IS NOT NULL THEN p.sell_price * (1 - s.discount_percent/100)
          WHEN s.discount_fixed IS NOT NULL THEN p.sell_price - s.discount_fixed
          ELSE p.sell_price
        END
      ) as final_price,
      wo.offer_description,
      CASE 
        WHEN wo.product_id IS NOT NULL THEN 'weekly'
        WHEN s.product_id IS NOT NULL THEN 'solde'
        ELSE 'regular'
      END as price_type,
      s.discount_percent,
      s.discount_fixed
    FROM products p
    LEFT JOIN active_offers wo ON p.id = wo.product_id
    LEFT JOIN active_soldes s ON p.id = s.product_id
    ORDER BY p.created_at DESC
  `;
  
  return products;
}

export async function getSingleProductWithPriceInfo(productId: number) {
  // Single query for one product
  const result = await sql`
    WITH active_offers AS (
      SELECT 
        wo.product_id,
        wo.offer_price,
        wo.offer_description
      FROM weekly_offers wo
      WHERE wo.is_active = true 
        AND NOW() BETWEEN wo.start_date AND wo.end_date
        AND wo.product_id = ${productId}
    ),
    active_soldes AS (
      SELECT 
        sp.product_id,
        s.discount_percent,
        s.discount_fixed
      FROM soldes_products sp
      JOIN soldes s ON sp.solde_id = s.id
      WHERE s.is_active = true 
        AND NOW() BETWEEN s.start_date AND s.end_date
        AND sp.product_id = ${productId}
    )
    SELECT 
      p.*,
      COALESCE(wo.offer_price, 
        CASE 
          WHEN s.discount_percent IS NOT NULL THEN p.sell_price * (1 - s.discount_percent/100)
          WHEN s.discount_fixed IS NOT NULL THEN p.sell_price - s.discount_fixed
          ELSE p.sell_price
        END
      ) as final_price,
      wo.offer_description,
      CASE 
        WHEN wo.product_id IS NOT NULL THEN 'weekly'
        WHEN s.product_id IS NOT NULL THEN 'solde'
        ELSE 'regular'
      END as price_type
    FROM products p
    LEFT JOIN active_offers wo ON p.id = wo.product_id
    LEFT JOIN active_soldes s ON p.id = s.product_id
    WHERE p.id = ${productId}
  `;
  
  return result[0];
}