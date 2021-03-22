import React, { useState, useEffect } from 'react';

const useTimer = (length, callback = () => {}) => {
  const [startTime, setStartTime] = useState(new Date())
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    // We don't do anything if we've already re-rendered after we're done.
    if (elapsed >= length) {
      return
    }

    const interval = setInterval(() => {
      const newElapsed = Math.round((new Date() - startTime) / 1000)

      // Update only if a second has actually passed.
      if (newElapsed > elapsed) {
        setElapsed(newElapsed)

        // If our time is done we call our callback.
        if (newElapsed >= length) {
          callback()
        }
      }
    }, 250)

    return () => clearInterval(interval)
  })

  const restart = () => {
    setStartTime(new Date())
    setElapsed(0)
  }

  return [elapsed, restart]
}

export default useTimer