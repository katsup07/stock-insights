import { useState } from "react";
import { ApiClient } from "../../api/ApiClient";
import { StockSearchResponse } from "../../api/types/stockSearch";

export const useStockKeywordsSearch = () => {
  const [searchKeywords, setSearchKeywords] = useState<string>('');
  const [searchResults, setSearchResults] = useState<StockSearchResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleKeywordsSearch = async (keywords: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const apiClient = ApiClient.getInstance();
      const results = await apiClient.getStockByKeywords(keywords);
      setSearchResults(results);
      console.log('Search results:', results);
    } catch (error) {
      console.error('Error fetching stock data:', error);
      setError('Failed to fetch stock data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    searchKeywords,
    setSearchKeywords,
    handleKeywordsSearch,
    searchResults,
    setSearchResults,
    loading,
    error,
  };
};
