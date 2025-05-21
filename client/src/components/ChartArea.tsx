import { FC } from 'react';

const ChartArea: FC = () => {
  return (
    <div className="p-4 flex-grow">
      <div className="bg-gray-800 h-full rounded-lg shadow-lg p-6 text-white">
        <h2 className="text-2xl font-semibold mb-4">Stock Chart</h2>
        <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-700 rounded-lg">
          <p className="text-gray-500">Chart will be displayed here</p>
        </div>
      </div>
    </div>
  );
};

export default ChartArea;
