// 🏷️ Badge Component
// Shows tags like "Best Seller", "10% Off", "Organic", etc.

import React from 'react';

const Badge = ({
  children,           // Badge text
  variant = 'primary', // 'primary', 'secondary', 'success', 'warning', 'danger', 'info'
  size = 'md',        // 'sm', 'md', 'lg'
  icon,               // Optional icon
  className = ''      // Additional CSS
}) => {
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    discount: 'bg-red-500 text-white',
    bestseller: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white',
    organic: 'bg-green-500 text-white',
    new: 'bg-purple-500 text-white'
  };
  
  // Size styles
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  };
  
  return (
    <span 
      className={`
        inline-flex items-center gap-1
        font-medium rounded-full
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
};

// Discount Badge (for products)
export const DiscountBadge = ({ percentage }) => {
  if (!percentage || percentage <= 0) return null;
  
  return (
    <Badge variant="discount" size="sm">
      {percentage}% OFF
    </Badge>
  );
};

// Stock Badge (in stock / out of stock)
export const StockBadge = ({ stock }) => {
  if (stock > 10) {
    return <Badge variant="success" size="sm">In Stock</Badge>;
  } else if (stock > 0) {
    return <Badge variant="warning" size="sm">Only {stock} left!</Badge>;
  } else {
    return <Badge variant="danger" size="sm">Out of Stock</Badge>;
  }
};

// Order Status Badge
export const OrderStatusBadge = ({ status }) => {
  const statusVariants = {
    'Order Placed': 'info',
    'Confirmed': 'primary',
    'Packing': 'warning',
    'Preparing': 'warning',
    'Out for Delivery': 'secondary',
    'Delivered': 'success',
    'Cancelled': 'danger'
  };
  
  return (
    <Badge variant={statusVariants[status] || 'info'} size="sm">
      {status}
    </Badge>
  );
};

// Free Delivery Badge
export const FreeDeliveryBadge = () => {
  return (
    <Badge variant="success" size="sm" icon="🚚">
      Free Delivery
    </Badge>
  );
};

// COD Available Badge
export const CODBadge = () => {
  return (
    <Badge variant="info" size="sm" icon="💵">
      COD Available
    </Badge>
  );
};

// Notification Badge (for cart icon, etc.)
export const NotificationBadge = ({ count, max = 99 }) => {
  if (!count || count <= 0) return null;
  
  const displayCount = count > max ? `${max}+` : count;
  
  return (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5">
      {displayCount}
    </span>
  );
};

export default Badge;

// 📝 Usage Examples:
// <Badge variant="primary">Featured</Badge>
// <Badge variant="bestseller" icon="⭐">Best Seller</Badge>
// <DiscountBadge percentage={20} />
// <StockBadge stock={5} />
// <OrderStatusBadge status="Out for Delivery" />
// <FreeDeliveryBadge />
// <NotificationBadge count={3} />