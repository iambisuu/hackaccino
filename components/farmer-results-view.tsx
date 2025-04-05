import React from 'react';
import { motion } from 'framer-motion';
import { FarmerAssistance, FarmerProfile, WeatherPrediction, DiseasePrediction } from '@/lib/farmer-assist-types';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  Legend
} from 'recharts';

interface FarmerResultsViewProps {
  assistance: FarmerAssistance | null;
  farmerProfile: FarmerProfile;
}

// Weather card component
const WeatherCard = ({ weather }: { weather: WeatherPrediction }) => {
  const date = new Date(weather.date);
  const formattedDate = date.toLocaleDateString('en-IN', { 
    day: 'numeric', month: 'short'
  });
  
  // Weather icon based on conditions
  const getWeatherIcon = () => {
    if (weather.precipitation > 15) return '🌧️';
    if (weather.precipitation > 5) return '🌦️';
    if (weather.temperature.max > 35) return '☀️';
    if (weather.temperature.min < 15) return '❄️';
    return '🌤️';
  };
  
  return (
    <div className={`flex-shrink-0 w-28 rounded-lg p-3 ${weather.isAnomaly ? 'bg-yellow-50 border border-yellow-200' : 'bg-blue-50'}`}>
      <p className="text-center font-medium text-gray-700">{formattedDate}</p>
      <div className="text-center text-3xl my-2">{getWeatherIcon()}</div>
      <p className="text-center text-sm">
        <span className="text-red-600">{weather.temperature.max}°</span>
        {' / '}
        <span className="text-blue-600">{weather.temperature.min}°</span>
      </p>
      <p className="text-center text-xs text-gray-600 mt-1">
        {weather.precipitation > 0 ? `${weather.precipitation}mm` : 'No rain'}
      </p>
      {weather.isAnomaly && (
        <p className="text-xs text-yellow-700 mt-1 text-center">⚠️ Anomaly</p>
      )}
    </div>
  );
};

