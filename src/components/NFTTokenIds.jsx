import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  Stack,
  Text,
  Modal,
  Alert,
  Tooltip,
  Badge,
  Divider,
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react";

import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import { getNativeByChain } from "helpers/networks";
import { getCollectionsByChain } from "helpers/collections";
import CyGreyImg from "../components/Images/CyGrey.png";
import ETHlogo from "../components/Images/ethereum logo.svg";
import {
  useMoralis,
  useMoralisQuery,
  useNewMoralisObject,
} from "react-moralis";
import { Card, Spin } from "antd";
import { useNFTTokenIds } from "hooks/useNFTTokenIds";
import {
  FileSearchOutlined,
  RightCircleOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { getExplorer } from "helpers/networks";
import { useWeb3ExecuteFunction } from "react-moralis";
const { Meta } = Card;

const styles = {
  NFTs: {
    display: "flex",
    flexWrap: "wrap",
    WebkitBoxPack: "start",
    justifyContent: "center",
    margin: "0 auto",
    maxWidth: "1250px",
    gap: "10px",
  },
  banner: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: "0 auto",
    width: "600px",
    //borderRadius: "10px",
    height: "150px",
    marginBottom: "40px",
    paddingBottom: "20px",
    borderBottom: "solid 1px #e3e3e3",
  },
  logo: {
    height: "115px",
    width: "115px",
    borderRadius: "50%",
    // positon: "relative",
    // marginTop: "-80px",
    border: "solid 4px white",
  },
  text: {
    color: "#041836",
    fontSize: "27px",
    fontWeight: "bold",
  },
};

