// src/hooks/useApplyAccessibility.ts
import { useEffect } from 'react';
import { useAccessibilitySettings } from './useAccessibilitySetting';

export const useApplyAccessibility = () => {
    const { fontSize, contrast, letterSpacing, wordSpacing, lineHeight } = useAccessibilitySettings();
    const { cursorSize, cursorColor, ...otherSettings } = useAccessibilitySettings();

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
      if (cursorSize === 'default') {
        document.body.style.cursor = 'auto';
        document.documentElement.style.setProperty('--cursor-color', cursorColor);
      } else {
        const cursorStyles = {
          large: '24',
          larger: '32'
        };
        
        const cursorSvg = encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="${cursorStyles[cursorSize]}" height="${cursorStyles[cursorSize]}" viewBox="0 0 24 24" fill="${cursorColor}">
            <path d="M5 2l15 7.5L13 12l7 10-4-15-8 3z"/>
          </svg>
        `);
        
        document.body.style.cursor = `url('data:image/svg+xml,${cursorSvg}') ${parseInt(cursorStyles[cursorSize]) / 2} ${parseInt(cursorStyles[cursorSize]) / 2}, auto`;
      }



    }, [fontSize, contrast, letterSpacing, wordSpacing, lineHeight,cursorSize, cursorColor, ...Object.values(otherSettings)]);
  };