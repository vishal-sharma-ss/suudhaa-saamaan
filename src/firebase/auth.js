// 🔐 Authentication Functions
// Handle user login, signup, and logout

import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './config';

// 📝 Register new user
// Creates Firebase auth account + stores user profile in Firestore
export const registerUser = async (userData) => {
  try {
    const { phone, password, name, age, address } = userData;
    
    // Create email from phone (Firebase requires email for auth)
    // Example: 9821072912@suudhaa.app
    const email = `${phone}@suudhaa.app`;
    
    // Create Firebase authentication account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Store additional user info in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      phone,
      name,
      age,
      address,
      createdAt: new Date().toISOString(),
      role: 'customer' // Default role
    });
    
    return { success: true, user };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: error.message };
  }
};

// 🔑 Login user
// Checks if phone ends with @ADMIN to determine admin login
export const loginUser = async (phone, password) => {
  try {
    // Check if attempting admin login
    const isAdminLogin = phone.toLowerCase().includes('@admin');
    
    // Extract actual phone number
    const actualPhone = phone.replace(/@admin/i, '');
    const email = `${actualPhone}@suudhaa.app`;
    
    // Sign in with Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const userData = userDoc.data();
    
    // If admin login attempted, verify user is actually admin
    if (isAdminLogin) {
      // Check if this phone number is admin phone from .env
      const adminPhone = import.meta.env.VITE_ADMIN_PHONE;
      if (actualPhone !== adminPhone) {
        await signOut(auth);
        return { success: false, error: 'Unauthorized admin access' };
      }
      return { success: true, user, isAdmin: true, userData };
    }
    
    return { success: true, user, isAdmin: false, userData };
  } catch (error) {
    console.error('Login error:', error);
    
    // User-friendly error messages
    let errorMessage = 'Login failed';
    if (error.code === 'auth/wrong-password') {
      errorMessage = 'Incorrect password';
    } else if (error.code === 'auth/user-not-found') {
      errorMessage = 'Phone number not registered';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid phone number format';
    }
    
    return { success: false, error: errorMessage };
  }
};

// 🚪 Logout user
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, error: error.message };
  }
};

// 👤 Get current user's full profile
export const getCurrentUserProfile = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return { success: true, data: userDoc.data() };
    }
    return { success: false, error: 'User profile not found' };
  } catch (error) {
    console.error('Get profile error:', error);
    return { success: false, error: error.message };
  }
};

// 👂 Listen to auth state changes
// Use this to check if user is logged in when app loads
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};