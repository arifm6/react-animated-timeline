import styles from "./Timeline.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { Milestone } from "../../types";
import { TimelineElement } from "../..";
import React from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface ResponsiveBreakpoint {
  minWidth: number;
  itemsPerView: number;
}

interface TimelineProps {
  milestones: Milestone[];
  itemsPerViewBreakpoints: ResponsiveBreakpoint[];
  width: string;
  height: string;
  animationSpeed?: number;
}

export default function Timeline({
  milestones,
  width,
  height,
  itemsPerViewBreakpoints,
  animationSpeed = 1,
}: TimelineProps) {
  const [currentFrame, setCurrentFrame] = useState(-1);
  const onAnimationComplete = useCallback(() => {
    setCurrentFrame((prevFrame) => {
      const nextFrame = prevFrame + 1;
      if (nextFrame < milestones.length) {
        return nextFrame;
      }
      return prevFrame;
    });
  }, [milestones]);

  const [currentIndex, setCurrentIndex] = useState(0);
  // add doc to suppress hydration warning on nextjs or about ssr mismatch
  const [itemsPerView, setItemsPerView] = useState(() => {
    if (typeof window !== "undefined") {
      const sortedBreakpoints = itemsPerViewBreakpoints.sort(
        (a, b) => b.minWidth - a.minWidth
      );
      const matchingBreakpoint = sortedBreakpoints.find(
        ({ minWidth }) =>
          window.matchMedia(`(min-width: ${minWidth}px)`).matches
      );
      return matchingBreakpoint ? matchingBreakpoint.itemsPerView : 1;
    } else {
      // Default value for SSR
      return 1;
    }
  });

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      let itemsPerView = 1;
      if (typeof window !== "undefined") {
        const windowWidth = window.innerWidth;
        const breakpoint = itemsPerViewBreakpoints
          .sort((a, b) => b.minWidth - a.minWidth)
          .find(({ minWidth }) => windowWidth >= minWidth);
        if (breakpoint) {
          itemsPerView = breakpoint.itemsPerView;
        }
      }
      return Math.min(prevIndex + 1, timelineElements.length - itemsPerView);
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  useEffect(() => {
    const sortedBreakpoints = itemsPerViewBreakpoints.sort(
      (a, b) => b.minWidth - a.minWidth
    );
    const mediaQueryLists = sortedBreakpoints.map(({ minWidth }) =>
      window.matchMedia(`(min-width: ${minWidth}px)`)
    );

    const updateItemsPerView = () => {
      setCurrentIndex(
        Math.min(currentIndex, timelineElements.length - itemsPerView)
      );

      for (let i = 0; i < mediaQueryLists.length; i++) {
        if (mediaQueryLists[i].matches) {
          setItemsPerView(sortedBreakpoints[i].itemsPerView);
          break;
        }
      }
    };

    updateItemsPerView();
    mediaQueryLists.forEach((mql) =>
      mql.addEventListener("change", updateItemsPerView)
    );

    return () => {
      mediaQueryLists.forEach((mql) =>
        mql.removeEventListener("change", updateItemsPerView)
      );
    };
  }, [itemsPerViewBreakpoints]);

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.6 });
  const lineControls = useAnimation();
  useEffect(() => {
    const startAnimation = async () => {
      lineControls.start({
        width: "100%",
        opacity: 1,
        flexBasis: `${100 / itemsPerView / 2}%`,
      });
    };
    if (isInView) {
      startAnimation();
      setTimeout(() => {
        onAnimationComplete();
      }, animationSpeed * 1000);
    }
  }, [isInView, lineControls, onAnimationComplete]);

  const timelineElements = milestones.map((milestone, index) => (
    <div
      key={milestone.date + milestone.title}
      className={styles.timelineElement}
      style={{
        flexBasis: `${100 / itemsPerView}%`,
        transform: `translateX(-${currentIndex * 100}%)`,
      }}
    >
      <TimelineElement
        milestone={milestone}
        inverted={index % 2 === 1}
        animate={index === currentFrame && isInView}
        onAnimationComplete={onAnimationComplete}
      />
    </div>
  ));

  return (
    <div
      ref={containerRef}
      className={styles.timelineContainer}
      style={{ width, height }}
    >
      <button onClick={handlePrev} className={styles.prevButton}>
        Prev
      </button>
      <motion.div
        className={styles.timelineTrack}
        initial={{ width: 0, opacity: 0, flexBasis: 0 }}
        animate={lineControls}
        transition={{ duration: animationSpeed }}
        // style={{ flexBasis: `${100 / itemsPerView / 2}%` }}
      ></motion.div>
      {timelineElements}
      <button onClick={handleNext} className={styles.nextButton}>
        Next {currentIndex}
      </button>
    </div>
  );
}
