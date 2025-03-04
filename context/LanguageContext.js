"use client";

import { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('nl'); // Default language is Dutch

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'nl' ? 'en' : 'nl'));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
