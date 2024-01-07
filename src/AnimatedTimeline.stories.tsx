import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import AnimatedTimeline from "./AnimatedTimeline";

const meta: Meta<typeof AnimatedTimeline> = {
  title: "Components/AnimatedTimeline",
  component: AnimatedTimeline,
};

type Story = StoryObj<typeof AnimatedTimeline>;

export const Primary: Story = {
  args: {
    label: "Primary 😃",
    size: "large",
    type: "primary",
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    type: "secondary",
    label: "Secondary 😇",
  },
};

export default meta;
