import React, { Fragment, useRef, useState, useEffect } from "react";
import { Drawer, Button } from "antd";
import {
  HStack,
  VStack,
  Box,
  Spacer,
  Image,
  Flex,
  Icon,
  useColorMode,
  Center,
  Text,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { SiGamejolt } from "react-icons/si";
import { useMoralis } from "react-moralis";
import ViewPort from "./ViewPort";
import ActiveLoadout from "./ActiveLoadout";
import NftOwned from "./NftOwned";
import create from "zustand";
import { Loading3QuartersOutlined } from "@ant-design/icons";
// import "antd/dist/antd.css";
import "./CharaterTab.css";
import { AwesomeButton } from "react-awesome-button";
import { styles as buttonStyles } from "react-awesome-button/dist/themes/theme-blue.css";
import { GiBackpack } from "react-icons/gi";
import XLogo from "./Images/kondux.png";
import { ScrollControls } from "@react-three/drei";
import { Scrollbar } from "react-scrollbars-custom";
import KSVG from "./Images/Kondux-X-SVG.svg";

const cssStyles = {
  overlay: {
    position: "fixed",
    // display: "flex",
    // flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    opacity: ".95",
    transition: ".3s ease",
    // fontFamily: "Roboto, sans-serif",
    // color: "#041836",
    // backgroundColor: "transparent",
    // top: "0",
    top: "95vh",
    left: "0",
    zIndex: "4",
    // right: "0",
  },
  Scroll: {
    display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
    // width: "75vw",
    // height: "32vh",
    backgroundColor: "darkgrey",
    borderRadius: "10px",
    // overflowX: "hidden",
  },
};

function CharacterTab() {
  const { isAuthenticated } = useMoralis();
  const [loaded, setLoaded] = useState("notloaded");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const [size, setSize] = useState("medium");

  function showDrawer() {
    setVisible(true);
  }

  function onClose() {
    setVisible(false);
  }

  const checkWidth = () => {
    // check to see if there is an instance for ethAddress
    if (window.innerWidth < 1000) {
      setSize("small");
      // console.log("This is window width:", window.innerWidth);
    } else {
      setSize("medium");
      // console.log("This is window width:", window.innerWidth);
    }
  };

  useEffect(() => {
    checkWidth();

    // animateLight();
  }, [window.innerWidth]);

  if (!isAuthenticated) {
    return (
      <div className="charaterContainer">
        <Box>
          <p1>You need to connect your wallet first.</p1>
        </Box>
      </div>
    );
  }

  return (
    <div className="charaterContainer">
      <HStack justify="center" onClick={() => setLoaded("loaded")}>
        <Box onClick={() => setLoaded("loaded")}>
          {/* Character ViewPort */}
          <div>
            {loaded === "loaded" ? (
              colorMode === "dark" ? (
                <Fragment>
                  <div
                    className="dark-site-drawer-render-in-current-wrapper"
                    style={{
                      // background:
                      //   "linear-gradient(0deg, rgba(180,34,4,1) 0%, rgba(198,84,5,1) 68%, rgba(245,211,9,1) 90%)",
                      width: "90vw",
                      height: "70vh",
                      borderRadius: "30px",
                      border: "15px solid black",
                    }}
                  >
                    <div>
                      <HStack
                        style={cssStyles.overlay}
                        width="100%"
                        justify="center"
                        align="center"
                      >
                        <Spacer mt="3">
                          <AwesomeButton
                            cssModule={buttonStyles}
                            // style={{ fontSize: "20px" }}
                            size={size}
                            type="secondary"
                            onPress={() => showDrawer()}
                          >
                            <Icon
                              className="Icons"
                              as={GiBackpack}
                              boxSize="6"
                              color="on-accent-subtle"
                            />
                          </AwesomeButton>

                          {/* <Button
                            size="large"
                            type="primary"
                            style={{
                              background: "#006200",
                              borderColor: "#006200",
                            }}
                            onClick={showDrawer}
                          >
                            Inventory
                          </Button> */}
                        </Spacer>
                        {/* <Spacer p="1" /> */}
                      </HStack>
                    </div>
                    <Drawer
                      className="custom-drawer"
                      title="Inventory"
                      placement="right"
                      closable={true}
                      onClose={onClose}
                      visible={visible}
                      getContainer={false}
                      width={"80vw"}
                      style={{ position: "absolute", zIndex: 10 }}
                      headerStyle={{ background: "black", fontcolor: "#fff" }}
                      drawerStyle={{ background: "#141414", color: "white" }}
                      bodyStyle={{ background: "#141414", color: "white" }}
                    >
                      <Flex>
                        <Box w="100%">
                          <VStack>
                            <Center>
                              {/* Loadout Component */}
                              <ActiveLoadout
                                style={{
                                  padding: "15px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              />
                            </Center>

                            <Center>
                              {" "}
                              {/* NFTs Owned Component */}
                              <NftOwned
                                style={{
                                  padding: "15px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              />
                            </Center>
                          </VStack>
                        </Box>
                      </Flex>
                    </Drawer>
                    {/* DARKMODE */}
                    <ViewPort
                      className="loadBG"
                      style={{ padding: "20px", height: "75vh" }}
                    />
                  </div>
                </Fragment>
              ) : (
                <>
                  <div
                    className="site-drawer-render-in-current-wrapper"
                    style={{
                      // background:
                      //   "linear-gradient(0deg, rgba(180,34,4,1) 0%, rgba(198,84,5,1) 68%, rgba(245,211,9,1) 90%)",
                      width: "90vw",
                      height: "70vh",
                      borderRadius: "30px",
                    }}
                  >
                    <div>
                      <HStack
                        style={cssStyles.overlay}
                        width="100%"
                        justify="center"
                        align="center"
                      >
                        <Box>
                          <Spacer mt="3">
                            <AwesomeButton
                              style={{ fontSize: "20px" }}
                              size={size}
                              type="link"
                              onPress={() => showDrawer()}
                            >
                              <Icon
                                className="Icons"
                                as={GiBackpack}
                                boxSize="6"
                                color="on-accent-subtle"
                              />
                            </AwesomeButton>
                          </Spacer>
                        </Box>
                        {/* <Spacer p="1" /> */}
                      </HStack>
                    </div>

                    <Drawer
                      className="custom-drawer"
                      title="Inventory"
                      placement="right"
                      closable={true}
                      onClose={onClose}
                      visible={visible}
                      getContainer={false}
                      width={"80vw"}
                      style={{
                        position: "absolute",
                      }}
                      headerStyle={{
                        background: "black",
                        fontcolor: "#fff",
                      }}
                      drawerStyle={{
                        background: "#141414",
                        fontcolor: "#fff",
                      }}
                      bodyStyle={{
                        background: "#141414",
                        fontcolor: "#fff",
                      }}
                    >
                      <Flex>
                        <Box w="100%">
                          <VStack>
                            {/* <Scrollbar
                              noScrollX={true}
                              style={cssStyles.Scroll}
                            > */}
                            <Center>
                              {/* Loadout Component */}
                              <ActiveLoadout
                                style={{
                                  padding: "15px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              />
                            </Center>

                            <Center>
                              {/* NFTs Owned Component */}
                              <NftOwned
                                style={{
                                  padding: "15px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              />
                            </Center>
                            {/* </Scrollbar> */}
                          </VStack>
                        </Box>
                      </Flex>
                    </Drawer>

                    {/* LIGHTMODE */}
                    <ViewPort style={{ padding: "20px", height: "75vh" }} />
                  </div>
                </>
              )
            ) : (
              <Box>
                <HStack>
                  <Center>
                    <Box
                      className="loadBG"
                      style={{
                        // background:
                        //   "radial-gradient(circle, rgba(252,70,107,1) 0%, rgba(66,63,251,1) 47%)",
                        width: "90vw",
                        height: "70vh",
                        borderRadius: "30px",
                        border: "2px solid black",
                      }}
                    >
                      <Center marginTop="45px" h="65vh">
                        <VStack>
                          <Image
                            boxSize="150px"
                            // objectFit="cover"
                            src={`${KSVG}`}
                            m={10}
                          />

                          <VStack style={{ lineHeight: "1.2" }}>
                            <Text style={{ lineHeight: "1.2" }} fontSize="4xl">
                              CLICK TO CONTINUE
                            </Text>
                          </VStack>
                        </VStack>
                      </Center>
                    </Box>
                  </Center>
                </HStack>
              </Box>
            )}
          </div>
        </Box>
      </HStack>
    </div>
  );
}

export default CharacterTab;
