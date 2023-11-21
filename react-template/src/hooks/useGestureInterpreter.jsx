import { useGesture } from "@use-gesture/react";

// "hook" for: 1. testing hit area -> interface or vvvv interaction; 2. interpreting gesture
const useGestureInterpreter = (handleGesture, refs) => {
  const dragOptions = { filterTaps: true, tapsThreshold: 10, delay: 1000 };

  return useGesture(
    {
      onDrag: (e) => {
        if (!e.pinching) {
          let interfaceClick = false;
          refs.forEach((element) => {
            if (element.current && element.current.contains(e.target)) {
              interfaceClick = true;
              console.log("INTERFACE DRAG");
            }
          });
          if (!interfaceClick) {
            if (e.dragging) {
              handleGesture(e, "drag");
              console.log("VVVV DRAG");
            } else if (e.tap) {
              handleGesture(e, "tap");
              console.log("VVVV TAP");
            }
          }
        }
      },
      onPinch: (e) => {
        let interfaceClick = false;
        refs.forEach((element) => {
          if (element.current && element.current.contains(e.target)) {
            interfaceClick = true;
            console.log("INTERFACE PINCH");
          }
        });
        if (!interfaceClick) {
          handleGesture(e, "pinch");
          console.log(e);
        }
      },
    },
    {
      drag: dragOptions,
    }
  );
};

export default useGestureInterpreter;
