import { FC } from 'react';
import { StockMatch } from '../../api/types/stockSearch';

interface StockSearchResultsProps {
  results: StockMatch[] | null;
  onSelectStock: (symbol: string) => void;
  isLoading?: boolean;
}

const StockSearchResults: FC<StockSearchResultsProps> = ({ 
  results, 
  onSelectStock,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="mt-2 p-3 bg-gray-800 rounded-lg shadow-md">
        <p className="text-gray-400">Loading results...</p>
      </div>
    );
  }

  if (!results || results.length === 0)
    return null;

  return (
    <div className="mt-2 bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <ul className="divide-y divide-gray-700">
        {results.map((stock) => (
          <li 
            key={stock.symbol} 
            className="p-3 hover:bg-gray-700 cursor-pointer transition-colors duration-200"
            onClick={() => onSelectStock(stock.symbol)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-white justify-self-start">{stock.symbol}</h3>
                <p className="text-sm text-blue-400">{stock.name}</p>
              </div>
              <div className="text-xs text-indigo-400">
                {stock.region} | {stock.currency}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockSearchResults;