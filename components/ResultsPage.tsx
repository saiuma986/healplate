import React from 'react';
import type { AnalysisResult } from '../types';
import ResultCard from './ResultCard';
import Logo from './Logo';
import { useTranslations } from '../context/LanguageContext';

interface ResultsPageProps {
  result: AnalysisResult;
  onReset: () => void;
  onBack: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ result, onReset, onBack }) => {
  const { t } = useTranslations();

  return (
    <div className="animate-fade-in">
      <header className="text-center py-6">
        <div className="flex items-center justify-center gap-3">
          <Logo className="w-10 h-10 text-red-600 dark:text-red-500" />
          <h1 className="text-4xl font-bold text-red-700 dark:text-red-600">{t('header.title')}</h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">{t('header.resultsSubtitle')}</p>
      </header>
      
      <ResultCard result={result} />

      <div className="text-center mt-8 flex justify-center items-center gap-4">
        <button
            onClick={onBack}
            className="py-3 px-8 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-transform transform hover:scale-105"
            aria-label="Go back to form"
          >
            {t('buttons.back')}
          </button>
        <button
          onClick={onReset}
          className="py-3 px-8 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-transform transform hover:scale-105"
          aria-label="Start a new analysis"
        >
          {t('buttons.analyzeAgain')}
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;