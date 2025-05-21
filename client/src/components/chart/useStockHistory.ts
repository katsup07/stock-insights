// export const useStockHistory = () => {
//   const [stockHistory, setStockHistory] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchStockHistory = async (symbol: string) => {
//     try {
//       setLoading(true);
//       const response = await ApiClient.getInstance().getStockHistory(symbol);
//       setStockHistory(response.data);
//     } catch (err) {
//       setError('Failed to fetch stock history');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { stockHistory, loading, error, fetchStockHistory };
// }