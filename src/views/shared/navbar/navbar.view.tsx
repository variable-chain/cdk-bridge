// navbar.view.tsx
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Typography } from "../typography/typography.view";
import { parseError } from "src/adapters/error";
import { ReactComponent as MetaMaskIcon } from "src/assets/icons/metamask.svg";
import { ReactComponent as VariableLogo } from "src/assets/variable-logo.svg";
import { useEnvContext } from "src/contexts/env.context";
import { useErrorContext } from "src/contexts/error.context";
import { useProvidersContext } from "src/contexts/providers.context";
import { useUIContext } from "src/contexts/ui.context";
import { Message } from "src/domain";
import { useCallIfMounted } from "src/hooks/use-call-if-mounted";
import { getPartiallyHiddenEthereumAddress } from "src/utils/addresses";
import { isAsyncTaskDataAvailable, isMetaMaskUserRejectedRequestError } from "src/utils/types";
import { useNavbarStyles } from "src/views/shared/navbar/navbar.styles";

export const Navbar = (): JSX.Element => {
  const classes = useNavbarStyles();
  const { addNetwork, connectedProvider } = useProvidersContext();
  const [connectionStatus, setConnectionStatus] = useState(false);
  const env = useEnvContext();
  const { openSnackbar } = useUIContext();
  const callIfMounted = useCallIfMounted();
  const { notifyError } = useErrorContext();
  const [isAddNetworkButtonDisabled, setIsAddNetworkButtonDisabled] = useState(false);
  if (!env) {
    return null;
  }
  const polygonZkEVMChain = env.chains[1];

  useEffect(() => {
    if (connectedProvider.status === "successful") {
      console.log("connectedProvider.status =", connectedProvider.status);
      // You can trigger any UI update here as needed
    }
  }, [connectedProvider])
  

  const successMsg: Message = {
    text: `${polygonZkEVMChain.name} network successfully added`,
    type: "success-msg",
  };
  // ... (existing code)

const onAddNetwork = (): void => {
  // setIsAddNetworkButtonDisabled(true);

  if (window.ethereum) {
    window.ethereum.request({ method: "eth_accounts" })
      .then((accounts: string[]) => {
        if (accounts.length === 0) {
          // MetaMask is locked, prompt user to unlock
          console.log("MetaMask is locked. Please unlock MetaMask.");
          // Refresh accounts after switching network
          window.ethereum.request({ method: "eth_requestAccounts" })
          .then(() => {
            console.log("connectedProvider.status =", connectedProvider.status);
            
            console.log("Refreshed accounts after switching network");
          })
          .catch((error) => {
            console.error("Error refreshing accounts:", error);
          });
          // You can show a message to the user or trigger a login modal.
        } else {
          console.log("testunggakslbfvb");
          
          // MetaMask is unlocked, proceed with adding and switching network
          addNetwork(polygonZkEVMChain)
            .then(() => {
              callIfMounted(() => {
                openSnackbar(successMsg);

                // Switch network after it has been added
                window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: `0x${polygonZkEVMChain.chainId.toString(16)}` }],
                  })
                  .then(() => {
                    console.log("Switched to the added network");

                    // Refresh accounts after switching network
                    window.ethereum.request({ method: "eth_requestAccounts" })
                      .then(() => {
                        console.log("connectedProvider.status =", connectedProvider.status);
                        console.log("Refreshed accounts after switching network");
                      })
                      .catch((error) => {
                        console.error("Error refreshing accounts:", error);
                      });
                  })
                  .catch((error) => {
                    console.error("Error switching network:", error);
                  });
              });
            })
            .catch((error) => {
              callIfMounted(() => {
                void parseError(error).then((parsed) => {
                  if (parsed === "wrong-network") {
                    openSnackbar(successMsg);
                  } else if (isMetaMaskUserRejectedRequestError(error) === false) {
                    notifyError(error);
                  }
                });
              });
            })
            .finally(() => {
              callIfMounted(() => {
                setIsAddNetworkButtonDisabled(false);
              });
            });
        }
      })
      .catch((error) => {
        console.error("Error checking MetaMask accounts:", error);
      });
  } else {
    console.error("MetaMask not detected.");
  }
};

  return (
    <div className={classes.navbar_container}>
      <VariableLogo className={classes.logo} />
      <div className={classes.links}>
        {/* <NavLink activeClassName="active" style={{ color: 'white' }} to="/activity">
        Transfer</NavLink>
        <NavLink activeClassName="active" style={{ color: 'white' }} to="/activity">Swap</NavLink> */}
        <NavLink
          className={classes.links_item}
          style={{ color: "white" }}
          to="/activity"
        >
          Transaction History
        </NavLink>
      </div>
      {connectedProvider.status === "successful" ? (
          <div className={classes.ethereumAddress}>
            <MetaMaskIcon className={classes.metaMaskIcon} />
            <Typography type="body1">
              {getPartiallyHiddenEthereumAddress(connectedProvider.data.account)}
            </Typography>
          </div>
      ) : (
        <button
          className={classes.connectButton}
          disabled={
            isAddNetworkButtonDisabled ||
            (isAsyncTaskDataAvailable(connectedProvider) &&
              connectedProvider.data.chainId === polygonZkEVMChain.chainId)
          }
          onClick={onAddNetwork}
        >
          Connect
          {/* <MetaMaskIcon className={classes.buttonIcon} />
            Add to MetaMask */}
        </button>
      )}
    </div>
  );
};
