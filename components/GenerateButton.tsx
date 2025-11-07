
import React from 'react';
import { LoadingSpinnerIcon, SparklesIcon } from './icons';

interface GenerateButtonProps {
    loading: boolean;
    onClick: () => void;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({ loading, onClick }) => (
    <button
        onClick={onClick}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-900 font-bold py-3 px-4 rounded-lg hover:from-cyan-400 hover:to-teal-300 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 disabled:opacity-50 disabled:cursor-wait transition-all duration-300"
    >
        {loading ? (
            <>
                <LoadingSpinnerIcon className="w-5 h-5 animate-spin" />
                Menjana...
            </>
        ) : (
            <>
                <SparklesIcon className="w-5 h-5" />
                Jana Dengan AI
            </>
        )}
    </button>
);
