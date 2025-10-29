// ➕ Add Product Page - Easy Product Creation

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../../firebase/firestore';
import { uploadMultipleImages } from '../../firebase/storage';
import AdminLayout from './AdminLayout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { Upload, Plus, X, Save } from 'lucide-react';
import { CATEGORIES } from '../../utils/constants';
import { useToast } from '../../components/common/Toast';

const AddProductPage = () => {
  const navigate = useNavigate();
  const { success, error: showError } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    nameNepali: '',
    category: '',
    price: '',
    originalPrice: '',
    description: '',
    stock: '',
    unit: 'kg',
    variations: [],
    featured: false,
    badges: []
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [variationInput, setVariationInput] = useState('');
  const [badgeInput, setBadgeInput] = useState('');

  // Handle input change
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Handle image selection
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length + imageFiles.length > 5) {
      showError('Maximum 5 images allowed');
      return;
    }

    setImageFiles([...imageFiles, ...files]);

    // Create previews
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews(prev => [...prev, e.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove image
  const removeImage = (index) => {
    setImageFiles(imageFiles.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  // Add variation
  const addVariation = () => {
    if (variationInput.trim()) {
      setFormData({
        ...formData,
        variations: [...formData.variations, variationInput.trim()]
      });
      setVariationInput('');
    }
  };

  // Remove variation
  const removeVariation = (index) => {
    setFormData({
      ...formData,
      variations: formData.variations.filter((_, i) => i !== index)
    });
  };

  // Add badge
  const addBadge = () => {
    if (badgeInput.trim()) {
      setFormData({
        ...formData,
        badges: [...formData.badges, badgeInput.trim()]
      });
      setBadgeInput('');
    }
  };

  // Remove badge
  const removeBadge = (index) => {
    setFormData({
      ...formData,
      badges: formData.badges.filter((_, i) => i !== index)
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.category || !formData.price || !formData.stock) {
      showError('Please fill all required fields');
      return;
    }

    if (imageFiles.length === 0) {
      showError('Please add at least one image');
      return;
    }

    setLoading(true);

    try {
      // Upload images first
      const uploadResult = await uploadMultipleImages(imageFiles, `product_${Date.now()}`);
      
      if (!uploadResult.success) {
        throw new Error('Failed to upload images');
      }

      // Prepare product data
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        stock: parseInt(formData.stock),
        images: uploadResult.urls,
        image: uploadResult.urls[0], // Main image
        createdAt: new Date().toISOString(),
        sales: 0,
        rating: 0,
        reviews: 0
      };

      // Save to Firestore
      const result = await addProduct(productData);

      if (result.success) {
        success('✅ Product added successfully!');
        navigate('/admin/products');
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Add product error:', error);
      showError('Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Product Images */}
            <div>
              <label className="block text-sm font-semibold mb-3">
                Product Images <span className="text-red-500">*</span>
                <span className="text-gray-500 font-normal ml-2">(Max 5 images)</span>
              </label>
              
              <div className="grid grid-cols-5 gap-4">
                {/* Image Previews */}
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-300">
                    <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    {index === 0 && (
                      <span className="absolute bottom-1 left-1 right-1 bg-primary text-white text-xs text-center py-0.5 rounded">
                        Main
                      </span>
                    )}
                  </div>
                ))}

                {/* Upload Button */}
                {imageFiles.length < 5 && (
                  <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-primary cursor-pointer flex flex-col items-center justify-center transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-xs text-gray-600">Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Product Name (English)"
                placeholder="Basmati Rice"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />

              <Input
                label="Product Name (Nepali)"
                placeholder="बासमती चामल"
                value={formData.nameNepali}
                onChange={(e) => handleChange('nameNepali', e.target.value)}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                required
              >
                <option value="">Select Category</option>
                {CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Pricing */}
            <div className="grid md:grid-cols-3 gap-6">
              <Input
                label="Price (Rs.)"
                type="number"
                placeholder="180"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                required
              />

              <Input
                label="Original Price (Rs.)"
                type="number"
                placeholder="200"
                value={formData.originalPrice}
                onChange={(e) => handleChange('originalPrice', e.target.value)}
                helperText="For showing discount"
              />

              <Input
                label="Stock Quantity"
                type="number"
                placeholder="50"
                value={formData.stock}
                onChange={(e) => handleChange('stock', e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Premium quality basmati rice from local farms..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary resize-none"
                rows="4"
              />
            </div>

            {/* Variations */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Variations (e.g., 1kg, 5kg, 10kg)
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={variationInput}
                  onChange={(e) => setVariationInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addVariation())}
                  placeholder="Enter variation"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
                <Button type="button" variant="secondary" onClick={addVariation}>
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.variations.map((variation, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 rounded-full flex items-center gap-2">
                    {variation}
                    <button
                      type="button"
                      onClick={() => removeVariation(index)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Badges */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Badges (e.g., Organic, Best Seller)
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={badgeInput}
                  onChange={(e) => setBadgeInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBadge())}
                  placeholder="Enter badge"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
                <Button type="button" variant="secondary" onClick={addBadge}>
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.badges.map((badge, index) => (
                  <span key={index} className="px-3 py-1 bg-secondary text-white rounded-full flex items-center gap-2">
                    {badge}
                    <button
                      type="button"
                      onClick={() => removeBadge(index)}
                      className="hover:text-red-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Featured Toggle */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => handleChange('featured', e.target.checked)}
                className="w-5 h-5 accent-primary cursor-pointer"
              />
              <label htmlFor="featured" className="font-semibold cursor-pointer">
                Mark as Featured Product
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                icon={<Save className="w-5 h-5" />}
                className="flex-1"
              >
                Save Product
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => navigate('/admin/products')}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddProductPage;