import { FC, useState } from 'react';
import Navbar from './Navbar';
import StockSearch from './search/StockSearch';
import ChartArea from './chart/ChartArea';

const Layout: FC = () => {
  const [selectedSymbol, setSelectedSymbol] = useState<string>('AAPL');

  const handleSelectStock = (symbol: string) => {
    setSelectedSymbol(symbol);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Navbar />
      <main className="container mx-auto p-2 flex flex-col flex-grow">
        <StockSearch onSelectStock={handleSelectStock} />
        <ChartArea selectedSymbol={selectedSymbol} />
      </main>
      <footer className="bg-gray-900 text-center p-4 text-sm text-gray-500 border-t border-gray-800">
        StockInsights © 2025
      </footer>
    </div>
  );
};

export default Layout;
