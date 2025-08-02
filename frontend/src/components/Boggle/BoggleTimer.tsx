import React, { useEffect, useState, useRef } from "react";

type BoggleTimerProps = {
  /** The end time as a JavaScript timestamp (milliseconds since epoch) */
  endTimestamp: number | null;
  /** Optional callback when timer reaches zero */
  onComplete?: () => void;
  /** Optional initial duration in seconds (default: 180) */
  initialSeconds?: number;
  /** Optional style for the timer */
  style?: React.CSSProperties;
};

const pad = (n: number) => n.toString().padStart(2, "0");

export const BoggleTimer: React.FC<BoggleTimerProps> = ({ endTimestamp, onComplete, initialSeconds = 180, style }) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const clearTimerInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else {
    }
  }

  const getRemaining = () => {
    if (!endTimestamp) {
      // Show initial duration, don't run timer
      const minutes = Math.floor(initialSeconds / 60);
      const seconds = initialSeconds % 60;
      return { minutes, seconds, done: false };
    }
    const now = Date.now();
    const diff = Math.max(0, Math.floor((endTimestamp - now) / 1000));
    const done = diff === 0;
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;

    return { minutes, seconds, done };
  };

  const [remaining, setRemaining] = useState(getRemaining());

  useEffect(() => {
    // Always update remaining immediately when endTimestamp changes
    setRemaining(getRemaining());

    clearTimerInterval();

    if (!endTimestamp) {
      // No timestamp, don't run timer
      return;
    }

    // Set interval to update timer every second
    intervalRef.current = setInterval(() => {
      setRemaining(getRemaining());
    }, 1000);

    return () => {
      // Cleanup interval on unmount
      clearTimerInterval();
    };
    // Only depend on endTimestamp
  }, [endTimestamp]);

  // If the timer is done, clear the interval
  useEffect(() => {
    if (remaining.done) {
      onComplete?.();
      clearTimerInterval();
    }
  }, [remaining.done]);

  return (
    <h2 style={style}>
      {pad(remaining.minutes)}:{pad(remaining.seconds)}
    </h2>
  );
};

export default BoggleTimer;