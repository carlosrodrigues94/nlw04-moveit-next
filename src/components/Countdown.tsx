import { useContext } from "react";
import { CountdownContext } from "../contexts/CountdownContext";
import styles from "../styles/components/Countdown.module.css";

function Countdown() {
  const {
    minutes,
    seconds,
    resetCountdown,
    startCountdown,
    hasFinished,
    isActive,
  } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>

        <span>:</span>

        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>
      {hasFinished && (
        <button
          type="button"
          disabled
          onClick={resetCountdown}
          className={styles.countdownButton}
        >
          Ciclo encerrado
        </button>
      )}
      {isActive && !hasFinished && (
        <button
          type="button"
          onClick={resetCountdown}
          className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
        >
          Abandonar ciclo
        </button>
      )}
      {!isActive && !hasFinished && (
        <button
          type="button"
          onClick={startCountdown}
          className={styles.countdownButton}
        >
          Iniciar ciclo
        </button>
      )}
    </div>
  );
}

export { Countdown };
