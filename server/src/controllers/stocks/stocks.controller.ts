import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { StocksService } from 'src/services/stocks/stocks.service';
// import { CreateDrawingInput, DrawingOutput, UpdateDrawingInput } from '../../dtos/drawing.dto';
// import { DrawingsService } from '../../services/drawings-service/drawings.service';

@Controller('stocks')
export class StocksController {

  constructor(private readonly stocksService: StocksService) {}

  @Get(':symbol')
  async getStockData(@Param('symbol') symbol: string): Promise<any> { // TODO: Define a proper type for the stock data
    console.log(`Fetching stock data in controller for symbol: ${symbol}`);
    
    return await this.stocksService.getStockData(symbol);
  }

}
