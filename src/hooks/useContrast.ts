// src/hooks/useContrast.js
import { createContext, useContext, useState } from 'react';

const ContrastContext = createContext();

export const useContrast = () => {
  const context = useContext(ContrastContext);
  if (!context) {
    throw new Error('useContrast must be used within a ContrastProvider');
  }
  return context;
};

export { ContrastContext };