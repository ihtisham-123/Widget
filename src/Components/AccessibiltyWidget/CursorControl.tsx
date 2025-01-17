import React from 'react';
import { MousePointer2, Palette } from 'lucide-react';
import { useAccessibilitySettings } from '../../hooks/useAccessibilitySetting';

const CURSOR_SIZES = [
  { value: 'default', label: 'Default' },
  { value: 'large', label: 'Large' },
  { value: 'larger', label: 'Larger' }
] as const;

const CURSOR_COLORS = [
  { value: '#000000', label: 'Black' },
  { value: '#FF0000', label: 'Red' },
  { value: '#0000FF', label: 'Blue' },
  { value: '#008000', label: 'Green' },
  { value: '#FFD700', label: 'Yellow' }
];

export const CursorControl = () => {
  const { cursorSize, cursorColor, setCursorSize, setCursorColor } = useAccessibilitySettings();

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-700">Cursor Options</h3>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <MousePointer2 className="h-4 w-4" />
          <label className="text-sm font-medium">Cursor Size</label>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {CURSOR_SIZES.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setCursorSize(value)}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                cursorSize === value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
              aria-pressed={cursorSize === value}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          <label className="text-sm font-medium">Cursor Color</label>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {CURSOR_COLORS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setCursorColor(value)}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                cursorColor === value ? 'border-blue-500 scale-110' : 'border-gray-200'
              }`}
              style={{ backgroundColor: value }}
              aria-label={`Set cursor color to ${label}`}
              aria-pressed={cursorColor === value}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          Hover here to preview cursor changes
        </p>
      </div>
    </div>
  );
};