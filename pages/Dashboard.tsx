import React, { useState, useMemo } from 'react';
import { User, JobPost, UserRole, Application, ApplicationStatus, JobStatus, School } from '../types';
import JobCard from '../components/JobCard';
import { Settings, Bookmark, FileText, Users, ExternalLink, X, AlertCircle, Eye, Edit2, Trash2 } from 'lucide-react';

interface DashboardProps {
  user: User;
  userPosts: JobPost[];
  userApplications: Application[];
  allApplications: Application[]; // For professor to see applicants
  onPostClick: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, userPosts, userApplications, allApplications, onPostClick }) => {
  // Default tab logic: Professor -> posts, Student -> applications
  const [activeTab, setActiveTab] = useState<'posts' | 'applications' | 'settings'>(
    user.role === UserRole.PROFESSOR ? 'posts' : 'applications'
  );
  
  // Professor: Post Management
  const [managingPostId, setManagingPostId] = useState<string | null>(null);
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editingPostData, setEditingPostData] = useState<Partial<JobPost>>({});
  
  // Professor: Applications Table Logic
  const [showRejected, setShowRejected] = useState(false);
  const [rejectingAppId, setRejectingAppId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [localApps, setLocalApps] = useState(allApplications);

  // Settings State
  const [showMyApplicationsTab, setShowMyApplicationsTab] = useState(user.preferences?.showMyApplications ?? (user.role === UserRole.STUDENT));

  const handleStatusChange = (appId: string, newStatus: ApplicationStatus) => {
    if (newStatus === ApplicationStatus.REJECTED) {
      setRejectingAppId(appId);
      setRejectionReason('');
    } else {
      updateAppStatus(appId, newStatus);
    }
  };

  const confirmRejection = () => {
    if (!rejectionReason.trim()) return;
    if (rejectingAppId) {
      updateAppStatus(rejectingAppId, ApplicationStatus.REJECTED, rejectionReason);
      setRejectingAppId(null);
    }
  };

  const updateAppStatus = (appId: string, status: ApplicationStatus, reason?: string) => {
    setLocalApps(prev => prev.map(a => a.id === appId ? { ...a, status, rejectionReason: reason } : a));
  };

  const sortedUserPosts = useMemo(() => {
     return [...userPosts].sort((a, b) => {
         // Sort by Availability (Open > Competitive > Closed)
         const statusOrder = { [JobStatus.OPEN]: 0, [JobStatus.COMPETITIVE]: 1, [JobStatus.CLOSED]: 2 };
         if (statusOrder[a.status] !== statusOrder[b.status]) {
             return statusOrder[a.status] - statusOrder[b.status];
         }
         // Then by Date
         return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
     });
  }, [userPosts]);

  // Status Badge Helper
  const ApplicationStatusBadge = ({ status }: { status: ApplicationStatus }) => {
    const config = {
      [ApplicationStatus.SUBMITTED]: 'bg-gray-100 text-gray-600',
      [ApplicationStatus.VIEWED]: 'bg-blue-100 text-blue-700',
      [ApplicationStatus.INTERVIEW]: 'bg-yellow-100 text-yellow-800',
      [ApplicationStatus.ACCEPTED]: 'bg-green-100 text-green-800',
      [ApplicationStatus.REJECTED]: 'bg-red-100 text-red-800',
    };
    return <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${config[status]}`}>{status}</span>;
  };

  // --- SUB-VIEWS ---

  // 1. Post Editor (Mock)
  if (isEditingPost) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <button onClick={() => setIsEditingPost(false)} className="flex items-center text-gray-500 hover:text-indigo-600 mb-6">
                <X size={18} className="mr-1" /> Cancel
            </button>
            <h2 className="text-2xl font-bold mb-6">{editingPostData.id ? 'Edit Position' : 'Create New Position'}</h2>
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
                {/* Reusing Form Styles roughly */}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Research Topic (Title)</label>
                        <input type="text" className="w-full border border-gray-300 rounded p-2" defaultValue={editingPostData.title} />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                        <select className="w-full border border-gray-300 rounded p-2" defaultValue={editingPostData.school}>
                            <option>SDS</option><option>SSE</option><option>SME</option>
                        </select>
                    </div>
                </div>
                <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Description (Markdown)</label>
                     <textarea className="w-full border border-gray-300 rounded p-2" rows={5} defaultValue={editingPostData.description}></textarea>
                </div>
                 <div className="grid grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select className="w-full border border-gray-300 rounded p-2" defaultValue={editingPostData.status}>
                             <option value={JobStatus.OPEN}>Open</option>
                             <option value={JobStatus.COMPETITIVE}>Competitive</option>
                             <option value={JobStatus.CLOSED}>Closed</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Headcount</label>
                        <input type="number" className="w-full border border-gray-300 rounded p-2" defaultValue={editingPostData.headcount} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subsidy</label>
                        <input type="text" className="w-full border border-gray-300 rounded p-2" defaultValue={editingPostData.subsidy} />
                    </div>
                </div>
                <div className="pt-4 flex justify-end">
                    <button onClick={() => { setIsEditingPost(false); alert('Post Updated (Simulated)'); }} className="bg-indigo-600 text-white px-6 py-2 rounded font-bold hover:bg-indigo-700">Save Position</button>
                </div>
            </div>
        </div>
    )
  }

  // 2. Application Management List
  if (managingPostId && user.role === UserRole.PROFESSOR) {
    const post = userPosts.find(p => p.id === managingPostId);
    let applicants = localApps.filter(a => a.postId === managingPostId);
    
    if (!showRejected) {
        applicants = applicants.filter(a => a.status !== ApplicationStatus.REJECTED);
    }

    return (
      <div className="max-w-[90%] mx-auto px-4 py-8">
        <button onClick={() => setManagingPostId(null)} className="flex items-center text-gray-500 hover:text-indigo-600 mb-6">
          <X size={18} className="mr-1" /> Back to Dashboard
        </button>
        
        <div className="flex flex-col sm:flex-row justify-between items-end mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{post?.title}</h1>
            <p className="text-gray-500">Managing Applications</p>
          </div>
          <div className="flex items-center gap-4">
             <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
                 <input type="checkbox" checked={showRejected} onChange={(e) => setShowRejected(e.target.checked)} className="rounded text-indigo-600 focus:ring-indigo-500"/>
                 Show Rejected
             </label>
             <div className="text-right pl-4 border-l border-gray-300">
                <div className="text-2xl font-bold text-indigo-600">{applicants.length}</div>
                <div className="text-xs text-gray-500 uppercase">Visible</div>
             </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statement</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resume</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applicants.map(app => (
                <tr key={app.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">{app.studentName}</div>
                    </div>
                    <div className="text-sm text-gray-500">ID: {app.studentSchoolId}</div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-500 line-clamp-2 max-w-xs" title={app.statement}>{app.statement}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <a href={app.resumeLink} target="_blank" rel="noreferrer" className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1 text-sm font-medium">
                       Open Link <ExternalLink size={14} />
                     </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select 
                      value={app.status} 
                      onChange={(e) => handleStatusChange(app.id, e.target.value as ApplicationStatus)}
                      className={`block w-full pl-3 pr-8 py-1.5 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-gray-50 font-medium ${app.status === ApplicationStatus.REJECTED ? 'text-red-700' : 'text-gray-900'}`}
                    >
                      {Object.values(ApplicationStatus).map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {app.status === ApplicationStatus.REJECTED && (
                      <p className="text-xs text-red-500 mt-1 max-w-[150px] truncate" title={app.rejectionReason}>{app.rejectionReason}</p>
                    )}
                  </td>
                </tr>
              ))}
              {applicants.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">No applications match filter.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Rejection Reason Modal */}
        {rejectingAppId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setRejectingAppId(null)}></div>
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Reason for Rejection</h3>
              <textarea
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 mb-4"
                rows={3}
                placeholder="Required..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <button onClick={() => setRejectingAppId(null)} className="px-4 py-2 text-gray-600 font-medium">Cancel</button>
                <button 
                  onClick={confirmRejection} 
                  disabled={!rejectionReason.trim()}
                  className="px-4 py-2 bg-red-600 text-white rounded font-medium disabled:opacity-50"
                >
                  Confirm Reject
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Initial Views
  return (
    <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8 flex flex-col md:flex-row items-center md:items-start gap-6">
        <img 
          src={user.avatarUrl} 
          alt={user.name} 
          className="w-24 h-24 rounded-full border-4 border-indigo-50 shadow-sm"
        />
        <div className="text-center md:text-left flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
          <div className="text-gray-500 font-medium flex flex-wrap gap-2 justify-center md:justify-start mt-1">
             <span>{user.role === UserRole.PROFESSOR ? 'Professor / Researcher' : 'Student'}</span>
             <span>•</span>
             <span>{user.school}</span>
             {user.position && (
                 <>
                    <span>•</span>
                    <span className="text-indigo-600">{user.position}</span>
                 </>
             )}
          </div>
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
                activeTab === 'posts' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FileText size={18} /> My Posts
            </button>
          )}
          
          {(user.role === UserRole.STUDENT || showMyApplicationsTab) && (
              <button 
                onClick={() => setActiveTab('applications')}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'applications' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Bookmark size={18} /> {user.role === UserRole.PROFESSOR ? 'My Applications' : 'My Applications'}
              </button>
          )}

          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'settings' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Settings size={18} /> Settings
          </button>
        </nav>

        {/* Tab Content */}
        <div className="flex-1 min-h-[400px]">
          
          {/* PROFESSOR: MY POSTS */}
          {activeTab === 'posts' && user.role === UserRole.PROFESSOR && (
             <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">My Posted Positions</h2>
                  <button 
                    onClick={() => { setEditingPostData({}); setIsEditingPost(true); }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-bold hover:bg-indigo-700"
                  >
                    Create New Post
                  </button>
                </div>
                {sortedUserPosts.length > 0 ? (
                  <div className="space-y-4">
                    {sortedUserPosts.map(post => {
                       const count = localApps.filter(a => a.postId === post.id).length;
                       return (
                        <div key={post.id} className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col md:flex-row gap-4 hover:shadow-md transition-shadow">
                           <div className="flex-1 space-y-2">
                             <div className="flex justify-between items-start">
                                 <h3 
                                    className="text-lg font-bold text-gray-900 cursor-pointer hover:text-indigo-600"
                                    onClick={() => onPostClick(post.id)} // Go to detail
                                 >
                                    {post.title}
                                 </h3>
                                 <span className={`px-2 py-1 text-xs font-bold uppercase rounded ${
                                     post.status === JobStatus.OPEN ? 'bg-green-100 text-green-800' : 
                                     post.status === JobStatus.COMPETITIVE ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                 }`}>
                                     {post.status}
                                 </span>
                             </div>
                             
                             <div className="flex items-center gap-6 text-sm text-gray-500">
                                 <div className="flex items-center gap-1.5" title="Applications / Limit">
                                     <Users size={16} className="text-gray-400"/>
                                     <span className="font-medium text-gray-900">{count}</span>
                                     <span>/ {post.headcount} Applied</span>
                                 </div>
                                 <div className="flex items-center gap-1.5" title="Views">
                                     <Eye size={16} className="text-gray-400"/>
                                     <span>{post.viewCount} Views</span>
                                 </div>
                                 <div className="text-xs">
                                     Posted: {post.postedDate}
                                 </div>
                             </div>
                           </div>

                           <div className="flex flex-row md:flex-col gap-2 justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-4 min-w-[160px]">
                              <button 
                                onClick={() => { setEditingPostData(post); setIsEditingPost(true); }}
                                className="flex-1 px-3 py-1.5 text-sm bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 flex items-center justify-center gap-2"
                              >
                                <Edit2 size={14} /> Edit
                              </button>
                              <button 
                                onClick={() => alert('Close/Delete simulated')}
                                className="flex-1 px-3 py-1.5 text-sm bg-white border border-gray-300 text-gray-700 rounded hover:bg-red-50 hover:text-red-600 hover:border-red-200 flex items-center justify-center gap-2"
                              >
                                <Trash2 size={14} /> Close
                              </button>
                              <button 
                                onClick={() => setManagingPostId(post.id)}
                                className="flex-1 px-3 py-1.5 text-sm bg-indigo-50 text-indigo-700 border border-indigo-100 rounded font-bold hover:bg-indigo-100 flex items-center justify-center gap-2"
                              >
                                View Applications
                              </button>
                           </div>
                        </div>
                       );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                    <p className="text-gray-500">You haven't posted any positions yet.</p>
                  </div>
                )}
             </div>
          )}

          {/* MY APPLICATIONS */}
          {activeTab === 'applications' && (
             <div className="space-y-6">
                <h2 className="text-xl font-bold">My Applications</h2>
                {userApplications.length > 0 ? (
                  <div className="space-y-4">
                    {userApplications.map(app => {
                      const post = userPosts.find(p => p.id === app.postId); // Note: In real app, need access to all posts or fetch
                      // Assuming userPosts passed here contains relevant posts, otherwise fallback
                      return (
                        <div 
                            key={app.id} 
                            onClick={() => onPostClick(app.postId)}
                            className="bg-white border border-gray-200 rounded-lg p-5 cursor-pointer hover:border-indigo-300 hover:shadow-sm transition-all"
                        >
                           <div className="flex justify-between items-start mb-2">
                             <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600">
                                 {/* Mock title lookup if not in userPosts */}
                                 {post?.title || `Position #${app.postId}`} 
                             </h3>
                             <ApplicationStatusBadge status={app.status} />
                           </div>
                           <p className="text-sm text-gray-500 mb-4">Applied on {app.appliedDate}</p>
                           {app.status === ApplicationStatus.REJECTED && app.rejectionReason && (
                             <div className="bg-red-50 p-3 rounded text-sm text-red-800 flex gap-2">
                               <AlertCircle size={16} className="flex-shrink-0 mt-0.5"/>
                               <div>
                                 <span className="font-bold">Reason:</span> {app.rejectionReason}
                               </div>
                             </div>
                           )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                    <p className="text-gray-500">No applications yet.</p>
                  </div>
                )}
             </div>
          )}
          
          {/* SETTINGS */}
          {activeTab === 'settings' && (
            <div className="max-w-xl">
              <h2 className="text-xl font-bold mb-6">Account Settings</h2>
              <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="text" value={user.email} disabled className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">School</label>
                        <input type="text" value={user.school} disabled className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500" />
                    </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grade / Position</label>
                  <input type="text" defaultValue={user.position} className="w-full p-2 border border-gray-300 rounded-md" placeholder="e.g. Junior, Assistant Professor"/>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea className="w-full p-2 border border-gray-300 rounded-md" rows={4} defaultValue={user.bio}></textarea>
                </div>

                {user.role === UserRole.PROFESSOR && (
                    <div className="flex items-center gap-3 py-2 border-t border-b border-gray-100">
                        <input 
                            type="checkbox" 
                            checked={showMyApplicationsTab} 
                            onChange={(e) => setShowMyApplicationsTab(e.target.checked)}
                            className="rounded text-indigo-600"
                        />
                        <span className="text-sm text-gray-700">Show "My Applications" Tab</span>
                    </div>
                )}

                <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-3">Change Password</h3>
                    <div className="space-y-3">
                        <input type="password" placeholder="New Password" className="w-full p-2 border border-gray-300 rounded-md" />
                        <input type="password" placeholder="Confirm New Password" className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                </div>

                <div className="pt-2 flex flex-col gap-3">
                    <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700">Save Changes</button>
                    <button className="w-full px-4 py-2 bg-white text-red-600 border border-red-200 rounded-md font-medium hover:bg-red-50">Delete Account</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;