// types/index.ts (updated with PriceInfo type)
export interface Product {
  id: number;
  name: string;
  description: string | null;
  buy_price: number;
  sell_price: number;
  image_url: string | null;
  category: string | null;
  stock: number;
  created_at: Date;
  updated_at: Date;
}

export interface Order {
  id: number;
  product_id: number;
  product_name: string;
  buy_price: number;
  sell_price: number;
  customer_name: string;
  customer_phone: string;
  customer_location: string;
  status: 'pending' | 'delivered' | 'cancelled';
  order_date: Date;
  delivered_date: Date | null;
}

export interface Collection {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  created_at: Date;
  products?: Product[];
}

export interface Solde {
  id: number;
  name: string;
  description: string | null;
  discount_percent: number | null;
  discount_fixed: number | null;
  start_date: Date;
  end_date: Date;
  is_active: boolean;
  created_at: Date;
  products?: Product[];
}

export interface WeeklyOffer {
  id: number;
  product_id: number;
  product?: Product;
  offer_description: string;
  offer_price: number;
  start_date: Date;
  end_date: Date;
  is_active: boolean;
  created_at: Date;
}

export interface PriceInfo {
  originalPrice: number;
  finalPrice: number;
  discountType?: 'percentage' | 'fixed' | 'weekly';
  discountValue?: number;
  offerDescription?: string;
}

export interface BuyFormData {
  customer_name: string;
  customer_phone: string;
  customer_location: string;
}

// For forms and API requests
export interface CreateProductInput {
  name: string;
  description?: string;
  buy_price: number;
  sell_price: number;
  image_url?: string;
  category?: string;
  stock: number;
}

export interface CreateOrderInput {
  product_id: number;
  customer_name: string;
  customer_phone: string;
  customer_location: string;
}

export interface CreateCollectionInput {
  name: string;
  description?: string;
  image_url?: string;
}

export interface CreateSoldeInput {
  name: string;
  description?: string;
  discount_percent?: number;
  discount_fixed?: number;
  start_date: Date;
  end_date: Date;
  is_active?: boolean;
}

export interface CreateWeeklyOfferInput {
  product_id: number;
  offer_description: string;
  offer_price: number;
  start_date: Date;
  end_date: Date;
  is_active?: boolean;
}