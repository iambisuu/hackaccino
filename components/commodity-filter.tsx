// components/commodity-filter.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface CommodityFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const CommodityFilter: React.FC<CommodityFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-8 bg-white p-4 rounded-lg shadow-md"
    >
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search commodities..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category === 'All' ? null : category)}
            className={`px-4 py-2 rounded-md transition-colors ${
              selectedCategory === category
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default CommodityFilter;