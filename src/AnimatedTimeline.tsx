import React from "react";
import { Milestone } from "./types";

interface AnimatedTimelineProps {
  milestones: Milestone[];
}
export default function AnimatedTimeline({
  milestones,
}: AnimatedTimelineProps) {
  return (
    <div>
      {milestones.map((milestone) => {
        return <div key={milestone.date}>{milestone.title}</div>;
      })}
    </div>
  );
}
