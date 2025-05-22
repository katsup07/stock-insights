import { useEffect, useState } from "react";
import { ChartDataPoint } from "./types";
import { processStockData } from "./utils";
import { ApiClient } from "../../api/ApiClient";
import { StockTimeSeriesResponse } from "../../api/types/stockTimeSeries";

const apiClient = ApiClient.getInstance();

export const useStockHistory = (
  setChartData: React.Dispatch<React.SetStateAction<ChartDataPoint[]>>, 
  selectedTimeframe: string,
  symbol: string = 'AAPL'
) => {
  const [stockHistory, setStockHistory] = useState<StockTimeSeriesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await apiClient.getStockHistory(symbol);
        setStockHistory(data);
        const processedData = processStockData(data, selectedTimeframe);
        setChartData(processedData);
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setError('Failed to fetch stock history data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol, selectedTimeframe, setChartData]);

  return { stockHistory, loading, error };
}