// Disease card component
const DiseaseCard = ({ disease }: { disease: DiseasePrediction }) => {
  const getRiskColor = () => {
    switch (disease.riskLevel) {
      case 'Low': return 'bg-green-50 border-green-200 text-green-700';
      case 'Medium': return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'High': return 'bg-orange-50 border-orange-200 text-orange-700';
      case 'Very High': return 'bg-red-50 border-red-200 text-red-700';
      default: return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };
  
  return (
    <div className={`rounded-lg border p-4 ${getRiskColor()}`}>
      <div className="flex justify-between items-start">
        <h4 className="text-lg font-medium">{disease.name}</h4>
        <span className="rounded-full px-2 py-1 text-xs font-medium bg-white">
          {disease.riskLevel} Risk
        </span>
      </div>
      
      <div className="mt-3">
        <h5 className="text-sm font-medium mb-1">Symptoms:</h5>
        <ul className="text-sm list-disc pl-5 space-y-1">
          {disease.symptoms.slice(0, 3).map((symptom, index) => (
            <li key={index}>{symptom}</li>
          ))}
        </ul>
      </div>
      
      <div className="mt-3">
        <h5 className="text-sm font-medium mb-1">Prevention:</h5>
        <ul className="text-sm list-disc pl-5 space-y-1">
          {disease.preventiveMeasures.slice(0, 2).map((measure, index) => (
            <li key={index}>{measure}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Irrigation recommendation widget
const IrrigationWidget = ({ 
  recommendation 
}: { 
  recommendation: FarmerAssistance['irrigationRecommendation'] 
}) => {
  const nextIrrigationDate = new Date(recommendation.nextIrrigationDate);
  const formattedDate = nextIrrigationDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  
  return (
    <div className="bg-blue-50 rounded-lg p-4 h-full">
      <h3 className="text-lg font-medium text-blue-800 mb-3">Irrigation Plan</h3>
      
      <div className="p-3 bg-white rounded-md mb-3">
        <p className="text-sm text-gray-600">Next Irrigation</p>
        <p className="text-xl font-bold text-blue-700">{formattedDate}</p>
        <p className="text-xs text-gray-500 mt-1">{recommendation.adjustmentReason}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <div className="p-2 bg-white rounded-md">
          <p className="text-xs text-gray-600">Frequency</p>
          <p className="font-medium">{recommendation.frequencyDays} days</p>
        </div>
        <div className="p-2 bg-white rounded-md">
          <p className="text-xs text-gray-600">Best Time</p>
          <p className="font-medium">{recommendation.bestTimeOfDay}</p>
        </div>
      </div>
      
      <div className="p-2 bg-white rounded-md mt-2">
        <p className="text-xs text-gray-600">Water Amount</p>
        <p className="font-medium">{(recommendation.waterAmount / 1000).toFixed(1)} kL/acre</p>
      </div>
    </div>
  );
};

// Harvest recommendation widget
const HarvestWidget = ({ 
  recommendation 
}: { 
  recommendation: FarmerAssistance['harvestRecommendation'] 
}) => {
  const harvestDate = new Date(recommendation.optimalDate);
  const formattedDate = harvestDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  
  return (
    <div className="bg-amber-50 rounded-lg p-4 h-full">
      <h3 className="text-lg font-medium text-amber-800 mb-3">Harvest Plan</h3>
      
      <div className="p-3 bg-white rounded-md mb-3">
        <p className="text-sm text-gray-600">Optimal Harvest Date</p>
        <p className="text-xl font-bold text-amber-700">{formattedDate}</p>
        <p className="text-xs text-gray-500 mt-1">Weather suitability: {recommendation.weatherSuitability}</p>
      </div>
      
      <div className="p-3 bg-white rounded-md mb-3">
        <p className="text-sm text-gray-600">Expected Yield</p>
        <p className="text-xl font-bold text-amber-700">{recommendation.expectedYield.toLocaleString()} kg/acre</p>
      </div>
      
      <div className="p-2 bg-white rounded-md">
        <p className="text-xs text-gray-600">Recommended Method</p>
        <p className="font-medium">{recommendation.harvestingMethod}</p>
      </div>
    </div>
  );
};

// Market recommendation widget
const MarketWidget = ({ 
  recommendation 
}: { 
  recommendation: FarmerAssistance['marketRecommendation'] 
}) => {
  return (
    <div className="bg-green-50 rounded-lg p-4 h-full">
      <h3 className="text-lg font-medium text-green-800 mb-3">Market Insights</h3>
      
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="p-2 bg-white rounded-md">
          <p className="text-xs text-gray-600">Current Price</p>
          <p className="text-lg font-bold text-green-700">₹{recommendation.currentLocalPrice}</p>
        </div>
        <div className="p-2 bg-white rounded-md">
          <p className="text-xs text-gray-600">Projected Price</p>
          <p className={`text-lg font-bold ${recommendation.projectedPrice > recommendation.currentLocalPrice ? 'text-green-700' : 'text-red-700'}`}>
            ₹{recommendation.projectedPrice}
          </p>
        </div>
      </div>
      
      <div className="p-3 bg-white rounded-md mb-3">
        <p className="text-sm text-gray-600">Best Selling Time</p>
        <p className="font-medium">{recommendation.bestSellingTime}</p>
      </div>
      
      {recommendation.mspInfo && (
        <div className="p-3 bg-white rounded-md">
          <p className="text-sm text-gray-600">MSP Information</p>
          <p className="text-lg font-bold text-green-700">₹{recommendation.mspInfo.current}</p>
          <p className="text-xs text-gray-500 mt-1">Valid: {recommendation.mspInfo.applicableFrom} to {recommendation.mspInfo.applicableTo}</p>
        </div>
      )}
    </div>
  );
};

const FarmerResultsView: React.FC<FarmerResultsViewProps> = ({ assistance, farmerProfile }) => {
  if (!assistance) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mb-4"></div>
        <p className="text-lg">Generating recommendations...</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-green-700">Personalized Recommendations</h2>
        <p className="text-gray-600 mt-2">
          Based on your inputs, we've generated the following insights for {farmerProfile.crops[0].cropName}
        </p>
      </div>
      
      {/* Weather Predictions */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Weather Forecast (Next 7 Days)</h3>
        <div className="overflow-x-auto pb-2">
          <div className="flex space-x-4 pb-4 pl-1">
            {assistance.weatherPredictions.slice(0, 7).map((weather, index) => (
              <WeatherCard key={index} weather={weather} />
            ))}
          </div>
        </div>
        
        {assistance.weatherPredictions.some(w => w.isAnomaly) && (
          <div className="mt-4">
            <h4 className="text-lg font-medium text-gray-700 mb-2">Weather Alerts</h4>
            <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200">
              <ul className="list-disc pl-5 space-y-2">
                {assistance.weatherPredictions
                  .filter(w => w.isAnomaly)
                  .slice(0, 3)
                  .map((weather, index) => (
                    <li key={index} className="text-gray-700">
                      <span className="font-medium">{new Date(weather.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>: {weather.description}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      
      {/* Disease Predictions */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Potential Disease Risks</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assistance.diseasePredictions.map((disease, index) => (
            <DiseaseCard key={index} disease={disease} />
          ))}
        </div>
      </div>
      
      {/* Irrigation, Harvest, and Market Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <IrrigationWidget recommendation={assistance.irrigationRecommendation} />
        <HarvestWidget recommendation={assistance.harvestRecommendation} />
        <MarketWidget recommendation={assistance.marketRecommendation} />
      </div>
      
      {/* Action Plan */}
      <div className="bg-green-50 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-green-800 mb-4">Your Action Plan</h3>
        
        <ol className="list-decimal pl-5 space-y-3 text-gray-700">
          <li className="pb-2 border-b border-green-100">
            <span className="font-medium">Irrigation Schedule:</span> Water your crops every {assistance.irrigationRecommendation.frequencyDays} days, preferably in the {assistance.irrigationRecommendation.bestTimeOfDay.toLowerCase()}. Next irrigation: {new Date(assistance.irrigationRecommendation.nextIrrigationDate).toLocaleDateString('en-IN')}.
          </li>
          <li className="pb-2 border-b border-green-100">
            <span className="font-medium">Disease Management:</span> Monitor for signs of {assistance.diseasePredictions[0]?.name.split(' ')[0]}, especially during humid conditions. Apply preventive measures as recommended.
          </li>
          <li className="pb-2 border-b border-green-100">
            <span className="font-medium">Weather Adaptation:</span> {assistance.weatherPredictions.some(w => w.precipitation > 15) ? 'Ensure proper drainage to handle expected heavy rainfall.' : 'Regular irrigation is crucial as no significant rainfall is expected.'}
          </li>
          <li className="pb-2 border-b border-green-100">
            <span className="font-medium">Harvest Planning:</span> Prepare for harvest around {new Date(assistance.harvestRecommendation.optimalDate).toLocaleDateString('en-IN')}. Expected yield: {assistance.harvestRecommendation.expectedYield.toLocaleString()} kg/acre.
          </li>
          <li>
            <span className="font-medium">Market Strategy:</span> Current market price is ₹{assistance.marketRecommendation.currentLocalPrice}/kg. {assistance.marketRecommendation.projectedPrice > assistance.marketRecommendation.currentLocalPrice ? 'Consider storing for better prices if possible.' : 'Consider selling soon after harvest.'}
            {assistance.marketRecommendation.mspInfo && (
              <span className="block mt-1 ml-6 text-sm text-green-700">
                MSP available at ₹{assistance.marketRecommendation.mspInfo.current}/kg through government procurement centers.
              </span>
            )}
          </li>
        </ol>
      </div>
    </div>
  );
};

export default FarmerResultsView;