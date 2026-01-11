import React, { useState } from 'react';
import { JobPost, User, UserRole, JobStatus } from '../types';
import { ArrowLeft, Clock, CheckCircle2, Heart, Share2, Wallet, Users, AlertCircle, Edit2, Link as LinkIcon, Check } from 'lucide-react';
import MarkdownRenderer from '../components/MarkdownRenderer';

interface PostDetailProps {
  post: JobPost;
  currentUser: User | null;
  onBack: () => void;
  onApply: (postId: string, resumeLink: string, statement: string) => void;
  isSaved?: boolean;
  onToggleSave?: () => void;
  onEdit?: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ 
    post, 
    currentUser, 
    onBack, 
    onApply,
    isSaved = false,
    onToggleSave,
    onEdit
}) => {
  const [isApplyModalOpen, setApplyModalOpen] = useState(false);
  const [resumeLink, setResumeLink] = useState('');
  const [statement, setStatement] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  // Status badge config
  const statusColor = 
    post.status === JobStatus.OPEN ? 'bg-green-100 text-green-800' :
    post.status === JobStatus.COMPETITIVE ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800';

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(post.id, resumeLink, statement);
    setApplyModalOpen(false);
  };

  const handleShare = () => {
    // In a real app, this would be the actual URL
    const url = `${window.location.origin}/post/${post.id}`;
    navigator.clipboard.writeText(url).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const isOwner = currentUser?.id === post.professorId;

  return (
    <div className="max-w-[85%] mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Back Nav */}
      <button onClick={onBack} className="flex items-center text-gray-500 hover:text-indigo-600 mb-6 transition-colors group">
        <ArrowLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Search
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6 animate-fade-in">
          
          {/* Header Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <div className="flex gap-3 mb-4">
               {post.topicTags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full text-sm font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {tag}
                </span>
              ))}
               <span className={`px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide ml-auto ${statusColor}`}>
                  {post.status}
                </span>
            </div>
            
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6 leading-tight">{post.title}</h1>
            
            <div className="flex flex-col sm:flex-row gap-6 p-4 bg-gray-50 rounded-lg border border-gray-100 text-sm">
               <div className="flex items-center gap-3">
                 <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.professorName}`} 
                    className="w-10 h-10 rounded-full bg-white border border-gray-200"
                    alt="Prof"
                 />
                 <div>
                   <p className="font-bold text-gray-900">{post.professorName}</p>
                   <p className="text-gray-500">{post.school} {post.labName && `• ${post.labName}`}</p>
                 </div>
               </div>
               
               <div className="sm:ml-auto flex flex-col justify-center text-right">
                  <span className="text-gray-500">Deadline</span>
                  <span className="font-medium text-red-600 flex items-center justify-end gap-1">
                    <Clock size={14} /> {post.deadline || 'Until Filled'}
                  </span>
               </div>
            </div>
          </div>

          {/* Prerequisites Block */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="text-indigo-600" size={20} />
              Prerequisites
            </h3>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {post.skillTags.map(skill => (
                <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium border border-gray-200">
                  {skill}
                </span>
              ))}
            </div>
            
            <div className="p-4 bg-indigo-50 text-indigo-900 rounded-lg text-sm border border-indigo-100 font-medium">
              {post.requirements}
            </div>
          </div>

          {/* Description Block */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Project Description</h3>
            <div className="min-h-[100px]">
              <MarkdownRenderer content={post.description} />
            </div>
          </div>

        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6 animate-fade-in" style={{animationDelay: '100ms'}}>
          <div className="sticky top-24 space-y-4">
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
               <div className="mb-6 space-y-3">
                 <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600"><Wallet size={16}/> Subsidy</div>
                    <span className="font-bold text-gray-900">{post.subsidy}</span>
                 </div>
                 <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600"><Users size={16}/> Headcount</div>
                    <span className="font-bold text-gray-900">{post.headcount}</span>
                 </div>
               </div>
               
               <div className="space-y-3">
                 {isOwner ? (
                    <button 
                        onClick={onEdit}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-all shadow-sm active:scale-95"
                    >
                        <Edit2 size={18} /> Edit Post
                    </button>
                 ) : (
                    <button 
                        onClick={() => currentUser ? setApplyModalOpen(true) : alert('Please login first')}
                        disabled={post.status === JobStatus.CLOSED}
                        className={`w-full flex items-center justify-center gap-2 px-4 py-3 text-white rounded-lg font-bold transition-all shadow-sm hover:shadow-md active:scale-95 ${post.status === JobStatus.CLOSED ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                    >
                        Apply Now
                    </button>
                 )}
                 
                 <button 
                    onClick={onToggleSave}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 border rounded-lg font-bold transition-colors ${
                        isSaved 
                        ? 'bg-pink-50 text-pink-600 border-pink-200 hover:bg-pink-100' 
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                 >
                    <Heart size={18} className={isSaved ? "fill-current" : "text-gray-400"} />
                    {isSaved ? 'Saved' : 'Save Position'}
                  </button>

                 <button 
                    onClick={handleShare}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-gray-500 rounded-lg text-sm hover:text-gray-900 transition-colors"
                 >
                   {isCopied ? <Check size={16} className="text-green-600" /> : <Share2 size={16} />}
                   {isCopied ? 'Link Copied' : 'Share'}
                 </button>
               </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs text-gray-500">
              <p className="flex items-start gap-2">
                <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                SSC RA Board only connects you with the professor. Interviews are arranged via email.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setApplyModalOpen(false)}></div>
           <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg p-6 overflow-hidden animate-scale-in">
             <h2 className="text-2xl font-bold text-gray-900 mb-2">Apply for Position</h2>
             <p className="text-gray-500 mb-6 text-sm">{post.title}</p>
             
             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6 text-xs text-yellow-800 flex gap-2">
                <AlertCircle size={16} className="flex-shrink-0"/>
                System Restriction: No file uploads allowed. Please provide a cloud link (OneDrive/Google Drive) to your resume.
             </div>

             <form onSubmit={handleApplySubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Name</label>
                    <input type="text" value={currentUser?.name} disabled className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 text-sm text-gray-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Student ID</label>
                    <input type="text" value={currentUser?.studentId} disabled className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 text-sm text-gray-500" />
                  </div>
                </div>

                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Resume Link (OneDrive/SharePoint)</label>
                   <input 
                    type="url" 
                    required 
                    placeholder="https://..."
                    value={resumeLink}
                    onChange={(e) => setResumeLink(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-shadow" 
                   />
                </div>

                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Personal Statement (Max 500 chars)</label>
                   <textarea 
                    required 
                    maxLength={500}
                    rows={4}
                    value={statement}
                    onChange={(e) => setStatement(e.target.value)}
                    placeholder="Briefly explain your advantage or why you are applying..."
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-shadow" 
                   />
                   <p className="text-right text-xs text-gray-400 mt-1">{statement.length}/500</p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setApplyModalOpen(false)} className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 py-2.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-transform active:scale-95">Submit Application</button>
                </div>
             </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default PostDetail;