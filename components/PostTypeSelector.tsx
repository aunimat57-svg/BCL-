
import React from 'react';
import { PostType } from '../types';

interface PostTypeSelectorProps {
  type: PostType;
  setType: (type: PostType) => void;
}

export const PostTypeSelector: React.FC<PostTypeSelectorProps> = ({ type, setType }) => (
  <div>
    <label htmlFor="post-type" className="block text-sm font-medium text-slate-300 mb-2">Jenis Post</label>
    <select
      id="post-type"
      value={type}
      onChange={(e) => setType(e.target.value as PostType)}
      className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 p-2.5 transition-colors duration-200"
    >
      <option value="topik">Topik Umum</option>
      <option value="softselling">Soft Selling</option>
      <option value="sembang">Sembang Santai</option>
      <option value="kewangan">Kewangan</option>
    </select>
  </div>
);
