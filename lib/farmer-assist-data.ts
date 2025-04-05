import { DiseasePrediction, FarmerAssistance, WeatherPrediction } from './farmer-assist-types';

// Crop-specific disease database
const cropDiseases: Record<string, DiseasePrediction[]> = {
  "wheat": [
    {
      name: "Leaf Rust (Puccinia triticina)",
      riskLevel: "High",
      symptoms: [
        "Small, round to oval orange-brown pustules on leaves",
        "Yellow halos around pustules",
        "Leaf discoloration and drying",
        "Reduced photosynthesis"
      ],
      preventiveMeasures: [
        "Plant resistant varieties",
        "Early sowing to escape high disease pressure",
        "Balanced fertilization (avoid excess nitrogen)",
        "Crop rotation with non-host crops"
      ],
      treatmentOptions: [
        "Fungicides containing propiconazole or tebuconazole",
        "Apply at first sign of disease",
        "Follow recommended spray intervals"
      ],
      optimalConditions: "Temperature 15-25°C with high humidity above 80%",
      imageUrl: "/images/diseases/wheat-leaf-rust.jpg"
    },
    {
      name: "Powdery Mildew (Blumeria graminis)",
      riskLevel: "Medium",
      symptoms: [
        "White to gray powdery patches on leaves and stems",
        "Yellowing of affected tissues",
        "Reduced photosynthesis",
        "Premature senescence"
      ],
      preventiveMeasures: [
        "Use resistant varieties",
        "Avoid dense planting",
        "Balance nitrogen fertilization",
        "Maintain field sanitation"
      ],
      treatmentOptions: [
        "Sulfur-based fungicides",
        "Triazole fungicides",
        "Application at early disease stage"
      ],
      optimalConditions: "Cool (15-22°C) temperatures with moderate humidity, shaded conditions",
      imageUrl: "/images/diseases/wheat-powdery-mildew.jpg"
    },
    {
      name: "Stem Rust (Puccinia graminis)",
      riskLevel: "Medium",
      symptoms: [
        "Reddish-brown oval-shaped pustules on stems and leaves",
        "Tearing of the epidermis",
        "Weakening of stems leading to lodging",
        "Shriveled grains"
      ],
      preventiveMeasures: [
        "Grow resistant varieties",
        "Elimination of alternate hosts (barberry)",
        "Early planting",
        "Proper field spacing"
      ],
      treatmentOptions: [
        "Triazole fungicides",
        "Strobilurin fungicides",
        "Carboxamide fungicides"
      ],
      optimalConditions: "Warm temperatures (18-30°C) with high humidity and wet conditions",
      imageUrl: "/images/diseases/wheat-stem-rust.jpg"
    }
  ],
  "rice": [
    {
      name: "Blast (Magnaporthe oryzae)",
      riskLevel: "High",
      symptoms: [
        "Diamond-shaped lesions on leaves",
        "Gray centers with brown margins",
        "Neck and panicle infection",
        "Empty or partially filled grains"
      ],
      preventiveMeasures: [
        "Resistant varieties",
        "Balanced fertilization",
        "Proper water management",
        "Field sanitation"
      ],
      treatmentOptions: [
        "Triazole fungicides",
        "Strobilurin fungicides",
        "Silicon supplements"
      ],
      optimalConditions: "High humidity (>90%) with temperatures between 24-28°C",
      imageUrl: "/images/diseases/rice-blast.jpg"
    }
  ],
  "potato": [
    {
      name: "Late Blight (Phytophthora infestans)",
      riskLevel: "Very High",
      symptoms: [
        "Dark, water-soaked spots on leaves",
        "White fuzzy growth on leaf undersides",
        "Rapid wilting and browning",
        "Tuber rot with reddish-brown discoloration"
      ],
      preventiveMeasures: [
        "Plant certified disease-free seed potatoes",
        "Resistant varieties",
        "Proper hilling to protect tubers",
        "Adequate plant spacing"
      ],
      treatmentOptions: [
        "Mancozeb fungicides",
        "Metalaxyl + mancozeb combinations",
        "Copper-based products"
      ],
      optimalConditions: "Cool (10-20°C), wet conditions with high humidity",
      imageUrl: "/images/diseases/potato-late-blight.jpg"
    }
  ]
};

