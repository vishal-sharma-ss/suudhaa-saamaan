// 📱 Bottom Navigation Bar (Mobile)
// Always visible at bottom: Home | Search | Cart | Products | Profile

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingCart, Grid, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { NotificationBadge } from '../common/Badge';

const BottomNav = () => {
  const location = useLocation();
  const { cartItemCount } = useCart();

  // Check if current path matches nav item
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Navigation items
  const navItems = [
    {
      path: '/',
      icon: Home,
      label: 'Home'
    },
    {
      path: '/search',
      icon: Search,
      label: 'Search'
    },
    {
      path: '/cart',
      icon: ShoppingCart,
      label: 'Cart',
      badge: cartItemCount
    },
    {
      path: '/categories',
      icon: Grid,
      label: 'Products'
    },
    {
      path: '/customer/dashboard',
      icon: User,
      label: 'Profile'
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-40 lg:hidden">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex flex-col items-center justify-center
                py-2 px-3 min-w-[60px]
                transition-all duration-200
                ${active 
                  ? 'text-primary' 
                  : 'text-gray-500 hover:text-gray-700'
                }
              `}
            >
              {/* Icon with badge */}
              <div className="relative">
                <Icon 
                  className={`w-6 h-6 transition-transform ${active ? 'scale-110' : ''}`}
                />
                {item.badge > 0 && (
                  <NotificationBadge count={item.badge} />
                )}
              </div>

              {/* Label */}
              <span 
                className={`
                  text-xs mt-1 font-medium
                  ${active ? 'text-primary' : 'text-gray-600'}
                `}
              >
                {item.label}
              </span>

              {/* Active Indicator */}
              {active && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-primary rounded-t-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;