// 📱 Header Component
// Logo | Brand Name | Login | Cart | Menu

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import MobileMenu from './MobileMenu';
import { NotificationBadge } from '../common/Badge';

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userData, isAdmin } = useAuth();
  const { cartItemCount } = useCart();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Handle login/profile click
  const handleUserIconClick = () => {
    if (isLoggedIn) {
      // Go to appropriate dashboard
      navigate(isAdmin ? '/admin/dashboard' : '/customer/dashboard');
    } else {
      // Go to login page
      navigate('/login');
    }
  };

  return (
    <>
      {/* Header Container - Sticky at top */}
      <header className="sticky top-0 z-40 bg-white shadow-md">
        <div className="container-custom">
          <div className="flex items-center justify-between py-3 md:py-4">
            
            {/* Left: Logo + Brand Name */}
            <Link 
              to="/" 
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              {/* Logo Image - Replace with your actual logo */}
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-xl md:text-2xl">
                S
              </div>
              
              {/* Brand Name + Tagline */}
              <div className="flex flex-col">
                <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-dark">
                  Suudhaa Saamaan
                </h1>
                <p className="text-xs md:text-sm text-gray-600 hidden sm:block">
                  In one click. Delivered to your home 🏠
                </p>
              </div>
            </Link>

            {/* Right: Icons */}
            <div className="flex items-center gap-3 md:gap-4">
              
              {/* Login/Profile Icon */}
              <button
                onClick={handleUserIconClick}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
                title={isLoggedIn ? 'My Account' : 'Login'}
              >
                <User className="w-6 h-6 md:w-7 md:h-7 text-gray-700" />
                {isLoggedIn && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full" />
                )}
              </button>

              {/* Cart Icon with Badge */}
              <Link
                to="/cart"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
                title="Shopping Cart"
              >
                <ShoppingCart className="w-6 h-6 md:w-7 md:h-7 text-gray-700" />
                <NotificationBadge count={cartItemCount} />
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors lg:hidden"
                title="Menu"
              >
                {showMobileMenu ? (
                  <X className="w-6 h-6 md:w-7 md:h-7 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 md:w-7 md:h-7 text-gray-700" />
                )}
              </button>

              {/* Desktop Navigation - Hidden on mobile */}
              <nav className="hidden lg:flex items-center gap-6 ml-4">
                <Link 
                  to="/" 
                  className="text-gray-700 hover:text-primary font-medium transition-colors"
                >
                  Home
                </Link>
                <Link 
                  to="/categories" 
                  className="text-gray-700 hover:text-primary font-medium transition-colors"
                >
                  Shop
                </Link>
                <Link 
                  to="/about" 
                  className="text-gray-700 hover:text-primary font-medium transition-colors"
                >
                  About
                </Link>
                <Link 
                  to="/contact" 
                  className="text-gray-700 hover:text-primary font-medium transition-colors"
                >
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileMenu 
        isOpen={showMobileMenu} 
        onClose={() => setShowMobileMenu(false)} 
      />
    </>
  );
};

export default Header;