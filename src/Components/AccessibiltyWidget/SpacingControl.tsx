// src/components/AccessibilityWidget/SpacingControl.tsx
import React from 'react';
import { useKeyboardControl } from '../../hooks/useKeyboardControl';

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

export const SpacingControl = ({
  value,
  onChange,
  min,
  max,
  step,
  label,
  icon,
  unit = 'px'
}: SpacingControlProps) => {
  const id = label.toLowerCase().replace(' ', '-');
  useKeyboardControl(id, value, onChange, step, min, max);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {icon}
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={`Adjust ${label.toLowerCase()}`}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={`${value}${unit}`}
        tabIndex={0}
      />
      <span className="text-xs text-gray-600" aria-hidden="true">
        {value}{unit}
      </span>
    </div>
  );
};
