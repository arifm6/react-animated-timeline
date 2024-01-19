import React, { useEffect, useRef, useState } from "react";

interface UseSequntialAnimationProps {
  autoplay?: boolean;
  duration?: number;
  loop?: boolean;
  onSequenceEnd?: () => void;
  onAnimationStop?: () => void;
  children: React.ReactNode[];
}
export default function useSequentialAnimation({
  autoplay = true,
  duration = 1000,
  loop = true,
  onSequenceEnd,
  onAnimationStop,
  children,
}: UseSequntialAnimationProps) {
  //   const [frame, setFrame] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const animationStart = useRef<number | null>(null);
  const animationFrame = useRef<ReturnType<typeof requestAnimationFrame>>();

  const start = () => {
    playAnimation();
  };

  const stop = () => {
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }
  };

  const reset = () => {
    setCurrentFrame(0);
  };

  //   const getFrame = () => {
  //     return children.length >= frame ? children[frame] : null;
  //   };
  const getFrames = () => {
    return children.map((child, index) => ({
      content: child,
      current: index === currentFrame,
    }));
  };

  const playAnimation = () => {
    animationFrame.current = requestAnimationFrame(onAnimate);
  };

  const onAnimate = (timestamp: number) => {
    if (!animationStart.current) {
      animationStart.current = timestamp;
    }

    const elapsed = timestamp - (animationStart.current || 0);
    let nextFrame = Math.floor((elapsed / duration) * children.length);
    if (nextFrame > children.length - 1) {
      if (onSequenceEnd) {
        onSequenceEnd();
      }

      if (loop) {
        nextFrame %= children.length;
        animationStart.current = timestamp;
      } else {
        nextFrame = -1;
      }
    }

    if (nextFrame > -1) {
      setCurrentFrame(nextFrame);
      playAnimation();
    } else if (onAnimationStop) {
      onAnimationStop();
    }
  };

  useEffect(() => {
    if (autoplay) {
      start();
    }

    return () => {
      stop();
    };
  }, [autoplay]);

  return { frames: getFrames(), reset, stop, start };
}
