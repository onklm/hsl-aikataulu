import React, { useEffect, useState } from 'react';

export function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  }, []);

  function tick() {
    setTime(new Date());
  }

  return (
    <div className="m-2 p-2 bg-white text-black rounded shadow-lg text-4xl">
      {time.toLocaleTimeString('fi-FI', {
        hour: '2-digit',
        minute: '2-digit',
      })}
    </div>
  );
}
