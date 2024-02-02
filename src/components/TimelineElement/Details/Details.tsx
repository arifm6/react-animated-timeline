import React, { useContext } from "react";

import styles from "./Details.module.css";
import { Milestone } from "../../../types";
import { TimelineContext } from "../../Timeline/Timeline";
interface DetailsProps {
  milestone: Milestone;
}
export default function Details({ milestone }: DetailsProps) {
  const context = useContext(TimelineContext);
  const { detailsTitleClass, detailsDescriptionClass } = context; // Pull out specific data
  return (
    <div className={styles.details}>
      <h3 className={`${styles.title} ${detailsTitleClass}`}>
        {milestone.title}
      </h3>
      <p className={`${styles.description} ${detailsDescriptionClass}`}>
        {milestone.description}
      </p>
    </div>
  );
}
