import React, { useState } from 'react'
import './Home.css'
import EyeBall from './EyeBall'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-container">

      <EyeBall className='w-20 cursor-pointer'/>
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
    </div>
  )
}

export default Home
