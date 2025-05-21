import { FC } from "react";

interface TimeFrameSelectorsProps {
  timeframes: string[];
  selectedTimeframe: string;
  onTimeframeSelect: (timeframe: string) => void;
}

const TimeFrameSelectors: FC<TimeFrameSelectorsProps> = ({ timeframes, selectedTimeframe, onTimeframeSelect }) => {
  return (
    <div className="flex space-x-2">
      {timeframes.map((tf) => (
        <button
          key={tf}
          onClick={() => onTimeframeSelect(tf)}
          className={`px-3 py-1 rounded-md text-sm font-medium
            ${selectedTimeframe === tf ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
        >
          {tf}
        </button>
      ))}
    </div>
  );
};

export default TimeFrameSelectors;