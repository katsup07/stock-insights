import { Controller, Get, Param } from '@nestjs/common';
import { StocksService } from 'src/services/stocks/stocks.service';
import { StockSearchOutput } from '../../dtos/stock-search.dto';
import { StockTimeSeriesResponseDto } from '../../dtos/stock-time-series.dto';

@Controller('stocks')
export class StocksController {

  constructor(private readonly stocksService: StocksService) {}

  @Get(':symbol')
  async getStockData(@Param('symbol') symbol: string): Promise<StockTimeSeriesResponseDto> {
    console.log(`Fetching stock data in controller for symbol: ${symbol}`);
    
    return await this.stocksService.getStockData(symbol);
  }

  @Get('keywords/:keyword')
  async getStockDataByKeyword(@Param('keyword') keyword: string): Promise<StockSearchOutput> {
    console.log(`Fetching stock data in controller for keyword: ${keyword}`);

    return await this.stocksService.getStockDataByKeyword(keyword);
  }
}
