// Raw DTO that matches the exact API response format
export class StockMatchRawDto {
  "1. symbol": string;
  "2. name": string;
  "3. type": string;
  "4. region": string;
  "5. marketOpen": string;
  "6. marketClose": string;
  "7. timezone": string;
  "8. currency": string;
  "9. matchScore": string;
}

// Clean DTO with more developer-friendly property names
export class StockMatchDto {
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

export class StockSearchRawOutput {
  bestMatches: StockMatchRawDto[];
}

export class StockSearchOutput {
  bestMatches: StockMatchDto[];
}
