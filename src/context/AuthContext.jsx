// 🔐 Authentication Context
// Manages user login state across entire app
// Any component can check if user is logged in using this context

import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthChange, getCurrentUserProfile } from '../firebase/auth';

// Create context
const AuthContext = createContext();

// Custom hook to use auth context
// Usage in any component: const { user, loading, isAdmin } = useAuth();
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);           // Current logged-in user
  const [userData, setUserData] = useState(null);   // User profile data from Firestore
  const [isAdmin, setIsAdmin] = useState(false);    // Is user an admin?
  const [loading, setLoading] = useState(true);     // Is auth state being checked?

  useEffect(() => {
    // Listen to Firebase auth state changes
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        // User is logged in
        setUser(firebaseUser);
        
        // Fetch full user profile from Firestore
        const profileResult = await getCurrentUserProfile(firebaseUser.uid);
        if (profileResult.success) {
          setUserData(profileResult.data);
          
          // Check if user is admin
          const adminPhone = import.meta.env.VITE_ADMIN_PHONE;
          setIsAdmin(profileResult.data.phone === adminPhone);
        }
      } else {
        // User is logged out
        setUser(null);
        setUserData(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Values available to all components
  const value = {
    user,           // Firebase user object
    userData,       // Full user profile (name, phone, address, etc.)
    isAdmin,        // Boolean: is this user an admin?
    loading,        // Boolean: is auth state still loading?
    
    // Helper functions
    isLoggedIn: !!user,  // Boolean: is user logged in?
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};