import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import LoadingSpinner from './components/LoadingSpinner';
import HomePage from './components/HomePage';
import ResultsPage from './components/ResultsPage';
import { getNutritionAdvice } from './services/geminiService';
import type { AnalysisResult } from './types';
import { LanguageProvider, useTranslations } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import LanguageSelector from './components/LanguageSelector';
import ThemeToggle from './components/ThemeToggle';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1]);
    };
    reader.onerror = (error) => reject(error);
  });
};

const AppContent: React.FC = () => {
  const [view, setView] = useState<'home' | 'app' | 'result'>('home');
  const [condition, setCondition] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { language, t } = useTranslations();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const clearImage = () => {
      setImageFile(null);
      setImagePreview(null);
  };

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (!condition.trim()) {
      setError(t('error.noCondition'));
      return;
    }

    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      let imagePayload;
      if (imageFile) {
        const base64Data = await fileToBase64(imageFile);
        imagePayload = {
          mimeType: imageFile.type,
          data: base64Data,
        };
      }
      const advice = await getNutritionAdvice(condition, imagePayload, language);
      setResult(advice);
      setView('result');
    } catch (err) {
        if (err instanceof Error) {
            setError(`${t('error.prefix')}: ${err.message}`);
        } else {
            setError(t('error.unexpected'));
        }
    } finally {
      setIsLoading(false);
    }
  }, [condition, imageFile, language, t]);
  
  const startApp = () => setView('app');

  const handleReset = () => {
    setCondition('');
    clearImage();
    setResult(null);
    setError(null);
    setView('app');
  };

  const handleBack = () => {
    setError(null);
    if (view === 'app') {
      setView('home');
    } else if (view === 'result') {
      setView('app');
    }
  };

  return (
    <div className="min-h-screen text-gray-800 dark:text-gray-200 font-sans antialiased transition-colors duration-300">
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <LanguageSelector />
        <ThemeToggle />
      </div>

      <main className="container mx-auto px-4 py-8">
        {view === 'home' && <HomePage onStart={startApp} />}

        {view === 'app' && (
          <>
            <div className="relative w-full max-w-2xl mx-auto mb-[-2rem]">
                <button
                    onClick={handleBack}
                    className="absolute top-0 left-0 flex items-center gap-1 text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 font-semibold transition-colors"
                    aria-label="Go back to home page"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t('buttons.back')}
                </button>
            </div>
            <Header />
            <InputForm
              condition={condition}
              setCondition={setCondition}
              handleImageChange={handleImageChange}
              handleSubmit={handleSubmit}
              imagePreview={imagePreview}
              isLoading={isLoading}
              clearImage={clearImage}
            />
            {isLoading && <LoadingSpinner />}
            {error && (
                <div className="w-full max-w-2xl mx-auto mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg dark:bg-red-900/20 dark:border-red-500/30 dark:text-red-300">
                    <strong>{t('error.prefix')}:</strong> {error.replace(`${t('error.prefix')}: `, '')}
                </div>
            )}
          </>
        )}

        {view === 'result' && result && (
            <ResultsPage result={result} onReset={handleReset} onBack={handleBack} />
        )}
      </main>
    </div>
  );
};

const App: React.FC = () => (
  <LanguageProvider>
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  </LanguageProvider>
);

export default App;