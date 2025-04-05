"use client";

import React from 'react';
import { motion } from 'framer-motion';
import FarmerAssistForm from '@/components/farmer-assist-form';
import Navbar from '@/components/navbar';

export default function FarmerAssistancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            Farmer Assistance Portal
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get personalized recommendations for your crops based on your farm's unique conditions
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <FarmerAssistForm />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center text-gray-600 text-sm"
        >
          <p>The recommendations provided are based on predictive models and historical data.</p>
          <p>For more detailed assistance, please consult with your local agricultural extension officer.</p>
        </motion.div>
      </div>
    </div>
  );
}