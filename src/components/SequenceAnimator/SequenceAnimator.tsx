import React from "react";
import useSequentialAnimation from "../../hooks/useSequentialAnimation";

const MyComponent = () => {
  const ogFrames = [<div>Frame 1</div>, <div>Frame 2</div>, <div>Frame 3</div>];
  const { frames, reset, stop, start } = useSequentialAnimation({
    autoplay: true,
    duration: 3000,
    loop: true,
    onSequenceEnd: () => console.log("Sequence ended"),
    onAnimationStop: () => console.log("Animation stopped"),
    children: ogFrames,
  });

  return (
    <div>
      {frames.map((frame, index) => (
        <div style={{ opacity: frame.current ? 1 : 0 }}>{frame.content}</div>
      ))}
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};
export default MyComponent;
