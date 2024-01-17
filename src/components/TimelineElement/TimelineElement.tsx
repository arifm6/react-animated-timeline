import React from "react";
import { Milestone } from "../../types";
import styles from "./TimelineElement.module.css";

interface BaseProps {
  milestone: Milestone;
  timelineTrackClassName?: string;
  dateClassName?: string;
  inverted?: boolean;
  buttonIcon?: React.ReactNode;
}

interface buttonIconProps extends BaseProps {
  buttonIcon: React.ReactNode;
  timelineButtonParentClassName?: never;
  timelineButtonChildClassName?: never;
}

interface timelineButtonClassNameProps extends BaseProps {
  buttonIcon?: never;
  timelineButtonParentClassName?: string;
  timelineButtonChildClassName?: string;
}

type TimelineElementProps = buttonIconProps | timelineButtonClassNameProps;

export default function TimelineElement({
  milestone,
  buttonIcon = null,
  inverted = false,
}: TimelineElementProps) {
  return inverted ? (
    <div className={styles.container}>
      <div className={styles.descriptionSectionInverted}>
        <div className={styles.details}>
          <div className={styles.title}>{milestone.title}</div>
          <div className={styles.description}>{milestone.description}</div>
        </div>
        <div className={styles.branch}>
          <div className={styles.branchPoint}></div>
          <div className={styles.branchLine}></div>
        </div>
      </div>

      <div>
        {buttonIcon ? (
          buttonIcon
        ) : (
          <div className={styles.buttonParent}>
            <div className={styles.buttonChild}></div>
          </div>
        )}
      </div>

      <div>
        <div className={styles.dateInverted}>{milestone.date}</div>
      </div>
    </div>
  ) : (
    <div className={styles.container}>
      <div>
        <div className={styles.date}>{milestone.date}</div>
      </div>

      <div>
        {buttonIcon ? (
          buttonIcon
        ) : (
          <div className={styles.buttonParent}>
            <div className={styles.buttonChild}></div>
          </div>
        )}
      </div>
      <div className={styles.descriptionSection}>
        <div className={styles.branch}>
          <div className={styles.branchLine}></div>

          <div className={styles.branchPoint}></div>
        </div>

        <div className={styles.details}>
          <div className={styles.title}>{milestone.title}</div>
          <div className={styles.description}>{milestone.description}</div>
        </div>
      </div>
    </div>
  );
}
