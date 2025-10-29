// 💳 Checkout Page - Complete Order Flow

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { createOrder } from '../../firebase/firestore';
import { formatPrice, generateOrderId } from '../../utils/formatters';
import { validateAddress } from '../../utils/validation';
import { BUTWAL_WARDS, BUTWAL_AREAS, PAYMENT_METHODS } from '../../utils/constants';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { ShieldCheck, CreditCard } from 'lucide-react';
import { useToast } from '../../components/common/Toast';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, total, clearCart, deliveryType, deliveryFee } = useCart();
  const { isLoggedIn, userData } = useAuth();
  const { success, error: showError } = useToast();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: userData?.name || '',
    phone: userData?.phone || '',
    address: {
      city: 'Butwal',
      area: userData?.address?.area || '',
      ward: userData?.address?.ward || '',
      street: userData?.address?.street || '',
      houseNo: userData?.address?.houseNo || '',
      nearbyPlace: userData?.address?.nearbyPlace || ''
    },
    paymentMethod: 'cod'
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData({
        ...formData,
        [parent]: { ...formData[parent], [child]: value }
      });
    } else {
      setFormData({ ...formData, [field]: value });
    }
    // Clear error for this field
    setErrors({ ...errors, [field]: '' });
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Name is required';
    }
    
    if (!formData.phone || formData.phone.length !== 10) {
      newErrors.phone = 'Valid 10-digit phone required';
    }

    const addressValidation = validateAddress(formData.address);
    if (!addressValidation.valid) {
      Object.assign(newErrors, addressValidation.errors);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Place order
  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      showError('Please fill all required fields');
      return;
    }

    if (!isLoggedIn) {
      showError('Please login to place order');
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }

    setLoading(true);

    try {
      // Generate order ID
      const orderId = generateOrderId(formData.address.ward, formData.phone);

      // Create order object
      const orderData = {
        orderId,
        userId: userData.uid,
        customerName: formData.fullName,
        customerPhone: formData.phone,
        deliveryAddress: formData.address,
        items: cart,
        deliveryType,
        deliveryFee,
        total,
        paymentMethod: formData.paymentMethod,
        status: 'Order Placed',
        createdAt: new Date().toISOString()
      };

      // Save to Firestore
      const result = await createOrder(orderData);

      if (result.success) {
        clearCart();
        success('🎉 Order placed successfully!');
        navigate('/customer/orders');
      } else {
        showError('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Order error:', error);
      showError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        
        <h1 className="text-3xl md:text-4xl font-bold text-dark mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT: Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Customer Information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Customer Information</h2>
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  placeholder="Vishal Sharma"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  error={errors.fullName}
                  required
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="9821072912"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  error={errors.phone}
                  maxLength={10}
                  required
                />
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
              <div className="space-y-4">
                
                {/* City (locked) */}
                <Input
                  label="City"
                  value="Butwal"
                  disabled
                />

                {/* Area */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Area <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.address.area}
                    onChange={(e) => handleChange('address.area', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-primary ${
                      errors.area ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Area</option>
                    {BUTWAL_AREAS.map(area => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                  {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area}</p>}
                </div>

                {/* Ward Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ward Number <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.address.ward}
                    onChange={(e) => handleChange('address.ward', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-primary ${
                      errors.ward ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Ward</option>
                    {BUTWAL_WARDS.map(ward => (
                      <option key={ward.value} value={ward.value}>{ward.label}</option>
                    ))}
                  </select>
                  {errors.ward && <p className="text-red-500 text-sm mt-1">{errors.ward}</p>}
                </div>

                {/* Street Name */}
                <Input
                  label="Street Name"
                  placeholder="Kanti Path"
                  value={formData.address.street}
                  onChange={(e) => handleChange('address.street', e.target.value)}
                  error={errors.street}
                  required
                />

                {/* House Number */}
                <Input
                  label="House Number"
                  placeholder="123"
                  value={formData.address.houseNo}
                  onChange={(e) => handleChange('address.houseNo', e.target.value)}
                />

                {/* Nearby Famous Place */}
                <Input
                  label="Nearby Famous Place"
                  placeholder="Kanti Secondary School"
                  value={formData.address.nearbyPlace}
                  onChange={(e) => handleChange('address.nearbyPlace', e.target.value)}
                  error={errors.nearbyPlace}
                  required
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <div className="space-y-3">
                {Object.values(PAYMENT_METHODS).map(method => (
                  <button
                    key={method.id}
                    onClick={() => method.available && handleChange('paymentMethod', method.id)}
                    disabled={!method.available}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      formData.paymentMethod === method.id
                        ? 'border-primary bg-orange-50'
                        : 'border-gray-200'
                    } ${!method.available && 'opacity-50 cursor-not-allowed'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-6 h-6" />
                        <div>
                          <p className="font-semibold">{method.name}</p>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                      </div>
                      {!method.available && (
                        <span className="text-sm text-gray-500">Coming Soon</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 mb-4 pb-4 border-b">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-700">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="font-semibold">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal:</span>
                  <span>{formatPrice(total - deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Delivery:</span>
                  <span>{deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-2 border-t">
                  <span>Total:</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handlePlaceOrder}
                loading={loading}
                icon={<ShieldCheck className="w-5 h-5" />}
              >
                Place Order
              </Button>

              {/* Security Note */}
              <div className="mt-4 p-3 bg-green-50 rounded-lg text-sm text-green-700">
                <p className="font-medium mb-1">🔒 Secure Checkout</p>
                <p className="text-xs">Your information is safe and encrypted</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;