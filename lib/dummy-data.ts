import { Commodity, CommodityDetail, PriceHistory} from './types';

export const commodities: Commodity[] = [
  // Existing data
  {
    id: "potato",
    name: "Potato",
    category: "Vegetables",
    image: "https://plus.unsplash.com/premium_photo-1675365779531-031dfdcdf947?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    currentPrice: 25.5,
    priceUnit: "₹/kg",
    priceChange: 2.5,
    demandScore: 85,
    season: ["Winter", "Spring"],
    regions: [
      { name: "Uttar Pradesh", demandScore: 88, production: 14500, consumption: 12000 },
      { name: "West Bengal", demandScore: 82, production: 11000, consumption: 9500 },
      { name: "Bihar", demandScore: 79, production: 8200, consumption: 7000 }
    ],
    msp: 20.0
  },
  {
    id: "tomato",
    name: "Tomato",
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1561136594-7f68413baa99?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRvbWF0b3xlbnwwfHwwfHx8MA%3D%3D",
    currentPrice: 35.75,
    priceUnit: "₹/kg",
    priceChange: -3.25,
    demandScore: 92,
    season: ["Summer", "Monsoon"],
    regions: [
      { name: "Maharashtra", demandScore: 95, production: 13200, consumption: 12800 },
      { name: "Karnataka", demandScore: 90, production: 9800, consumption: 8500 },
      { name: "Andhra Pradesh", demandScore: 87, production: 8700, consumption: 7200 }
    ],
    msp: 32.50
  },
  {
    id: "rice",
    name: "Rice",
    category: "Grains",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmljZXxlbnwwfHwwfHx8MA%3D%3D",
    currentPrice: 42,
    priceUnit: "₹/kg",
    priceChange: 1.2,
    demandScore: 97,
    season: ["Monsoon", "Autumn"],
    regions: [
      { name: "Punjab", demandScore: 98, production: 22500, consumption: 18000 },
      { name: "Haryana", demandScore: 95, production: 18000, consumption: 14500 },
      { name: "Tamil Nadu", demandScore: 92, production: 15500, consumption: 14000 }
    ],
    msp: 39.50
  },
  {
    id: "onion",
    name: "Onion",
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1508747703725-719777637510?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    currentPrice: 32.8,
    priceUnit: "₹/kg",
    priceChange: 8.5,
    demandScore: 88,
    season: ["Winter", "Spring"],
    regions: [
      { name: "Maharashtra", demandScore: 90, production: 16500, consumption: 15000 },
      { name: "Karnataka", demandScore: 86, production: 12200, consumption: 10500 },
      { name: "Gujarat", demandScore: 85, production: 11000, consumption: 9500 }
    ],
    msp: 26.40
  },
  {
    id: "wheat",
    name: "Wheat",
    category: "Grains",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdoZWF0fGVufDB8fDB8fHww",
    currentPrice: 28.5,
    priceUnit: "₹/kg",
    priceChange: -1.5,
    demandScore: 93,
    season: ["Winter", "Spring"],
    regions: [
      { name: "Uttar Pradesh", demandScore: 95, production: 28500, consumption: 24000 },
      { name: "Punjab", demandScore: 92, production: 22000, consumption: 18500 },
      { name: "Haryana", demandScore: 90, production: 18500, consumption: 15000 }
    ],
    msp: 29.75
  },
  {
    id: "apple",
    name: "Apple",
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFwcGxlfGVufDB8fDB8fHww",
    currentPrice: 120,
    priceUnit: "₹/kg",
    priceChange: 5.2,
    demandScore: 82,
    season: ["Autumn", "Winter"],
    regions: [
      { name: "Himachal Pradesh", demandScore: 92, production: 8500, consumption: 2200 },
      { name: "Jammu & Kashmir", demandScore: 90, production: 7800, consumption: 1800 },
      { name: "Uttarakhand", demandScore: 78, production: 3200, consumption: 1500 }
    ],
    msp: 110.0
  },
  {
    id: "sugarcane",
    name: "Sugarcane",
    category: "Cash Crops",
    image: "https://images.unsplash.com/photo-1585155113372-6c1808141bf3?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VnYXJjYW5lfGVufDB8fDB8fHww",
    currentPrice: 3.5,
    priceUnit: "₹/kg",
    priceChange: 0.8,
    demandScore: 89,
    season: ["Spring", "Summer"],
    regions: [
      { name: "Uttar Pradesh", demandScore: 94, production: 135000, consumption: 120000 },
      { name: "Maharashtra", demandScore: 91, production: 95000, consumption: 88000 },
      { name: "Karnataka", demandScore: 87, production: 45000, consumption: 40000 }
    ],
    msp: 3.25
  },
  {
    id: "cotton",
    name: "Cotton",
    category: "Cash Crops",
    image: "https://images.unsplash.com/photo-1660070608618-7490a6377929?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGNvdHRvbnxlbnwwfHwwfHx8MA%3D%3D",
    currentPrice: 65.75,
    priceUnit: "₹/kg",
    priceChange: 3.8,
    demandScore: 86,
    season: ["Monsoon", "Autumn"],
    regions: [
      { name: "Gujarat", demandScore: 95, production: 9500, consumption: 8800 },
      { name: "Maharashtra", demandScore: 88, production: 7200, consumption: 6500 },
      { name: "Telangana", demandScore: 85, production: 5800, consumption: 5200 }
    ],
    msp: 61.20
  },
  
  // Additional commodities
  {
    id: "mango",
    name: "Mango",
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1588931929796-8f0ea6da0faa?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1hbmdvfGVufDB8fDB8fHww",
    currentPrice: 95.5,
    priceUnit: "₹/kg",
    priceChange: -8.25,
    demandScore: 94,
    season: ["Summer", "Monsoon"],
    regions: [
      { name: "Andhra Pradesh", demandScore: 96, production: 9800, consumption: 7500 },
      { name: "Uttar Pradesh", demandScore: 93, production: 8500, consumption: 6800 },
      { name: "Karnataka", demandScore: 91, production: 7200, consumption: 5900 }
    ],
    msp: 85.0
  },
  {
    id: "banana",
    name: "Banana",
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmFuYW5hfGVufDB8fDB8fHww",
    currentPrice: 48.75,
    priceUnit: "₹/dozen",
    priceChange: 1.25,
    demandScore: 88,
    season: ["All Year"],
    regions: [
      { name: "Tamil Nadu", demandScore: 90, production: 12500, consumption: 10800 },
      { name: "Maharashtra", demandScore: 87, production: 9800, consumption: 8500 },
      { name: "Gujarat", demandScore: 85, production: 7500, consumption: 6200 }
    ],
    msp: 45.0
  },
  {
    id: "coffee",
    name: "Coffee Beans",
    category: "Cash Crops",
    image: "https://images.unsplash.com/photo-1675306408031-a9aad9f23308?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlJTIwYmVhbnN8ZW58MHx8MHx8fDA%3D",
    currentPrice: 375.5,
    priceUnit: "₹/kg",
    priceChange: 12.75,
    demandScore: 79,
    season: ["Winter", "Spring"],
    regions: [
      { name: "Karnataka", demandScore: 92, production: 4500, consumption: 1200 },
      { name: "Kerala", demandScore: 86, production: 3800, consumption: 950 },
      { name: "Tamil Nadu", demandScore: 80, production: 2500, consumption: 750 }
    ],
    msp: 350.0
  },
  {
    id: "tea",
    name: "Tea Leaves",
    category: "Cash Crops",
    image: "https://images.unsplash.com/photo-1564834744159-ff0ea41ba4b9?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGVhJTIwbGVhdmVzfGVufDB8fDB8fHww",
    currentPrice: 250.25,
    priceUnit: "₹/kg",
    priceChange: 5.5,
    demandScore: 84,
    season: ["Spring", "Summer"],
    regions: [
      { name: "Assam", demandScore: 95, production: 7800, consumption: 2200 },
      { name: "West Bengal", demandScore: 90, production: 6500, consumption: 1800 },
      { name: "Tamil Nadu", demandScore: 82, production: 3200, consumption: 900 }
    ],
    msp: 235.0
  },
  {
    id: "pepper",
    name: "Black Pepper",
    category: "Spices",
    image: "https://images.unsplash.com/photo-1613336026275-d6d473084e85?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmxhY2slMjBwZXBwZXJ8ZW58MHx8MHx8fDA%3D",
    currentPrice: 580.5,
    priceUnit: "₹/kg",
    priceChange: 15.2,
    demandScore: 80,
    season: ["Monsoon", "Autumn"],
    regions: [
      { name: "Kerala", demandScore: 94, production: 3500, consumption: 850 },
      { name: "Karnataka", demandScore: 85, production: 2200, consumption: 550 },
      { name: "Tamil Nadu", demandScore: 78, production: 1800, consumption: 400 }
    ],
    msp: 550.0
  },
  {
    id: "cardamom",
    name: "Cardamom",
    category: "Spices",
    image: "https://images.unsplash.com/photo-1701166627787-12d9fdd437cc?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FyZGFtb218ZW58MHx8MHx8fDA%3D",
    currentPrice: 1250.75,
    priceUnit: "₹/kg",
    priceChange: -120.25,
    demandScore: 76,
    season: ["Summer", "Monsoon"],
    regions: [
      { name: "Kerala", demandScore: 90, production: 1800, consumption: 350 },
      { name: "Karnataka", demandScore: 82, production: 1200, consumption: 280 },
      { name: "Tamil Nadu", demandScore: 75, production: 950, consumption: 220 }
    ],
    msp: 1300.0
  },
  {
    id: "turmeric",
    name: "Turmeric",
    category: "Spices",
    image: "https://images.unsplash.com/photo-1666818398897-381dd5eb9139?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVybWVyaWN8ZW58MHx8MHx8fDA%3D",
    currentPrice: 180.5,
    priceUnit: "₹/kg",
    priceChange: 8.75,
    demandScore: 85,
    season: ["Winter", "Spring"],
    regions: [
      { name: "Telangana", demandScore: 92, production: 4200, consumption: 3600 },
      { name: "Maharashtra", demandScore: 88, production: 3800, consumption: 3200 },
      { name: "Tamil Nadu", demandScore: 83, production: 2900, consumption: 2500 }
    ],
    msp: 170.0
  },
  {
    id: "maize",
    name: "Maize",
    category: "Grains",
    image: "https://images.unsplash.com/photo-1623066798929-946425dbe1b0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFpemV8ZW58MHx8MHx8fDA%3D",
    currentPrice: 22.5,
    priceUnit: "₹/kg",
    priceChange: -1.8,
    demandScore: 78,
    season: ["Monsoon", "Autumn"],
    regions: [
      { name: "Karnataka", demandScore: 85, production: 15500, consumption: 12800 },
      { name: "Madhya Pradesh", demandScore: 80, production: 12200, consumption: 10000 },
      { name: "Bihar", demandScore: 76, production: 9800, consumption: 8200 }
    ],
    msp: 24.0
  },
  {
    id: "cumin",
    name: "Cumin Seeds",
    category: "Spices",
    image: "https://plus.unsplash.com/premium_photo-1723874683717-006f24c93975?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y3VtaW4lMjBzZWVkc3xlbnwwfHwwfHx8MA%3D%3D",
    currentPrice: 380.25,
    priceUnit: "₹/kg",
    priceChange: 25.5,
    demandScore: 82,
    season: ["Winter", "Spring"],
    regions: [
      { name: "Gujarat", demandScore: 90, production: 5200, consumption: 1500 },
      { name: "Rajasthan", demandScore: 85, production: 4800, consumption: 1200 },
      { name: "Uttar Pradesh", demandScore: 78, production: 2500, consumption: 800 }
    ],
    msp: 350.0
  },
  {
    id: "cauli",
    name: "Cauliflower",
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F1bGlmbG93ZXJ8ZW58MHx8MHx8fDA%3D",
    currentPrice: 40.8,
    priceUnit: "₹/kg",
    priceChange: -5.2,
    demandScore: 75,
    season: ["Winter"],
    regions: [
      { name: "Uttar Pradesh", demandScore: 82, production: 9200, consumption: 8500 },
      { name: "Haryana", demandScore: 78, production: 7800, consumption: 7200 },
      { name: "Bihar", demandScore: 72, production: 6500, consumption: 6000 }
    ],
    msp: 42.5
  },
  {
    id: "orange",
    name: "Orange",
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG9yYW5nZXxlbnwwfHwwfHx8MA%3D%3D",
    currentPrice: 85.25,
    priceUnit: "₹/kg",
    priceChange: 3.75,
    demandScore: 79,
    season: ["Winter"],
    regions: [
      { name: "Maharashtra", demandScore: 88, production: 7800, consumption: 6500 },
      { name: "Madhya Pradesh", demandScore: 82, production: 6500, consumption: 5200 },
      { name: "Rajasthan", demandScore: 75, production: 4800, consumption: 3800 }
    ],
    msp: 80.0
  },
  {
    id: "jute",
    name: "Jute",
    category: "Cash Crops",
    image: "https://plus.unsplash.com/premium_photo-1663133988328-95f6e843a6b7?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8anV0ZXxlbnwwfHwwfHx8MA%3D%3D",
    currentPrice: 55.8,
    priceUnit: "₹/kg",
    priceChange: 2.2,
    demandScore: 72,
    season: ["Monsoon"],
    regions: [
      { name: "West Bengal", demandScore: 95, production: 8500, consumption: 7200 },
      { name: "Bihar", demandScore: 85, production: 6200, consumption: 5500 },
      { name: "Assam", demandScore: 78, production: 4800, consumption: 4200 }
    ],
    msp: 52.0
  },
  {
    id: "coconut",
    name: "Coconut",
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1580984969071-a8da5656c2fb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29jb251dHxlbnwwfHwwfHx8MA%3D%3D",
    currentPrice: 35.5,
    priceUnit: "₹/piece",
    priceChange: -2.75,
    demandScore: 86,
    season: ["All Year"],
    regions: [
      { name: "Kerala", demandScore: 95, production: 12500, consumption: 10800 },
      { name: "Tamil Nadu", demandScore: 90, production: 10800, consumption: 9500 },
      { name: "Karnataka", demandScore: 85, production: 8500, consumption: 7200 }
    ],
    msp: 37.0
  },
  {
    id: "cashew",
    name: "Cashew Nuts",
    category: "Nuts",
    image: "https://images.unsplash.com/photo-1726771517475-e7acdd34cd8a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    currentPrice: 850.5,
    priceUnit: "₹/kg",
    priceChange: 35.25,
    demandScore: 76,
    season: ["Spring", "Summer"],
    regions: [
      { name: "Maharashtra", demandScore: 88, production: 3200, consumption: 2500 },
      { name: "Kerala", demandScore: 85, production: 2800, consumption: 2200 },
      { name: "Andhra Pradesh", demandScore: 80, production: 2500, consumption: 1800 }
    ],
    msp: 820.0
  },
];

