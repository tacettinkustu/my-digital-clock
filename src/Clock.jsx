import React, { useState, useEffect } from 'react';
import './Clock.css'; // CSS dosyasında segment stillerini tanımlayacağız.

const segmentsMap = {
  0: ['a', 'b', 'c', 'd', 'e', 'f'],
  1: ['b', 'c'],
  2: ['a', 'b', 'g', 'e', 'd'],
  3: ['a', 'b', 'g', 'c', 'd'],
  4: ['f', 'g', 'b', 'c'],
  5: ['a', 'f', 'g', 'c', 'd'],
  6: ['a', 'f', 'g', 'c', 'd', 'e'],
  7: ['a', 'b', 'c'],
  8: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  9: ['a', 'b', 'c', 'd', 'f', 'g'],
};

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getFormattedTime = () => {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const renderDigit = (digit) => {
    const activeSegments = segmentsMap[digit];
    return (
      <div className="digit">
        {['a', 'b', 'c', 'd', 'e', 'f', 'g'].map((segment) => (
          <div
            key={segment}
            className={`segment ${segment} ${
              activeSegments.includes(segment) ? 'active' : ''
            }`}
          ></div>
        ))}
      </div>
    );
  };

  const formattedTime = getFormattedTime();

  return (
    <div className="digital-clock">
      {formattedTime.split('').map((char, index) => (
        char === ':' ? <div key={index} className="colon">:</div> : renderDigit(parseInt(char, 10))
      ))}
    </div>
  );
};

export default Clock;