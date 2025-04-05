import React, { useState } from 'react';
import { 

  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart
} from 'recharts';

// Simplified type for price history
type PriceHistory = {
  date: string;
  price: number;
}

// Simple props interface
interface PriceTrendChartProps {
  priceHistory: PriceHistory[];
}

const PriceTrendChart = ({ priceHistory }: PriceTrendChartProps) => {
  const [timeRange, setTimeRange] = useState<'1M' | '3M' | '6M'>('6M');
  
  // Filter data based on selected time range
  const getFilteredData = () => {
    const today = new Date();
    let monthsBack = 6;
    
    if (timeRange === '1M') monthsBack = 1;
    if (timeRange === '3M') monthsBack = 3;
    
    const cutoffDate = new Date();
    cutoffDate.setMonth(today.getMonth() - monthsBack);
    
    return priceHistory.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= cutoffDate;
    });
  };
  
  // Format date for display on chart
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };

  const data = getFilteredData();
  
  return (
    <div className="h-full w-full">
      <div className="flex justify-end mb-4">
        <div className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            onClick={() => setTimeRange('1M')}
            className={`px-3 py-1 text-sm font-medium rounded-l-md ${
              timeRange === '1M'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-gray-300`}
          >
            1M
          </button>
          <button
            type="button"
            onClick={() => setTimeRange('3M')}
            className={`px-3 py-1 text-sm font-medium ${
              timeRange === '3M'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border-t border-b border-gray-300`}
          >
            3M
          </button>
          <button
            type="button"
            onClick={() => setTimeRange('6M')}
            className={`px-3 py-1 text-sm font-medium rounded-r-md ${
              timeRange === '6M'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-gray-300`}
          >
            6M
          </button>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#16a34a" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatDate} 
            interval={data.length > 30 ? Math.floor(data.length / 10) : 0} 
            tick={{ fill: '#6b7280', fontSize: 12 }}
          />
          <YAxis 
            tick={{ fill: '#6b7280', fontSize: 12 }} 
            tickFormatter={(value: number) => `₹${value}`}
          />
          <Tooltip 
            formatter={(value: number | string) => [`₹${Number(value).toFixed(2)}`, 'Price']}
            labelFormatter={(label: string | number) => {
              const date = new Date(label as string);
              return date.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              });
            }}
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '6px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              border: 'none'
            }}
          />
          <Legend iconType="circle" />
          <Area
            type="monotone"
            dataKey="price"
            name="Price"
            stroke="#16a34a"
            fillOpacity={1}
            fill="url(#colorPrice)"
            strokeWidth={2}
            activeDot={{ r: 6, fill: '#16a34a', stroke: 'white', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceTrendChart;