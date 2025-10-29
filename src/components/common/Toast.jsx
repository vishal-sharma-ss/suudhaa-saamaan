// 🔔 Toast Notification Component
// Shows success/error/info messages

import React, { useEffect } from 'react';

const Toast = ({ 
  message,              // Message text
  type = 'success',     // 'success', 'error', 'warning', 'info'
  duration = 3000,      // Auto-hide after milliseconds (0 = no auto-hide)
  onClose,              // Callback when toast closes
  position = 'top-right' // 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-center'
}) => {
  
  // Auto-hide after duration
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose && onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);
  
  // Type configurations
  const typeConfig = {
    success: {
      bg: 'bg-green-500',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )
    },
    error: {
      bg: 'bg-red-500',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      )
    },
    warning: {
      bg: 'bg-yellow-500',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      )
    },
    info: {
      bg: 'bg-blue-500',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      )
    }
  };
  
  // Position styles
  const positionStyles = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4'
  };
  
  const config = typeConfig[type];
  
  return (
    <div 
      className={`
        fixed ${positionStyles[position]} z-50
        ${config.bg} text-white
        px-6 py-4 rounded-lg shadow-2xl
        flex items-center gap-3
        animate-slide-up
        max-w-md
      `}
    >
      {/* Icon */}
      <div className="flex-shrink-0">
        {config.icon}
      </div>
      
      {/* Message */}
      <p className="flex-1 text-sm md:text-base font-medium">
        {message}
      </p>
      
      {/* Close Button */}
      <button
        onClick={onClose}
        className="flex-shrink-0 hover:bg-white hover:bg-opacity-20 rounded p-1 transition-colors"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

// Toast Container - manages multiple toasts
export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <>
      {toasts.map((toast, index) => (
        <Toast
          key={toast.id || index}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          position={toast.position}
          onClose={() => removeToast(toast.id || index)}
        />
      ))}
    </>
  );
};

// Hook to use toasts (simple implementation)
export const useToast = () => {
  const [toasts, setToasts] = React.useState([]);
  
  const showToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, duration }]);
    
    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  };
  
  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };
  
  return {
    toasts,
    showToast,
    removeToast,
    success: (message, duration) => showToast(message, 'success', duration),
    error: (message, duration) => showToast(message, 'error', duration),
    warning: (message, duration) => showToast(message, 'warning', duration),
    info: (message, duration) => showToast(message, 'info', duration)
  };
};

export default Toast;

// 📝 Usage Examples:
// const { toasts, success, error, removeToast } = useToast();
// 
// <button onClick={() => success('Item added to cart!')}>Add</button>
// <button onClick={() => error('Failed to load products')}>Error</button>
// 
// <ToastContainer toasts={toasts} removeToast={removeToast} />