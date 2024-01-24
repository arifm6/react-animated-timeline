// useSequentialAnimation.ts
import React, { useState, ReactElement } from "react";

interface UseSequentialAnimationProps {
  frames: ReactElement[];
}

const useSequentialAnimation = ({ frames }: UseSequentialAnimationProps) => {
  const [activeFrame, setActiveFrame] = useState(0);
  const handleAnimationEnd = () => {
    setActiveFrame((prevFrame) => prevFrame + 1);
  };
  const animatedFrames = frames.map((frame, index) => {
    const animationPlayState = index <= activeFrame ? "running" : "paused";
    const onAnimationEnd =
      index <= activeFrame ? handleAnimationEnd : undefined;
    const styles = frame.props.style || {};
    return React.cloneElement(frame, {
      onAnimationEnd,
      style: { animationPlayState, ...styles },
      key: index,
    });
  });

  return animatedFrames;
};
export default useSequentialAnimation;
