import React, { useState } from 'react';

// Custom Switch Component
const Switch = ({ checked, onCheckedChange, id }) => {
  const handleToggle = () => {
    onCheckedChange(!checked);
  };

  return (
    <div className="relative inline-flex items-center">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleToggle}
        className="sr-only"
      />
      <label 
        htmlFor={id} 
        className={`
          w-10 h-6 rounded-full 
          ${checked ? 'bg-blue-500' : 'bg-gray-300'}
          relative cursor-pointer
          transition-colors duration-300
        `}
      >
        <span 
          className={`
            absolute top-1 left-1 
            w-4 h-4 bg-white rounded-full 
            transition-transform duration-300
            ${checked ? 'transform translate-x-4' : ''}
          `}
        />
      </label>
    </div>
  );
};

// Custom Label Component
const Label = ({ children, htmlFor }) => {
  return (
    <label 
      htmlFor={htmlFor} 
      className="text-sm font-medium text-gray-700"
    >
      {children}
    </label>
  );
};

const ColorCustomizationApp = () => {
  const [isCustomizationEnabled, setIsCustomizationEnabled] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [textColor, setTextColor] = useState('#000000');

  const handleCustomizationToggle = () => {
    setIsCustomizationEnabled(!isCustomizationEnabled);
  };

  const applyCustomStyles = () => {
    if (isCustomizationEnabled) {
      document.body.style.backgroundColor = backgroundColor;
      
      // Select all text-based elements
      const textElements = document.querySelectorAll('div, p, span, h1, h2, h3, h4, h5, h6, a, li, td, th, label, input, textarea, button, img');
      textElements.forEach(element => {
        (element as HTMLElement).style.color = textColor;
        
        // For images, we'll add an optional color overlay
        if (element.tagName === 'IMG') {
          (element as HTMLElement).style.filter = `brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(7500%) hue-rotate(${getHueRotationFromColor(textColor)}deg) brightness(100%) contrast(100%)`;
        }
      });
    } else {
      // Reset to default styles
      document.body.style.backgroundColor = '';
      
      const textElements = document.querySelectorAll('div, p, span, h1, h2, h3, h4, h5, h6, a, li, td, th, label, input, textarea, button, img');
      textElements.forEach(element => {
        (element as HTMLElement).style.color = '';
        if (element.tagName === 'IMG') {
          (element as HTMLElement).style.filter = '';
        }
      });
    }
  };

  // Helper function to convert color to hue rotation
  const getHueRotationFromColor = (color) => {
    const rgb = parseInt(color.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >>  8) & 0xff;
    const b = (rgb >>  0) & 0xff;
    
    const hsl = rgbToHsl(r, g, b);
    return hsl[0] * 360; // Convert hue to degrees
  };

  // Convert RGB to HSL
  const rgbToHsl = (r, g, b) => {
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return [h, s, l];
  };

  // Apply styles whenever customization is toggled or colors change
  React.useEffect(() => {
    applyCustomStyles();
  }, [isCustomizationEnabled, backgroundColor, textColor]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Color Customization</h2>
      
      <div className="flex items-center space-x-4 mb-4">
        <Label htmlFor="customization-toggle">Enable Customization</Label>
        <Switch
          id="customization-toggle"
          checked={isCustomizationEnabled}
          onCheckedChange={handleCustomizationToggle}
        />
      </div>
      
      {isCustomizationEnabled && (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Label htmlFor="background-color">Background Color</Label>
            <input
              id="background-color"
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="h-10 w-16"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <Label htmlFor="text-color">Text Color</Label>
            <input
              id="text-color"
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="h-10 w-16"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorCustomizationApp;