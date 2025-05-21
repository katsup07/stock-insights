export interface StockMetaData {
  '1. Information': string;
  '2. Symbol': string;
  '3. Last Refreshed': string;
  '4. Time Zone': string;
}

export interface StockTimeSeriesItem {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
  '5. volume': string;
}

export interface StockData {
  'Meta Data': StockMetaData;
  'Weekly Time Series': Record<string, StockTimeSeriesItem>;
}

export interface ChartDataPoint {
  date: string;
  price: number;
}

export const timeframes = ['1M', '6M', '1Y', '5Y', '10Y', '20Y'];