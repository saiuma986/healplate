import React from 'react';
import { useTranslations } from '../context/LanguageContext';

const LoadingSpinner: React.FC = () => {
  const { t } = useTranslations();
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600 dark:border-red-500"></div>
      <p className="text-gray-600 dark:text-gray-400">{t('loading.message')}</p>
    </div>
  );
};

export default LoadingSpinner;
