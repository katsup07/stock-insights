import { ChartDataPoint } from "./types";
import { StockTimeSeriesResponse } from "../../api/types/stockTimeSeries";

// Process stock data to format suitable for chart
  export const processStockData = (data: StockTimeSeriesResponse, timeframe: string): ChartDataPoint[] => {
    if (!data || !data.timeSeriesData || data.timeSeriesData.length === 0) return [];

    // Get current date and calculate the start date based on timeframe
    const currentDate = new Date();
    const startDate = new Date();
    
    switch (timeframe) {
      case '1M':
        startDate.setMonth(currentDate.getMonth() - 1);
        break;
      case '6M':
        startDate.setMonth(currentDate.getMonth() - 6);
        break;
      case '1Y':
        startDate.setFullYear(currentDate.getFullYear() - 1);
        break;
      case '5Y':
        startDate.setFullYear(currentDate.getFullYear() - 5);
        break;
      case '10Y':
        startDate.setFullYear(currentDate.getFullYear() - 10);
        break;
      case '20Y':
        startDate.setFullYear(currentDate.getFullYear() - 20);
        break;
      default:
        startDate.setFullYear(currentDate.getFullYear() - 1);
    }

    // Filter data based on timeframe
    const filteredData = data.timeSeriesData.filter(point => new Date(point.date) >= startDate);

    // Map the data to the format expected by the chart
    return [...filteredData].map(point => ({
      date: point.date,
      price: point.close
    })).reverse(); // Reverse to show oldest to newest
  };

   // Format date for display
  export const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
  };