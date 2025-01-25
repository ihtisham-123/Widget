
import { AccessibilityWidget } from "./Components/AccessibiltyWidget/AccessibiltyWidget";
import "./styles/accessibility.css";
import React, { useState } from "react";

function App({ Component, pageProps }) {
  const [count, setCount] = useState(0);
  return (
    <>
      <div className="app-container">
        {/* <EyeBall className="w-20 cursor-pointer" /> */}
        <header className="app-header">
          <h1 className="app-heading">Welcome to My React App</h1>
          <p className="app-paragraph">
            This is a simple page with a heading, paragraph, and buttons. You
            can click the button below to increment the counter.
          </p>

          <div className="button-container">
            <button
              className="increment-btn"
              onClick={() => setCount(count + 1)}
            >
              Increment Count
            </button>
            <button
              className="decrement-btn"
              onClick={() => setCount(count - 1)}
            >
              Decrement Count
            </button>
          </div>

          <p className="counter">Current Count: {count}</p>
        </header>
      </div>

      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6">Accessibility Test Page</h1>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Test Instructions</h2>
            <div className="bg-blue-50 p-4 rounded-lg">
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  Click the eye icon in the bottom right to open accessibility
                  menu
                </li>
                <li>Enable keyboard navigation using the toggle button</li>
                <li>Use Tab to move between controls</li>
                <li>
                  Use arrow keys to adjust values when focused on a control
                </li>
                <li>Notice the audio feedback as you navigate</li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Sample Text Content</h2>
            <p className="mb-4">
              This is a sample paragraph to test text spacing controls. You can
              adjust the letter spacing, word spacing, and line height to see
              how it affects this text. The quick brown fox jumps over the lazy
              dog.
            </p>
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Interactive Elements
            </h2>
            <div className="space-y-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded">
                Test Button 1
              </button>
              <button className="px-4 py-2 bg-green-500 text-white rounded">
                Test Button 2
              </button>
              <a href="#" className="text-blue-600 underline">
                Test Link
              </a>
            </div>
          </section>
        </div>

        
      </div>
      <AccessibilityWidget />
    </>
  );
}

export default App;
