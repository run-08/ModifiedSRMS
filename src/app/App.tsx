import { useState } from 'react';
import IndexPage from './components/IndexPage';
import ResultPage from './components/ResultPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'index' | 'result'>('index');

  return (
    <div className="min-h-screen">
      {/* Page Navigation */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => setCurrentPage('index')}
          className={`cursor-pointer px-4 py-2 rounded-lg font-medium transition-all ${
            currentPage === 'index'
              ? 'bg-teal-600 text-white'
              : 'bg-white text-teal-600 border border-teal-600 hover:bg-teal-50'
          }`}
        >
          Registration
        </button>
        <button
          onClick={() => setCurrentPage('result')}
          className={`cursor-pointer px-4 py-2 rounded-lg font-medium transition-all ${
            currentPage === 'result'
              ? 'bg-teal-600 text-white'
              : 'bg-white text-teal-600 border border-teal-600 hover:bg-teal-50'
          }`}
        >
          View Results
        </button>
      </div>

      {/* Page Content */}
      {currentPage === 'index' ? <IndexPage /> : <ResultPage />}
    </div>
  );
}