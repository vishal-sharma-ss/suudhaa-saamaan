// 📝 Reusable Input Component
// Usage: <Input label="Phone Number" placeholder="9821072912" />

import React, { useState } from 'react';

const Input = ({
  label,              // Input label text
  type = 'text',      // Input type (text, password, email, number, tel)
  placeholder,        // Placeholder text
  value,              // Input value (controlled)
  onChange,           // Change handler
  error,              // Error message to display
  disabled = false,   // Disable input?
  required = false,   // Required field?
  icon,               // Icon component (optional)
  helperText,         // Helper text below input
  maxLength,          // Maximum character length
  showPasswordToggle = false, // Show/hide password toggle for password inputs
  className = '',     // Additional CSS classes
  ...props            // Other HTML input props
}) => {
  
  const [showPassword, setShowPassword] = useState(false);
  
  // Determine actual input type (for password toggle)
  const inputType = type === 'password' && showPassword ? 'text' : type;
  
  // Base input styles
  const baseStyles = 'w-full px-4 py-3 border rounded-lg transition-all duration-200';
  
  // Border styles (error vs normal)
  const borderStyles = error 
    ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
    : 'border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20';
  
  // Disabled styles
  const disabledStyles = disabled 
    ? 'bg-gray-100 cursor-not-allowed opacity-60' 
    : 'bg-white';
  
  // Icon padding (if icon exists)
  const iconPadding = icon ? 'pl-12' : '';
  
  // Combine all input styles
  const inputClasses = `
    ${baseStyles}
    ${borderStyles}
    ${disabledStyles}
    ${iconPadding}
    focus:outline-none
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {/* Input Container */}
      <div className="relative">
        {/* Icon (left side) */}
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        
        {/* Input Field */}
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          className={inputClasses}
          {...props}
        />
        
        {/* Password Toggle (right side) */}
        {type === 'password' && showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              // Eye slash icon (hide)
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              // Eye icon (show)
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        )}
        
        {/* Character Count (if maxLength set) */}
        {maxLength && value && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
            {value.length}/{maxLength}
          </div>
        )}
      </div>
      
      {/* Error Message */}
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      
      {/* Helper Text */}
      {!error && helperText && (
        <p className="mt-2 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default Input;

// 📝 Usage Examples:
// <Input label="Phone Number" placeholder="9821072912" type="tel" required />
// <Input label="Password" type="password" showPasswordToggle />
// <Input label="Name" icon={<UserIcon />} />
// <Input label="Message" error="This field is required" />