// Generate weather predictions
export const generateWeatherPredictions = (
  state: string,
  district: string,
  cropName: string,
  startDate: string
): WeatherPrediction[] => {
  const predictions: WeatherPrediction[] = [];
  const start = new Date(startDate);
  
  // Generate 14 days of weather predictions
  for (let i = 0; i < 14; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    
    // Create some weather anomalies based on crop and region
    const isAnomaly = Math.random() < 0.2; // 20% chance of anomaly
    
    // Base temperature on region (simplified)
    let baseMinTemp = 20;
    let baseMaxTemp = 30;
    
    if (state === "Punjab" || state === "Haryana") {
      baseMinTemp = 18;
      baseMaxTemp = 28;
    } else if (state === "Tamil Nadu" || state === "Kerala") {
      baseMinTemp = 24;
      baseMaxTemp = 34;
    }
    
    // Random variations
    const minTemp = baseMinTemp + (Math.random() * 6 - 3) + (isAnomaly ? -5 : 0);
    const maxTemp = baseMaxTemp + (Math.random() * 6 - 3) + (isAnomaly ? 5 : 0);
    
    // Precipitation depends on region and randomness
    let basePrecipitation = 2;
    if (state === "Kerala" || state === "West Bengal") {
      basePrecipitation = 8;
    }
    const precipitation = isAnomaly ? 
      basePrecipitation * 5 + Math.random() * 20 : 
      Math.max(0, basePrecipitation + Math.random() * 5 - 2);
    
    // Generate description based on conditions
    let description = "Clear skies with moderate temperature.";
    if (precipitation > 15) {
      description = "Heavy rainfall expected. Consider drainage for fields.";
    } else if (precipitation > 5) {
      description = "Light to moderate rainfall expected.";
    } else if (maxTemp > 35) {
      description = "Unusually hot conditions. Ensure adequate irrigation.";
    } else if (minTemp < 15) {
      description = "Cooler than normal. Watch for frost-sensitive crops.";
    }
    
    predictions.push({
      date: date.toISOString().split('T')[0],
      temperature: {
        min: Math.round(minTemp * 10) / 10,
        max: Math.round(maxTemp * 10) / 10
      },
      precipitation: Math.round(precipitation * 10) / 10,
      humidity: Math.round(60 + Math.random() * 30),
      windSpeed: Math.round((5 + Math.random() * 15) * 10) / 10,
      isAnomaly,
      description
    });
  }
  
  return predictions;
};

// Get disease predictions based on crop, region, and conditions
export const getDiseasePredictions = (
  cropName: string,
  state: string,
  soilPH: number,
  avgTemperature: number,
  avgHumidity: number
): DiseasePrediction[] => {
  // Default to empty array if crop not found
  const potentialDiseases = cropDiseases[cropName.toLowerCase()] || [];
  
  // Filter and adjust risk levels based on conditions
  return potentialDiseases.map(disease => {
    let adjustedRisk: 'Low' | 'Medium' | 'High' | 'Very High' = disease.riskLevel;
    
    // Adjust risk based on environmental factors
    if (disease.name.includes("Rust") && avgHumidity > 75) {
      adjustedRisk = 'High';
    } else if (disease.name.includes("Mildew") && avgTemperature < 20) {
      adjustedRisk = 'High';
    } else if (disease.name.includes("Blight") && avgHumidity > 80 && avgTemperature < 25) {
      adjustedRisk = 'Very High';
    }
    
    // Soil pH can affect some diseases
    if (disease.name.includes("Scab") && soilPH > 7.5) {
      adjustedRisk = 'High';
    }
    
    return {
      ...disease,
      riskLevel: adjustedRisk
    };
  }).sort((a, b) => {
    const riskOrder = { 'Low': 0, 'Medium': 1, 'High': 2, 'Very High': 3 };
    return riskOrder[b.riskLevel] - riskOrder[a.riskLevel];
  });
};

