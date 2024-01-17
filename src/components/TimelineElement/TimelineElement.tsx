import React from "react";
import { Milestone } from "../../types";
import styles from "./TimelineElement.module.css";
import ButtonIcon from "./ButtonIcon/ButtonIcon";
import Details from "./Details/Details";

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
        <Details milestone={milestone} />
        <div className={styles.branch}>
          <div className={styles.branchPoint}></div>
          <div className={styles.branchLine}></div>
        </div>
      </div>

      <ButtonIcon />
      <div>
        <div className={styles.dateInverted}>{milestone.date}</div>
      </div>
    </div>
  ) : (
    <div className={styles.container}>
      <div>
        <div className={styles.date}>{milestone.date}</div>
      </div>
      <ButtonIcon buttonIcon={buttonIcon} />
      <div className={styles.descriptionSection}>
        <div className={styles.branch}>
          <div className={styles.branchLine}></div>

          <div className={styles.branchPoint}></div>
        </div>
        <Details milestone={milestone} />
      </div>
    </div>
  );
}
