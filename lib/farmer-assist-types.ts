// Form steps
export type FormStep = 'farmer-info' | 'location-info' | 'crop-info' | 'soil-info' | 'review' | 'results';

// Soil data
export interface SoilData {
  ph: number;
  nitrogen: number; // ppm
  phosphorus: number; // ppm
  potassium: number; // ppm
  organicMatter: number; // percentage
  moisture: number; // percentage
  texture: string; // 'Sandy' | 'Loamy' | 'Clay' | 'Silt' | 'Sandy Loam' | 'Clay Loam' | 'Silt Loam'
}

export interface LocationData {
  state: string;
  district: string;
  latitude?: number;
  longitude?: number;
  elevation?: number; // meters
  landSize: number; // acres
  irrigationType: string; // 'Drip' | 'Sprinkler' | 'Flood' | 'Rainwater' | 'None'
}

export interface FarmerCrop {
  cropId: string;
  cropName: string;
  variety: string;
  seedSource: string;
  seedQuantity: number; // kg
  seedingDate: string; // YYYY-MM-DD
  expectedHarvestDate?: string; // YYYY-MM-DD
  previousYield?: number; // kg per acre
}

// Farmer profile
export interface FarmerProfile {
  id: string;
  name: string;
  phone: string;
  location: LocationData;
  soilData?: SoilData;
  crops: FarmerCrop[];
  pastCrops?: FarmerCrop[];
}

export interface WeatherPrediction {
  date: string;
  temperature: {
    min: number;
    max: number;
  };
  precipitation: number; // mm
  humidity: number; // percentage
  windSpeed: number; // km/h
  isAnomaly: boolean;
  description: string;
}

export interface DiseasePrediction {
  name: string;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Very High';
  symptoms: string[];
  preventiveMeasures: string[];
  treatmentOptions: string[];
  optimalConditions: string;
  imageUrl?: string;
}

export interface IrrigationRecommendation {
  frequencyDays: number;
  waterAmount: number; // liters per acre
  bestTimeOfDay: 'Early Morning' | 'Late Evening' | 'Night';
  nextIrrigationDate: string;
  adjustmentReason?: string;
}

export interface HarvestRecommendation {
  optimalDate: string;
  expectedYield: number; // kg per acre
  qualityFactors: string[];
  harvestingMethod: string;
  weatherSuitability: 'Ideal' | 'Good' | 'Average' | 'Poor';
}

export interface MarketRecommendation {
  currentLocalPrice: number;
  projectedPrice: number;
  bestSellingTime: string;
  nearbyMandis: {
    name: string;
    distance: number; // km
    currentPrice: number;
    expectedFutureTrend: 'Rising' | 'Stable' | 'Declining';
  }[];
  mspInfo?: {
    current: number;
    applicableFrom: string;
    applicableTo: string;
  };
}

// Farmer assistance (AI or locally generated recommendations)
export interface FarmerAssistance {
  weatherPredictions: WeatherPrediction[];
  diseasePredictions: DiseasePrediction[];
  irrigationRecommendation: IrrigationRecommendation;
  harvestRecommendation: HarvestRecommendation;
  marketRecommendation: MarketRecommendation;
  
  // For compatibility with OpenAI response
  cropPrediction?: {
    expectedYield: string;
    harvestDate: string;
    potentialIssues: string[];
  };
  recommendations?: {
    fertilizer: {
      type: string;
      schedule: string;
      quantity: string;
    };
    irrigation: {
      method: string;
      schedule: string;
      quantity: string;
    };
    pestManagement: {
      commonPests: string[];
      preventiveMeasures: string[];
      solutions: string[];
    };
  };
  marketInsights?: {
    currentPrice: string;
    priceTrend: string;
    bestMarkets: string[];
  };
}