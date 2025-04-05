import { Commodity, CommodityDetail, PriceHistory} from './types';

export const commodities: Commodity[] = [
  {
    id: "potato",
    name: "Potato",
    category: "Vegetables",
    image: "/images/commodities/potato.jpg",
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
    image: "/images/commodities/tomato.jpg",
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
    image: "/images/commodities/rice.jpg",
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
    image: "/images/commodities/onion.jpg",
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
    image: "/images/commodities/wheat.jpg",
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
    image: "/images/commodities/apple.jpg",
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
    image: "/images/commodities/sugarcane.jpg",
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
    image: "/images/commodities/cotton.jpg",
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
  }
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
    const states = ["Uttar Pradesh", "Maharashtra", "Punjab", "Karnataka", "Tamil Nadu", "Bihar", "Gujarat"];
    const mandis = [
      "Azadpur Mandi", "Vashi Market", "Ghazipur Mandi", "Devi Ahilya Bai Holkar Mandi",
      "Yeshwanthpur Mandi", "Bowenpally Market", "Koyambedu Market", "Gultekdi Market"
    ];
    
    return Array(8).fill(0).map((_, i) => ({
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