// app/admin/layout.tsx
'use client';

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Tags, 
  Clock, 
  Grid3x3,
  Percent,
  LogOut,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Close sidebar on route change on mobile
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [pathname, isMobile]);

  const navItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/products', icon: Package, label: 'Products' },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b]">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-[#1a1a1a] border-b border-[#404040] z-30">
        <div className="flex items-center justify-between p-4">
          <div>
            <h1 className="text-xl font-light text-white">
              Black<span className="font-bold text-[#c4a962]">Velvet</span>
            </h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 bg-[#2d2d2d] rounded-lg text-[#c4a962]"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Sidebar - Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full bg-[#1a1a1a] border-r border-[#404040] z-50
        transition-transform duration-300 ease-in-out
        ${isMobile ? 'w-64' : 'w-64 md:w-64'}
        ${isMobile && !isSidebarOpen ? '-translate-x-full' : 'translate-x-0'}
      `}>
        {/* Desktop Logo */}
        <div className="hidden md:block p-6 border-b border-[#404040]">
          <h1 className="text-2xl font-light text-white">
            Black<span className="font-bold text-[#c4a962]">Velvet</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">Admin Panel</p>
        </div>

        {/* Mobile Logo in Sidebar */}
        <div className="md:hidden p-6 border-b border-[#404040]">
          <h1 className="text-xl font-light text-white">Admin Panel</h1>
        </div>

        <nav className="mt-6 overflow-y-auto max-h-[calc(100vh-200px)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-all
                  ${active 
                    ? 'bg-[#c4a962] text-[#0b0b0b]' 
                    : 'text-gray-400 hover:text-[#c4a962] hover:bg-[#2d2d2d]'
                  }
                `}
                onClick={() => isMobile && setIsSidebarOpen(false)}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
                {active && (
                  <span className="ml-auto w-2 h-2 bg-[#0b0b0b] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-[#404040] bg-[#1a1a1a]">
          <button className="flex items-center gap-3 text-gray-400 hover:text-red-500 transition-colors w-full px-4 py-2 rounded-lg hover:bg-[#2d2d2d]">
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`
        transition-all duration-300
        ${isMobile ? 'pt-20 px-3' : 'md:ml-64 p-6'}
      `}>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}