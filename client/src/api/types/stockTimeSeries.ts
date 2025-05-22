/**
 * Type definitions for stock time series data
 */
export interface MetaData {
  information: string;
  symbol: string;
  lastRefreshed: string;
  timeZone: string;
}

export interface StockTimeSeriesPoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface StockTimeSeriesResponse {
  metaData: MetaData;
  timeSeriesData: StockTimeSeriesPoint[];
}
