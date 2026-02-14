// app/actions.ts
"use server";

import { sql } from './lib/db';

export async function testConnection() {
  try {
    const result = await sql`SELECT NOW()`;
    return { success: true, data: result };
  } catch (error) {
    console.error('Database connection error:', error);
    return { success: false, error: 'Failed to connect to database' };
  }
}

export async function getProducts() {
  try {
    const products = await sql`
      SELECT * FROM products ORDER BY created_at DESC
    `;
    return { success: true, data: products };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { success: false, error: 'Failed to fetch products' };
  }
}