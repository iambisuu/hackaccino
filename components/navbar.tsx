import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-green-700">IVAA</span>
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-700 hover:text-green-600 transition-colors">
              Home
            </Link>
            <Link href="/commodity" className="text-gray-700 hover:text-green-600 transition-colors">
              Market Trends
            </Link>
            <Link href="/farmer-assist" className="text-gray-700 hover:text-green-600 transition-colors">
              Farmer Assistance
            </Link>
            <Link href="#" className="text-gray-700 hover:text-green-600 transition-colors">
              About
            </Link>
          </div>
          
          <div className="hidden md:block">
            <Link href="/farmer-assist" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors">
              Get Recommendations
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu} 
              className="text-gray-500 hover:text-green-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t border-gray-200"
        >
          <div className="container mx-auto px-4 py-3 space-y-3">
            <Link 
              href="/" 
              className="block py-2 px-4 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/commodity" 
              className="block py-2 px-4 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Market Trends
            </Link>
            <Link 
              href="/farmer-assist" 
              className="block py-2 px-4 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Farmer Assistance
            </Link>
            <Link 
              href="#" 
              className="block py-2 px-4 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <div className="pt-2">
              <Link 
                href="/farmer-assist" 
                className="block w-full text-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Recommendations
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;