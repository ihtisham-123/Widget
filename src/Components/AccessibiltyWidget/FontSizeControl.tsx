
// src/components/AccessibilityWidget/FontSizeControl.tsx
import React from 'react';
import { Type } from 'lucide-react';
import { useAccessibilitySettings } from '../../hooks/useAccessibilitySetting';

export const FontSizeControl = () => {
  const { fontSize, setFontSize } = useAccessibilitySettings();

  const handleFontSizeChange = (newSize: number) => {
    setFontSize(Math.max(80, Math.min(150, newSize)));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Type className="h-4 w-4" />
        <label htmlFor="font-size" className="text-sm font-medium">
          Font Size
        </label>
      </div>
      <input
        id="font-size"
        type="range"
        min={80}
        max={150}
        step={10}
        value={fontSize}
        onChange={(e) => handleFontSizeChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        aria-label="Adjust font size"
      />
      <span className="text-xs text-gray-600">{fontSize}%</span>
    </div>
  );
};