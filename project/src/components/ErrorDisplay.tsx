import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => {
  return (
    <div className="w-full max-w-xl mt-8 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-red-500 text-white px-6 py-4 flex items-center">
        <AlertTriangle className="h-5 w-5 mr-2" />
        <h2 className="text-xl font-semibold">Error Occurred</h2>
      </div>
      
      <div className="p-6">
        <p className="text-gray-700">{message}</p>
        
        {onRetry && (
          <button 
            onClick={onRetry}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorDisplay;