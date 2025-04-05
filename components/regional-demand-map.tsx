import React, { useState } from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Tooltip,
  Legend,
  Sector
} from 'recharts';

// Type for regional data
type RegionalData = {
  region: string;
  demand: number;
  supply: number;
  price: number;
}

interface RegionalDemandMapProps {
  regionalData: RegionalData[];
}

// Beautiful color palette for the pie chart
const COLORS = [
  '#22c55e', // green
  '#3b82f6', // blue
  '#eab308', // yellow
  '#ec4899', // pink
  '#8b5cf6', // purple
  '#f97316', // orange
  '#06b6d4'  // cyan
];

const RegionalDemandMap = ({ regionalData }: RegionalDemandMapProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  // Sort data by demand score (highest first)
  const sortedData = [...regionalData].sort((a, b) => b.demand - a.demand);
  
  // Custom tooltip to show more details
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-md">
          <p className="font-semibold text-base">{data.region}</p>
          <div className="mt-1 space-y-1">
            <p className="text-sm flex justify-between">
              <span className="text-gray-600">Demand:</span>
              <span className="font-medium ml-4">{data.demand}/100</span>
            </p>
            <p className="text-sm flex justify-between">
              <span className="text-gray-600">Supply:</span>
              <span className="font-medium ml-4">{data.supply} units</span>
            </p>
            <p className="text-sm flex justify-between">
              <span className="text-gray-600">Price:</span>
              <span className="font-medium ml-4">₹{data.price.toFixed(2)}/kg</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };
  
  // Active shape when hovering over a pie sector
  const renderActiveShape = (props: any) => {
    const { 
      cx, cy, innerRadius, outerRadius, startAngle, endAngle,
      fill, payload, percent, value
    } = props;
    
    return (
      <g>
        <text x={cx} y={cy - 15} dy={8} textAnchor="middle" fill="#333" fontSize={16} fontWeight={500}>
          {payload.region}
        </text>
        <text x={cx} y={cy + 15} textAnchor="middle" fill="#666" fontSize={14}>
          {`${value} (${(percent * 100).toFixed(0)}%)`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          cornerRadius={4}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 12}
          outerRadius={outerRadius + 16}
          fill={fill}
          cornerRadius={2}
        />
      </g>
    );
  };
  
  // Handlers for mouse events
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };
  
  const onPieLeave = () => {
    setActiveIndex(null);
  };
  
  // Custom legend to make it more attractive
  const CustomLegend = ({ payload }: any) => {
    return (
      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm mb-2">
        {payload.map((entry: any, index: number) => (
          <li key={`legend-${index}`} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-1" 
              style={{ backgroundColor: entry.color }}
            ></div>
            <span>{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };
  
  return (
    <div className="h-full w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            activeIndex={activeIndex !== null ? activeIndex : undefined}
            activeShape={renderActiveShape}
            dataKey="demand"
            data={sortedData}
            nameKey="region"
            cx="50%"
            cy="50%"
            innerRadius={activeIndex !== null ? 60 : 50}
            outerRadius={100}
            paddingAngle={2}
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
          >
            {sortedData.map((_, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
                style={{ filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))' }}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            content={<CustomLegend />}
            verticalAlign="bottom" 
            height={36}
          />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center text when no sector is active */}
      {activeIndex === null && (
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ marginTop: '-36px' }}
        >
          <div className="text-center">
            <div className="text-gray-500 text-sm">Hover for details</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegionalDemandMap;