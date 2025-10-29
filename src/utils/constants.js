// 🎯 App-wide Constants
// All constant values used throughout the app in one place
// Easy to update prices, statuses, etc.

// 🚚 Delivery Options
export const DELIVERY_TYPES = {
  STANDARD: {
    id: 'standard',
    name: 'Standard Delivery',
    description: '24-48 hours',
    price: 49,
    freeAbove: 499,
    getFee: (subtotal) => subtotal >= 499 ? 0 : 49
  },
  EXPRESS: {
    id: 'express',
    name: 'Express Delivery',
    description: 'Same day',
    price: 99,
    freeAbove: null,
    getFee: () => 99
  },
  EMERGENCY: {
    id: 'emergency',
    name: 'Emergency Delivery',
    description: 'Within hours',
    price: 149,
    freeAbove: null,
    getFee: () => 149
  }
};

// 📦 Order Status Flow
export const ORDER_STATUSES = [
  'Order Placed',
  'Confirmed',
  'Packing',
  'Preparing',
  'Out for Delivery',
  'Delivered'
];

// 📦 Order Status Colors (for UI)
export const ORDER_STATUS_COLORS = {
  'Order Placed': 'bg-blue-100 text-blue-800',
  'Confirmed': 'bg-purple-100 text-purple-800',
  'Packing': 'bg-yellow-100 text-yellow-800',
  'Preparing': 'bg-orange-100 text-orange-800',
  'Out for Delivery': 'bg-indigo-100 text-indigo-800',
  'Delivered': 'bg-green-100 text-green-800',
  'Cancelled': 'bg-red-100 text-red-800'
};

// 🏷️ Product Categories
export const CATEGORIES = [
  { id: 'rice', name: 'Rice (चामल)', icon: '🌾' },
  { id: 'dal', name: 'Pulses (दाल)', icon: '🫘' },
  { id: 'oil', name: 'Cooking Oil (तेल)', icon: '🛢️' },
  { id: 'spices', name: 'Spices (मसला)', icon: '🌶️' },
  { id: 'vegetables', name: 'Vegetables (तरकारी)', icon: '🥕' },
  { id: 'dairy', name: 'Dairy (दुग्ध)', icon: '🥛' },
  { id: 'flour', name: 'Flour (पिठो)', icon: '🌾' },
  { id: 'snacks', name: 'Snacks (खाजा)', icon: '🍪' }
];

// 🏙️ Butwal Wards (for address selection)
export const BUTWAL_WARDS = Array.from({ length: 19 }, (_, i) => ({
  value: i + 1,
  label: `Ward ${i + 1}`
}));

// 📍 Popular Areas in Butwal
export const BUTWAL_AREAS = [
  'Traffic Chowk',
  'Haatbazar',
  'Milanchowk',
  'Amarpath',
  'Kalikanagar',
  'Devinagar',
  'Golpark',
  'Bhanu Chowk',
  'Nirmal Chowk',
  'Siddhartha Nagar'
];

// 💳 Payment Methods
export const PAYMENT_METHODS = {
  COD: {
    id: 'cod',
    name: 'Cash on Delivery',
    description: 'Pay when you receive',
    available: true
  },
  ESEWA: {
    id: 'esewa',
    name: 'eSewa',
    description: 'Digital wallet',
    available: false, // Coming soon
    logo: '/images/esewa-logo.png'
  },
  KHALTI: {
    id: 'khalti',
    name: 'Khalti',
    description: 'Digital wallet',
    available: false, // Coming soon
    logo: '/images/khalti-logo.png'
  }
};

// 🎟️ Sample Coupons (for testing - will come from database later)
export const SAMPLE_COUPONS = [
  {
    code: 'FIRST10',
    percentage: 10,
    description: 'First order 10% off',
    minOrder: 0
  },
  {
    code: 'SAVE50',
    percentage: 5,
    description: '5% off on orders above Rs. 500',
    minOrder: 500
  }
];

