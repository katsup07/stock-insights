import { StocksService } from "./StocksService";
import { StockSearchResponse } from "./types/stockSearch";
import { StockTimeSeriesResponse } from "./types/stockTimeSeries";


// Singleton facade class for making API calls
export class ApiClient{
    private static instance: ApiClient | null = null;
    private stocksService = new StocksService();

    private constructor() {
      this.stocksService = new StocksService();
    }    
    
    static getInstance() {
      if (!ApiClient.instance)
        ApiClient.instance = new ApiClient();

      return ApiClient.instance;
    }    async getStockHistory(symbol: string): Promise<StockTimeSeriesResponse> {
      return await this.stocksService.getStocksHistory(symbol);
    }

    async getStockByKeywords(keywords: string): Promise<StockSearchResponse> {
      return await this.stocksService.getStocksByKeyword(keywords);
    }
}