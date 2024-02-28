import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useWalletListStyles = createUseStyles((theme: Theme) => ({
  wallet: {
    "&:hover": {
      background: "#1a1a1a",
    },
    alignItems: "center",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    padding: [theme.spacing(3), theme.spacing(4)],
    transition: theme.hoverTransition,
  },
  walletIcon: {
    marginRight: theme.spacing(2),
  },
  walletInfo: {
    flex: 1,
  },
  walletList: {
    listStyle: "none",
    margin: 0,
    paddingLeft: 0,
  },
  walletName: {
    marginBottom: theme.spacing(1),
  },
}));
