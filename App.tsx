
import React, { useState, useCallback } from 'react';
import { PostType, SoftSellingState, ExtraTopicState } from './types';
import { generatePostVariations } from './services/geminiService';
import { Header } from './components/Header';
import { PostTypeSelector } from './components/PostTypeSelector';
import { SoftSellingForm } from './components/SoftSellingForm';
import { GeneralTopicForm } from './components/GeneralTopicForm';
import { ContentArea } from './components/ContentArea';
import { GeneratedOptions } from './components/GeneratedOptions';
import { GenerateButton } from './components/GenerateButton';

const App: React.FC = () => {
  const [type, setType] = useState<PostType>('topik');
  const [content, setContent] = useState<string>('');
  const [soft, setSoft] = useState<SoftSellingState>({ hook: '', problem: '', solution: '', cta: '' });
  const [extra, setExtra] = useState<ExtraTopicState>({ topic: '' });
  
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    setLoading(true);
    setError(null);
    setOptions([]);
    try {
      const results = await generatePostVariations(type, content, soft, extra);
      setOptions(results);
      if (results.length > 0) {
        setContent(results[0]);
      }
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  }, [type, content, soft, extra]);

  const renderForm = () => {
    switch (type) {
      case 'softselling':
        return <SoftSellingForm softState={soft} setSoftState={setSoft} />;
      case 'sembang':
        return <GeneralTopicForm label="Topik Sembang" placeholder="Contoh: Kenangan kerja pertama..." extraState={extra} setExtraState={setExtra} />;
      case 'kewangan':
        return <GeneralTopicForm label="Fokus Kewangan" placeholder="Contoh: Cara urus gaji, tips simpanan..." extraState={extra} setExtraState={setExtra} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-start justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-2xl bg-slate-800 rounded-xl shadow-2xl shadow-cyan-500/10 p-6 sm:p-8 space-y-6">
        <Header />

        <div className="space-y-4">
          <PostTypeSelector type={type} setType={(newType) => {
            setType(newType);
            setOptions([]);
            setContent('');
          }} />
          {renderForm()}
          <ContentArea content={content} setContent={setContent} placeholder={type === 'topik' ? "Masukkan tajuk / idea utama..." : "AI akan isi automatik selepas dijana..."} />
        </div>
        
        <GenerateButton loading={loading} onClick={handleGenerate} />

        {error && <p className="text-red-400 text-center text-sm">{error}</p>}

        <GeneratedOptions options={options} onSelect={setContent} />
      </div>
    </div>
  );
};

export default App;
