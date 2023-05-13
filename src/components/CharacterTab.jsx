import React, { Fragment, useState, useEffect } from "react";
import { Drawer } from "antd";
import Switch from "react-switch";
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
  Stack,
  FormLabel,
  Container,
  Button,
  Tooltip,
} from "@chakra-ui/react";
// import Button from "@ui/button";
import { useMoralis } from "react-moralis";
// import "antd/dist/antd.css";
// import Form from "react-bootstrap/Form";
// import "./CharaterTab.css";
import { styles as buttonStyles } from "react-awesome-button/dist/themes/theme-blue.css";
import { GiBackpack } from "react-icons/gi";
import KSVG from "./Images/Kondux-X-SVG.svg";

// import ViewPort from "./Viewport/Viewport";
import ViewPort from "./Viewport/ViewportLive";

// import NftOwned from "./NftOwned";
import NftOwned from "./NftOwnedLive";

import ActiveLoadout from "./ActiveLoadout";
import { MdSettingsBrightness } from "react-icons/md";
import { Scrollbars } from "react-custom-scrollbars-2";

function CharacterTab() {
  const { isAuthenticated } = useMoralis();
  const [loaded, setLoaded] = useState("notloaded");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const [size, setSize] = useState("medium");
  const [halfWidth, setHalfWidth] = useState();

  const [bgFilter, setBGFilter] = useState(false);
  const [musicFilter, setMusicFilter] = useState(false);
  const [avatarFilter, setAvatarFilter] = useState(false);
  const [skinFilter, setSkinFilter] = useState(false);
  const [headFilter, setHeadFilter] = useState(false);
  const [eyesFilter, setEyesFilter] = useState(false);
  const [weaponFilter, setWeaponFilter] = useState(false);
  const [armorFilter, setArmorFilter] = useState(false);

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

  const checkHalfWidth = () => {
    setHalfWidth(window.innerWidth / 2);
  };

  useEffect(() => {
    checkWidth();
    checkHalfWidth();
    // animateLight();
  }, []);

  const cssStyles = {
    //this is styling for Inventory Button
    overlay: {
      position: "fixed",
      // display: "flex",
      flexDirection: "row-reverse",
      // alignItems: "center",
      // justifyContent: "center",
      opacity: ".95",
      transition: ".3s ease",
      // fontFamily: "Roboto, sans-serif",
      // color: "#041836",
      // backgroundColor: "transparent",
      // top: "0",
      top: "20vh",
      right: 50,
      zIndex: "4",
      // right: "0",
    },

    // This is styling for scrollbars in drawers
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

  if (!isAuthenticated) {
    return (
      <div className="charaterContainer">
        <Flex
          style={{ width: "100%", height: "100vh" }}
          alignItems="center"
          justifyContent="center"
        >
          <Box p={5} m={10}>
            <p>You need to connect your wallet first.</p>
          </Box>
        </Flex>
      </div>
    );
  }

  // Filter State Functions
  function handleBGFilter() {
    setBGFilter(!bgFilter);
    // console.log("This is bgFilter", bgFilter);
  }

  function handleMusicFilter() {
    setMusicFilter(!musicFilter);
    // console.log("This is musicFilter", musicFilter);
  }

  function handleAvatarFilter() {
    setAvatarFilter(!avatarFilter);
    // console.log("This is avatarFilter", avatarFilter);
  }

  function handleSkinFilter() {
    setSkinFilter(!skinFilter);
    // console.log("This is skinFilter", skinFilter);
  }

  function handleHeadFilter() {
    setHeadFilter(!headFilter);
    // console.log("This is headFilter", headFilter);
  }

  function handleEyesFilter() {
    setEyesFilter(!eyesFilter);
    // console.log("This is eyesFilter", eyesFilter);
  }

  function handleArmorFilter() {
    setArmorFilter(!armorFilter);
    // console.log("This is armorFilter", armorFilter);
  }

  function handleWeaponFilter() {
    setWeaponFilter(!weaponFilter);
    // console.log("This is weaponFilter", weaponFilter);
  }

  function NFTFilter() {
    return (
      <>
        <Scrollbars
          style={{ height: "30vh", width: "100%", borderRadius: "30px" }}
        >
          <Container>
            <Stack style={{ height: "25vh", width: "100%" }}>
              <h1 style={{ paddingTop: "10px", color: "white" }}>FILTER: </h1>
              <Flex
                flexDirection="row"
                justifyContent="space-evenly"
                flexWrap="wrap"
              >
                <Flex p={5} alignItems="center" justifyContent="center">
                  <label>
                    <Center p={2}>
                      <span style={{ color: "white" }}>Background</span>
                    </Center>
                    <Spacer />
                    <Flex alignItems="center" justifyContent="center">
                      <Switch
                        onColor="#e702bf"
                        onChange={handleBGFilter}
                        checked={bgFilter}
                      />
                    </Flex>
                  </label>
                </Flex>

                <Flex p={5} alignItems="center" justifyContent="center">
                  <label>
                    <Center p={2}>
                      <span style={{ color: "white" }}>Music</span>
                    </Center>
                    <Spacer />
                    <Flex alignItems="center" justifyContent="center">
                      <Switch
                        onColor="#e702bf"
                        onChange={handleMusicFilter}
                        checked={musicFilter}
                      />
                    </Flex>
                  </label>
                </Flex>

                <Flex p={5} alignItems="center" justifyContent="center">
                  <label>
                    <Center p={2}>
                      <span style={{ color: "white" }}>Avatar</span>
                    </Center>
                    <Spacer />
                    <Flex alignItems="center" justifyContent="center">
                      <Switch
                        onColor="#e702bf"
                        onChange={handleAvatarFilter}
                        checked={avatarFilter}
                      />
                    </Flex>
                  </label>
                </Flex>

                <Flex p={5} alignItems="center" justifyContent="center">
                  <label>
                    <Center p={2}>
                      <span style={{ color: "white" }}>Skin</span>
                    </Center>
                    <Spacer />
                    <Flex alignItems="center" justifyContent="center">
                      <Switch
                        onColor="#e702bf"
                        onChange={handleSkinFilter}
                        checked={skinFilter}
                      />
                    </Flex>
                  </label>
                </Flex>

                <Flex p={5} alignItems="center" justifyContent="center">
                  <label>
                    <Center p={2}>
                      <span style={{ color: "white" }}>Head</span>
                    </Center>
                    <Spacer />
                    <Flex alignItems="center" justifyContent="center">
                      <Switch
                        onColor="#e702bf"
                        onChange={handleHeadFilter}
                        checked={headFilter}
                      />
                    </Flex>
                  </label>
                </Flex>

                <Flex p={5} alignItems="center" justifyContent="center">
                  <label>
                    <Center p={2}>
                      <span style={{ color: "white" }}>Eyes</span>
                    </Center>
                    <Spacer />
                    <Flex alignItems="center" justifyContent="center">
                      <Switch
                        onColor="#e702bf"
                        onChange={handleEyesFilter}
                        checked={eyesFilter}
                      />
                    </Flex>
                  </label>
                </Flex>

                <Flex p={5} alignItems="center" justifyContent="center">
                  <label>
                    <Center p={2}>
                      <span style={{ color: "white" }}>Armor</span>
                    </Center>
                    <Spacer />
                    <Flex alignItems="center" justifyContent="center">
                      <Switch
                        onColor="#e702bf"
                        onChange={handleArmorFilter}
                        checked={armorFilter}
                      />
                    </Flex>
                  </label>
                </Flex>

                <Flex p={5} alignItems="center" justifyContent="center">
                  <label>
                    <Center p={2}>
                      <span style={{ color: "white" }}>Weapon</span>
                    </Center>
                    <Spacer />
                    <Flex alignItems="center" justifyContent="center">
                      <Switch
                        onColor="#e702bf"
                        onChange={handleWeaponFilter}
                        checked={weaponFilter}
                      />
                    </Flex>
                  </label>
                </Flex>
              </Flex>
            </Stack>
          </Container>
        </Scrollbars>
      </>
    );
  }

  return (
    <Scrollbars>
      <Flex alignItems={"center"} justifyContent={"center"}>
        {/* <Box pt={55} width={"75%"}>
          <Tooltip label="Under Construction">
            <Image
              // m={5}
              border="5px solid black"
              borderRadius="30px"
              // boxSize="500px"
              objectFit="contain"
              src="https://i.ibb.co/XVFD5hC/Under-Construction.png"
              alt="Under Construction"
            />
          </Tooltip>
        </Box> */}

        <Box onClick={() => setLoaded("loaded")}>
          {/* Character ViewPort */}
          <div>
            {loaded === "loaded" ? (
              colorMode === "dark" ? (
                <>
                  <div
                    className="dark-site-drawer-render-in-current-wrapper"
                    style={{
                      // position: "fixed",
                      // top: 0,
                      // background:
                      //   "linear-gradient(0deg, rgba(180,34,4,1) 0%, rgba(198,84,5,1) 68%, rgba(245,211,9,1) 90%)",
                      width: "90vw",
                      // height: "70vh",
                      borderRadius: "30px",
                      // zIndex: 9999,
                      // border: "15px solid black",
                    }}
                  >
                    <div>
                      <HStack
                        style={cssStyles.overlay}
                        // width="100%"
                        // justify="center"
                        // align="center"
                      >
                        <Box>
                          <Spacer mt="3">
                            <div className="icon-box">
                              <Button
                                color="primary-alta"
                                // className="connectBtn"
                                size="small"
                                style={{
                                  fontSize: "20px",
                                  // zIndex: 9999,
                                }}
                                onClick={() => showDrawer()}
                              >
                                <Icon
                                  className="Icons"
                                  as={GiBackpack}
                                  boxSize="6"
                                  color="on-accent-subtle"
                                />
                              </Button>
                            </div>
                          </Spacer>
                        </Box>
                      </HStack>
                    </div>

                    {/* Dark */}
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
                        // position: "fixed",
                        // top: 0,
                        // position: "absolute",
                        zIndex: 10,
                      }}
                      headerStyle={{
                        // marginTop: "88px",
                        background: "black",
                        fontcolor: "#fff",
                      }}
                      drawerStyle={{
                        background: "#141414",
                        color: "white",
                      }}
                      bodyStyle={{
                        background: "#141414",
                        color: "white",
                      }}
                    >
                      <Flex>
                        <Box w="100%">
                          <HStack>
                            <Center>
                              <VStack>
                                {/* Loadout Component */}
                                <ActiveLoadout
                                  style={{
                                    padding: "15px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                />
                                {/* Filter Component */}
                                <NFTFilter />
                              </VStack>
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
                                bgFilter={bgFilter}
                                musicFilter={musicFilter}
                                avatarFilter={avatarFilter}
                                skinFilter={skinFilter}
                                headFilter={headFilter}
                                eyesFilter={eyesFilter}
                                weaponFilter={weaponFilter}
                                armorFilter={armorFilter}
                              />
                            </Center>
                          </HStack>
                        </Box>
                      </Flex>
                    </Drawer>

                    {/* DARKMODE */}
                    <div style={{ marginTop: "88px" }}></div>
                    <Flex
                    // width="100%"
                    // height="100%"
                    // alignItems="center"
                    // justifyContent="center"
                    >
                      <ViewPort
                        className="viewPort"
                        style={{
                          // padding: "20px",
                          height: "100vh",
                        }}
                      />
                    </Flex>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="site-drawer-render-in-current-wrapper"
                    style={{
                      // position: "fixed",
                      // top: 0,
                      // background:
                      //   "linear-gradient(0deg, rgba(180,34,4,1) 0%, rgba(198,84,5,1) 68%, rgba(245,211,9,1) 90%)",
                      width: "90vw",
                      // height: "70vh",
                      borderRadius: "30px",
                    }}
                  >
                    <div>
                      <HStack
                        style={cssStyles.overlay}
                        // width="100%"
                        // justify="center"
                        // align="center"
                      >
                        <Box>
                          <Spacer mt="3">
                            <div className="icon-box">
                              <Button
                                color="primary-alta"
                                // className="connectBtn"
                                size="small"
                                style={{
                                  fontSize: "20px",
                                  // zIndex: 9999,
                                }}
                                onClick={() => showDrawer()}
                              >
                                <Icon
                                  className="Icons"
                                  as={GiBackpack}
                                  boxSize="6"
                                  color="on-accent-subtle"
                                />
                              </Button>
                            </div>
                          </Spacer>
                        </Box>
                        {/* <Spacer p="1" /> */}
                      </HStack>
                    </div>

                    {/* Light */}
                    <Drawer
                      className="custom-drawer"
                      title="Inventory"
                      placement="right"
                      closable={true}
                      onClose={onClose}
                      visible={visible}
                      getContainer={false}
                      width={"80vw"}
                      style={
                        {
                          // position: "absolute",
                        }
                      }
                      headerStyle={{
                        // marginTop: "88px",
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
                          <HStack>
                            {/* <Scrollbar
                              noScrollX={true}
                              style={cssStyles.Scroll}
                            > */}
                            <Center>
                              <VStack>
                                {/* Loadout Component */}
                                <ActiveLoadout
                                  style={{
                                    padding: "15px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                />
                                {/* Filter Component */}
                                <NFTFilter />
                              </VStack>
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
                                bgFilter={bgFilter}
                                musicFilter={musicFilter}
                                avatarFilter={avatarFilter}
                                skinFilter={skinFilter}
                                headFilter={headFilter}
                                eyesFilter={eyesFilter}
                                weaponFilter={weaponFilter}
                                armorFilter={armorFilter}
                              />
                            </Center>
                            {/* </Scrollbar> */}
                          </HStack>
                        </Box>
                      </Flex>
                    </Drawer>

                    {/* LIGHTMODE */}
                    <div style={{ marginTop: "69px" }}></div>
                    <Flex
                    // width="100vw"
                    // height="100vh"

                    // justifyContent="center"
                    >
                      <ViewPort
                        className="viewPort"
                        style={{
                          // padding: "20px",
                          height: "100vh",
                        }}
                      />
                    </Flex>
                  </div>
                </>
              )
            ) : (
              <Flex
                alignItems="center"
                justifyContent="center"
                paddingTop="100px"
                onClick={() => setLoaded("loaded")}
              >
                <Flex alignItems="center" justifyContent="center">
                  <Flex alignItems="center" justifyContent="center">
                    <Center>
                      <Box
                        className="loadBG"
                        style={{
                          // background:
                          //   "radial-gradient(circle, rgba(252,70,107,1) 0%, rgba(66,63,251,1) 47%)",
                          width: "90vw",
                          // height: "70vh",
                          borderRadius: "30px",
                          border: "2px solid black",
                        }}
                      >
                        <Flex
                          alignItems="center"
                          justifyContent="center"
                          marginTop="45px"
                          h="65vh"
                        >
                          <VStack>
                            <Image
                              boxSize="150px"
                              objectFit="cover"
                              src={`${KSVG}`}
                              m={10}
                            />

                            <VStack
                              style={{
                                lineHeight: "1.2",
                              }}
                            >
                              <Text
                                style={{
                                  lineHeight: "1.2",
                                }}
                                fontSize="4xl"
                              >
                                CLICK TO CONTINUE
                              </Text>
                            </VStack>
                          </VStack>
                        </Flex>
                      </Box>
                    </Center>
                  </Flex>
                </Flex>
              </Flex>
            )}
          </div>
        </Box>
      </Flex>
    </Scrollbars>
  );
}

export default CharacterTab;
