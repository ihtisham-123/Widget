import React, { useEffect } from 'react';
import { Mic } from 'lucide-react';
import { useScreenReader } from '../../hooks/useScreenReader';
import { useScreenReaderNavigation } from '../../hooks/useScreenReaderNavigation';
import { screenReader } from '../../services/screenReaderService';

export const ScreenReaderControl = () => {
  const { isEnabled, isSpeaking, toggleEnabled } = useScreenReader();
  
  useScreenReaderNavigation();

  useEffect(() => {
    if (isEnabled) {
      screenReader.speak(
        'Screen reader enabled. Press spacebar to navigate through elements.'
      );
    } else {
      screenReader.stop();
    }
  }, [isEnabled]);

  return (
    <div className="space-y-2">
      <button
        onClick={toggleEnabled}
        className={`flex items-center gap-2 p-3 w-full rounded-lg transition-colors ${
          isEnabled
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`}
        aria-pressed={isEnabled}
      >
        <Mic className={`h-5 w-5 ${isSpeaking ? 'animate-pulse' : ''}`} />
        <span className="text-sm font-medium">
          {isEnabled ? 'Disable' : 'Enable'} Screen Reader
        </span>
      </button>
      
      {isEnabled && (
        <p className="text-xs text-gray-600 mt-2">
          Press spacebar to navigate through elements. Screen reader will announce the focused element.
        </p>
      )}
    </div>
  );
};