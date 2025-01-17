
import { useEffect, useCallback } from 'react';
import { useAccessibilitySettings } from './useAccessibilitySetting';

export const useKeyboardControl = (
  id: string,
  value: number,
  onChange: (value: number) => void,
  step: number,
  min: number,
  max: number
) => {
  const { keyboardNavigationEnabled } = useAccessibilitySettings();

  const announceChange = useCallback((newValue: number) => {
    const utterance = new SpeechSynthesisUtterance(`${id}: ${newValue}`);
    window.speechSynthesis.speak(utterance);
  }, [id]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!keyboardNavigationEnabled) return;

    if (document.activeElement?.id !== id) return;

    let newValue = value;
    
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        e.preventDefault();
        newValue = Math.min(max, value + step);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        e.preventDefault();
        newValue = Math.max(min, value - step);
        break;
    }

    if (newValue !== value) {
      onChange(newValue);
      announceChange(newValue);
    }
  }, [value, onChange, step, min, max, keyboardNavigationEnabled, id, announceChange]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return { handleKeyDown };
};