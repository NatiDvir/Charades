import React, { useState, useEffect } from 'react';
import './Timer.css';
import Button from "../Button/Button";

const Timer = ({ onTimeUp, isActive }) => {
  const [time, setTime] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(isActive);
  const [timer, setTimer] = useState(60);


  useEffect(() => {
    setIsTimerActive(isActive);
  }, [isActive]);

  useEffect(() => {
    let timerInterval;
    if (isTimerActive && time > 0) {
      timerInterval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsTimerActive(false);
      if (onTimeUp) {
        setTime(timer)
        onTimeUp();
      }
    }
    return () => clearInterval(timerInterval);
  }, [isTimerActive, time, onTimeUp]);

  const pauseTimer = () => setIsTimerActive(!isTimerActive);
  const resetTimer = () => {
    setTime(timer);
    setIsTimerActive(false);
  }

  const handleCustomTimerChange = (value) => {
    if (!isNaN(value) && value > 0) {
      setTime(Number(value));
      setTimer(Number(value));
      setIsTimerActive(false)
    }
  };

  return (
    <div className="timer-container">
      <div className="timer-header">Timer</div>
      <div className="timer-display">
        {time}s
      </div>
      <div className="timer-controls">
        <Button onClick={pauseTimer}>{isTimerActive ? 'Pause' : 'Play'}</Button>
        <Button onClick={resetTimer}>Reset</Button>
      </div>
      <div className="timer-input-container">
        <Button onClick={() => handleCustomTimerChange(30)}>30</Button>
        <Button onClick={() => handleCustomTimerChange(60)}>60</Button>
        <Button onClick={() => handleCustomTimerChange(120)}>120</Button>
        <Button onClick={() => handleCustomTimerChange(180)}>180</Button>

        <input
            value={timer}
            onFocus={(event) => event.target.select()}
            onChange={(e) => handleCustomTimerChange(e.target.value)}
            className="input"
            placeholder="Set Timer"
        />
      </div>
    </div>
  );
};

export default Timer;
