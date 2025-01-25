import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, PauseCircle } from "lucide-react";

interface NavigableElement extends Element {
  textContent: string;
  value?: string;
  placeholder?: string;
  type?: string;
}

interface AccessibilitySettings {
  reducedMotion: boolean;
  keyboardNavigation: boolean;
  speechRate: number;
}

const KeyboardNavigationToggle = () => {
  // State management
  const [activeElementIndex, setActiveElementIndex] = useState<number>(-1);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [navigableElements, setNavigableElements] = useState<
    NavigableElement[]
  >([]);
  const [settings, setSettings] = useState<AccessibilitySettings>({
    reducedMotion: false,
    keyboardNavigation: false,
    speechRate: 1,
  });
  const [isNavigationActive, setIsNavigationActive] = useState<boolean>(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize navigable elements
  useEffect(() => {
    const elements = document.querySelectorAll<NavigableElement>(
      'p, h1, h2, h3, h4, h5, h6, a, button, input[type="text"], textarea'
    );
    setNavigableElements(Array.from(elements));
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isNavigationActive) return;

      switch (e.key) {
        case "ArrowDown":
        case "ArrowRight":
          e.preventDefault();
          setActiveElementIndex((prev) =>
            prev < navigableElements.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
        case "ArrowLeft":
          e.preventDefault();
          setActiveElementIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (activeElementIndex >= 0) {
            readElement(navigableElements[activeElementIndex]);
          }
          break;
        case "Escape":
          stopSpeaking();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isNavigationActive, activeElementIndex, navigableElements]);

  // Update focus and scroll
  useEffect(() => {
    if (
      isNavigationActive &&
      activeElementIndex >= 0 &&
      navigableElements[activeElementIndex]
    ) {
      const element = navigableElements[activeElementIndex];
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      element.classList.add("navigation-focus");

      navigableElements.forEach((el, index) => {
        if (index !== activeElementIndex) {
          el.classList.remove("navigation-focus");
        }
      });
    }
  }, [isNavigationActive, activeElementIndex, navigableElements]);

  // Handle motion reduction
  useEffect(() => {
    if (settings.reducedMotion) {
      document.body.classList.add("reduce-motion");
    } else {
      document.body.classList.remove("reduce-motion");
    }
  }, [settings.reducedMotion]);

  const readElement = (element: NavigableElement) => {
    if (isSpeaking) {
      stopSpeaking();
      return;
    }

    let textToRead = "";

    if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
      textToRead = element.placeholder || element.value || element.type || "";
    } else if (element.tagName === "A") {
      textToRead = `Link: ${element.textContent}`;
    } else if (element.tagName.match(/^H[1-6]$/)) {
      textToRead = `Heading: ${element.textContent}`;
    } else {
      textToRead = element.textContent;
    }

    utteranceRef.current = new SpeechSynthesisUtterance(textToRead);
    utteranceRef.current.rate = settings.speechRate;
    utteranceRef.current.onend = () => setIsSpeaking(false);
    utteranceRef.current.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utteranceRef.current);
    setIsSpeaking(true);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const toggleReducedMotion = () => {
    setSettings((prev) => ({
      ...prev,
      reducedMotion: !prev.reducedMotion,
    }));
  };

  const toggleScreenReader = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else if (activeElementIndex >= 0) {
      readElement(navigableElements[activeElementIndex]);
    }
  };

  const toggleNavigation = () => {
    setIsNavigationActive(!isNavigationActive);
    const message = isNavigationActive
      ? "Keyboard navigation disabled"
      : "Keyboard navigation enabled";
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <button
        onClick={toggleNavigation}
        className="px-4 py-2 rounded-md bg-blue-500 text-white mb-4"
      >
        {isNavigationActive ? "Disable Navigation" : "Enable Navigation"}
      </button>

      {/* Accessibility Controls */}
      <div className="top-4 right-4 z-50">
        <div className="flex items-center gap-2 p-4 bg-white border rounded-lg shadow-sm">
          <PauseCircle className="h-5 w-5 text-blue-500" />
          <div className="flex-1">
            <h3 className="font-medium">Reduced Motion</h3>
            <p className="text-sm text-gray-600">
              {settings.reducedMotion
                ? "Animations are reduced"
                : "Standard animations"}
            </p>
          </div>
          <button
            onClick={toggleReducedMotion}
            className={`
              px-4 py-2 rounded-md transition-colors
              ${
                settings.reducedMotion
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }
            `}
            aria-pressed={settings.reducedMotion}
          >
            {settings.reducedMotion ? "Enabled" : "Disabled"}
          </button>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="bg-white p-4 rounded-lg shadow-lg border z-50 mt-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {isSpeaking ? (
              <Volume2 className="w-5 h-5 text-blue-500" />
            ) : (
              <VolumeX className="w-5 h-5 text-gray-500" />
            )}
            <div className="flex-1">
              <h3 className="font-medium">Screen Reader</h3>
              <p className="text-sm text-gray-600">
                {isSpeaking
                  ? "Screen reader is active"
                  : "Screen reader is inactive"}
              </p>
            </div>
            <button
              onClick={toggleScreenReader}
              className={`
    px-4 py-2 rounded-md transition-colors
    ${
      isSpeaking
        ? "bg-blue-500 text-white"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }
  `}
              aria-pressed={isSpeaking}
            >
              {isSpeaking ? "Stop" : "Start"}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .navigation-focus {
          outline: 3px solid #2563eb !important;
          outline-offset: 2px;
          background-color: rgba(37, 99, 235, 0.1);
        }

        .reduce-motion * {
          transition: none !important;
          animation: none !important;
        }

        * {
          transition: all 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default KeyboardNavigationToggle;
