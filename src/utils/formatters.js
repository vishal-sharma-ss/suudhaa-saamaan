// 🛠️ Formatting Utility Functions
// Format prices, dates, phone numbers, etc.

// 💰 Format price in Nepali Rupees
// Example: 1234.5 → "Rs. 1,234.50"
export const formatPrice = (amount) => {
  if (typeof amount !== 'number') return 'Rs. 0';
  return `Rs. ${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

// 📅 Format date to readable format
// Example: "2025-10-29T12:30:00" → "Oct 29, 2025"
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

// 📅 Format date and time
// Example: "2025-10-29T12:30:00" → "Oct 29, 2025 at 12:30 PM"
export const formatDateTime = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  const timeOptions = { hour: '2-digit', minute: '2-digit' };
  
  const datePart = date.toLocaleDateString('en-US', dateOptions);
  const timePart = date.toLocaleTimeString('en-US', timeOptions);
  
  return `${datePart} at ${timePart}`;
};

// 📅 Format relative time
// Example: "2025-10-29" → "2 days ago" or "in 3 days"
export const formatRelativeTime = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  
  return formatDate(dateString);
};

// 📱 Format phone number
// Example: "9821072912" → "+977 982-1072912"
export const formatPhone = (phone) => {
  if (!phone) return '';
  
  // Remove any non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Add Nepal country code if not present
  const withCode = cleaned.startsWith('977') ? cleaned : `977${cleaned}`;
  
  // Format: +977 XXX-XXXXXXX
  return `+${withCode.slice(0, 3)} ${withCode.slice(3, 6)}-${withCode.slice(6)}`;
};

// 🔢 Format number with commas
// Example: 1234567 → "1,234,567"
export const formatNumber = (num) => {
  if (typeof num !== 'number') return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// 📦 Format order ID
// Example: Generate order ID in format: YYYYMMDD_Ward_PhoneLast2_Serial
// Example: 20251029_02_12_001
export const generateOrderId = (ward, phone) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  // Get last 2 digits of phone
  const phoneLast2 = phone.slice(-2);
  
  // Format ward with leading zero
  const wardFormatted = String(ward).padStart(2, '0');
  
  // Generate random serial number (3 digits)
  const serial = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
  
  return `${year}${month}${day}_${wardFormatted}_${phoneLast2}_${serial}`;
};

// ✂️ Truncate text with ellipsis
// Example: "Long text here..." (maxLength: 10) → "Long text..."
export const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// 🎨 Get initials from name
// Example: "Vishal Sharma" → "VS"
export const getInitials = (name) => {
  if (!name) return '';
  
  const words = name.trim().split(' ');
  if (words.length === 1) return words[0].charAt(0).toUpperCase();
  
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
};

// 📊 Calculate discount percentage
// Example: (200, 180) → "10% off"
export const calculateDiscountPercent = (originalPrice, discountedPrice) => {
  if (!originalPrice || !discountedPrice) return '';
  if (originalPrice <= discountedPrice) return '';
  
  const percent = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  return `${percent}% off`;
};

// 🎯 Format address
// Combines address parts into readable format
export const formatAddress = (address) => {
  if (!address) return '';
  
  const parts = [
    address.houseNo,
    address.street,
    address.area,
    `Ward ${address.ward}`,
    address.city || 'Butwal'
  ].filter(Boolean);
  
  return parts.join(', ');
};

// 🔍 Format search query
// Clean and prepare search query
export const formatSearchQuery = (query) => {
  if (!query) return '';
  return query.trim().toLowerCase();
};

// ⭐ Format rating
// Example: 4.6789 → "4.7"
export const formatRating = (rating) => {
  if (typeof rating !== 'number') return '0.0';
  return rating.toFixed(1);
};

// 🛒 Format quantity
// Add "kg", "pc", etc. based on unit
export const formatQuantity = (quantity, unit = 'pc') => {
  if (!quantity) return '0';
  return `${quantity} ${unit}`;
};

export default {
  formatPrice,
  formatDate,
  formatDateTime,
  formatRelativeTime,
  formatPhone,
  formatNumber,
  generateOrderId,
  truncateText,
  getInitials,
  calculateDiscountPercent,
  formatAddress,
  formatSearchQuery,
  formatRating,
  formatQuantity
};