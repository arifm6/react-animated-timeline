import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Timeline from "./Timeline";
import { Milestone } from "../../types";

const meta: Meta<typeof Timeline> = {
  title: "Components/Timeline",
  component: Timeline,
  parameters: {
    layout: "fullscreen",
  },
};

type Story = StoryObj<typeof Timeline>;
// q: copilot, generate some data of type Milestone[] for us. Include optional fields in some of them

const timelineData: Milestone[] = [
  {
    date: "2021-01-01",
    title: "First milestone",
    description: "This is the first milestone",
  },
  {
    date: "2021-02-01",
    title: "Second milestone",
    description: "This is the second milestone",
  },
  {
    date: "2021-03-01",
    title: "Third milestone",
    description: "This is the third milestone",
  },
  {
    date: "2021-04-01",
    title: "Fourth milestone",
    description: "This is the fourth milestone",
  },
];
export const Primary: Story = {
  args: {
    milestones: timelineData,
    itemsPerViewBreakpoints: [
      { minWidth: 0, itemsPerView: 1 },
      { minWidth: 500, itemsPerView: 2 },
      { minWidth: 900, itemsPerView: 3 },
    ],
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
