import { FC, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import TimeFrameSelectors from './TimeFrameSelectors.tsx';
import { ChartDataPoint, timeframes } from './types.ts';
import { useStockHistory } from './useStockHistory.ts';
import { formatDate, processStockData } from './utils.ts';

const ChartArea: FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1Y');
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const { stockHistory } = useStockHistory(setChartData, selectedTimeframe);

  const handleTimeframeChange = (timeframe: string) => {
    setSelectedTimeframe(timeframe);
    if (!stockHistory) return;

    const processedData = processStockData(stockHistory, timeframe);
    setChartData(processedData);
  };

  return (
    <div className="p-4 flex-grow">
      <div className="bg-gray-800 h-full rounded-lg shadow-lg p-6 text-white">        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">
            {stockHistory?.metaData?.symbol || 'Stock'} Chart
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
              {stockHistory === null ? 'Loading stock data...' : 'No data available for the selected timeframe'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartArea;
