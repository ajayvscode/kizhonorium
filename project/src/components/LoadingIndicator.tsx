import React from 'react';

interface LoadingIndicatorProps {
  message?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ 
  message = 'Fetching data from Google...' 
}) => {
  return (
    <div className="w-full max-w-xl mt-8 bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-blue-200"></div>
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-t-4 border-blue-600 animate-spin"></div>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-gray-700">{message}</p>
        <p className="text-sm text-gray-500 mt-2">This may take a moment...</p>
      </div>
    </div>
  );
};

export default LoadingIndicator;