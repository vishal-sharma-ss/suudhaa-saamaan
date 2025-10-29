// 🪟 Modal/Popup Component
// Usage: <Modal isOpen={true} onClose={() => setIsOpen(false)}>Content</Modal>

import React, { useEffect } from 'react';

const Modal = ({
  isOpen,             // Is modal visible?
  onClose,            // Function to close modal
  title,              // Modal title
  children,           // Modal content
  footer,             // Footer content (buttons, etc.)
  size = 'md',        // 'sm', 'md', 'lg', 'xl', 'full'
  closeOnOutsideClick = true, // Close when clicking backdrop?
  showCloseButton = true,     // Show X button?
  className = ''      // Additional CSS
}) => {
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);
  
  // Don't render if not open
  if (!isOpen) return null;
  
  // Size styles
  const sizeStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4'
  };
  
  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (closeOnOutsideClick && e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdropClick}
    >
      {/* Modal Container */}
      <div 
        className={`
          bg-white rounded-2xl shadow-2xl 
          w-full ${sizeStyles[size]}
          max-h-[90vh] overflow-y-auto
          animate-slide-up
          ${className}
        `}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            {/* Title */}
            {title && (
              <h2 className="text-xl md:text-2xl font-semibold text-dark">
                {title}
              </h2>
            )}
            
            {/* Close Button */}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}
        
        {/* Body */}
        <div className="p-6">
          {children}
        </div>
        
        {/* Footer */}
        {footer && (
          <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

// Confirmation Modal (for delete, logout, etc.)
export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger' // 'danger', 'warning', 'info'
}) => {
  
  const variantStyles = {
    danger: 'bg-red-500 hover:bg-red-600',
    warning: 'bg-yellow-500 hover:bg-yellow-600',
    info: 'bg-primary hover:bg-orange-600'
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${variantStyles[variant]}`}
          >
            {confirmText}
          </button>
        </div>
      }
    >
      <p className="text-gray-600">{message}</p>
    </Modal>
  );
};

export default Modal;

// 📝 Usage Examples:
// const [isOpen, setIsOpen] = useState(false);
// 
// <Modal 
//   isOpen={isOpen} 
//   onClose={() => setIsOpen(false)}
//   title="Product Details"
//   footer={<Button onClick={() => setIsOpen(false)}>Close</Button>}
// >
//   <p>Modal content here...</p>
// </Modal>
//
// <ConfirmModal
//   isOpen={showConfirm}
//   onClose={() => setShowConfirm(false)}
//   onConfirm={handleDelete}
//   title="Delete Product"
//   message="Are you sure you want to delete this product?"
//   confirmText="Delete"
//   variant="danger"
// />