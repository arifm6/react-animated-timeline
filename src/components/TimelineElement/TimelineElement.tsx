import React, { useContext, useEffect } from "react";
import styles from "./TimelineElement.module.css";
import ButtonIcon from "./ButtonIcon/ButtonIcon";
import Details from "./Details/Details";
import { motion, useAnimation } from "framer-motion";
import { Milestone } from "../../types";
import { TimelineContext } from "../Timeline/TimelineContext";

export interface TimelineElementProps {
  milestone: Milestone;
  inverted?: boolean;
  animate: boolean;
  onAnimationComplete: () => void;
  animationSpeed?: number;
}

export default function TimelineElement({
  milestone,
  inverted = false,
  animate,
  onAnimationComplete,
  animationSpeed = 1,
}: TimelineElementProps) {
  const context = useContext(TimelineContext);

  const {
    dateClass,
    trackClass,
    branchContainerClass,
    branchLineClass,
    branchPointClass,
  } = context; // Pull out specific data
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
          <div className={`${styles.branch} ${branchContainerClass}`}>
            <Details milestone={milestone} />

            <div className={`${styles.branchPoint} ${branchPointClass}`}></div>

            <div className={`${styles.branchLine} ${branchLineClass}`}></div>
          </div>
        </motion.div>

        <ButtonIcon />
        <div>
          <div className={`${styles.dateInverted} ${dateClass}`}>
            {milestone.date}
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={rightLineControls}
        transition={{ duration: animationSpeed }}
        className={`${styles.timelineTrack} ${trackClass} `}
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
          <div className={`${styles.date} ${dateClass}`}>{milestone.date}</div>
        </div>
        <ButtonIcon />
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
          <div className={`${styles.branch} ${branchContainerClass}`}>
            <div className={`${styles.branchLine} ${branchLineClass}`}></div>

            <div className={`${styles.branchPoint} ${branchPointClass}`}></div>
          </div>
          <Details milestone={milestone} />
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={rightLineControls}
        transition={{ duration: animationSpeed }}
        className={`${styles.timelineTrack} ${trackClass}`}
      ></motion.div>
    </div>
  );
}
