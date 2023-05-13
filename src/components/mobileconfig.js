import Metamask from "./WalletIcons/Metamask.svg";
import WalletConnect from "./WalletIcons/Walletconnect.svg";
import Coinbase from "./WalletIcons/Coinbase.svg";

export const mobileConnectors = [
  {
    title: "Metamask",
    icon: Metamask,
    connectorId: "injected",
    description: "Connect to your MetaMask Wallet",
    priority: 1,
  },

  {
    title: "Coinbase Wallet",
    icon: Coinbase,
    connectorId: "coinbase",
    description: "Connect to your Coinbase Wallet",
    priority: 2,
  },
  {
    title: "WalletConnect",
    icon: WalletConnect,
    connectorId: "walletconnect",
    description: "Connect to WalletConnect",
    priority: 3,
    qrcode: false,
  },
  // {
  //   title: "MathWallet",
  //   icon: MathWallet,
  //   connectorId: "injected",
  //   priority: 999,
  // },
];
