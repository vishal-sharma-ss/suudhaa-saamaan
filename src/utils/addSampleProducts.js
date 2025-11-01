// 🌱 Add 10 Sample Products - RUN THIS ONCE IN BROWSER CONSOLE

import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase/config';

const sampleProducts = [
  {
    name: "Basmati Rice Premium",
    nameNepali: "बासमती चामल",
    category: "rice",
    price: 180,
    originalPrice: 200,
    stock: 50,
    unit: "kg",
    variations: ["1kg", "5kg", "10kg"],
    featured: true,
    badges: ["Best Seller", "Organic"],
    description: "Premium quality basmati rice sourced from local farms. Long grain, aromatic, and perfect for daily meals.",
    images: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500",
      "https://images.unsplash.com/photo-1596040033229-a0b3b4ae1f02?w=500"
    ],
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500",
    createdAt: new Date().toISOString(),
    sales: 0,
    rating: 4.5,
    reviews: 12
  },
  {
    name: "Masoor Dal (Red Lentils)",
    nameNepali: "मसूर दाल",
    category: "dal",
    price: 150,
    originalPrice: 170,
    stock: 40,
    variations: ["500g", "1kg", "2kg"],
    featured: true,
    badges: ["Organic"],
    description: "Fresh red lentils, rich in protein and perfect for daily nutrition.",
    images: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500"],
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500",
    createdAt: new Date().toISOString(),
    sales: 0,
    rating: 4.3,
    reviews: 8
  },
  {
    name: "Mustard Cooking Oil",
    nameNepali: "तोरीको तेल",
    category: "oil",
    price: 280,
    originalPrice: 300,
    stock: 30,
    variations: ["500ml", "1L", "2L"],
    featured: false,
    badges: ["Pure", "Cold Pressed"],
    description: "Pure cold-pressed mustard oil, ideal for cooking and traditional recipes.",
    images: ["https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500"],
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500",
    createdAt: new Date().toISOString(),
    sales: 0,
    rating: 4.6,
    reviews: 15
  },
  {
    name: "Mixed Spice Pack",
    nameNepali: "मसला प्याक",
    category: "spices",
    price: 120,
    originalPrice: 140,
    stock: 60,
    variations: ["100g", "250g", "500g"],
    featured: true,
    badges: ["Fresh", "Organic"],
    description: "Complete spice mix for authentic Nepali cuisine. Includes turmeric, cumin, coriander.",
    images: ["https://images.unsplash.com/photo-1596040033229-a0b3b4ae1f02?w=500"],
    image: "https://images.unsplash.com/photo-1596040033229-a0b3b4ae1f02?w=500",
    createdAt: new Date().toISOString(),
    sales: 0,
    rating: 4.7,
    reviews: 20
  },
  {
    name: "Fresh Tomatoes",
    nameNepali: "ताजा गोलभेडा",
    category: "vegetables",
    price: 60,
    stock: 100,
    variations: ["500g", "1kg", "2kg"],
    featured: false,
    badges: ["Fresh", "Local"],
    description: "Farm-fresh tomatoes delivered daily. Perfect for curries and salads.",
    images: ["https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=500"],
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=500",
    createdAt: new Date().toISOString(),
    sales: 0,
    rating: 4.4,
    reviews: 6
  },
  {
    name: "Fresh Milk",
    nameNepali: "ताजा दूध",
    category: "dairy",
    price: 80,
    stock: 50,
    variations: ["500ml", "1L"],
    featured: true,
    badges: ["Fresh", "Pure"],
    description: "Pure cow milk delivered fresh every morning from local dairy farms.",
    images: ["https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500"],
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500",
    createdAt: new Date().toISOString(),
    sales: 0,
    rating: 4.8,
    reviews: 25
  },
  {
    name: "Wheat Flour (Atta)",
    nameNepali: "गहुँको पिठो",
    category: "flour",
    price: 90,
    originalPrice: 100,
    stock: 80,
    variations: ["1kg", "5kg", "10kg"],
    featured: false,
    badges: ["Whole Grain"],
    description: "Fresh stone-ground wheat flour, perfect for making roti and bread.",
    images: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500"],
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500",
    createdAt: new Date().toISOString(),
    sales: 0,
    rating: 4.2,
    reviews: 10
  },
  {
    name: "Namkeen Mix",
    nameNepali: "नमकीन मिक्स",
    category: "snacks",
    price: 100,
    stock: 45,
    variations: ["200g", "500g", "1kg"],
    featured: false,
    badges: ["Crunchy"],
    description: "Delicious crispy namkeen mix, perfect for tea-time snacking.",
    images: ["https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=500"],
    image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=500",
    createdAt: new Date().toISOString(),
    sales: 0,
    rating: 4.1,
    reviews: 5
  },
  {
    name: "Green Chilli",
    nameNepali: "हरियो खुर्सानी",
    category: "vegetables",
    price: 40,
    stock: 70,
    variations: ["100g", "250g", "500g"],
    featured: false,
    badges: ["Fresh", "Hot"],
    description: "Fresh green chillies with perfect heat level for authentic taste.",
    images: ["https://images.unsplash.com/photo-1583021634489-44a2f2c5f000?w=500"],
    image: "https://images.unsplash.com/photo-1583021634489-44a2f2c5f000?w=500",
    createdAt: new Date().toISOString(),
    sales: 0,
    rating: 4.3,
    reviews: 7
  },
  {
    name: "Black Tea Leaves",
    nameNepali: "कालो चिया",
    category: "snacks",
    price: 250,
    originalPrice: 280,
    stock: 35,
    variations: ["250g", "500g"],
    featured: true,
    badges: ["Premium", "Aromatic"],
    description: "Premium black tea leaves from Ilam, Nepal. Rich flavor and aroma.",
    images: ["https://images.unsplash.com/photo-1597318112051-4d4e23a8e8b6?w=500"],
    image: "https://images.unsplash.com/photo-1597318112051-4d4e23a8e8b6?w=500",
    createdAt: new Date().toISOString(),
    sales: 0,
    rating: 4.9,
    reviews: 30
  }
];

// Function to add all products
async function addSampleProducts() {
  console.log('Starting to add sample products...');
  
  for (let i = 0; i < sampleProducts.length; i++) {
    try {
      const product = sampleProducts[i];
      const docRef = await addDoc(collection(db, 'products'), product);
      console.log(`✅ Product ${i + 1} added with ID: ${docRef.id} - ${product.name}`);
    } catch (error) {
      console.error(`❌ Error adding product ${i + 1}:`, error);
    }
  }
  
  console.log('🎉 All sample products added!');
}

// Run this in browser console after importing:
// addSampleProducts();

export { addSampleProducts, sampleProducts };
