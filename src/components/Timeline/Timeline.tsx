/** @jsxImportSource @emotion/react */
import "./Timeline.css";
import React, { useState } from "react";
import { Milestone } from "../../types";
import { TimelineElement } from "../..";
import { css } from "@emotion/react";
interface ResponsiveBreakpoint {
  [key: string]: number;
}
interface TimelineProps {
  milestones: Milestone[];
  itemsPerView: number;
  //q: how do I make the below an array of key value pairs where the value is a number?
  // a: https://stackoverflow.com/questions/43159887/typescript-array-of-objects-with-key-and-value
  responsiveBreakpoints?: ResponsiveBreakpoint;
  width: string;
  height: string;
}
export default function Timeline({
  milestones,
  width,
  height,
  itemsPerView,
}: TimelineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const timelineElements = milestones.map((milestone, index) => {
    return (
      <div
        key={milestone.date + milestone.title}
        style={{
          flexBasis: `${100 / itemsPerView}%`,
          flexGrow: 1,
          flexShrink: 0,
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: "transform 0.5s ease-in-out",
        }}
      >
        <TimelineElement milestone={milestone} inverted={index % 2 === 0} />
        {/* <div className="timeline-track"></div> */}
      </div>
    );
  });

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerView, timelineElements.length - 1)
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerView, 0));
  };

  return (
    <div
      className="timeline-container"
      style={{
        width: width,
        height: height,
        // transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
        // transition: "transform 0.5s ease-in-out",
      }}
    >
      <button
        onClick={handlePrev}
        style={{ position: "fixed", bottom: "1/3", left: "5%", zIndex: 1000 }}
      >
        Prev
      </button>

      <div className="timeline-track"></div>
      {timelineElements}
      <button
        onClick={handleNext}
        style={{ position: "fixed", bottom: "1/3", right: "5%" }}
      >
        Next {currentIndex}
      </button>
      {/* {currentIndex} */}
    </div>
  );
}
