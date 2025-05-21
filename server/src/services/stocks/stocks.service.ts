

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import * as stockData from './temp-data.json';

@Injectable()
export class StocksService{
  private readonly apiKey = process.env.ALPHA_VANTAGE_API_KEY;
  private readonly baseUrl = 'https://www.alphavantage.co/query';

  async getStockData(stockSymbol: string): Promise<any> {
    return stockData; // TODO: Remove this line and uncomment the API call below
    // const url = `${this.baseUrl}?function=TIME_SERIES_WEEKLY&symbol=${stockSymbol}&apikey=${this.apiKey}`;

    // console.log(`Fetching stock data from: ${url}`);
    //  try {
    //   const response = await axios.get(url, {
    //     headers: { 'User-Agent': 'NestJS App' },
    //   });

    //   return response.data;
    // } catch (error) {

    //   if (error.response) {
    //     // API responded with a non-2xx status code
    //     throw new HttpException(
    //       `Failed to fetch stock data: ${error.response.statusText}`,
    //       HttpStatus.BAD_REQUEST,
    //     );
    //   } else if (error.request) {
    //     // No response received from the API
    //     throw new HttpException(
    //       'No response received from the stock API',
    //       HttpStatus.GATEWAY_TIMEOUT,
    //     );
    //   } else {
    //     // Other errors (e.g., network issues)
    //     throw new HttpException(
    //       `Error fetching stock data: ${error.message}`,
    //       HttpStatus.INTERNAL_SERVER_ERROR,
    //     );
    //   }
    // }

}

}