export const getCommodityDetail = (id: string): CommodityDetail | undefined => {
  const commodity = commodities.find(c => c.id === id);
  if (!commodity) return undefined;

  const generatePriceHistory = () => {
    const history: PriceHistory[] = [];
    const basePrice = commodity.currentPrice * 0.9;
    const today = new Date();
    
    for (let i = 180; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const fluctuation = Math.sin(i / 15) * 10 + Math.random() * 5 - 2.5;
      const price = basePrice + fluctuation;
      
      history.push({
        date: date.toISOString().split('T')[0],
        price: Math.round(price * 100) / 100
      });
    }
    
    return history;
  };

  const generateForecastedDemand = () => {
    const forecast = [];
    const today = new Date();
    const baseDemand = commodity.demandScore;
    
    for (let i = 1; i <= 90; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      const seasonality = Math.cos(i / 30 * Math.PI) * 15;
      const trend = i / 90 * 5;
      const random = Math.random() * 10 - 5;
      const demand = baseDemand + seasonality + trend + random;
      
      forecast.push({
        date: date.toISOString().split('T')[0],
        demand: Math.max(40, Math.min(100, Math.round(demand)))
      });
    }
    
    return forecast;
  };

  const generateWeatherImpact = () => {
    return [
      { condition: "Heavy Rain", impact: -15 },
      { condition: "Drought", impact: -25 },
      { condition: "Ideal Weather", impact: 10 },
      { condition: "Cold Wave", impact: -12 },
      { condition: "Heat Wave", impact: -18 }
    ];
  };

  const generateRegionalData = () => {
    return commodity.regions.map(region => ({
      region: region.name,
      demand: region.demandScore,
      supply: region.production / 100,
      price: commodity.currentPrice * (1 + (Math.random() * 0.2 - 0.1))
    }));
  };

  const generateMandiPrices = () => {
    const states = ["Uttar Pradesh", "Maharashtra", "Punjab", "Karnataka", "Tamil Nadu", "Bihar", "Gujarat", "Rajasthan", "Kerala", "Madhya Pradesh", "Assam", "West Bengal", "Telangana"];
    const mandis = [
      "Azadpur Mandi", "Vashi Market", "Ghazipur Mandi", "Devi Ahilya Bai Holkar Mandi",
      "Yeshwanthpur Mandi", "Bowenpally Market", "Koyambedu Market", "Gultekdi Market",
      "Dambulla Dedicated Economic Centre", "Jodhpur Mandi", "Patna Wholesale Market",
      "Kolkata Wholesale Market", "Hyderabad Agricultural Market"
    ];
    
    return Array(12).fill(0).map((_, i) => ({
      mandiName: mandis[i % mandis.length],
      state: states[i % states.length],
      price: commodity.currentPrice * (1 + (Math.random() * 0.25 - 0.125)),
      change: Math.round((Math.random() * 8 - 4) * 10) / 10
    }));
  };

  // Generate MSP history for the past 5 years
  const generateMspHistory = () => {
    const history = [];
    const currentYear = new Date().getFullYear();
    const baseMsp = commodity.msp || 0;
    
    // Generate 5 years of MSP history
    for (let i = 0; i < 5; i++) {
      const year = (currentYear - 4 + i).toString();
      // MSP generally increases over time
      const price = baseMsp * (0.85 + i * 0.04);
      
      history.push({
        year,
        price: Math.round(price * 100) / 100
      });
    }
    
    return history;
  };
  return {
    ...commodity,
    description: `${commodity.name} is a widely consumed ${commodity.category.toLowerCase()} in India. It is primarily grown in ${commodity.regions.map(r => r.name).join(', ')}. Peak season is during ${commodity.season.join(' and ')}.`,
    priceHistory: generatePriceHistory(),
    forecastedDemand: generateForecastedDemand(),
    weatherImpact: generateWeatherImpact(),
    regionalData: generateRegionalData(),
    mandiPrices: generateMandiPrices(),
    msp: commodity.msp || 0,
    mspHistory: generateMspHistory()
  };
};