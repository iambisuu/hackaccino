"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FarmerProfile, 
  SoilData, 
  FormStep,
  FarmerAssistance
} from '@/lib/farmer-assist-types';
import { generateFarmerAssistance } from '@/lib/farmer-assist-data';
import { getAIRecommendations } from '@/lib/openai-service';
import FarmerFormSteps from './farmer-forms-steps';
import FarmerResultsView from './farmer-results-view';
import Link from 'next/link';

// Default farmer profile
const defaultFarmerProfile: FarmerProfile = {
  id: '',
  name: '',
  phone: '',
  location: {
    state: '',
    district: '',
    landSize: 0,
    irrigationType: 'None'
  },
  crops: [
    {
      cropId: '1',
      cropName: '',
      variety: '',
      seedSource: '',
      seedQuantity: 0,
      seedingDate: ''
    }
  ]
};

const FarmerAssistForm = () => {
  const [currentStep, setCurrentStep] = useState<FormStep>('farmer-info');
  const [farmerProfile, setFarmerProfile] = useState<FarmerProfile>(defaultFarmerProfile);
  const [soilData, setSoilData] = useState<SoilData>({
    ph: 7.0,
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0,
    organicMatter: 0,
    moisture: 0,
    texture: 'Loamy'
  });
  const [assistance, setAssistance] = useState<FarmerAssistance | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  
  // Form transitions
  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };
  
  const handleFarmerInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFarmerProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFarmerProfile(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: name === 'landSize' ? parseFloat(value) : value
      }
    }));
  };
  
  const handleCropChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number = 0) => {
    const { name, value } = e.target;
    const updatedCrops = [...farmerProfile.crops];
    updatedCrops[index] = {
      ...updatedCrops[index],
      [name]: name === 'seedQuantity' ? parseFloat(value) : value
    };
    
    setFarmerProfile(prev => ({
      ...prev,
      crops: updatedCrops
    }));
  };
  
  const handleSoilDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSoilData(prev => ({
      ...prev,
      [name]: name === 'texture' ? value : parseFloat(value)
    }));
  };

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };
  
  const goToNextStep = () => {
    switch (currentStep) {
      case 'farmer-info':
        setCurrentStep('location-info');
        break;
      case 'location-info':
        setCurrentStep('crop-info');
        break;
      case 'crop-info':
        setCurrentStep('soil-info');
        break;
      case 'soil-info':
        setCurrentStep('review');
        break;
      case 'review':
        // Generate predictions and go to results
        generateResults();
        setCurrentStep('results');
        break;
      default:
        break;
    }
  };
  
  const goToPreviousStep = () => {
    switch (currentStep) {
      case 'location-info':
        setCurrentStep('farmer-info');
        break;
      case 'crop-info':
        setCurrentStep('location-info');
        break;
      case 'soil-info':
        setCurrentStep('crop-info');
        break;
      case 'review':
        setCurrentStep('soil-info');
        break;
      case 'results':
        setCurrentStep('review');
        break;
      default:
        break;
    }
  };
  
  const generateResults = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Store API key in localStorage for temporary usage
      if (apiKey) {
        window.localStorage.setItem('openai_api_key', apiKey);
        // We'll use this key directly in the getAIRecommendations function
      }
      
      let recommendations: FarmerAssistance | null = null;
      
      // Try to get AI recommendations if API key is provided
      if (apiKey) {
        try {
          recommendations = await getAIRecommendations(farmerProfile, soilData, apiKey);
        } catch (aiError) {
          console.error('Error with OpenAI API:', aiError);
          setError(`AI recommendation failed: ${ 'Unknown error'}. Falling back to local recommendations.`);
          // Continue to fallback
        }
      }
      
      // Fall back to local generation if AI failed or no API key provided
      if (!recommendations) {
        if (apiKey) {
          console.log("Falling back to local recommendation generation");
        }
        
        const crop = farmerProfile.crops[0];
        recommendations = generateFarmerAssistance(
          crop.cropName,
          farmerProfile.location.state,
          farmerProfile.location.district,
          { ph: soilData.ph },
          crop.seedingDate,
          farmerProfile.location.landSize
        );
      }
      
      setAssistance(recommendations);
      // Clear any previous error if we successfully got recommendations
      setError(null);
    } catch (error) {
      console.error('Error generating recommendations:', error);
      setError('Failed to generate recommendations. Please try again or check your API key.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetForm = () => {
    setFarmerProfile(defaultFarmerProfile);
    setSoilData({
      ph: 7.0,
      nitrogen: 0,
      phosphorus: 0,
      potassium: 0,
      organicMatter: 0,
      moisture: 0,
      texture: 'Loamy'
    });
    setAssistance(null);
    setError(null);
    setCurrentStep('farmer-info');
  };
  
  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="bg-green-600 h-2">
        <div 
          className="bg-green-400 h-full transition-all duration-300"
          style={{ 
            width: 
              currentStep === 'farmer-info' ? '20%' : 
              currentStep === 'location-info' ? '40%' : 
              currentStep === 'crop-info' ? '60%' : 
              currentStep === 'soil-info' ? '80%' : '100%' 
          }}
        />
      </div>
      
      {/* Form */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={formVariants}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 'results' ? (
              isLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mb-4"></div>
                  <p className="text-lg text-center">Generating AI-powered recommendations...</p>
                  <p className="text-sm text-gray-500 mt-2 text-center">This may take a minute as we analyze your farm data</p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <p>{error}</p>
                  </div>
                  <button
                    onClick={() => setCurrentStep('review')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Go Back and Try Again
                  </button>
                </div>
              ) : (
                <FarmerResultsView 
                  assistance={assistance}
                  farmerProfile={farmerProfile}
                />
              )
            ) : currentStep === 'review' ? (
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
                  
                  {/* OpenAI API Key input */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 className="text-lg font-medium text-blue-800 mb-2">AI-Powered Recommendations</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Enter your OpenAI API key to get AI-powered recommendations. If you don't have one, leave this blank to use our built-in recommendation engine.
                    </p>
                    <input
                      type="password"
                      placeholder="OpenAI API Key (optional)"
                      value={apiKey}
                      onChange={handleApiKeyChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Your API key is used only for this recommendation and is not stored on our servers.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <FarmerFormSteps
                currentStep={currentStep}
                farmerProfile={farmerProfile}
                soilData={soilData}
                handleFarmerInfoChange={handleFarmerInfoChange}
                handleLocationChange={handleLocationChange}
                handleCropChange={handleCropChange}
                handleSoilDataChange={handleSoilDataChange}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Navigation Buttons */}
      <div className="bg-gray-50 px-6 py-4 flex justify-between">
        {currentStep !== 'farmer-info' ? (
          <button
            onClick={goToPreviousStep}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            disabled={isLoading}
          >
            Back
          </button>
        ) : (
          <div></div>
        )}
        
        {currentStep !== 'results' ? (
          <button
            onClick={goToNextStep}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            disabled={isLoading}
          >
            {currentStep === 'review' ? 'Generate Recommendations' : 'Next'}
          </button>
        ) : (
          <div className=''>
          <button
            onClick={resetForm}
            className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            disabled={isLoading}
          >
            Start New Assessment
          </button>
          <Link href='/ai-chat' className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Know More with AI
          </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerAssistForm;