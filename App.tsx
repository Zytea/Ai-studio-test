import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import PostDetail from './pages/PostDetail';
import Dashboard from './pages/Dashboard';
import { MOCK_POSTS, MOCK_USER_PROFESSOR, MOCK_USER_STUDENT, MOCK_APPLICATIONS } from './services/mockData';
import { User, UserRole, ApplicationStatus, Application, School } from './types';
import { X } from 'lucide-react';

// Simple Router Enum
type Page = 'HOME' | 'SEARCH' | 'DETAIL' | 'DASHBOARD';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('HOME');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPostId, setCurrentPostId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal States
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showForgotPass, setShowForgotPass] = useState(false);
  
  // App Data State (simulating DB)
  const [applications, setApplications] = useState<Application[]>(MOCK_APPLICATIONS);

  // Navigation Handler
  const navigateTo = (page: Page) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const handleApply = (postId: string, resumeLink: string, statement: string) => {
    if (!currentUser) return;
    const newApp: Application = {
      id: `new_${Date.now()}`,
      postId,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentSchoolId: currentUser.studentId || 'N/A',
      resumeLink,
      statement,
      status: ApplicationStatus.SUBMITTED,
      appliedDate: new Date().toISOString().split('T')[0]
    };
    setApplications([...applications, newApp]);
    alert('Application Submitted Successfully!');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigateTo('HOME');
  };

  // Login Logic
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simplified Logic for Demo
    alert('Logged in successfully (Simulated)');
    // Defaulting to student if not using the quick-fill buttons
    if (!currentUser) setCurrentUser(MOCK_USER_STUDENT);
    setShowLogin(false);
  };

  // Login Modal Component
  const LoginModal = () => (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setShowLogin(false)}></div>
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-sm p-8 animate-scale-in">
        <button onClick={() => setShowLogin(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"><X size={20}/></button>
        <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
        
        {/* Quick Fill Buttons for Demo */}
        <div className="flex gap-2 mb-6">
            <button 
                onClick={() => { setCurrentUser(MOCK_USER_STUDENT); setShowLogin(false); }}
                className="flex-1 py-2 text-xs bg-gray-100 hover:bg-gray-200 rounded text-gray-700 transition-colors"
            >
                Simulate Student
            </button>
             <button 
                onClick={() => { setCurrentUser(MOCK_USER_PROFESSOR); setShowLogin(false); }}
                className="flex-1 py-2 text-xs bg-gray-100 hover:bg-gray-200 rounded text-gray-700 transition-colors"
            >
                Simulate Prof
            </button>
        </div>

        <div className="relative flex py-2 items-center mb-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-xs">OR LOGIN WITH EMAIL</span>
            <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" placeholder="name@link.cuhk.edu.cn" className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-shadow" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-shadow" />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded font-bold hover:bg-indigo-700 transition-transform active:scale-95">Log In</button>
        </form>
        
        <div className="mt-4 flex justify-between text-sm">
           <button onClick={() => { setShowLogin(false); setShowForgotPass(true); }} className="text-gray-500 hover:text-indigo-600 transition-colors">Forgot Password?</button>
           <button onClick={() => { setShowLogin(false); setShowRegister(true); }} className="text-indigo-600 font-bold hover:underline transition-colors">Register</button>
        </div>
      </div>
    </div>
  );

  // Register Modal Component
  const RegisterModal = () => (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setShowRegister(false)}></div>
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-8 max-h-[90vh] overflow-y-auto animate-scale-in">
        <button onClick={() => setShowRegister(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"><X size={20}/></button>
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        <form onSubmit={(e) => { e.preventDefault(); alert('Registration Pending Approval/Verification'); setShowRegister(false); }} className="space-y-4">
          
          <div className="flex gap-4 p-1 bg-gray-100 rounded-lg">
             <label className="flex-1 text-center py-2 rounded-md bg-white shadow-sm cursor-pointer hover:shadow-md transition-all">
                 <input type="radio" name="role" className="hidden" defaultChecked />
                 <span className="text-sm font-bold text-gray-800">Student</span>
             </label>
             <label className="flex-1 text-center py-2 rounded-md cursor-pointer text-gray-500 hover:text-gray-800 transition-colors">
                 <input type="radio" name="role" className="hidden" />
                 <span className="text-sm font-bold">Researcher</span>
             </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" required className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-shadow" />
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">School ID</label>
            <input type="text" required className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-shadow" />
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Grade / Position</label>
            <input type="text" required placeholder="e.g. Year 3 or Assistant Prof" className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-shadow" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CUHK-SZ Email</label>
            <input type="email" required placeholder="@link.cuhk.edu.cn" className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-shadow" />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="password" required className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-shadow" />
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm</label>
                <input type="password" required className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-shadow" />
             </div>
          </div>
         
          <div className="pt-2">
            <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded font-bold hover:bg-indigo-700 transition-transform active:scale-95">Register</button>
             <p className="text-xs text-gray-500 text-center mt-3">Researcher accounts require admin approval.</p>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <style>{`
        /* Global Animation Utilities */
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.2s ease-out forwards; }
        .animate-slide-in-right { animation: slideInRight 0.3s ease-out forwards; }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>

      <Navbar 
        currentUser={currentUser} 
        searchQuery={searchQuery}
        showSearch={currentPage !== 'HOME'}
        onSearch={handleSearch}
        onOpenLogin={() => setShowLogin(true)}
        onOpenRegister={() => setShowRegister(true)}
        onLogout={handleLogout}
        onNavigate={(path) => {
            if(path === 'dashboard') navigateTo('DASHBOARD');
            else navigateTo('HOME');
        }}
      />

      <main className="flex-grow relative">
        {/* Key prop triggers animation on route change */}
        <div key={currentPage} className="animate-fade-in">
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
              onApply={handleApply}
            />
          )}

          {currentPage === 'DASHBOARD' && currentUser && (
            <Dashboard 
              user={currentUser}
              userPosts={currentUser.role === UserRole.PROFESSOR ? MOCK_POSTS.filter(p => p.professorId === currentUser.id) : []}
              userApplications={currentUser.role === UserRole.STUDENT ? applications.filter(a => a.studentId === currentUser.id) : []}
              allApplications={applications}
              onPostClick={handlePostClick}
            />
          )}
        </div>
      </main>

      {showLogin && <LoginModal />}
      {showRegister && <RegisterModal />}
      {showForgotPass && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setShowForgotPass(false)}></div>
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-sm p-8 text-center animate-scale-in">
                <h2 className="text-xl font-bold mb-4">Reset Password</h2>
                <p className="text-gray-600 mb-6 text-sm">Enter your email address and we'll send you a link to reset your password.</p>
                <input type="email" placeholder="Email" className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                <button onClick={() => { alert('Reset link sent!'); setShowForgotPass(false); }} className="bg-indigo-600 text-white w-full py-2 rounded font-bold hover:bg-indigo-700 transition-colors">Send Reset Link</button>
            </div>
          </div>
      )}
    </div>
  );
};

export default App;