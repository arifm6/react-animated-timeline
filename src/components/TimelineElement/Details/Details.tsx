import React from "react";

import styles from "./Details.module.css";
import { Milestone } from "../../../types";
interface DetailsProps {
  milestone: Milestone;
}
export default function Details({ milestone }: DetailsProps) {
  return (
    <div className={styles.details}>
      <h3 className={styles.title}>{milestone.title}</h3>
      <p className={styles.description}>{milestone.description}</p>
    </div>
  );
}
