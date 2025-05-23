import { FC } from 'react';
import { StockMatch } from '../../api/types/stockSearch';
import { useToast } from '../../utils/useToast';

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
  const toast = useToast();

  if (isLoading) {
    return (
      <div className="p-3">
        <p className="text-gray-400">Loading results...</p>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="p-3">
        <p className="text-gray-400">No results found.</p>
      </div>
    );
  }  return (
    <ul className="divide-y divide-gray-700">
      {results.map((stock) => (
        <li 
          key={stock.symbol} 
          className="p-4 hover:bg-gray-700 cursor-pointer transition-colors duration-200"          
          onClick={() => {
            onSelectStock(stock.symbol);
            toast.success(
              <>
                <span className="font-medium mr-1">{stock.symbol}</span> 
                <span className="text-gray-200">·</span> 
                <span className="ml-1 text-sm">{stock.name}</span>
              </>,
              { 
                autoClose: 2500
              }
            );
          }}
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
  );
};

export default StockSearchResults;