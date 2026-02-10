import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [elapsed, setElapsed] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [startTime, setStartTime] = useState(null)

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000)
    const milliseconds = ms % 1000

    const totalMinutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    const totalHours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    const days = Math.floor(totalHours / 24)
    const hours = totalHours % 24

    const pad = (num, size = 2) => String(num).padStart(size, "0")
    const padMs = (num) => String(num).padStart(3, "0")

    return `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${padMs(milliseconds)}`
  }

  const start = () => {
    setStartTime(Date.now() - elapsed)
    setIsRunning(true)
  }
  
  const pause = () => setIsRunning(false)
  const reset = () => {
    setIsRunning(false)
    setElapsed(0)
    setStartTime(null)
  }

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setElapsed(Date.now() - startTime)
    }, 50)

    return () => clearInterval(interval)
    
  }, [isRunning, startTime])

  return (
    <div>
      <h1>{formatTime(elapsed)}</h1>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

export default App
