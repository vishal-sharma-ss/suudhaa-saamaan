// 🏪 Category Page - Advanced Product Listing
// With filters, sorting, infinite scroll

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { Filter, SlidersHorizontal, X, LayoutGrid, List } from 'lucide-react'; // ✅ replaced Grid3x3 with LayoutGrid
import ProductCard from '../../components/product/ProductCard';
import { ProductCardSkeleton } from '../../components/common/Loader';
import Button from '../../components/common/Button';
import { CATEGORIES } from '../../utils/constants';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, loading } = useProducts();

  // UI State
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Filter State
  const [filters, setFilters] = useState({
    priceRange: [0, 10000],
    inStock: false,
    organic: false,
    sortBy: 'featured' // 'featured', 'price-low', 'price-high', 'latest', 'popular'
  });

  // Get category info
  const category = CATEGORIES.find(cat => cat.id === categoryId);

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      if (categoryId && product.category !== categoryId) return false;

      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;

      if (filters.inStock && (!product.stock || product.stock === 0)) return false;

      if (filters.organic && !product.badges?.includes('Organic')) return false;

      return true;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'latest':
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case 'popular':
          return (b.sales || 0) - (a.sales || 0);
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });

  // Filter Sidebar
  const FilterSidebar = () => (
    <div
      className={`
        fixed lg:static top-0 right-0 h-full lg:h-auto
        w-80 bg-white shadow-2xl lg:shadow-none
        z-50 lg:z-0 p-6 overflow-y-auto
        transform transition-transform duration-300
        ${showFilters ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}
    >
      <div className="flex items-center justify-between mb-6 lg:hidden">
        <h3 className="text-xl font-bold">Filters</h3>
        <button onClick={() => setShowFilters(false)}>
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Sort By */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Sort By</h4>
        <div className="space-y-2">
          {[
            { value: 'featured', label: 'Featured' },
            { value: 'price-low', label: 'Price: Low to High' },
            { value: 'price-high', label: 'Price: High to Low' },
            { value: 'latest', label: 'Latest' },
            { value: 'popular', label: 'Most Popular' }
          ].map(option => (
            <button
              key={option.value}
              onClick={() => setFilters({ ...filters, sortBy: option.value })}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                filters.sortBy === option.value
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Price Range</h4>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={filters.priceRange[1]}
            onChange={(e) =>
              setFilters({ ...filters, priceRange: [0, parseInt(e.target.value)] })
            }
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>Rs. 0</span>
            <span className="font-semibold text-primary">
              Rs. {filters.priceRange[1].toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Availability */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Availability</h4>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })}
            className="w-5 h-5 accent-primary cursor-pointer"
          />
          <span>In Stock Only</span>
        </label>
      </div>

      {/* Special Filters */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Special</h4>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.organic}
            onChange={(e) => setFilters({ ...filters, organic: e.target.checked })}
            className="w-5 h-5 accent-primary cursor-pointer"
          />
          <span>Organic Only</span>
        </label>
      </div>

      <Button
        variant="outline"
        fullWidth
        onClick={() =>
          setFilters({
            priceRange: [0, 10000],
            inStock: false,
            organic: false,
            sortBy: 'featured'
          })
        }
      >
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-12">
        <div className="container-custom">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">{category?.icon || '🛒'}</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {category?.name || 'All Products'}
              </h1>
              <p className="text-white/80">
                {filteredProducts.length} products available
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterSidebar />
          </div>

          {/* Products Area */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex items-center justify-between">
              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg"
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>

              <p className="text-gray-600 font-medium">
                Showing {filteredProducts.length} products
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div
                className={`${
                  viewMode === 'grid'
                    ? 'grid grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-dark mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters</p>
                <Button
                  variant="primary"
                  onClick={() =>
                    setFilters({
                      priceRange: [0, 10000],
                      inStock: false,
                      organic: false,
                      sortBy: 'featured'
                    })
                  }
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Backdrop (Mobile) */}
      {showFilters && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setShowFilters(false)}
        />
      )}
    </div>
  );
};

export default CategoryPage;