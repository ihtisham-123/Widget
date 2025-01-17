// src/components/AccessibilityWidget/AccessibilityWidget.tsx
import React, { useState } from "react";
import { Eye } from "lucide-react";
import { FontSizeControl } from "./FontSizeControl";
import { ContrastControl } from "./ContrastControl";
import { TextSpacingControl } from "./TextSpacingControl";
import { useApplyAccessibility } from "../../hooks/useApplyAccessibility";
import { CursorControl } from "./CursorControl";
import { ScreenReaderControl } from "./ScreenReaderControl";
import KeyboardNavigationToggle from './KeyboardNavigationToggle';


export const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  useApplyAccessibility();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="Toggle Accessibility Menu"
        aria-expanded={isOpen}
      >
        <Eye className="h-6 w-6" />
      </button>

      {isOpen && (
        <div
          className="absolute bottom-16 right-0 w-72 bg-white rounded-lg shadow-xl p-4 space-y-6"
          role="dialog"
          aria-label="Accessibility Controls"
          style={{ maxHeight: "400px", overflowY: "auto" }}
        >
          <h2 className="text-lg font-semibold">Accessibility Settings</h2>
          <FontSizeControl />
          <ContrastControl />
          <TextSpacingControl />
          <CursorControl />
          <KeyboardNavigationToggle />
          {/* <ScreenReaderControl /> */}
        </div>
      )}
    </div>
  );
};
