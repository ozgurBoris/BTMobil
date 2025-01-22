import React, { createContext, useState, useContext } from 'react';

interface LanguageContextType {
  isEnglish: boolean;
  toggleLanguage: () => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  isEnglish: false,
  toggleLanguage: () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEnglish, setIsEnglish] = useState(false);

  const toggleLanguage = () => {
    setIsEnglish(prev => !prev);
  };

  return (
    <LanguageContext.Provider value={{ isEnglish, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext); 