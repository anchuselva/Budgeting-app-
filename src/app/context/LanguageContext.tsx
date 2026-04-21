import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ta' | 'si';

interface Translations {
  [key: string]: {
    en: string;
    ta: string;
    si: string;
  };
}

export const translations: Translations = {
  appName: {
    en: 'SaveLKR',
    ta: 'SaveLKR',
    si: 'SaveLKR',
  },
  home: {
    en: 'Home',
    ta: 'முகப்பு',
    si: 'මුල් පිටුව',
  },
  dashboard: {
    en: 'Dashboard',
    ta: 'முகப்புப் பலகை',
    si: 'උපකරණ පුවරුව',
  },
  login: {
    en: 'Login',
    ta: 'உள்நுழைய',
    si: 'ඇතුල් වන්න',
  },
  register: {
    en: 'Register',
    ta: 'பதிவு செய்க',
    si: 'ලියාපදිංචි වන්න',
  },
  logout: {
    en: 'Logout',
    ta: 'வெளியேறு',
    si: 'ඉවත් වන්න',
  },
  income: {
    en: 'Income',
    ta: 'வருமானம்',
    si: 'ආදායම',
  },
  expenses: {
    en: 'Expenses',
    ta: 'செலவுகள்',
    si: 'වියදම්',
  },
  budget: {
    en: 'Budget',
    ta: 'பட்ஜெட்',
    si: 'අයවැය',
  },
  analytics: {
    en: 'Analytics',
    ta: 'பகுப்பாய்வு',
    si: 'විශ්ලේෂණ',
  },
  about: {
    en: 'About',
    ta: 'பற்றி',
    si: 'පිළිබඳව',
  },
  food: {
    en: 'Food',
    ta: 'உணவு',
    si: 'ආහාර',
  },
  utilities: {
    en: 'Utilities',
    ta: 'பயன்பாடுகள்',
    si: 'උපයෝගිතා',
  },
  transport: {
    en: 'Transport',
    ta: 'போக்குவரத்து',
    si: 'ප්‍රවාහනය',
  },
  household: {
    en: 'Household',
    ta: 'வீட்டுச் செலவுகள்',
    si: 'ගෘහස්ථ',
  },
  leisure: {
    en: 'Leisure',
    ta: 'ஓய்வு நேரம்',
    si: 'විනෝදාංශ',
  },
  monthlyIncome: {
    en: 'Monthly Income',
    ta: 'மாத வருமானம்',
    si: 'මාසික ආදායම',
  },
  scanBill: {
    en: 'Scan Bill',
    ta: 'பில் ஸ்கேன்',
    si: 'බිල්පත ස්කෑන් කරන්න',
  },
  addExpense: {
    en: 'Add Expense',
    ta: 'செலவு சேர்க்க',
    si: 'වියදම එකතු කරන්න',
  },
  voiceSummary: {
    en: 'Voice Summary',
    ta: 'குரல் சுருக்கம்',
    si: 'හඬ සාරාංශය',
  },
  overspending: {
    en: 'You are overspending in this category. Consider reducing expenses.',
    ta: 'இந்த வகையில் அதிக செலவு செய்கிறீர்கள். செலவுகளை குறைக்க பரிந்துரைக்கிறோம்.',
    si: 'ඔබ මෙම කාණ්ඩයේ වැඩිපුර වියදම් කරයි. වියදම් අඩු කිරීම සලකා බලන්න.',
  },
  getStarted: {
    en: 'Get Started',
    ta: 'தொடங்குங்கள்',
    si: 'ආරම්භ කරන්න',
  },
  tagline: {
    en: 'Smart budgeting for Sri Lankans',
    ta: 'இலங்கையர்களுக்கான ஸ்மார்ட் பட்ஜெட்',
    si: 'ශ්‍රී ලාංකිකයන් සඳහා ස්මාර්ට් අයවැය',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
