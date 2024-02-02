import React, { useContext } from "react";
import styles from "./ButtonIcon.module.css";
import { TimelineContext } from "../../Timeline/Timeline";

const ButtonIcon = () => {
  const context = useContext(TimelineContext);
  const { buttonIcon } = context; // Pull out specific data
  return (
    <div>
      {buttonIcon ? (
        buttonIcon
      ) : (
        <div className={styles.buttonParent}>
          <div className={styles.buttonChild}></div>
        </div>
      )}
    </div>
  );
};

export default ButtonIcon;
