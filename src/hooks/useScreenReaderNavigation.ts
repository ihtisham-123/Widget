import { useEffect } from 'react';
import { useScreenReader } from './useScreenReader';
import { screenReader } from '../services/screenReaderService';

export const useScreenReaderNavigation = () => {
  const { isEnabled, setCurrentElement, setSpeaking } = useScreenReader();

  useEffect(() => {
    if (!isEnabled) return;

    const handleClick = (e: MouseEvent) => {
      const clickedElement = e.target as HTMLElement;
      
      if (clickedElement) {
        setCurrentElement(clickedElement);
        clickedElement.focus();
        setSpeaking(true);
        screenReader.speak(screenReader.getElementDescription(clickedElement), () => {
          setSpeaking(false);
        });
      }
    };

    // Keep spacebar navigation as an alternative
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        
        const focusable = 'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const elements = Array.from(document.querySelectorAll<HTMLElement>(focusable));
        const currentElement = document.activeElement as HTMLElement;
        
        if (!currentElement || !elements.includes(currentElement)) {
          const firstElement = elements[0];
          if (firstElement) {
            setCurrentElement(firstElement);
            firstElement.focus();
            setSpeaking(true);
            screenReader.speak(screenReader.getElementDescription(firstElement), () => {
              setSpeaking(false);
            });
          }
          return;
        }

        const currentIndex = elements.indexOf(currentElement);
        const nextElement = elements[currentIndex + 1] || elements[0];
        
        setCurrentElement(nextElement);
        nextElement.focus();
        setSpeaking(true);
        screenReader.speak(screenReader.getElementDescription(nextElement), () => {
          setSpeaking(false);
        });
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEnabled, setCurrentElement, setSpeaking]);
};