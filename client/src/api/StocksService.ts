import { baseApiUrl } from "./urls";
import { StockSearchResponse } from "./types/stockSearch";
import { StockTimeSeriesResponse } from "./types/stockTimeSeries";

export class StocksService {

  async getStocksHistory(symbol: string): Promise<StockTimeSeriesResponse> {
   const response = await fetch(`${baseApiUrl}/stocks/${symbol}`);

        if (!response.ok) 
            throw new Error(`Error fetching stock data: ${response.statusText}`);

    return await response.json();
  }

  async getStocksByKeyword(keywords: string): Promise<StockSearchResponse> {
    const response = await fetch(`${baseApiUrl}/stocks/keywords/${keywords}`);

    if (!response.ok) 
        throw new Error(`Error fetching stock data by keyword: ${response.statusText}`);

    return await response.json();
  }
}