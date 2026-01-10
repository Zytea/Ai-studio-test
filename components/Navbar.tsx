import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { Plus, LogOut, User as UserIcon, Search } from 'lucide-react';

interface NavbarProps {
  currentUser: User | null;
  searchQuery?: string;
  onSearch?: (query: string) => void;
  showSearch?: boolean;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  currentUser, 
  searchQuery = '', 
  onSearch, 
  showSearch = true, 
  onOpenLogin, 
  onOpenRegister, 
  onLogout, 
  onNavigate 
}) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(localQuery);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          {/* Left: Logo */}
          <div className="flex items-center cursor-pointer flex-shrink-0" onClick={() => onNavigate('/')}>
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900 hidden sm:block">SSC RA Board</span>
            </div>
          </div>

          {/* Center: Search Bar (Conditional) */}
          {showSearch && onSearch && (
            <div className="flex flex-1 items-center justify-center max-w-xl mx-2 md:mx-4">
               <form onSubmit={handleSearchSubmit} className="w-full relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                 </div>
                 <input
                  type="text"
                  value={localQuery}
                  onChange={(e) => setLocalQuery(e.target.value)}
                  placeholder="Search topic, professor..."
                  className="block w-full pl-10 pr-3 py-2 translate-y-[5px] border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-transparent md:placeholder-gray-500 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-colors"
                 />
               </form>
            </div>
          )}

          {/* Right: Actions */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {!currentUser ? (
              <div className="flex gap-3">
                 <button 
                  onClick={onOpenLogin}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Log In
                </button>
                <button 
                  onClick={onOpenRegister}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Register
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                {currentUser.role === UserRole.PROFESSOR && (
                  <button 
                    className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors shadow-sm"
                    onClick={() => onNavigate('dashboard')}
                  >
                    <Plus size={16} />
                    <span>Post Job</span>
                  </button>
                )}
                
                <div 
                  className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={() => onNavigate('dashboard')}
                >
                  <img 
                    className="h-9 w-9 rounded-full border border-gray-300 object-cover" 
                    src={currentUser.avatarUrl} 
                    alt={currentUser.name} 
                  />
                  <div className="hidden md:block text-left mr-2">
                     <p className="text-xs font-semibold text-gray-700 leading-none">{currentUser.name}</p>
                     <p className="text-[10px] text-gray-500 uppercase leading-none mt-1">{currentUser.school}</p>
                  </div>
                </div>

                <button 
                  onClick={onLogout}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;