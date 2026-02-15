import { useState } from "react";
import styles from "./button.module.css";

const MAX_VALUE = 5;

const ButtonComponent = () => {
  const [value, setValue] = useState(0);

  const decrement = () => {
    setValue((prev) => Math.max(0, prev - 1));  
  };

  const increment = () => {
    setValue((prev) => prev + 1);
  };

  return (
   <div
  className={`${styles["btn-cnt"]} ${
    value === MAX_VALUE ? styles["disable-btn"] : ""
  }`}>
      <button className={styles.btn} onClick={decrement}>
        -
      </button>
      <span className={styles.value}>{value}</span>
      <button className={styles.btn} onClick={increment}>
        +
      </button>
    </div>
  );
};

export default ButtonComponent;
