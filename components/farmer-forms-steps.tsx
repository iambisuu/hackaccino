import React from 'react';
import { FormStep, FarmerProfile, SoilData } from '@/lib/farmer-assist-types';

// Form options constants
const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const cropOptions = [
  "Wheat", "Rice", "Maize", "Barley", "Potato", "Tomato", 
  "Onion", "Sugarcane", "Cotton", "Soybean", "Chickpea"
];

const soilTextureOptions = [
  "Sandy", "Loamy", "Clay", "Silt", "Sandy Loam", "Clay Loam", "Silt Loam"
];

const irrigationOptions = [
  "Drip", "Sprinkler", "Flood", "Rainwater", "None"
];

interface FarmerFormStepsProps {
  currentStep: FormStep;
  farmerProfile: FarmerProfile;
  soilData: SoilData;
  handleFarmerInfoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLocationChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleCropChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index?: number) => void;
  handleSoilDataChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const FarmerFormSteps: React.FC<FarmerFormStepsProps> = ({
  currentStep,
  farmerProfile,
  soilData,
  handleFarmerInfoChange,
  handleLocationChange,
  handleCropChange,
  handleSoilDataChange
}) => {
  // Render the form based on the current step
  switch (currentStep) {
    case 'farmer-info':
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center text-green-700">Farmer Information</h2>
          <p className="text-gray-600 text-center">
            Please provide your basic details to get started
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={farmerProfile.name}
                onChange={handleFarmerInfoChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={farmerProfile.phone}
                onChange={handleFarmerInfoChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>
        </div>
      );
      
    case 'location-info':
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center text-green-700">Farm Location</h2>
          <p className="text-gray-600 text-center">
            Tell us about your farm location to help with regional predictions
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="state">
                State
              </label>
              <select
                id="state"
                name="state"
                value={farmerProfile.location.state}
                onChange={handleLocationChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Select State</option>
                {indianStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="district">
                District
              </label>
              <input
                type="text"
                id="district"
                name="district"
                value={farmerProfile.location.district}
                onChange={handleLocationChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter your district"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="landSize">
                Land Size (in acres)
              </label>
              <input
                type="number"
                id="landSize"
                name="landSize"
                value={farmerProfile.location.landSize || ''}
                onChange={handleLocationChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter land size in acres"
                min="0"
                step="0.1"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="irrigationType">
                Irrigation Type
              </label>
              <select
                id="irrigationType"
                name="irrigationType"
                value={farmerProfile.location.irrigationType}
                onChange={handleLocationChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Select Irrigation Type</option>
                {irrigationOptions.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      );
      
    case 'crop-info':
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center text-green-700">Crop Information</h2>
          <p className="text-gray-600 text-center">
            Tell us about the crop you're cultivating
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="cropName">
                Crop Type
              </label>
              <select
                id="cropName"
                name="cropName"
                value={farmerProfile.crops[0].cropName}
                onChange={(e) => handleCropChange(e, 0)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Select Crop</option>
                {cropOptions.map(crop => (
                  <option key={crop} value={crop}>{crop}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="variety">
                Crop Variety
              </label>
              <input
                type="text"
                id="variety"
                name="variety"
                value={farmerProfile.crops[0].variety}
                onChange={(e) => handleCropChange(e, 0)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter crop variety"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="seedSource">
                Seed Source
              </label>
              <input
                type="text"
                id="seedSource"
                name="seedSource"
                value={farmerProfile.crops[0].seedSource}
                onChange={(e) => handleCropChange(e, 0)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Where did you get your seeds from?"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="seedQuantity">
                Seed Quantity (kg)
              </label>
              <input
                type="number"
                id="seedQuantity"
                name="seedQuantity"
                value={farmerProfile.crops[0].seedQuantity || ''}
                onChange={(e) => handleCropChange(e, 0)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Amount of seeds used"
                min="0"
                step="0.1"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="seedingDate">
                Planting Date
              </label>
              <input
                type="date"
                id="seedingDate"
                name="seedingDate"
                value={farmerProfile.crops[0].seedingDate}
                onChange={(e) => handleCropChange(e, 0)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
          </div>
        </div>
      );
      
    case 'soil-info':
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center text-green-700">Soil Information</h2>
          <p className="text-gray-600 text-center">
            Help us understand your soil characteristics
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="ph">
                Soil pH (0-14)
              </label>
              <input
                type="range"
                id="ph"
                name="ph"
                min="4"
                max="10"
                step="0.1"
                value={soilData.ph}
                onChange={handleSoilDataChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Acidic (4)</span>
                <span>Neutral (7)</span>
                <span>Alkaline (10)</span>
              </div>
              <div className="text-center mt-1">
                <span className="text-sm font-medium">Current: {soilData.ph}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="nitrogen">
                  Nitrogen (ppm)
                </label>
                <input
                  type="number"
                  id="nitrogen"
                  name="nitrogen"
                  value={soilData.nitrogen || ''}
                  onChange={handleSoilDataChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Nitrogen content"
                  min="0"
                  step="1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phosphorus">
                  Phosphorus (ppm)
                </label>
                <input
                  type="number"
                  id="phosphorus"
                  name="phosphorus"
                  value={soilData.phosphorus || ''}
                  onChange={handleSoilDataChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Phosphorus content"
                  min="0"
                  step="1"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="potassium">
                  Potassium (ppm)
                </label>
                <input
                  type="number"
                  id="potassium"
                  name="potassium"
                  value={soilData.potassium || ''}
                  onChange={handleSoilDataChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Potassium content"
                  min="0"
                  step="1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="texture">
                  Soil Texture
                </label>
                <select
                  id="texture"
                  name="texture"
                  value={soilData.texture}
                  onChange={handleSoilDataChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                >
                  {soilTextureOptions.map(texture => (
                    <option key={texture} value={texture}>{texture}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="moisture">
                Soil Moisture (%)
              </label>
              <input
                type="range"
                id="moisture"
                name="moisture"
                min="0"
                max="100"
                step="1"
                value={soilData.moisture}
                onChange={handleSoilDataChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center mt-1">
                <span className="text-sm font-medium">Current: {soilData.moisture}%</span>
              </div>
            </div>
          </div>
        </div>
      );
      
    case 'review':
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center text-green-700">Review Information</h2>
          <p className="text-gray-600 text-center">
            Please review the information you've provided
          </p>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Farmer Details</h3>
              <p><span className="font-semibold">Name:</span> {farmerProfile.name}</p>
              <p><span className="font-semibold">Phone:</span> {farmerProfile.phone}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Farm Location</h3>
              <p><span className="font-semibold">State:</span> {farmerProfile.location.state}</p>
              <p><span className="font-semibold">District:</span> {farmerProfile.location.district}</p>
              <p><span className="font-semibold">Land Size:</span> {farmerProfile.location.landSize} acres</p>
              <p><span className="font-semibold">Irrigation:</span> {farmerProfile.location.irrigationType}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Crop Information</h3>
              <p><span className="font-semibold">Crop:</span> {farmerProfile.crops[0].cropName}</p>
              <p><span className="font-semibold">Variety:</span> {farmerProfile.crops[0].variety}</p>
              <p><span className="font-semibold">Seed Source:</span> {farmerProfile.crops[0].seedSource}</p>
              <p><span className="font-semibold">Quantity:</span> {farmerProfile.crops[0].seedQuantity} kg</p>
              <p><span className="font-semibold">Planting Date:</span> {farmerProfile.crops[0].seedingDate}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Soil Information</h3>
              <p><span className="font-semibold">pH:</span> {soilData.ph}</p>
              <p><span className="font-semibold">Texture:</span> {soilData.texture}</p>
              <p><span className="font-semibold">Moisture:</span> {soilData.moisture}%</p>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div>
                  <p className="text-sm text-gray-500">Nitrogen</p>
                  <p className="font-medium">{soilData.nitrogen} ppm</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phosphorus</p>
                  <p className="font-medium">{soilData.phosphorus} ppm</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Potassium</p>
                  <p className="font-medium">{soilData.potassium} ppm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      
    default:
      return null;
  }
};

export default FarmerFormSteps;