
import React from 'react';
import { SoftSellingState } from '../types';

interface SoftSellingFormProps {
  softState: SoftSellingState;
  setSoftState: React.Dispatch<React.SetStateAction<SoftSellingState>>;
}

const inputFields = [
    { id: 'hook', label: 'Hook', placeholder: 'Ramai tak sedar...' },
    { id: 'problem', label: 'Masalah', placeholder: 'Susah nak konsisten...' },
    { id: 'solution', label: 'Solusi', placeholder: 'Gunakan cara ni...' },
    { id: 'cta', label: 'CTA (Call to Action)', placeholder: 'Klik link di bio!' },
];

export const SoftSellingForm: React.FC<SoftSellingFormProps> = ({ softState, setSoftState }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900/50 p-4 rounded-lg">
    {inputFields.map(field => (
        <div key={field.id}>
            <label htmlFor={field.id} className="block text-sm font-medium text-slate-300 mb-2">{field.label}</label>
            <input
                id={field.id}
                type="text"
                placeholder={field.placeholder}
                value={softState[field.id as keyof SoftSellingState]}
                onChange={(e) => setSoftState(prev => ({ ...prev, [field.id]: e.target.value }))}
                className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 p-2.5 transition-colors duration-200"
            />
        </div>
    ))}
  </div>
);
