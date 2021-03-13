import React from "react";

import styles from "./ButtonWithIcon.module.css";

const ButtonWithIcon = ({
  children,
  onClick,
  "data-testid": testId,
  "aria-label": ariaLabel,
}) => {
  return (
    <button
      data-testid={testId}
      className={styles.ButtonWithIcon}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <span className={styles.icon}>{children}</span>
    </button>
  );
};

export default ButtonWithIcon;
