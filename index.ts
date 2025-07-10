export interface KeywordData {
  keyword: string;
  searchVolume: number;
  difficulty: number;
  cpc: number;
  competition: 'low' | 'medium' | 'high';
  trend: number[];
  relatedKeywords: string[];
  googleShoppingResults?: number;
  mercadolibreResults?: number;
}

export interface CompetitorData {
  title: string;
  price: number;
  description: string;
  keywords: string[];
  ranking: number;
  url: string;
  seller: string;
  reviews: number;
  rating: number;
  source: 'google' | 'mercadolibre';
  images?: string[];
  features?: string[];
}

export interface ProductListing {
  id: string;
  title: string;
  description: string;
  price: number;
  keywords: string[];
  category: string;
  images: string[];
  status: 'active' | 'paused' | 'draft';
  ranking: number;
  views: number;
  clicks: number;
  conversions: number;
  createdAt: string;
  updatedAt: string;
  mercadolibreUrl?: string;
}

export interface OptimizationSuggestion {
  type: 'title' | 'description' | 'keywords' | 'price' | 'images';
  priority: 'high' | 'medium' | 'low';
  suggestion: string;
  impact: number;
  effort: number;
}

export interface ApiConfig {
  serpApiKey: string;
  openaiApiKey: string;
  mercadolibreApiKey: string;
}

export interface AIOptimizationResult {
  optimizedTitle: string;
  optimizedDescription: string;
  powerfulKeywords: string[];
  seoPhases: string[];
  improvements: string[];
  competitorAnalysis: string;
  googleShoppingTips: string[];
}

export interface CompetitorComparison {
  myProduct: ProductListing;
  competitor1: CompetitorData;
  competitor2: CompetitorData;
  analysis: {
    titleComparison: string;
    descriptionComparison: string;
    keywordGaps: string[];
    pricePosition: string;
    strengthsWeaknesses: {
      myStrengths: string[];
      myWeaknesses: string[];
      opportunities: string[];
    };
  };
}