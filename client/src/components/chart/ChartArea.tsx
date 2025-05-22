import { FC, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import TimeFrameSelectors from './TimeFrameSelectors.tsx';
import { ChartDataPoint, timeframes } from './types.ts';
import { useStockHistory } from './useStockHistory.ts';
import { formatDate, processStockData } from './utils.ts';

interface ChartAreaProps {
  selectedSymbol?: string;
}

const ChartArea: FC<ChartAreaProps> = ({ selectedSymbol = 'AAPL' }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1Y');
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const { stockHistory, loading, error } = useStockHistory(setChartData, selectedTimeframe, selectedSymbol);

  const handleTimeframeChange = (timeframe: string) => {
    setSelectedTimeframe(timeframe);
    if (!stockHistory) return;

    const processedData = processStockData(stockHistory, timeframe);
    setChartData(processedData);
  };
  
  // Helper function to render different states of the chart
  const renderChartContent = () => {
    // Loading state
    if (loading)
      return (
        <div className="text-gray-400 text-center">
          Loading stock data...
        </div>
      );
    
    // Error state
    if (error)
      return (
        <div className="text-red-400 text-center">
          {error}
        </div>
      );
    
    // No data state
    if (chartData.length === 0)
      return (
        <div className="text-gray-400 text-center">
          No data available for the selected timeframe
        </div>
      );
    
    // Chart data available - render the chart
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          data={chartData} 
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          {/* Grid lines */}
          <CartesianGrid stroke="#0055a44b" />
          
          {/* X-axis (dates) */}
          <XAxis 
            dataKey="date" 
            stroke="#aaa"
            tickFormatter={formatDate}
            tick={{ fontSize: 12 }}
          />
          
          {/* Y-axis (price values) */}
          <YAxis 
            stroke="#aaa"
            domain={['dataMin', 'dataMax']}
            tick={{ fontSize: 12 }}
          />
          
          {/* Tooltip shown on hover */}
          <Tooltip 
            contentStyle={{ backgroundColor: '#222', border: 'none' }} 
            labelStyle={{ color: '#fff' }} 
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
            labelFormatter={(label) => formatDate(label)}
          />
          
          {/* Chart legend */}
          <Legend />
          
          {/* The actual price line */}
          <Line 
            type="monotone" 
            dataKey="price" 
            name="Price ($)" 
            stroke="#82ca9d" 
            strokeWidth={2} 
            dot={{ r: 1 }} 
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="p-4 flex-grow">
      <div className="bg-gray-800 h-full rounded-lg shadow-lg p-6 text-white">        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">
            {stockHistory?.metaData?.symbol || selectedSymbol} Chart
          </h2>
          <TimeFrameSelectors 
            timeframes={timeframes} 
            selectedTimeframe={selectedTimeframe} 
            onTimeframeSelect={handleTimeframeChange} 
          />
        </div>
        <div className="flex items-center justify-center h-64 border-2 border-gray-700 rounded-lg bg-gray-900">
          {renderChartContent()}
        </div>
      </div>
    </div>
  );
};

export default ChartArea;
