/* eslint-disable react/prop-types */
import styles from "./Button.module.css";

export function Button({ children, onClick, type }) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}
