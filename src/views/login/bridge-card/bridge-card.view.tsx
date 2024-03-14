
import { FC, useState } from "react";
import { useBridgeCardStyles } from "./bridge-card.styles";
import { parseError } from "src/adapters/error";
import { ReactComponent as CaretDown } from "src/assets/icons/caret-down.svg";
import { ReactComponent as MetaMaskIcon } from "src/assets/icons/metamask.svg";
import { useEnvContext } from "src/contexts/env.context";
import { useErrorContext } from "src/contexts/error.context";
import { useProvidersContext } from "src/contexts/providers.context";
import { useUIContext } from "src/contexts/ui.context";
import { Message, WalletName } from "src/domain";
import { useCallIfMounted } from "src/hooks/use-call-if-mounted";
import { isAsyncTaskDataAvailable, isMetaMaskUserRejectedRequestError } from "src/utils/types";
import { AmountInput } from "src/views/home/components/amount-input/amount-input.view";
import { Button } from "src/views/shared/button/button.view";
import { Card } from "src/views/shared/card/card.view";
import { Icon } from "src/views/shared/icon/icon.view";
import { Typography } from "src/views/shared/typography/typography.view";


export const BridgeCard: FC = () => {
  const classes = useBridgeCardStyles();
  const { addNetwork, connectedProvider, connectProvider } = useProvidersContext();
  const env = useEnvContext();
  const { openSnackbar } = useUIContext();
  const callIfMounted = useCallIfMounted();
  const { notifyError } = useErrorContext();
  const [isAddNetworkButtonDisabled, setIsAddNetworkButtonDisabled] = useState(false);
  if (!env) {
    return null;
  }
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
            .catch((error: any) => {
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
                        .then((e: any) => {
                          console.log("connectedProvider.status =", connectedProvider.status);
                          console.log("Refreshed accounts after switching network", e);
                          void connectProvider(WalletName.METAMASK);
                        })
                        .catch((error: any) => {
                          console.error("Error refreshing accounts:", error);
                        });
                    })
                    .catch((error: any) => {
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
        .catch((error: any) => {
          console.error("Error checking MetaMask accounts:", error);
        });
    } else {
      console.error("MetaMask not detected.");
    }
  };

  return (
    <>
      <Card className={classes.card}>
        <div className={classes.row}>
          <div className={classes.leftBox}>
            <Typography type="body2">From</Typography>
            <button className={classes.fromChain}>
              <Typography type="body1">cdk-validium</Typography>
              <CaretDown />
            </button>
          </div>
          <div className={classes.rightBox}>
            <Typography type="body2">Balance</Typography>
          </div>
        </div>
        <div className={`${classes.row} ${classes.middleRow}`}>
          <button className={classes.tokenSelector}>
            <Icon
              isRounded
              size={24}
              url="https://raw.githubusercontent.com/Uniswap/interface/main/packages/ui/src/assets/logos/png/polygon-logo.png"
            />
            <Typography type="h2">cdk-validium</Typography>
            <CaretDown />
          </button>
          <AmountInput />
        </div>
        <div className={classes.row} style={{ marginTop: "50px" }}>
          <div className={classes.leftBox}>
            <Typography type="body2">To</Typography>
            <Typography type="body1">Ethereum</Typography>
            <div className={classes.toChain}>
              <Icon
                isRounded
                size={24}
                url="https://raw.githubusercontent.com/Uniswap/interface/main/packages/ui/src/assets/logos/png/ethereum-logo.png"
              />
            </div>
          </div>
          <div className={classes.rightBox}>
            <Typography type="body2">Balance</Typography>
          </div>
        </div>
        <div className={classes.button}>
        </div>
      </Card>
      <Button
        className={classes.metaMaskButton}
          disabled={
            isAddNetworkButtonDisabled ||
            (isAsyncTaskDataAvailable(connectedProvider) &&
              connectedProvider.data.chainId === polygonZkEVMChain.chainId)
          }
          onClick={onAddNetwork}
        >
          <MetaMaskIcon className={classes.buttonIcon} />
            Add to MetaMask
        </Button>
    </>
  );
};
