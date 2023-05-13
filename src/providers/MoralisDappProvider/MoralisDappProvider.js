import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import MoralisDappContext from "./context";

function MoralisDappProvider({ children }) {
  const {
    enableWeb3,
    isAuthenticated,
    web3,
    Moralis,
    user,
    logout,
    account,
    chainId,
    isWeb3Enabled,
    authenticate,
  } = useMoralis();

  const [walletAddress, setWalletAddress] = useState();
  const [currentChainId, setChainId] = useState();
  const [resetCache, setResetCache] = useState(false);

  const [contractABI, setContractABI] = useState(
    '{"noContractDeployed": false}'
  ); //Smart Contract ABI here

  const [marketAddress, setMarketAddress] = useState(
    "0xb0f81E49c3a80409138A76C6Ba746C09b99d6b07"
  ); //Smart Contract Address Here

  useEffect(() => {
    // console.log(account);
    // console.log(user?.get("ethAddress"));

    // detect Metamask account change
    window.ethereum.on("accountsChanged", function (accounts) {
      // console.log("accountsChanges", accounts);
    });

    if (!isAuthenticated) {
      // console.log("MOR");
      authenticate({
        signingMessage: "🧬 Access Kondux Gateway 🧬",
      });
    } else {
      setWalletAddress(user?.get("ethAddress"));
    }

    setChainId(chainId);
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isWeb3Enabled) {
      // console.log("WEB");
      enableWeb3();
      setChainId(chainId);
    }
  }, [isWeb3Enabled]);

  useEffect(() => {
    // console.log("This is user", user?.get("ethAddress"));
    // console.log("This is account", account);
    // console.log(user?.get("ethAddress"));

    Moralis.onChainChanged(function (chain) {
      setChainId(chain);
    });

    Moralis.onAccountChanged(function (address) {
      logout();
      setResetCache(true);
    });
  }, [user]);

  useEffect(() => {
    setChainId(chainId);
    // console.log(chainId);
  }, [chainId]);

  // useEffect(() => setWalletAddress(user?.get("ethAddress")), [web3, user]);

  return (
    <MoralisDappContext.Provider
      value={{
        walletAddress,
        currentChainId,
        marketAddress,
        setMarketAddress,
        contractABI,
        setContractABI,
        resetCache,
      }}
    >
      {children}
    </MoralisDappContext.Provider>
  );
}

function useMoralisDapp() {
  const context = React.useContext(MoralisDappContext);
  if (context === undefined) {
    throw new Error("useMoralisDapp must be used within a MoralisDappProvider");
  }
  return context;
}

export { MoralisDappProvider, useMoralisDapp };
