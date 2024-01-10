import React from "react";
import { Milestone } from "./types";

interface TimelineProps {
  milestones: Milestone[];
}
export default function Timeline({ milestones }: TimelineProps) {
  return (
    <div>
      {milestones.map((milestone) => {
        return <div key={milestone.date}>{milestone.title}</div>;
      })}
    </div>
  );
}
