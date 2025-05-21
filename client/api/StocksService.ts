/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApiUrl } from "./urls";

export class StocksService {

  async getStocksHistory(symbol: string): Promise<any> {
   const response = await fetch(`${baseApiUrl}/stocks/${symbol}`);

        if (!response.ok) 
            throw new Error(`Error fetching stock data: ${response.statusText}`);

    return await response.json();
  }
}