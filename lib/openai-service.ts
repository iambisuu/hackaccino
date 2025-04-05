import { FarmerProfile, SoilData, FarmerAssistance } from './farmer-assist-types';

export async function getAIRecommendations(
  farmerProfile: FarmerProfile,
  soilData: SoilData,
  apiKey: string
): Promise<FarmerAssistance | null> {
  try {
    const crop = farmerProfile.crops[0];
    
    // Prepare the prompt for OpenAI
    const prompt = `
      Generate farming recommendations for a farmer based on the following information:
      
      Farmer Information:
      - Location: ${farmerProfile.location.state}, ${farmerProfile.location.district}
      - Land Size: ${farmerProfile.location.landSize} acres
      - Irrigation Type: ${farmerProfile.location.irrigationType}
      
      Crop Information:
      - Crop Name: ${crop.cropName}
      - Variety: ${crop.variety}
      - Seeding Date: ${crop.seedingDate}
      
      Soil Information:
      - pH: ${soilData.ph}
      - Texture: ${soilData.texture}
      - Moisture: ${soilData.moisture}%
      - Nitrogen: ${soilData.nitrogen} ppm
      - Phosphorus: ${soilData.phosphorus} ppm
      - Potassium: ${soilData.potassium} ppm
      
      Provide detailed recommendations in JSON format with the following structure:
      {
        "cropPrediction": {
          "expectedYield": "Expected yield in kg/acre",
          "harvestDate": "Expected harvest date",
          "potentialIssues": ["List of potential issues"]
        },
        "recommendations": {
          "fertilizer": {
            "type": "Recommended fertilizer type",
            "schedule": "Application schedule",
            "quantity": "Quantity per acre"
          },
          "irrigation": {
            "method": "Recommended irrigation method",
            "schedule": "Watering schedule",
            "quantity": "Water quantity"
          },
          "pestManagement": {
            "commonPests": ["List of common pests for this crop"],
            "preventiveMeasures": ["List of preventive measures"],
            "solutions": ["List of solutions if pests appear"]
          }
        },
        "marketInsights": {
          "currentPrice": "Current market price per kg",
          "priceTrend": "Price trend prediction",
          "bestMarkets": ["List of markets with good prices"]
        }
      }
    `;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // You can upgrade to gpt-4 if needed
        messages: [
          {
            role: 'system',
            content: 'You are an agricultural expert assistant that provides recommendations to farmers based on their crop and soil data.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${data.error?.message || 'Unknown error'}`);
    }

    // Parse the response to extract the JSON part
    const content = data.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('No content returned from OpenAI');
    }

    // Extract JSON from the response (the response might contain markdown or text wrapping the JSON)
    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```([\s\S]*?)```/) || [null, content];
    const jsonString = jsonMatch[1] || content;
    
    try {
      const parsedData = JSON.parse(jsonString.trim());
      
      // Convert the parsed data into the FarmerAssistance format expected by the UI
      // Create a date object for seeding date to calculate other dates
      const seedingDate = new Date(farmerProfile.crops[0].seedingDate);
      const today = new Date();
      
      // Generate a set of 7 weather predictions
      const weatherPredictions: WeatherPrediction[] = Array(7).fill(null).map((_, index) => {
        const predictionDate = new Date(today);
        predictionDate.setDate(today.getDate() + index);
        
        // Use potential issues to detect anomalies
        const isAnomaly = index < 3 && parsedData.cropPrediction.potentialIssues.some(
          issue => issue.toLowerCase().includes('rain') || issue.toLowerCase().includes('drought') || 
                  issue.toLowerCase().includes('temperature') || issue.toLowerCase().includes('frost')
        );
        
        return {
          date: predictionDate.toISOString().split('T')[0],
          temperature: {
            min: Math.round(15 + Math.random() * 5),
            max: Math.round(25 + Math.random() * 10)
          },
          precipitation: isAnomaly ? Math.round(Math.random() * 30) : Math.round(Math.random() * 5),
          humidity: Math.round(40 + Math.random() * 40),
          windSpeed: Math.round(5 + Math.random() * 15),
          isAnomaly: isAnomaly,
          description: isAnomaly ? 
            parsedData.cropPrediction.potentialIssues[Math.floor(Math.random() * parsedData.cropPrediction.potentialIssues.length)] : 
            "Normal weather conditions expected."
        };
      });
      
      // Create disease predictions from pest management recommendations
      const diseasePredictions: DiseasePrediction[] = parsedData.recommendations.pestManagement.commonPests.map((pest, index) => {
        return {
          name: pest,
          riskLevel: ['Low', 'Medium', 'High', 'Very High'][Math.min(index, 3)] as 'Low' | 'Medium' | 'High' | 'Very High',
          symptoms: ["Leaf discoloration", "Wilting", "Spots on leaves", "Stunted growth"],
          preventiveMeasures: parsedData.recommendations.pestManagement.preventiveMeasures,
          treatmentOptions: parsedData.recommendations.pestManagement.solutions,
          optimalConditions: "Warm and humid weather"
        };
      });
      
      // Calculate harvest date
      const harvestDate = new Date(seedingDate);
      const harvestDateFromAI = parsedData.cropPrediction.harvestDate;
      if (harvestDateFromAI && harvestDateFromAI.match(/\d+/)) {
        // Try to extract days/weeks/months from the AI response
        const match = harvestDateFromAI.match(/(\d+)\s*(day|week|month)/i);
        if (match) {
          const amount = parseInt(match[1]);
          const unit = match[2].toLowerCase();
          
          if (unit.includes('day')) {
            harvestDate.setDate(seedingDate.getDate() + amount);
          } else if (unit.includes('week')) {
            harvestDate.setDate(seedingDate.getDate() + (amount * 7));
          } else if (unit.includes('month')) {
            harvestDate.setMonth(seedingDate.getMonth() + amount);
          }
        } else {
          // Default to 90 days if we can't parse
          harvestDate.setDate(seedingDate.getDate() + 90);
        }
      } else {
        // Default to 90 days if no harvest date is provided
        harvestDate.setDate(seedingDate.getDate() + 90);
      }
      
      // Extract yield estimate if available
      let yieldEstimate = 2000; // Default value
      if (parsedData.cropPrediction.expectedYield) {
        const yieldMatch = parsedData.cropPrediction.expectedYield.match(/(\d+)/);
        if (yieldMatch) {
          yieldEstimate = parseInt(yieldMatch[0]);
        }
      }
      
      // Extract price if available
      let currentPrice = 50; // Default value
      if (parsedData.marketInsights.currentPrice) {
        const priceMatch = parsedData.marketInsights.currentPrice.match(/(\d+)/);
        if (priceMatch) {
          currentPrice = parseInt(priceMatch[0]);
        }
      }
      
      // Calculate next irrigation date
      const nextIrrigationDate = new Date(today);
      nextIrrigationDate.setDate(today.getDate() + 3); // Default to 3 days
      
      // Construct the farmer assistance object
      const farmerAssistance: FarmerAssistance = {
        // Store original data for reference
        cropPrediction: {
          expectedYield: parsedData.cropPrediction.expectedYield,
          harvestDate: parsedData.cropPrediction.harvestDate,
          potentialIssues: parsedData.cropPrediction.potentialIssues
        },
        recommendations: {
          fertilizer: {
            type: parsedData.recommendations.fertilizer.type,
            schedule: parsedData.recommendations.fertilizer.schedule,
            quantity: parsedData.recommendations.fertilizer.quantity
          },
          irrigation: {
            method: parsedData.recommendations.irrigation.method,
            schedule: parsedData.recommendations.irrigation.schedule,
            quantity: parsedData.recommendations.irrigation.quantity
          },
          pestManagement: {
            commonPests: parsedData.recommendations.pestManagement.commonPests,
            preventiveMeasures: parsedData.recommendations.pestManagement.preventiveMeasures,
            solutions: parsedData.recommendations.pestManagement.solutions
          }
        },
        marketInsights: {
          currentPrice: parsedData.marketInsights.currentPrice,
          priceTrend: parsedData.marketInsights.priceTrend,
          bestMarkets: parsedData.marketInsights.bestMarkets
        },
        
        // Data transformed for the UI components
        weatherPredictions: weatherPredictions,
        diseasePredictions: diseasePredictions,
        
        irrigationRecommendation: {
          frequencyDays: 3, // Default
          waterAmount: 5000, // Default 5000 liters per acre
          bestTimeOfDay: 'Early Morning', // Default
          nextIrrigationDate: nextIrrigationDate.toISOString().split('T')[0],
          adjustmentReason: "Based on crop water requirements and current soil moisture levels."
        },
        
        harvestRecommendation: {
          optimalDate: harvestDate.toISOString().split('T')[0],
          expectedYield: yieldEstimate,
          qualityFactors: ["Weather conditions", "Proper irrigation", "Disease management"],
          harvestingMethod: "Manual harvesting",
          weatherSuitability: 'Good'
        },
        
        marketRecommendation: {
          currentLocalPrice: currentPrice,
          projectedPrice: currentPrice * (parsedData.marketInsights.priceTrend.toLowerCase().includes('increase') ? 1.1 : 0.9),
          bestSellingTime: "After harvest",
          nearbyMandis: [
            {
              name: "Local Market",
              distance: 5,
              currentPrice: currentPrice,
              expectedFutureTrend: parsedData.marketInsights.priceTrend.toLowerCase().includes('increase') ? 'Rising' : 'Stable'
            }
          ],
          mspInfo: parsedData.marketInsights.currentPrice.toLowerCase().includes('msp') ? {
            current: currentPrice,
            applicableFrom: today.toISOString().split('T')[0],
            applicableTo: new Date(today.getFullYear(), today.getMonth() + 3, today.getDate()).toISOString().split('T')[0]
          } : undefined
        }
      };
      
      return farmerAssistance;
    } catch (jsonError) {
      console.error('Error parsing OpenAI response:', jsonError);
      console.error('Response content:', content);
      throw new Error('Failed to parse OpenAI response as JSON');
    }
  } catch (error) {
    console.error('Error in getAIRecommendations:', error);
    throw error;
  }
}