function NFTTokenIds({ inputValue, setInputValue }) {
  const fallbackImg = "Loading...";
  const { NFTTokenIds, totalNFTs, fetchSuccess } = useNFTTokenIds(inputValue);
  const [visible, setVisibility] = useState(false);
  const [nftToBuy, setNftToBuy] = useState(null);
  const [loading, setLoading] = useState(false);
  const contractProcessor = useWeb3ExecuteFunction();
  const { chainId, marketAddress, contractABI, walletAddress } =
    useMoralisDapp();
  const nativeName = getNativeByChain(chainId);
  const contractABIJson = contractABI;
  const { Moralis } = useMoralis();
  const queryMarketItems = useMoralisQuery("MarketItems");
  const fetchMarketItems = JSON.parse(
    JSON.stringify(queryMarketItems.data, [
      "objectId",
      "createdAt",
      "price",
      "nftContract",
      "itemId",
      "sold",
      "tokenId",
      "seller",
      "owner",
      "confirmed",
    ])
  );
  const purchaseItemFunction = "createMarketSale";
  const NFTCollections = getCollectionsByChain(chainId);

  async function purchase() {
    setLoading(true);
    const tokenDetails = getMarketItem(nftToBuy);
    const itemID = tokenDetails.itemId;
    const tokenPrice = tokenDetails.price;
    const ops = {
      contractAddress: marketAddress,
      functionName: purchaseItemFunction,
      abi: contractABIJson,
      params: {
        nftContract: nftToBuy.token_address,
        itemId: itemID,
      },
      msgValue: tokenPrice,
    };

    await contractProcessor.fetch({
      params: ops,
      onSuccess: () => {
        console.log("success");
        setLoading(false);
        setVisibility(false);
        updateSoldMarketItem();
        succPurchase();
      },
      onError: (error) => {
        setLoading(false);
        failPurchase();
      },
    });
  }

  const handleBuyClick = (nft) => {
    setNftToBuy(nft);
    console.log(nft.image);
    setVisibility(true);
  };

  function succPurchase() {
    let secondsToGo = 5;
    const modal = Modal.success({
      title: "Success!",
      content: `You have purchased this NFT`,
    });
    setTimeout(() => {
      modal.destroy();
    }, secondsToGo * 1000);
  }

  function failPurchase() {
    let secondsToGo = 5;
    const modal = Modal.error({
      title: "Error!",
      content: `There was a problem when purchasing this NFT`,
    });
    setTimeout(() => {
      modal.destroy();
    }, secondsToGo * 1000);
  }

  async function updateSoldMarketItem() {
    const id = getMarketItem(nftToBuy).objectId;
    const marketList = Moralis.Object.extend("MarketItems");
    const query = new Moralis.Query(marketList);
    await query.get(id).then((obj) => {
      obj.set("sold", true);
      obj.set("owner", walletAddress);
      obj.save();
    });
  }

  const getMarketItem = (nft) => {
    const result = fetchMarketItems?.find(
      (e) =>
        e.nftContract === nft?.token_address &&
        e.tokenId === nft?.token_id &&
        e.sold === false &&
        e.confirmed === true
    );
    return result;
  };

  return (
    <>
      <div>
        <Box>
          <Container py={{ base: "16", md: "24" }}>
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={{ base: "12", lg: "16" }}
              align="center"
              justify="center"
            >
              <Stack
                spacing={{ base: "8", md: "10" }}
                width="full"
                justify="center"
              >
                <Stack spacing={{ base: "4", md: "6" }}>
                  <Heading
                    color="white"
                    size={useBreakpointValue({ base: "md", md: "xl" })}
                  >
                    Welcome to the <br />
                    Kondux Marketplace
                  </Heading>
                  <Text fontSize={{ base: "lg", md: "xl" }}>
                    Browse, buy, mint and view your NFT collection
                  </Text>
                </Stack>
                <Stack
                  direction={{ base: "column-reverse", md: "row" }}
                  spacing="3"
                >
                  <NavLink to="/Viewport">
                    <Button
                      width="full"
                      justifyContent="center"
                      // variant="secondary"
                      size="md"
                      bgGradient={["linear(to-b,  #E702BF, #300D50)"]}
                      style={{
                        borderRadius: "100px",
                        padding: "0px 25px",
                      }}
                    >
                      <HStack spacing="3">
                        {/* <Icon
                        as={Gi3DGlasses}
                        boxSize="6"
                        color="on-accent-subtle"
                      /> */}
                        <Text color="white">OPEN VIEWPORT</Text>
                      </HStack>
                    </Button>
                  </NavLink>

                  {/* <Button variant="primary" size="lg">
                    Start free trial
                  </Button> */}
                </Stack>
              </Stack>

              <Card
                hoverable
                actions={[
                  <Text>Kondux</Text>,
                  <div>
                    <Box d="flex" justifyContent="center">
                      <HStack>
                        <Image
                          src={`${ETHlogo}`}
                          width="10px"
                          onClick={() => setInputValue("NFT ADDY")}
                        />
                        <Text>2</Text>
                      </HStack>
                    </Box>
                  </div>,
                ]}
                style={{
                  width: 324,
                  border: "2px solid #e7eaf3",
                  borderRadius: "20px",
                  padding: "12px",
                }}
                cover={
                  <Image
                    preview="false"
                    src={`${CyGreyImg}` || "error"}
                    fallback={fallbackImg}
                    alt=""
                    style={{
                      height: "300px",
                      borderRadius: "13px",
                    }}
                  />
                }
              >
                <Meta title={"DISCLOSURE KNFT COLLECTION"} />
              </Card>

              {/* <Image
                width="full"
                height={{ base: "auto", md: "lg" }}
                objectFit="cover"
                src="https://images.unsplash.com/photo-1600188769045-bc6026bfc8cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              /> */}
            </Stack>
          </Container>
        </Box>

        <Container py={{ base: "4", md: "8" }}>
          <HStack>
            <Divider />
            <Text fontSize="lg" fontWeight="medium" whiteSpace="nowrap">
              EXPLORE NFT COLLECTIONS
            </Text>
            <Divider />
          </HStack>
        </Container>

        {contractABIJson.noContractDeployed && (
          <>
            <Alert
              message="No Smart Contract Details Provided. Please deploy smart contract and provide address + ABI in the MoralisDappProvider.js file"
              type="error"
            />
            <div style={{ marginBottom: "10px" }}></div>
          </>
        )}

        {inputValue !== "explore" && totalNFTs !== undefined && (
          <>
            {!fetchSuccess && (
              <>
                <Alert
                  message="Unable to fetch all NFT metadata... Please refresh again."
                  type="warning"
                />
                <div style={{ marginBottom: "10px" }}></div>
              </>
            )}

            <div style={styles.banner}>
              <Image
                preview="false"
                src={NFTTokenIds[0]?.image || "error"}
                fallback={fallbackImg}
                alt=""
                style={styles.logo}
              />
              <div style={styles.text}>
                <>
                  <div>{`${NFTTokenIds[0]?.name}`}</div>
                  <div
                    style={{
                      fontSize: "15px",
                      color: "#9c9c9c",
                      fontWeight: "normal",
                    }}
                  >
                    Collection Size: {`${totalNFTs}`}
                  </div>
                </>
              </div>
            </div>
          </>
        )}

        <div style={styles.NFTs}>
          {inputValue === "explore" &&
            NFTCollections?.map((nft, index) => (
              <Card
                hoverable
                actions={[
                  <Text>{nft.desc}</Text>,
                  <div>
                    <Box d="flex" justifyContent="center">
                      <HStack>
                        <Image
                          src={`${ETHlogo}`}
                          width="10px"
                          onClick={() => setInputValue(nft?.addrs)}
                        />
                        <Text>{nft.price}</Text>
                      </HStack>
                    </Box>
                  </div>,
                ]}
                style={{
                  width: "270px",
                  border: "2px solid #e7eaf3",
                  borderRadius: "20px",
                  padding: "10px",
                  margin: "2.5px",
                }}
                cover={
                  <Image
                    preview="false"
                    src={nft.image || "error"}
                    fallback={fallbackImg}
                    alt=""
                    style={{
                      height: "250px",
                      objectFit: "cover",
                      borderRadius: "13px",
                    }}
                  />
                }
                key={index}
              >
                <Meta title={nft.name} />
              </Card>
            ))}

          {inputValue !== "explore" &&
            NFTTokenIds.slice(0, 20).map((nft, index) => (
              <Card
                hoverable
                actions={[
                  <Tooltip title="View On Blockexplorer">
                    <FileSearchOutlined
                      onClick={() =>
                        window.open(
                          `${getExplorer(chainId)}address/${nft.token_address}`,
                          "_blank"
                        )
                      }
                    />
                  </Tooltip>,
                  <Tooltip title="Buy NFT">
                    <ShoppingCartOutlined onClick={() => handleBuyClick(nft)} />
                  </Tooltip>,
                ]}
                style={{ width: 240, border: "2px solid #e7eaf3" }}
                cover={
                  <Image
                    preview="false"
                    src={nft.image || "error"}
                    fallback={fallbackImg}
                    alt=""
                    style={{ height: "240px", objectFit: "cover" }}
                  />
                }
                key={index}
              >
                {getMarketItem(nft) && (
                  <Badge.Ribbon text="Buy Now" color="green"></Badge.Ribbon>
                )}
                <Meta title={nft.name} description={`#${nft.token_id}`} />
              </Card>
            ))}
        </div>

        {getMarketItem(nftToBuy) ? (
          <Modal
            title={`Buy ${nftToBuy?.name} #${nftToBuy?.token_id}`}
            visible={visible}
            onCancel={() => setVisibility(false)}
            onOk={() => purchase()}
            okText="Buy"
          >
            <Spin spinning={loading}>
              <div
                style={{
                  width: "250px",
                  margin: "auto",
                }}
              >
                <Badge.Ribbon
                  color="green"
                  text={`${
                    getMarketItem(nftToBuy).price / ("1e" + 18)
                  } ${nativeName}`}
                >
                  <img
                    src={nftToBuy?.image}
                    style={{
                      width: "250px",
                      borderRadius: "10px",
                      marginBottom: "15px",
                    }}
                  />
                </Badge.Ribbon>
              </div>
            </Spin>
          </Modal>
        ) : (
          <Modal
            title={`Buy ${nftToBuy?.name} #${nftToBuy?.token_id}`}
            visible={visible}
            onCancel={() => setVisibility(false)}
            onOk={() => setVisibility(false)}
          >
            <img
              src={nftToBuy?.image}
              style={{
                width: "250px",
                margin: "auto",
                borderRadius: "10px",
                marginBottom: "15px",
              }}
            />
            <Alert
              message="This NFT is currently not for sale"
              type="warning"
            />
          </Modal>
        )}
      </div>
    </>
  );
}

export default NFTTokenIds;
