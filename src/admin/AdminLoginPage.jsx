// 🔐 Admin Login Page - Separate & Secure

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { Mail, Lock, ShieldCheck } from 'lucide-react';
import { useToast } from '../components/common/Toast';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { success, error: showError } = useToast();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Login with Firebase email/password
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      const user = userCredential.user;

      // Check if user is admin in Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();

      // Verify admin role
      if (userData?.role === 'admin') {
        success('✅ Admin login successful!');
        navigate('/admin/dashboard');
      } else {
        // Not an admin - logout immediately
        await auth.signOut();
        showError('⛔ Unauthorized! Admin access only.');
      }
    } catch (error) {
      console.error('Admin login error:', error);
      
      // User-friendly error messages
      if (error.code === 'auth/wrong-password') {
        showError('Incorrect password');
      } else if (error.code === 'auth/user-not-found') {
        showError('Admin account not found');
      } else if (error.code === 'auth/invalid-email') {
        showError('Invalid email format');
      } else if (error.code === 'auth/too-many-requests') {
        showError('Too many failed attempts. Try again later.');
      } else {
        showError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        
        {/* Admin Badge */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
            <ShieldCheck className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-gray-400">Suudhaa Saamaan</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Administrator Login</h2>
            <p className="text-sm text-gray-600">Enter your admin credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email */}
            <Input
              label="Admin Email"
              type="email"
              placeholder="admin@suudhaasaamaan.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              icon={<Mail className="w-5 h-5" />}
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

            {/* Security Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Secure Admin Access</p>
                  <p className="text-xs mt-1">Only authorized administrators can access this panel</p>
                </div>
              </div>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
            >
              Login to Admin Panel
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Not an admin?</span>
            </div>
          </div>

          {/* Customer Login Link */}
          <button
            onClick={() => navigate('/login')}
            className="w-full text-center text-primary hover:underline text-sm font-medium"
          >
            Go to Customer Login →
          </button>
        </div>

        {/* Back to Store */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            ← Back to Store
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;