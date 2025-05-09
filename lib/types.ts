export interface Region {
    name: string;
    demandScore: number;
    production: number;
    consumption: number;
  }
  
  export interface PriceHistory {
    date: string;
    price: number;
  }
  
  export interface WeatherImpact {
    condition: string;
    impact: number;
  }
  
  export interface Commodity {
    id: string;
    name: string;
    category: string;
    image: string;
    currentPrice: number;
    priceUnit: string;
    priceChange: number;
    demandScore: number;
    season: string[];
    regions: Region[];
    msp?: number; // Minimum Support Price
  }
  
  export interface CommodityDetail extends Commodity {
    description: string;
    priceHistory: PriceHistory[];
    forecastedDemand: {
      date: string;
      demand: number;
    }[];
    weatherImpact: WeatherImpact[];
    regionalData: {
      region: string;
      demand: number;
      supply: number;
      price: number;
    }[];
    mandiPrices: {
      mandiName: string;
      state: string;
      price: number;
      change: number;
    }[];
    msp: number; // Required in detail view
    mspHistory?: {
      year: string;
      price: number;
    }[]; // MSP history data
  }