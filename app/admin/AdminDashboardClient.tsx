// app/admin/AdminDashboardClient.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Package, 
  ShoppingCart, 
  Tags, 
  Grid3x3, 
  Percent, 
  Clock,
  AlertCircle,
  ChevronRight
} from 'lucide-react';

interface DashboardData {
  productsCount: number;
  ordersCount: number;
  pendingOrders: number;
  deliveredOrders: number;
  categoriesCount: number;
  collectionsCount: number;
  soldesCount: number;
  offersCount: number;
  recentOrders: any[];
  lowStock: any[];
}

interface AdminDashboardClientProps {
  data: DashboardData;
}

export default function AdminDashboardClient({ data }: AdminDashboardClientProps) {
  const router = useRouter();

  // Debug log to see what data is coming in
  console.log('Dashboard data:', data);

  const stats = [
    { label: 'Products', value: data?.productsCount || 0, icon: Package, color: 'text-blue-500', href: '/admin/products' },
    { label: 'Orders', value: data?.ordersCount || 0, icon: ShoppingCart, color: 'text-green-500', href: '/admin/orders' },
    { label: 'Categories', value: data?.categoriesCount || 0, icon: Tags, color: 'text-purple-500', href: '/admin/categories' },
    { label: 'Collections', value: data?.collectionsCount || 0, icon: Grid3x3, color: 'text-pink-500', href: '/admin/collections' },
    { label: 'Active Sales', value: data?.soldesCount || 0, icon: Percent, color: 'text-orange-500', href: '/admin/soldes' },
    { label: 'Weekly Offers', value: data?.offersCount || 0, icon: Clock, color: 'text-yellow-500', href: '/admin/weekly-offers' },
  ];

  const handleQuickAction = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      router.push(e.target.value);
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-light text-white">Dashboard</h1>
          <p className="text-sm text-gray-400 mt-1">Welcome back to your admin panel</p>
        </div>
        
        {/* Quick Actions - Mobile Dropdown */}
        <div className="sm:hidden">
          <select 
            className="w-full bg-[#1a1a1a] border border-[#404040] rounded-lg px-4 py-2 text-white text-sm"
            onChange={handleQuickAction}
            defaultValue=""
          >
            <option value="" disabled>Quick Actions</option>
            <option value="/admin/products/new">➕ Add Product</option>
            <option value="/admin/collections/new">📁 New Collection</option>
            <option value="/admin/soldes/new">🏷️ New Sale</option>
          </select>
        </div>

        {/* Quick Actions - Desktop */}
        <div className="hidden sm:flex gap-2">
          <Link href="/admin/products/new" className="bg-[#1a1a1a] text-white px-3 py-1.5 rounded-lg text-sm hover:bg-[#2d2d2d] transition-colors">
            + Add Product
          </Link>
          <Link href="/admin/collections/new" className="bg-[#1a1a1a] text-white px-3 py-1.5 rounded-lg text-sm hover:bg-[#2d2d2d] transition-colors">
            + New Collection
          </Link>
        </div>
      </div>

      {/* Stats Grid - Responsive */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-[#1a1a1a] border border-[#404040] rounded-xl p-3 hover:border-[#c4a962]/30 transition-all active:scale-95"
            >
              <div className={`${stat.color} mb-2`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-lg font-bold text-white">{stat.value}</p>
              <p className="text-xs text-gray-400 truncate">{stat.label}</p>
            </Link>
          );
        })}
      </div>

      {/* Alerts - Mobile First */}
      {data?.pendingOrders > 0 && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-yellow-500 font-medium text-sm">Pending Orders</p>
              <p className="text-white text-sm mt-1">
                You have {data.pendingOrders} pending order{data.pendingOrders > 1 ? 's' : ''} that need attention.
              </p>
              <Link href="/admin/orders" className="inline-flex items-center gap-1 text-yellow-500 text-sm mt-2">
                View Orders <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Recent Orders */}
        <div className="bg-[#1a1a1a] border border-[#404040] rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-white">Recent Orders</h2>
            <Link href="/admin/orders" className="text-xs text-[#c4a962] hover:underline">View all</Link>
          </div>
          
          <div className="space-y-3">
            {data?.recentOrders && data.recentOrders.length > 0 ? (
              data.recentOrders.map((order: any) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-[#2d2d2d] rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm truncate">
                      #{order.id} - {order.customer_name}
                    </p>
                    <p className="text-xs text-gray-400 truncate">{order.product_name}</p>
                  </div>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs whitespace-nowrap ${
                    order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                    order.status === 'delivered' ? 'bg-green-500/20 text-green-500' :
                    'bg-gray-500/20 text-gray-500'
                  }`}>
                    {order.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-4 text-sm">No orders yet</p>
            )}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-[#1a1a1a] border border-[#404040] rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-white">Low Stock Alert</h2>
            <Link href="/admin/products" className="text-xs text-[#c4a962] hover:underline">Manage</Link>
          </div>

          {data?.lowStock && data.lowStock.length > 0 ? (
            <div className="space-y-3">
              {data.lowStock.map((product: any) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-[#2d2d2d] rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm truncate">{product.name}</p>
                    <p className="text-xs text-gray-400">{product.category || 'Uncategorized'}</p>
                  </div>
                  <span className="ml-2 px-2 py-1 bg-red-500/20 text-red-500 rounded-full text-xs whitespace-nowrap">
                    {product.stock} left
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-4 text-sm">All products are well stocked</p>
          )}
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#1a1a1a] border border-[#404040] rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">Conversion Rate</p>
          <p className="text-xl font-bold text-white">
            {data?.ordersCount && data.ordersCount > 0 
              ? Math.round((data.deliveredOrders / data.ordersCount) * 100) 
              : 0}%
          </p>
        </div>
        <div className="bg-[#1a1a1a] border border-[#404040] rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">Avg. Order Value</p>
          <p className="text-xl font-bold text-[#c4a962]">$245</p>
        </div>
      </div>
    </div>
  );
}