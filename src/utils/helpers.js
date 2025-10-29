// 🛠️ General Helper Functions
// Miscellaneous utility functions used throughout the app

// ⏱️ Debounce function (for search input)
// Delays execution until user stops typing
export const debounce = (func, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// 📱 Check if device is mobile
export const isMobile = () => {
  return window.innerWidth <= 768;
};

// 📱 Check if device is tablet
export const isTablet = () => {
  return window.innerWidth > 768 && window.innerWidth <= 1024;
};

// 💻 Check if device is desktop
export const isDesktop = () => {
  return window.innerWidth > 1024;
};

// 📋 Copy text to clipboard
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return { success: true };
  } catch (error) {
    console.error('Copy failed:', error);
    return { success: false, error: error.message };
  }
};

// 🔗 Open WhatsApp chat
// Opens WhatsApp with pre-filled message
export const openWhatsApp = (phone, message = '') => {
  const cleanPhone = phone.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
  window.open(url, '_blank');
};

// 📞 Make phone call (mobile only)
export const makePhoneCall = (phone) => {
  const cleanPhone = phone.replace(/\D/g, '');
  window.location.href = `tel:+977${cleanPhone}`;
};

// 📧 Open email client
export const sendEmail = (email, subject = '', body = '') => {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  window.location.href = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
};

// 🖼️ Compress image before upload
export const compressImage = async (file, maxWidth = 800, maxHeight = 800) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Calculate new dimensions
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob((blob) => {
          resolve(new File([blob], file.name, {
            type: 'image/jpeg',
            lastModified: Date.now()
          }));
        }, 'image/jpeg', 0.8);
      };
      
      img.onerror = reject;
      img.src = e.target.result;
    };
    
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// 🎲 Generate random ID
export const generateId = (prefix = 'id') => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// 🔀 Shuffle array (for random product display)
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// 📊 Calculate average rating
export const calculateAverageRating = (ratings) => {
  if (!ratings || ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return sum / ratings.length;
};

// 🎯 Get percentage
export const getPercentage = (value, total) => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

// 📦 Group array by property
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const group = item[key];
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(item);
    return result;
  }, {});
};

// 🔍 Deep clone object
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// ⏰ Sleep/delay function
export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// 📱 Detect if PWA is installed
export const isPWAInstalled = () => {
  return window.matchMedia('(display-mode: standalone)').matches;
};

// 🔔 Show browser notification (if permission granted)
export const showNotification = async (title, options = {}) => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      icon: '/logo.png',
      badge: '/logo.png',
      ...options
    });
  } else if ('Notification' in window && Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      new Notification(title, options);
    }
  }
};

// 🎨 Generate color from string (for avatars)
export const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const colors = [
    '#FF6B00', // Orange
    '#00B894', // Green
    '#FDCB6E', // Yellow
    '#6C5CE7', // Purple
    '#00B8D4', // Cyan
    '#E84393', // Pink
    '#FD79A8', // Light Pink
    '#A29BFE'  // Light Purple
  ];
  
  return colors[Math.abs(hash) % colors.length];
};

// 🔄 Retry failed function
export const retry = async (fn, maxRetries = 3, delay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await sleep(delay);
    }
  }
};

// 📏 Clamp number between min and max
export const clamp = (num, min, max) => {
  return Math.min(Math.max(num, min), max);
};

// 🎯 Check if object is empty
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

// 🔤 Capitalize first letter
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// 🔤 Capitalize each word
export const capitalizeWords = (str) => {
  if (!str) return '';
  return str.split(' ').map(capitalize).join(' ');
};

// 📦 Remove duplicates from array
export const removeDuplicates = (array, key = null) => {
  if (!key) {
    return [...new Set(array)];
  }
  
  const seen = new Set();
  return array.filter(item => {
    const k = item[key];
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
};

// 🎲 Get random items from array
export const getRandomItems = (array, count) => {
  const shuffled = shuffleArray(array);
  return shuffled.slice(0, count);
};

// 📊 Sort array by property
export const sortBy = (array, key, order = 'asc') => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (order === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });
};

// 🔍 Search array of objects
export const searchArray = (array, searchTerm, keys) => {
  const term = searchTerm.toLowerCase();
  return array.filter(item => {
    return keys.some(key => {
      const value = item[key];
      return value && value.toString().toLowerCase().includes(term);
    });
  });
};

// 💾 Local storage helpers with error handling
export const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Storage set error:', error);
      return false;
    }
  },
  
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Storage get error:', error);
      return defaultValue;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Storage remove error:', error);
      return false;
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Storage clear error:', error);
      return false;
    }
  }
};

export default {
  debounce,
  isMobile,
  isTablet,
  isDesktop,
  copyToClipboard,
  openWhatsApp,
  makePhoneCall,
  sendEmail,
  compressImage,
  generateId,
  shuffleArray,
  calculateAverageRating,
  getPercentage,
  groupBy,
  deepClone,
  sleep,
  isPWAInstalled,
  showNotification,
  stringToColor,
  retry,
  clamp,
  isEmpty,
  capitalize,
  capitalizeWords,
  removeDuplicates,
  getRandomItems,
  sortBy,
  searchArray,
  storage
};