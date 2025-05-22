export interface StockMatch {
  symbol: string;
  name: string;
  type: string;
  region: string;
  marketOpen: string;
  marketClose: string;
  timezone: string;
  currency: string;
  matchScore: number; // Converting to number for easier comparison
}

export interface StockSearchResponse {
  bestMatches: StockMatch[];
}