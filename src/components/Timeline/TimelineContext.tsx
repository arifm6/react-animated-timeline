import React from "react";

type TimelineContextType = {
  dateClass: string;
  trackClass: string;
  buttonIcon: React.ReactNode;
  detailsTitleClass: string;
  detailsDescriptionClass: string;
  branchContainerClass: string;
  branchLineClass: string;
  branchPointClass: string;
};

export const TimelineContext = React.createContext<TimelineContextType>({
  dateClass: "",
  trackClass: "z",
  buttonIcon: null,
  detailsTitleClass: "",
  detailsDescriptionClass: "",
  branchContainerClass: "",
  branchLineClass: "",
  branchPointClass: "",
});
