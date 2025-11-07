
import React from 'react';
import { ExtraTopicState } from '../types';

interface GeneralTopicFormProps {
  label: string;
  placeholder: string;
  extraState: ExtraTopicState;
  setExtraState: React.Dispatch<React.SetStateAction<ExtraTopicState>>;
}

export const GeneralTopicForm: React.FC<GeneralTopicFormProps> = ({ label, placeholder, extraState, setExtraState }) => (
  <div className="bg-slate-900/50 p-4 rounded-lg">
    <label htmlFor="general-topic" className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
    <input
      id="general-topic"
      type="text"
      placeholder={placeholder}
      value={extraState.topic}
      onChange={(e) => setExtraState({ topic: e.target.value })}
      className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 p-2.5 transition-colors duration-200"
    />
  </div>
);
