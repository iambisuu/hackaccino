import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  ReferenceLine,
  AreaChart,
  Area
} from 'recharts';

// Simple props interface
interface DemandForecastChartProps {
  forecastData: {
    date: string;
    demand: number;
  }[];
}

const DemandForecastChart = ({ forecastData }: DemandForecastChartProps) => {
  // Format date for display on chart
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };
  
  // Find the current date to mark the beginning of the forecast
  const today = new Date().toISOString().split('T')[0];
  
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={forecastData}>
          <defs>
            <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatDate} 
            interval={forecastData.length > 30 ? Math.floor(forecastData.length / 10) : 0} 
            tick={{ fill: '#6b7280', fontSize: 12 }}
          />
          <YAxis 
            domain={[40, 100]} 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip 
            formatter={(value: number) => [`${value}`, 'Demand Score']}
            labelFormatter={(label) => {
              const date = new Date(label);
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
          <ReferenceLine 
            x={today} 
            stroke="#f97316" 
            strokeWidth={2}
            strokeDasharray="5 5"
            label={{ 
              value: "Today", 
              position: "top", 
              fill: "#f97316",
              fontSize: 12
            }} 
          />
          <Area
            type="monotone"
            dataKey="demand"
            name="Demand Prediction"
            stroke="#3b82f6"
            fillOpacity={1}
            fill="url(#colorDemand)"
            strokeWidth={2}
            activeDot={{ r: 6, fill: '#3b82f6', stroke: 'white', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DemandForecastChart;