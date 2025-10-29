// ✅ Form Validation Functions
// Validate phone numbers, names, passwords, etc.

// 📱 Validate phone number (Nepal)
// Must be 10 digits, starting with 98 or 97
export const validatePhone = (phone) => {
  if (!phone) return { valid: false, error: 'Phone number is required' };
  
  // Remove any spaces or dashes
  const cleaned = phone.replace(/[\s-]/g, '');
  
  // Must be 10 digits
  if (!/^\d{10}$/.test(cleaned)) {
    return { valid: false, error: 'Phone must be 10 digits' };
  }
  
  // Must start with 98 or 97
  if (!cleaned.startsWith('98') && !cleaned.startsWith('97')) {
    return { valid: false, error: 'Invalid Nepal phone number' };
  }
  
  return { valid: true, cleaned };
};

// 👤 Validate name
// At least 2 characters, only letters and spaces
export const validateName = (name) => {
  if (!name) return { valid: false, error: 'Name is required' };
  
  const trimmed = name.trim();
  
  if (trimmed.length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters' };
  }
  
  if (!/^[a-zA-Z\s]+$/.test(trimmed)) {
    return { valid: false, error: 'Name can only contain letters and spaces' };
  }
  
  return { valid: true, value: trimmed };
};

// 🔐 Validate password
// At least 6 characters
export const validatePassword = (password) => {
  if (!password) return { valid: false, error: 'Password is required' };
  
  if (password.length < 6) {
    return { valid: false, error: 'Password must be at least 6 characters' };
  }
  
  return { valid: true };
};

// 🔐 Validate password match
export const validatePasswordMatch = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return { valid: false, error: 'Passwords do not match' };
  }
  return { valid: true };
};

// 🎂 Validate age
// Must be between 13 and 120
export const validateAge = (age) => {
  if (!age) return { valid: false, error: 'Age is required' };
  
  const ageNum = parseInt(age);
  
  if (isNaN(ageNum)) {
    return { valid: false, error: 'Age must be a number' };
  }
  
  if (ageNum < 13) {
    return { valid: false, error: 'You must be at least 13 years old' };
  }
  
  if (ageNum > 120) {
    return { valid: false, error: 'Please enter a valid age' };
  }
  
  return { valid: true, value: ageNum };
};

// 📧 Validate email (optional - for future use)
export const validateEmail = (email) => {
  if (!email) return { valid: false, error: 'Email is required' };
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' };
  }
  
  return { valid: true, value: email.toLowerCase() };
};

// 🏠 Validate address fields
export const validateAddress = (address) => {
  const errors = {};
  
  if (!address.area || address.area.trim() === '') {
    errors.area = 'Area is required';
  }
  
  if (!address.ward) {
    errors.ward = 'Ward number is required';
  }
  
  if (!address.street || address.street.trim() === '') {
    errors.street = 'Street name is required';
  }
  
  if (!address.nearbyPlace || address.nearbyPlace.trim() === '') {
    errors.nearbyPlace = 'Nearby famous place is required';
  }
  
  const hasErrors = Object.keys(errors).length > 0;
  
  return {
    valid: !hasErrors,
    errors: hasErrors ? errors : null
  };
};

// 💳 Validate coupon code
export const validateCouponCode = (code) => {
  if (!code) return { valid: false, error: 'Coupon code is required' };
  
  const cleaned = code.trim().toUpperCase();
  
  if (cleaned.length < 3) {
    return { valid: false, error: 'Invalid coupon code' };
  }
  
  return { valid: true, value: cleaned };
};

// 🔢 Validate quantity
export const validateQuantity = (quantity) => {
  if (!quantity) return { valid: false, error: 'Quantity is required' };
  
  const qty = parseInt(quantity);
  
  if (isNaN(qty) || qty < 1) {
    return { valid: false, error: 'Quantity must be at least 1' };
  }
  
  if (qty > 100) {
    return { valid: false, error: 'Maximum quantity is 100' };
  }
  
  return { valid: true, value: qty };
};

// 💰 Validate price
export const validatePrice = (price) => {
  if (!price) return { valid: false, error: 'Price is required' };
  
  const priceNum = parseFloat(price);
  
  if (isNaN(priceNum) || priceNum <= 0) {
    return { valid: false, error: 'Price must be greater than 0' };
  }
  
  return { valid: true, value: priceNum };
};

// 📦 Validate product name
export const validateProductName = (name) => {
  if (!name) return { valid: false, error: 'Product name is required' };
  
  const trimmed = name.trim();
  
  if (trimmed.length < 3) {
    return { valid: false, error: 'Product name must be at least 3 characters' };
  }
  
  if (trimmed.length > 100) {
    return { valid: false, error: 'Product name is too long (max 100 characters)' };
  }
  
  return { valid: true, value: trimmed };
};

// 📝 Validate text field (general)
export const validateTextField = (value, fieldName, minLength = 1, maxLength = 500) => {
  if (!value) return { valid: false, error: `${fieldName} is required` };
  
  const trimmed = value.trim();
  
  if (trimmed.length < minLength) {
    return { valid: false, error: `${fieldName} must be at least ${minLength} characters` };
  }
  
  if (trimmed.length > maxLength) {
    return { valid: false, error: `${fieldName} is too long (max ${maxLength} characters)` };
  }
  
  return { valid: true, value: trimmed };
};

// 🎯 Validate complete signup form
export const validateSignupForm = (formData) => {
  const errors = {};
  
  // Validate phone
  const phoneValidation = validatePhone(formData.phone);
  if (!phoneValidation.valid) errors.phone = phoneValidation.error;
  
  // Validate name
  const nameValidation = validateName(formData.name);
  if (!nameValidation.valid) errors.name = nameValidation.error;
  
  // Validate age
  const ageValidation = validateAge(formData.age);
  if (!ageValidation.valid) errors.age = ageValidation.error;
  
  // Validate password
  const passwordValidation = validatePassword(formData.password);
  if (!passwordValidation.valid) errors.password = passwordValidation.error;
  
  // Validate address
  const addressValidation = validateAddress(formData.address || {});
  if (!addressValidation.valid) {
    Object.assign(errors, addressValidation.errors);
  }
  
  const hasErrors = Object.keys(errors).length > 0;
  
  return {
    valid: !hasErrors,
    errors: hasErrors ? errors : null
  };
};

// 🎯 Validate complete login form
export const validateLoginForm = (formData) => {
  const errors = {};
  
  // Validate phone
  const phoneValidation = validatePhone(formData.phone.replace(/@admin/i, ''));
  if (!phoneValidation.valid) errors.phone = phoneValidation.error;
  
  // Validate password
  const passwordValidation = validatePassword(formData.password);
  if (!passwordValidation.valid) errors.password = passwordValidation.error;
  
  const hasErrors = Object.keys(errors).length > 0;
  
  return {
    valid: !hasErrors,
    errors: hasErrors ? errors : null
  };
};

export default {
  validatePhone,
  validateName,
  validatePassword,
  validatePasswordMatch,
  validateAge,
  validateEmail,
  validateAddress,
  validateCouponCode,
  validateQuantity,
  validatePrice,
  validateProductName,
  validateTextField,
  validateSignupForm,
  validateLoginForm
};