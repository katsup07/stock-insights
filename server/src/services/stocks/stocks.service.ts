

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import * as stockData from './temp-data/stocks-data.json';
import * as keywordsSearchResults from './temp-data/keywords.json';
import { handleStockApiError } from 'src/utils/errors/error-handlers';
import { removeNumbersFromStockSearchResponse } from 'src/utils/transformers';

@Injectable()
export class StocksService{
  private readonly apiKey = process.env.ALPHA_VANTAGE_API_KEY;
  private readonly baseUrl = 'https://www.alphavantage.co/query';

  /**
   * Fetches stock data based on the stock symbol.
   * @param stockSymbol The stock symbol to fetch data for.
   * @returns The stock data for the specified symbol.
   */
  async getStockData(stockSymbol: string): Promise<any> {
    return stockData; // TODO: Remove this line and uncomment the API call below
    // const url = `${this.baseUrl}?function=TIME_SERIES_WEEKLY&symbol=${stockSymbol}&apikey=${this.apiKey}`;

    // console.log(`Fetching stock data from: ${url}`);
    //  try {
    //   const response = await axios.get(url, {
    //     headers: { 'User-Agent': 'NestJS App' },
    //   });

    //   return response.data;    // } catch (error) {
    //   handleStockApiError(error, 'fetching weekly stock data by symbol');
    // }

}
  /**
   * Fetches stock data based on a keyword.
   * @param keyword The keyword to search for.
   * @returns The stock data matching the keyword.
   */
  async getStockDataByKeyword(keyword: string): Promise<any> {
    return removeNumbersFromStockSearchResponse(keywordsSearchResults); // TODO: Remove this line and uncomment the API call below
    // const url = `${this.baseUrl}?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${this.apiKey}`;

    // console.log(`Fetching stock data by keyword from: ${url}`);    
    // try {
    //   const response = await axios.get(url, {
    //     headers: { 'User-Agent': 'NestJS App' },
    //   });

    //   return response.data;
    // } catch (error) {
    //   handleStockApiError(error, 'fetching stock data by keyword');
    // }
  }

}