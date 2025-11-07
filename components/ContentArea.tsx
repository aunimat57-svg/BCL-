
import React, { useState, useEffect } from 'react';
import { CopyIcon, CheckIcon } from './icons';

interface ContentAreaProps {
  content: string;
  setContent: (content: string) => void;
  placeholder: string;
}

export const ContentArea: React.FC<ContentAreaProps> = ({ content, setContent, placeholder }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = () => {
    if (content) {
      navigator.clipboard.writeText(content);
      setCopied(true);
    }
  };

  return (
    <div>
      <label htmlFor="content-area" className="block text-sm font-medium text-slate-300 mb-2">Isi Post</label>
      <div className="relative">
        <textarea
          id="content-area"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          rows={8}
          className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 p-2.5 pr-12 transition-colors duration-200 resize-y"
        />
        <button
          onClick={handleCopy}
          title="Copy Text"
          disabled={!content}
          className="absolute top-2 right-2 p-2 rounded-md bg-slate-600 hover:bg-slate-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed transition-all duration-200 text-slate-200"
        >
          {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};
