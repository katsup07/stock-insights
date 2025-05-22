import { StockTimeSeriesRawResponseDto, StockTimeSeriesResponseDto, StockTimeSeriesPointDto } from '../../dtos/stock-time-series.dto';

/**
 * Transforms raw stock time series data response to a clean format 
 * without numeric prefixes in property names
 */
export function transformStockTimeSeriesResponse(raw: StockTimeSeriesRawResponseDto): StockTimeSeriesResponseDto {
  // Transform the metadata
  const metaData = {
    information: raw['Meta Data']['1. Information'],
    symbol: raw['Meta Data']['2. Symbol'],
    lastRefreshed: raw['Meta Data']['3. Last Refreshed'],
    timeZone: raw['Meta Data']['4. Time Zone'],
  };

  // Transform the time series data
  const timeSeriesData: StockTimeSeriesPointDto[] = Object.entries(raw['Weekly Time Series'])
    .map(([date, data]: [string, any]) => ({
      date,
      open: parseFloat(data['1. open']),
      high: parseFloat(data['2. high']),
      low: parseFloat(data['3. low']),
      close: parseFloat(data['4. close']),
      volume: parseInt(data['5. volume'], 10)
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date (newest first)

  return {
    metaData,
    timeSeriesData
  };
}
