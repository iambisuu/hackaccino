import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

type MSPHistory = {
  year: string;
  price: number;
}

interface MinimumSupportPriceProps {
  currentPrice: number;
  msp: number;
  priceUnit: string;
  mspHistory?: MSPHistory[];
}

const MinimumSupportPrice = ({ 
  currentPrice, 
  msp, 
  priceUnit,
  mspHistory 
}: MinimumSupportPriceProps) => {
  
  // Calculate if current price is above or below MSP
  const priceDifference = currentPrice - msp;
  const percentageDifference = (priceDifference / msp) * 100;
  
  const isPriceAboveMSP = currentPrice >= msp;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Minimum Support Price (MSP)</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-baseline justify-between p-4 bg-gray-50 rounded-lg">
            <span className="text-gray-600">Current MSP:</span>
            <span className="text-2xl font-bold text-green-700">{msp.toFixed(2)} {priceUnit}</span>
          </div>
          
          <div className="flex items-baseline justify-between p-4 bg-gray-50 rounded-lg">
            <span className="text-gray-600">Current Market Price:</span>
            <span className="text-2xl font-bold">{currentPrice.toFixed(2)} {priceUnit}</span>
          </div>
          
          <div className={`flex items-baseline justify-between p-4 rounded-lg ${
            isPriceAboveMSP ? 'bg-green-50' : 'bg-red-50'
          }`}>
            <span className="text-gray-600">Price vs MSP:</span>
            <span className={`text-xl font-semibold ${
              isPriceAboveMSP ? 'text-green-600' : 'text-red-600'
            }`}>
              {isPriceAboveMSP ? '+' : ''}{priceDifference.toFixed(2)} {priceUnit} 
              ({isPriceAboveMSP ? '+' : ''}{percentageDifference.toFixed(1)}%)
            </span>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-medium text-blue-800 mb-2">What is MSP?</h3>
            <p className="text-gray-700">
              Minimum Support Price (MSP) is the price at which the government purchases crops from farmers, 
              regardless of market price, ensuring farmers receive a minimum profit for their produce.
            </p>
          </div>
        </div>
        
        {mspHistory && mspHistory.length > 0 && (
          <div className="h-64">
            <h3 className="text-lg font-medium mb-2">MSP History</h3>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={mspHistory}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="year" />
                <YAxis 
                  tickFormatter={(value) => `₹${value}`}
                  domain={[
                    Math.floor(Math.min(...mspHistory.map(item => item.price)) * 0.9),
                    Math.ceil(Math.max(...mspHistory.map(item => item.price)) * 1.1)
                  ]}
                />
                <Tooltip 
                  formatter={(value: number) => [`₹${value.toFixed(2)}`, 'MSP']}
                  labelFormatter={(label) => `Year: ${label}`}
                />
                <ReferenceLine 
                  y={msp} 
                  stroke="#16a34a" 
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  label={{ 
                    value: "Current MSP", 
                    position: "right", 
                    fill: "#16a34a",
                    fontSize: 12 
                  }} 
                />
                <Bar 
                  dataKey="price" 
                  fill="#059669" 
                  radius={[4, 4, 0, 0]}
                  name="MSP"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      
      {isPriceAboveMSP ? (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-800">
            <span className="font-medium">Market Analysis:</span> Current market price is above MSP,
            indicating strong demand and favorable market conditions for farmers.
          </p>
        </div>
      ) : (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-yellow-800">
            <span className="font-medium">Market Analysis:</span> Current market price is below MSP.
            Farmers can sell to government procurement agencies to ensure fair compensation.
          </p>
        </div>
      )}
    </div>
  );
};

export default MinimumSupportPrice;