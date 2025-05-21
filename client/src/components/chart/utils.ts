import { ChartDataPoint, StockData } from "./interfaces";

// Process stock data to format suitable for chart
  export const processStockData = (data: StockData, timeframe: string): ChartDataPoint[] => {
    if (!data || !data['Weekly Time Series']) return [];

    const timeSeries = data['Weekly Time Series'];
    const dates = Object.keys(timeSeries).sort(); // Sort dates in ascending order    // Get current date and calculate the start date based on timeframe
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
    const filteredDates = dates.filter(dateStr => new Date(dateStr) >= startDate);

    // Map the data to the format expected by the chart
    return filteredDates.map(date => ({
      date: date,
      price: parseFloat(timeSeries[date]['4. close'])
    })).reverse(); // Reverse to show oldest to newest
  };

   // Format date for display
  export const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
  };