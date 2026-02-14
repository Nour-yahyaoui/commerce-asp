// app/admin/page.tsx
import { sql } from '../lib/db';
import AdminDashboardClient from './AdminDashboardClient';

export default async function AdminDashboard() {
  try {
    // Fetch statistics
    const [products, orders, categories, collections, soldes, offers] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM products`,
      sql`SELECT COUNT(*) as count, 
                SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
                SUM(CASE WHEN status = 'delivered' THEN 1 ELSE 0 END) as delivered
         FROM orders`,
      sql`SELECT COUNT(DISTINCT category) as count FROM products WHERE category IS NOT NULL`,
      sql`SELECT COUNT(*) as count FROM collections`,
      sql`SELECT COUNT(*) as count FROM soldes WHERE is_active = true`,
      sql`SELECT COUNT(*) as count FROM weekly_offers WHERE is_active = true`,
    ]);

    // Recent orders
    const recentOrders = await sql`
      SELECT * FROM orders 
      ORDER BY order_date DESC 
      LIMIT 5
    `;

    // Low stock products
    const lowStock = await sql`
      SELECT * FROM products 
      WHERE stock < 10 
      ORDER BY stock ASC 
      LIMIT 5
    `;

    // Serialize the data for client component
    const serializedData = {
      productsCount: products[0]?.count || 0,
      ordersCount: orders[0]?.count || 0,
      pendingOrders: orders[0]?.pending || 0,
      deliveredOrders: orders[0]?.delivered || 0,
      categoriesCount: categories[0]?.count || 0,
      collectionsCount: collections[0]?.count || 0,
      soldesCount: soldes[0]?.count || 0,
      offersCount: offers[0]?.count || 0,
      recentOrders: recentOrders.map((order: any) => ({
        ...order,
        order_date: order.order_date?.toISOString(),
        delivered_date: order.delivered_date?.toISOString()
      })),
      lowStock: lowStock.map((product: any) => ({
        ...product,
        buy_price: parseFloat(product.buy_price),
        sell_price: parseFloat(product.sell_price)
      }))
    };

    return <AdminDashboardClient data={serializedData} />;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    
    // Return fallback UI with error state
    return (
      <div className="min-h-screen bg-[#0b0b0b] p-6">
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
          <h1 className="text-2xl font-light text-white mb-2">Error Loading Dashboard</h1>
          <p className="text-gray-400">Unable to load dashboard data. Please try again later.</p>
        </div>
      </div>
    );
  }
}