import React, { useEffect } from "react";
import { Milestone } from "../../types";
import styles from "./TimelineElement.module.css";
import ButtonIcon from "./ButtonIcon/ButtonIcon";
import Details from "./Details/Details";
import { motion, useAnimation } from "framer-motion";

interface BaseProps {
  milestone: Milestone;
  timelineTrackClassName?: string;
  dateClassName?: string;
  inverted?: boolean;
  buttonIcon?: React.ReactNode;
  animate: boolean;
  onAnimationComplete: () => void;
  animationSpeed?: number;
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
  animate,
  onAnimationComplete,
  animationSpeed = 1,
}: TimelineElementProps) {
  const leftLineControls = useAnimation();
  const dateAndButtonControls = useAnimation();
  const milestoneDescriptionControls = useAnimation();
  const rightLineControls = useAnimation();
  useEffect(() => {
    const animateSection = async () => {
      // Your animation logic for the first element
      // await leftLineControls.start({ width: "100%" });

      // Animation for the date elements
      await dateAndButtonControls.start({ opacity: 1 });

      //Animation for Milestone Description Section
      await milestoneDescriptionControls.start("visible");
      await rightLineControls.start({ width: "100%", opacity: 1 });

      // Animation for the next element, and so on...
      // You can add more animations here

      // Repeat the process for other animations

      // Callback to notify the parent that animation is complete
      onAnimationComplete();
    };

    if (animate) {
      animateSection();
    }
  }, [
    animate,
    dateAndButtonControls,
    leftLineControls,
    milestoneDescriptionControls,
    onAnimationComplete,
    rightLineControls,
  ]);

  return inverted ? (
    <div className={styles.container}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={dateAndButtonControls}
        className={styles.buttonAndDateContainer}
        transition={{ duration: animationSpeed }}
      >
        <motion.div
          initial="hidden"
          animate={milestoneDescriptionControls}
          variants={{
            hidden: {
              y: "10px",
              opacity: 0,
            },
            visible: {
              y: "0px",
              opacity: 1,
            },
          }}
          transition={{ duration: animationSpeed }}
          className={styles.descriptionSectionInverted}
        >
          <div className={styles.branch}>
            <Details milestone={milestone} />

            <div className={styles.branchPoint}></div>

            <div className={styles.branchLine}></div>
          </div>
        </motion.div>

        <ButtonIcon buttonIcon={buttonIcon} />
        <div>
          <div className={styles.dateInverted}>{milestone.date}</div>
        </div>
      </motion.div>
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={rightLineControls}
        transition={{ duration: animationSpeed }}
        className={styles.timelineTrack}
      ></motion.div>
    </div>
  ) : (
    <div className={styles.container}>
      {/* <div className={styles.timelineTrack}></div> */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={dateAndButtonControls}
        className={styles.buttonAndDateContainer}
        transition={{ duration: animationSpeed }}
      >
        <div>
          <div className={styles.date}>{milestone.date}</div>
        </div>
        <ButtonIcon buttonIcon={buttonIcon} />
        <motion.div
          initial="hidden"
          animate={milestoneDescriptionControls}
          variants={{
            hidden: {
              y: "-10px",
              opacity: 0,
            },
            visible: {
              y: "0px",
              opacity: 1,
            },
          }}
          transition={{ duration: animationSpeed }}
          className={styles.descriptionSection}
        >
          <div className={styles.branch}>
            <div className={styles.branchLine}></div>

            <div className={styles.branchPoint}></div>
          </div>
          <Details milestone={milestone} />
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={rightLineControls}
        transition={{ duration: animationSpeed }}
        className={styles.timelineTrack}
      ></motion.div>
    </div>
  );
}
