// 🔐 Customer Login Page - IMPORTS FIXED

import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { loginUser } from '../../firebase/auth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { Phone, Lock } from 'lucide-react';
import { useToast } from '../../components/common/Toast';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { success, error: showError } = useToast();

  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await loginUser(formData.phone, formData.password);

    if (result.success) {
      success('✅ Login successful!');
      
      // Redirect to previous page or dashboard
      const from = location.state?.from || '/customer/dashboard';
      navigate(from);
    } else {
      showError(result.error || 'Login failed');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        
        {/* Logo & Brand */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-primary text-4xl font-bold mx-auto mb-4 shadow-xl">
            S
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back!</h1>
          <p className="text-white/80">Login to Suudhaa Saamaan</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Phone Number */}
            <Input
              label="Phone Number"
              type="tel"
              placeholder="9821072912"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              icon={<Phone className="w-5 h-5" />}
              maxLength={10}
              required
            />

            {/* Password */}
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              icon={<Lock className="w-5 h-5" />}
              showPasswordToggle
              required
            />

            {/* Login Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
            >
              Login
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Don't have an account?</span>
              </div>
            </div>

            {/* Signup Link */}
            <Link to="/signup">
              <Button
                type="button"
                variant="outline"
                size="lg"
                fullWidth
              >
                Create New Account
              </Button>
            </Link>
          </form>

          {/* Admin Login Link */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={() => navigate('/admin/login')}
              className="w-full text-center text-gray-600 hover:text-primary text-sm font-medium transition-colors"
            >
              🔐 Admin? Login here →
            </button>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-white hover:underline text-sm"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;