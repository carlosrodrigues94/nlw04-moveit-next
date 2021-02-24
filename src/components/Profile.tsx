import styles from "../styles/components/Profile.module.css";

function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/carlosrodrigues94.png" alt="Carlos Img" />
      <div>
        <strong>Carlos Rodrigues</strong>

        <p>
          <img src="icons/level.svg" alt="icon-level" />
          Level 1
        </p>
      </div>
    </div>
  );
}
export { Profile };
