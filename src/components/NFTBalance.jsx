import React, { useEffect, useState, Suspense } from "react";
import {
  useMoralis,
  useWeb3ExecuteFunction,
  useMoralisWeb3Api,
} from "react-moralis";
import isReachable from "is-reachable";
import create from "zustand";
import { Card, Image, Tooltip, Alert, Spin } from "antd";
import {
  Text,
  HStack,
  Box,
  Container,
  Flex,
  useColorMode,
  Divider,
  Stack,
  Button,
  Center,
} from "@chakra-ui/react";
import ReactPaginate from "react-paginate";
import { BrowserView } from "react-device-detect";
import { Loader } from "@react-three/drei";
import { useNFTBalance } from "../hooks/useNFTBalance";
import {
  FileSearchOutlined,
  SaveFilled,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";
import { getExplorer } from "../helpers/networks";

import Gallery from "./Gallery";

import "./CharaterTab.css";
import Footer from "../components/Footer";

const { Meta } = Card;

const styles = {
  NFTs: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    // height: "20vh",
    // gap: "50px",
    // margin: "30px 70px 70px 70px",
  },

  loader: {
    // position: "absolute",
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
  },

  Scroll: {
    display: "flex",
    // alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    // backgroundColor: "darkgrey",
    // backgroundColor: "#171923",
    borderRadius: "10px",
    // overflowX: "scroll",
    // border: "4px solid ",
    // overflowY: "scroll",
  },
};

export const useStore = create((set) => ({
  count: 0,
  inc: () => set((state) => ({ count: state.count + 8 })),
  dec: () => set((state) => ({ count: state.count - 8 })),
}));

