import "../src/TimelineElement.css";

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import TimelineElement from "./TimelineElement";
import { Milestone } from "./types";

const meta: Meta<typeof TimelineElement> = {
  title: "Components/TimelineElement",
  component: TimelineElement,
};

type Story = StoryObj<typeof TimelineElement>;
// q: copilot, generate some data of type Milestone[] for us. Include optional fields in some of them

const milestoneData: Milestone = {
  date: "2021-01-01",
  title: "First milestone",
  description: "This is the first milestone",
};

export const Primary: Story = {
  args: {
    milestone: milestoneData,

    // label: "Primary 😃",
    // size: "large",
    // type: "primary",
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    // type: "secondary",
    // label: "Secondary 😇",
  },
};

export default meta;
