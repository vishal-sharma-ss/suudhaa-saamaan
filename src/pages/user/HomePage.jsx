// 🏠 Home Page - Main Landing Page
// Combines all homepage sections

import React from 'react';
import HeroSlider from '../../components/home/HeroSlider';
import BannerSlider from '../../components/home/BannerSlider';
import FeaturedCategories from '../../components/home/FeaturedCategories';
import FeaturedProducts from '../../components/home/FeaturedProducts';
import WhyChooseUs from '../../components/home/WhyChooseUs';
import BecomeSellerCTA from '../../components/home/BecomeSellerCTA';

const HomePage = () => {
  return (
    <div className="homepage">
      {/* 1. Hero Slider - Full width, 1/4 screen height */}
      <section className="container-custom py-4">
        <HeroSlider />
      </section>

      {/* 2. Banner Slider - Small height, continuous scroll */}
      <section className="container-custom py-4">
        <BannerSlider />
      </section>

      {/* 3. Featured Categories */}
      <FeaturedCategories />

      {/* 4. Featured Products */}
      <FeaturedProducts />

      {/* 5. Why Choose Us */}
      <WhyChooseUs />

      {/* 6. Become a Seller CTA */}
      <BecomeSellerCTA />
    </div>
  );
};

export default HomePage;