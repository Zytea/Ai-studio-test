import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface HomeProps {
  onSearch: (query: string) => void;
}

const Home: React.FC<HomeProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-2xl text-center -mt-20">
        {/* Hero Text */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Find your next <span className="text-blue-600">Research Adventure</span>
        </h1>
        <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto">
          Connect with professors, discover cutting-edge labs, and launch your academic career.
        </p>

        {/* Search Box */}
        <form onSubmit={handleSubmit} className="relative w-full group">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-14 pr-4 py-4 border-2 border-gray-200 rounded-full leading-5 bg-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all shadow-sm text-lg"
            placeholder="Search by topic (e.g. LLM), professor, or lab..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            type="submit"
            className="absolute inset-y-2 right-2 px-6 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </form>

        {/* Quick Tags */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <span className="text-sm text-gray-400 mr-2 py-1">Trending:</span>
          {['Deep Learning', 'Robotics', 'NLP', 'Bioinformatics'].map((tag) => (
            <button
              key={tag}
              onClick={() => onSearch(tag)}
              className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      
      {/* Footer minimal */}
      <footer className="absolute bottom-4 w-full text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} RA Board. Academic Recruitment Platform.
      </footer>
    </div>
  );
};

export default Home;