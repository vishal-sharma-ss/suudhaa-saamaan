// 🔘 Reusable Button Component
// Usage: <Button variant="primary" onClick={handleClick}>Click Me</Button>

import React from 'react';

const Button = ({ 
  children,           // Button text/content
  variant = 'primary', // 'primary', 'secondary', 'outline', 'danger'
  size = 'md',        // 'sm', 'md', 'lg'
  fullWidth = false,  // Make button full width?
  disabled = false,   // Disable button?
  loading = false,    // Show loading spinner?
  icon = null,        // Icon component (optional)
  onClick,            // Click handler
  type = 'button',    // 'button', 'submit', 'reset'
  className = '',     // Additional CSS classes
  ...props            // Other HTML button props
}) => {
  
  // Base styles (always applied)
  const baseStyles = 'font-medium rounded-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-2';
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-orange-600 shadow-md hover:shadow-lg',
    secondary: 'bg-secondary text-white hover:bg-green-600 shadow-md hover:shadow-lg',
    outline: 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-lg',
    ghost: 'bg-transparent text-primary hover:bg-gray-100'
  };
  
  // Size styles
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  // Disabled/loading styles
  const disabledStyles = (disabled || loading) 
    ? 'opacity-50 cursor-not-allowed pointer-events-none' 
    : 'cursor-pointer';
  
  // Full width style
  const widthStyle = fullWidth ? 'w-full' : '';
  
  // Combine all styles
  const buttonClasses = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${disabledStyles}
    ${widthStyle}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {/* Loading Spinner */}
      {loading && (
        <svg 
          className="animate-spin h-5 w-5" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      
      {/* Icon (if provided) */}
      {!loading && icon && <span>{icon}</span>}
      
      {/* Button Text */}
      <span>{children}</span>
    </button>
  );
};

export default Button;

// 📝 Usage Examples:
// <Button variant="primary" onClick={() => alert('Clicked!')}>Shop Now</Button>
// <Button variant="secondary" size="lg" fullWidth>Add to Cart</Button>
// <Button variant="outline" loading>Processing...</Button>
// <Button variant="danger" icon={<TrashIcon />}>Delete</Button>