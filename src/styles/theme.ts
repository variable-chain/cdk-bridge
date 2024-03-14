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
      dark: "#3B62EC", 
      main: "#3B62EC", 
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
