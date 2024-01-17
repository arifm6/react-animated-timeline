import styles from "./Timeline.module.css";
import { useEffect, useState } from "react";
import { Milestone } from "../../types";
import { TimelineElement } from "../..";
import React from "react";

interface ResponsiveBreakpoint {
  minWidth: number;
  itemsPerView: number;
}

interface TimelineProps {
  milestones: Milestone[];
  itemsPerViewBreakpoints: ResponsiveBreakpoint[];
  width: string;
  height: string;
}

export default function Timeline({
  milestones,
  width,
  height,
  itemsPerViewBreakpoints,
}: TimelineProps) {
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
  const timelineElements = milestones.map((milestone, index) => (
    <div
      key={milestone.date + milestone.title}
      className={styles.timelineElement}
      style={{
        flexBasis: `${100 / itemsPerView}%`,
        transform: `translateX(-${currentIndex * 100}%)`,
      }}
    >
      <TimelineElement milestone={milestone} inverted={index % 2 === 1} />
    </div>
  ));

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

  return (
    <div className={styles.timelineContainer} style={{ width, height }}>
      <button onClick={handlePrev} className={styles.prevButton}>
        Prev
      </button>
      <div className={styles.timelineTrack}></div>
      {timelineElements}
      <button onClick={handleNext} className={styles.nextButton}>
        Next {currentIndex}
      </button>
    </div>
  );
}
