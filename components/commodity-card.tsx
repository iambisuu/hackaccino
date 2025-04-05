import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Commodity } from '@/lib/types';

interface CommodityCardProps {
  commodity: Commodity;
  index: number;
}

const CommodityCard: React.FC<CommodityCardProps> = ({ commodity, index }) => {
  const priceChangeColor = commodity.priceChange >= 0 ? 'text-green-600' : 'text-red-600';
  const priceChangeIcon = commodity.priceChange >= 0 ? '↑' : '↓';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all"
    >
      <Link href={`/commodity/${commodity.id}`} className="block h-full">
        <div className="relative h-48 bg-gray-200">
          <img 
            src={commodity.image} 
            alt={commodity.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded-md text-sm">
            {commodity.category}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{commodity.name}</h3>
          
          <div className="flex justify-between items-baseline mb-3">
            <div className="text-lg font-bold">
              {commodity.currentPrice} {commodity.priceUnit}
            </div>
            <div className={`text-sm ${priceChangeColor} font-medium`}>
              {priceChangeIcon} {Math.abs(commodity.priceChange)}%
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-green-50 p-2 rounded">
              <p className="text-xs text-gray-500 mb-1">Demand Score</p>
              <div className="h-1.5 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-green-600 rounded-full" 
                  style={{ width: `${commodity.demandScore}%` }}
                ></div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-2 rounded">
              <p className="text-xs text-gray-500 mb-1">Season</p>
              <p className="text-sm font-medium truncate">{commodity.season.join(', ')}</p>
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            <p>Top Regions: {commodity.regions.slice(0, 2).map(r => r.name).join(', ')}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CommodityCard;