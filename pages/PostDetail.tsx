import React from 'react';
import { JobPost, User, UserRole, JobStatus } from '../types';
import { ArrowLeft, MapPin, Calendar, CheckCircle2, Share2, Heart, Mail } from 'lucide-react';

interface PostDetailProps {
  post: JobPost;
  currentUser: User | null;
  onBack: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, currentUser, onBack }) => {
  
  // Status badge config
  const statusColor = 
    post.status === JobStatus.OPEN ? 'bg-green-100 text-green-800' :
    post.status === JobStatus.COMPETITIVE ? 'bg-yellow-100 text-yellow-800' :
    post.status === JobStatus.CLOSED ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Back Nav */}
      <button onClick={onBack} className="flex items-center text-gray-500 hover:text-blue-600 mb-6 transition-colors">
        <ArrowLeft size={18} className="mr-1" /> Back to Search
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Header Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <div className="flex gap-3 mb-4">
              {post.topicTags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                  {tag}
                </span>
              ))}
               <span className={`px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide ml-auto ${statusColor}`}>
                  {post.status}
                </span>
            </div>
            
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6 leading-tight">{post.title}</h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-bold">
                  {post.professorName[0]}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{post.professorName}</p>
                  <p className="text-xs text-gray-500">{post.labName}</p>
                </div>
              </div>
              <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
              <div className="text-sm">
                <p className="text-gray-500">Posted</p>
                <p className="font-medium text-gray-900">{post.postedDate}</p>
              </div>
               {post.deadline && (
                 <>
                  <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
                  <div className="text-sm">
                    <p className="text-gray-500">Deadline</p>
                    <p className="font-medium text-red-600">{post.deadline}</p>
                  </div>
                 </>
               )}
            </div>
          </div>

          {/* Prerequisites Block */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="text-blue-600" size={20} />
              Prerequisites & Skills
            </h3>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {post.skillTags.map(skill => (
                <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium border border-gray-200">
                  {skill}
                </span>
              ))}
            </div>
            
            <div className="p-4 bg-blue-50 text-blue-900 rounded-lg text-sm border border-blue-100">
              {post.prerequisites}
            </div>
          </div>

          {/* Description Block */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Project Description</h3>
            <div className="prose prose-blue max-w-none text-gray-700">
              <p className="whitespace-pre-line leading-relaxed">{post.description}</p>
            </div>
          </div>

        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          <div className="sticky top-24 space-y-4">
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
               <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Actions</h3>
               
               <div className="space-y-3">
                 <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all shadow-sm hover:shadow-md">
                   <Mail size={18} />
                   Email Professor
                 </button>
                 
                 {currentUser?.role === UserRole.STUDENT && (
                   <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-bold hover:bg-gray-50 transition-colors">
                     <Heart size={18} className="text-gray-400" />
                     Save Position
                   </button>
                 )}

                 <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-gray-500 rounded-lg text-sm hover:text-gray-900 transition-colors">
                   <Share2 size={16} />
                   Share this post
                 </button>
               </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs text-gray-500 text-center">
              Please note: RA Board only connects you with the professor. All subsequent application processes happen via email.
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default PostDetail;