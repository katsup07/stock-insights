import { FC } from 'react';

const StockSearch: FC = () => {
  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search for a stock ticker (e.g., AAPL)"
        className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default StockSearch;
