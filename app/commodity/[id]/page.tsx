"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { getCommodityDetail } from '@/lib/dummy-data';
import { CommodityDetail } from '@/lib/types';
import PriceTrendChart from '@/components/price-trend-chart';
import DemandForecastChart from '@/components/demand-forecast-chart';
import WeatherImpactChart from '@/components/weather-impact-chart';
import RegionalDemandMap from '@/components/regional-demand-map';
import MinimumSupportPrice from '@/components/minimum-support-price';
import Navbar from '@/components/navbar';
import Link from 'next/link';
import Image from 'next/image';

export default function CommodityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [commodity, setCommodity] = useState<CommodityDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      const commodityId = Array.isArray(params.id) ? params.id[0] : params.id;
      const commodityData = getCommodityDetail(commodityId);
      
      if (commodityData) {
        setCommodity(commodityData);
      } else {
        // Redirect to home if commodity not found
        router.push('/');
      }
    }
    
    setLoading(false);
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!commodity) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Commodity not found</h1>
        <Link href="/" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Return to Home
        </Link>
      </div>
    );
  }

  const priceChangeColor = commodity.priceChange >= 0 ? 'text-green-600' : 'text-red-600';
  const priceChangeIcon = commodity.priceChange >= 0 ? '↑' : '↓';

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-block mb-6 text-green-700 hover:text-green-800 transition-colors">
          ← Back to all commodities
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-xl overflow-hidden mb-8"
        >
          <div className="md:flex">
            <div className="md:w-1/3 bg-gray-100 flex items-center justify-center p-8">
              <Image
              width={200}
                height={200} 
                src={commodity.image} 
                alt={commodity.name} 
                className="w-64 h-64 object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="md:w-2/3 p-8">
              <div className="flex items-center mb-2">
                <h1 className="text-3xl font-bold text-gray-800">{commodity.name}</h1>
                <span className="ml-4 px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-full">
                  {commodity.category}
                </span>
              </div>
              
              <div className="flex items-baseline mb-6">
                <span className="text-2xl font-semibold">{commodity.currentPrice} {commodity.priceUnit}</span>
                <span className={`ml-2 ${priceChangeColor}`}>
                  {priceChangeIcon} {Math.abs(commodity.priceChange)}%
                </span>
              </div>
              
              <p className="text-gray-600 mb-6">{commodity.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500">Demand Score</p>
                  <p className="text-xl font-semibold">{commodity.demandScore}/100</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500">Season</p>
                  <p className="text-xl font-semibold">{commodity.season.join(', ')}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500">Top Region</p>
                  <p className="text-xl font-semibold">{commodity.regions[0].name}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500">Production</p>
                  <p className="text-xl font-semibold">{commodity.regions[0].production.toLocaleString()} MT</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Price Trends (Last 6 Months)</h2>
            <div className="h-80">
              <PriceTrendChart priceHistory={commodity.priceHistory} />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Demand Forecast (Next 3 Months)</h2>
            <div className="h-80">
              <DemandForecastChart forecastData={commodity.forecastedDemand} />
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <MinimumSupportPrice 
            currentPrice={commodity.currentPrice}
            msp={commodity.msp}
            priceUnit={commodity.priceUnit}
            mspHistory={commodity.mspHistory}
          />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Weather Impact on Yield</h2>
            <div className="h-80">
              <WeatherImpactChart weatherData={commodity.weatherImpact} />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Regional Demand Distribution</h2>
            <div className="h-80">
              <RegionalDemandMap regionalData={commodity.regionalData} />
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">Mandi Prices</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mandi Name
                  </th>
                  <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    State
                  </th>
                  <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price ({commodity.priceUnit})
                  </th>
                  <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Change (%)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {commodity.mandiPrices.map((mandi, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-4 px-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {mandi.mandiName}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">
                      {mandi.state}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-900">
                      {mandi.price.toFixed(2)}
                    </td>
                    <td className={`py-4 px-4 whitespace-nowrap text-sm ${mandi.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {mandi.change >= 0 ? '+' : ''}{mandi.change.toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">Market Analysis</h2>
          <div className="prose max-w-none">
            <p>
              <strong>{commodity.name}</strong> is currently experiencing a 
              <strong className={commodity.priceChange >= 0 ? ' text-green-600' : ' text-red-600'}>
                {commodity.priceChange >= 0 ? ' positive' : ' negative'} price trend
              </strong> with a {Math.abs(commodity.priceChange)}% 
              {commodity.priceChange >= 0 ? ' increase' : ' decrease'} in market price.
            </p>
            
            <p className="mt-4">
              The current market price of {commodity.currentPrice} {commodity.priceUnit} is 
              <strong className={commodity.currentPrice >= commodity.msp ? ' text-green-600' : ' text-red-600'}>
                {commodity.currentPrice >= commodity.msp ? ' above' : ' below'} the MSP
              </strong> of {commodity.msp} {commodity.priceUnit}.
              {commodity.currentPrice < commodity.msp && (
                ' Farmers are advised to sell to government procurement agencies to ensure fair compensation.'
              )}
            </p>
            
            <p className="mt-4">
              <strong>Seasonal Outlook:</strong> {commodity.name} is primarily harvested during {commodity.season.join(' and ')}.
              {commodity.season.some(s => {
                const currentMonth = new Date().getMonth();
                if (s === 'Winter' && (currentMonth === 11 || currentMonth === 0 || currentMonth === 1)) return true;
                if (s === 'Spring' && (currentMonth === 2 || currentMonth === 3 || currentMonth === 4)) return true;
                if (s === 'Summer' && (currentMonth === 5 || currentMonth === 6 || currentMonth === 7)) return true;
                if (s === 'Monsoon' && (currentMonth === 6 || currentMonth === 7 || currentMonth === 8)) return true;
                if (s === 'Autumn' && (currentMonth === 8 || currentMonth === 9 || currentMonth === 10)) return true;
                return false;
              }) ? (
                ' We are currently in the peak harvest season, which may lead to increased supply and potential price stabilization.'
              ) : (
                ' We are currently outside the peak harvest season, which may lead to reduced supply and potential price increases.'
              )}
            </p>
            
            <p className="mt-4">
              <strong>Regional Insights:</strong> The highest production is observed in {commodity.regions[0].name} 
              with {commodity.regions[0].production.toLocaleString()} MT, followed by {commodity.regions[1].name} 
              with {commodity.regions[1].production.toLocaleString()} MT.
            </p>
            
            <p className="mt-4">
              <strong>Weather Impact:</strong> Recent weather patterns indicate that {
                commodity.weatherImpact.find(w => w.impact === Math.max(...commodity.weatherImpact.map(i => i.impact)))?.condition
              } is having the most positive impact on yield, while {
                commodity.weatherImpact.find(w => w.impact === Math.min(...commodity.weatherImpact.map(i => i.impact)))?.condition
              } is having the most negative impact.
            </p>
            
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
              <h3 className="text-lg font-medium text-green-800 mb-2">Recommendations for Farmers</h3>
              <ul className="list-disc pl-5 space-y-1 text-green-700">
                <li>
                  {commodity.currentPrice >= commodity.msp ? (
                    'Current market prices are favorable for selling in open markets.'
                  ) : (
                    'Consider selling through government procurement channels to benefit from MSP.'
                  )}
                </li>
                <li>
                  Demand is currently {commodity.demandScore >= 90 ? 'very high' : commodity.demandScore >= 80 ? 'high' : 'moderate'} 
                  with a score of {commodity.demandScore}/100.
                </li>
                <li>
                  {commodity.regions[0].name} offers the best market opportunities with highest demand score of {commodity.regions[0].demandScore}.
                </li>
                <li>
                  Plan harvesting considering weather forecasts to avoid losses from {
                    commodity.weatherImpact.find(w => w.impact === Math.min(...commodity.weatherImpact.map(i => i.impact)))?.condition
                  }.
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}