// ✍️ Signup Page - IMPORTS FIXED

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../firebase/auth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { User, Phone, Lock, Calendar, MapPin } from 'lucide-react';
import { validateSignupForm } from '../../utils/validation';
import { BUTWAL_WARDS, BUTWAL_AREAS } from '../../utils/constants';
import { useToast } from '../../components/common/Toast';

const SignupPage = () => {
  const navigate = useNavigate();
  const { success, error: showError } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    password: '',
    confirmPassword: '',
    address: {
      city: 'Butwal',
      area: '',
      ward: '',
      street: '',
      houseNo: '',
      nearbyPlace: ''
    }
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
    setErrors({ ...errors, [field]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateSignupForm(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      showError('Please fix the errors');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      showError('Passwords do not match');
      return;
    }

    setLoading(true);

    const result = await registerUser(formData);

    if (result.success) {
      success('🎉 Account created successfully!');
      navigate('/customer/dashboard');
    } else {
      showError(result.error || 'Registration failed');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary to-primary py-12 px-4">
      <div className="max-w-2xl mx-auto">
        
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-primary text-4xl font-bold mx-auto mb-4 shadow-xl">
            S
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-white/80">Join Suudhaa Saamaan today</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
              <div className="space-y-4">
                <Input label="Full Name" placeholder="Vishal Sharma" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} icon={<User className="w-5 h-5" />} error={errors.name} required />
                <Input label="Phone Number" type="tel" placeholder="9821072912" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} icon={<Phone className="w-5 h-5" />} maxLength={10} error={errors.phone} helperText="10-digit mobile number" required />
                <Input label="Age" type="number" placeholder="25" value={formData.age} onChange={(e) => handleChange('age', e.target.value)} icon={<Calendar className="w-5 h-5" />} error={errors.age} required />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Delivery Address</h3>
              <div className="space-y-4">
                <Input label="City" value="Butwal" disabled icon={<MapPin className="w-5 h-5" />} />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Area <span className="text-red-500">*</span></label>
                  <select value={formData.address.area} onChange={(e) => handleChange('address.area', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary">
                    <option value="">Select Area</option>
                    {BUTWAL_AREAS.map(area => <option key={area} value={area}>{area}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ward Number <span className="text-red-500">*</span></label>
                  <select value={formData.address.ward} onChange={(e) => handleChange('address.ward', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary">
                    <option value="">Select Ward</option>
                    {BUTWAL_WARDS.map(ward => <option key={ward.value} value={ward.value}>{ward.label}</option>)}
                  </select>
                </div>
                <Input label="Street Name" placeholder="Kanti Path" value={formData.address.street} onChange={(e) => handleChange('address.street', e.target.value)} required />
                <Input label="Nearby Famous Place" placeholder="Kanti Secondary School" value={formData.address.nearbyPlace} onChange={(e) => handleChange('address.nearbyPlace', e.target.value)} required />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Security</h3>
              <div className="space-y-4">
                <Input label="Password" type="password" placeholder="Minimum 6 characters" value={formData.password} onChange={(e) => handleChange('password', e.target.value)} icon={<Lock className="w-5 h-5" />} showPasswordToggle error={errors.password} required />
                <Input label="Confirm Password" type="password" placeholder="Re-enter password" value={formData.confirmPassword} onChange={(e) => handleChange('confirmPassword', e.target.value)} icon={<Lock className="w-5 h-5" />} showPasswordToggle error={errors.confirmPassword} required />
              </div>
            </div>

            <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>Create Account</Button>

            <div className="text-center pt-4">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-primary font-semibold hover:underline">Login here</Link>
              </p>
            </div>
          </form>
        </div>

        <div className="text-center mt-6">
          <button onClick={() => navigate('/')} className="text-white hover:underline text-sm">← Back to Home</button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;