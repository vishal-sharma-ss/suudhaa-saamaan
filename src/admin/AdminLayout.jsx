// 👑 Admin Layout - Sidebar Navigation Structure

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { logoutUser } from '../../firebase/auth';
import {
  LayoutDashboard, Package, ShoppingBag, Users, BarChart3,
  Tag, Settings, LogOut, Menu, X, TrendingUp, Warehouse
} from 'lucide-react';
import { useToast } from '../../components/common/Toast';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userData } = useAuth();
  const { success } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Navigation items
  const navItems = [
    {
      label: 'Dashboard',
      path: '/admin/dashboard',
      icon: LayoutDashboard,
      color: 'text-blue-600'
    },
    {
      label: 'Orders',
      path: '/admin/orders',
      icon: ShoppingBag,
      color: 'text-orange-600',
      badge: '0' // Will be dynamic
    },
    {
      label: 'Products',
      path: '/admin/products',
      icon: Package,
      color: 'text-purple-600'
    },
    {
      label: 'Add Product',
      path: '/admin/products/add',
      icon: Package,
      color: 'text-green-600'
    },
    {
      label: 'Inventory',
      path: '/admin/inventory',
      icon: Warehouse,
      color: 'text-yellow-600'
    },
    {
      label: 'Customers',
      path: '/admin/customers',
      icon: Users,
      color: 'text-indigo-600'
    },
    {
      label: 'Analytics',
      path: '/admin/analytics',
      icon: BarChart3,
      color: 'text-pink-600'
    },
    {
      label: 'Coupons',
      path: '/admin/coupons',
      icon: Tag,
      color: 'text-red-600'
    },
    {
      label: 'Settings',
      path: '/admin/settings',
      icon: Settings,
      color: 'text-gray-600'
    }
  ];

  const handleLogout = async () => {
    if (window.confirm('Logout from admin panel?')) {
      await logoutUser();
      success('Logged out successfully');
      navigate('/');
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static top-0 left-0 h-full w-72 bg-gradient-to-b from-gray-900 to-gray-800 
        text-white z-50 transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto
      `}>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-2xl font-bold">
                S
              </div>
              <div>
                <h2 className="font-bold text-lg">Admin Panel</h2>
                <p className="text-xs text-gray-400">Suudhaa Saamaan</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-gray-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Admin Info */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-xl font-bold">
              {userData?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold">{userData?.name}</p>
              <p className="text-xs text-gray-400">{userData?.phone}</p>
              <span className="inline-block mt-1 px-2 py-0.5 bg-primary text-white text-xs rounded-full">
                Administrator
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <div className="space-y-1">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                  ${isActive(item.path)
                    ? 'bg-primary text-white shadow-lg'
                    : 'hover:bg-gray-700 text-gray-300'
                  }
                `}
              >
                <item.icon className="w-5 h-5" />
                <span className="flex-1 font-medium">{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <h1 className="text-2xl font-bold text-gray-800">
              {navItems.find(item => item.path === location.pathname)?.label || 'Admin Panel'}
            </h1>

            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
              >
                View Store →
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 px-6 py-4">
          <p className="text-sm text-gray-600 text-center">
            © 2025 Suudhaa Saamaan Admin Panel - Made with ❤️ by Vishal Sharma
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;