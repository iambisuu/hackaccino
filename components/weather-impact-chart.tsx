import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  ReferenceLine,
  Cell,
  LabelList
} from 'recharts';

// Type for weather impact
type WeatherImpact = {
  condition: string;
  impact: number;
}

interface WeatherImpactChartProps {
  weatherData: WeatherImpact[];
}

const WeatherImpactChart = ({ weatherData }: WeatherImpactChartProps) => {
  // Sort the data to have a better visualization (positive impacts first)
  const sortedData = [...weatherData].sort((a, b) => b.impact - a.impact);
  
  // Get color based on impact value
  const getBarColor = (impact: number) => {
    if (impact >= 5) return '#16a34a'; // Strong positive: green
    if (impact >= 0) return '#22c55e'; // Positive: light green
    if (impact >= -10) return '#f97316'; // Mild negative: orange
    if (impact >= -20) return '#ef4444'; // Moderate negative: red
    return '#b91c1c'; // Severe negative: dark red
  };
  
  // Custom tooltip to display impact values with better formatting
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-md">
          <p className="font-semibold">{data.condition}</p>
          <p className="text-sm">
            Impact: <span style={{ color: getBarColor(data.impact) }}>
              {data.impact >= 0 ? '+' : ''}{data.impact}%
            </span>
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sortedData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
          <XAxis 
            type="number"
            domain={[-30, 15]} 
            tickFormatter={(value) => `${value}%`}
            tick={{ fill: '#6b7280', fontSize: 12 }}
          />
          <YAxis 
            dataKey="condition" 
            type="category" 
            tick={{ fill: '#374151', fontSize: 13 }}
            width={95}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <ReferenceLine x={0} stroke="#6b7280" strokeWidth={1} />
          <Bar dataKey="impact" name="Impact on Yield (%)">
            {sortedData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={getBarColor(entry.impact)} 
                radius={4} // Use a single value for rounded corners
              />
            ))}
            <LabelList 
              dataKey="impact" 
              position="right" 
              formatter={(value: number) => `${value >= 0 ? '+' : ''}${value}%`}
              style={{ fill: '#374151', fontSize: 12, fontWeight: 500 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeatherImpactChart;