
import React from 'react';
import { SparklesIcon } from './icons';

export const Header: React.FC = () => (
  <div className="text-center">
    <div className="flex items-center justify-center gap-3">
        <SparklesIcon className="w-8 h-8 text-cyan-400" />
        <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
            Penjana Content AI
        </h1>
    </div>
    <p className="mt-2 text-slate-400">Cipta posting media sosial memukau dalam sekelip mata.</p>
  </div>
);
