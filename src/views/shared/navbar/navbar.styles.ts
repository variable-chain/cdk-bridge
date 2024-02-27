// navbar.styles.ts
import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useNavbarStyles = createUseStyles((theme: Theme) => ({
  connectButton: {
    backgroundColor: "#3B62EC",
    border: "none",
    borderRadius: "50px",
    color: "white",
    cursor: "pointer",
    padding: `${theme.spacing(1.5)}px ${theme.spacing(2.5)}px`,
  },
  links: {
    display: "flex",
    gap: theme.spacing(1.5),
    "& a": {
      color: "white",
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
  logo: {
    fontSize: "1.5em",
    fontWeight: "bold",
    width: theme.spacing(20),
  },
  navbar: {
    alignItems: "center",
    backgroundColor: "#333",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
},
navbar_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing(5),
    padding: theme.spacing(4),
  },
  ethereumAddress: {
    alignItems: "center",
    backgroundColor: theme.palette.grey.main,
    borderRadius: 56,
    display: "flex",
    // margin: [theme.spacing(3), "auto", theme.spacing(3)],
    padding: [theme.spacing(1.25), theme.spacing(3)],
    [theme.breakpoints.upSm]: {
    //   margin: [theme.spacing(3), "auto", theme.spacing(5)],
    },
  },
  metaMaskIcon: {
    marginRight: theme.spacing(1),
    width: 20,
  },
  networkBoxWrapper: {
    margin: [0, "auto", theme.spacing(3)],
    maxWidth: theme.maxWidth,
    width: "100%",
  },
  links_item :{
    "&:hover": {
        textDecoration: 'none !important'
    }
  }
}));
