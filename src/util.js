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
    // case 2:
    //   return "#e9c1ca";
    // case 4:
    //   return "#ffd6b6";
    // case 8:
    //   return "#ef9825";
    // case 16:
    //   return "#3cf4b8";
    // case 32:
    //   return "#16ffdc";
    // case 64:
    //   return "#a6a1c2";
    // case 128:
    //   return "#3f7ad0";
    // case 256:
    //   return "#2c937e";
    // case 512:
    //   return "#14529d";
    // case 1024:
    //   return "#08213c";
    // case 2048:
    //   return "#add9d8";

    case 2:
      return "#CACC68";
    case 4:
      return "#82CC43";
    case 8:
      return "#3AB074";
    case 16:
      return "#3B96D5";
    case 32:
      return "#3165AD";
    case 64:
      return "#514597";
    case 128:
      return "804796";
    case 256:
      return "#BD3690";
    case 512:
      return "#E03551";
    case 1024:
      return "#DA432A";
    case 2048:
      return "#E65E22";

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

// #e9c1ca
// #ffd6b6
// #ef9825
// #984c8e
// #be2269
// #d6343f
// #3f7ad0
// #2c937e
// #14529d
// #08213c
