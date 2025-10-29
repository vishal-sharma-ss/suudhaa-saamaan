// 🎴 Advanced Product Card Component
// With 3D hover effects, quick view, wishlist animation

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { ShoppingCart, Heart, Eye, Zap } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';
import { DiscountBadge, StockBadge, CODBadge } from '../common/Badge';
import Modal from '../common/Modal';
import { useToast } from '../common/Toast';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { success } = useToast();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Calculate discount
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Handle add to cart with animation
  const handleAddToCart = (e) => {
    e.stopPropagation();
    
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image || product.images?.[0],
      variation: product.variations?.[0] || '1kg'
    });
    
    success('🎉 Added to cart!', 2000);
  };

  // Handle wishlist with heart animation
  const handleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    
    if (!isWishlisted) {
      success('❤️ Added to wishlist!', 2000);
    }
  };

  // Quick view modal
  const QuickViewContent = () => (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Image */}
      <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
        <img
          src={product.image || product.images?.[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div>
        <p className="text-sm text-gray-500 uppercase mb-2">{product.category}</p>
        <h3 className="text-2xl font-bold text-dark mb-4">{product.name}</h3>
        
        {/* Price */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-lg text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <DiscountBadge percentage={discount} />
            </>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4">{product.description}</p>

        {/* Variations */}
        {product.variations && (
          <div className="mb-4">
            <p className="text-sm font-semibold mb-2">Available in:</p>
            <div className="flex gap-2">
              {product.variations.map((variation, index) => (
                <button
                  key={index}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-primary transition-colors"
                >
                  {variation}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Badges */}
        <div className="flex gap-2 mb-6">
          <StockBadge stock={product.stock} />
          <CODBadge />
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleAddToCart}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
          <button
            onClick={() => {
              setShowQuickView(false);
              navigate(`/product/${product.id}`);
            }}
            className="w-full bg-gray-100 text-dark py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            View Full Details
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Product Card */}
      <div
        onClick={() => navigate(`/product/${product.id}`)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2"
        style={{
          transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
        }}
      >
        {/* Image Container with 3D Effect */}
        <div className="relative h-48 md:h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          {/* Main Image */}
          <img
            src={product.image || product.images?.[0] || 'https://via.placeholder.com/300?text=No+Image'}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />

          {/* Gradient Overlay on Hover */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {discount > 0 && (
              <DiscountBadge percentage={discount} />
            )}
            {product.badges?.includes('Best Seller') && (
              <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
                ⭐ Best Seller
              </span>
            )}
            {product.badges?.includes('Organic') && (
              <span className="px-3 py-1 bg-secondary text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
                ✅ Organic
              </span>
            )}
          </div>

          {/* Stock Badge */}
          <div className="absolute top-3 right-3 z-10">
            <StockBadge stock={product.stock || 0} />
          </div>

          {/* Quick Actions - Animated Entry */}
          <div className={`absolute inset-0 flex items-center justify-center gap-3 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {/* Quick View */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowQuickView(true);
              }}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all transform hover:scale-110 shadow-xl"
              style={{
                transform: isHovered ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0)',
                transitionDelay: '0ms'
              }}
            >
              <Eye className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={handleWishlist}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all transform hover:scale-110 shadow-xl ${
                isWishlisted 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white text-gray-700 hover:bg-red-500 hover:text-white'
              }`}
              style={{
                transform: isHovered ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0)',
                transitionDelay: '50ms'
              }}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>

            {/* Fast Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-all transform hover:scale-110 shadow-xl"
              style={{
                transform: isHovered ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0)',
                transitionDelay: '100ms'
              }}
            >
              <Zap className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category */}
          <p className="text-xs text-gray-500 uppercase mb-1 font-semibold tracking-wide">
            {product.category}
          </p>

          {/* Product Name - With hover expand */}
          <h3 className="text-base md:text-lg font-bold text-dark mb-2 line-clamp-2 min-h-[3rem] group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Rating (if available) */}
          {product.rating && (
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs text-gray-600 ml-1">({product.rating})</span>
            </div>
          )}

          {/* Price with Animated Underline */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl md:text-2xl font-bold text-primary relative">
              {formatPrice(product.price)}
              <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-primary transition-all duration-300" />
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Add to Cart Button with Ripple Effect */}
          <button
            onClick={handleAddToCart}
            disabled={!product.stock || product.stock === 0}
            className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold hover:bg-orange-600 transition-all flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed transform active:scale-95 relative overflow-hidden group"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Add to Cart</span>
            
            {/* Ripple effect on click */}
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity rounded-lg" />
          </button>
        </div>
      </div>

      {/* Quick View Modal */}
      <Modal
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
        title="Quick View"
        size="xl"
      >
        <QuickViewContent />
      </Modal>
    </>
  );
};

export default ProductCard;