// export const theme = {
//   breakpoints: {
//     upSm: "@media (min-width: 480px)",
//   },
//   hoverTransition: "all 150ms",
//   maxWidth: 644,
//   palette: {
//     black: "#333",
//     error: {
//       light: "rgba(232,67,12,0.1)",
//       main: "#e8430d",
//     },
//     grey: {
//       dark: "#78798d",
//       light: "#f0f1f6",
//       main: "#e2e5ee",
//       veryDark: "#363740",
//     },
//     primary: {
//       dark: "#5a1cc3",
//       main: "#7b3fe4",
//     },
//     success: {
//       light: "rgba(0,255,0,0.1)",
//       main: "#1ccc8d",
//     },
//     transparency: "rgba(8,17,50,0.5)",
//     warning: {
//       light: "rgba(225,126,38,0.1)",
//       main: "#e17e26",
//     },
//     white: "#ffffff",
//   },
//   spacing: (value: number): number => value * 8,
// };

// export type Theme = typeof theme;


export const theme = {
  breakpoints: {
    upSm: "@media (min-width: 480px)",
  },
  hoverTransition: "all 150ms",
  maxWidth: 644,
  palette: {
    black: "#ffffff", // change background color to white
    error: {
      light: "rgba(232,67,12,0.1)",
      main: "#e8430d",
    },
    grey: {
      dark: "#ffffff", // change background color to white
      light: "#0F0F0F", // change background color to a dark grey
      main: "#1a1a1a", // change background color to a darker grey
      veryDark: "#000000", // change background color to black
    },
    primary: {
      dark: "#ab47bc", // change to a darker shade of purple
      main: "#9c27b0", // change to a dark purple
    },
    success: {
      light: "rgba(0,255,0,0.1)",
      main: "#4caf50", // change to a dark green
    },
    transparency: "rgba(255,255,255,0.5)", // change to white transparency
    warning: {
      light: "rgba(225,126,38,0.1)",
      main: "#ff9800", // change to a dark orange
    },
    white: "#1A1A1A", // change text color to white
  },
  spacing: (value: number): number => value * 8,
};

export type Theme = typeof theme;
