// lib/pricing.ts
import { sql } from './db';

export interface PriceInfo {
  originalPrice: number;
  finalPrice: number;
  discountType?: 'percentage' | 'fixed' | 'weekly';
  discountValue?: number;
  offerDescription?: string;
}

export async function getProductPriceInfo(productId: number): Promise<PriceInfo> {
  // Get the product
  const product = await sql`
    SELECT * FROM products WHERE id = ${productId}
  `;
  
  if (!product.length) {
    throw new Error('Product not found');
  }

  const productData = product[0];
  const originalPrice = parseFloat(productData.sell_price);
  
  // Check for active weekly offer (priority 1 - weekly offers override sales)
  const weeklyOffer = await sql`
    SELECT * FROM weekly_offers 
    WHERE product_id = ${productId} 
      AND is_active = true 
      AND NOW() BETWEEN start_date AND end_date
    LIMIT 1
  `;

  if (weeklyOffer.length) {
    return {
      originalPrice,
      finalPrice: parseFloat(weeklyOffer[0].offer_price),
      discountType: 'weekly',
      offerDescription: weeklyOffer[0].offer_description
    };
  }

  // Check for active solde (discount)
  const solde = await sql`
    SELECT s.* FROM soldes s
    JOIN soldes_products sp ON s.id = sp.solde_id
    WHERE sp.product_id = ${productId}
      AND s.is_active = true 
      AND NOW() BETWEEN s.start_date AND s.end_date
    LIMIT 1
  `;

  if (solde.length) {
    const soldeData = solde[0];
    let finalPrice = originalPrice;

    if (soldeData.discount_percent) {
      finalPrice = originalPrice * (1 - soldeData.discount_percent / 100);
      return {
        originalPrice,
        finalPrice,
        discountType: 'percentage',
        discountValue: parseFloat(soldeData.discount_percent)
      };
    } else if (soldeData.discount_fixed) {
      finalPrice = originalPrice - parseFloat(soldeData.discount_fixed);
      return {
        originalPrice,
        finalPrice,
        discountType: 'fixed',
        discountValue: parseFloat(soldeData.discount_fixed)
      };
    }
  }

  // No discounts
  return {
    originalPrice,
    finalPrice: originalPrice
  };
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}