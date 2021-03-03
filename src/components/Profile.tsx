import { useContext, useEffect } from "react";
import { ChallengeContext } from "../contexts/ChallengeContext";
import styles from "../styles/components/Profile.module.css";

function Profile() {
  const { level } = useContext(ChallengeContext);

  useEffect(() => {
    if (level === 4) {
      alert("Parabéns seu level é 4");
    }
  }, [level]);
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/carlosrodrigues94.png" alt="Carlos Img" />
      <div>
        <strong>Carlos Rodrigues</strong>

        <p>
          <img src="icons/level.svg" alt="icon-level" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
export { Profile };
