// 📸 Firebase Storage Functions
// Upload and manage product images

import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './config';

// 📤 Upload product image
// Returns the download URL of uploaded image
export const uploadProductImage = async (file, productId) => {
  try {
    // Create unique filename: products/productId/timestamp_originalname
    const timestamp = Date.now();
    const filename = `${timestamp}_${file.name}`;
    const storageRef = ref(storage, `products/${productId}/${filename}`);
    
    // Upload file
    await uploadBytes(storageRef, file);
    
    // Get download URL
    const downloadURL = await getDownloadURL(storageRef);
    
    return { success: true, url: downloadURL };
  } catch (error) {
    console.error('Upload image error:', error);
    return { success: false, error: error.message };
  }
};

// 📤 Upload multiple images
export const uploadMultipleImages = async (files, productId) => {
  try {
    const uploadPromises = files.map(file => uploadProductImage(file, productId));
    const results = await Promise.all(uploadPromises);
    
    // Extract URLs from successful uploads
    const urls = results
      .filter(result => result.success)
      .map(result => result.url);
    
    return { success: true, urls };
  } catch (error) {
    console.error('Upload multiple images error:', error);
    return { success: false, error: error.message };
  }
};

// 🗑️ Delete image from storage
export const deleteImage = async (imageUrl) => {
  try {
    // Extract path from URL
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
    return { success: true };
  } catch (error) {
    console.error('Delete image error:', error);
    return { success: false, error: error.message };
  }
};