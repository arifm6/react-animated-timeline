/** @jsxImportSource @emotion/react */
// import styl from "./TimelineElement.module.css";
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

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
  `,
  descriptionSection: css`
    position: absolute;
    top: 100%;
  `,
  descriptionSectionInverted: css`
    position: absolute;
    bottom: 100%;
  `,
  date: css`
    position: absolute;
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 800;
    color: #3d5af1;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    white-space: nowrap;
    transform: translateX(-50%);
    bottom: 100%;
  `,
  dateInverted: css`
    position: absolute;
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 800;
    color: #3d5af1;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    white-space: nowrap;
    transform: translateX(-50%);
    top: 100%;
  `,

  buttonParent: css`
    background-color: white;
    border: 2px solid #22d1ee;
    border-radius: 100%;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  buttonChild: css`
    background-color: #22d1ee;
    border-radius: 100%;
    width: 16px;
    height: 16px;
  `,
  branch: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  `,
  branchLine: css`
    background-color: #dcdcdc;
    height: 3.5rem;
    width: 1px;
  `,
  branchPoint: css`
    background-color: #dcdcdc;
    border-radius: 100%;
    width: 8px;
    height: 8px;
  `,
  details: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
  `,
  title: css`
    font-size: 0.875rem;
    line-height: 1.25rem;
    @media (min-width: 640px) {
      font-size: 1rem;
      line-height: 1.5rem;
    }
  `,
  description: css`
    font-size: 0.75rem;
    line-height: 1rem;
    color: #343434;
    @media (min-width: 640px) {
      font-size: 0.875rem;
      line-height: 1.25rem;
    }
  `,
};

export default function TimelineElement({
  milestone,
  buttonIcon = null,
  inverted = false,
}: TimelineElementProps) {
  return inverted ? (
    <div css={styles.container}>
      <div css={styles.descriptionSectionInverted}>
        <div css={styles.details}>
          <div css={styles.title}>{milestone.title}</div>
          <div css={styles.description}>{milestone.description}</div>
        </div>
        <div css={styles.branch}>
          <div css={styles.branchPoint}></div>
          <div css={styles.branchLine}></div>
        </div>
      </div>

      <div>
        {buttonIcon ? (
          buttonIcon
        ) : (
          <div css={styles.buttonParent}>
            <div css={styles.buttonChild}></div>
          </div>
        )}
      </div>

      <div>
        <div css={styles.dateInverted}>{milestone.date}</div>
      </div>
    </div>
  ) : (
    <div css={styles.container}>
      <div>
        <div css={styles.date}>{milestone.date}</div>
      </div>

      <div>
        {buttonIcon ? (
          buttonIcon
        ) : (
          <div css={styles.buttonParent}>
            <div css={styles.buttonChild}></div>
          </div>
        )}
      </div>
      <div css={styles.descriptionSection}>
        <div css={styles.branch}>
          <div css={styles.branchLine}></div>

          <div css={styles.branchPoint}></div>
        </div>

        <div css={styles.details}>
          <div css={styles.title}>{milestone.title}</div>
          <div css={styles.description}>{milestone.description}</div>
        </div>
      </div>
    </div>
  );
}
