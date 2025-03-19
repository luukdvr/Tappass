"use client";

import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('nl'); // Standaardtaal is Nederlands

  const translations = {
    nl: {
      logout: 'Uitloggen',
      dashboard: 'Dashboard',
      login: 'Inloggen',
      register: 'Aanmelden',
      // Voeg meer vertalingen toe...
    },
    en: {
      logout: 'Logout',
      dashboard: 'Dashboard',
      login: 'Login',
      register: 'Register',
      // Voeg meer vertalingen toe...
    },
  };

  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'nl' ? 'en' : 'nl')); // Wissel tussen 'nl' en 'en'
  };

  return (
    <LanguageContext.Provider value={{ t, language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
