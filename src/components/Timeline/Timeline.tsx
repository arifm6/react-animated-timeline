import "./Timeline.css";
import React, { useEffect, useRef } from "react";
import { Milestone } from "../../types";
import { TimelineElement } from "../..";

interface TimelineProps {
  milestones: Milestone[];
}
export default function Timeline({ milestones }: TimelineProps) {
  return (
    <div className="timeline-container">
      <div className="timeline-track"></div>
      {milestones.map((milestone, index) => {
        return (
          <>
            <div key={milestone.date + milestone.title}>
              <TimelineElement
                milestone={milestone}
                inverted={index % 2 === 0}
              />
            </div>
            <div className="timeline-track"></div>
          </>
        );
      })}
    </div>
  );
}
