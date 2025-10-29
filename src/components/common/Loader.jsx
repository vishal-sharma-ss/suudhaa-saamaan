// ⏳ Loading Spinner Component
// Usage: <Loader /> or <Loader fullScreen text="Loading products..." />

import React from 'react';

const Loader = ({ 
  size = 'md',        // 'sm', 'md', 'lg'
  fullScreen = false, // Show as fullscreen overlay?
  text = '',          // Loading text to display
  variant = 'spinner' // 'spinner', 'dots', 'pulse'
}) => {
  
  // Size styles
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };
  
  // Spinner Component
  const SpinnerLoader = () => (
    <svg 
      className={`animate-spin ${sizes[size]} text-primary`}
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
  );
  
  // Dots Loader Component
  const DotsLoader = () => (
    <div className="flex gap-2">
      <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  );
  
  // Pulse Loader Component
  const PulseLoader = () => (
    <div className={`${sizes[size]} bg-primary rounded-full animate-pulse`} />
  );
  
  // Select loader type
  const LoaderComponent = () => {
    switch (variant) {
      case 'dots':
        return <DotsLoader />;
      case 'pulse':
        return <PulseLoader />;
      default:
        return <SpinnerLoader />;
    }
  };
  
  // Loader content
  const loaderContent = (
    <div className="flex flex-col items-center justify-center gap-4">
      <LoaderComponent />
      {text && (
        <p className="text-gray-600 text-sm md:text-base animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
  
  // Fullscreen overlay version
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm z-50 flex items-center justify-center">
        {loaderContent}
      </div>
    );
  }
  
  // Inline version
  return (
    <div className="flex items-center justify-center p-8">
      {loaderContent}
    </div>
  );
};

// Skeleton Loader for content placeholders
export const SkeletonLoader = ({ 
  count = 1,        // Number of skeleton items
  height = '20px',  // Height of each skeleton
  className = ''    // Additional CSS
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-200 rounded animate-pulse"
          style={{ height }}
        />
      ))}
    </div>
  );
};

// Product Card Skeleton (for product grids)
export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-48 bg-gray-200 rounded-lg mb-4" />
      
      {/* Title skeleton */}
      <div className="h-5 bg-gray-200 rounded mb-3 w-3/4" />
      
      {/* Price skeleton */}
      <div className="h-6 bg-gray-200 rounded mb-4 w-1/2" />
      
      {/* Button skeleton */}
      <div className="h-10 bg-gray-200 rounded w-full" />
    </div>
  );
};

export default Loader;

// 📝 Usage Examples:
// <Loader /> - Simple spinner
// <Loader size="lg" text="Loading products..." /> - Large with text
// <Loader fullScreen text="Processing your order..." /> - Fullscreen overlay
// <Loader variant="dots" /> - Dots animation
// <SkeletonLoader count={5} height="60px" /> - Skeleton list
// <ProductCardSkeleton /> - Product placeholder