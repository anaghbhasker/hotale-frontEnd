import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function CountdownTimer() {
    const navigate=useNavigate()
    const [secondsRemaining, setSecondsRemaining] = useState(240);

  useEffect(() => {
    if (secondsRemaining > 0) {
      const intervalId = setInterval(() => {
        setSecondsRemaining(prevSeconds => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [secondsRemaining]);
  return (
    <>
        {secondsRemaining > 0
        ? `:${Math.floor(secondsRemaining / 60)}:${(secondsRemaining % 60)
            .toString()
            .padStart(2, '0')}`
        : navigate('/')}
    </>
  )
}

export default CountdownTimer