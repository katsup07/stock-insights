/**
 * DTOs for the weekly stock time series data response
 */
export class MetaDataDto {
  '1. Information': string;
  '2. Symbol': string;
  '3. Last Refreshed': string;
  '4. Time Zone': string;
}

export class StockTimeSeriesPointRawDto {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
  '5. volume': string;
}

export class StockTimeSeriesPointDto {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  date: string; // Added for convenience
}

export class StockTimeSeriesRawResponseDto {
  'Meta Data': MetaDataDto;
  'Weekly Time Series': Record<string, StockTimeSeriesPointRawDto>;
}

export class StockTimeSeriesResponseDto {
  metaData: {
    information: string;
    symbol: string;
    lastRefreshed: string;
    timeZone: string;
  };
  timeSeriesData: StockTimeSeriesPointDto[];
}
