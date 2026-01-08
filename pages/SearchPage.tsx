import React, { useState, useEffect, useMemo } from 'react';
import { FilterState, JobPost, JobStatus } from '../types';
import JobCard from '../components/JobCard';
import { Filter, X, ChevronDown } from 'lucide-react';
import { AVAILABLE_SKILLS, AVAILABLE_TOPICS } from '../services/mockData';

interface SearchPageProps {
  initialQuery: string;
  posts: JobPost[];
  onPostClick: (id: string) => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ initialQuery, posts, onPostClick }) => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    query: initialQuery,
    status: [JobStatus.OPEN, JobStatus.COMPETITIVE], // Default active
    topics: [],
    skills: []
  });

  // Reset query if prop changes
  useEffect(() => {
    setFilters(prev => ({ ...prev, query: initialQuery }));
  }, [initialQuery]);

  const toggleStatus = (status: JobStatus) => {
    setFilters(prev => {
      const exists = prev.status.includes(status);
      return {
        ...prev,
        status: exists ? prev.status.filter(s => s !== status) : [...prev.status, status]
      };
    });
  };

  const toggleTopic = (topic: string) => {
    setFilters(prev => {
      const exists = prev.topics.includes(topic);
      return {
        ...prev,
        topics: exists ? prev.topics.filter(t => t !== topic) : [...prev.topics, topic]
      };
    });
  };

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      // 1. Text Search
      const q = filters.query.toLowerCase();
      const matchesQuery = 
        post.title.toLowerCase().includes(q) || 
        post.professorName.toLowerCase().includes(q) ||
        post.topicTags.some(t => t.toLowerCase().includes(q));
      
      if (!matchesQuery) return false;

      // 2. Status Filter
      if (filters.status.length > 0 && !filters.status.includes(post.status)) {
        return false;
      }

      // 3. Topic Filter
      if (filters.topics.length > 0) {
        const hasTopic = post.topicTags.some(t => filters.topics.includes(t));
        if (!hasTopic) return false;
      }

      return true;
    });
  }, [posts, filters]);

  const FilterSidebar = () => (
    <div className="space-y-8">
      {/* Status */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Status</h3>
        <div className="space-y-2">
          {[JobStatus.OPEN, JobStatus.COMPETITIVE, JobStatus.CLOSED, JobStatus.ENDED].map(status => (
            <label key={status} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={filters.status.includes(status)}
                onChange={() => toggleStatus(status)}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className={`text-sm ${filters.status.includes(status) ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>
                {status === JobStatus.OPEN ? 'Open (Hiring)' : 
                 status === JobStatus.COMPETITIVE ? 'Competitive' : 
                 status === JobStatus.CLOSED ? 'Closed' : 'Ended'}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Topics */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Research Topics</h3>
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_TOPICS.map(topic => (
            <button
              key={topic}
              onClick={() => toggleTopic(topic)}
              className={`px-3 py-1 text-xs rounded-full border transition-all ${
                filters.topics.includes(topic)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <FilterSidebar />
          </div>
        </aside>

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4 flex justify-between items-center">
          <p className="text-sm text-gray-500">{filteredPosts.length} results found</p>
          <button 
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Filter size={16} />
            Filters
          </button>
        </div>

        {/* Mobile Offcanvas (Modal) */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div className="fixed inset-0 bg-black/25 backdrop-blur-sm transition-opacity" onClick={() => setIsMobileFilterOpen(false)}></div>
            <div className="relative w-full max-w-xs bg-white h-full shadow-xl p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">Filters</h2>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 text-gray-500 hover:text-gray-700">
                  <X size={20} />
                </button>
              </div>
              <FilterSidebar />
              <div className="mt-8 pt-6 border-t border-gray-100">
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold"
                >
                  Show {filteredPosts.length} Results
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Feed */}
        <main className="flex-1">
          {/* Toolbar */}
          <div className="hidden lg:flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">
              {filters.query ? `Results for "${filters.query}"` : 'Latest Opportunities'}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <button className="flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-blue-600">
                Newest <ChevronDown size={14} />
              </button>
            </div>
          </div>

          {/* Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {filteredPosts.map(post => (
                <div key={post.id} className="h-full">
                  <JobCard post={post} onClick={onPostClick} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-500 text-lg">No positions match your filters.</p>
              <button 
                onClick={() => setFilters({ query: '', status: [JobStatus.OPEN], topics: [], skills: [] })}
                className="mt-4 text-blue-600 font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SearchPage;