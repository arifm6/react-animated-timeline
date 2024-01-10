import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Timeline from "./Timeline";
import { Milestone } from "./types";

const meta: Meta<typeof Timeline> = {
  title: "Components/Timeline",
  component: Timeline,
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
    endDate: "2021-02-15",
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
    endDate: "2021-04-15",
    title: "Fourth milestone",
    description: "This is the fourth milestone",
  },
];
export const Primary: Story = {
  args: {
    milestones: timelineData,
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
