import React from 'react';
import Logo from './Logo';
import { useTranslations } from '../context/LanguageContext';

const Header: React.FC = () => {
  const { t } = useTranslations();
  return (
    <header className="text-center py-8">
      <div className="flex items-center justify-center gap-3">
        <Logo className="w-10 h-10 text-red-600 dark:text-red-500" />
        <h1 className="text-4xl font-bold text-red-700 dark:text-red-600">{t('header.title')}</h1>
      </div>
      <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">{t('header.subtitle')}</p>
    </header>
  );
};

export default Header;
