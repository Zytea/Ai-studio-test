import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import PostDetail from './pages/PostDetail';
import Dashboard from './pages/Dashboard';
import { MOCK_POSTS, MOCK_USER_PROFESSOR, MOCK_USER_STUDENT } from './services/mockData';
import { User, UserRole, JobPost } from './types';

// Simple Router Enum
type Page = 'HOME' | 'SEARCH' | 'DETAIL' | 'DASHBOARD';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('HOME');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPostId, setCurrentPostId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Navigation Handler
  const navigateTo = (page: Page) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    navigateTo('SEARCH');
  };

  const handlePostClick = (id: string) => {
    setCurrentPostId(id);
    navigateTo('DETAIL');
  };

  const handleLogin = (role: UserRole) => {
    if (role === UserRole.PROFESSOR) {
      setCurrentUser(MOCK_USER_PROFESSOR);
    } else {
      setCurrentUser(MOCK_USER_STUDENT);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigateTo('HOME');
  };

  // Mock filtering for dashboard
  const userPosts = currentUser && currentUser.role === UserRole.PROFESSOR 
    ? MOCK_POSTS.filter(p => p.professorId === currentUser.id)
    : [];
    
  // Mock saved posts (just taking first 2 for demo)
  const savedPosts = MOCK_POSTS.slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar 
        currentUser={currentUser} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
        onNavigate={(path) => {
            if(path === 'dashboard') navigateTo('DASHBOARD');
            else navigateTo('HOME');
        }}
      />

      <main className="flex-grow relative">
        {currentPage === 'HOME' && (
          <Home onSearch={handleSearch} />
        )}

        {currentPage === 'SEARCH' && (
          <SearchPage 
            initialQuery={searchQuery} 
            posts={MOCK_POSTS} 
            onPostClick={handlePostClick} 
          />
        )}

        {currentPage === 'DETAIL' && currentPostId && (
          <PostDetail 
            post={MOCK_POSTS.find(p => p.id === currentPostId)!} 
            currentUser={currentUser}
            onBack={() => navigateTo('SEARCH')}
          />
        )}

        {currentPage === 'DASHBOARD' && currentUser && (
          <Dashboard 
            user={currentUser}
            userPosts={userPosts}
            savedPosts={savedPosts}
            onPostClick={handlePostClick}
          />
        )}
      </main>
    </div>
  );
};

export default App;