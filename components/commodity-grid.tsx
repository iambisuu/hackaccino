
// components/commodity-grid.tsx
import React from 'react';
import { Commodity } from '@/lib/types';
import CommodityCard  from './commodity-card';

interface CommodityGridProps {
  commodities: Commodity[];
}

const CommodityGrid: React.FC<CommodityGridProps> = ({ commodities }) => {
  if (commodities.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl text-gray-600">No commodities found matching your criteria</h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {commodities.map((commodity, index) => (
        <CommodityCard key={commodity.id} commodity={commodity} index={index} />
      ))}
    </div>
  );
};

export default CommodityGrid;
