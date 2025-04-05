// components/navbar.tsx
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Navbar = () => {
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
            <span className="text-xl font-bold text-green-700">AgriMarket Insights</span>
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-700 hover:text-green-600 transition-colors">
              Home
            </Link>
            <Link href="#" className="text-gray-700 hover:text-green-600 transition-colors">
              Market Data
            </Link>
            <Link href="#" className="text-gray-700 hover:text-green-600 transition-colors">
              Weather Impact
            </Link>
            <Link href="#" className="text-gray-700 hover:text-green-600 transition-colors">
              Regional Trends
            </Link>
          </div>
          
          <div>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors">
              Get Predictions
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;