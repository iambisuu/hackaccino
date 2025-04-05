"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { commodities } from '@/lib/dummy-data';
import CommodityGrid from '@/components/commodity-grid';
import CommodityFilter from '@/components/commodity-filter';
import Navbar from '@/components/navbar';

export default function Home() {
  const [filteredCategory, setFilteredCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', ...new Set(commodities.map(item => item.category))];
  
  const filteredCommodities = commodities.filter(commodity => {
    const matchesCategory = filteredCategory === null || filteredCategory === 'All' || commodity.category === filteredCategory;
    const matchesSearch = commodity.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            Agricultural Market Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Predict market demand based on region, weather, trends, and mandi prices
          </p>
        </motion.div>

        <CommodityFilter 
          categories={categories}
          selectedCategory={filteredCategory || 'All'}
          onCategoryChange={setFilteredCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CommodityGrid commodities={filteredCommodities} />
        </motion.div>
      </div>
    </main>
  );
}