// 🏠 Main App Component - FULL VERSION
// Complete app with all routes and layout

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

// Pages
import HomePage from './pages/user/HomePage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ProductProvider>
            <div className="App min-h-screen bg-white flex flex-col">
              
              {/* Header - Always visible */}
              <Header />
              
              {/* Search Bar - Sticky below header */}
              <div className="sticky top-16 md:top-20 z-30 bg-white shadow-sm">
                <div className="container-custom py-3">
                  <SearchBar />
                </div>
              </div>
              
              {/* Main Content Area */}
              <main className="flex-1">
                <Routes>
                  {/* Home Page */}
                  <Route path="/" element={<HomePage />} />
                  
                  {/* Future routes will be added here as we build more pages */}
                  {/* <Route path="/categories" element={<CategoryPage />} /> */}
                  {/* <Route path="/product/:id" element={<ProductDetailPage />} /> */}
                  {/* <Route path="/cart" element={<CartPage />} /> */}
                  {/* <Route path="/login" element={<LoginPage />} /> */}
                  {/* <Route path="/customer/dashboard" element={<CustomerDashboard />} /> */}
                  {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
                </Routes>
              </main>
              
              {/* Footer - Always visible (hidden on mobile with bottom nav) */}
              <Footer />
              
              {/* Bottom Navigation - Mobile only, always visible */}
              <BottomNav />
            </div>
          </ProductProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;