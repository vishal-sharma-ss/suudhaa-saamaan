// 🔍 Search Bar Component
// Dynamic search with suggestions

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { debounce } from '../../utils/helpers';
import { formatPrice } from '../../utils/formatters';

const SearchBar = () => {
  const navigate = useNavigate();
  const { products } = useProducts();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const searchRef = useRef(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading recent searches:', error);
      }
    }
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search products with debounce
  const searchProducts = debounce((searchQuery) => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    const term = searchQuery.toLowerCase();
    const results = products
      .filter(product => 
        product.name.toLowerCase().includes(term) ||
        product.category?.toLowerCase().includes(term) ||
        product.description?.toLowerCase().includes(term)
      )
      .slice(0, 5); // Limit to 5 suggestions

    setSuggestions(results);
  }, 300);

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(true);
    searchProducts(value);
  };

  // Handle search submit
  const handleSearch = (searchQuery) => {
    if (!searchQuery.trim()) return;

    // Save to recent searches
    const newRecent = [
      searchQuery,
      ...recentSearches.filter(s => s !== searchQuery)
    ].slice(0, 5); // Keep last 5
    setRecentSearches(newRecent);
    localStorage.setItem('recentSearches', JSON.stringify(newRecent));

    // Navigate to search results
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    setShowSuggestions(false);
    setQuery('');
  };

  // Handle suggestion click
  const handleSuggestionClick = (product) => {
    navigate(`/product/${product.id}`);
    setShowSuggestions(false);
    setQuery('');
  };

  // Handle recent search click
  const handleRecentClick = (search) => {
    setQuery(search);
    handleSearch(search);
  };

  // Clear search
  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div ref={searchRef} className="relative w-full">
      {/* Search Input */}
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-gray-400" />
        
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch(query);
            }
          }}
          placeholder="Search for products..."
          className="w-full pl-12 pr-12 py-3 md:py-4 border-2 border-gray-200 rounded-full focus:outline-none focus:border-primary transition-colors text-sm md:text-base"
        />

        {/* Clear Button */}
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (query || recentSearches.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-96 overflow-y-auto z-50">
          
          {/* Recent Searches */}
          {!query && recentSearches.length > 0 && (
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-600">Recent Searches</p>
                <button
                  onClick={() => {
                    setRecentSearches([]);
                    localStorage.removeItem('recentSearches');
                  }}
                  className="text-xs text-primary hover:underline"
                >
                  Clear All
                </button>
              </div>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentClick(search)}
                    className="flex items-center gap-3 w-full px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors text-left"
                  >
                    <Search className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{search}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Product Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-4">
              <p className="text-sm font-semibold text-gray-600 mb-3">Products</p>
              <div className="space-y-2">
                {suggestions.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleSuggestionClick(product)}
                    className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                  >
                    {/* Product Image */}
                    <img
                      src={product.image || product.images?.[0]}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/50?text=No+Image';
                      }}
                    />
                    
                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {product.category}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-sm font-semibold text-primary">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {query && suggestions.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-gray-500">No products found</p>
              <p className="text-sm text-gray-400 mt-1">Try different keywords</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;