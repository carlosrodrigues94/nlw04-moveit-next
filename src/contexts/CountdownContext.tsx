import { createContext, useContext, useEffect, useState } from "react";
import { ChallengeContext } from "./ChallengeContext";

interface CountdownContext {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

const CountdownContext = createContext<CountdownContext>(
  {} as CountdownContext
);

let countdownTimeout: NodeJS.Timeout;

const CountdownProvider: React.FC = ({ children }) => {
  const { startNewChallenge } = useContext(ChallengeContext);

  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  /** Aproach to down using math.floor */
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0.1 * 60);
    setHasFinished(false);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }

    if (isActive && time === 0) {
      setIsActive(false);
      setHasFinished(true);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountdown,
        resetCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
};

export { CountdownProvider, CountdownContext };
