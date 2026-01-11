import React, { useState, useEffect, useMemo } from 'react';
import { FilterState, JobPost, JobStatus, School, SortOption } from '../types';
import JobCard from '../components/JobCard';
import { Filter, X, ChevronDown, Check } from 'lucide-react';
import { AVAILABLE_TOPICS, AVAILABLE_SKILLS } from '../services/mockData';

interface SearchPageProps {
  initialQuery: string;
  posts: JobPost[];
  onPostClick: (id: string) => void;
}

const SCHOOLS: School[] = ['SDS', 'SSE', 'SME', 'LHS', 'HSS', 'MED', 'AI'];

const SearchPage: React.FC<SearchPageProps> = ({ initialQuery, posts, onPostClick }) => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [showAllTopics, setShowAllTopics] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);
  
  const [filters, setFilters] = useState<FilterState>({
    query: initialQuery,
    status: [JobStatus.OPEN, JobStatus.COMPETITIVE], // Default: Open & Competitive
    schools: [],
    topics: [],
    skills: [],
    sortBy: 'RELEVANT'
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

  const toggleSchool = (school: School) => {
    setFilters(prev => {
      const exists = prev.schools.includes(school);
      return {
        ...prev,
        schools: exists ? prev.schools.filter(s => s !== school) : [...prev.schools, school]
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

  const toggleSkill = (skill: string) => {
    setFilters(prev => {
      const exists = prev.skills.includes(skill);
      return {
        ...prev,
        skills: exists ? prev.skills.filter(s => s !== skill) : [...prev.skills, skill]
      };
    });
  };

  const filteredPosts = useMemo(() => {
    let result = posts.filter(post => {
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

      // 3. School Filter
      if (filters.schools.length > 0 && !filters.schools.includes(post.school)) {
        return false;
      }
      
      // 4. Topic Filter (OR logic within topics, can be changed to AND)
      if (filters.topics.length > 0) {
        const hasTopic = post.topicTags.some(t => filters.topics.includes(t));
        if (!hasTopic) return false;
      }

       // 5. Skill Filter
       if (filters.skills.length > 0) {
        const hasSkill = post.skillTags.some(t => filters.skills.includes(t));
        if (!hasSkill) return false;
      }

      return true;
    });

    // Sort
    result.sort((a, b) => {
        if (filters.sortBy === 'NEWEST') {
            return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
        } else if (filters.sortBy === 'POPULAR') {
            return b.viewCount - a.viewCount;
        } else {
             // Relevant: Simple implementation favoring open status then date
             // Real implementation would use full text search score
             if (a.status !== b.status) {
                 return a.status === JobStatus.OPEN ? -1 : 1;
             }
             return 0;
        }
    });

    return result;
  }, [posts, filters]);

  const FilterSidebar = () => (
    <div className="space-y-8 animate-fade-in">
      {/* Status */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Status</h3>
        <div className="space-y-2">
          {[JobStatus.OPEN, JobStatus.COMPETITIVE, JobStatus.CLOSED].map(status => (
            <label key={status} className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-1 rounded transition-colors">
              <input 
                type="checkbox" 
                checked={filters.status.includes(status)}
                onChange={() => toggleStatus(status)}
                className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 transition-colors"
              />
              <span className={`text-sm ${filters.status.includes(status) ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-gray-900'} transition-colors`}>
                {status === JobStatus.OPEN ? 'Open (Hiring)' : 
                 status === JobStatus.COMPETITIVE ? 'Competitive' : 'Closed'}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Schools */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Department / School</h3>
        <div className="space-y-2">
          {SCHOOLS.map(school => (
            <label key={school} className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-1 rounded transition-colors">
              <input 
                type="checkbox" 
                checked={filters.schools.includes(school)}
                onChange={() => toggleSchool(school)}
                className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 transition-colors"
              />
              <span className={`text-sm ${filters.schools.includes(school) ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-gray-900'} transition-colors`}>
                {school}
              </span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Topics */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Research Topics</h3>
        <div className="space-y-2">
          {(showAllTopics ? AVAILABLE_TOPICS : AVAILABLE_TOPICS.slice(0, 5)).map(topic => (
            <label key={topic} className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-1 rounded transition-colors">
              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${filters.topics.includes(topic) ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300 bg-white'}`}>
                {filters.topics.includes(topic) && <Check size={10} className="text-white" />}
              </div>
              <input 
                type="checkbox" 
                checked={filters.topics.includes(topic)}
                onChange={() => toggleTopic(topic)}
                className="hidden" // Custom checkbox styling
              />
              <span className={`text-sm ${filters.topics.includes(topic) ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-gray-900'} transition-colors`}>
                {topic}
              </span>
            </label>
          ))}
          {AVAILABLE_TOPICS.length > 5 && (
            <button 
                onClick={() => setShowAllTopics(!showAllTopics)}
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium mt-1 transition-colors"
            >
                {showAllTopics ? '- Show Less' : '+ Show More'}
            </button>
          )}
        </div>
      </div>

       {/* Skills */}
       <div>
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Skills</h3>
        <div className="space-y-2">
          {(showAllSkills ? AVAILABLE_SKILLS : AVAILABLE_SKILLS.slice(0, 5)).map(skill => (
            <label key={skill} className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-1 rounded transition-colors">
               <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${filters.skills.includes(skill) ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300 bg-white'}`}>
                {filters.skills.includes(skill) && <Check size={10} className="text-white" />}
              </div>
              <input 
                type="checkbox" 
                checked={filters.skills.includes(skill)}
                onChange={() => toggleSkill(skill)}
                className="hidden"
              />
              <span className={`text-sm ${filters.skills.includes(skill) ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-gray-900'} transition-colors`}>
                {skill}
              </span>
            </label>
          ))}
           {AVAILABLE_SKILLS.length > 5 && (
            <button 
                onClick={() => setShowAllSkills(!showAllSkills)}
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium mt-1 transition-colors"
            >
                {showAllSkills ? '- Show Less' : '+ Show More'}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <FilterSidebar />
          </div>
        </aside>

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4 flex justify-between items-center animate-fade-in">
          <p className="text-sm text-gray-500">{filteredPosts.length} results found</p>
          <button 
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Filter size={16} />
            Filters
          </button>
        </div>

        {/* Mobile Offcanvas */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div className="fixed inset-0 bg-black/25 backdrop-blur-sm transition-opacity animate-fade-in" onClick={() => setIsMobileFilterOpen(false)}></div>
            <div className="relative w-full max-w-xs bg-white h-full shadow-xl p-6 overflow-y-auto animate-slide-in-right">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">Filters</h2>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                  <X size={20} />
                </button>
              </div>
              <FilterSidebar />
              <div className="mt-8 pt-6 border-t border-gray-100">
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold transition-transform active:scale-95"
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
          <div className="hidden lg:flex justify-between items-center mb-6 pb-4 border-b border-gray-100 animate-fade-in">
            <h2 className="text-xl font-bold text-gray-900">
              {filters.query ? `Results for "${filters.query}"` : 'Job Feed'}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <div className="relative group">
                <select 
                    value={filters.sortBy}
                    onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as SortOption }))}
                    className="appearance-none bg-transparent pl-2 pr-6 py-1 text-sm font-medium text-gray-900 hover:text-indigo-600 cursor-pointer focus:outline-none transition-colors"
                >
                    <option value="RELEVANT">Most Relevant</option>
                    <option value="NEWEST">Newest</option>
                    <option value="POPULAR">Most Popular</option>
                </select>
                <ChevronDown size={14} className="absolute right-0 top-1.5 pointer-events-none text-gray-500 group-hover:text-indigo-600 transition-colors" />
              </div>
            </div>
          </div>

          {/* Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
                <div key={post.id} className="h-full animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                  <JobCard post={post} onClick={onPostClick} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300 animate-fade-in">
              <p className="text-gray-500 text-lg">No positions match your filters.</p>
              <button 
                onClick={() => setFilters({ query: '', status: [JobStatus.OPEN], schools: [], topics: [], skills: [], sortBy: 'RELEVANT' })}
                className="mt-4 text-indigo-600 font-medium hover:underline transition-colors"
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