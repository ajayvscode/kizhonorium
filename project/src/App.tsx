import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import ResultCard from './components/ResultCard';
import LoadingIndicator from './components/LoadingIndicator';
import ErrorDisplay from './components/ErrorDisplay';
import { getBacklinkCount, BacklinkResponse, ApiError } from './services/api';
import { Search } from 'lucide-react';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<BacklinkResponse | null>(null);

  const handleSearch = async (keyword: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getBacklinkCount(keyword);
      setResult(data);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'An unknown error occurred');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (result) {
      handleSearch(result.keyword);
    } else {
      setError(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center p-4 sm:p-8">
      <header className="w-full max-w-4xl text-center mb-8 sm:mb-12">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-blue-700 p-3 rounded-full">
            <Search className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          Google Backlink Counter
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Enter any keyword to find out how many backlinks (search results) it has on Google
        </p>
      </header>

      <main className="w-full max-w-4xl flex flex-col items-center">
        <SearchForm onSearch={handleSearch} isLoading={loading} />
        
        {loading ? (
          <LoadingIndicator />
        ) : error ? (
          <ErrorDisplay message={error} onRetry={handleRetry} />
        ) : result ? (
          <ResultCard keyword={result.keyword} backlinkCount={result.backlink_count} />
        ) : (
          <div className="w-full max-w-xl mt-12 text-center">
            <p className="text-gray-500 italic">Enter a keyword above to see its backlink count</p>
          </div>
        )}
      </main>

      <footer className="mt-auto pt-8 w-full max-w-4xl text-center text-gray-500 text-sm">
        <p>© 2025 Google Backlink Counter. All rights reserved.</p>
        <p className="mt-1">
          <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
          {' • '}
          <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
        </p>
      </footer>
    </div>
  );
}

export default App;