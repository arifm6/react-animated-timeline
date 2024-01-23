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
    if (index <= activeFrame) {
      return React.cloneElement(frame, {
        onAnimationEnd: handleAnimationEnd,
        key: index,
      });
    }

    return null;
  });

  return animatedFrames;
};
export default useSequentialAnimation;