function NFTBalance() {
  const { NFTBalance, fetchSuccess } = useNFTBalance();
  const { chainId, marketAddress, contractABI } = useMoralisDapp();
  const { authenticate, isAuthenticated, user, Moralis } = useMoralis();

  const Web3Api = useMoralisWeb3Api();

  const [visible, setVisibility] = useState(false);
  const [nftToSend, setNftToSend] = useState(null);
  const [price, setPrice] = useState(1);
  const [loading, setLoading] = useState(false);

  const contractProcessor = useWeb3ExecuteFunction();
  const contractABIJson = JSON.parse(contractABI);

  const [totalNFTs, setTotalNFTs] = useState([]);
  const [totalCacheNFTs, setTotalCacheNFTs] = useState([]);
  const [totalDemoNFTs, setTotalDemoNFTs] = useState([]);
  const [nftImages, setNftImages] = useState([]);
  const [nftNames, setNftNames] = useState([]);

  const [multiplier, setMultiplier] = useState(0);
  const [hidden, setHidden] = useState(false);

  const { colorMode, toggleColorMode } = useColorMode();
  const [color, setColor] = useState("white");

  const [walletStatus, setWalletStatus] = useState("AUTHENTICATE");
  const [ready, setReady] = useState(false);

  const [mode, setMode] = useState("init");

  const { count } = useStore();

  // useEffect(() => {
  //   //get all NFT data on mount
  //   getNFTs();
  // }, []);

  // useEffect(() => {
  //   setMultiplier(count);
  // }, [count]);

  // useEffect(() => {
  //   console.log(state.count);
  // });

  function Items({ currentItems }) {
    return (
      <>
        <Flex
          justifyContent="center"
          style={{ minWidth: "500px" }}
          padding={10}
        >
          {currentItems &&
            currentItems?.map((nft, index) => (
              <Flex padding={2} key={index}>
                <Card
                  hoverable
                  actions={[
                    <Tooltip title="View On Blockexplorer">
                      <FileSearchOutlined
                        onClick={() =>
                          window.open(
                            `https://etherscan.io/nft/${nft?.token_address}/${nft?.token_id}`,
                            "_blank"
                          )
                        }
                      />
                    </Tooltip>,
                    // <Tooltip title="List NFT for sale">
                    //   <ShoppingCartOutlined
                    //     onClick={() => handleSellClick(nft)}
                    //   />
                    // </Tooltip>,
                  ]}
                  style={{
                    width: 120,
                    border: "2px solid #e7eaf3",
                  }}
                  cover={
                    <Image
                      preview={false}
                      src={nft?.image || "error"}
                      fallback="Loading..."
                      alt=""
                      style={{
                        height: "120px",
                        objectFit: "cover",
                      }}
                    />
                  }
                  key={index}
                >
                  <Meta title={nft.name} description={nft.contract_type} />
                </Card>
              </Flex>
            ))}
        </Flex>
      </>
    );
  }

  function PaginatedItems({ itemsPerPage, filterArray }) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
      setCurrentItems(filterArray);
    }, []);

    useEffect(() => {
      // Fetch items from another resources.
      const endOffset = itemOffset + itemsPerPage;
      // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(filterArray.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(filterArray.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % filterArray.length;
      // console.log(
      //   `User requested page number ${event.selected}, which is offset ${newOffset}`
      // );
      setItemOffset(newOffset);
    };

    return (
      <>
        <Box padding={5} style={{ width: "90vw" }}>
          <Items currentItems={currentItems} style={{ width: "100%" }} />

          <Flex justifyContent="center" style={{ width: "100%" }}>
            <ReactPaginate
              className="gallery-pagination"
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
            />
          </Flex>
        </Box>
      </>
    );
  }

  // Changes URL if IPFS Link
  const useIPFS = () => {
    const resolveLink = (url) => {
      if (!url || !url.includes("ipfs://")) return url;
      return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
    };

    return { resolveLink };
  };

  const { resolveLink } = useIPFS();

  // const {
  //     getBalances,
  //     data: balance,
  //     nativeToken,
  // } = useNativeBalance({ chain: `${chainId}`, address: `${walletAddress}` });

  useEffect(() => {
    if (!isAuthenticated) {
      authenticate({
        signingMessage: "🧬 Access Kondux Gateway 🧬",
      });
    } else {
      console.log("This is nftCache", user.attributes?.nftCache);
      if (user.attributes?.nftCache?.length >= 1) {
        let cache = user.attributes?.nftCache;
        setTotalCacheNFTs(cache);
        console.log("This is nftCache Total", totalCacheNFTs);
        setMode("cache");
      } else {
        getNFTs();
      }
    }
  }, []);

  useEffect(() => {
    if (totalCacheNFTs) {
      getNFTBal(totalCacheNFTs);
      console.log("This is nftCache Images", nftImages);
      setReady(true);
    }
  }, [totalCacheNFTs]);

  useEffect(() => {
    if (colorMode === "light") {
      setColor("black");
    } else {
      setColor("white");
    }
  }, [colorMode]);

  //
  useEffect(() => {
    if (!isAuthenticated) {
      setWalletStatus("AUTHENTICATE");
    } else {
      setWalletStatus("CLICK HERE");
    }
  }, [isAuthenticated]);

  // Gets NFT data on load

  //Runs to getNFTs, after cache
  const getNFTs = async () => {
    // get NFTs for current user on Mainnet
    const NFTs = await Web3Api.account.getNFTs();
    // console.log(NFTs);

    console.log(NFTs.result);

    if (NFTs?.result.length >= 1) {
      console.log("Got Result");
      const allNFTs = NFTs.result;
      // setFetchSuccess(true);
      for (let NFT of allNFTs) {
        if (NFT.metadata) {
          NFT.metadata = JSON.parse(NFT.metadata);
          NFT.image = resolveLink(NFT.metadata?.image);

          async function checkURL(url) {
            var request = new XMLHttpRequest();
            request.open("GET", url, true);
            request.send();
            request.onload = function () {
              let status = request.status;

              if (request.status !== 200) {
                //if(statusText !== OK)
                console.log("This is NOT reachable.");
                // Delete array instance
                NFT.image.replace(
                  url,
                  "https://i.postimg.cc/DZjyfNJy/Kondux-Logo-Press-Pack-Wide-4.jpg"
                );
              } else {
                //if(statusText === OK)
                console.log("This is reachable.");
                return url;
              }
            };
          }

          checkURL(NFT.image);
        } else if (NFT?.token_uri) {
          try {
            await fetch(
              `https://immense-brushlands-70914.herokuapp.com/${NFT.token_uri}`
            )
              .then((response) => response.json())
              .then((data) => {
                NFT.image = resolveLink(data.image);

                async function checkURL(url) {
                  var request = new XMLHttpRequest();
                  request.open("GET", url, true);
                  request.send();
                  request.onload = function () {
                    let status = request.status;

                    if (request.status !== 200) {
                      //if(statusText !== OK)
                      console.log("This is NOT reachable.");
                      // Delete array instance
                      NFT.image.replace(
                        url,
                        "https://i.postimg.cc/DZjyfNJy/Kondux-Logo-Press-Pack-Wide-4.jpg"
                      );
                    } else {
                      //if(statusText === OK)
                      console.log("This is reachable.");
                      return url;
                    }
                  };
                }

                checkURL(NFT.image);
              });
          } catch (error) {
            console.log(error);
          }
        }
      }
      console.log("THIS IS new allNFTs", allNFTs);

      if (NFTs?.result.length >= 1) {
        setTimeout(() => setTotalNFTs(allNFTs), 2000);
        console.log("THIS IS new totalNFTs", totalNFTs);
        setMode("init");
      }
    }
  };

  function getNFTBal(newNFTs) {
    // Logic for images array on gallery viewport
    newNFTs?.forEach((nft) => {
      nftImages.push(nft.image);
      nftNames.push(nft.name);
    });

    // console.log("THIS IS IMAGES", nftImages);
  }

  //Runs when no NFTCache

  useEffect(() => {
    // Needs to be clear to be able to view gallery canvas
    if (totalNFTs?.length >= 1) {
      getNFTBal(totalNFTs);
      console.log("FINAL", totalNFTs);
      saveNFTs(totalNFTs);
      setReady(true);
    }
    return;
  }, [totalNFTs]);

  // Saves nft cache to server
  const saveNFTs = async (nftBlob) => {
    user.set("nftCache", nftBlob);
    await user.save();
    console.log("nftCache saved");
  };

  //when clicked, show gallery canvas
  function unHide() {
    setHidden(true);
    console.log("Unhid");
  }

  function subMultiplier() {
    if (multiplier === 0) {
      return;
    } else {
      setMultiplier(multiplier - 8);
    }
  }

  function addMultiplier() {
    if (multiplier + 8 >= nftImages.length) {
      return;
    } else {
      setMultiplier(multiplier + 8);
    }
  }

  function total(number) {
    if (nftImages[number + count] === undefined) {
      return "https://i.postimg.cc/DZjyfNJy/Kondux-Logo-Press-Pack-Wide-4.jpg";
    } else {
      return nftImages[number + count];
    }
  }

  function getName(number) {
    if (nftNames[number + count] === undefined) {
      return "None";
    } else {
      return nftNames[number + count];
    }
  }

  function getID(number) {
    return number + count;
  }

  // Demo Button Logic
  function demoClicked() {
    setMode("demo");
    let demoCache = [
      {
        image: "https://i.postimg.cc/HLRvqcd5/pfp1.jpg",
        name: "Demo",
      },

      {
        image: "https://i.postimg.cc/8PNXgVQy/pfp10.jpg",
        name: "Demo",
      },
      {
        image: "https://i.postimg.cc/2j49tSJb/pfp11.jpg",
        name: "Demo",
      },

      {
        image: "https://i.postimg.cc/9Fb8WNcc/pfp16.jpg",
        name: "Demo",
      },

      {
        image: "https://i.postimg.cc/KjyqY6K8/pfp19.jpg",
        name: "Demo",
      },

      {
        image: "https://i.postimg.cc/FHKP1gK3/pfp21.jpg",
        name: "Demo",
      },

      {
        image: "https://i.postimg.cc/NMXCBsjn/pfp3.jpg",
        name: "Demo",
      },

      {
        image: "https://i.postimg.cc/Kjr930Lr/pfp6-1.jpg",
        name: "Demo",
      },

      {
        image: "https://i.postimg.cc/pTKC3s0b/pfp8.jpg",
        name: "Demo",
      },
    ];

    setTotalDemoNFTs(demoCache);
    console.log("This is demo NFTs", totalDemoNFTs);
  }

  useEffect(() => {
    if (totalDemoNFTs) {
      getNFTBal(totalDemoNFTs);
      console.log("This is nftCache Images", nftImages);
      setReady(true);
    }
  }, [totalDemoNFTs]);

  const images = [
    // Front
    // {
    //   position: [0, 0, 1.5],
    //   rotation: [0, 0, 0],
    //   url: total(0),
    // },
    // Back
    {
      position: [-0.8, 0, -0.6],
      rotation: [0, 0, 0],
      url: total(0),
      id: getID(0),
      name: getName(0),
    },
    {
      position: [0.8, 0, -0.6],
      rotation: [0, 0, 0],
      url: total(1),
      id: getID(1),
      name: getName(1),
    },

    // Left
    {
      position: [-1.75, 0, 0.25],
      rotation: [0, Math.PI / 2.5, 0],
      url: total(2),
      id: getID(2),
      name: getName(2),
    },
    {
      position: [-2.15, 0, 1.5],
      rotation: [0, Math.PI / 2.5, 0],
      url: total(3),
      id: getID(3),
      name: getName(3),
    },
    {
      position: [-2.55, 0, 2.75],
      rotation: [0, Math.PI / 2.5, 0],
      url: total(4),
      id: getID(4),
      name: getName(4),
    },

    // Right
    {
      position: [1.75, 0, 0.25],
      rotation: [0, -Math.PI / 2.5, 0],
      url: total(5),
      id: getID(5),
      name: getName(5),
    },
    {
      position: [2.15, 0, 1.5],
      rotation: [0, -Math.PI / 2.5, 0],
      url: total(6),
      id: getID(6),
      name: getName(6),
    },
    {
      position: [2.55, 0, 2.75],
      rotation: [0, -Math.PI / 2.5, 0],
      url: total(7),
      id: getID(7),
      name: getName(7),
    },
  ];

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

  return (
    <>
      <Flex d="column" justifyContent="center" alignItems="center">
        <Text
          style={{ fontFamily: "Poppins", marginTop: "15px" }}
          fontSize="5xl"
          fontWeight="medium"
          align="center"
        >
          3D NFT Gallery
        </Text>

        <Stack p={3} />
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          {/* WHEN IN INIT MODE */}
          {mode === "init" ? (
            <>
              {/* WHEN DONE */}

              {ready === true && hidden === true && nftImages?.length >= 1 ? (
                <>
                  <Container style={{ height: "35vh", width: "100vw" }}>
                    <Suspense fallback={null}>
                      <Gallery
                        images={images}
                        nftImages={nftImages.length}
                        // style={{ position: "fixed" }}
                      />
                    </Suspense>

                    {/* <HStack
                      style={{ top: "85vh" }}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <div className="icon-box">
                        <Button
                          color="primary-alta"
                          className="connectBtn"
                          size="small"
                          style={{
                            zIndex: 11,
                            position: "fixed",
                            // top: "90vh",
                            right: "65vw",
                            marginRight: "-23.4px",
                            top: "47vh",
                            padding: "15px",
                            // height: 46px;
                            // width: 46px;
                            cursor: "pointer",
                            display: "block",
                          }}
                          onClick={subMultiplier}
                        >
                          {String.fromCharCode(60)}
                        </Button>
                      </div>

                      <div className="icon-box">
                        <Button
                          color="primary-alta"
                          className="connectBtn"
                          size="small"
                          style={{
                            zIndex: 11,
                            position: "fixed",
                            // top: "90vh",
                            right: "35vw",
                            marginRight: "-23.4px",
                            top: "47vh",
                            padding: "15px",
                            // height: 46px;
                            // width: 46px;
                            cursor: "pointer",
                            display: "block",
                          }}
                          onClick={addMultiplier}
                        >
                          {String.fromCharCode(62)}
                        </Button>
                      </div>
                    </HStack> */}
                  </Container>
                </>
              ) : (
                <>
                  <Box p={1}>
                    <Flex justify="center" align="center">
                      <Button
                        // className="border-animation__inner"
                        style={{
                          height: "35vh",
                          width: "90vw",
                          borderRadius: "30px",
                        }}
                        // variant="ghost-on-accent"
                        justify="center"
                        // width="full"
                        onClick={() => setHidden(true)}
                        align="center"
                      >
                        <Container justify="center" align="center">
                          <Flex d="column" justify="center" align="center">
                            <Stack p={2} />
                            {totalNFTs?.length >= 1 ? (
                              <>
                                {" "}
                                <Text
                                  className="enter_text"
                                  fontSize="7xl"
                                  fontWeight="medium"
                                  wrap="wrap"
                                  align="center"
                                  justify="center"
                                  color={color}
                                >
                                  {walletStatus}
                                  <br /> TO VIEW GALLERY
                                </Text>
                              </>
                            ) : (
                              <></>
                            )}

                            <Stack p={2} />
                          </Flex>
                          {/* <Icon
                      className="Icons"
                      as={GiAbstract050}
                      boxSize="6"
                      color="on-accent-subtle"
                    /> */}
                        </Container>
                      </Button>
                    </Flex>
                  </Box>
                </>
              )}
            </>
          ) : (
            <></>
          )}

          {/* WHEN IN CACHE MODE */}
          {mode === "cache" ? (
            <>
              {/* WHEN DONE */}

              {ready === true && hidden === true && nftImages?.length >= 1 ? (
                <>
                  <Container style={{ height: "35vh", width: "100vw" }}>
                    <Suspense fallback={null}>
                      <Gallery
                        images={images}
                        nftImages={nftImages.length}
                        // style={{ position: "fixed" }}
                      />
                    </Suspense>
                    {/* <HStack
                      style={{ top: "85vh" }}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <div className="icon-box">
                        <Button
                          color="primary-alta"
                          className="connectBtn"
                          size="small"
                          style={{
                            zIndex: 11,
                            position: "fixed",
                            // top: "90vh",
                            right: "65vw",
                            top: "47vh",
                            marginRight: "-23.4px",
                            // height: 46px;
                            // width: 46px;
                            padding: "15px",
                            cursor: "pointer",
                            display: "block",
                          }}
                          onClick={subMultiplier}
                        >
                          {String.fromCharCode(60)}
                        </Button>
                      </div>

                      <div className="icon-box">
                        <Button
                          color="primary-alta"
                          className="connectBtn"
                          size="small"
                          style={{
                            zIndex: 11,
                            position: "fixed",
                            // top: "90vh",
                            right: "35vw",
                            marginRight: "-23.4px",
                            top: "47vh",
                            padding: "15px",
                            // height: 46px;
                            // width: 46px;
                            cursor: "pointer",
                            display: "block",
                          }}
                          onClick={addMultiplier}
                        >
                          {String.fromCharCode(62)}
                        </Button>
                      </div>
                    </HStack> */}
                  </Container>
                </>
              ) : (
                <>
                  <Box p={1}>
                    <Flex justify="center" align="center">
                      <Button
                        // className="border-animation__inner"
                        style={{
                          height: "35vh",
                          width: "90vw",
                          borderRadius: "30px",
                        }}
                        // variant="ghost-on-accent"
                        justify="center"
                        // width="full"
                        onClick={() => setHidden(true)}
                        align="center"
                      >
                        <Container justify="center" align="center">
                          <Flex d="column" justify="center" align="center">
                            <Stack p={2} />
                            {totalCacheNFTs?.length >= 1 ? (
                              <>
                                {" "}
                                <Text
                                  className="enter_text"
                                  fontSize="7xl"
                                  fontWeight="medium"
                                  wrap="wrap"
                                  align="center"
                                  justify="center"
                                  color={color}
                                >
                                  {walletStatus}
                                  <br /> TO VIEW GALLERY
                                </Text>
                              </>
                            ) : (
                              <></>
                            )}

                            <Stack p={2} />
                          </Flex>
                          {/* <Icon
                      className="Icons"
                      as={GiAbstract050}
                      boxSize="6"
                      color="on-accent-subtle"
                    /> */}
                        </Container>
                      </Button>
                    </Flex>
                  </Box>
                </>
              )}
            </>
          ) : (
            <></>
          )}

          {/* WHEN IN DEMO MODE */}
          {mode === "demo" ? (
            <>
              {/* WHEN DONE */}

              {ready === true && hidden === true && nftImages?.length >= 1 ? (
                <>
                  <Container style={{ height: "35vh", width: "100vw" }}>
                    <Suspense fallback={null}>
                      <Gallery
                        images={images}
                        // style={{ position: "fixed" }}
                      />
                    </Suspense>

                    {/* <HStack
                      style={{ top: "85vh" }}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <div className="icon-box">
                        <Button
                          color="primary-alta"
                          className="connectBtn"
                          size="small"
                          style={{
                            zIndex: 11,
                            position: "fixed",
                            // top: "90vh",
                            right: "65vw",
                            top: "47vh",
                            // height: 46px;
                            // width: 46px;
                            padding: "15px",
                            cursor: "pointer",
                            display: "block",
                          }}
                          onClick={subMultiplier}
                        >
                          {String.fromCharCode(60)}
                        </Button>
                      </div>

                      <div className="icon-box">
                        <Button
                          color="primary-alta"
                          className="connectBtn"
                          size="small"
                          style={{
                            zIndex: 11,
                            position: "fixed",
                            // top: "90vh",
                            right: "35vw",
                            top: "47vh",
                            // height: 46px;
                            padding: "15px",
                            // width: 46px;
                            cursor: "pointer",
                            display: "block",
                          }}
                          onClick={addMultiplier}
                        >
                          {String.fromCharCode(62)}
                        </Button>
                      </div>
                    </HStack> */}
                  </Container>
                </>
              ) : (
                <>
                  <Box p={1}>
                    <Flex justify="center" align="center">
                      <Button
                        // className="border-animation__inner"
                        style={{
                          height: "35vh",
                          width: "90vw",
                          borderRadius: "30px",
                        }}
                        // variant="ghost-on-accent"
                        justify="center"
                        // width="full"
                        // onClick={() => setHidden(true)}
                        align="center"
                      >
                        <Container justify="center" align="center">
                          <Flex d="column" justify="center" align="center">
                            <Stack p={2} />
                            {totalDemoNFTs?.length >= 1 ? (
                              <>
                                {" "}
                                <Text
                                  onClick={() => setHidden(true)}
                                  className="enter_text"
                                  fontSize="7xl"
                                  fontWeight="medium"
                                  wrap="wrap"
                                  align="center"
                                  justify="center"
                                  color={color}
                                >
                                  {walletStatus}
                                  <br /> TO VIEW GALLERY
                                </Text>
                              </>
                            ) : (
                              <></>
                            )}

                            <Stack p={2} />
                          </Flex>
                          {/* <Icon
                      className="Icons"
                      as={GiAbstract050}
                      boxSize="6"
                      color="on-accent-subtle"
                    /> */}
                        </Container>
                      </Button>
                    </Flex>
                  </Box>
                </>
              )}
            </>
          ) : (
            <></>
          )}
        </Flex>

        <Divider m={10} width="inherit" />

        <Flex style={{ width: "90vw" }} justifyContent="center">
          <Spin spinning={loading}>
            <div style={styles.Scroll}>
              <Flex style={styles.NFTs}>
                {mode === "init" ? (
                  <>
                    {totalNFTs?.length !== undefined &&
                    totalNFTs?.length >= 1 ? (
                      <>
                        <BrowserView>
                          <PaginatedItems
                            filterArray={totalNFTs}
                            itemsPerPage={8}
                          />
                        </BrowserView>
                      </>
                    ) : (
                      <>
                        <Center>
                          No NFTs found! <br></br> Either you really have no
                          NFTs, or our AI system is still gathering all your NFT
                          data.
                          <br></br>
                          Please click another tab and then click back to
                          Gallery to refresh. <br></br> Else, click on the
                          "Demo" button above!
                        </Center>

                        <Button
                          size="lg"
                          style={{
                            textAlign: "center",
                            zIndex: 1,
                            position: "fixed",
                            top: "40vh",
                            right: "50vw",
                            marginRight: "-46.65px",
                          }}
                          onClick={() => demoClicked()}
                        >
                          DEMO
                        </Button>
                      </>
                    )}
                  </>
                ) : (
                  <></>
                )}

                {mode === "cache" ? (
                  <>
                    {totalCacheNFTs?.length !== undefined &&
                    totalCacheNFTs?.length >= 1 ? (
                      <>
                        <BrowserView>
                          <PaginatedItems
                            filterArray={totalCacheNFTs}
                            itemsPerPage={8}
                          />
                        </BrowserView>
                      </>
                    ) : (
                      <>
                        <Center>
                          No NFTs found! <br></br> Either you really have no
                          NFTs, or our AI system is still gathering all your NFT
                          data.
                          <br></br>
                          Please click another tab and then click back to
                          Gallery to refresh. <br></br> Else, click on the
                          "Demo" button above!
                        </Center>

                        <Button
                          size="lg"
                          style={{
                            textAlign: "center",
                            zIndex: 1,
                            position: "fixed",
                            top: "40vh",
                            right: "50vw",
                            marginRight: "-46.65px",
                          }}
                          onClick={() => demoClicked()}
                        >
                          DEMO
                        </Button>
                      </>
                    )}
                  </>
                ) : (
                  <></>
                )}

                {mode === "demo" ? (
                  <>
                    {totalDemoNFTs?.length !== undefined &&
                    totalDemoNFTs?.length >= 1 ? (
                      <>
                        <BrowserView>
                          <Container style={{ width: "100vw" }}>
                            <Flex
                              direction="row"
                              justifyContent="center"
                              style={{ gap: "25px" }}
                            >
                              {totalDemoNFTs?.map((nft, index) => (
                                <Card
                                  hoverable
                                  actions={[
                                    <Tooltip title="View On Blockexplorer">
                                      <FileSearchOutlined
                                        onClick={() =>
                                          window.open(
                                            `https://etherscan.io/nft/${nft?.token_address}/${nft?.token_id}`,
                                            "_blank"
                                          )
                                        }
                                      />
                                    </Tooltip>,
                                  ]}
                                  style={{
                                    width: 120,
                                    border: "2px solid #e7eaf3",
                                  }}
                                  cover={
                                    <Image
                                      preview={false}
                                      src={nft?.image || "error"}
                                      fallback="Loading..."
                                      alt=""
                                      style={{
                                        height: "120px",
                                        objectFit: "cover",
                                      }}
                                    />
                                  }
                                  key={index}
                                >
                                  <Meta
                                    title={nft.name}
                                    description={nft.contract_type}
                                  />
                                </Card>
                              ))}{" "}
                            </Flex>
                          </Container>
                        </BrowserView>
                      </>
                    ) : (
                      <>
                        <Center>
                          No NFTs found! <br></br> Either you really have no
                          NFTs, or our AI system is still gathering all your NFT
                          data.
                          <br></br>
                          Please click another tab and then click back to
                          Gallery to refresh. <br></br> Else, click on the
                          "Demo" button above!
                        </Center>

                        <Button
                          size="lg"
                          style={{
                            textAlign: "center",
                            zIndex: 1,
                            position: "fixed",
                            top: "40vh",
                            right: "50vw",
                            marginRight: "-46.65px",
                          }}
                          onClick={() => demoClicked()}
                        >
                          DEMO
                        </Button>
                      </>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </Flex>
            </div>
          </Spin>
        </Flex>

        {/* <Box style={{ textAlign: "center" }}>
          <Footer />
        </Box> */}
      </Flex>
      {/* <Routes>
        <Route path="/" />
      </Routes> */}
    </>
  );
}

export default NFTBalance;
