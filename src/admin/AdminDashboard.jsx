// 📊 Admin Dashboard - Overview & Quick Stats

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllOrders, getAllProducts, getAllCustomers } from '../../firebase/firestore';
import AdminLayout from './AdminLayout';
import { 
  TrendingUp, ShoppingBag, Package, Users, 
  DollarSign, Clock, CheckCircle, AlertCircle 
} from 'lucide-react';
import { formatPrice } from '../../utils/formatters';
import Loader from '../../components/common/Loader';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalCustomers: 0,
    pendingOrders: 0,
    completedOrders: 0,
    lowStockProducts: 0,
    todayOrders: 0
  });

  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);

    try {
      // Fetch all data
      const [ordersResult, productsResult, customersResult] = await Promise.all([
        getAllOrders(),
        getAllProducts(),
        getAllCustomers()
      ]);

      if (ordersResult.success && productsResult.success && customersResult.success) {
        const orders = ordersResult.data || [];
        const products = productsResult.data || [];
        const customers = customersResult.data || [];

        // Calculate stats
        const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
        const pendingOrders = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;
        const completedOrders = orders.filter(o => o.status === 'Delivered').length;
        const lowStockProducts = products.filter(p => (p.stock || 0) < 10).length;

        // Today's orders
        const today = new Date().toISOString().split('T')[0];
        const todayOrders = orders.filter(o => o.createdAt?.startsWith(today)).length;

        setStats({
          totalOrders: orders.length,
          totalRevenue,
          totalProducts: products.length,
          totalCustomers: customers.length,
          pendingOrders,
          completedOrders,
          lowStockProducts,
          todayOrders
        });

        // Recent 5 orders
        setRecentOrders(orders.slice(0, 5));
      }
    } catch (error) {
      console.error('Dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Stat cards data
  const statCards = [
    {
      title: 'Total Revenue',
      value: formatPrice(stats.totalRevenue),
      icon: DollarSign,
      color: 'bg-green-500',
      trend: '+12.5%',
      trendUp: true
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: 'bg-blue-500',
      subtitle: `${stats.todayOrders} today`
    },
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-purple-500',
      subtitle: `${stats.lowStockProducts} low stock`
    },
    {
      title: 'Total Customers',
      value: stats.totalCustomers,
      icon: Users,
      color: 'bg-pink-500',
      trend: '+8.2%',
      trendUp: true
    }
  ];

  const quickStats = [
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: Clock,
      color: 'text-orange-600 bg-orange-100'
    },
    {
      title: 'Completed',
      value: stats.completedOrders,
      icon: CheckCircle,
      color: 'text-green-600 bg-green-100'
    },
    {
      title: 'Low Stock',
      value: stats.lowStockProducts,
      icon: AlertCircle,
      color: 'text-red-600 bg-red-100'
    }
  ];

  if (loading) {
    return (
      <AdminLayout>
        <Loader fullScreen text="Loading dashboard..." />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Welcome back, Admin! 👋</h2>
          <p className="text-white/90">Here's what's happening with your store today.</p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center text-white`}>
                  <card.icon className="w-6 h-6" />
                </div>
                {card.trend && (
                  <span className={`text-sm font-semibold ${card.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                    {card.trend}
                  </span>
                )}
              </div>
              <h3 className="text-gray-600 text-sm mb-1">{card.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              {card.subtitle && (
                <p className="text-sm text-gray-500 mt-1">{card.subtitle}</p>
              )}
            </div>
          ))}
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-full ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Recent Orders</h3>
            <button
              onClick={() => navigate('/admin/orders')}
              className="text-primary hover:underline font-medium"
            >
              View All →
            </button>
          </div>

          {recentOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentOrders.map((order, index) => (
                    <tr 
                      key={index}
                      onClick={() => navigate(`/admin/orders/${order.id}`)}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="px-6 py-4 text-sm font-mono text-gray-900">
                        #{order.orderId}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {order.customerName}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`
                          px-3 py-1 text-xs font-medium rounded-full
                          ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                            order.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 
                            'bg-blue-100 text-blue-800'}
                        `}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        {formatPrice(order.total)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center text-gray-500">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p>No orders yet</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <button
            onClick={() => navigate('/admin/products/add')}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all text-left group"
          >
            <Package className="w-10 h-10 text-primary mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-gray-900 mb-1">Add Product</h4>
            <p className="text-sm text-gray-600">Add new items to store</p>
          </button>

          <button
            onClick={() => navigate('/admin/orders')}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all text-left group"
          >
            <ShoppingBag className="w-10 h-10 text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-gray-900 mb-1">Manage Orders</h4>
            <p className="text-sm text-gray-600">Process customer orders</p>
          </button>

          <button
            onClick={() => navigate('/admin/customers')}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all text-left group"
          >
            <Users className="w-10 h-10 text-purple-500 mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-gray-900 mb-1">View Customers</h4>
            <p className="text-sm text-gray-600">Manage customer data</p>
          </button>

          <button
            onClick={() => navigate('/admin/analytics')}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all text-left group"
          >
            <TrendingUp className="w-10 h-10 text-green-500 mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-gray-900 mb-1">Analytics</h4>
            <p className="text-sm text-gray-600">View sales reports</p>
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;