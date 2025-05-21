import { Module } from '@nestjs/common';
import { StocksService } from '../../services/stocks/stocks.service';
import { StocksController } from '../../controllers/stocks/stocks.controller';

@Module({
  controllers: [StocksController],
  providers: [StocksService],
  exports: [StocksService], // Exporting StocksService to be used in other modules
})
export class StocksModule {}