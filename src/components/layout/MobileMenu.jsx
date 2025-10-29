// 📱 Mobile Menu Component
// Hamburger menu for mobile devices

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { logoutUser } from '../../firebase/auth';
import { 
  Home, 
  ShoppingBag, 
  Heart, 
  User, 
  Package, 
  Info, 
  Phone, 
  HelpCircle,
  Store,
  LogOut,
  LogIn
} from 'lucide-react';

const MobileMenu = ({ isOpen, onClose }) => {
  const { isLoggedIn, userData, isAdmin } = useAuth();

  const handleLogout = async () => {
    await logoutUser();
    onClose();
  };

  // Don't render if not open
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Menu Panel - Slides from right */}
      <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 overflow-y-auto lg:hidden animate-slide-up">
        
        {/* User Info Header */}
        <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
          {isLoggedIn ? (
            <div>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary text-2xl font-bold mb-3">
                {userData?.name?.charAt(0).toUpperCase()}
              </div>
              <h3 className="text-lg font-semibold">{userData?.name}</h3>
              <p className="text-sm opacity-90">{userData?.phone}</p>
              {isAdmin && (
                <span className="inline-block mt-2 px-3 py-1 bg-white text-primary text-xs font-medium rounded-full">
                  Admin
                </span>
              )}
            </div>
          ) : (
            <div>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary text-3xl mb-3">
                👋
              </div>
              <h3 className="text-lg font-semibold">Welcome!</h3>
              <p className="text-sm opacity-90">Login to access your account</p>
            </div>
          )}
        </div>

        {/* Menu Items */}
        <nav className="p-4">
          <div className="space-y-1">
            
            {/* Home */}
            <Link
              to="/"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </Link>

            {/* Shop/Categories */}
            <Link
              to="/categories"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="font-medium">Shop</span>
            </Link>

            {/* Wishlist (if logged in) */}
            {isLoggedIn && (
              <Link
                to="/customer/wishlist"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Heart className="w-5 h-5" />
                <span className="font-medium">Wishlist</span>
              </Link>
            )}

            {/* Profile/Dashboard */}
            {isLoggedIn && (
              <Link
                to={isAdmin ? "/admin/dashboard" : "/customer/dashboard"}
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="font-medium">
                  {isAdmin ? 'Admin Panel' : 'My Account'}
                </span>
              </Link>
            )}

            {/* Orders (if logged in) */}
            {isLoggedIn && !isAdmin && (
              <Link
                to="/customer/orders"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Package className="w-5 h-5" />
                <span className="font-medium">My Orders</span>
              </Link>
            )}

            {/* Divider */}
            <div className="border-t border-gray-200 my-2" />

            {/* Become a Seller */}
            <Link
              to="/become-seller"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Store className="w-5 h-5" />
              <span className="font-medium">Become a Seller</span>
            </Link>

            {/* About Us */}
            <Link
              to="/about"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Info className="w-5 h-5" />
              <span className="font-medium">About Us</span>
            </Link>

            {/* Contact/Support */}
            <Link
              to="/contact"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span className="font-medium">Contact Us</span>
            </Link>

            {/* FAQ */}
            <Link
              to="/faq"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <HelpCircle className="w-5 h-5" />
              <span className="font-medium">FAQ</span>
            </Link>

            {/* Divider */}
            <div className="border-t border-gray-200 my-2" />

            {/* Login/Logout */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            ) : (
              <Link
                to="/login"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 text-primary hover:bg-orange-50 rounded-lg transition-colors"
              >
                <LogIn className="w-5 h-5" />
                <span className="font-medium">Login</span>
              </Link>
            )}
          </div>
        </nav>

        {/* Footer Info */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600 text-center">
            Made with ❤️ by Vishal Sharma
          </p>
          <p className="text-xs text-gray-500 text-center mt-1">
            Version 1.0.0
          </p>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;