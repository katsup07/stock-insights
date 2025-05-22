import { useState } from "react";
import { ApiClient } from "../../api/ApiClient";
import { StockSearchResponse } from "../../api/types/stockSearch";


export const useStockKeywordsSearch = () => {
  const [searchKeywords, setSearchKeywords] = useState<string>('');
  const [searchResults, setSearchResults] = useState<StockSearchResponse | null>(null);
  // const [loading, setLoading] = useState<boolean>(false); // TODO: Add loading state and error handling
  // const [error, setError] = useState<string | null>(null);

  const handleKeywordsSearch = async (keywords: string) => {
    try {
      const apiClient = ApiClient.getInstance();
      const results = await apiClient.getStockByKeywords(keywords);
      setSearchResults(results);
      console.log('Search results:', results);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  return {
    searchKeywords,
    setSearchKeywords,
    handleKeywordsSearch,
    searchResults,
  };
};
