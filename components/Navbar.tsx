import React from 'react';
import { User, UserRole } from '../types';
import { Search, Plus, User as UserIcon, LogOut } from 'lucide-react';

interface NavbarProps {
  currentUser: User | null;
  onLogin: (role: UserRole) => void;
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, onLogin, onLogout, onNavigate }) => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left: Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('/')}>
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900">RA Board</span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            {!currentUser ? (
              <div className="flex gap-2">
                 {/* Simulation Buttons */}
                <button 
                  onClick={() => onLogin(UserRole.STUDENT)}
                  className="hidden md:block px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Simulate Student Login
                </button>
                <button 
                  onClick={() => onLogin(UserRole.PROFESSOR)}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Sign In / Register
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
                     <p className="text-[10px] text-gray-500 uppercase leading-none mt-1">{currentUser.role}</p>
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