import React from 'react';
import { useTranslations } from '../context/LanguageContext';

interface InputFormProps {
  condition: string;
  setCondition: (value: string) => void;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent) => void;
  imagePreview: string | null;
  isLoading: boolean;
  clearImage: () => void;
}

const InputForm: React.FC<InputFormProps> = ({
  condition,
  setCondition,
  handleImageChange,
  handleSubmit,
  imagePreview,
  isLoading,
  clearImage,
}) => {
  const { t } = useTranslations();

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
      <div>
        <label htmlFor="condition" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t('form.label')}
        </label>
        <input
          id="condition"
          type="text"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          placeholder={t('form.placeholder')}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-red-500 focus:border-red-500"
          required
        />
      </div>

      <div className="flex items-center justify-center w-full">
        {imagePreview ? (
          <div className="relative">
            <img src={imagePreview} alt="Food preview" className="w-48 h-48 object-cover rounded-md" />
            <button
              type="button"
              onClick={clearImage}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 leading-none hover:bg-red-600 focus:outline-none"
              aria-label="Remove image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <label htmlFor="food-image" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p className="text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">{t('form.upload.main')}</span> {t('form.upload.sub')}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{t('form.upload.optional')}</p>
            </div>
            <input id="food-image" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
          </label>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
      >
        {isLoading ? t('form.submit.loading') : t('form.submit.default')}
      </button>
    </form>
  );
};

export default InputForm;