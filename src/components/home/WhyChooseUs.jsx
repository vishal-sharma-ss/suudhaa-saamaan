// ✨ Why Choose Us Section
// Highlight 8 service features

import React from 'react';
import { WHY_CHOOSE_US } from '../../utils/constants';

const WhyChooseUs = () => {
  return (
    <section className="section">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-dark mb-3">
            Why Choose Suudhaa Saamaan?
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            We're committed to making your grocery shopping experience seamless, 
            affordable, and trustworthy
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {WHY_CHOOSE_US.map((feature, index) => (
            <div
              key={index}
              className="text-center group hover:-translate-y-2 transition-transform duration-300"
            >
              {/* Icon Circle */}
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-4xl group-hover:scale-110 transition-transform shadow-lg">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-base md:text-lg font-semibold text-dark mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;