import { FC } from 'react';
import { useStockKeywordsSearch } from './useStockKeywordsSearch';

const StockSearch: FC = () => {
  const { searchKeywords, setSearchKeywords, handleKeywordsSearch } = useStockKeywordsSearch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeywords(event.target.value);
  };

  const onHandleKeywordsSearch = () => {
    if (searchKeywords.trim() === '') 
      return;
    
    handleKeywordsSearch(searchKeywords);
  }

  return (
    <div className="p-3 flex items-center bg-gray-800 rounded-lg shadow-md gap-3">
      <input
        type="text"
        placeholder="Search for a stock ticker (e.g., AAPL)"
        className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchKeywords}
        onChange={handleInputChange}
      />
      <button className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        onClick={onHandleKeywordsSearch}>
        Search
      </button>
    </div>
  );
};

export default StockSearch;
