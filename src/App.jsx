import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [elapsed, setElapsed] = useState(0)

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

  return (
    <div>
      <h1>{formatTime(elapsed)}</h1>
    </div>
  )
}

export default App
