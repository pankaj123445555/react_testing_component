import { useEffect, useState } from 'react';
import styles from './stopWatch.module.css';

const StopWatch = () => {
  const [watch, setWatch] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [intervalId, setIntervalId] = useState<ReturnType<
    typeof setInterval
  > | null>(null);

  const handleClick = () => {
    const id = setInterval(() => {
      setWatch(prev => {
        const obj = {
          hours: prev.hours,
          minutes: prev.minutes,
          seconds: prev.seconds,
        };
        if (prev.seconds == 59) {
          obj.seconds = 0;
          if (obj.minutes == 59) {
            obj.minutes = 0;
            obj.hours = obj.hours + 1;
          } else {
            obj.minutes = obj.minutes + 1;
          }
        } else {
          obj.seconds = obj.seconds + 1;
        }
        return obj;
      });
    }, 1000);
    setIntervalId(id);
  };

  const handleStop = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const handleReset = () => {
    setWatch({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
    handleStop();
  };

  return (
    <div className={styles['container']}>
      <h1 className={styles['title']}>Stop Watch Component</h1>
      {/* Stop watch implementation goes here */}
      <div className={styles['time-display']}>
        <span className={styles['time-value']}>
          {watch.hours.toString().padStart(2, '0')}
        </span>
        <span className={styles['separator']}>:</span>
        <span className={styles['time-value']}>
          {watch.minutes.toString().padStart(2, '0')}
        </span>
        <span className={styles['separator']}>:</span>
        <span className={styles['time-value']}>
          {watch.seconds.toString().padStart(2, '0')}
        </span>
      </div>
      <div className={styles['button-group']}>
        <button className={styles['start-btn']} onClick={() => handleClick()}>
          Start
        </button>
        <button className={styles['stop-btn']} onClick={() => handleStop()}>
          Stop
        </button>
        <button className={styles['reset-btn']} onClick={() => handleReset()}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default StopWatch;
