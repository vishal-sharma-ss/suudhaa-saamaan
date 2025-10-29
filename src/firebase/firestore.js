// 📊 Firestore Database Functions
// CRUD operations for products, orders, customers

import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './config';

// ==================== PRODUCTS ====================

// 📦 Get all products
export const getAllProducts = async () => {
  try {
    const productsRef = collection(db, 'products');
    const snapshot = await getDocs(productsRef);
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { success: true, data: products };
  } catch (error) {
    console.error('Get products error:', error);
    return { success: false, error: error.message };
  }
};

// 🔍 Get single product by ID
export const getProductById = async (productId) => {
  try {
    const productDoc = await getDoc(doc(db, 'products', productId));
    if (productDoc.exists()) {
      return { success: true, data: { id: productDoc.id, ...productDoc.data() } };
    }
    return { success: false, error: 'Product not found' };
  } catch (error) {
    console.error('Get product error:', error);
    return { success: false, error: error.message };
  }
};

// 🏷️ Get products by category
export const getProductsByCategory = async (category) => {
  try {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, where('category', '==', category));
    const snapshot = await getDocs(q);
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { success: true, data: products };
  } catch (error) {
    console.error('Get category products error:', error);
    return { success: false, error: error.message };
  }
};

// ➕ Add new product (Admin only)
export const addProduct = async (productData) => {
  try {
    const productsRef = collection(db, 'products');
    const docRef = await addDoc(productsRef, {
      ...productData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Add product error:', error);
    return { success: false, error: error.message };
  }
};

// ✏️ Update product (Admin only)
export const updateProduct = async (productId, updates) => {
  try {
    const productRef = doc(db, 'products', productId);
    await updateDoc(productRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Update product error:', error);
    return { success: false, error: error.message };
  }
};

// 🗑️ Delete product (Admin only)
export const deleteProduct = async (productId) => {
  try {
    await deleteDoc(doc(db, 'products', productId));
    return { success: true };
  } catch (error) {
    console.error('Delete product error:', error);
    return { success: false, error: error.message };
  }
};

// ==================== ORDERS ====================

// 🛒 Create new order
export const createOrder = async (orderData) => {
  try {
    const ordersRef = collection(db, 'orders');
    const docRef = await addDoc(ordersRef, {
      ...orderData,
      status: 'Order Placed',
      createdAt: serverTimestamp()
    });
    return { success: true, orderId: docRef.id };
  } catch (error) {
    console.error('Create order error:', error);
    return { success: false, error: error.message };
  }
};

// 📋 Get user's orders
export const getUserOrders = async (userId) => {
  try {
    const ordersRef = collection(db, 'orders');
    const q = query(
      ordersRef, 
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    const orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { success: true, data: orders };
  } catch (error) {
    console.error('Get user orders error:', error);
    return { success: false, error: error.message };
  }
};

// 🔍 Get order by ID
export const getOrderById = async (orderId) => {
  try {
    const orderDoc = await getDoc(doc(db, 'orders', orderId));
    if (orderDoc.exists()) {
      return { success: true, data: { id: orderDoc.id, ...orderDoc.data() } };
    }
    return { success: false, error: 'Order not found' };
  } catch (error) {
    console.error('Get order error:', error);
    return { success: false, error: error.message };
  }
};

// 🔄 Update order status (Admin only)
export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, {
      status: newStatus,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Update order status error:', error);
    return { success: false, error: error.message };
  }
};

// 📊 Get all orders (Admin only)
export const getAllOrders = async () => {
  try {
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { success: true, data: orders };
  } catch (error) {
    console.error('Get all orders error:', error);
    return { success: false, error: error.message };
  }
};

// ==================== CUSTOMERS ====================

// 👥 Get all customers (Admin only)
export const getAllCustomers = async () => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('role', '==', 'customer'));
    const snapshot = await getDocs(q);
    const customers = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { success: true, data: customers };
  } catch (error) {
    console.error('Get customers error:', error);
    return { success: false, error: error.message };
  }
};

// ✏️ Update user profile
export const updateUserProfile = async (userId, updates) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Update profile error:', error);
    return { success: false, error: error.message };
  }
};