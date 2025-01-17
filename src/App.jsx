// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import Home from './Components/Home'
// import { Route, Routes } from "react-router-dom";
// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//     <Routes>

//       <Route path='/' element={<Home/>}/>
//     </Routes>
    
//     </>
//   )
// }

// export default App



// src/pages/_app.tsx or src/App.tsx
import { AccessibilityWidget } from './Components/AccessibiltyWidget/AccessibiltyWidget';
import './styles/accessibility.css';
import React, { useState } from 'react'

function App({ Component, pageProps }) {

  const [count, setCount] = useState(0)
  return (
    <>
      <header className="app-header">
        <h1 className="app-heading">Welcome to My React App</h1>
        <p className="app-paragraph">
          This is a simple page with a heading, paragraph, and buttons. You can click the button below to increment the counter.
        </p>
        
        <div className="button-container">
          <button className="increment-btn" onClick={() => setCount(count + 1)}>
            Increment Count
          </button>
          <button className="decrement-btn" onClick={() => setCount(count - 1)}>
            Decrement Count
          </button>
        </div>
        
        <p className="counter">Current Count: {count}</p>
      </header>
      <AccessibilityWidget />
    </>
  );
}

export default App;