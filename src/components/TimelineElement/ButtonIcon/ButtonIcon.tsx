import React from "react";
import styles from "./ButtonIcon.module.css";

interface ButtonIconProps {
  buttonIcon?: React.ReactNode;
}
const ButtonIcon = ({ buttonIcon }: ButtonIconProps) => (
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

export default ButtonIcon;
