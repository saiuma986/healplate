import React from 'react';
import type { AnalysisResult } from '../types';
import { useTranslations } from '../context/LanguageContext';

interface ResultCardProps {
  result: AnalysisResult;
}

const IconWrapper: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${className}`}>
    {children}
  </div>
);

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const { t } = useTranslations();

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mt-8 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
        🩺 {t('results.condition')}: <span className="text-red-700 dark:text-red-500">{result.condition}</span>
      </h2>

      {result.imageAnalysis && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-500/30">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2">📷 {t('results.imageAnalysis')}</h3>
          <p><strong>{t('results.foodDetected')}:</strong> {result.imageAnalysis.foodDetected}</p>
          <p><strong>{t('results.suitability')}:</strong> {result.imageAnalysis.suitability}</p>
          <p><strong>{t('results.reason')}:</strong> {result.imageAnalysis.reason}</p>
          <p className="text-xl font-bold mt-2"><strong>{t('results.score')}:</strong> {result.imageAnalysis.compatibilityScore}</p>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">🍎 {t('results.recommended')}</h3>
          <ul className="space-y-3">
            {result.recommendedFoods.map((item, index) => (
              <li key={index} className="flex items-start space-x-3">
                <IconWrapper className="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                    <span>✅</span>
                </IconWrapper>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">{item.food} – <span className="font-normal text-gray-600 dark:text-gray-400">{item.nutrient}</span></p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.reason}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">🥗 {t('results.mealIdeas')}</h3>
          <ul className="space-y-3">
            {result.mealIdeas.map((idea, index) => (
              <li key={index} className="flex items-start space-x-3">
                <IconWrapper className="bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
                    <span>💡</span>
                </IconWrapper>
                <p className="text-gray-700 dark:text-gray-300">{idea}</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">⚠️ {t('results.avoid')}</h3>
          <ul className="space-y-3">
            {result.foodsToAvoid.map((item, index) => (
              <li key={index} className="flex items-start space-x-3">
                <IconWrapper className="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                    <span>🚫</span>
                </IconWrapper>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">{item.food}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.reason}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-500/30">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">🌿 {t('results.localTip')}</h3>
            <p className="text-red-900 dark:text-red-200">{result.localTip}</p>
        </div>
      </div>

      <div className="mt-8 text-center p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300 italic">"{result.extraAdvice}"</p>
      </div>
    </div>
  );
};

export default ResultCard;