import React, { createContext, useContext, useState, useEffect } from 'react';

const ContrastContext = createContext({
  contrastMode: 'normal',
  toggleContrast: () => {},
});

export const ContrastProvider = ({ children }) => {
  const [contrastMode, setContrastMode] = useState('normal');

  useEffect(() => {
    // Remove any existing contrast classes
    document.body.classList.remove('contrast-normal', 'contrast-high', 'contrast-inverted');
    
    // Add the current contrast class
    document.body.classList.add(`contrast-${contrastMode}`);
    
    // Store preference in localStorage
    localStorage.setItem('contrast-preference', contrastMode);
  }, [contrastMode]);

  const toggleContrast = () => {
    setContrastMode(current => {
      switch (current) {
        case 'normal':
          return 'high';
        case 'high':
          return 'inverted';
        case 'inverted':
          return 'normal';
        default:
          return 'normal';
      }
    });
  };

  return (
    <ContrastContext.Provider value={{ contrastMode, toggleContrast }}>
      {children}
    </ContrastContext.Provider>
  );
};

export const useContrast = () => {
  const context = useContext(ContrastContext);
  if (!context) {
    throw new Error('useContrast must be used within a ContrastProvider');
  }
  return context;
};