// Generate complete farmer assistance
export const generateFarmerAssistance = (
  cropName: string,
  state: string,
  district: string,
  soilData: { ph: number },
  plantingDate: string,
  landSize: number
): FarmerAssistance => {
  // Generate weather predictions
  const weatherPredictions = generateWeatherPredictions(state, district, cropName, new Date().toISOString());
  
  // Calculate average temperature and humidity from weather predictions
  const avgTemperature = weatherPredictions.reduce((sum, day) => 
    sum + ((day.temperature.max + day.temperature.min) / 2), 0) / weatherPredictions.length;
  
  const avgHumidity = weatherPredictions.reduce((sum, day) => sum + day.humidity, 0) / weatherPredictions.length;
  
  // Get disease predictions
  const diseasePredictions = getDiseasePredictions(
    cropName,
    state,
    soilData.ph,
    avgTemperature,
    avgHumidity
  );
  
  // Calculate next irrigation date based on weather and crop
  const nextIrrigationDate = new Date();
  const rainInNext3Days = weatherPredictions.slice(0, 3).some(day => day.precipitation > 5);
  
  if (rainInNext3Days) {
    // If rain expected, delay irrigation
    nextIrrigationDate.setDate(nextIrrigationDate.getDate() + 4);
  } else {
    // Otherwise irrigate sooner
    nextIrrigationDate.setDate(nextIrrigationDate.getDate() + 2);
  }
  
  // Calculate harvest date (simplified)
  const plantDate = new Date(plantingDate);
  const harvestDate = new Date(plantDate);
  
  // Different growth periods by crop
  let growthDays = 120; // default
  if (cropName.toLowerCase() === 'wheat') growthDays = 120;
  if (cropName.toLowerCase() === 'rice') growthDays = 110;
  if (cropName.toLowerCase() === 'potato') growthDays = 90;
  
  harvestDate.setDate(plantDate.getDate() + growthDays);
  
  // Calculate MSP based on crop
  let mspAmount = 0;
  if (cropName.toLowerCase() === 'wheat') mspAmount = 2125;
  if (cropName.toLowerCase() === 'rice') mspAmount = 2060;
  if (cropName.toLowerCase() === 'potato') mspAmount = 0; // No MSP for potato
  
  return {
    weatherPredictions,
    diseasePredictions,
    irrigationRecommendation: {
      frequencyDays: rainInNext3Days ? 4 : 2,
      waterAmount: cropName.toLowerCase() === 'rice' ? 50000 : 25000, // liters per acre
      bestTimeOfDay: 'Early Morning',
      nextIrrigationDate: nextIrrigationDate.toISOString().split('T')[0],
      adjustmentReason: rainInNext3Days ? 
        "Delayed due to expected rainfall" : 
        "Standard irrigation schedule for current growth stage"
    },
    harvestRecommendation: {
      optimalDate: harvestDate.toISOString().split('T')[0],
      expectedYield: cropName.toLowerCase() === 'wheat' ? 1800 : 
                    cropName.toLowerCase() === 'rice' ? 2200 : 
                    cropName.toLowerCase() === 'potato' ? 15000 : 1500, // kg per acre
      qualityFactors: [
        "Moisture content of grains",
        "Color and size uniformity",
        "Freedom from disease symptoms",
        "Maturity level"
      ],
      harvestingMethod: cropName.toLowerCase() === 'wheat' || cropName.toLowerCase() === 'rice' ? 
        "Combine harvester for efficiency" : "Manual harvesting for best quality",
      weatherSuitability: 'Good'
    },
    marketRecommendation: {
      currentLocalPrice: cropName.toLowerCase() === 'wheat' ? 2200 : 
                        cropName.toLowerCase() === 'rice' ? 2100 : 
                        cropName.toLowerCase() === 'potato' ? 1200 : 1800,
      projectedPrice: cropName.toLowerCase() === 'wheat' ? 2350 : 
                      cropName.toLowerCase() === 'rice' ? 2180 : 
                      cropName.toLowerCase() === 'potato' ? 950 : 1900,
      bestSellingTime: cropName.toLowerCase() === 'potato' ? "Immediately after harvest" : "2-4 weeks after harvest",
      nearbyMandis: [
        {
          name: `${district} Main Mandi`,
          distance: 15,
          currentPrice: cropName.toLowerCase() === 'wheat' ? 2180 : 
                        cropName.toLowerCase() === 'rice' ? 2090 : 
                        cropName.toLowerCase() === 'potato' ? 1150 : 1780,
          expectedFutureTrend: cropName.toLowerCase() === 'potato' ? 'Declining' : 'Rising'
        },
        {
          name: `${state} State Agricultural Market`,
          distance: 35,
          currentPrice: cropName.toLowerCase() === 'wheat' ? 2220 : 
                        cropName.toLowerCase() === 'rice' ? 2120 : 
                        cropName.toLowerCase() === 'potato' ? 1250 : 1850,
          expectedFutureTrend: 'Stable'
        }
      ],
      mspInfo: mspAmount > 0 ? {
        current: mspAmount,
        applicableFrom: "October 2024",
        applicableTo: "September 2025"
      } : undefined
    }
  };
};