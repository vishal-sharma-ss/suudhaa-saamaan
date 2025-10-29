// 🏠 Main App Component - UPDATED
// Now includes layout components and routing structure

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

// Pages (we'll create these next)
import HomePage from './pages/user/HomePage';
// More page imports will be added as we create them

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ProductProvider>
            <div className="App min-h-screen bg-white flex flex-col">
              
              {/* Header - Always visible */}
              <Header />
              
              {/* Search Bar - Below header */}
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
                  
                  {/* More routes will be added here as we create pages */}
                  {/* <Route path="/categories" element={<CategoryPage />} /> */}
                  {/* <Route path="/product/:id" element={<ProductDetailPage />} /> */}
                  {/* <Route path="/cart" element={<CartPage />} /> */}
                  {/* <Route path="/login" element={<LoginPage />} /> */}
                  {/* etc... */}
                </Routes>
              </main>
              
              {/* Footer - Always visible (except mobile with bottom nav) */}
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