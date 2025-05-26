import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchFormProps {
  onSearch: (keyword: string) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!keyword.trim()) {
      setError('Please enter a keyword');
      return;
    }
    
    setError('');
    onSearch(keyword);
  };

  return (
    <div className="w-full max-w-xl">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter a keyword to search..."
            className={`w-full pl-12 pr-4 py-3 bg-white border ${
              error ? 'border-red-500' : 'border-gray-300'
            } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
            disabled={isLoading}
          />
          
          <button
            type="submit"
            disabled={isLoading}
            className={`absolute right-2 top-2 px-4 py-1 rounded-md text-white ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 transition-colors duration-200'
            } font-medium text-sm`}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
        
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default SearchForm;