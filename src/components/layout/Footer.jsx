// 🦶 Footer Component
// Brand info, quick links, social links, contact info

import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';
import { CONTACT_INFO } from '../../utils/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Open WhatsApp
  const openWhatsApp = () => {
    window.open(`https://wa.me/9779821072912`, '_blank');
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pb-20 lg:pb-0">
      {/* Main Footer Content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Brand Info */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">
              Suudhaa Saamaan
            </h3>
            <p className="text-sm mb-4 leading-relaxed">
              In one click, delivered to your house. Making daily grocery shopping fast, affordable, and stress-free for every household in Butwal.
            </p>
            <div className="space-y-2">
              <p className="text-sm">
                <strong className="text-white">Founder:</strong> Vishal Sharma
              </p>
              <p className="text-sm">
                12th Grade Student, Butwal
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-sm hover:text-primary transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-sm hover:text-primary transition-colors">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/customer/dashboard" className="text-sm hover:text-primary transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/become-seller" className="text-sm hover:text-primary transition-colors">
                  Become a Seller
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Policies */}
          <div>
            <h4 className="text-white font-semibold mb-4">Policies</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm hover:text-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="text-sm hover:text-primary transition-colors">
                  No Return/Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="tel:+9779821072912" 
                  className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>+977 9821072912</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:contact@suudhaasaamaan.com" 
                  className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>contact@suudhaasaamaan.com</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Butwal, Rupandehi, Nepal</span>
              </li>
            </ul>

            {/* WhatsApp Support Button */}
            <button
              onClick={openWhatsApp}
              className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4" />
              WhatsApp Support
            </button>

            {/* Social Media Links */}
            <div className="mt-6">
              <h5 className="text-white font-semibold mb-3">Follow Us</h5>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/sharma_vishal_o"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center transition-all"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-all"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400 text-center md:text-left">
              © {currentYear} Suudhaa Saamaan. Made with ❤️ by Vishal Sharma
            </p>
            <p className="text-xs text-gray-500">
              Version 1.0.0
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;