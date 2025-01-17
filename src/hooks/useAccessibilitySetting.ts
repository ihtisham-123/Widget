// src/hooks/useAccessibilitySettings.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AccessibilityState {
    fontSize: number;
    contrast: 'default' | 'high-contrast' | 'dark';
    letterSpacing: number;
    wordSpacing: number;
    lineHeight: number;
    setFontSize: (size: number) => void;
    setContrast: (mode: 'default' | 'high-contrast' | 'dark') => void;
    setLetterSpacing: (spacing: number) => void;
    setWordSpacing: (spacing: number) => void;
    setLineHeight: (height: number) => void;
}

export const useAccessibilitySettings = create<AccessibilityState>()(
  persist(
    (set) => ({
        fontSize: 100,
        contrast: 'default',
        letterSpacing: 0,
        wordSpacing: 0,
        lineHeight: 1.5,
        setFontSize: (size) => set({ fontSize: size }),
        setContrast: (mode) => set({ contrast: mode }),
        setLetterSpacing: (spacing) => set({ letterSpacing: spacing }),
        setWordSpacing: (spacing) => set({ wordSpacing: spacing }),
        setLineHeight: (height) => set({ lineHeight: height }),
     }),
    {
      name: 'accessibility-settings',
    }
  )
);
