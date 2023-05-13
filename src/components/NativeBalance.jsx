import { useEffect, useState } from "react";
// import { useMoralis } from "react-moralis";
// import { n4 } from "../helpers/formatters";
import { Text, useColorMode } from "@chakra-ui/react";

function NativeBalance({ balance, ...props }) {
  // const { Moralis } = useMoralis();
  // const [userBalance, setUserBalance] = useState(0);
  const { colorMode } = useColorMode();
  const [color, setColor] = useState("#F37701");

  // Updates user balance
  // useEffect(() => {
  //   console.log("This is balance", balance.balance);
  //   if (balance.balance !== null) {
  //     // console.log("If");

  //     let newValue = Moralis.Units.FromWei(balance.balance);
  //     console.log("A newValue", newValue);

  //     setUserBalance(newValue.toFixed(2));
  //     console.log("A userBalance", userBalance);
  //   } else {
  //     return;
  //   }
  // }, []);

  // Updates user balance
  // useEffect(() => {
  //   console.log("This is balance", balance.balance);
  //   if (balance.balance !== null) {
  //     console.log("If");

  //     let newValue = Moralis.Units.FromWei(balance.balance);
  //     console.log("A newValue", newValue);

  //     setUserBalance(newValue.toFixed(2));
  //     console.log("A userBalance", userBalance);
  //   } else {
  //     return;
  //     console.log("Else");
  //   }
  // }, [balance]);

  useEffect(() => {
    if (colorMode === "light") {
      setColor("purple");
    } else {
      setColor("#F37701");
    }
  }, [colorMode]);

  return (
    <Text color={color} style={{ textAlign: "center", whiteSpace: "nowrap" }}>
      {balance} ETH
    </Text>
  );
}

export default NativeBalance;
