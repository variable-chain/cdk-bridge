import { FC, useState } from "react";

import { parseError } from "src/adapters/error";
import { ReactComponent as MetaMaskIcon } from "src/assets/icons/metamask.svg";
import { ReactComponent as NewWindowIcon } from "src/assets/icons/new-window.svg";
import { POLYGON_SUPPORT_URL } from "src/constants";
import { useEnvContext } from "src/contexts/env.context";
import { useErrorContext } from "src/contexts/error.context";
import { useProvidersContext } from "src/contexts/providers.context";
import { useUIContext } from "src/contexts/ui.context";
import { Message, WalletName } from "src/domain";
import { useCallIfMounted } from "src/hooks/use-call-if-mounted";
import { isAsyncTaskDataAvailable, isMetaMaskUserRejectedRequestError } from "src/utils/types";
import { Card } from "src/views/shared/card/card.view";
import { ExternalLink } from "src/views/shared/external-link/external-link.view";
import { useNetworkBoxStyles } from "src/views/shared/network-box/network-box.styles";
import { Typography } from "src/views/shared/typography/typography.view";

export const NetworkBox: FC = () => {
  const classes = useNetworkBoxStyles();
  const env = useEnvContext();
  const { addNetwork, connectedProvider, connectProvider } = useProvidersContext();
  const [isAddNetworkButtonDisabled, setIsAddNetworkButtonDisabled] = useState(false);
  const { openSnackbar } = useUIContext();
  const callIfMounted = useCallIfMounted();
  const { notifyError } = useErrorContext();

  if (!env) {
    return null;
  }

  const ethereumChain = env.chains[0];
  const polygonZkEVMChain = env.chains[1];

  const successMsg: Message = {
    text: `${polygonZkEVMChain.name} network successfully added`,
    type: "success-msg",
  };

  const onAddNetwork = (): void => {
    setIsAddNetworkButtonDisabled(true);
  
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_accounts" })
        .then((accounts: string[]) => {
          if (accounts.length === 0) {
            // MetaMask is locked, prompt user to unlock
            console.log("MetaMask is locked. Please unlock MetaMask.");
            // Refresh accounts after switching network
            window.ethereum.request({ method: "eth_requestAccounts" })
            .then(() => {
              console.log("Refreshed accounts after switching network");
            })
            .catch((error) => {
              console.error("Error refreshing accounts:", error);
            });
            // You can show a message to the user or trigger a login modal.
          } else {
            
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
                        .then((e) => {
                          console.log("connectedProvider.status =", connectedProvider.status);
                          console.log("Refreshed accounts after switching network", e);
                          void connectProvider(WalletName.METAMASK);
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
    <Card>
      <div className={classes.networkBox}>
        <Typography type="body1">{env.chains[1].name}</Typography>
        <ul className={classes.list}>
          <li className={classes.listItem}>
            <Typography type="body2">
              RPC URL: {polygonZkEVMChain.provider.connection.url}
            </Typography>
          </li>
          <li className={classes.listItem}>
            <Typography type="body2">Chain ID: {polygonZkEVMChain.chainId}</Typography>
          </li>
          <li className={classes.listItem}>
            <Typography type="body2">
              Currency symbol: {polygonZkEVMChain.nativeCurrency.symbol}
            </Typography>
          </li>
          <li className={classes.listItem}>
            <Typography type="body2">
              Block explorer URL:{" "}
              <ExternalLink href={polygonZkEVMChain.explorerUrl}>
                {polygonZkEVMChain.explorerUrl}
              </ExternalLink>
            </Typography>
          </li>
          <li className={classes.listItem}>
            <Typography type="body2">
              {env.chains[0].name} Smart Contract:{" "}
              <ExternalLink
                href={`${ethereumChain.explorerUrl}/address/${ethereumChain.poeContractAddress}`}
              >
                {ethereumChain.poeContractAddress}
              </ExternalLink>
            </Typography>
          </li>
        </ul>
        <div className={classes.buttons}>
          <button
            className={classes.button}
            disabled={
              isAddNetworkButtonDisabled ||
              (isAsyncTaskDataAvailable(connectedProvider) &&
                connectedProvider.data.chainId === polygonZkEVMChain.chainId)
            }
            onClick={onAddNetwork}
          >
            <MetaMaskIcon className={classes.buttonIcon} />
            Add to MetaMask
          </button>
          <a
            className={classes.button}
            href={POLYGON_SUPPORT_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            <NewWindowIcon className={classes.buttonIcon} />
            Report an issue
          </a>
        </div>
      </div>
    </Card>
  );
};
