// 📦 Featured Products Section
// Display featured products in 2-column grid

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';
import { DiscountBadge, StockBadge } from '../common/Badge';
import { ProductCardSkeleton } from '../common/Loader';
import Button from '../common/Button';
import { useToast } from '../common/Toast';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { success } = useToast();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent navigating to product page
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image || product.images?.[0],
      variation: product.variations?.[0] || '1kg'
    });
    success('Added to cart!');
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative h-48 md:h-56 overflow-hidden bg-gray-100">
        <img
          src={product.image || product.images?.[0] || 'https://via.placeholder.com/300?text=No+Image'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount > 0 && <DiscountBadge percentage={discount} />}
          {product.badges?.map((badge, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-secondary text-white text-xs font-medium rounded-full"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Stock Badge */}
        <div className="absolute top-3 right-3">
          <StockBadge stock={product.stock || 0} />
        </div>

        {/* Quick Actions - Show on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${product.id}`);
            }}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
            title="Quick View"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
            title="Add to Wishlist"
          >
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs text-gray-500 uppercase mb-1 capitalize">
          {product.category}
        </p>

        {/* Product Name */}
        <h3 className="text-base md:text-lg font-semibold text-dark mb-2 line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg md:text-xl font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          variant="primary"
          fullWidth
          onClick={handleAddToCart}
          icon={<ShoppingCart className="w-5 h-5" />}
          disabled={!product.stock || product.stock === 0}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

const FeaturedProducts = () => {
  const { products, loading } = useProducts();
  const navigate = useNavigate();

  // Get featured products (or first 10 if no featured products)
  const featuredProducts = products.filter(p => p.featured).slice(0, 10);
  const displayProducts = featuredProducts.length > 0 
    ? featuredProducts 
    : products.slice(0, 10);

  return (
    <section className="section bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-dark mb-3">
            Featured Products
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Fresh, organic, and delivered to your doorstep
          </p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : displayProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No products available yet</p>
            <p className="text-sm text-gray-400 mt-2">Check back soon!</p>
          </div>
        )}

        {/* View All Button */}
        {displayProducts.length > 0 && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/categories')}
            >
              View All Products →
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;