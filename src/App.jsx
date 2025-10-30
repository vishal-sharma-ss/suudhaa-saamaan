// 🏠 Main App - WITH ADMIN LOGIN ROUTE

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

// Admin Pages
import AdminLoginPage from './admin/AdminLoginPage';
import AdminDashboard from './admin/AdminDashboard';
import AdminProductsPage from './admin/AdminProductsPage';
import AddProductPage from './admin/AddProductPage';
import AdminOrdersPage from './admin/AdminOrdersPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ProductProvider>
            <Routes>
              
              {/* ========== PUBLIC ROUTES (with layout) ========== */}
              <Route path="/" element={
                <div className="App min-h-screen bg-white flex flex-col">
                  <Header />
                  <div className="sticky top-16 md:top-20 z-30 bg-white shadow-sm">
                    <div className="container-custom py-3"><SearchBar /></div>
                  </div>
                  <main className="flex-1"><HomePage /></main>
                  <Footer />
                  <BottomNav />
                </div>
              } />

              <Route path="/categories" element={
                <div className="App min-h-screen bg-white flex flex-col">
                  <Header />
                  <div className="sticky top-16 md:top-20 z-30 bg-white shadow-sm">
                    <div className="container-custom py-3"><SearchBar /></div>
                  </div>
                  <main className="flex-1"><CategoryPage /></main>
                  <Footer />
                  <BottomNav />
                </div>
              } />

              <Route path="/category/:categoryId" element={
                <div className="App min-h-screen bg-white flex flex-col">
                  <Header />
                  <div className="sticky top-16 md:top-20 z-30 bg-white shadow-sm">
                    <div className="container-custom py-3"><SearchBar /></div>
                  </div>
                  <main className="flex-1"><CategoryPage /></main>
                  <Footer />
                  <BottomNav />
                </div>
              } />

              <Route path="/product/:id" element={
                <div className="App min-h-screen bg-white flex flex-col">
                  <Header />
                  <div className="sticky top-16 md:top-20 z-30 bg-white shadow-sm">
                    <div className="container-custom py-3"><SearchBar /></div>
                  </div>
                  <main className="flex-1"><ProductDetailPage /></main>
                  <Footer />
                  <BottomNav />
                </div>
              } />

              <Route path="/cart" element={
                <div className="App min-h-screen bg-white flex flex-col">
                  <Header />
                  <div className="sticky top-16 md:top-20 z-30 bg-white shadow-sm">
                    <div className="container-custom py-3"><SearchBar /></div>
                  </div>
                  <main className="flex-1"><CartPage /></main>
                  <Footer />
                  <BottomNav />
                </div>
              } />

              <Route path="/checkout" element={
                <div className="App min-h-screen bg-white flex flex-col">
                  <Header />
                  <main className="flex-1"><CheckoutPage /></main>
                  <Footer />
                  <BottomNav />
                </div>
              } />

              {/* ========== AUTH ROUTES (no layout) ========== */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              
              {/* ADMIN LOGIN - Separate Page */}
              <Route path="/admin/login" element={<AdminLoginPage />} />

              {/* ========== CUSTOMER ROUTES ========== */}
              <Route path="/customer/dashboard" element={
                <div className="App min-h-screen bg-white flex flex-col">
                  <Header />
                  <main className="flex-1"><CustomerDashboard /></main>
                  <Footer />
                  <BottomNav />
                </div>
              } />

              {/* ========== ADMIN ROUTES (no header/footer) ========== */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<AdminProductsPage />} />
              <Route path="/admin/products/add" element={<AddProductPage />} />
              <Route path="/admin/orders" element={<AdminOrdersPage />} />
              
            </Routes>
          </ProductProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;