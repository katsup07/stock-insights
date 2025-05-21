/* eslint-disable @typescript-eslint/no-explicit-any */
import { StocksService } from "./StocksService";


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
    }

    async getStockHistory(symbol: string): Promise<any> {
      return await this.stocksService.getStocksHistory(symbol);
    }
}