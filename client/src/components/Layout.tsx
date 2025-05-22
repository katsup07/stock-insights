import { FC } from 'react';
import Navbar from './Navbar';
import StockSearch from './search/StockSearch';
import ChartArea from './chart/ChartArea';

const Layout: FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Navbar />
      <main className="container mx-auto p-2 flex flex-col flex-grow">
        <StockSearch />
        <ChartArea />
      </main>
      <footer className="bg-gray-900 text-center p-4 text-sm text-gray-500 border-t border-gray-800">
        StockInsights © 2025
      </footer>
    </div>
  );
};

export default Layout;
