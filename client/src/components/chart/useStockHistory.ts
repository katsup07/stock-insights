import { useEffect, useState } from "react";
import { ChartDataPoint, StockData } from "./interfaces";
import { processStockData } from "./utils";
import { ApiClient } from "../../api/ApiClient";

const apiClient = ApiClient.getInstance();

export const useStockHistory = (setChartData: React.Dispatch<React.SetStateAction<ChartDataPoint[]>>, selectedTimeframe: string) => {
  const [stockHistory, setStockHistory] = useState<StockData | null>(null);
  // const [loading, setLoading] = useState(true); // TODO: Implement loading state in component
  // const [error, setError] = useState<string | null>(null); // TODO: Implement error handling in component

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiClient.getStockHistory('AAPL'); // Example symbol
        setStockHistory(data);
        const processedData = processStockData(data, selectedTimeframe);
        setChartData(processedData);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchData();
  }, [selectedTimeframe, setChartData]);

  return { stockHistory };
}