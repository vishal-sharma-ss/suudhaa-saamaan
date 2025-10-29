// 🔍 Product Detail Page - Advanced Features
// Image zoom, reviews, related products, share buttons

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { 
  ShoppingCart, Heart, Share2, Truck, Shield, 
  RefreshCw, Star, ChevronLeft, ChevronRight,
  MessageCircle, Plus, Minus, Check
} from 'lucide-react';
import { formatPrice } from '../../utils/formatters';
import { DiscountBadge, CODBadge, FreeDeliveryBadge } from '../../components/common/Badge';
import Button from '../../components/common/Button';
import ProductCard from '../../components/product/ProductCard';
import Loader from '../../components/common/Loader';
import { useToast } from '../../components/common/Toast';
import { openWhatsApp } from '../../utils/helpers';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const { success } = useToast();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description'); // 'description', 'reviews'

  // Find product
  useEffect(() => {
    const found = products.find(p => p.id === id);
    if (found) {
      setProduct(found);
      setSelectedVariation(found.variations?.[0] || null);
    }
  }, [id, products]);

  // Get related products (same category)
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== id)
    .slice(0, 4);

  // Calculate discount
  const discount = product?.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Handle add to cart
  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[selectedImage] || product.image,
      variation: selectedVariation,
      quantity
    });
    
    success(`Added ${quantity}x ${product.name} to cart!`);
  };

  // Handle WhatsApp inquiry
  const handleWhatsAppInquiry = () => {
    const message = `Hi! I'm interested in:\n\n${product.name}\nPrice: ${formatPrice(product.price)}\n\nCan you provide more details?`;
    openWhatsApp('9779821072912', message);
  };

  // Share product
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} on Suudhaa Saamaan!`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy link
      navigator.clipboard.writeText(window.location.href);
      success('Link copied to clipboard!');
    }
  };

  if (loading || !product) {
    return <Loader fullScreen text="Loading product..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button onClick={() => navigate('/')} className="hover:text-primary">
              Home
            </button>
            <span>/</span>
            <button onClick={() => navigate(`/category/${product.category}`)} className="hover:text-primary capitalize">
              {product.category}
            </button>
            <span>/</span>
            <span className="text-dark font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          
          {/* LEFT: Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-xl group">
              <img
                src={product.images?.[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Discount Badge */}
              {discount > 0 && (
                <div className="absolute top-4 left-4">
                  <DiscountBadge percentage={discount} />
                </div>
              )}

              {/* Navigation Arrows */}
              {product.images && product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((selectedImage - 1 + product.images.length) % product.images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setSelectedImage((selectedImage + 1) % product.images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      index === selectedImage
                        ? 'border-primary scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Info */}
          <div className="space-y-6">
            
            {/* Category & Name */}
            <div>
              <p className="text-sm text-gray-500 uppercase font-semibold mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">
                {product.name}
              </h1>
              
              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews || 0} reviews)
                  </span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="text-secondary font-semibold">
                      Save {formatPrice(product.originalPrice - product.price)}!
                    </span>
                  </>
                )}
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <CODBadge />
                {product.price >= 499 && <FreeDeliveryBadge />}
                {product.badges?.map((badge, i) => (
                  <span key={i} className="px-3 py-1 bg-secondary text-white text-sm rounded-full">
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Variations */}
            {product.variations && product.variations.length > 0 && (
              <div>
                <p className="font-semibold mb-3">Select Size:</p>
                <div className="flex flex-wrap gap-3">
                  {product.variations.map((variation, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedVariation(variation)}
                      className={`px-6 py-3 rounded-lg font-medium transition-all ${
                        selectedVariation === variation
                          ? 'bg-primary text-white shadow-lg scale-105'
                          : 'bg-white border-2 border-gray-300 hover:border-primary'
                      }`}
                    >
                      {variation}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div>
              <p className="font-semibold mb-3">Quantity:</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="px-6 py-3 font-semibold min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="px-4 py-3 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <span className="text-gray-600">
                  {product.stock} available
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleAddToCart}
                icon={<ShoppingCart className="w-5 h-5" />}
                disabled={!product.stock || product.stock === 0}
              >
                Add to Cart - {formatPrice(product.price * quantity)}
              </Button>

              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  icon={<Heart className={isWishlisted ? 'fill-red-500 text-red-500' : ''} />}
                >
                  {isWishlisted ? 'Saved' : 'Save'}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleShare}
                  icon={<Share2 className="w-5 h-5" />}
                >
                  Share
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleWhatsAppInquiry}
                  icon={<MessageCircle className="w-5 h-5" />}
                >
                  Ask
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                <Truck className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-semibold text-sm">Fast Delivery</p>
                  <p className="text-xs text-gray-600">Within 24-48 hours</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                <Shield className="w-6 h-6 text-secondary" />
                <div>
                  <p className="font-semibold text-sm">100% Genuine</p>
                  <p className="text-xs text-gray-600">Quality guaranteed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
          {/* Tab Headers */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('description')}
              className={`flex-1 py-4 font-semibold transition-colors ${
                activeTab === 'description'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-dark'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`flex-1 py-4 font-semibold transition-colors ${
                activeTab === 'reviews'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-dark'
              }`}
            >
              Reviews ({product.reviews || 0})
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'description' ? (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {product.description || 'Fresh, high-quality product sourced from local farmers. Perfect for your daily needs.'}
                </p>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No reviews yet. Be the first to review!
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-dark mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;