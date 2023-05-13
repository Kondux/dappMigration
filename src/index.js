import React from "react";
import ReactDOM from "react-dom/client";
// import { createRoot } from "react-dom/client";

import App from "./App";
import { mode } from "@chakra-ui/theme-tools";
import { MoralisProvider } from "react-moralis";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { theme } from "@chakra-ui/pro-theme";
import "@fontsource/inter/variable.css";
import { MoralisDappProvider } from "./providers/MoralisDappProvider/MoralisDappProvider";

import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

const myTheme = extendTheme(
  {
    config: {
      initialColorMode: "dark",
    },

    fonts: {
      heading: "Poppins, sans-serif",
      body: "Rubik, sans-serif",
    },

    styles: {
      global: (props) => ({
        body: {
          bg: mode("#575866", "#1C1D32")(props),
          icon: mode("#712E6D", "#F37701")(props),
          color: mode("white", "white")(props),
          // hr: mode("white", "white")(props),
        },
        svg: { color: mode("purple", "#F37701")(props) },
        button: { color: mode("black", "white")(props) },
        // "*, hr": { borderColor: mode("white", "white")(props) },
      }),
    },

    // fonts: {
    //   heading: "Roboto, -apple-system, system-ui, sans-serif",
    //   body: "Roboto, -apple-system, system-ui, sans-serif",
    // },
  },
  theme
);

// MAIN WEBSITE
const APP_ID = "4N2HB8tBpvaolPklXTmw5sJZEMqS7rHkHMWXHP6R";
const SERVER_URL = "https://0ipqxknt2fxb.usemoralis.com:2053/server";

// TEST SERVER
// const APP_ID = "TrL1RkBaXhUbfTVmzbvDA0gpKUZF2smvik08vNpF";
// const SERVER_URL = "https://ilzblb7gncqb.grandmoralis.com:2053/server";

const Application = () => {
  return (
    <ChakraProvider theme={myTheme}>
      <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
        <MoralisDappProvider>
          <WagmiConfig client={client}>
            <App />
          </WagmiConfig>
        </MoralisDappProvider>
      </MoralisProvider>
    </ChakraProvider>
  );
};

// ReactDOM.render(
//   // <React.StrictMode>
//   <Application />,
//   // </React.StrictMode>,
//   document.getElementById("root")
// );

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Application />
  // {/* </React.StrictMode> */}
);
