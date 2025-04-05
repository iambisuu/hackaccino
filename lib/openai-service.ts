import { FarmerProfile, SoilData, FarmerAssistance } from './farmer-assist-types';

// OpenAI API interface
export async function getAIRecommendations(
  farmerProfile: FarmerProfile,
  soilData: SoilData
): Promise<FarmerAssistance | null> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || '';
    
    if (!apiKey) {
      console.error('OpenAI API key is missing');
      return null;
    }

    // Format the data to send to OpenAI
    const messages = [
      {
        role: "system",
        content: `You are an agricultural expert assistant. Analyze the provided farm data and generate specific, actionable recommendations for the farmer.
        Include weather insights, disease risks, irrigation schedule, harvest planning, and market insights.
        Format your response as JSON matching the FarmerAssistance type with the following structure:
        {
          "weatherPredictions": [{date, temperature: {min, max}, precipitation, humidity, windSpeed, isAnomaly, description}],
          "diseasePredictions": [{name, riskLevel, symptoms, preventiveMeasures, treatmentOptions, optimalConditions}],
          "irrigationRecommendation": {frequencyDays, waterAmount, bestTimeOfDay, nextIrrigationDate, adjustmentReason},
          "harvestRecommendation": {optimalDate, expectedYield, qualityFactors, harvestingMethod, weatherSuitability},
          "marketRecommendation": {currentLocalPrice, projectedPrice, bestSellingTime, nearbyMandis: [{name, distance, currentPrice, expectedFutureTrend}], mspInfo}
        }`
      },
      {
        role: "user",
        content: `Please analyze this farm data and provide recommendations:
        
        Farmer: ${farmerProfile.name}
        Location: ${farmerProfile.location.district}, ${farmerProfile.location.state}
        Land Size: ${farmerProfile.location.landSize} acres
        Irrigation Type: ${farmerProfile.location.irrigationType}
        
        Crop: ${farmerProfile.crops[0].cropName}
        Variety: ${farmerProfile.crops[0].variety}
        Planting Date: ${farmerProfile.crops[0].seedingDate}
        
        Soil pH: ${soilData.ph}
        Soil Texture: ${soilData.texture}
        Nitrogen: ${soilData.nitrogen} ppm
        Phosphorus: ${soilData.phosphorus} ppm
        Potassium: ${soilData.potassium} ppm
        Soil Moisture: ${soilData.moisture}%
        
        Current Date: ${new Date().toISOString().split('T')[0]}
        
        Provide detailed, actionable recommendations in the JSON format specified.`
      }
    ];

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages,
        temperature: 0.7,
        max_tokens: 2500
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API Error:', errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const result = await response.json();
    const aiResponse = result.choices[0].message.content;
    
    // Parse JSON from the response
    try {
      // Extract JSON if it's wrapped in markdown code blocks
      const jsonRegex = /```json\n([\s\S]*?)\n```|```([\s\S]*?)```|({[\s\S]*})/;
      const match = aiResponse.match(jsonRegex);
      
      let jsonString = aiResponse;
      if (match) {
        jsonString = match[1] || match[2] || match[3];
      }
      
      const recommendations = JSON.parse(jsonString) as FarmerAssistance;
      return processRecommendations(recommendations, farmerProfile);
    } catch (error) {
      console.error('Error parsing AI response:', error);
      console.log('Raw AI response:', aiResponse);
      return null;
    }
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return null;
  }
}

// Process and validate the AI recommendations to ensure they match our expected format
function processRecommendations(
  recommendations: FarmerAssistance,
  farmerProfile: FarmerProfile
): FarmerAssistance {
  // Ensure all required fields exist with fallback values if needed
  const processedRecommendations: FarmerAssistance = {
    weatherPredictions: recommendations.weatherPredictions || [],
    diseasePredictions: recommendations.diseasePredictions || [],
    irrigationRecommendation: recommendations.irrigationRecommendation || {
      frequencyDays: 3,
      waterAmount: 25000,
      bestTimeOfDay: 'Early Morning',
      nextIrrigationDate: new Date().toISOString().split('T')[0],
      adjustmentReason: 'Based on crop requirements'
    },
    harvestRecommendation: recommendations.harvestRecommendation || {
      optimalDate: new Date(new Date().setDate(new Date().getDate() + 90)).toISOString().split('T')[0],
      expectedYield: 1500,
      qualityFactors: ['Maturity', 'Color', 'Size'],
      harvestingMethod: 'Manual harvesting',
      weatherSuitability: 'Good'
    },
    marketRecommendation: recommendations.marketRecommendation || {
      currentLocalPrice: 1500,
      projectedPrice: 1600,
      bestSellingTime: '2-4 weeks after harvest',
      nearbyMandis: [{
        name: `${farmerProfile.location.district} Market`,
        distance: 15,
        currentPrice: 1500,
        expectedFutureTrend: 'Stable'
      }]
    }
  };

  return processedRecommendations;
}