// 📦 Product Context
// Manages all products data, fetches from Firebase
// Provides products to all components without prop drilling

import React, { createContext, useState, useEffect, useContext } from 'react';
import { getAllProducts } from '../firebase/firestore';

const ProductContext = createContext();

// Custom hook to use product context
// Usage: const { products, loading, categories } = useProducts();
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);     // All products
  const [loading, setLoading] = useState(true);     // Loading state
  const [error, setError] = useState(null);         // Error state

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const result = await getAllProducts();
    
    if (result.success) {
      setProducts(result.data);
      setError(null);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  // Get unique categories from products
  const categories = [...new Set(products.map(p => p.category))];

  // Get featured products (marked as featured in database)
  const featuredProducts = products.filter(p => p.featured);

  // Get products by category
  const getProductsByCategory = (category) => {
    return products.filter(p => p.category === category);
  };

  // Search products by name or description
  const searchProducts = (searchTerm) => {
    const term = searchTerm.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(term) ||
      p.description?.toLowerCase().includes(term)
    );
  };

  // Context value
  const value = {
    products,                   // All products array
    loading,                    // Boolean: is data loading?
    error,                      // Error message if fetch failed
    categories,                 // Array of unique category names
    featuredProducts,           // Products marked as featured
    getProductsByCategory,      // Function to filter by category
    searchProducts,             // Function to search products
    refreshProducts: fetchProducts,  // Function to reload products
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};