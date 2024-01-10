import "./TimelineElement.css";
import React from "react";
import { Milestone } from "./types";

interface BaseProps {
  milestone: Milestone;
  timelineTrackClassName?: string;
  // timelineButtonParentClassName?: string;
  // timelineButtonChildClassName?: string;
  dateClassName?: string;
  inverted?: boolean;
  // buttonIcon?: React.ReactNode;
}

// You can either have a buttonIcon or a timelineButtonParentClassName and timelineButtonChildClassName but not both because the buttonIcon overrides the other two
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
  timelineTrackClassName = "",
  timelineButtonParentClassName = "",
  timelineButtonChildClassName = "",
  dateClassName = "",
  buttonIcon = null,
  inverted = false,
}: TimelineElementProps) {
  return (
    <div className="timeline-element-container">
      {/* <div className={`timeline-track ${timelineTrackClassName}`}></div> */}
      <div className="timeline-element-date">
        {milestone.date +
          `${milestone.endDate ? `+ ${milestone.endDate}` : ""}`}
      </div>
      <div>
        {buttonIcon ? (
          buttonIcon
        ) : (
          <div
            className={`timeline-element-button-parent ${timelineButtonParentClassName}`}
          >
            <div
              className={`timeline-element-button-child ${timelineButtonChildClassName}`}
            ></div>
          </div>
        )}
      </div>
      <div className="timeline-element-details">{milestone.title}</div>
      {/* <div className={`timeline-track ${timelineTrackClassName}`}></div> */}
    </div>
  );
}
