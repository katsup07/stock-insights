import { FC, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import TimeFrameSelectors from './TimeFrameSelectors.tsx';

const data = [
  { name: 'Mon', price: 120 },
  { name: 'Tue', price: 132 },
  { name: 'Wed', price: 101 },
  { name: 'Thu', price: 134 },
  { name: 'Fri', price: 90 },
  { name: 'Sat', price: 230 },
  { name: 'Sun', price: 310 },
];

const timeframes = ['1M', '6M', '1Y', '5Y', '10Y', '20Y'];

const ChartArea: FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1Y');

  const handleTimeframeChange = (timeframe: string) => {
    setSelectedTimeframe(timeframe);
    // TODO: Implement data fetching based on the selected timeframe
    console.log(`Selected timeframe: ${timeframe}`);
  };

  return (
    <div className="p-4 flex-grow">
      <div className="bg-gray-800 h-full rounded-lg shadow-lg p-6 text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Stock Chart</h2>
          <TimeFrameSelectors 
            timeframes={timeframes} 
            selectedTimeframe={selectedTimeframe} 
            onTimeframeSelect={handleTimeframeChange} 
          />
        </div>
        <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-700 rounded-lg bg-gray-900">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip contentStyle={{ backgroundColor: '#222', border: 'none' }} labelStyle={{ color: '#fff' }} />
              <Legend />
              <Line type="monotone" dataKey="price" stroke="#82ca9d" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartArea;
