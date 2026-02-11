import { useState, useEffect } from "react"

function App() {
  const [elapsed, setElapsed] = useState(() => {
    return Number(localStorage.getItem("elapsed")) || 0
  })

  const [isRunning, setIsRunning] = useState(() => {
    return localStorage.getItem("isRunning") === "true"
  })

  const [startTime, setStartTime] = useState(() => {
    const raw = localStorage.getItem("startTime")
    return raw === null || raw === "null" ? null : Number(raw)
  })

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000)
    const milliseconds = ms % 1000

    const totalMinutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    const totalHours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    const days = Math.floor(totalHours / 24)
    const hours = totalHours % 24

    const pad = (n, size = 2) => String(n).padStart(size, "0")
    const padMs = (n) => String(n).padStart(3, "0")

    return `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${padMs(milliseconds)}`
  }

  const start = () => {
    if (isRunning) return
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

    const id = setInterval(() => {
      setElapsed(Date.now() - startTime)
    }, 50)

    return () => clearInterval(id)
  }, [isRunning, startTime])

  useEffect(() => {
    if (isRunning && startTime !== null) {
      setElapsed(Date.now() - startTime)
    }
  }, []) // runs once

  useEffect(() => {
    localStorage.setItem("elapsed", elapsed)
    localStorage.setItem("isRunning", isRunning)
    localStorage.setItem("startTime", startTime)
  }, [elapsed, isRunning, startTime])

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