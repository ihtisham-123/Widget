
// src/components/AccessibilityWidget/ContrastControl.tsx
import React from 'react';
import { Sun } from 'lucide-react';
import { useAccessibilitySettings } from '../../hooks/useAccessibilitySetting';

export const ContrastControl = () => {
  const { contrast, setContrast } = useAccessibilitySettings();

  const handleContrastChange = () => {
    const modes = ['default', 'high-contrast', 'dark'] as const;
    const currentIndex = modes.indexOf(contrast);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setContrast(nextMode);
  };

  return (
    <button
      onClick={handleContrastChange}
      className="flex items-center gap-2 p-2 w-full rounded hover:bg-gray-100"
      aria-label={`Change contrast mode. Current mode: ${contrast}`}
    >
      <Sun className="h-4 w-4" />
      <span className="text-sm">
        Contrast: {contrast.charAt(0).toUpperCase() + contrast.slice(1)}
      </span>
    </button>
  );
};