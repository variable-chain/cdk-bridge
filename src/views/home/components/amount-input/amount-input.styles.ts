import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useAmountInputStyles = createUseStyles((theme: Theme) => ({
  amountInput: {
    "&:disabled": {
      backgroundColor: "transparent",
    },
    backgroundColor: "#2b2b2b",
    border: "none",
    borderRadius: 8,
    color:"#fff",
    fontSize: "20px",
    lineHeight: "24px",
    outline: "none",
    padding: 5,
    textAlign: "right",
    width: "100%",
    [theme.breakpoints.upSm]: {
      fontSize: (value: number) => (value < 16 ? "40px" : "30px"),
      lineHeight: "40px",
    },
  },
  maxButton: {
    "&:not(:disabled)": {
      cursor: "pointer",
    },
    background: "none",
    border: "none",
    color: theme.palette.black,
    padding: theme.spacing(1),
  },
  maxText: {
    color: theme.palette.black,
  },
  wrapper: {
    alignItems: "center",
    display: "flex",
    flex: 1,
    marginLeft: theme.spacing(1),
    [theme.breakpoints.upSm]: {
      marginLeft: theme.spacing(2.5),
    },
  },
}));