// 📱 Contact Information
export const CONTACT_INFO = {
  phone: '+977 9821072912',
  whatsapp: '+977 9821072912',
  email: 'contact@suudhaasaamaan.com',
  instagram: 'https://www.instagram.com/sharma_vishal_o',
  facebook: '#',
  youtube: '#',
  address: 'Butwal, Rupandehi, Nepal'
};

// 🎨 Why Choose Us Points
export const WHY_CHOOSE_US = [
  {
    icon: '🛒',
    title: 'One-Click Shopping',
    description: 'Easy and fast purchase process'
  },
  {
    icon: '🚚',
    title: 'Free Delivery',
    description: 'On orders above Rs. 499'
  },
  {
    icon: '✅',
    title: '100% Genuine',
    description: 'Pure & original products'
  },
  {
    icon: '💵',
    title: 'Cash on Delivery',
    description: 'Pay when you receive'
  },
  {
    icon: '⏰',
    title: '24/7 Support',
    description: 'We are always here to help'
  },
  {
    icon: '🏪',
    title: 'Verified Suppliers',
    description: 'Trusted local vendors'
  },
  {
    icon: '🌾',
    title: 'Support Local',
    description: 'Help local farmers & businesses'
  },
  {
    icon: '🎯',
    title: 'Quality Guarantee',
    description: 'Top-quality products always'
  }
];

// 🎞️ Hero Slider Images (placeholder URLs - replace with your actual images)
export const HERO_SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
    title: 'Fresh Groceries',
    subtitle: 'Delivered to Your Door',
    cta: 'Shop Now',
    link: '/shop'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=800',
    title: 'Organic & Pure',
    subtitle: 'Directly from Local Farms',
    cta: 'Explore',
    link: '/categories'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=800',
    title: 'Special Offers',
    subtitle: 'Save More Every Day',
    cta: 'View Deals',
    link: '/offers'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1579113800032-c38bd7635818?w=800',
    title: 'Fast Delivery',
    subtitle: 'Same Day & Emergency Options',
    cta: 'Order Now',
    link: '/shop'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800',
    title: 'Support Local',
    subtitle: 'Empower Butwal Farmers',
    cta: 'Learn More',
    link: '/about'
  }
];

// 🎪 Banner Slider Images
export const BANNER_SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=600&h=200&fit=crop',
    link: '/categories/rice'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1596040033229-a0b3b4ae1f02?w=600&h=200&fit=crop',
    link: '/categories/vegetables'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1506617420156-8e4536971650?w=600&h=200&fit=crop',
    link: '/categories/spices'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&h=200&fit=crop',
    link: '/categories/oil'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=200&fit=crop',
    link: '/categories/dairy'
  }
];

// 📊 Sample Products Data (for initial testing - will be replaced with Firebase data)
export const SAMPLE_PRODUCTS = [
  {
    id: 'prod_001',
    name: 'Basmati Rice',
    nameNepali: 'बासमती चामल',
    category: 'rice',
    price: 180,
    originalPrice: 200,
    discount: 10,
    unit: 'kg',
    variations: ['1kg', '5kg', '10kg'],
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
      'https://images.unsplash.com/photo-1596040033229-a0b3b4ae1f02?w=400'
    ],
    description: 'Premium quality basmati rice from local farms',
    stock: 50,
    featured: true,
    badges: ['Best Seller', 'Organic']
  },
  // Add more sample products as needed
];

export default {
  DELIVERY_TYPES,
  ORDER_STATUSES,
  ORDER_STATUS_COLORS,
  CATEGORIES,
  BUTWAL_WARDS,
  BUTWAL_AREAS,
  PAYMENT_METHODS,
  CONTACT_INFO,
  WHY_CHOOSE_US,
  HERO_SLIDES,
  BANNER_SLIDES,
  SAMPLE_PRODUCTS
};