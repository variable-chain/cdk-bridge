// // export const theme = {
// //   breakpoints: {
// //     upSm: "@media (min-width: 480px)",
// //   },
// //   hoverTransition: "all 150ms",
// //   maxWidth: 644,
// //   palette: {
// //     black: "#333",
// //     error: {
// //       light: "rgba(232,67,12,0.1)",
// //       main: "#e8430d",
// //     },
// //     grey: {
// //       dark: "#78798d",
// //       light: "#f0f1f6",
// //       main: "#e2e5ee",
// //       veryDark: "#363740",
// //     },
// //     primary: {
// //       dark: "#5a1cc3",
// //       main: "#7b3fe4",
// //     },
// //     success: {
// //       light: "rgba(0,255,0,0.1)",
// //       main: "#1ccc8d",
// //     },
// //     transparency: "rgba(8,17,50,0.5)",
// //     warning: {
// //       light: "rgba(225,126,38,0.1)",
// //       main: "#e17e26",
// //     },
// //     white: "#ffffff",
// //   },
// //   spacing: (value: number): number => value * 8,
// // };

// // export type Theme = typeof theme;


export const theme = {
  breakpoints: {
    upSm: "@media (min-width: 480px)",
  },
  hoverTransition: "all 150ms",
  maxWidth: 644,
  palette: {
    black: "#ffffff",
    error: {
      light: "rgba(232,67,12,0.1)",
      main: "#e8430d",
    },
    grey: {
      dark: "#ffffff", 
      light: "#0F0F0F", 
      main: "#1a1a1a", 
      veryDark: "#000000", 
    },
    primary: {
      dark: "#ab47bc", 
      main: "#9c27b0", 
    },
    success: {
      light: "rgba(0,255,0,0.1)",
      main: "#4caf50", 
    },
    transparency: "rgba(255,255,255,0.5)", 
    warning: {
      light: "rgba(225,126,38,0.1)",
      main: "#ff9800", 
    },
    white: "#1A1A1A", 
  },
  spacing: (value: number): number => value * 8,
};

export type Theme = typeof theme;


// export const lightTheme = {
//   breakpoints: {
//     upSm: "@media (min-width: 480px)",
//   },
//   hoverTransition: "all 150ms",
//   maxWidth: 644,
//   palette: {
//     background: "#ffffff",
//     black: "#fff",
//     error: {
//       light: "rgba(232,67,12,0.1)",
//       main: "#e8430d",
//     },
//     grey: {
//       dark: "#ffffff",
//       light: "#0F0F0F",
//       main: "#1a1a1a",
//       veryDark: "#000000",
//     },
//     primary: {
//       dark: "#ab47bc",
//       main: "#9c27b0",
//     },
//     success: {
//       light: "rgba(0,255,0,0.1)",
//       main: "#4caf50",
//     },
//     text: "#1A1A1A",
//     transparency: "rgba(255,255,255,0.5)",
//     warning: {
//       light: "rgba(225,126,38,0.1)",
//       main: "#ff9800",
//     },
//   },
//   spacing: (value: number) => value * 8,
// };

// export const darkTheme = {
//   ...lightTheme,
//   palette: {
//     ...lightTheme.palette,
//     background: "#1A1A1A",
//     black: "#000",
//     text: "#ffffff",
//   },
// };

// export type Theme = typeof lightTheme;
