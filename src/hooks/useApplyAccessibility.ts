// src/hooks/useApplyAccessibility.ts
import { useEffect } from 'react';
import { useAccessibilitySettings } from './useAccessibilitySetting';

export const useApplyAccessibility = () => {
    const { fontSize, contrast, letterSpacing, wordSpacing, lineHeight } = useAccessibilitySettings();

    useEffect(() => {
      // Apply font size
      document.documentElement.style.fontSize = `${fontSize}%`;
  
      // Apply text spacing settings
      document.body.style.letterSpacing = `${letterSpacing}px`;
      document.body.style.wordSpacing = `${wordSpacing}px`;
      document.body.style.lineHeight = lineHeight.toString();
  
      // Remove existing contrast classes
      document.body.classList.remove('default', 'high-contrast', 'dark');
      // Add current contrast class
      document.body.classList.add(contrast);
    }, [fontSize, contrast, letterSpacing, wordSpacing, lineHeight]);
  };