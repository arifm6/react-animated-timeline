/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { Milestone } from "../../types";
import { TimelineElement } from "../..";
import { css } from "@emotion/react";

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

const styles = {
  timelineContainer: (width = "100%", height = "100%") => css`
    display: flex;
    align-items: center;
    width: ${width};
    height: ${height};
    position: relative;
    overflow-x: hidden;
  `,
  timelineTrack: css`
    flex-grow: 1;
    height: 1px;
    background-color: #3d5af1;
    position: absolute;
    left: 0;
    right: 0;
  `,
  timelineElement: (
    itemsPerViewBreakpoints: ResponsiveBreakpoint[],
    currentIndex: number
  ) => css`
    flex-grow: 1;
    flex-shrink: 0;
    transition: transform 0.5s ease-in-out;

    ${itemsPerViewBreakpoints
      .sort((a, b) => a.minWidth - b.minWidth)
      .map(
        ({ minWidth, itemsPerView }) => css`
          @media (min-width: ${minWidth}px) {
            flex-basis: ${100 / itemsPerView}%;
            transform: translateX(-${currentIndex * 100}%);
          }
        `
      )}
  `,
  prevButton: css`
    position: fixed;
    bottom: 1/3;
    left: 5%;
    z-index: 1000;
  `,
  nextButton: css`
    position: fixed;
    bottom: 1/3;
    right: 5%;
  `,
};

export default function Timeline({
  milestones,
  width,
  height,
  itemsPerViewBreakpoints,
}: TimelineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const timelineElements = milestones.map((milestone, index) => (
    <div
      key={milestone.date + milestone.title}
      css={styles.timelineElement(itemsPerViewBreakpoints, currentIndex)}
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

  return (
    <div css={styles.timelineContainer(width, height)}>
      <button onClick={handlePrev} css={styles.prevButton}>
        Prev
      </button>
      <div css={styles.timelineTrack}></div>
      {timelineElements}
      <button onClick={handleNext} css={styles.nextButton}>
        Next {currentIndex}
      </button>
    </div>
  );
}
