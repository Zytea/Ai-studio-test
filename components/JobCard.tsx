import React from 'react';
import { JobPost, JobStatus } from '../types';
import { Calendar, User, Briefcase } from 'lucide-react';

interface JobCardProps {
  post: JobPost;
  onClick: (id: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ post, onClick }) => {
  const getStatusConfig = (status: JobStatus) => {
    switch (status) {
      case JobStatus.OPEN:
        return {
          bar: 'bg-green-500',
          bg: 'bg-green-50',
          text: 'text-green-800',
          label: 'Open'
        };
      case JobStatus.COMPETITIVE:
        return {
          bar: 'bg-yellow-500',
          bg: 'bg-yellow-50',
          text: 'text-yellow-800',
          label: 'Competitive'
        };
      case JobStatus.CLOSED:
        return {
          bar: 'bg-red-500',
          bg: 'bg-red-50',
          text: 'text-red-800',
          label: 'Closed'
        };
      case JobStatus.ENDED:
      default:
        return {
          bar: 'bg-gray-500',
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          label: 'Ended'
        };
    }
  };

  const statusConfig = getStatusConfig(post.status);

  return (
    <div 
      onClick={() => onClick(post.id)}
      className="group bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden flex flex-col h-full"
    >
      {/* Color-Coded Header */}
      <div className={`px-4 py-2 flex items-center justify-between border-b ${statusConfig.bg} border-gray-100`}>
        <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${statusConfig.bar}`}></div>
            <span className={`text-xs font-bold uppercase tracking-wider ${statusConfig.text}`}>
            {statusConfig.label}
            </span>
        </div>
        <span className="text-xs text-gray-500 font-medium">{post.postedDate}</span>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2">
          {post.title}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-2">
          {post.topicTags.map(tag => (
            <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.skillTags.slice(0, 3).map(tag => (
            <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
              {tag}
            </span>
          ))}
          {post.skillTags.length > 3 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-500">
              +{post.skillTags.length - 3}
            </span>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
                <User size={14} className="text-gray-400" />
                <span className="truncate max-w-[120px]">{post.professorName}</span>
            </div>
            <div className="flex items-center gap-1.5">
                <Briefcase size={14} className="text-gray-400" />
                <span className="truncate max-w-[120px]">{post.labName}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;