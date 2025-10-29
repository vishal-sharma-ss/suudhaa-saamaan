// 👤 Customer Dashboard - Main Overview

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Package, Heart, User, MapPin, LogOut, MessageCircle } from 'lucide-react';
import { logoutUser } from '../../firebase/auth';
import Button from '../../components/common/Button';
import { useToast } from '../../components/common/Toast';
import { openWhatsApp } from '../../utils/helpers';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const { success } = useToast();

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      await logoutUser();
      success('Logged out successfully');
      navigate('/');
    }
  };

  const menuItems = [
    {
      icon: Package,
      label: 'My Orders',
      description: 'Track your orders',
      path: '/customer/orders',
      color: 'bg-blue-500'
    },
    {
      icon: Heart,
      label: 'Wishlist',
      description: 'Saved products',
      path: '/customer/wishlist',
      color: 'bg-red-500'
    },
    {
      icon: User,
      label: 'Profile',
      description: 'Edit your details',
      path: '/customer/profile',
      color: 'bg-purple-500'
    },
    {
      icon: MapPin,
      label: 'Addresses',
      description: 'Manage addresses',
      path: '/customer/addresses',
      color: 'bg-green-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom max-w-4xl">
        
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-primary text-3xl font-bold">
              {userData?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {userData?.name}! 👋
              </h1>
              <p className="text-white/90">{userData?.phone}</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Orders', value: '0', color: 'text-blue-600' },
            { label: 'Active Orders', value: '0', color: 'text-orange-600' },
            { label: 'Wishlist', value: '0', color: 'text-red-600' },
            { label: 'Saved', value: '0', color: 'text-green-600' }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md text-center">
              <p className={`text-3xl font-bold mb-1 ${stat.color}`}>{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all group text-left"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-dark">{item.label}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-3">
          <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
          
          <Button
            variant="secondary"
            fullWidth
            onClick={() => openWhatsApp('9779821072912', 'Hi! I need help with my account.')}
            icon={<MessageCircle className="w-5 h-5" />}
          >
            Contact Support
          </Button>

          <Button
            variant="outline"
            fullWidth
            onClick={handleLogout}
            icon={<LogOut className="w-5 h-5" />}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;