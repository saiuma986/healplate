import React from 'react';
import Logo from './Logo';
import { useTranslations } from '../context/LanguageContext';

interface HomePageProps {
  onStart: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStart }) => {
  const { t } = useTranslations();
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center animate-fade-in">
      <Logo className="w-24 h-24 text-red-600 dark:text-red-500 mb-4" />
      <h1 className="text-5xl font-bold text-red-700 dark:text-red-600">{t('home.title')}</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">{t('home.subtitle')}</p>
      
      <button
        onClick={onStart}
        className="mt-12 py-3 px-8 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-transform transform hover:scale-105"
      >
        {t('home.cta')}
      </button>
    </div>
  );
};

export default HomePage;