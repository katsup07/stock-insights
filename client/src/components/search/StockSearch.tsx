import React, { FC, useState, useEffect } from 'react';
import { useStockKeywordsSearch } from './useStockKeywordsSearch';
import StockSearchResults from './StockSearchResults';
import Modal from '../ui/Modal';

interface StockSearchProps {
  onSelectStock: (symbol: string) => void;
}

const StockSearch: FC<StockSearchProps> = ({ onSelectStock }) => {
  const { 
    searchKeywords, 
    setSearchKeywords, 
    handleKeywordsSearch, 
    searchResults,
    setSearchResults,
    loading,
    error
  } = useStockKeywordsSearch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeywords(event.target.value);
  };

  const onHandleKeywordsSearch = () => {
    if (searchKeywords.trim() === '') 
      return;
    
    handleKeywordsSearch(searchKeywords);
  }  
  const [notification, setNotification] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  const handleStockSelect = (symbol: string) => {
    onSelectStock(symbol);
    // Show notification
    setNotification(`Selected stock: ${symbol}`);
    
    // Close the modal
    setIsModalOpen(false);
    setSearchKeywords('');// Clear the search input

    setTimeout(() => setSearchResults(null), 1000);
    setTimeout(() => setNotification(null), 3000);
  };
  // Open modal when search results are available or when loading
  useEffect(() => {
    if (loading || (searchResults?.bestMatches && searchResults.bestMatches.length > 0))
      setIsModalOpen(true);
    
  }, [searchResults, loading]);

  return (
    <div className="flex flex-col">
      <div className="p-3 flex items-center bg-gray-800 rounded-lg shadow-md gap-3">
        <input
          type="text"
          placeholder="Search for a stock ticker (e.g., AAPL)"
          className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchKeywords}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === 'Enter' && onHandleKeywordsSearch()}
        />
        <button className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          onClick={onHandleKeywordsSearch}>
          Search
        </button>
      </div>
      
      {notification && (
        <div className="mt-2 p-3 bg-indigo-500 text-white rounded-lg shadow-md animate-fade-in">
          {notification}
        </div>
      )}
      
      {error && (
        <div className="mt-2 p-3 bg-red-900 text-white rounded-lg shadow-md">
          {error}
        </div>
      )}
      
      {/* Display StockSearchResults in Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Stock Search Results"
      >
        <StockSearchResults 
          results={searchResults?.bestMatches || null} 
          onSelectStock={handleStockSelect}
          isLoading={loading}
        />
      </Modal>
    </div>
  );
};

export default StockSearch;
