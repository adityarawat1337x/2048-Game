import { useEffect } from "react";

export const useEvent = (event, handler, passive = false) => {
  useEffect(() => {
    // initiate the event handler
    window.addEventListener(event, handler, passive);

    // this will clean up the event every time the component is re-rendered
    return function cleanup() {
      window.removeEventListener(event, handler);
    };
  });
};

export const getColors = (num) => {
  switch (num) {
    case 2:
      return "#9fdcd4";
    case 4:
      return "#91e0d0";
    case 8:
      return "#83e3cc";
    case 16:
      return "#75e7c8";
    case 32:
      return "#67eac4";
    case 64:
      return "#58edc0";
    case 128:
      return "#4af1bc";
    case 256:
      return "#3cf4b8";
    case 512:
      return "#2ef8b4";
    case 1024:
      return "20fbb0";
    case 2048:
      return "#add9d8";

    default:
      return "#bcd6dd";
  }
};

// #bcd6dd
// #add9d8
// #9fdcd4
// #91e0d0
// #83e3cc
// #75e7c8
// #67eac4
// #58edc0
// #4af1bc
// #3cf4b8
// #2ef8b4
// #20fbb0
// #12ffac
