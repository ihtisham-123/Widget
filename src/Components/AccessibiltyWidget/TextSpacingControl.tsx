
import React from 'react';
import { TextCursor, AlignVerticalJustifyStart } from 'lucide-react';
import { Icon as LetterSpacing } from '@iconify/react';
import { useAccessibilitySettings } from '../../hooks/useAccessibilitySetting';

interface SpacingControlProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  label: string;
  icon: React.ReactNode;
  unit?: string;
}

const SpacingControl = ({
  value,
  onChange,
  min,
  max,
  step,
  label,
  icon,
  unit = 'px'
}: SpacingControlProps) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      {icon}
      <label htmlFor={label.toLowerCase().replace(' ', '-')} className="text-sm font-medium">
        {label}
      </label>
    </div>
    <input
      id={label.toLowerCase().replace(' ', '-')}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      aria-label={`Adjust ${label.toLowerCase()}`}
    />
    <span className="text-xs text-gray-600">
      {value}{unit}
    </span>
  </div>
);

export const TextSpacingControl = () => {
  const {
    letterSpacing,
    wordSpacing,
    lineHeight,
    setLetterSpacing,
    setWordSpacing,
    setLineHeight,
  } = useAccessibilitySettings();

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-700">Text Spacing</h3>
      
      <SpacingControl
        value={letterSpacing}
        onChange={setLetterSpacing}
        min={0}
        max={5}
        step={0.5}
        label="Letter Spacing"
        icon={<LetterSpacing icon="mdi:format-letter-spacing" className="h-4 w-4" />}
      />

      <SpacingControl
        value={wordSpacing}
        onChange={setWordSpacing}
        min={0}
        max={10}
        step={1}
        label="Word Spacing"
        icon={<TextCursor className="h-4 w-4" />}
      />

      <SpacingControl
        value={lineHeight}
        onChange={setLineHeight}
        min={1}
        max={3}
        step={0.1}
        label="Line Height"
        icon={<AlignVerticalJustifyStart className="h-4 w-4" />}
        unit="x"
      />
    </div>
  );
};