import "./TimelineElement.css";
import React from "react";
import { Milestone } from "./types";

interface TimelineElementProps {
  milestone: Milestone;
  timelineClassName?: string;
  buttonClassName?: string;
  dateClassName?: string;
}

export default function TimelineElement({
  milestone,
  timelineClassName = "",
  buttonClassName = "",
  dateClassName = "",
}: TimelineElementProps) {
  return (
    <div className="timeline-element-container">
      <div className={`timeline-track ${timelineClassName}`}></div>
      <div className={`timeline-button-parent`}>
        <div className="timeline-button-child"></div>
      </div>
      <div className={`timeline-track ${timelineClassName}`}></div>
    </div>
  );
}
