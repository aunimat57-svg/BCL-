
import React from 'react';

interface GeneratedOptionsProps {
  options: string[];
  onSelect: (option: string) => void;
}

export const GeneratedOptions: React.FC<GeneratedOptionsProps> = ({ options, onSelect }) => {
  if (options.length === 0) return null;

  return (
    <div className="space-y-3">
        <h3 className="text-lg font-semibold text-slate-300">Cadangan AI:</h3>
        {options.map((opt, i) => (
            <div
                key={i}
                onClick={() => onSelect(opt)}
                className="p-4 bg-slate-700/50 rounded-lg cursor-pointer border border-transparent hover:border-cyan-500 hover:bg-slate-700 transition-all duration-200"
            >
                <p className="text-slate-300 whitespace-pre-wrap">{`${i + 1}. ${opt}`}</p>
            </div>
        ))}
    </div>
  );
};
