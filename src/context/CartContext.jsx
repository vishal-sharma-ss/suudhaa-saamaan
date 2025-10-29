// 🛒 Shopping Cart Context
// Manages cart items, add/remove products, calculate totals
// Persists cart in localStorage so it survives page refresh

import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

// Custom hook to use cart context
// Usage: const { cart, addToCart, removeFromCart, cartTotal } = useCart();
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  // Cart state: array of items with { productId, name, price, quantity, image, variation }
  const [cart, setCart] = useState([]);
  
  // Delivery type: 'standard' (free above 499), 'express' (99), 'emergency' (149)
  const [deliveryType, setDeliveryType] = useState('standard');
  
  // Applied coupon
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('suudhaa_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('suudhaa_cart', JSON.stringify(cart));
  }, [cart]);

  // ➕ Add item to cart
  const addToCart = (product) => {
    setCart(prevCart => {
      // Check if product already in cart
      const existingItem = prevCart.find(item => 
        item.productId === product.productId && 
        item.variation === product.variation
      );

      if (existingItem) {
        // Increase quantity
        return prevCart.map(item =>
          item.productId === product.productId && item.variation === product.variation
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // ➖ Remove item from cart
  const removeFromCart = (productId, variation) => {
    setCart(prevCart => 
      prevCart.filter(item => 
        !(item.productId === productId && item.variation === variation)
      )
    );
  };

  // 🔢 Update item quantity
  const updateQuantity = (productId, variation, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, variation);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.productId === productId && item.variation === variation
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // 🗑️ Clear entire cart
  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // 💰 Calculate subtotal (sum of all items)
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // 🚚 Calculate delivery fee
  const getDeliveryFee = () => {
    if (deliveryType === 'standard') {
      return subtotal >= 499 ? 0 : 49;  // Free above 499
    } else if (deliveryType === 'express') {
      return 99;
    } else if (deliveryType === 'emergency') {
      return 149;
    }
    return 0;
  };

  const deliveryFee = getDeliveryFee();

  // 🎟️ Calculate discount from coupon
  const discount = appliedCoupon 
    ? (subtotal * appliedCoupon.percentage) / 100 
    : 0;

  // 💵 Calculate final total
  const total = subtotal + deliveryFee - discount;

  // 🎯 How much more needed for free delivery?
  const amountForFreeDelivery = deliveryType === 'standard' && subtotal < 499
    ? 499 - subtotal
    : 0;

  // Context value
  const value = {
    cart,                           // Array of cart items
    cartItemCount: cart.length,     // Number of unique items
    addToCart,                      // Function to add item
    removeFromCart,                 // Function to remove item
    updateQuantity,                 // Function to change quantity
    clearCart,                      // Function to empty cart
    
    // Pricing
    subtotal,                       // Total before fees/discounts
    deliveryFee,                    // Delivery charge
    discount,                       // Coupon discount amount
    total,                          // Final total
    amountForFreeDelivery,          // How much more to spend for free delivery
    
    // Delivery
    deliveryType,                   // Current delivery type
    setDeliveryType,                // Function to change delivery type
    
    // Coupons
    appliedCoupon,                  // Current applied coupon
    setAppliedCoupon,               // Function to apply coupon
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};