import { FC, useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import TimeFrameSelectors from './TimeFrameSelectors.tsx';
import { ApiClient } from '../../../api/ApiClient.ts';

// Define types for the stock data
interface StockMetaData {
  '1. Information': string;
  '2. Symbol': string;
  '3. Last Refreshed': string;
  '4. Time Zone': string;
}

interface StockTimeSeriesItem {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
  '5. volume': string;
}

interface StockData {
  'Meta Data': StockMetaData;
  'Weekly Time Series': Record<string, StockTimeSeriesItem>;
}

interface ChartDataPoint {
  date: string;
  price: number;
}

const timeframes = ['1M', '6M', '1Y', '5Y', '10Y', '20Y'];

const ChartArea: FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1Y');
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

  const apiClient = ApiClient.getInstance();

  // Process stock data to format suitable for chart
  const processStockData = (data: StockData, timeframe: string): ChartDataPoint[] => {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiClient.getStockHistory('AAPL'); // Example symbol
        setStockData(data);
        const processedData = processStockData(data, selectedTimeframe);
        setChartData(processedData);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchData();
  }, [apiClient, selectedTimeframe]);

  const handleTimeframeChange = (timeframe: string) => {
    setSelectedTimeframe(timeframe);
    if (stockData) {
      const processedData = processStockData(stockData, timeframe);
      setChartData(processedData);
    }
    console.log(`Selected timeframe: ${timeframe}`);
  };

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
  };
  return (
    <div className="p-4 flex-grow">
      <div className="bg-gray-800 h-full rounded-lg shadow-lg p-6 text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">
            {stockData?.['Meta Data']?.['2. Symbol'] || 'Stock'} Chart
          </h2>
          <TimeFrameSelectors 
            timeframes={timeframes} 
            selectedTimeframe={selectedTimeframe} 
            onTimeframeSelect={handleTimeframeChange} 
          />
        </div>
        <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-700 rounded-lg bg-gray-900">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis 
                  dataKey="date" 
                  stroke="#aaa"
                  tickFormatter={formatDate}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  stroke="#aaa"
                  domain={['dataMin', 'dataMax']}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#222', border: 'none' }} 
                  labelStyle={{ color: '#fff' }} 
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                  labelFormatter={(label) => formatDate(label)}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  name="Price ($)" 
                  stroke="#82ca9d" 
                  strokeWidth={2} 
                  dot={{ r: 2 }} 
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-gray-400 text-center">
              {stockData === null ? 'Loading stock data...' : 'No data available for the selected timeframe'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartArea;
