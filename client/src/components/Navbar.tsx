import { FC } from 'react';

const Navbar: FC = () => {
  return (
    <nav className="bg-transparent backdrop-blur-sm text-white p-4 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="container flex justify-between items-center">
        <div className="text-2xl font-bold">StockInsights</div>
        <div>
          {/* Placeholder for future navigation items */}
          {/* <a href="#settings" className="px-3 hover:text-gray-400">Settings</a> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
