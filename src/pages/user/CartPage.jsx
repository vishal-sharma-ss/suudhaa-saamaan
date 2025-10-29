// 🛒 Shopping Cart Page - Advanced & Interactive
// With animations, delivery options, coupons

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Truck } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';
import Button from '../../components/common/Button';
import { DELIVERY_TYPES, SAMPLE_COUPONS } from '../../utils/constants';
import { useToast } from '../../components/common/Toast';

const CartPage = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    subtotal, 
    deliveryFee, 
    discount, 
    total,
    deliveryType,
    setDeliveryType,
    appliedCoupon,
    setAppliedCoupon,
    amountForFreeDelivery
  } = useCart();
  const { success, error: showError } = useToast();

  const [couponCode, setCouponCode] = useState('');
  const [removingItem, setRemovingItem] = useState(null);

  // Handle remove with animation
  const handleRemove = (productId, variation) => {
    setRemovingItem(`${productId}-${variation}`);
    setTimeout(() => {
      removeFromCart(productId, variation);
      success('Item removed from cart');
      setRemovingItem(null);
    }, 300);
  };

  // Apply coupon
  const handleApplyCoupon = () => {
    const coupon = SAMPLE_COUPONS.find(
      c => c.code.toLowerCase() === couponCode.toLowerCase()
    );
    
    if (coupon) {
      if (subtotal >= coupon.minOrder) {
        setAppliedCoupon(coupon);
        success(`✨ Coupon applied! ${coupon.percentage}% off`);
        setCouponCode('');
      } else {
        showError(`Minimum order of ${formatPrice(coupon.minOrder)} required`);
      }
    } else {
      showError('Invalid coupon code');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-16 h-16 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-dark mb-3">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Start adding some delicious products!</p>
          <Button variant="primary" size="lg" onClick={() => navigate('/categories')}>
            Start Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-dark">
            Shopping Cart ({cart.length} items)
          </h1>
          <button
            onClick={() => {
              if (window.confirm('Clear entire cart?')) {
                clearCart();
                success('Cart cleared');
              }
            }}
            className="text-red-500 hover:text-red-600 text-sm font-medium"
          >
            Clear All
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT: Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={`${item.productId}-${item.variation}`}
                className={`bg-white rounded-xl shadow-md p-6 transition-all duration-300 ${
                  removingItem === `${item.productId}-${item.variation}` 
                    ? 'opacity-0 scale-95' 
                    : 'opacity-100 scale-100'
                }`}
              >
                <div className="flex gap-6">
                  
                  {/* Image */}
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-dark mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {item.variation}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemove(item.productId, item.variation)}
                        className="text-red-500 hover:text-red-600 p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity Selector */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.productId, item.variation, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.variation, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatPrice(item.price)} each
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              {/* Delivery Type Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3">Delivery Type:</label>
                <div className="space-y-2">
                  {Object.values(DELIVERY_TYPES).map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setDeliveryType(type.id)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        deliveryType === type.id
                          ? 'border-primary bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold">{type.name}</span>
                        <span className="font-bold text-primary">
                          {type.getFee(subtotal) === 0 ? 'FREE' : formatPrice(type.getFee(subtotal))}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Free Delivery Progress */}
              {deliveryType === 'standard' && amountForFreeDelivery > 0 && (
                <div className="mb-6 p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-700 font-medium">
                    🎉 Add {formatPrice(amountForFreeDelivery)} more for FREE delivery!
                  </p>
                  <div className="mt-2 bg-white rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-green-500 h-full transition-all duration-300"
                      style={{ width: `${(subtotal / 499) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Coupon Code */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Coupon Code:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Enter code"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                  <Button
                    variant="outline"
                    onClick={handleApplyCoupon}
                    disabled={!couponCode}
                  >
                    Apply
                  </Button>
                </div>
                {appliedCoupon && (
                  <div className="mt-2 flex items-center justify-between text-sm text-green-600">
                    <span>✓ {appliedCoupon.code} applied</span>
                    <button
                      onClick={() => setAppliedCoupon(null)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 pb-4 border-b border-gray-200">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal:</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Delivery Fee:</span>
                  <span className="font-semibold">
                    {deliveryFee === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      formatPrice(deliveryFee)
                    )}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span className="font-semibold">-{formatPrice(discount)}</span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center py-4 mb-6">
                <span className="text-xl font-bold">Total:</span>
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(total)}
                </span>
              </div>

              {/* Checkout Button */}
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => navigate('/checkout')}
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Proceed to Checkout
              </Button>

              {/* Trust Badges */}
              <div className="mt-6 space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-primary" />
                  <span>Free delivery on orders above Rs. 499</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-primary" />
                  <span>Cash on Delivery available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;