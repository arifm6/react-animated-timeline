/** @jsxImportSource @emotion/react */

import "./TimelineElement.css";
import React from "react";
import { Milestone } from "../../types";
import { css } from "@emotion/react";
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
  return inverted ? (
    <div className="timeline-element-container">
      <div
        className="timeline-element-description-section"
        style={{ bottom: "100%" }}
      >
        <div className="timeline-element-details">
          <div className="timeline-element-title">{milestone.title}</div>
          <div className="timeline-element-description">
            {milestone.description}
          </div>
        </div>
        <div className="timeline-element-branch">
          <div className="timeline-element-branch-point"></div>
          <div className="timeline-element-branch-line"></div>
        </div>
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

      <div>
        <div className="timeline-element-date">{milestone.date}</div>
      </div>
    </div>
  ) : (
    <div className="timeline-element-container">
      <div>
        <div className="timeline-element-date" style={{ bottom: "100%" }}>
          {milestone.date}
        </div>
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
      <div
        className="timeline-element-description-section"
        style={{ top: "100%" }}
      >
        <div className="timeline-element-branch">
          <div className="timeline-element-branch-line"></div>

          <div className="timeline-element-branch-point"></div>
        </div>

        <div className="timeline-element-details">
          <div className="timeline-element-title">{milestone.title}</div>
          <div className="timeline-element-description">
            {milestone.description}
          </div>
        </div>
      </div>
    </div>
  );
}
