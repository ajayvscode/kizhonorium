import React from 'react';
import { numberWithCommas } from '../utils/formatters';

interface ResultCardProps {
  keyword: string;
  backlinkCount: number;
}

const ResultCard: React.FC<ResultCardProps> = ({ keyword, backlinkCount }) => {
  return (
    <div className="w-full max-w-xl mt-8 bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg">
      <div className="bg-blue-700 text-white px-6 py-4">
        <h2 className="text-xl font-semibold truncate">Results for: {keyword}</h2>
      </div>
      
      <div className="p-6">
        <div className="text-center">
          <span className="text-gray-600 text-sm">Total Backlinks (Search Results)</span>
          <div className="mt-2 text-4xl font-bold text-blue-800">
            {numberWithCommas(backlinkCount)}
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Data source</span>
            <span className="text-gray-700 font-medium">Google Search</span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-gray-500">Retrieved at</span>
            <span className="text-gray-700 font-medium">{new Date().toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;