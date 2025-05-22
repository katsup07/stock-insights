import { StockSearchRawOutput, StockSearchOutput } from '../../dtos/stock-search.dto';

/**
 * Transforms raw stock data response to a clean format without numeric prefixes in property names
 * example: "1. symbol" ---> "symbol"
 */
export function removeNumbersFromStockSearchResponse(raw: StockSearchRawOutput): StockSearchOutput {
  return {
    bestMatches: raw.bestMatches.map(match => ({
      symbol: match["1. symbol"],
      name: match["2. name"],
      type: match["3. type"],
      region: match["4. region"],
      marketOpen: match["5. marketOpen"],
      marketClose: match["6. marketClose"],
      timezone: match["7. timezone"],
      currency: match["8. currency"],
      matchScore: parseFloat(match["9. matchScore"])
    }))
  };
}
