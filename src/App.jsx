import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './pages/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="min-h-screen w-full bg-[#0b0b0b] text-white">
      <Dashboard />
    </div>
    </>
  )
}

export default App
