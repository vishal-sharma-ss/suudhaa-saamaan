// 🏷️ Featured Categories Section
// Display top 6-8 product categories

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../../utils/constants';

const FeaturedCategories = () => {
  const navigate = useNavigate();

  // Show only first 8 categories
  const displayCategories = CATEGORIES.slice(0, 8);

  return (
    <section className="section">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-dark mb-3">
            Explore Our Top Categories
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Shop fresh groceries from local farmers
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
          {displayCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => navigate(`/category/${category.id}`)}
              className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="text-5xl md:text-6xl mb-4 group-hover:scale-110 transition-transform">
                {category.icon}
              </div>

              {/* Category Name */}
              <h3 className="text-base md:text-lg font-semibold text-dark mb-1">
                {category.name.split('(')[0].trim()}
              </h3>
              
              {/* Nepali Name */}
              <p className="text-sm text-gray-500">
                {category.name.match(/\((.*?)\)/)?.[1] || ''}
              </p>

              {/* Hover Effect Arrow */}
              <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-primary text-sm font-medium">
                  Shop Now →
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/categories')}
            className="px-8 py-3 bg-white text-primary border-2 border-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-all"
          >
            View All Categories →
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;