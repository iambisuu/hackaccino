"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/navbar';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-6">
              IVAA
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Empowering farmers with data-driven insights for better decision making
            </p>
          </motion.div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Market Trends Feature */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl shadow-xl overflow-hidden"
            >
              <div className="h-48 bg-gradient-to-r from-blue-400 to-green-400 flex items-center justify-center">
                <div className="text-4xl bg-white p-4 rounded-full">📈</div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Market Trends & Prediction</h2>
                <p className="text-gray-600 mb-6">
                  Analyze real-time market data, price trends, and demand forecasts for agricultural commodities. 
                  Make informed decisions about when and where to sell your produce for maximum profit.
                </p>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Price trend analysis with historical data
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Demand forecasting for next 3 months
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Regional price comparison and mandi rates
                  </li>
                </ul>
                <Link 
                  href="/trends" 
                  className="block text-center py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Explore Market Trends
                </Link>
              </div>
            </motion.div>
            
            {/* Farmer Assistance Feature */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-xl shadow-xl overflow-hidden"
            >
              <div className="h-48 bg-gradient-to-r from-green-400 to-yellow-400 flex items-center justify-center">
                <div className="text-4xl bg-white p-4 rounded-full">🌾</div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">AI Farmer Assistance</h2>
                <p className="text-gray-600 mb-6">
                  Get personalized recommendations for crop management based on your specific farm conditions. 
                  Optimize irrigation, prevent diseases, and plan harvesting with AI-powered insights.
                </p>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Weather predictions and anomaly alerts
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Disease risk assessment and prevention
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Personalized irrigation and harvest planning
                  </li>
                </ul>
                <Link 
                  href="/farmer-assist" 
                  className="block text-center py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                >
                  Get Farm Recommendations
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines market data with AI-powered insights to give you actionable recommendations
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Explore Market Data</h3>
              <p className="text-gray-600">
                Browse through comprehensive market data for various agricultural commodities, including price trends, demand forecasts, and regional variations.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Enter Farm Details</h3>
              <p className="text-gray-600">
                Provide information about your farm, crops, soil conditions, and location to receive personalized recommendations tailored to your specific needs.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center"
            >
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-amber-600 text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Get Recommendations</h3>
              <p className="text-gray-600">
                Receive AI-powered insights on irrigation, disease prevention, harvesting schedules, and market opportunities to maximize your yield and profit.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Featured Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Benefits for Farmers</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform helps you make data-driven decisions to improve productivity and profitability
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="text-3xl mb-4">💰</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Better Pricing</h3>
              <p className="text-gray-600">Know when and where to sell your produce for maximum profit based on market trends</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="text-3xl mb-4">💧</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Water Management</h3>
              <p className="text-gray-600">Optimize irrigation schedules based on weather forecasts and crop requirements</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="text-3xl mb-4">🦠</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Disease Prevention</h3>
              <p className="text-gray-600">Identify disease risks early and take preventive measures to protect your crops</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="text-3xl mb-4">📈</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Yield Improvement</h3>
              <p className="text-gray-600">Follow personalized recommendations to maximize your crop yield and quality</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Farming?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join thousands of farmers using data-driven insights to improve productivity and increase profits
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/commodity" 
                className="py-3 px-8 bg-white text-green-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Explore Market Trends
              </Link>
              <Link 
                href="/farmer-assist" 
                className="py-3 px-8 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors"
              >
                Get Farm Recommendations
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">AgriMarket Insights</h3>
              <p className="text-gray-400">Empowering farmers with data-driven insights</p>
            </div>
            <div className="flex space-x-6">
              <Link href="/commodity" className="hover:text-white transition-colors">Market Trends</Link>
              <Link href="/farmer-assist" className="hover:text-white transition-colors">Farmer Assistance</Link>
              <Link href="#" className="hover:text-white transition-colors">About Us</Link>
              <Link href="#" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} AgriMarket Insights. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}