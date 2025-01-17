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
    cursorSize: 'default' | 'large' | 'larger';
    cursorColor: string;
    setCursorSize: (size: 'default' | 'large' | 'larger') => void;
    setCursorColor: (color: string) => void;
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
        cursorSize: 'default',
        cursorColor: '#000000',
        setCursorSize: (size) => set({ cursorSize: size }),
        setCursorColor: (color) => set({ cursorColor: color }),
     }),
    {
      name: 'accessibility-settings',
    }
  )
);
