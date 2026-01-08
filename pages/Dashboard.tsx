import React, { useState } from 'react';
import { User, JobPost, UserRole, JobStatus } from '../types';
import JobCard from '../components/JobCard';
import { Settings, Bookmark, FileText, Layout } from 'lucide-react';

interface DashboardProps {
  user: User;
  userPosts: JobPost[]; // For professors
  savedPosts: JobPost[]; // For students
  onPostClick: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, userPosts, savedPosts, onPostClick }) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'saved' | 'settings'>(
    user.role === UserRole.PROFESSOR ? 'posts' : 'saved'
  );

  const renderContent = () => {
    if (activeTab === 'posts') {
      return (
        <div className="space-y-6">
           <div className="flex justify-between items-center">
             <h2 className="text-xl font-bold">My Posted Positions</h2>
             <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-bold hover:bg-blue-700">Create New Post</button>
           </div>
           
           {userPosts.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {userPosts.map(post => (
                 <div key={post.id} className="relative group">
                    <JobCard post={post} onClick={onPostClick} />
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="px-2 py-1 bg-black/70 text-white text-xs rounded">Click to Edit</span>
                    </div>
                 </div>
               ))}
             </div>
           ) : (
             <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
               <p className="text-gray-500">You haven't posted any positions yet.</p>
             </div>
           )}
        </div>
      );
    }

    if (activeTab === 'saved') {
      return (
        <div className="space-y-6">
           <h2 className="text-xl font-bold">Saved Positions</h2>
           {savedPosts.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {savedPosts.map(post => <JobCard key={post.id} post={post} onClick={onPostClick} />)}
             </div>
           ) : (
             <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
               <p className="text-gray-500">No saved positions.</p>
             </div>
           )}
        </div>
      );
    }

    return (
      <div className="max-w-xl">
        <h2 className="text-xl font-bold mb-6">Account Settings</h2>
        <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
             <input type="text" value={user.name} disabled className="w-full p-2 border border-gray-300 rounded-md bg-gray-50" />
          </div>
          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
             <input type="text" value={user.department} disabled className="w-full p-2 border border-gray-300 rounded-md bg-gray-50" />
          </div>
          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
             <textarea className="w-full p-2 border border-gray-300 rounded-md" rows={4} defaultValue={user.bio}></textarea>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700">Save Changes</button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8 flex flex-col md:flex-row items-center md:items-start gap-6">
        <img 
          src={user.avatarUrl} 
          alt={user.name} 
          className="w-24 h-24 rounded-full border-4 border-blue-50 shadow-sm"
        />
        <div className="text-center md:text-left flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-gray-500 font-medium">{user.role === UserRole.PROFESSOR ? 'Professor' : 'Student'} • {user.department}</p>
          <p className="text-gray-600 mt-2 max-w-2xl">{user.bio}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <nav className="w-full md:w-64 flex-shrink-0 space-y-1">
          {user.role === UserRole.PROFESSOR && (
            <button 
              onClick={() => setActiveTab('posts')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'posts' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FileText size={18} /> My Posts
            </button>
          )}
          
          <button 
            onClick={() => setActiveTab('saved')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'saved' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Bookmark size={18} /> Saved
          </button>

          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'settings' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Settings size={18} /> Settings
          </button>
        </nav>

        {/* Tab Content */}
        <div className="flex-1 min-h-[400px]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;