// 🏪 Become a Seller CTA Section
// Call-to-action for new sellers

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, MessageCircle, Instagram } from 'lucide-react';
import Button from '../common/Button';
import { openWhatsApp } from '../../utils/helpers';

const BecomeSellerCTA = () => {
  const navigate = useNavigate();

  const handleWhatsApp = () => {
    openWhatsApp(
      '9779821072912',
      'Hi! I want to become a seller on Suudhaa Saamaan.'
    );
  };

  const handleEmail = () => {
    window.location.href = 'mailto:contact@suudhaasaamaan.com?subject=Seller Registration Inquiry';
  };

  const handleInstagram = () => {
    window.open('https://www.instagram.com/sharma_vishal_o', '_blank');
  };

  return (
    <section className="section bg-gradient-to-br from-primary to-secondary">
      <div className="container-custom">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            
            {/* Left: Content */}
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-dark mb-4">
                Want to Sell on Suudhaa Saamaan?
              </h2>
              <p className="text-gray-600 text-sm md:text-base mb-6 leading-relaxed">
                Grow your business by listing your products on our platform. 
                Reach thousands of customers easily and expand your local business.
              </p>

              {/* Benefits List */}
              <ul className="space-y-3 mb-6">
                {[
                  'Zero listing fees to start',
                  'Direct access to Butwal customers',
                  'Easy product management',
                  'Fast payment settlements',
                  'Marketing support included'
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* Trust Badge */}
              <div className="flex items-center gap-2 text-secondary font-medium">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Join 100+ verified sellers already on Suudhaa Saamaan</span>
              </div>
            </div>

            {/* Right: Contact Options */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-dark mb-4">
                Get Started Today
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Contact us through your preferred method:
              </p>

              {/* Contact Buttons */}
              <div className="space-y-3">
                {/* WhatsApp */}
                <button
                  onClick={handleWhatsApp}
                  className="w-full flex items-center gap-4 p-4 bg-white hover:bg-green-50 border-2 border-gray-200 hover:border-green-500 rounded-xl transition-all group"
                >
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-semibold text-dark">WhatsApp Chat</p>
                    <p className="text-sm text-gray-500">Quick response guaranteed</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>

                {/* Email */}
                <button
                  onClick={handleEmail}
                  className="w-full flex items-center gap-4 p-4 bg-white hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-500 rounded-xl transition-all group"
                >
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-semibold text-dark">Email Us</p>
                    <p className="text-sm text-gray-500">Detailed inquiry form</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>

                {/* Instagram */}
                <button
                  onClick={handleInstagram}
                  className="w-full flex items-center gap-4 p-4 bg-white hover:bg-pink-50 border-2 border-gray-200 hover:border-pink-500 rounded-xl transition-all group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-semibold text-dark">Instagram DM</p>
                    <p className="text-sm text-gray-500">Direct message us</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* Or visit page */}
              <div className="mt-6 pt-6 border-t border-gray-300">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => navigate('/become-seller')}
                >
                  View Full Details →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeSellerCTA;