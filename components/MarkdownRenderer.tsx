import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  return (
    <div className={`prose prose-indigo prose-sm sm:prose-base max-w-none ${className}`}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          // Customizing link rendering to open in new tab
          a: ({node, ...props}) => (
            <a {...props} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 transition-colors" />
          ),
          // Ensure tables look good
          table: ({node, ...props}) => (
            <div className="overflow-x-auto my-4 border border-gray-200 rounded-lg">
               <table {...props} className="min-w-full divide-y divide-gray-200" />
            </div>
          ),
          thead: ({node, ...props}) => <thead {...props} className="bg-gray-50" />,
          th: ({node, ...props}) => <th {...props} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" />,
          td: ({node, ...props}) => <td {...props} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;