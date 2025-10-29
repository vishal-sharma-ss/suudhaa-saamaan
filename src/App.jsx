// 🏠 Main App Component - COMPLETE WITH ALL ROUTES

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';

// Layout Components
import Header from './components/layout/Header';
import SearchBar from './components/layout/SearchBar';
import Footer from './components/layout/Footer';
import BottomNav from './components/layout/BottomNav';

// User Pages
import HomePage from './pages/user/HomePage';
import CategoryPage from './pages/user/CategoryPage';
import ProductDetailPage from './pages/user/ProductDetailPage';
import CartPage from './pages/user/CartPage';
import CheckoutPage from './pages/user/CheckoutPage';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';

// Customer Dashboard
import CustomerDashboard from './pages/customer/CustomerDashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ProductProvider>
            <div className="App min-h-screen bg-white flex flex-col">
              
              {/* Header - Always visible */}
              <Header />
              
              {/* Search Bar - Below header, sticky */}
              <div className="sticky top-16 md:top-20 z-30 bg-white shadow-sm">
                <div className="container-custom py-3">
                  <SearchBar />
                </div>
              </div>
              
              {/* Main Content Area */}
              <main className="flex-1">
                <Routes>
                  {/* ========== PUBLIC ROUTES ========== */}
                  
                  {/* Home */}
                  <Route path="/" element={<HomePage />} />
                  
                  {/* Products */}
                  <Route path="/categories" element={<CategoryPage />} />
                  <Route path="/category/:categoryId" element={<CategoryPage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/search" element={<CategoryPage />} />
                  
                  {/* Cart & Checkout */}
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  
                  {/* Authentication */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  
                  {/* ========== CUSTOMER ROUTES ========== */}
                  <Route path="/customer/dashboard" element={<CustomerDashboard />} />
                  <Route path="/customer/orders" element={<CustomerDashboard />} />
                  <Route path="/customer/profile" element={<CustomerDashboard />} />
                  <Route path="/customer/wishlist" element={<CustomerDashboard />} />
                  <Route path="/customer/addresses" element={<CustomerDashboard />} />
                  
                  {/* ========== STATIC PAGES (Create later) ========== */}
                  {/* <Route path="/about" element={<AboutPage />} /> */}
                  {/* <Route path="/contact" element={<ContactPage />} /> */}
                  {/* <Route path="/faq" element={<FAQPage />} /> */}
                  {/* <Route path="/terms" element={<TermsPage />} /> */}
                  {/* <Route path="/privacy" element={<PrivacyPage />} /> */}
                  {/* <Route path="/become-seller" element={<BecomeSellerPage />} /> */}
                  
                  {/* ========== ADMIN ROUTES (Create later) ========== */}
                  {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
                  {/* <Route path="/admin/orders" element={<AdminOrders />} /> */}
                  {/* <Route path="/admin/products" element={<AdminProducts />} /> */}
                  {/* <Route path="/admin/customers" element={<AdminCustomers />} /> */}
                </Routes>
              </main>
              
              {/* Footer - Always visible */}
              <Footer />
              
              {/* Bottom Navigation - Mobile only */}
              <BottomNav />
            </div>
          </ProductProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;