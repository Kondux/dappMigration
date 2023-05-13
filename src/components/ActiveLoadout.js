import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  chakra,
  Spacer,
  Flex,
  VStack,
  HStack,
  useColorMode,
  propNames,
  Center,
} from "@chakra-ui/react";
import { Card, Skeleton } from "antd";
// import {
//   FileSearchOutlined,
//   SendOutlined,
//   ShoppingCartOutlined,
//   SolutionOutlined,
// } from "@ant-design/icons";
import "react-awesome-button/dist/themes/theme-blue.css";
import { AwesomeButtonProgress } from "react-awesome-button";
// import { getExplorer } from "../helpers/networks";
import { useMoralis, useMoralisQuery } from "react-moralis";
import Moralis2 from "moralis";
// import { EvmChain } from "@moralisweb3/evm-utils";
import Moralis from "moralis-v1";
import { Scrollbars } from "react-custom-scrollbars-2";
// import { useVerifyMetadata } from "../hooks/useVerifyMetadata";
// import { useNFTBalance } from "../hooks/useNFTBalance";

function ActiveLoadout() {
  const { isInitialized, isAuthenticated, user, chainId } = useMoralis();

  const ethAddress = user.get("ethAddress");
  let capName = user.get("username");
  const [metaData, setMetaData] = useState({});
  const [kNFTsOwned, setKNFTsOwned] = useState(undefined);

  const [bgData, setBgData] = useState({});
  const [musicData, setMusicData] = useState({});
  const [avatarData, setAvatarData] = useState({});

  const [skinData, setSkinData] = useState({});
  const [headData, setHeadData] = useState({});
  const [eyesData, setEyesData] = useState({});
  const [magData, setMagData] = useState({});
  const [armorData, setArmorData] = useState({});
  const [weaponData, setWeaponData] = useState({});

  const [upperBodyData, setUpperBodyData] = useState({});
  const [leftHandData, setLeftHandData] = useState({});
  const [rightHandData, setRightHandData] = useState({});
  const [lowerBodyData, setLowerBodyData] = useState({});
  const [backData, setBackData] = useState({});

  // const { data: NFTBalances } = useNFTBalance();
  // const { verifyMetadata } = useVerifyMetadata();
  const { colorMode, toggleColorMode } = useColorMode();

  const { Meta } = Card;

  const noneTemplate = {
    name: "None",
    thumbnail: "https://i.ibb.co/ftPXPjS/none-icon-1.jpg",
    link: "",
  };

  // runs on mount
  // checks to see if user is new, else runs live updates
  useEffect(() => {
    isNewUser();
  }, []);

  // Checks to see if current user is a new user (first time wallet connect to app)
  const isNewUser = async () => {
    const User = Moralis.Object.extend("User");
    const query = new Moralis.Query(User);
    //need to check newUser = true
    // console.log("THIS IS NEW USER FUNCTION query", query);
    query.equalTo("ethAddress", ethAddress);
    const results = await query.first();
    // console.log("THIS IS NEW USER FUNCTION results", results);
    let finalResult = parseFunctionNewUser(results);
    // console.log("THIS IS NEW USER FUNCTION finalResult", finalResult);

    if (finalResult.newUser !== false) {
      // Create all blank none templates in backend
      alert(
        'Hello New User, for an optimal experience, please update your "User Name" in the User Settings!'
      );
      // console.log("NEW USER");

      //NEW OPTIMIZED FLOW WITH NEW CLASS, METADATA
      const newMetadata = new Moralis.Object("Metadata");
      newMetadata.set("ethAddress", ethAddress);

      // Check wallet for kNFTs
      // await fetchNFTsForContract();

      newMetadata.set("Chain", {
        chain: chainId,
      });

      newMetadata.set("Background", {
        type: "Background",
        name: "None",
        thumbnail: "https://i.ibb.co/ftPXPjS/none-icon-1.jpg",
        link: "",
      });
      newMetadata.set("Music", {
        type: "Music",
        name: "None",
        thumbnail: "https://i.ibb.co/ftPXPjS/none-icon-1.jpg",
        link: "",
      });
      newMetadata.set("Avatar", {
        type: "Avatar",
        name: "None",
        token_id: "",
        thumbnail: "https://i.ibb.co/ftPXPjS/none-icon-1.jpg",
        link: "",
      });
      newMetadata.set("Skin", {
        type: "Skin",
        name: "None",
        thumbnail: "https://i.ibb.co/ftPXPjS/none-icon-1.jpg",
        link: "",
      });

      newMetadata.set("Eyes", {
        type: "Eyes",
        name: "None",
        thumbnail: "https://i.ibb.co/ftPXPjS/none-icon-1.jpg",
        link: "",
      });

      // newMetadata.set("Mag", {
      //   type: "Mag",
      //   name: "None",
      //   thumbnail: "https://i.ibb.co/ftPXPjS/none-icon-1.jpg",
      //   link: "",
      // });

      newMetadata.set("Armor", {
        type: "Armor",
        name: "None",
        thumbnail: "https://i.ibb.co/ftPXPjS/none-icon-1.jpg",
        link: "",
      });

      newMetadata.set("Head", {
        type: "Head",
        name: "None",
        thumbnail: "https://i.ibb.co/ftPXPjS/none-icon-1.jpg",
        link: "",
      });

      newMetadata.set("Weapon", {
        type: "Weapon",
        name: "None",
        thumbnail: "https://i.ibb.co/ftPXPjS/none-icon-1.jpg",
        link: "",
      });
      // newMetadata.set("UpperBody", {
      //   type: "Upper Body",
      //   name: "None",
      //   thumbnail: "https://i.ibb.co/ftPXPjS/none-icon-1.jpg",
      //   link: "",
      // });
      // newMetadata.set("LeftHand", {
      //   type: "Left Hand",
      //   name: "None",
      //   thumbnail: "https://i.ibb.co/ftPXPjS/none-icon-1.jpg",
      //   link: "",
      // });
      // newMetadata.set("RightHand", {
      //   type: "Right Hand",
      //   name: "None",
      //   thumbnail: "https://i.ibb.co/ftPXPjS/none-icon-1.jpg",
      //   link: "",
      // });
      // newMetadata.set("LowerBody", {
      //   type: "Lower Body",
      //   name: "None",
      //   thumbnail: "https://i.ibb.co/ftPXPjS/none-icon-1.jpg",
      //   link: "",
      // });
      // newMetadata.set("Back", {
      //   type: "Back",
      //   name: "None",
      //   thumbnail: "https://i.ibb.co/ftPXPjS/none-icon-1.jpg",
      //   link: "",
      // });

      await newMetadata.save();

      // Sets each data category locally
      setBgData({
        type: "Background",
        name: "None",
        thumbnail: "https://i.ibb.co/ftPXPjS/none-icon-1.jpg",
        link: "",
      });

      setMusicData({
        type: "Music",
        name: "None",
        thumbnail: "https://i.ibb.co/ftPXPjS/none-icon-1.jpg",
        link: "",
      });

      setAvatarData({
        type: "Avatar",
        name: "None",
        token_id: "",
        thumbnail: "https://i.ibb.co/ftPXPjS/none-icon-1.jpg",
        link: "",
      });

      setSkinData({
        type: "Skin",
        name: "None",
        thumbnail: "https://i.ibb.co/ftPXPjS/none-icon-1.jpg",
        link: "",
      });

      setHeadData({
        type: "Head",
        name: "None",
        thumbnail: "https://i.ibb.co/ftPXPjS/none-icon-1.jpg",
        link: "",
      });

      setEyesData({
        type: "Eyes",
        name: "None",
        thumbnail: "https://i.ibb.co/ftPXPjS/none-icon-1.jpg",
        link: "",
      });

      setMagData({
        type: "Mag",
        name: "None",
        thumbnail: "https://i.ibb.co/ftPXPjS/none-icon-1.jpg",
        link: "",
      });

      setArmorData({
        type: "Armor",
        name: "None",
        thumbnail: "https://i.ibb.co/ftPXPjS/none-icon-1.jpg",
        link: "",
      });

      setWeaponData({
        type: "Weapon",
        name: "None",
        thumbnail: "https://i.ibb.co/ftPXPjS/none-icon-1.jpg",
        link: "",
      });

      // setUpperBodyData({
      //   type: "Upper Body",
      //   name: "None",
      //   thumbnail: "https://i.ibb.co/ftPXPjS/none-icon-1.jpg",
      //   link: "",
      // });

      // setLeftHandData({
      //   type: "Left Hand",
      //   name: "None",
      //   thumbnail: "https://i.ibb.co/ftPXPjS/none-icon-1.jpg",
      //   link: "",
      // });

      // setRightHandData({
      //   type: "Right Hand",
      //   name: "None",
      //   thumbnail: "https://i.ibb.co/ftPXPjS/none-icon-1.jpg",
      //   link: "",
      // });

      // setLowerBodyData({
      //   type: "Lower Body",
      //   name: "None",
      //   thumbnail: "https://i.ibb.co/ftPXPjS/none-icon-1.jpg",
      //   link: "",
      // });

      // setBackData({
      //   type: "Back",
      //   name: "None",
      //   thumbnail: "https://i.ibb.co/ftPXPjS/none-icon-1.jpg",
      //   link: "",
      // });

      // Turn on subscriptions for each dataset

      await getBGDataLive();
      await getMusicDataLive();
      await getAvatarDataLive();
      await getSkinDataLive();
      await getHeadDataLive();
      await getEyesDataLive();
      await getMagDataLive();
      await getArmorDataLive();
      await getWeaponDataLive();

      // await getHeadDataLive();
      // await getUpperBodyDataLive();
      // await getLeftHandDataLive();
      // await getRightHandDataLive();
      // await getLowerBodyDataLive();
      // await getBackDataLive();
      // console.log("Made fresh instance in Moralis!");

      //Sets newUser to false on backend and saves it
      results.set("newUser", false);
      await results.save();
      //-----end of newUser----///
    } else {
      //----If not newUser----//
      // console.log("NOT NEW USER");

      // alert(`Welcome back ${capName}!`);

      // Get latest KNFTdata from backend and cache local
      // await getKNFTdata();

      // Get latest metadata from backend and sorts it to local
      await getMetadata();
      await getAvatarDataLive();

      //Check if box is in current wallet
      await checkActiveBox();

      // Init live updates

      await getBGDataLive();
      await getMusicDataLive();
      await getSkinDataLive();
      await getHeadDataLive();
      await getEyesDataLive();
      await getMagDataLive();
      await getArmorDataLive();
      await getWeaponDataLive();

      // await getHeadDataLive();
      // await getUpperBodyDataLive();
      // await getLeftHandDataLive();
      // await getRightHandDataLive();
      // await getLowerBodyDataLive();
      // await getBackDataLive();
    }
  };

  // Need to make logic to check wallet address and see if they have nfts from contract address (Copy metadata)
  // After, if the data is new, cache Metadata in Moralis
  // If not new, pull data from cache

  // ------- Function to check wallet for kNFTs (New User)-------------///
  const fetchNFTsForContract = async () => {
    const options = {
      method: "GET",
      url: `https://deep-index.moralis.io/api/v2/${ethAddress}/nft`,
      params: {
        chain: "eth",
        format: "decimal",
        token_addresses: "0x7eD509A69F7FD93fD59A557369a9a5dCc1499685",
      },
      headers: { accept: "application/json", "X-API-Key": "test" },
    };

    await axios
      .request(options)
      .then(function (response) {
        // console.log("This is res: ", response.data.result);
        cacheKNFTs(response.data.result);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  // ------- Function to check wallet for kNFTs (Current User) -------------///
  // const fetchCurrentNFTs = async (currentData) => {
  //   const options = {
  //     method: "GET",
  //     url: "https://deep-index.moralis.io/api/v2/0x7c1b53C6E9FECD6112a3b156457Ac6aBa1135F82/nft",
  //     params: {
  //       chain: "rinkeby",
  //       format: "decimal",
  //       token_addresses: "0x73f4a261197f0d4cbc2fc349e18f2583cccc032a",
  //     },
  //     headers: { accept: "application/json", "X-API-Key": "test" },
  //   };

  //   await axios
  //     .request(options)
  //     .then(function (response) {
  //       // console.log("This is res: ", response.data.result);
  //       checkKNFTs(response.data.result, currentData);
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  // };

  // ------- Function to cache KNFTs to Backend-------------///
  const cacheKNFTs = async (res) => {
    if (res !== undefined) {
      // We have a new user
      // We cache this
      const newKNFTOwned = new Moralis.Object("KNFT");

      newKNFTOwned.set("ethAddress", ethAddress);
      newKNFTOwned.set("Chain", {
        chain: chainId,
      });

      //Array of cached KNFTs
      newKNFTOwned.set("Owned", res);
      newKNFTOwned.set("Amount", res.length);
      await newKNFTOwned.save();
      // console.log("KNFTS cached!");
    } else {
      // console.log("Does not have any KNFTS.");
      return;
    }
  };

  // ------- Function to cache KNFTs to Backend-------------///
  const checkKNFTs = async (res, currentData) => {
    // console.log("THIS IS RES", res);
    // console.log("THIS IS currentData", currentData);
    // console.log("THIS IS kNFTOwn", kNFTsOwned);

    if (res.Amount > 0) {
      // We have a user with cached KNFTS
      if (res.length !== currentData.Amount) {
        // If current length of KNFTs is different
        // Then update

        // Need to reference instance in backend
        const newKNFTOwned = Moralis.Object.extend("KNFT");
        const query = new Moralis.Query(newKNFTOwned);
        query.equalTo("ethAddress", ethAddress);
        const results = await query.first();

        // update that data
        results.set("Owned", res);
        results.set("Amount", res.length);
        await results.save();

        // console.log("Some new KNFTs.");
      } else {
        console.log("No new KNFTs.");
      }
    }
  };

  // ------- Function to Check Box to Backend -------------///
  const checkActiveBox = async () => {
    // Function to check if box is still in user wallet.
    let ethAddress = user.get("ethAddress");

    // Need to reference Metadata instance in backend
    const Metadata = Moralis.Object.extend("Metadata");
    const query = new Moralis.Query(Metadata);
    query.equalTo("ethAddress", ethAddress);
    const results = await query.find();

    const resultsParse = JSON.parse(JSON.stringify(results));
    const stringResults = JSON.stringify(resultsParse[0]);
    const parseResults = JSON.parse(stringResults);

    // console.log("THIS IS PARSE METADATA", parseResults);

    let parseMeta = parseResults.Avatar;
    // This takes the complete Metadata and sorts it to it's own variable
    const newData = { ...parseMeta };

    // console.log("THIS IS newDATA", newData);

    // Need to reference KNFT cache instance in backend
    const KNFTdata = Moralis.Object.extend("KNFT");
    const KNFTquery = new Moralis.Query(KNFTdata);
    query.equalTo("ethAddress", ethAddress);
    const KNFTresults = await KNFTquery.first();

    const resultsKNFTParse = JSON.parse(JSON.stringify(KNFTresults));
    const stringKNFTResults = JSON.stringify(resultsKNFTParse.Owned);
    const parseKNFTResults = JSON.parse(stringKNFTResults);
    // console.log("THIS IS KNFT PARSE RESULTS:", parseKNFTResults);

    let parseKNFTMeta = parseKNFTResults;
    const newKNFTData = { ...parseKNFTMeta };

    // console.log("THIS IS newKNFTDATA", newKNFTData);

    // This logic is seeing if the active token_id is in wallet
    //look in array and find if id is exising else change
    // Got to concat all

    const arrKNFT = Object.values(newKNFTData);

    // console.log("THIS IS arrKNFT", arrKNFT);

    let idArray = [];

    arrKNFT.forEach((nft) => {
      idArray.push(nft.token_id);
    });

    // console.log("THIS IS idArray", idArray);

    if (idArray.includes(newData.token_id)) {
      // console.log("User still has cube");
      return;
    } else {
      // If token_id is not in cache, change to none.
      // Update that data
      // Push to backend

      let ethAddress = user.get("ethAddress");

      // Need to reference instance in backend
      const Metadata = Moralis.Object.extend("Metadata");
      const query = new Moralis.Query(Metadata);
      query.equalTo("ethAddress", ethAddress);
      const results = await query.first();

      results.set("Avatar.name", "None");
      results.set("Avatar.token_id", "");
      results.set(
        "Avatar.thumbnail",
        "https://i.ibb.co/ftPXPjS/none-icon-1.jpg"
      );
      results.set("Avatar.link", "");
      await results.save();
      // console.log("User does not have cube. Cube deactivated");
    }
  };

  // ------- Function BG to Backend -------------///
  const onDeactivateBackground = async () => {
    let ethAddress = user.get("ethAddress");

    // Need to reference instance in backend
    const Metadata = Moralis.Object.extend("Metadata");
    const query = new Moralis.Query(Metadata);
    query.equalTo("ethAddress", ethAddress);
    const results = await query.first();

    // update that data
    results.set("Background.type", "Background");
    results.set("Background.name", "None");
    results.set(
      "Background.thumbnail",
      "https://i.ibb.co/ftPXPjS/none-icon-1.jpg"
    );
    results.set("Background.link", "");
    await results.save();
  };

  // ------- Function Music to Backend -------------///
  const onDeactivateMusic = async () => {
    let ethAddress = user.get("ethAddress");

    // Need to reference instance in backend
    const Metadata = Moralis.Object.extend("Metadata");
    const query = new Moralis.Query(Metadata);
    query.equalTo("ethAddress", ethAddress);
    const results = await query.first();

    // update that data
    results.set("Music.type", "Music");
    results.set("Music.name", "None");
    results.set("Music.thumbnail", "https://i.ibb.co/ftPXPjS/none-icon-1.jpg");
    results.set("Music.link", "");
    await results.save();
  };

  // ------- Function Avatar to Backend -------------///
  const onDeactivateAvatar = async () => {
    let ethAddress = user.get("ethAddress");

    // Need to reference instance in backend
    const Metadata = Moralis.Object.extend("Metadata");
    const query = new Moralis.Query(Metadata);
    query.equalTo("ethAddress", ethAddress);
    const results = await query.first();

    // update that data
    results.set("Avatar.type", "Avatar");
    results.set("Avatar.name", "None");
    results.set("Avatar.token_id", "");
    results.set("Avatar.thumbnail", "https://i.ibb.co/ftPXPjS/none-icon-1.jpg");
    results.set("Avatar.link", "");
    await results.save();
  };

  // ------- Function Skin to Backend -------------///
  const onDeactivateSkin = async () => {
    let ethAddress = user.get("ethAddress");

    // Need to reference instance in backend
    const Metadata = Moralis.Object.extend("Metadata");
    const query = new Moralis.Query(Metadata);
    query.equalTo("ethAddress", ethAddress);
    const results = await query.first();

    // update that data
    results.set("Skin.type", "Skin");
    results.set("Skin.name", "None");
    results.set("Skin.thumbnail", "https://i.ibb.co/ftPXPjS/none-icon-1.jpg");
    results.set("Skin.link", "");
    await results.save();
  };

  // ------- Function Head to Backend -------------///
  const onDeactivateHead = async () => {
    let ethAddress = user.get("ethAddress");

    // Need to reference instance in backend
    const Metadata = Moralis.Object.extend("Metadata");
    const query = new Moralis.Query(Metadata);
    query.equalTo("ethAddress", ethAddress);
    const results = await query.first();

    // update that data
    results.set("Head.type", "Head");
    results.set("Head.name", "None");
    results.set("Head.thumbnail", "https://i.ibb.co/ftPXPjS/none-icon-1.jpg");
    results.set("Head.link", "");
    await results.save();
  };

  // ------- Function Eyes to Backend -------------///
  const onDeactivateEyes = async () => {
    let ethAddress = user.get("ethAddress");

    // Need to reference instance in backend
    const Metadata = Moralis.Object.extend("Metadata");
    const query = new Moralis.Query(Metadata);
    query.equalTo("ethAddress", ethAddress);
    const results = await query.first();

    // update that data
    results.set("Eyes.type", "Eyes");
    results.set("Eyes.name", "None");
    results.set("Eyes.thumbnail", "https://i.ibb.co/ftPXPjS/none-icon-1.jpg");
    results.set("Eyes.link", "");
    await results.save();
  };

  // ------- Function Mag to Backend -------------///
  const onDeactivateMag = async () => {
    let ethAddress = user.get("ethAddress");

    // Need to reference instance in backend
    const Metadata = Moralis.Object.extend("Metadata");
    const query = new Moralis.Query(Metadata);
    query.equalTo("ethAddress", ethAddress);
    const results = await query.first();

    // update that data
    results.set("Mag.type", "Mag");
    results.set("Mag.name", "None");
    results.set("Mag.thumbnail", "https://i.ibb.co/ftPXPjS/none-icon-1.jpg");
    results.set("Mag.link", "");
    await results.save();
  };

  // ------- Function Armor to Backend -------------///
  const onDeactivateArmor = async () => {
    let ethAddress = user.get("ethAddress");

    // Need to reference instance in backend
    const Metadata = Moralis.Object.extend("Metadata");
    const query = new Moralis.Query(Metadata);
    query.equalTo("ethAddress", ethAddress);
    const results = await query.first();

    // update that data
    results.set("Armor.type", "Armor");
    results.set("Armor.name", "None");
    results.set("Armor.thumbnail", "https://i.ibb.co/ftPXPjS/none-icon-1.jpg");
    results.set("Armor.link", "");
    await results.save();
  };

  // ------- Function Weapon to Backend -------------///
  const onDeactivateWeapon = async () => {
    let ethAddress = user.get("ethAddress");

    // Need to reference instance in backend
    const Metadata = Moralis.Object.extend("Metadata");
    const query = new Moralis.Query(Metadata);
    query.equalTo("ethAddress", ethAddress);
    const results = await query.first();

    // update that data
    results.set("Weapon.type", "Weapon");
    results.set("Weapon.name", "None");
    results.set("Weapon.thumbnail", "https://i.ibb.co/ftPXPjS/none-icon-1.jpg");
    results.set("Weapon.link", "");
    await results.save();
  };

  // GET ALL METADATA FROM ETHADDRESS WHEN FIRST LOADING VIEWPORT

  const getMetadata = async () => {
    const Metadata = Moralis.Object.extend("Metadata");
    const query = new Moralis.Query(Metadata);
    query.equalTo("ethAddress", ethAddress);
    const results = await query.find();

    const resultsParse = JSON.parse(JSON.stringify(results));
    const stringResults = JSON.stringify(resultsParse[0]);
    const parseResults = JSON.parse(stringResults);

    // console.log("THIS IS PARSE METADATA", parseResults);

    // This takes the complete Metadata and sorts it to it's own variable
    const finalResults = sortMetaData(parseResults);
    // setMetaData(finalResults);
    // console.log("THIS IS Metadata", finalResults);
    return finalResults;
  };

  // Get parse metadata, want to go in each param and add

  function sortMetaData(parseData) {
    for (let i = 0; i < 9; i++) {
      if (i === 0) {
        let data = parseData.Armor;
        const newData = { ...data };
        //set part of metadata to local
        setArmorData(newData);
      } else if (i === 1) {
        let data = parseData.Avatar;
        //set part of metadata to local
        const newData = { ...data };
        setAvatarData(newData);
      } else if (i === 2) {
        let data = parseData.Background;
        //set part of metadata to local
        const newData = { ...data };
        setBgData(newData);
      } else if (i === 3) {
        let data = parseData.Eyes;
        //set part of metadata to local
        const newData = { ...data };
        setEyesData(newData);
      } else if (i === 4) {
        let data = parseData.Head;
        //set part of metadata to local
        const newData = { ...data };
        setHeadData(newData);
      } else if (i === 5) {
        let data = parseData.Mag;
        //set part of metadata to local
        const newData = { ...data };
        setMagData(newData);
      } else if (i === 6) {
        let data = parseData.Music;
        //set part of metadata to local
        const newData = { ...data };
        setMusicData(newData);
      } else if (i === 7) {
        let data = parseData.Skin;
        //set part of metadata to local
        const newData = { ...data };
        setSkinData(newData);
      } else if (i === 8) {
        let data = parseData.Weapon;
        //set part of metadata to local
        const newData = { ...data };
        setWeaponData(newData);
      } else {
        // console.log("Sorting Updated Metadata to local done.");
        return;
      }
    }
  }

  // ------Function Background to Backend ------//

  // For updating bg data live
  const getBGDataLive = async () => {
    const queryBg = new Moralis.Query("Metadata");
    const querySub = await queryBg.subscribe();

    // Update data live
    handleBackgroundLive(queryBg, querySub);
  };

  function handleBackgroundLive(queryBg, subscription) {
    subscription.on("update", async function () {
      queryBg.equalTo("ethAddress", ethAddress);
      const results = await queryBg.find();
      let finalResults = parseFunction(results);
      let data = finalResults.Background;

      //set part of metadata to local
      const newData = { ...data };
      setBgData(newData);
    });
  }

  //--------------------------------------------///

  // ------Function Music to Backend ------//

  // For updating music data live
  const getMusicDataLive = async () => {
    const queryBg = new Moralis.Query("Metadata");
    const querySub = await queryBg.subscribe();

    // Update data live
    handleMusicLive(queryBg, querySub);
  };

  function handleMusicLive(queryBg, subscription) {
    subscription.on("update", async function () {
      queryBg.equalTo("ethAddress", ethAddress);
      const results = await queryBg.find();
      let finalResults = parseFunction(results);
      let data = finalResults.Music;

      //set part of metadata to local
      const newData = { ...data };
      setMusicData(newData);
    });
  }

  //--------------------------------------------///

  // ------Function Avatar to Backend ------//

  // For updating Avatar data live
  const getAvatarDataLive = async () => {
    const queryBg = new Moralis.Query("Metadata");
    const querySub = await queryBg.subscribe();

    // Update data live
    handleAvatarLive(queryBg, querySub);
  };

  function handleAvatarLive(queryBg, subscription) {
    subscription.on("update", async function () {
      queryBg.equalTo("ethAddress", ethAddress);
      const results = await queryBg.find();
      let finalResults = parseFunction(results);
      let data = finalResults.Avatar;

      //set part of metadata to local
      const newData = { ...data };
      setAvatarData(newData);
    });
  }

  //--------------------------------------------///

  // ------Function Skin to Backend ------//

  // For updating Avatar data live
  const getSkinDataLive = async () => {
    const queryBg = new Moralis.Query("Metadata");
    const querySub = await queryBg.subscribe();

    // Update data live
    handleSkinLive(queryBg, querySub);
  };

  function handleSkinLive(queryBg, subscription) {
    subscription.on("update", async function () {
      queryBg.equalTo("ethAddress", ethAddress);
      const results = await queryBg.find();
      let finalResults = parseFunction(results);
      let data = finalResults.Skin;

      //set part of metadata to local
      const newData = { ...data };
      setSkinData(newData);
    });
  }

  //--------------------------------------------///

  // ------Function Skin to Backend ------//

  // For updating Avatar data live
  const getHeadDataLive = async () => {
    const queryBg = new Moralis.Query("Metadata");
    const querySub = await queryBg.subscribe();

    // Update data live
    handleHeadLive(queryBg, querySub);
  };

  function handleHeadLive(queryBg, subscription) {
    subscription.on("update", async function () {
      queryBg.equalTo("ethAddress", ethAddress);
      const results = await queryBg.find();
      let finalResults = parseFunction(results);
      let data = finalResults.Head;

      //set part of metadata to local
      const newData = { ...data };
      setHeadData(newData);
    });
  }

  //--------------------------------------------///

  // ------Function Eyes to Backend ------//

  // For updating Eyes data live
  const getEyesDataLive = async () => {
    const queryBg = new Moralis.Query("Metadata");
    const querySub = await queryBg.subscribe();

    // Update data live
    handleEyesLive(queryBg, querySub);
  };

  function handleEyesLive(queryBg, subscription) {
    subscription.on("update", async function () {
      queryBg.equalTo("ethAddress", ethAddress);
      const results = await queryBg.find();
      let finalResults = parseFunction(results);
      let data = finalResults.Eyes;

      //set part of metadata to local
      const newData = { ...data };
      setEyesData(newData);
    });
  }

  //--------------------------------------------///

  // ------Function Mag to Backend ------//

  // For updating Mag data live
  const getMagDataLive = async () => {
    const queryBg = new Moralis.Query("Metadata");
    const querySub = await queryBg.subscribe();

    // Update data live
    handleMagLive(queryBg, querySub);
  };

  function handleMagLive(queryBg, subscription) {
    subscription.on("update", async function () {
      queryBg.equalTo("ethAddress", ethAddress);
      const results = await queryBg.find();
      let finalResults = parseFunction(results);
      let data = finalResults.Mag;

      //set part of metadata to local
      const newData = { ...data };
      setMagData(newData);
    });
  }

  //--------------------------------------------///

  // ------Function Armor to Backend ------//

  // For updating Armor data live
  const getArmorDataLive = async () => {
    const queryBg = new Moralis.Query("Metadata");
    const querySub = await queryBg.subscribe();

    // Update data live
    handleArmorLive(queryBg, querySub);
  };

  function handleArmorLive(queryBg, subscription) {
    subscription.on("update", async function () {
      queryBg.equalTo("ethAddress", ethAddress);
      const results = await queryBg.find();
      let finalResults = parseFunction(results);
      let data = finalResults.Armor;

      //set part of metadata to local
      const newData = { ...data };
      setArmorData(newData);
    });
  }

  //--------------------------------------------///

  // ------Function Weapon to Backend ------//

  // For updating Weapon data live
  const getWeaponDataLive = async () => {
    const queryBg = new Moralis.Query("Metadata");
    const querySub = await queryBg.subscribe();

    // Update data live
    handleWeaponLive(queryBg, querySub);
  };

  function handleWeaponLive(queryBg, subscription) {
    subscription.on("update", async function () {
      queryBg.equalTo("ethAddress", ethAddress);
      const results = await queryBg.find();
      let finalResults = parseFunction(results);
      let data = finalResults.Weapon;

      //set part of metadata to local
      const newData = { ...data };
      setWeaponData(newData);
    });
  }

  //--------------------------------------------///

  // ------Function Head to Backend ------//

  // For updating Head data live

  // const getHeadDataLive = async () => {
  //   const queryBg = new Moralis.Query("Metadata");
  //   const querySub = await queryBg.subscribe();

  //   // Update data live
  //   handleHeadLive(queryBg, querySub);
  // };

  // function handleHeadLive(queryBg, subscription) {
  //   subscription.on("update", async function () {
  //     queryBg.equalTo("ethAddress", ethAddress);
  //     const results = await queryBg.find();
  //     let finalResults = parseFunction(results);
  //     let data = finalResults.Head;

  //     //set part of metadata to local
  //     const newData = { ...data };
  //     setHeadData(newData);
  //   });
  // }

  //--------------------------------------------///

  // ------Function UpperBody to Backend ------//

  // For updating Head data live

  // const getUpperBodyDataLive = async () => {
  //   const queryBg = new Moralis.Query("Metadata");
  //   const querySub = await queryBg.subscribe();

  //   // Update data live
  //   handleUpperBodyLive(queryBg, querySub);
  // };

  // function handleUpperBodyLive(queryBg, subscription) {
  //   subscription.on("update", async function () {
  //     queryBg.equalTo("ethAddress", ethAddress);
  //     const results = await queryBg.find();
  //     let finalResults = parseFunction(results);
  //     let data = finalResults.UpperBody;

  //     //set part of metadata to local
  //     const newData = { ...data };
  //     setUpperBodyData(newData);
  //   });
  // }

  //--------------------------------------------///

  // ------Function LeftHand to Backend ------//

  // For updating Head data live

  // const getLeftHandDataLive = async () => {
  //   const queryBg = new Moralis.Query("Metadata");
  //   const querySub = await queryBg.subscribe();

  //   // Update data live
  //   handleLeftHandLive(queryBg, querySub);
  // };

  // function handleLeftHandLive(queryBg, subscription) {
  //   subscription.on("update", async function () {
  //     queryBg.equalTo("ethAddress", ethAddress);
  //     const results = await queryBg.find();
  //     let finalResults = parseFunction(results);
  //     let data = finalResults.LeftHand;

  //     //set part of metadata to local
  //     const newData = { ...data };
  //     setLeftHandData(newData);
  //   });
  // }

  //--------------------------------------------///

  // ------Function RightHand to Backend ------//

  // For updating Head data live

  // const getRightHandDataLive = async () => {
  //   const queryBg = new Moralis.Query("Metadata");
  //   const querySub = await queryBg.subscribe();

  //   // Update data live
  //   handleRightHandLive(queryBg, querySub);
  // };

  // function handleRightHandLive(queryBg, subscription) {
  //   subscription.on("update", async function () {
  //     queryBg.equalTo("ethAddress", ethAddress);
  //     const results = await queryBg.find();
  //     let finalResults = parseFunction(results);
  //     let data = finalResults.RightHand;

  //     //set part of metadata to local
  //     const newData = { ...data };
  //     setRightHandData(newData);
  //   });
  // }

  //--------------------------------------------///

  // ------Function LowerBody to Backend ------//

  // For updating Head data live

  // const getLowerBodyDataLive = async () => {
  //   const queryBg = new Moralis.Query("Metadata");
  //   const querySub = await queryBg.subscribe();

  //   // Update data live
  //   handleLowerBodyLive(queryBg, querySub);
  // };

  // function handleLowerBodyLive(queryBg, subscription) {
  //   subscription.on("update", async function () {
  //     queryBg.equalTo("ethAddress", ethAddress);
  //     const results = await queryBg.find();
  //     let finalResults = parseFunction(results);
  //     let data = finalResults.LowerBody;

  //     //set part of metadata to local
  //     const newData = { ...data };
  //     setLowerBodyData(newData);
  //   });
  // }

  //--------------------------------------------///

  // ------Function Back to Backend ------//

  // For updating Head data live
  // const getBackDataLive = async () => {
  //   const queryBg = new Moralis.Query("Metadata");
  //   const querySub = await queryBg.subscribe();

  //   // Update data live
  //   handleBackLive(queryBg, querySub);
  // };

  // function handleBackLive(queryBg, subscription) {
  //   subscription.on("update", async function () {
  //     queryBg.equalTo("ethAddress", ethAddress);
  //     const results = await queryBg.find();
  //     let finalResults = parseFunction(results);
  //     let data = finalResults.Back;

  //     //set part of metadata to local
  //     const newData = { ...data };
  //     setBackData(newData);
  //   });
  // }

  // GET ALL KNFTDATA FROM ETHADDRESS WHEN FIRST LOADING VIEWPORT

  const getKNFTdata = async () => {
    const Knft = Moralis.Object.extend("KNFT");
    const query = new Moralis.Query(Knft);
    query.equalTo("ethAddress", ethAddress);
    const results = await query.find();

    const resultsParse = JSON.parse(JSON.stringify(results));
    const stringResults = JSON.stringify(resultsParse[0]);
    const parseResults = JSON.parse(stringResults);

    // console.log("THIS IS PARSE KNFTDATA", parseResults);

    // This takes the complete KNFTdata and sorts it to it's own variable
    const kNFTfinalResults = await setKNFTsOwned(parseResults);

    const options = {
      method: "GET",
      url: `https://deep-index.moralis.io/api/v2/${ethAddress}/nft`,
      params: {
        chain: "eth",
        format: "decimal",
        token_addresses: "0x7eD509A69F7FD93fD59A557369a9a5dCc1499685",
      },
      headers: { accept: "application/json", "X-API-Key": "test" },
    };

    await axios
      .request(options)
      .then(async function (response) {
        // console.log("This is res: ", response.data.result);
        await checkKNFTs(response.data.result, kNFTfinalResults);
      })
      .catch(function (error) {
        console.error(error);
      });

    console.log("THIS IS kNFTsOwned", kNFTsOwned);
    return kNFTfinalResults;
  };

  //--------------------------------------------///

  // FOR PARSING RESULTS
  function parseFunction(results) {
    const resultsParse = JSON.parse(JSON.stringify(results));
    const stringResults = JSON.stringify(resultsParse[0]);
    const finalResults = JSON.parse(stringResults);
    return finalResults;
  }

  // FOR PARSING RESULTS FOR NEW USERS
  function parseFunctionNewUser(results) {
    const resultsParse = JSON.parse(JSON.stringify(results));
    const stringResults = JSON.stringify(resultsParse);
    const finalResults = JSON.parse(stringResults);
    return finalResults;
  }

  const Attributes = {
    Background: [
      {
        type: bgData.type,
        name: bgData.name,
        thumbnail: bgData.thumbnail,
        link: bgData.link,
      },
    ],
    Music: [
      {
        type: musicData.type,
        name: musicData.name,
        thumbnail: musicData.thumbnail,
        link: musicData.link,
      },
    ],
    Avatar: [
      {
        type: avatarData.type,
        name: avatarData.name,
        token_id: avatarData.token_id,
        thumbnail: avatarData.thumbnail,
        link: avatarData.link,
      },
    ],

    // FOR GREYLAINS -------- //

    Skin: [
      {
        type: skinData.type,
        name: skinData.name,
        thumbnail: skinData.thumbnail,
        link: skinData.link,
      },
    ],

    Eyes: [
      {
        type: eyesData.type,
        name: eyesData.name,
        thumbnail: eyesData.thumbnail,
        link: eyesData.link,
      },
    ],

    Mag: [
      {
        type: magData.type,
        name: magData.name,
        thumbnail: magData.thumbnail,
        link: magData.link,
      },
    ],

    Armor: [
      {
        type: armorData.type,
        name: armorData.name,
        thumbnail: armorData.thumbnail,
        link: armorData.link,
      },
    ],

    //-------------------------------//

    Head: [
      {
        type: headData.type,
        name: headData.name,
        thumbnail: headData.thumbnail,
        link: headData.link,
      },
    ],

    Weapon: [
      {
        type: weaponData.type,
        name: weaponData.name,
        thumbnail: weaponData.thumbnail,
        link: weaponData.link,
      },
    ],

    UpperBody: [
      {
        type: upperBodyData.type,
        name: upperBodyData.name,
        thumbnail: upperBodyData.thumbnail,
        link: upperBodyData.link,
      },
    ],

    LeftHand: [
      {
        type: leftHandData.type,
        name: leftHandData.name,
        thumbnail: leftHandData.thumbnail,
        link: leftHandData.link,
      },
    ],
    RightHand: [
      {
        type: rightHandData.type,
        name: rightHandData.name,
        thumbnail: rightHandData.thumbnail,
        link: rightHandData.link,
      },
    ],
    LowerBody: [
      {
        type: lowerBodyData.type,
        name: lowerBodyData.name,
        thumbnail: lowerBodyData.thumbnail,
        link: lowerBodyData.link,
      },
    ],

    Back: [
      {
        type: backData.type,
        name: backData.name,
        thumbnail: backData.thumbnail,
        link: backData.link,
      },
    ],
  };

  const styles = {
    NFTs: {
      display: "flex",
      flexWrap: "wrap",
      WebkitBoxPack: "start",
      alignItems: "center",
      justifyContent: "center",
      height: "30vh",
      width: "100%",
      gap: "1px",
    },
    Scroll: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "35vw",
      height: "46.25vh",
      backgroundColor: "darkgrey",
      borderRadius: "10px",
      overflowX: "hidden",
    },
    ScrollLight: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "35vw",
      height: "46.25vh",
      backgroundColor: "lightgrey",
      borderRadius: "10px",
      overflowX: "hidden",
      // border: "4px solid ",
      // overflowY: "scroll",
    },
  };

  // console.log("Attributes", Attributes);
  // console.log("NFTBalances length", NFTBalances?.result.length);

  //-------------------------//
  //---------------------//

  if (!isAuthenticated) {
    return (
      <div className="NftOwnedContainer">
        <Box>
          <p>You need to connect your wallet first.</p>
        </Box>
      </div>
    );
  }

  // if (NFTBalances === null) {
  //   return (
  //     <div className="NftOwnedContainer">
  //       <Box>
  //         <p
  //           style={{
  //             display: "flex",
  //             justifyContent: "center",
  //             alignItems: "center",
  //           }}
  //         >
  //           Cannot access NFT Metadata.
  //         </p>
  //         <p
  //           style={{
  //             display: "flex",
  //             justifyContent: "center",
  //             alignItems: "center",
  //           }}
  //         >
  //           (Server Error) Please try again.
  //         </p>
  //       </Box>
  //     </div>
  //   );
  // }

  // if (NFTBalances?.result.length === 0) {
  //   return (
  //     <div className="NftOwnedContainer">
  //       <Box>
  //         <p
  //           style={{
  //             display: "flex",
  //             justifyContent: "center",
  //             alignItems: "center",
  //           }}
  //         >
  //           You have no NFTs. Please go to the Grey Marketplace and acquire some
  //           NFTs! 👽
  //         </p>
  //       </Box>
  //     </div>
  //   );
  // }

  return (
    <>
      <VStack>
        {colorMode === "dark" ? (
          <>
            <HStack
              style={{
                paddingTop: "30px",
                paddingBottom: "10px",
              }}
            >
              <Center>
                <h4>🌐 </h4>
              </Center>
              <Flex alignItems="center" justifyContent="center">
                <h4
                  style={{
                    // paddingTop: "30px",
                    // paddingBottom: "10px",
                    color: "white",
                  }}
                >
                  Your Scene
                </h4>
              </Flex>
            </HStack>
          </>
        ) : (
          <>
            <HStack
              style={{
                paddingTop: "30px",
                paddingBottom: "10px",
              }}
            >
              <Center>
                <h4>🌐 </h4>
              </Center>
              <Flex alignItems="center" justifyContent="center">
                <h4
                  style={{
                    // paddingTop: "30px",
                    // paddingBottom: "10px",
                    color: "white",
                  }}
                >
                  Your Scene
                </h4>
              </Flex>
            </HStack>
          </>
        )}

        {colorMode === "dark" ? (
          <Scrollbars style={styles.Scroll}>
            <div>
              <div
                style={{
                  padding: "10px",
                  paddingBottom: "75px",
                  width: "100%",
                }}
              >
                <div style={styles.NFTs}>
                  {/* Background */}
                  <Skeleton loading={!Attributes}>
                    {Attributes &&
                      Attributes.Background.map((attribute, index) => {
                        return (
                          <Flex
                            key={index}
                            p={90}
                            w="20%"
                            h="60%"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Flex
                              direction="column"
                              justifyContent="center"
                              alignItems="center"
                              w="sm"
                              mx="auto"
                            >
                              <Box
                                bg="#CBD5E0"
                                h={90}
                                w="70%"
                                shadow="md"
                                bgSize="cover"
                                bgPos="center"
                                style={{
                                  boxShadow: "5px 5px 6px 0px grey",
                                  backgroundImage: `url(${attribute?.thumbnail})`,
                                  borderRadius: "5px",
                                }}
                              ></Box>

                              <Box
                                style={{
                                  boxShadow: "5px 5px 6px 0px grey",
                                  borderRadius: "5px",
                                }}
                                w={{
                                  base: 40,
                                  md: 40,
                                }}
                                bg={("#F9FAFB", "#2D3748")}
                                mt={-3}
                                shadow="lg"
                                overflow="hidden"
                              >
                                <chakra.h3
                                  className="NftTitle"
                                  py={1}
                                  textAlign="center"
                                  fontWeight="bold"
                                  textTransform="uppercase"
                                  color={("#1A202C", "#F7FAFC")}
                                  letterSpacing={1}
                                >
                                  {attribute?.name}
                                </chakra.h3>

                                <Flex
                                  alignItems="center"
                                  justifyContent="center"
                                  py={1}
                                  px={2}
                                  bg={("#F9FAFB", "#4A5568")}
                                >
                                  <VStack spacing="2px">
                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                    >
                                      <HStack>
                                        {" "}
                                        <chakra.span
                                          color={("#2D3748", "#F7FAFC")}
                                        >
                                          {attribute?.type}
                                        </chakra.span>
                                      </HStack>
                                    </Flex>

                                    <chakra.span
                                      fontWeight="bold"
                                      color={("#2D3748", "#F7FAFC")}
                                    ></chakra.span>

                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                    >
                                      <HStack>
                                        <Spacer />

                                        <HStack>
                                          <Center>
                                            <Spacer>
                                              <AwesomeButtonProgress
                                                style={{ width: "120px" }}
                                                type="secondary"
                                                size="medium"
                                                loadingLabel="Wait..."
                                                resultLabel="Done!"
                                                action={(e, alert) => {
                                                  onDeactivateBackground({});
                                                  setTimeout(() => {
                                                    alert("Success!");
                                                  }, 5000);
                                                }}
                                              >
                                                Deactivate
                                              </AwesomeButtonProgress>
                                            </Spacer>
                                          </Center>
                                        </HStack>

                                        <Spacer />
                                      </HStack>
                                    </Flex>
                                  </VStack>
                                </Flex>
                              </Box>
                            </Flex>
                          </Flex>
                        );

                        // return (
                        //   <Card
                        //     hoverable
                        //     style={{
                        //       width: 100,
                        //       height: 200,
                        //       border: "3px solid #e7eaf3",
                        //       boxShadow: "5px 5px 6px 0px grey",
                        //     }}
                        //     cover={
                        //       <Image
                        //         preview={false}
                        //         src={attribute?.thumbnail || "error"}
                        //         fallback="data:image/png;base64,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"
                        //         alt=""
                        //         style={{ height: "100px" }}
                        //         // onClick={() =>
                        //         //   window.open(
                        //         //     `${getExplorer(chainId)}address/${
                        //         //       nft.token_address
                        //         //     }`,
                        //         //     "_blank"
                        //         //   )
                        //         // }
                        //       />
                        //     }
                        //     key={index}
                        //   >
                        //     <Meta
                        //       style={{ padding: "4px" }}
                        //       title={attribute.type}
                        //       description={attribute.name}
                        //       // uri={nft.token_uri}
                        //       // onClick={() =>
                        //       //   window.open(
                        //       //     `${getExplorer(chainId)}address/${
                        //       //       nft.token_address
                        //       //     }`,
                        //       //     "_blank"
                        //       //   )
                        //       // }
                        //     />
                        //   </Card>
                        // );
                      })}
                  </Skeleton>

                  {/* Music */}
                  <Skeleton loading={!Attributes}>
                    {Attributes &&
                      Attributes.Music.map((attribute, index) => {
                        return (
                          <Flex
                            key={index}
                            p={90}
                            w="20%"
                            h="60%"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Flex
                              direction="column"
                              justifyContent="center"
                              alignItems="center"
                              w="sm"
                              mx="auto"
                            >
                              <Box
                                bg="#CBD5E0"
                                h={90}
                                w="70%"
                                shadow="md"
                                bgSize="cover"
                                bgPos="center"
                                style={{
                                  boxShadow: "5px 5px 6px 0px grey",
                                  backgroundImage: `url(${attribute?.thumbnail})`,
                                  borderRadius: "5px",
                                }}
                              ></Box>

                              <Box
                                style={{
                                  boxShadow: "5px 5px 6px 0px grey",
                                  borderRadius: "5px",
                                }}
                                w={{
                                  base: 40,
                                  md: 40,
                                }}
                                bg={("#F9FAFB", "#2D3748")}
                                mt={-3}
                                shadow="lg"
                                overflow="hidden"
                              >
                                <chakra.h3
                                  className="NftTitle"
                                  py={1}
                                  textAlign="center"
                                  fontWeight="bold"
                                  textTransform="uppercase"
                                  color={("#1A202C", "#F7FAFC")}
                                  letterSpacing={1}
                                >
                                  {attribute?.name}
                                </chakra.h3>

                                <Flex
                                  alignItems="center"
                                  justifyContent="center"
                                  py={1}
                                  px={2}
                                  bg={("#F9FAFB", "#4A5568")}
                                >
                                  <VStack spacing="2px">
                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                    >
                                      <HStack>
                                        {" "}
                                        <chakra.span
                                          color={("#2D3748", "#F7FAFC")}
                                        >
                                          {attribute?.type}
                                        </chakra.span>
                                      </HStack>
                                    </Flex>

                                    <chakra.span
                                      fontWeight="bold"
                                      color={("#2D3748", "#F7FAFC")}
                                    ></chakra.span>

                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                    >
                                      <HStack>
                                        <Spacer />

                                        <HStack>
                                          <Center>
                                            <Spacer>
                                              <AwesomeButtonProgress
                                                style={{ width: "120px" }}
                                                type="secondary"
                                                size="medium"
                                                loadingLabel="Wait..."
                                                resultLabel="Done!"
                                                action={(e, alert) => {
                                                  onDeactivateMusic({});
                                                  setTimeout(() => {
                                                    alert("Success!");
                                                  }, 5000);
                                                }}
                                              >
                                                Deactivate
                                              </AwesomeButtonProgress>
                                            </Spacer>
                                          </Center>
                                        </HStack>
                                        <Spacer />
                                      </HStack>
                                    </Flex>
                                  </VStack>
                                </Flex>
                              </Box>
                            </Flex>
                          </Flex>
                        );

                        // return (
                        //   <Card
                        //     hoverable
                        //     style={{
                        //       width: 100,
                        //       height: 200,
                        //       border: "3px solid #e7eaf3",
                        //       boxShadow: "5px 5px 6px 0px grey",
                        //     }}
                        //     cover={
                        //       <Image
                        //         preview={false}
                        //         src={attribute?.thumbnail || "error"}
                        //         fallback="data:image/png;base64,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"
                        //         alt=""
                        //         style={{ height: "100px" }}
                        //         // onClick={() =>
                        //         //   window.open(
                        //         //     `${getExplorer(chainId)}address/${
                        //         //       nft.token_address
                        //         //     }`,
                        //         //     "_blank"
                        //         //   )
                        //         // }
                        //       />
                        //     }
                        //     key={index}
                        //   >
                        //     <Meta
                        //       style={{ padding: "4px" }}
                        //       title={attribute.type}
                        //       description={attribute.name}
                        //       // uri={nft.token_uri}
                        //       // onClick={() =>
                        //       //   window.open(
                        //       //     `${getExplorer(chainId)}address/${
                        //       //       nft.token_address
                        //       //     }`,
                        //       //     "_blank"
                        //       //   )
                        //       // }
                        //     />
                        //   </Card>
                        // );
                      })}
                  </Skeleton>

                  {/* Avatar */}
                  <Skeleton loading={!Attributes}>
                    {Attributes &&
                      Attributes.Avatar.map((attribute, index) => {
                        return (
                          <Flex
                            key={index}
                            p={90}
                            w="20%"
                            h="60%"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Flex
                              direction="column"
                              justifyContent="center"
                              alignItems="center"
                              w="sm"
                              mx="auto"
                            >
                              <Box
                                bg="#CBD5E0"
                                h={90}
                                w="70%"
                                shadow="md"
                                bgSize="cover"
                                bgPos="center"
                                style={{
                                  boxShadow: "5px 5px 6px 0px grey",
                                  backgroundImage: `url(${attribute?.thumbnail})`,
                                  borderRadius: "5px",
                                }}
                              ></Box>

                              <Box
                                style={{
                                  boxShadow: "5px 5px 6px 0px grey",
                                  borderRadius: "5px",
                                }}
                                w={{
                                  base: 40,
                                  md: 40,
                                }}
                                bg={("#F9FAFB", "#2D3748")}
                                mt={-3}
                                shadow="lg"
                                overflow="hidden"
                              >
                                <chakra.h3
                                  className="NftTitle"
                                  py={1}
                                  textAlign="center"
                                  fontWeight="bold"
                                  textTransform="uppercase"
                                  color={("#1A202C", "#F7FAFC")}
                                  letterSpacing={1}
                                >
                                  {attribute?.name}
                                  {/* {attribute?.name} # {attribute?.token_id} */}
                                </chakra.h3>

                                <Flex
                                  alignItems="center"
                                  justifyContent="center"
                                  py={1}
                                  px={2}
                                  bg={("#F9FAFB", "#4A5568")}
                                >
                                  <VStack spacing="2px">
                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                    >
                                      <HStack>
                                        {" "}
                                        <chakra.span
                                          color={("#2D3748", "#F7FAFC")}
                                        >
                                          {attribute?.type}
                                        </chakra.span>
                                      </HStack>
                                    </Flex>

                                    <chakra.span
                                      fontWeight="bold"
                                      color={("#2D3748", "#F7FAFC")}
                                    ></chakra.span>
                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                    >
                                      <HStack>
                                        <Spacer />

                                        <HStack>
                                          <Center>
                                            <Spacer>
                                              <AwesomeButtonProgress
                                                style={{ width: "120px" }}
                                                type="secondary"
                                                size="medium"
                                                loadingLabel="Wait..."
                                                resultLabel="Done!"
                                                action={(e, alert) => {
                                                  onDeactivateAvatar({});
                                                  setTimeout(() => {
                                                    alert("Success!");
                                                  }, 5000);
                                                }}
                                              >
                                                Deactivate
                                              </AwesomeButtonProgress>
                                            </Spacer>
                                          </Center>
                                        </HStack>
                                        <Spacer />
                                      </HStack>
                                    </Flex>
                                  </VStack>
                                </Flex>
                              </Box>
                            </Flex>
                          </Flex>
                        );
                      })}
                  </Skeleton>

                  {avatarData.name === "Grey" ? (
                    <>
                      {/* Skin */}
                      <Skeleton loading={!Attributes}>
                        {Attributes &&
                          Attributes.Skin.map((attribute, index) => {
                            return (
                              <Flex
                                key={index}
                                p={90}
                                w="20%"
                                h="60%"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Flex
                                  direction="column"
                                  justifyContent="center"
                                  alignItems="center"
                                  w="sm"
                                  mx="auto"
                                >
                                  <Box
                                    bg="#CBD5E0"
                                    h={90}
                                    w="70%"
                                    shadow="md"
                                    bgSize="cover"
                                    bgPos="center"
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      backgroundImage: `url(${attribute?.thumbnail})`,
                                      borderRadius: "5px",
                                    }}
                                  ></Box>

                                  <Box
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      borderRadius: "5px",
                                    }}
                                    w={{
                                      base: 40,
                                      md: 40,
                                    }}
                                    bg={("#F9FAFB", "#2D3748")}
                                    mt={-3}
                                    shadow="lg"
                                    overflow="hidden"
                                  >
                                    <chakra.h3
                                      className="NftTitle"
                                      py={1}
                                      textAlign="center"
                                      fontWeight="bold"
                                      textTransform="uppercase"
                                      color={("#1A202C", "#F7FAFC")}
                                      letterSpacing={1}
                                    >
                                      {attribute?.name}
                                    </chakra.h3>

                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                      py={1}
                                      px={2}
                                      bg={("#F9FAFB", "#4A5568")}
                                    >
                                      <VStack spacing="2px">
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            {" "}
                                            <chakra.span
                                              color={("#2D3748", "#F7FAFC")}
                                            >
                                              {attribute?.type}
                                            </chakra.span>
                                          </HStack>
                                        </Flex>

                                        <chakra.span
                                          fontWeight="bold"
                                          color={("#2D3748", "#F7FAFC")}
                                        ></chakra.span>
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            <Spacer />

                                            <HStack>
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    style={{ width: "120px" }}
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onDeactivateSkin({});
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Deactivate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                            <Spacer />
                                          </HStack>
                                        </Flex>
                                      </VStack>
                                    </Flex>
                                  </Box>
                                </Flex>
                              </Flex>
                            );
                          })}
                      </Skeleton>

                      {/* Head*/}
                      <Skeleton loading={!Attributes}>
                        {Attributes &&
                          Attributes.Head.map((attribute, index) => {
                            return (
                              <Flex
                                key={index}
                                p={90}
                                w="20%"
                                h="60%"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Flex
                                  direction="column"
                                  justifyContent="center"
                                  alignItems="center"
                                  w="sm"
                                  mx="auto"
                                >
                                  <Box
                                    bg="#CBD5E0"
                                    h={90}
                                    w="70%"
                                    shadow="md"
                                    bgSize="cover"
                                    bgPos="center"
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      backgroundImage: `url(${attribute?.thumbnail})`,
                                      borderRadius: "5px",
                                    }}
                                  ></Box>

                                  <Box
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      borderRadius: "5px",
                                    }}
                                    w={{
                                      base: 40,
                                      md: 40,
                                    }}
                                    bg={("#F9FAFB", "#2D3748")}
                                    mt={-3}
                                    shadow="lg"
                                    overflow="hidden"
                                  >
                                    <chakra.h3
                                      className="NftTitle"
                                      py={1}
                                      textAlign="center"
                                      fontWeight="bold"
                                      textTransform="uppercase"
                                      color={("#1A202C", "#F7FAFC")}
                                      letterSpacing={1}
                                    >
                                      {attribute?.name}
                                    </chakra.h3>

                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                      py={1}
                                      px={2}
                                      bg={("#F9FAFB", "#4A5568")}
                                    >
                                      <VStack spacing="2px">
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            {" "}
                                            <chakra.span
                                              color={("#2D3748", "#F7FAFC")}
                                            >
                                              {attribute?.type}
                                            </chakra.span>
                                          </HStack>
                                        </Flex>

                                        <chakra.span
                                          fontWeight="bold"
                                          color={("#2D3748", "#F7FAFC")}
                                        ></chakra.span>
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            <Spacer />

                                            <HStack>
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    style={{ width: "120px" }}
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onDeactivateHead({});
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Deactivate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                            <Spacer />
                                          </HStack>
                                        </Flex>
                                      </VStack>
                                    </Flex>
                                  </Box>
                                </Flex>
                              </Flex>
                            );
                          })}
                      </Skeleton>

                      {/* Eyes */}
                      <Skeleton loading={!Attributes}>
                        {Attributes &&
                          Attributes.Eyes.map((attribute, index) => {
                            return (
                              <Flex
                                key={index}
                                p={90}
                                w="20%"
                                h="60%"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Flex
                                  direction="column"
                                  justifyContent="center"
                                  alignItems="center"
                                  w="sm"
                                  mx="auto"
                                >
                                  <Box
                                    bg="#CBD5E0"
                                    h={90}
                                    w="70%"
                                    shadow="md"
                                    bgSize="cover"
                                    bgPos="center"
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      backgroundImage: `url(${attribute?.thumbnail})`,
                                      borderRadius: "5px",
                                    }}
                                  ></Box>

                                  <Box
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      borderRadius: "5px",
                                    }}
                                    w={{
                                      base: 40,
                                      md: 40,
                                    }}
                                    bg={("#F9FAFB", "#2D3748")}
                                    mt={-3}
                                    shadow="lg"
                                    overflow="hidden"
                                  >
                                    <chakra.h3
                                      className="NftTitle"
                                      py={1}
                                      textAlign="center"
                                      fontWeight="bold"
                                      textTransform="uppercase"
                                      color={("#1A202C", "#F7FAFC")}
                                      letterSpacing={1}
                                    >
                                      {attribute?.name}
                                    </chakra.h3>

                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                      py={1}
                                      px={2}
                                      bg={("#F9FAFB", "#4A5568")}
                                    >
                                      <VStack spacing="2px">
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            {" "}
                                            <chakra.span
                                              color={("#2D3748", "#F7FAFC")}
                                            >
                                              {attribute?.type}
                                            </chakra.span>
                                          </HStack>
                                        </Flex>

                                        <chakra.span
                                          fontWeight="bold"
                                          color={("#2D3748", "#F7FAFC")}
                                        ></chakra.span>
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            <Spacer />

                                            <HStack>
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    style={{ width: "120px" }}
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onDeactivateEyes({});
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Deactivate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                            <Spacer />
                                          </HStack>
                                        </Flex>
                                      </VStack>
                                    </Flex>
                                  </Box>
                                </Flex>
                              </Flex>
                            );
                          })}
                      </Skeleton>

                      {/* Armor */}
                      <Skeleton loading={!Attributes}>
                        {Attributes &&
                          Attributes.Armor.map((attribute, index) => {
                            return (
                              <Flex
                                key={index}
                                p={90}
                                w="20%"
                                h="60%"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Flex
                                  direction="column"
                                  justifyContent="center"
                                  alignItems="center"
                                  w="sm"
                                  mx="auto"
                                >
                                  <Box
                                    bg="#CBD5E0"
                                    h={90}
                                    w="70%"
                                    shadow="md"
                                    bgSize="cover"
                                    bgPos="center"
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      backgroundImage: `url(${attribute?.thumbnail})`,
                                      borderRadius: "5px",
                                    }}
                                  ></Box>

                                  <Box
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      borderRadius: "5px",
                                    }}
                                    w={{
                                      base: 40,
                                      md: 40,
                                    }}
                                    bg={("#F9FAFB", "#2D3748")}
                                    mt={-3}
                                    shadow="lg"
                                    overflow="hidden"
                                  >
                                    <chakra.h3
                                      className="NftTitle"
                                      py={1}
                                      textAlign="center"
                                      fontWeight="bold"
                                      textTransform="uppercase"
                                      color={("#1A202C", "#F7FAFC")}
                                      letterSpacing={1}
                                    >
                                      {attribute?.name}
                                    </chakra.h3>

                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                      py={1}
                                      px={2}
                                      bg={("#F9FAFB", "#4A5568")}
                                    >
                                      <VStack spacing="2px">
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            {" "}
                                            <chakra.span
                                              color={("#2D3748", "#F7FAFC")}
                                            >
                                              {attribute?.type}
                                            </chakra.span>
                                          </HStack>
                                        </Flex>

                                        <chakra.span
                                          fontWeight="bold"
                                          color={("#2D3748", "#F7FAFC")}
                                        ></chakra.span>
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            <Spacer />

                                            <HStack>
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    style={{ width: "120px" }}
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onDeactivateArmor({});
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Deactivate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                            <Spacer />
                                          </HStack>
                                        </Flex>
                                      </VStack>
                                    </Flex>
                                  </Box>
                                </Flex>
                              </Flex>
                            );
                          })}
                      </Skeleton>

                      {/* Weapon */}
                      <Skeleton loading={!Attributes}>
                        {Attributes &&
                          Attributes.Weapon.map((attribute, index) => {
                            return (
                              <Flex
                                key={index}
                                p={90}
                                w="20%"
                                h="60%"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Flex
                                  direction="column"
                                  justifyContent="center"
                                  alignItems="center"
                                  w="sm"
                                  mx="auto"
                                >
                                  <Box
                                    bg="#CBD5E0"
                                    h={90}
                                    w="70%"
                                    shadow="md"
                                    bgSize="cover"
                                    bgPos="center"
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      backgroundImage: `url(${attribute?.thumbnail})`,
                                      borderRadius: "5px",
                                    }}
                                  ></Box>

                                  <Box
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      borderRadius: "5px",
                                    }}
                                    w={{
                                      base: 40,
                                      md: 40,
                                    }}
                                    bg={("#F9FAFB", "#2D3748")}
                                    mt={-3}
                                    shadow="lg"
                                    overflow="hidden"
                                  >
                                    <chakra.h3
                                      className="NftTitle"
                                      py={1}
                                      textAlign="center"
                                      fontWeight="bold"
                                      textTransform="uppercase"
                                      color={("#1A202C", "#F7FAFC")}
                                      letterSpacing={1}
                                    >
                                      {attribute?.name}
                                    </chakra.h3>

                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                      py={1}
                                      px={2}
                                      bg={("#F9FAFB", "#4A5568")}
                                    >
                                      <VStack spacing="2px">
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            {" "}
                                            <chakra.span
                                              color={("#2D3748", "#F7FAFC")}
                                            >
                                              {attribute?.type}
                                            </chakra.span>
                                          </HStack>
                                        </Flex>

                                        <chakra.span
                                          fontWeight="bold"
                                          color={("#2D3748", "#F7FAFC")}
                                        ></chakra.span>
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            <Spacer />

                                            <HStack>
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    style={{ width: "120px" }}
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onDeactivateWeapon({});
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Deactivate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                            <Spacer />
                                          </HStack>
                                        </Flex>
                                      </VStack>
                                    </Flex>
                                  </Box>
                                </Flex>
                              </Flex>
                            );
                          })}
                      </Skeleton>
                    </>
                  ) : (
                    <></>
                  )}

                  {avatarData.name === "Reptilian" ? (
                    <>
                      {/* Skin */}
                      <Skeleton loading={!Attributes}>
                        {Attributes &&
                          Attributes.Skin.map((attribute, index) => {
                            return (
                              <Flex
                                key={index}
                                p={90}
                                w="20%"
                                h="60%"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Flex
                                  direction="column"
                                  justifyContent="center"
                                  alignItems="center"
                                  w="sm"
                                  mx="auto"
                                >
                                  <Box
                                    bg="#CBD5E0"
                                    h={90}
                                    w="70%"
                                    shadow="md"
                                    bgSize="cover"
                                    bgPos="center"
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      backgroundImage: `url(${attribute?.thumbnail})`,
                                      borderRadius: "5px",
                                    }}
                                  ></Box>

                                  <Box
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      borderRadius: "5px",
                                    }}
                                    w={{
                                      base: 40,
                                      md: 40,
                                    }}
                                    bg={("#F9FAFB", "#2D3748")}
                                    mt={-3}
                                    shadow="lg"
                                    overflow="hidden"
                                  >
                                    <chakra.h3
                                      className="NftTitle"
                                      py={1}
                                      textAlign="center"
                                      fontWeight="bold"
                                      textTransform="uppercase"
                                      color={("#1A202C", "#F7FAFC")}
                                      letterSpacing={1}
                                    >
                                      {attribute?.name}
                                    </chakra.h3>

                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                      py={1}
                                      px={2}
                                      bg={("#F9FAFB", "#4A5568")}
                                    >
                                      <VStack spacing="2px">
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            {" "}
                                            <chakra.span
                                              color={("#2D3748", "#F7FAFC")}
                                            >
                                              {attribute?.type}
                                            </chakra.span>
                                          </HStack>
                                        </Flex>

                                        <chakra.span
                                          fontWeight="bold"
                                          color={("#2D3748", "#F7FAFC")}
                                        ></chakra.span>
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            <Spacer />

                                            <HStack>
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    style={{ width: "120px" }}
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onDeactivateSkin({});
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Deactivate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                            <Spacer />
                                          </HStack>
                                        </Flex>
                                      </VStack>
                                    </Flex>
                                  </Box>
                                </Flex>
                              </Flex>
                            );
                          })}
                      </Skeleton>

                      {/* Head */}
                      <Skeleton loading={!Attributes}>
                        {Attributes &&
                          Attributes.Head.map((attribute, index) => {
                            return (
                              <Flex
                                key={index}
                                p={90}
                                w="20%"
                                h="60%"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Flex
                                  direction="column"
                                  justifyContent="center"
                                  alignItems="center"
                                  w="sm"
                                  mx="auto"
                                >
                                  <Box
                                    bg="#CBD5E0"
                                    h={90}
                                    w="70%"
                                    shadow="md"
                                    bgSize="cover"
                                    bgPos="center"
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      backgroundImage: `url(${attribute?.thumbnail})`,
                                      borderRadius: "5px",
                                    }}
                                  ></Box>

                                  <Box
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      borderRadius: "5px",
                                    }}
                                    w={{
                                      base: 40,
                                      md: 40,
                                    }}
                                    bg={("#F9FAFB", "#2D3748")}
                                    mt={-3}
                                    shadow="lg"
                                    overflow="hidden"
                                  >
                                    <chakra.h3
                                      className="NftTitle"
                                      py={1}
                                      textAlign="center"
                                      fontWeight="bold"
                                      textTransform="uppercase"
                                      color={("#1A202C", "#F7FAFC")}
                                      letterSpacing={1}
                                    >
                                      {attribute?.name}
                                    </chakra.h3>

                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                      py={1}
                                      px={2}
                                      bg={("#F9FAFB", "#4A5568")}
                                    >
                                      <VStack spacing="2px">
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            {" "}
                                            <chakra.span
                                              color={("#2D3748", "#F7FAFC")}
                                            >
                                              {attribute?.type}
                                            </chakra.span>
                                          </HStack>
                                        </Flex>

                                        <chakra.span
                                          fontWeight="bold"
                                          color={("#2D3748", "#F7FAFC")}
                                        ></chakra.span>
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            <Spacer />

                                            <HStack>
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    style={{ width: "120px" }}
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onDeactivateHead({});
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Deactivate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                            <Spacer />
                                          </HStack>
                                        </Flex>
                                      </VStack>
                                    </Flex>
                                  </Box>
                                </Flex>
                              </Flex>
                            );
                          })}
                      </Skeleton>

                      {/* Eyes */}
                      <Skeleton loading={!Attributes}>
                        {Attributes &&
                          Attributes.Eyes.map((attribute, index) => {
                            return (
                              <Flex
                                key={index}
                                p={90}
                                w="20%"
                                h="60%"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Flex
                                  direction="column"
                                  justifyContent="center"
                                  alignItems="center"
                                  w="sm"
                                  mx="auto"
                                >
                                  <Box
                                    bg="#CBD5E0"
                                    h={90}
                                    w="70%"
                                    shadow="md"
                                    bgSize="cover"
                                    bgPos="center"
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      backgroundImage: `url(${attribute?.thumbnail})`,
                                      borderRadius: "5px",
                                    }}
                                  ></Box>

                                  <Box
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      borderRadius: "5px",
                                    }}
                                    w={{
                                      base: 40,
                                      md: 40,
                                    }}
                                    bg={("#F9FAFB", "#2D3748")}
                                    mt={-3}
                                    shadow="lg"
                                    overflow="hidden"
                                  >
                                    <chakra.h3
                                      className="NftTitle"
                                      py={1}
                                      textAlign="center"
                                      fontWeight="bold"
                                      textTransform="uppercase"
                                      color={("#1A202C", "#F7FAFC")}
                                      letterSpacing={1}
                                    >
                                      {attribute?.name}
                                    </chakra.h3>

                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                      py={1}
                                      px={2}
                                      bg={("#F9FAFB", "#4A5568")}
                                    >
                                      <VStack spacing="2px">
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            {" "}
                                            <chakra.span
                                              color={("#2D3748", "#F7FAFC")}
                                            >
                                              {attribute?.type}
                                            </chakra.span>
                                          </HStack>
                                        </Flex>

                                        <chakra.span
                                          fontWeight="bold"
                                          color={("#2D3748", "#F7FAFC")}
                                        ></chakra.span>
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            <Spacer />

                                            <HStack>
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    style={{ width: "120px" }}
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onDeactivateEyes({});
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Deactivate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                            <Spacer />
                                          </HStack>
                                        </Flex>
                                      </VStack>
                                    </Flex>
                                  </Box>
                                </Flex>
                              </Flex>
                            );
                          })}
                      </Skeleton>

                      {/* Armor */}
                      <Skeleton loading={!Attributes}>
                        {Attributes &&
                          Attributes.Armor.map((attribute, index) => {
                            return (
                              <Flex
                                key={index}
                                p={90}
                                w="20%"
                                h="60%"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Flex
                                  direction="column"
                                  justifyContent="center"
                                  alignItems="center"
                                  w="sm"
                                  mx="auto"
                                >
                                  <Box
                                    bg="#CBD5E0"
                                    h={90}
                                    w="70%"
                                    shadow="md"
                                    bgSize="cover"
                                    bgPos="center"
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      backgroundImage: `url(${attribute?.thumbnail})`,
                                      borderRadius: "5px",
                                    }}
                                  ></Box>

                                  <Box
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      borderRadius: "5px",
                                    }}
                                    w={{
                                      base: 40,
                                      md: 40,
                                    }}
                                    bg={("#F9FAFB", "#2D3748")}
                                    mt={-3}
                                    shadow="lg"
                                    overflow="hidden"
                                  >
                                    <chakra.h3
                                      className="NftTitle"
                                      py={1}
                                      textAlign="center"
                                      fontWeight="bold"
                                      textTransform="uppercase"
                                      color={("#1A202C", "#F7FAFC")}
                                      letterSpacing={1}
                                    >
                                      {attribute?.name}
                                    </chakra.h3>

                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                      py={1}
                                      px={2}
                                      bg={("#F9FAFB", "#4A5568")}
                                    >
                                      <VStack spacing="2px">
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            {" "}
                                            <chakra.span
                                              color={("#2D3748", "#F7FAFC")}
                                            >
                                              {attribute?.type}
                                            </chakra.span>
                                          </HStack>
                                        </Flex>

                                        <chakra.span
                                          fontWeight="bold"
                                          color={("#2D3748", "#F7FAFC")}
                                        ></chakra.span>
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            <Spacer />

                                            <HStack>
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    style={{ width: "120px" }}
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onDeactivateArmor({});
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Deactivate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                            <Spacer />
                                          </HStack>
                                        </Flex>
                                      </VStack>
                                    </Flex>
                                  </Box>
                                </Flex>
                              </Flex>
                            );
                          })}
                      </Skeleton>

                      {/* Weapon */}
                      <Skeleton loading={!Attributes}>
                        {Attributes &&
                          Attributes.Weapon.map((attribute, index) => {
                            return (
                              <Flex
                                key={index}
                                p={90}
                                w="20%"
                                h="60%"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Flex
                                  direction="column"
                                  justifyContent="center"
                                  alignItems="center"
                                  w="sm"
                                  mx="auto"
                                >
                                  <Box
                                    bg="#CBD5E0"
                                    h={90}
                                    w="70%"
                                    shadow="md"
                                    bgSize="cover"
                                    bgPos="center"
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      backgroundImage: `url(${attribute?.thumbnail})`,
                                      borderRadius: "5px",
                                    }}
                                  ></Box>

                                  <Box
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      borderRadius: "5px",
                                    }}
                                    w={{
                                      base: 40,
                                      md: 40,
                                    }}
                                    bg={("#F9FAFB", "#2D3748")}
                                    mt={-3}
                                    shadow="lg"
                                    overflow="hidden"
                                  >
                                    <chakra.h3
                                      className="NftTitle"
                                      py={1}
                                      textAlign="center"
                                      fontWeight="bold"
                                      textTransform="uppercase"
                                      color={("#1A202C", "#F7FAFC")}
                                      letterSpacing={1}
                                    >
                                      {attribute?.name}
                                    </chakra.h3>

                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                      py={1}
                                      px={2}
                                      bg={("#F9FAFB", "#4A5568")}
                                    >
                                      <VStack spacing="2px">
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            {" "}
                                            <chakra.span
                                              color={("#2D3748", "#F7FAFC")}
                                            >
                                              {attribute?.type}
                                            </chakra.span>
                                          </HStack>
                                        </Flex>

                                        <chakra.span
                                          fontWeight="bold"
                                          color={("#2D3748", "#F7FAFC")}
                                        ></chakra.span>
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            <Spacer />

                                            <HStack>
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    style={{ width: "120px" }}
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onDeactivateWeapon({});
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Deactivate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                            <Spacer />
                                          </HStack>
                                        </Flex>
                                      </VStack>
                                    </Flex>
                                  </Box>
                                </Flex>
                              </Flex>
                            );
                          })}
                      </Skeleton>
                    </>
                  ) : (
                    <></>
                  )}

                  {avatarData.name === "Pleiadian" ? (
                    <>
                      {/* Skin */}
                      <Skeleton loading={!Attributes}>
                        {Attributes &&
                          Attributes.Skin.map((attribute, index) => {
                            return (
                              <Flex
                                key={index}
                                p={90}
                                w="20%"
                                h="60%"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Flex
                                  direction="column"
                                  justifyContent="center"
                                  alignItems="center"
                                  w="sm"
                                  mx="auto"
                                >
                                  <Box
                                    bg="#CBD5E0"
                                    h={90}
                                    w="70%"
                                    shadow="md"
                                    bgSize="cover"
                                    bgPos="center"
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      backgroundImage: `url(${attribute?.thumbnail})`,
                                      borderRadius: "5px",
                                    }}
                                  ></Box>

                                  <Box
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      borderRadius: "5px",
                                    }}
                                    w={{
                                      base: 40,
                                      md: 40,
                                    }}
                                    bg={("#F9FAFB", "#2D3748")}
                                    mt={-3}
                                    shadow="lg"
                                    overflow="hidden"
                                  >
                                    <chakra.h3
                                      className="NftTitle"
                                      py={1}
                                      textAlign="center"
                                      fontWeight="bold"
                                      textTransform="uppercase"
                                      color={("#1A202C", "#F7FAFC")}
                                      letterSpacing={1}
                                    >
                                      {attribute?.name}
                                    </chakra.h3>

                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                      py={1}
                                      px={2}
                                      bg={("#F9FAFB", "#4A5568")}
                                    >
                                      <VStack spacing="2px">
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            {" "}
                                            <chakra.span
                                              color={("#2D3748", "#F7FAFC")}
                                            >
                                              {attribute?.type}
                                            </chakra.span>
                                          </HStack>
                                        </Flex>

                                        <chakra.span
                                          fontWeight="bold"
                                          color={("#2D3748", "#F7FAFC")}
                                        ></chakra.span>
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            <Spacer />

                                            <HStack>
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    style={{ width: "120px" }}
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onDeactivateSkin({});
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Deactivate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                            <Spacer />
                                          </HStack>
                                        </Flex>
                                      </VStack>
                                    </Flex>
                                  </Box>
                                </Flex>
                              </Flex>
                            );
                          })}
                      </Skeleton>

                      {/* Eyes */}
                      <Skeleton loading={!Attributes}>
                        {Attributes &&
                          Attributes.Eyes.map((attribute, index) => {
                            return (
                              <Flex
                                key={index}
                                p={90}
                                w="20%"
                                h="60%"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Flex
                                  direction="column"
                                  justifyContent="center"
                                  alignItems="center"
                                  w="sm"
                                  mx="auto"
                                >
                                  <Box
                                    bg="#CBD5E0"
                                    h={90}
                                    w="70%"
                                    shadow="md"
                                    bgSize="cover"
                                    bgPos="center"
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      backgroundImage: `url(${attribute?.thumbnail})`,
                                      borderRadius: "5px",
                                    }}
                                  ></Box>

                                  <Box
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      borderRadius: "5px",
                                    }}
                                    w={{
                                      base: 40,
                                      md: 40,
                                    }}
                                    bg={("#F9FAFB", "#2D3748")}
                                    mt={-3}
                                    shadow="lg"
                                    overflow="hidden"
                                  >
                                    <chakra.h3
                                      className="NftTitle"
                                      py={1}
                                      textAlign="center"
                                      fontWeight="bold"
                                      textTransform="uppercase"
                                      color={("#1A202C", "#F7FAFC")}
                                      letterSpacing={1}
                                    >
                                      {attribute?.name}
                                    </chakra.h3>

                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                      py={1}
                                      px={2}
                                      bg={("#F9FAFB", "#4A5568")}
                                    >
                                      <VStack spacing="2px">
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            {" "}
                                            <chakra.span
                                              color={("#2D3748", "#F7FAFC")}
                                            >
                                              {attribute?.type}
                                            </chakra.span>
                                          </HStack>
                                        </Flex>

                                        <chakra.span
                                          fontWeight="bold"
                                          color={("#2D3748", "#F7FAFC")}
                                        ></chakra.span>
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            <Spacer />

                                            <HStack>
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    style={{ width: "120px" }}
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onDeactivateEyes({});
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Deactivate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                            <Spacer />
                                          </HStack>
                                        </Flex>
                                      </VStack>
                                    </Flex>
                                  </Box>
                                </Flex>
                              </Flex>
                            );
                          })}
                      </Skeleton>

                      {/* Mag */}
                      {/* <Skeleton loading={!Attributes}>
                        {Attributes &&
                          Attributes.Mag.map((attribute, index) => {
                            return (
                              <Flex
                                key={index}
                                p={90}
                                w="20%"
                                h="60%"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Flex
                                  direction="column"
                                  justifyContent="center"
                                  alignItems="center"
                                  w="sm"
                                  mx="auto"
                                >
                                  <Box
                                    bg="#CBD5E0"
                                    h={90}
                                    w="70%"
                                    shadow="md"
                                    bgSize="cover"
                                    bgPos="center"
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      backgroundImage: `url(${attribute?.thumbnail})`,
                                      borderRadius: "5px",
                                    }}
                                  ></Box>

                                  <Box
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      borderRadius: "5px",
                                    }}
                                    w={{
                                      base: 40,
                                      md: 40,
                                    }}
                                    bg={("#F9FAFB", "#2D3748")}
                                    mt={-3}
                                    shadow="lg"
                                    overflow="hidden"
                                  >
                                    <chakra.h3
                                      className="NftTitle"
                                      py={1}
                                      textAlign="center"
                                      fontWeight="bold"
                                      textTransform="uppercase"
                                      color={("#1A202C", "#F7FAFC")}
                                      letterSpacing={1}
                                    >
                                      {attribute?.name}
                                    </chakra.h3>

                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                      py={1}
                                      px={2}
                                      bg={("#F9FAFB", "#4A5568")}
                                    >
                                      <VStack spacing="2px">
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            {" "}
                                            <chakra.span
                                              color={("#2D3748", "#F7FAFC")}
                                            >
                                              {attribute?.type}
                                            </chakra.span>
                                          </HStack>
                                        </Flex>

                                        <chakra.span
                                          fontWeight="bold"
                                          color={("#2D3748", "#F7FAFC")}
                                        ></chakra.span>
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            <Spacer />

                                            <HStack>
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    style={{ width: "120px" }}
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onDeactivateMag({});
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Deactivate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                            <Spacer />
                                          </HStack>
                                        </Flex>
                                      </VStack>
                                    </Flex>
                                  </Box>
                                </Flex>
                              </Flex>
                            );
                          })}
                      </Skeleton> */}

                      {/* Armor */}
                      <Skeleton loading={!Attributes}>
                        {Attributes &&
                          Attributes.Armor.map((attribute, index) => {
                            return (
                              <Flex
                                key={index}
                                p={90}
                                w="20%"
                                h="60%"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Flex
                                  direction="column"
                                  justifyContent="center"
                                  alignItems="center"
                                  w="sm"
                                  mx="auto"
                                >
                                  <Box
                                    bg="#CBD5E0"
                                    h={90}
                                    w="70%"
                                    shadow="md"
                                    bgSize="cover"
                                    bgPos="center"
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      backgroundImage: `url(${attribute?.thumbnail})`,
                                      borderRadius: "5px",
                                    }}
                                  ></Box>

                                  <Box
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      borderRadius: "5px",
                                    }}
                                    w={{
                                      base: 40,
                                      md: 40,
                                    }}
                                    bg={("#F9FAFB", "#2D3748")}
                                    mt={-3}
                                    shadow="lg"
                                    overflow="hidden"
                                  >
                                    <chakra.h3
                                      className="NftTitle"
                                      py={1}
                                      textAlign="center"
                                      fontWeight="bold"
                                      textTransform="uppercase"
                                      color={("#1A202C", "#F7FAFC")}
                                      letterSpacing={1}
                                    >
                                      {attribute?.name}
                                    </chakra.h3>

                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                      py={1}
                                      px={2}
                                      bg={("#F9FAFB", "#4A5568")}
                                    >
                                      <VStack spacing="2px">
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            {" "}
                                            <chakra.span
                                              color={("#2D3748", "#F7FAFC")}
                                            >
                                              {attribute?.type}
                                            </chakra.span>
                                          </HStack>
                                        </Flex>

                                        <chakra.span
                                          fontWeight="bold"
                                          color={("#2D3748", "#F7FAFC")}
                                        ></chakra.span>
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            <Spacer />

                                            <HStack>
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    style={{ width: "120px" }}
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onDeactivateArmor({});
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Deactivate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                            <Spacer />
                                          </HStack>
                                        </Flex>
                                      </VStack>
                                    </Flex>
                                  </Box>
                                </Flex>
                              </Flex>
                            );
                          })}
                      </Skeleton>

                      {/* Weapon */}
                      <Skeleton loading={!Attributes}>
                        {Attributes &&
                          Attributes.Weapon.map((attribute, index) => {
                            return (
                              <Flex
                                key={index}
                                p={90}
                                w="20%"
                                h="60%"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Flex
                                  direction="column"
                                  justifyContent="center"
                                  alignItems="center"
                                  w="sm"
                                  mx="auto"
                                >
                                  <Box
                                    bg="#CBD5E0"
                                    h={90}
                                    w="70%"
                                    shadow="md"
                                    bgSize="cover"
                                    bgPos="center"
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      backgroundImage: `url(${attribute?.thumbnail})`,
                                      borderRadius: "5px",
                                    }}
                                  ></Box>

                                  <Box
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      borderRadius: "5px",
                                    }}
                                    w={{
                                      base: 40,
                                      md: 40,
                                    }}
                                    bg={("#F9FAFB", "#2D3748")}
                                    mt={-3}
                                    shadow="lg"
                                    overflow="hidden"
                                  >
                                    <chakra.h3
                                      className="NftTitle"
                                      py={1}
                                      textAlign="center"
                                      fontWeight="bold"
                                      textTransform="uppercase"
                                      color={("#1A202C", "#F7FAFC")}
                                      letterSpacing={1}
                                    >
                                      {attribute?.name}
                                    </chakra.h3>

                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                      py={1}
                                      px={2}
                                      bg={("#F9FAFB", "#4A5568")}
                                    >
                                      <VStack spacing="2px">
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            {" "}
                                            <chakra.span
                                              color={("#2D3748", "#F7FAFC")}
                                            >
                                              {attribute?.type}
                                            </chakra.span>
                                          </HStack>
                                        </Flex>

                                        <chakra.span
                                          fontWeight="bold"
                                          color={("#2D3748", "#F7FAFC")}
                                        ></chakra.span>
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            <Spacer />

                                            <HStack>
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    style={{ width: "120px" }}
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onDeactivateWeapon({});
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Deactivate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                            <Spacer />
                                          </HStack>
                                        </Flex>
                                      </VStack>
                                    </Flex>
                                  </Box>
                                </Flex>
                              </Flex>
                            );
                          })}
                      </Skeleton>
                    </>
                  ) : (
                    <></>
                  )}
                </div>

                {/* <Modal
         title={`Transfer ${nftToSend?.name || "NFT"}`}
         visible={visible}
         onCancel={() => setVisibility(false)}
         onOk={() => transfer(nftToSend, amountToSend, receiverToSend)}
         confirmLoading={isPending}
         okText="Send"
       >
         <AddressInput autoFocus placeholder="Receiver" onChange={setReceiver} />
         {nftToSend && nftToSend.contract_type === "erc1155" && (
           <Input
             placeholder="amount to send"
             onChange={(e) => handleChange(e)}
           />
         )}
       </Modal> */}
              </div>
            </div>
          </Scrollbars>
        ) : (
          // LIGHT MODE ON

          <Scrollbars style={styles.ScrollLight}>
            <div>
              <div
                style={{
                  padding: "10px",
                  width: "100%",
                  paddingBottom: "75px",
                }}
              >
                <div style={styles.NFTs}>
                  {/* Background */}
                  <Skeleton loading={!Attributes}>
                    {Attributes &&
                      Attributes.Background.map((attribute, index) => {
                        return (
                          <Flex
                            key={index}
                            p={90}
                            w="20%"
                            h="60%"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Flex
                              direction="column"
                              justifyContent="center"
                              alignItems="center"
                              w="sm"
                              mx="auto"
                            >
                              <Box
                                bg="#CBD5E0"
                                h={90}
                                w="70%"
                                shadow="md"
                                bgSize="cover"
                                bgPos="center"
                                style={{
                                  boxShadow: "5px 5px 6px 0px grey",
                                  backgroundImage: `url(${attribute?.thumbnail})`,
                                  borderRadius: "5px",
                                }}
                              ></Box>

                              <Box
                                style={{
                                  boxShadow: "5px 5px 6px 0px grey",
                                  borderRadius: "5px",
                                }}
                                w={{
                                  base: 40,
                                  md: 40,
                                }}
                                bg={("#F9FAFB", "#2D3748")}
                                mt={-3}
                                shadow="lg"
                                overflow="hidden"
                              >
                                <chakra.h3
                                  className="NftTitle"
                                  py={1}
                                  textAlign="center"
                                  fontWeight="bold"
                                  textTransform="uppercase"
                                  color={("#1A202C", "#F7FAFC")}
                                  letterSpacing={1}
                                >
                                  {attribute?.name}
                                </chakra.h3>

                                <Flex
                                  alignItems="center"
                                  justifyContent="center"
                                  py={1}
                                  px={2}
                                  bg={("#F9FAFB", "#4A5568")}
                                >
                                  <VStack spacing="2px">
                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                    >
                                      <HStack>
                                        {" "}
                                        <chakra.span
                                          color={("#2D3748", "#F7FAFC")}
                                        >
                                          {attribute?.type}
                                        </chakra.span>
                                      </HStack>
                                    </Flex>

                                    <chakra.span
                                      fontWeight="bold"
                                      color={("#2D3748", "#F7FAFC")}
                                    ></chakra.span>
                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                    >
                                      <HStack>
                                        <Spacer />
                                        <HStack>
                                          <Center>
                                            <Spacer>
                                              <AwesomeButtonProgress
                                                style={{ width: "120px" }}
                                                type="secondary"
                                                size="medium"
                                                loadingLabel="Wait..."
                                                resultLabel="Done!"
                                                action={(e, alert) => {
                                                  onDeactivateBackground({});
                                                  setTimeout(() => {
                                                    alert("Success!");
                                                  }, 5000);
                                                }}
                                              >
                                                Deactivate
                                              </AwesomeButtonProgress>
                                            </Spacer>
                                          </Center>
                                        </HStack>
                                        <Spacer />
                                      </HStack>
                                    </Flex>
                                  </VStack>
                                </Flex>
                              </Box>
                            </Flex>
                          </Flex>
                        );

                        // return (
                        //   <Card
                        //     hoverable
                        //     style={{
                        //       width: 100,
                        //       height: 200,
                        //       border: "3px solid #e7eaf3",
                        //       boxShadow: "5px 5px 6px 0px grey",
                        //     }}
                        //     cover={
                        //       <Image
                        //         preview={false}
                        //         src={attribute?.thumbnail || "error"}
                        //         fallback="data:image/png;base64,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"
                        //         alt=""
                        //         style={{ height: "100px" }}
                        //         // onClick={() =>
                        //         //   window.open(
                        //         //     `${getExplorer(chainId)}address/${
                        //         //       nft.token_address
                        //         //     }`,
                        //         //     "_blank"
                        //         //   )
                        //         // }
                        //       />
                        //     }
                        //     key={index}
                        //   >
                        //     <Meta
                        //       style={{ padding: "4px" }}
                        //       title={attribute.type}
                        //       description={attribute.name}
                        //       // uri={nft.token_uri}
                        //       // onClick={() =>
                        //       //   window.open(
                        //       //     `${getExplorer(chainId)}address/${
                        //       //       nft.token_address
                        //       //     }`,
                        //       //     "_blank"
                        //       //   )
                        //       // }
                        //     />
                        //   </Card>
                        // );
                      })}
                  </Skeleton>

                  {/* Music */}
                  <Skeleton loading={!Attributes}>
                    {Attributes &&
                      Attributes.Music.map((attribute, index) => {
                        return (
                          <Flex
                            key={index}
                            p={90}
                            w="20%"
                            h="60%"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Flex
                              direction="column"
                              justifyContent="center"
                              alignItems="center"
                              w="sm"
                              mx="auto"
                            >
                              <Box
                                bg="#CBD5E0"
                                h={90}
                                w="70%"
                                shadow="md"
                                bgSize="cover"
                                bgPos="center"
                                style={{
                                  boxShadow: "5px 5px 6px 0px grey",
                                  backgroundImage: `url(${attribute?.thumbnail})`,
                                  borderRadius: "5px",
                                }}
                              ></Box>

                              <Box
                                style={{
                                  boxShadow: "5px 5px 6px 0px grey",
                                  borderRadius: "5px",
                                }}
                                w={{
                                  base: 40,
                                  md: 40,
                                }}
                                bg={("#F9FAFB", "#2D3748")}
                                mt={-3}
                                shadow="lg"
                                overflow="hidden"
                              >
                                <chakra.h3
                                  className="NftTitle"
                                  py={1}
                                  textAlign="center"
                                  fontWeight="bold"
                                  textTransform="uppercase"
                                  color={("#1A202C", "#F7FAFC")}
                                  letterSpacing={1}
                                >
                                  {attribute?.name}
                                </chakra.h3>

                                <Flex
                                  alignItems="center"
                                  justifyContent="center"
                                  py={1}
                                  px={2}
                                  bg={("#F9FAFB", "#4A5568")}
                                >
                                  <VStack spacing="2px">
                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                    >
                                      <HStack>
                                        {" "}
                                        <chakra.span
                                          color={("#2D3748", "#F7FAFC")}
                                        >
                                          {attribute?.type}
                                        </chakra.span>
                                      </HStack>
                                    </Flex>

                                    <chakra.span
                                      fontWeight="bold"
                                      color={("#2D3748", "#F7FAFC")}
                                    ></chakra.span>
                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                    >
                                      <HStack>
                                        <Spacer />

                                        <HStack>
                                          <Center>
                                            <Spacer>
                                              <AwesomeButtonProgress
                                                style={{ width: "120px" }}
                                                type="secondary"
                                                size="medium"
                                                loadingLabel="Wait..."
                                                resultLabel="Done!"
                                                action={(e, alert) => {
                                                  onDeactivateMusic({});
                                                  setTimeout(() => {
                                                    alert("Success!");
                                                  }, 5000);
                                                }}
                                              >
                                                Deactivate
                                              </AwesomeButtonProgress>
                                            </Spacer>
                                          </Center>
                                        </HStack>
                                        <Spacer />
                                      </HStack>
                                    </Flex>
                                  </VStack>
                                </Flex>
                              </Box>
                            </Flex>
                          </Flex>
                        );

                        // return (
                        //   <Card
                        //     hoverable
                        //     style={{
                        //       width: 100,
                        //       height: 200,
                        //       border: "3px solid #e7eaf3",
                        //       boxShadow: "5px 5px 6px 0px grey",
                        //     }}
                        //     cover={
                        //       <Image
                        //         preview={false}
                        //         src={attribute?.thumbnail || "error"}
                        //         fallback="data:image/png;base64,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"
                        //         alt=""
                        //         style={{ height: "100px" }}
                        //         // onClick={() =>
                        //         //   window.open(
                        //         //     `${getExplorer(chainId)}address/${
                        //         //       nft.token_address
                        //         //     }`,
                        //         //     "_blank"
                        //         //   )
                        //         // }
                        //       />
                        //     }
                        //     key={index}
                        //   >
                        //     <Meta
                        //       style={{ padding: "4px" }}
                        //       title={attribute.type}
                        //       description={attribute.name}
                        //       // uri={nft.token_uri}
                        //       // onClick={() =>
                        //       //   window.open(
                        //       //     `${getExplorer(chainId)}address/${
                        //       //       nft.token_address
                        //       //     }`,
                        //       //     "_blank"
                        //       //   )
                        //       // }
                        //     />
                        //   </Card>
                        // );
                      })}
                  </Skeleton>

                  {/* Avatar */}
                  <Skeleton loading={!Attributes}>
                    {Attributes &&
                      Attributes.Avatar.map((attribute, index) => {
                        return (
                          <Flex
                            key={index}
                            p={90}
                            w="20%"
                            h="60%"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Flex
                              direction="column"
                              justifyContent="center"
                              alignItems="center"
                              w="sm"
                              mx="auto"
                            >
                              <Box
                                bg="#CBD5E0"
                                h={90}
                                w="70%"
                                shadow="md"
                                bgSize="cover"
                                bgPos="center"
                                style={{
                                  boxShadow: "5px 5px 6px 0px grey",
                                  backgroundImage: `url(${attribute?.thumbnail})`,
                                  borderRadius: "5px",
                                }}
                              ></Box>

                              <Box
                                style={{
                                  boxShadow: "5px 5px 6px 0px grey",
                                  borderRadius: "5px",
                                }}
                                w={{
                                  base: 40,
                                  md: 40,
                                }}
                                bg={("#F9FAFB", "#2D3748")}
                                mt={-3}
                                shadow="lg"
                                overflow="hidden"
                              >
                                <chakra.h3
                                  className="NftTitle"
                                  py={1}
                                  textAlign="center"
                                  fontWeight="bold"
                                  textTransform="uppercase"
                                  color={("#1A202C", "#F7FAFC")}
                                  letterSpacing={1}
                                >
                                  {attribute?.name}
                                  {/* {attribute?.name} # {attribute?.token_id} */}
                                </chakra.h3>

                                <Flex
                                  alignItems="center"
                                  justifyContent="center"
                                  py={1}
                                  px={2}
                                  bg={("#F9FAFB", "#4A5568")}
                                >
                                  <VStack spacing="2px">
                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                    >
                                      <HStack>
                                        {" "}
                                        <chakra.span
                                          color={("#2D3748", "#F7FAFC")}
                                        >
                                          {attribute?.type}
                                        </chakra.span>
                                      </HStack>
                                    </Flex>

                                    <chakra.span
                                      fontWeight="bold"
                                      color={("#2D3748", "#F7FAFC")}
                                    ></chakra.span>
                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                    >
                                      <HStack>
                                        <Spacer />
                                        <HStack>
                                          <Center>
                                            <Spacer>
                                              <AwesomeButtonProgress
                                                style={{ width: "120px" }}
                                                type="secondary"
                                                size="medium"
                                                loadingLabel="Wait..."
                                                resultLabel="Done!"
                                                action={(e, alert) => {
                                                  onDeactivateAvatar({});
                                                  setTimeout(() => {
                                                    alert("Success!");
                                                  }, 5000);
                                                }}
                                              >
                                                Deactivate
                                              </AwesomeButtonProgress>
                                            </Spacer>
                                          </Center>
                                        </HStack>

                                        <Spacer />
                                      </HStack>
                                    </Flex>
                                  </VStack>
                                </Flex>
                              </Box>
                            </Flex>
                          </Flex>
                        );

                        // return (
                        //   <Card
                        //     hoverable
                        //     style={{
                        //       width: 100,
                        //       height: 200,
                        //       border: "3px solid #e7eaf3",
                        //       boxShadow: "5px 5px 6px 0px grey",
                        //     }}
                        //     cover={
                        //       <Image
                        //         preview={false}
                        //         src={attribute?.thumbnail || "error"}
                        //         fallback="data:image/png;base64,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"
                        //         alt=""
                        //         style={{ height: "100px" }}
                        //         // onClick={() =>
                        //         //   window.open(
                        //         //     `${getExplorer(chainId)}address/${
                        //         //       nft.token_address
                        //         //     }`,
                        //         //     "_blank"
                        //         //   )
                        //         // }
                        //       />
                        //     }
                        //     key={index}
                        //   >
                        //     <Meta
                        //       style={{ padding: "4px" }}
                        //       title={attribute.type}
                        //       description={attribute.name}
                        //       // uri={nft.token_uri}
                        //       // onClick={() =>
                        //       //   window.open(
                        //       //     `${getExplorer(chainId)}address/${
                        //       //       nft.token_address
                        //       //     }`,
                        //       //     "_blank"
                        //       //   )
                        //       // }
                        //     />
                        //   </Card>
                        // );
                      })}
                  </Skeleton>

                  {avatarData.name === "Grey" ? (
                    <>
                      {/* Skin */}
                      <Skeleton loading={!Attributes}>
                        {Attributes &&
                          Attributes.Skin.map((attribute, index) => {
                            return (
                              <Flex
                                key={index}
                                p={90}
                                w="20%"
                                h="60%"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Flex
                                  direction="column"
                                  justifyContent="center"
                                  alignItems="center"
                                  w="sm"
                                  mx="auto"
                                >
                                  <Box
                                    bg="#CBD5E0"
                                    h={90}
                                    w="70%"
                                    shadow="md"
                                    bgSize="cover"
                                    bgPos="center"
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      backgroundImage: `url(${attribute?.thumbnail})`,
                                      borderRadius: "5px",
                                    }}
                                  ></Box>

                                  <Box
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      borderRadius: "5px",
                                    }}
                                    w={{
                                      base: 40,
                                      md: 40,
                                    }}
                                    bg={("#F9FAFB", "#2D3748")}
                                    mt={-3}
                                    shadow="lg"
                                    overflow="hidden"
                                  >
                                    <chakra.h3
                                      className="NftTitle"
                                      py={1}
                                      textAlign="center"
                                      fontWeight="bold"
                                      textTransform="uppercase"
                                      color={("#1A202C", "#F7FAFC")}
                                      letterSpacing={1}
                                    >
                                      {attribute?.name}
                                    </chakra.h3>

                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                      py={1}
                                      px={2}
                                      bg={("#F9FAFB", "#4A5568")}
                                    >
                                      <VStack spacing="2px">
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            {" "}
                                            <chakra.span
                                              color={("#2D3748", "#F7FAFC")}
                                            >
                                              {attribute?.type}
                                            </chakra.span>
                                          </HStack>
                                        </Flex>

                                        <chakra.span
                                          fontWeight="bold"
                                          color={("#2D3748", "#F7FAFC")}
                                        ></chakra.span>
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            <Spacer />
                                            <HStack>
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    style={{ width: "120px" }}
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onDeactivateSkin({});
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Deactivate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                            <Spacer />
                                          </HStack>
                                        </Flex>
                                      </VStack>
                                    </Flex>
                                  </Box>
                                </Flex>
                              </Flex>
                            );
                          })}
                      </Skeleton>

                      {/* Head */}
                      <Skeleton loading={!Attributes}>
                        {Attributes &&
                          Attributes.Head.map((attribute, index) => {
                            return (
                              <Flex
                                key={index}
                                p={90}
                                w="20%"
                                h="60%"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Flex
                                  direction="column"
                                  justifyContent="center"
                                  alignItems="center"
                                  w="sm"
                                  mx="auto"
                                >
                                  <Box
                                    bg="#CBD5E0"
                                    h={90}
                                    w="70%"
                                    shadow="md"
                                    bgSize="cover"
                                    bgPos="center"
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      backgroundImage: `url(${attribute?.thumbnail})`,
                                      borderRadius: "5px",
                                    }}
                                  ></Box>

                                  <Box
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      borderRadius: "5px",
                                    }}
                                    w={{
                                      base: 40,
                                      md: 40,
                                    }}
                                    bg={("#F9FAFB", "#2D3748")}
                                    mt={-3}
                                    shadow="lg"
                                    overflow="hidden"
                                  >
                                    <chakra.h3
                                      className="NftTitle"
                                      py={1}
                                      textAlign="center"
                                      fontWeight="bold"
                                      textTransform="uppercase"
                                      color={("#1A202C", "#F7FAFC")}
                                      letterSpacing={1}
                                    >
                                      {attribute?.name}
                                    </chakra.h3>

                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                      py={1}
                                      px={2}
                                      bg={("#F9FAFB", "#4A5568")}
                                    >
                                      <VStack spacing="2px">
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            {" "}
                                            <chakra.span
                                              color={("#2D3748", "#F7FAFC")}
                                            >
                                              {attribute?.type}
                                            </chakra.span>
                                          </HStack>
                                        </Flex>

                                        <chakra.span
                                          fontWeight="bold"
                                          color={("#2D3748", "#F7FAFC")}
                                        ></chakra.span>
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            <Spacer />
                                            <HStack>
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    style={{ width: "120px" }}
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onDeactivateHead({});
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Deactivate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                            <Spacer />
                                          </HStack>
                                        </Flex>
                                      </VStack>
                                    </Flex>
                                  </Box>
                                </Flex>
                              </Flex>
                            );
                          })}
                      </Skeleton>

                      {/* Eyes */}
                      <Skeleton loading={!Attributes}>
                        {Attributes &&
                          Attributes.Eyes.map((attribute, index) => {
                            return (
                              <Flex
                                key={index}
                                p={90}
                                w="20%"
                                h="60%"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Flex
                                  direction="column"
                                  justifyContent="center"
                                  alignItems="center"
                                  w="sm"
                                  mx="auto"
                                >
                                  <Box
                                    bg="#CBD5E0"
                                    h={90}
                                    w="70%"
                                    shadow="md"
                                    bgSize="cover"
                                    bgPos="center"
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      backgroundImage: `url(${attribute?.thumbnail})`,
                                      borderRadius: "5px",
                                    }}
                                  ></Box>

                                  <Box
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      borderRadius: "5px",
                                    }}
                                    w={{
                                      base: 40,
                                      md: 40,
                                    }}
                                    bg={("#F9FAFB", "#2D3748")}
                                    mt={-3}
                                    shadow="lg"
                                    overflow="hidden"
                                  >
                                    <chakra.h3
                                      className="NftTitle"
                                      py={1}
                                      textAlign="center"
                                      fontWeight="bold"
                                      textTransform="uppercase"
                                      color={("#1A202C", "#F7FAFC")}
                                      letterSpacing={1}
                                    >
                                      {attribute?.name}
                                    </chakra.h3>

                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                      py={1}
                                      px={2}
                                      bg={("#F9FAFB", "#4A5568")}
                                    >
                                      <VStack spacing="2px">
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            {" "}
                                            <chakra.span
                                              color={("#2D3748", "#F7FAFC")}
                                            >
                                              {attribute?.type}
                                            </chakra.span>
                                          </HStack>
                                        </Flex>

                                        <chakra.span
                                          fontWeight="bold"
                                          color={("#2D3748", "#F7FAFC")}
                                        ></chakra.span>
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            <Spacer />
                                            <HStack>
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    style={{ width: "120px" }}
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onDeactivateEyes({});
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Deactivate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>

                                            <Spacer />
                                          </HStack>
                                        </Flex>
                                      </VStack>
                                    </Flex>
                                  </Box>
                                </Flex>
                              </Flex>
                            );
                          })}
                      </Skeleton>

                      {/* Mag */}
                      {/* <Skeleton loading={!Attributes}>
                        {Attributes &&
                          Attributes.Mag.map((attribute, index) => {
                            return (
                              <Flex
                                key={index}
                                p={90}
                                w="20%"
                                h="60%"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Flex
                                  direction="column"
                                  justifyContent="center"
                                  alignItems="center"
                                  w="sm"
                                  mx="auto"
                                >
                                  <Box
                                    bg="#CBD5E0"
                                    h={90}
                                    w="70%"
                                    shadow="md"
                                    bgSize="cover"
                                    bgPos="center"
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      backgroundImage: `url(${attribute?.thumbnail})`,
                                      borderRadius: "5px",
                                    }}
                                  ></Box>

                                  <Box
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      borderRadius: "5px",
                                    }}
                                    w={{
                                      base: 40,
                                      md: 40,
                                    }}
                                    bg={("#F9FAFB", "#2D3748")}
                                    mt={-3}
                                    shadow="lg"
                                    overflow="hidden"
                                  >
                                    <chakra.h3
                                      className="NftTitle"
                                      py={1}
                                      textAlign="center"
                                      fontWeight="bold"
                                      textTransform="uppercase"
                                      color={("#1A202C", "#F7FAFC")}
                                      letterSpacing={1}
                                    >
                                      {attribute?.name}
                                    </chakra.h3>

                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                      py={1}
                                      px={2}
                                      bg={("#F9FAFB", "#4A5568")}
                                    >
                                      <VStack spacing="2px">
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            {" "}
                                            <chakra.span
                                              color={("#2D3748", "#F7FAFC")}
                                            >
                                              {attribute?.type}
                                            </chakra.span>
                                          </HStack>
                                        </Flex>

                                        <chakra.span
                                          fontWeight="bold"
                                          color={("#2D3748", "#F7FAFC")}
                                        ></chakra.span>
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            <Spacer />

                                            <HStack>
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    style={{ width: "120px" }}
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onDeactivateMag({});
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Deactivate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                            <Spacer />
                                          </HStack>
                                        </Flex>
                                      </VStack>
                                    </Flex>
                                  </Box>
                                </Flex>
                              </Flex>
                            );
                          })}
                      </Skeleton> */}

                      {/* Armor */}
                      <Skeleton loading={!Attributes}>
                        {Attributes &&
                          Attributes.Armor.map((attribute, index) => {
                            return (
                              <Flex
                                key={index}
                                p={90}
                                w="20%"
                                h="60%"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Flex
                                  direction="column"
                                  justifyContent="center"
                                  alignItems="center"
                                  w="sm"
                                  mx="auto"
                                >
                                  <Box
                                    bg="#CBD5E0"
                                    h={90}
                                    w="70%"
                                    shadow="md"
                                    bgSize="cover"
                                    bgPos="center"
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      backgroundImage: `url(${attribute?.thumbnail})`,
                                      borderRadius: "5px",
                                    }}
                                  ></Box>

                                  <Box
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      borderRadius: "5px",
                                    }}
                                    w={{
                                      base: 40,
                                      md: 40,
                                    }}
                                    bg={("#F9FAFB", "#2D3748")}
                                    mt={-3}
                                    shadow="lg"
                                    overflow="hidden"
                                  >
                                    <chakra.h3
                                      className="NftTitle"
                                      py={1}
                                      textAlign="center"
                                      fontWeight="bold"
                                      textTransform="uppercase"
                                      color={("#1A202C", "#F7FAFC")}
                                      letterSpacing={1}
                                    >
                                      {attribute?.name}
                                    </chakra.h3>

                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                      py={1}
                                      px={2}
                                      bg={("#F9FAFB", "#4A5568")}
                                    >
                                      <VStack spacing="2px">
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            {" "}
                                            <chakra.span
                                              color={("#2D3748", "#F7FAFC")}
                                            >
                                              {attribute?.type}
                                            </chakra.span>
                                          </HStack>
                                        </Flex>

                                        <chakra.span
                                          fontWeight="bold"
                                          color={("#2D3748", "#F7FAFC")}
                                        ></chakra.span>
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            <Spacer />
                                            <HStack>
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    style={{ width: "120px" }}
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onDeactivateArmor({});
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Deactivate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                            <Spacer />
                                          </HStack>
                                        </Flex>
                                      </VStack>
                                    </Flex>
                                  </Box>
                                </Flex>
                              </Flex>
                            );
                          })}
                      </Skeleton>

                      {/* Weapon */}
                      <Skeleton loading={!Attributes}>
                        {Attributes &&
                          Attributes.Weapon.map((attribute, index) => {
                            return (
                              <Flex
                                key={index}
                                p={90}
                                w="20%"
                                h="60%"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Flex
                                  direction="column"
                                  justifyContent="center"
                                  alignItems="center"
                                  w="sm"
                                  mx="auto"
                                >
                                  <Box
                                    bg="#CBD5E0"
                                    h={90}
                                    w="70%"
                                    shadow="md"
                                    bgSize="cover"
                                    bgPos="center"
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      backgroundImage: `url(${attribute?.thumbnail})`,
                                      borderRadius: "5px",
                                    }}
                                  ></Box>

                                  <Box
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      borderRadius: "5px",
                                    }}
                                    w={{
                                      base: 40,
                                      md: 40,
                                    }}
                                    bg={("#F9FAFB", "#2D3748")}
                                    mt={-3}
                                    shadow="lg"
                                    overflow="hidden"
                                  >
                                    <chakra.h3
                                      className="NftTitle"
                                      py={1}
                                      textAlign="center"
                                      fontWeight="bold"
                                      textTransform="uppercase"
                                      color={("#1A202C", "#F7FAFC")}
                                      letterSpacing={1}
                                    >
                                      {attribute?.name}
                                    </chakra.h3>

                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                      py={1}
                                      px={2}
                                      bg={("#F9FAFB", "#4A5568")}
                                    >
                                      <VStack spacing="2px">
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            {" "}
                                            <chakra.span
                                              color={("#2D3748", "#F7FAFC")}
                                            >
                                              {attribute?.type}
                                            </chakra.span>
                                          </HStack>
                                        </Flex>

                                        <chakra.span
                                          fontWeight="bold"
                                          color={("#2D3748", "#F7FAFC")}
                                        ></chakra.span>
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            <Spacer />
                                            <HStack>
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    style={{ width: "120px" }}
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onDeactivateWeapon({});
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Deactivate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                            <Spacer />
                                          </HStack>
                                        </Flex>
                                      </VStack>
                                    </Flex>
                                  </Box>
                                </Flex>
                              </Flex>
                            );
                          })}
                      </Skeleton>
                    </>
                  ) : (
                    <></>
                  )}

                  {avatarData.name === "Reptilian" ? (
                    <>
                      {/* Skin */}
                      <Skeleton loading={!Attributes}>
                        {Attributes &&
                          Attributes.Skin.map((attribute, index) => {
                            return (
                              <Flex
                                key={index}
                                p={90}
                                w="20%"
                                h="60%"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Flex
                                  direction="column"
                                  justifyContent="center"
                                  alignItems="center"
                                  w="sm"
                                  mx="auto"
                                >
                                  <Box
                                    bg="#CBD5E0"
                                    h={90}
                                    w="70%"
                                    shadow="md"
                                    bgSize="cover"
                                    bgPos="center"
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      backgroundImage: `url(${attribute?.thumbnail})`,
                                      borderRadius: "5px",
                                    }}
                                  ></Box>

                                  <Box
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      borderRadius: "5px",
                                    }}
                                    w={{
                                      base: 40,
                                      md: 40,
                                    }}
                                    bg={("#F9FAFB", "#2D3748")}
                                    mt={-3}
                                    shadow="lg"
                                    overflow="hidden"
                                  >
                                    <chakra.h3
                                      className="NftTitle"
                                      py={1}
                                      textAlign="center"
                                      fontWeight="bold"
                                      textTransform="uppercase"
                                      color={("#1A202C", "#F7FAFC")}
                                      letterSpacing={1}
                                    >
                                      {attribute?.name}
                                    </chakra.h3>

                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                      py={1}
                                      px={2}
                                      bg={("#F9FAFB", "#4A5568")}
                                    >
                                      <VStack spacing="2px">
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            {" "}
                                            <chakra.span
                                              color={("#2D3748", "#F7FAFC")}
                                            >
                                              {attribute?.type}
                                            </chakra.span>
                                          </HStack>
                                        </Flex>

                                        <chakra.span
                                          fontWeight="bold"
                                          color={("#2D3748", "#F7FAFC")}
                                        ></chakra.span>
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            <Spacer />
                                            <HStack>
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    style={{ width: "120px" }}
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onDeactivateSkin({});
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Deactivate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                            <Spacer />
                                          </HStack>
                                        </Flex>
                                      </VStack>
                                    </Flex>
                                  </Box>
                                </Flex>
                              </Flex>
                            );
                          })}
                      </Skeleton>

                      {/* Head */}
                      <Skeleton loading={!Attributes}>
                        {Attributes &&
                          Attributes.Head.map((attribute, index) => {
                            return (
                              <Flex
                                key={index}
                                p={90}
                                w="20%"
                                h="60%"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Flex
                                  direction="column"
                                  justifyContent="center"
                                  alignItems="center"
                                  w="sm"
                                  mx="auto"
                                >
                                  <Box
                                    bg="#CBD5E0"
                                    h={90}
                                    w="70%"
                                    shadow="md"
                                    bgSize="cover"
                                    bgPos="center"
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      backgroundImage: `url(${attribute?.thumbnail})`,
                                      borderRadius: "5px",
                                    }}
                                  ></Box>

                                  <Box
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      borderRadius: "5px",
                                    }}
                                    w={{
                                      base: 40,
                                      md: 40,
                                    }}
                                    bg={("#F9FAFB", "#2D3748")}
                                    mt={-3}
                                    shadow="lg"
                                    overflow="hidden"
                                  >
                                    <chakra.h3
                                      className="NftTitle"
                                      py={1}
                                      textAlign="center"
                                      fontWeight="bold"
                                      textTransform="uppercase"
                                      color={("#1A202C", "#F7FAFC")}
                                      letterSpacing={1}
                                    >
                                      {attribute?.name}
                                    </chakra.h3>

                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                      py={1}
                                      px={2}
                                      bg={("#F9FAFB", "#4A5568")}
                                    >
                                      <VStack spacing="2px">
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            {" "}
                                            <chakra.span
                                              color={("#2D3748", "#F7FAFC")}
                                            >
                                              {attribute?.type}
                                            </chakra.span>
                                          </HStack>
                                        </Flex>

                                        <chakra.span
                                          fontWeight="bold"
                                          color={("#2D3748", "#F7FAFC")}
                                        ></chakra.span>
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            <Spacer />
                                            <HStack>
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    style={{ width: "120px" }}
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onDeactivateHead({});
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Deactivate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                            <Spacer />
                                          </HStack>
                                        </Flex>
                                      </VStack>
                                    </Flex>
                                  </Box>
                                </Flex>
                              </Flex>
                            );
                          })}
                      </Skeleton>

                      {/* Eyes */}
                      <Skeleton loading={!Attributes}>
                        {Attributes &&
                          Attributes.Eyes.map((attribute, index) => {
                            return (
                              <Flex
                                key={index}
                                p={90}
                                w="20%"
                                h="60%"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Flex
                                  direction="column"
                                  justifyContent="center"
                                  alignItems="center"
                                  w="sm"
                                  mx="auto"
                                >
                                  <Box
                                    bg="#CBD5E0"
                                    h={90}
                                    w="70%"
                                    shadow="md"
                                    bgSize="cover"
                                    bgPos="center"
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      backgroundImage: `url(${attribute?.thumbnail})`,
                                      borderRadius: "5px",
                                    }}
                                  ></Box>

                                  <Box
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      borderRadius: "5px",
                                    }}
                                    w={{
                                      base: 40,
                                      md: 40,
                                    }}
                                    bg={("#F9FAFB", "#2D3748")}
                                    mt={-3}
                                    shadow="lg"
                                    overflow="hidden"
                                  >
                                    <chakra.h3
                                      className="NftTitle"
                                      py={1}
                                      textAlign="center"
                                      fontWeight="bold"
                                      textTransform="uppercase"
                                      color={("#1A202C", "#F7FAFC")}
                                      letterSpacing={1}
                                    >
                                      {attribute?.name}
                                    </chakra.h3>

                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                      py={1}
                                      px={2}
                                      bg={("#F9FAFB", "#4A5568")}
                                    >
                                      <VStack spacing="2px">
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            {" "}
                                            <chakra.span
                                              color={("#2D3748", "#F7FAFC")}
                                            >
                                              {attribute?.type}
                                            </chakra.span>
                                          </HStack>
                                        </Flex>

                                        <chakra.span
                                          fontWeight="bold"
                                          color={("#2D3748", "#F7FAFC")}
                                        ></chakra.span>
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            <Spacer />
                                            <HStack>
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    style={{ width: "120px" }}
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onDeactivateEyes({});
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Deactivate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>

                                            <Spacer />
                                          </HStack>
                                        </Flex>
                                      </VStack>
                                    </Flex>
                                  </Box>
                                </Flex>
                              </Flex>
                            );
                          })}
                      </Skeleton>

                      {/* Mag */}
                      {/* <Skeleton loading={!Attributes}>
                        {Attributes &&
                          Attributes.Mag.map((attribute, index) => {
                            return (
                              <Flex
                                key={index}
                                p={90}
                                w="20%"
                                h="60%"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Flex
                                  direction="column"
                                  justifyContent="center"
                                  alignItems="center"
                                  w="sm"
                                  mx="auto"
                                >
                                  <Box
                                    bg="#CBD5E0"
                                    h={90}
                                    w="70%"
                                    shadow="md"
                                    bgSize="cover"
                                    bgPos="center"
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      backgroundImage: `url(${attribute?.thumbnail})`,
                                      borderRadius: "5px",
                                    }}
                                  ></Box>

                                  <Box
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      borderRadius: "5px",
                                    }}
                                    w={{
                                      base: 40,
                                      md: 40,
                                    }}
                                    bg={("#F9FAFB", "#2D3748")}
                                    mt={-3}
                                    shadow="lg"
                                    overflow="hidden"
                                  >
                                    <chakra.h3
                                      className="NftTitle"
                                      py={1}
                                      textAlign="center"
                                      fontWeight="bold"
                                      textTransform="uppercase"
                                      color={("#1A202C", "#F7FAFC")}
                                      letterSpacing={1}
                                    >
                                      {attribute?.name}
                                    </chakra.h3>

                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                      py={1}
                                      px={2}
                                      bg={("#F9FAFB", "#4A5568")}
                                    >
                                      <VStack spacing="2px">
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            {" "}
                                            <chakra.span
                                              color={("#2D3748", "#F7FAFC")}
                                            >
                                              {attribute?.type}
                                            </chakra.span>
                                          </HStack>
                                        </Flex>

                                        <chakra.span
                                          fontWeight="bold"
                                          color={("#2D3748", "#F7FAFC")}
                                        ></chakra.span>
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            <Spacer />

                                            <HStack>
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    style={{ width: "120px" }}
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onDeactivateMag({});
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Deactivate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                            <Spacer />
                                          </HStack>
                                        </Flex>
                                      </VStack>
                                    </Flex>
                                  </Box>
                                </Flex>
                              </Flex>
                            );
                          })}
                      </Skeleton> */}

                      {/* Armor */}
                      <Skeleton loading={!Attributes}>
                        {Attributes &&
                          Attributes.Armor.map((attribute, index) => {
                            return (
                              <Flex
                                key={index}
                                p={90}
                                w="20%"
                                h="60%"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Flex
                                  direction="column"
                                  justifyContent="center"
                                  alignItems="center"
                                  w="sm"
                                  mx="auto"
                                >
                                  <Box
                                    bg="#CBD5E0"
                                    h={90}
                                    w="70%"
                                    shadow="md"
                                    bgSize="cover"
                                    bgPos="center"
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      backgroundImage: `url(${attribute?.thumbnail})`,
                                      borderRadius: "5px",
                                    }}
                                  ></Box>

                                  <Box
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      borderRadius: "5px",
                                    }}
                                    w={{
                                      base: 40,
                                      md: 40,
                                    }}
                                    bg={("#F9FAFB", "#2D3748")}
                                    mt={-3}
                                    shadow="lg"
                                    overflow="hidden"
                                  >
                                    <chakra.h3
                                      className="NftTitle"
                                      py={1}
                                      textAlign="center"
                                      fontWeight="bold"
                                      textTransform="uppercase"
                                      color={("#1A202C", "#F7FAFC")}
                                      letterSpacing={1}
                                    >
                                      {attribute?.name}
                                    </chakra.h3>

                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                      py={1}
                                      px={2}
                                      bg={("#F9FAFB", "#4A5568")}
                                    >
                                      <VStack spacing="2px">
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            {" "}
                                            <chakra.span
                                              color={("#2D3748", "#F7FAFC")}
                                            >
                                              {attribute?.type}
                                            </chakra.span>
                                          </HStack>
                                        </Flex>

                                        <chakra.span
                                          fontWeight="bold"
                                          color={("#2D3748", "#F7FAFC")}
                                        ></chakra.span>
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            <Spacer />
                                            <HStack>
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    style={{ width: "120px" }}
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onDeactivateArmor({});
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Deactivate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                            <Spacer />
                                          </HStack>
                                        </Flex>
                                      </VStack>
                                    </Flex>
                                  </Box>
                                </Flex>
                              </Flex>
                            );
                          })}
                      </Skeleton>

                      {/* Weapon */}
                      <Skeleton loading={!Attributes}>
                        {Attributes &&
                          Attributes.Weapon.map((attribute, index) => {
                            return (
                              <Flex
                                key={index}
                                p={90}
                                w="20%"
                                h="60%"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Flex
                                  direction="column"
                                  justifyContent="center"
                                  alignItems="center"
                                  w="sm"
                                  mx="auto"
                                >
                                  <Box
                                    bg="#CBD5E0"
                                    h={90}
                                    w="70%"
                                    shadow="md"
                                    bgSize="cover"
                                    bgPos="center"
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      backgroundImage: `url(${attribute?.thumbnail})`,
                                      borderRadius: "5px",
                                    }}
                                  ></Box>

                                  <Box
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      borderRadius: "5px",
                                    }}
                                    w={{
                                      base: 40,
                                      md: 40,
                                    }}
                                    bg={("#F9FAFB", "#2D3748")}
                                    mt={-3}
                                    shadow="lg"
                                    overflow="hidden"
                                  >
                                    <chakra.h3
                                      className="NftTitle"
                                      py={1}
                                      textAlign="center"
                                      fontWeight="bold"
                                      textTransform="uppercase"
                                      color={("#1A202C", "#F7FAFC")}
                                      letterSpacing={1}
                                    >
                                      {attribute?.name}
                                    </chakra.h3>

                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                      py={1}
                                      px={2}
                                      bg={("#F9FAFB", "#4A5568")}
                                    >
                                      <VStack spacing="2px">
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            {" "}
                                            <chakra.span
                                              color={("#2D3748", "#F7FAFC")}
                                            >
                                              {attribute?.type}
                                            </chakra.span>
                                          </HStack>
                                        </Flex>

                                        <chakra.span
                                          fontWeight="bold"
                                          color={("#2D3748", "#F7FAFC")}
                                        ></chakra.span>
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            <Spacer />
                                            <HStack>
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    style={{ width: "120px" }}
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onDeactivateWeapon({});
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Deactivate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                            <Spacer />
                                          </HStack>
                                        </Flex>
                                      </VStack>
                                    </Flex>
                                  </Box>
                                </Flex>
                              </Flex>
                            );
                          })}
                      </Skeleton>
                    </>
                  ) : (
                    <></>
                  )}

                  {avatarData.name === "Pleiadian" ? (
                    <>
                      {/* Skin */}
                      <Skeleton loading={!Attributes}>
                        {Attributes &&
                          Attributes.Skin.map((attribute, index) => {
                            return (
                              <Flex
                                key={index}
                                p={90}
                                w="20%"
                                h="60%"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Flex
                                  direction="column"
                                  justifyContent="center"
                                  alignItems="center"
                                  w="sm"
                                  mx="auto"
                                >
                                  <Box
                                    bg="#CBD5E0"
                                    h={90}
                                    w="70%"
                                    shadow="md"
                                    bgSize="cover"
                                    bgPos="center"
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      backgroundImage: `url(${attribute?.thumbnail})`,
                                      borderRadius: "5px",
                                    }}
                                  ></Box>

                                  <Box
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      borderRadius: "5px",
                                    }}
                                    w={{
                                      base: 40,
                                      md: 40,
                                    }}
                                    bg={("#F9FAFB", "#2D3748")}
                                    mt={-3}
                                    shadow="lg"
                                    overflow="hidden"
                                  >
                                    <chakra.h3
                                      className="NftTitle"
                                      py={1}
                                      textAlign="center"
                                      fontWeight="bold"
                                      textTransform="uppercase"
                                      color={("#1A202C", "#F7FAFC")}
                                      letterSpacing={1}
                                    >
                                      {attribute?.name}
                                    </chakra.h3>

                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                      py={1}
                                      px={2}
                                      bg={("#F9FAFB", "#4A5568")}
                                    >
                                      <VStack spacing="2px">
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            {" "}
                                            <chakra.span
                                              color={("#2D3748", "#F7FAFC")}
                                            >
                                              {attribute?.type}
                                            </chakra.span>
                                          </HStack>
                                        </Flex>

                                        <chakra.span
                                          fontWeight="bold"
                                          color={("#2D3748", "#F7FAFC")}
                                        ></chakra.span>
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            <Spacer />
                                            <HStack>
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    style={{ width: "120px" }}
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onDeactivateSkin({});
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Deactivate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                            <Spacer />
                                          </HStack>
                                        </Flex>
                                      </VStack>
                                    </Flex>
                                  </Box>
                                </Flex>
                              </Flex>
                            );
                          })}
                      </Skeleton>

                      {/* Eyes */}
                      <Skeleton loading={!Attributes}>
                        {Attributes &&
                          Attributes.Eyes.map((attribute, index) => {
                            return (
                              <Flex
                                key={index}
                                p={90}
                                w="20%"
                                h="60%"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Flex
                                  direction="column"
                                  justifyContent="center"
                                  alignItems="center"
                                  w="sm"
                                  mx="auto"
                                >
                                  <Box
                                    bg="#CBD5E0"
                                    h={90}
                                    w="70%"
                                    shadow="md"
                                    bgSize="cover"
                                    bgPos="center"
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      backgroundImage: `url(${attribute?.thumbnail})`,
                                      borderRadius: "5px",
                                    }}
                                  ></Box>

                                  <Box
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      borderRadius: "5px",
                                    }}
                                    w={{
                                      base: 40,
                                      md: 40,
                                    }}
                                    bg={("#F9FAFB", "#2D3748")}
                                    mt={-3}
                                    shadow="lg"
                                    overflow="hidden"
                                  >
                                    <chakra.h3
                                      className="NftTitle"
                                      py={1}
                                      textAlign="center"
                                      fontWeight="bold"
                                      textTransform="uppercase"
                                      color={("#1A202C", "#F7FAFC")}
                                      letterSpacing={1}
                                    >
                                      {attribute?.name}
                                    </chakra.h3>

                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                      py={1}
                                      px={2}
                                      bg={("#F9FAFB", "#4A5568")}
                                    >
                                      <VStack spacing="2px">
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            {" "}
                                            <chakra.span
                                              color={("#2D3748", "#F7FAFC")}
                                            >
                                              {attribute?.type}
                                            </chakra.span>
                                          </HStack>
                                        </Flex>

                                        <chakra.span
                                          fontWeight="bold"
                                          color={("#2D3748", "#F7FAFC")}
                                        ></chakra.span>
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            <Spacer />
                                            <HStack>
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    style={{ width: "120px" }}
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onDeactivateEyes({});
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Deactivate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>

                                            <Spacer />
                                          </HStack>
                                        </Flex>
                                      </VStack>
                                    </Flex>
                                  </Box>
                                </Flex>
                              </Flex>
                            );
                          })}
                      </Skeleton>

                      {/* Mag */}
                      {/* <Skeleton loading={!Attributes}>
                        {Attributes &&
                          Attributes.Mag.map((attribute, index) => {
                            return (
                              <Flex
                                key={index}
                                p={90}
                                w="20%"
                                h="60%"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Flex
                                  direction="column"
                                  justifyContent="center"
                                  alignItems="center"
                                  w="sm"
                                  mx="auto"
                                >
                                  <Box
                                    bg="#CBD5E0"
                                    h={90}
                                    w="70%"
                                    shadow="md"
                                    bgSize="cover"
                                    bgPos="center"
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      backgroundImage: `url(${attribute?.thumbnail})`,
                                      borderRadius: "5px",
                                    }}
                                  ></Box>

                                  <Box
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      borderRadius: "5px",
                                    }}
                                    w={{
                                      base: 40,
                                      md: 40,
                                    }}
                                    bg={("#F9FAFB", "#2D3748")}
                                    mt={-3}
                                    shadow="lg"
                                    overflow="hidden"
                                  >
                                    <chakra.h3
                                      className="NftTitle"
                                      py={1}
                                      textAlign="center"
                                      fontWeight="bold"
                                      textTransform="uppercase"
                                      color={("#1A202C", "#F7FAFC")}
                                      letterSpacing={1}
                                    >
                                      {attribute?.name}
                                    </chakra.h3>

                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                      py={1}
                                      px={2}
                                      bg={("#F9FAFB", "#4A5568")}
                                    >
                                      <VStack spacing="2px">
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            {" "}
                                            <chakra.span
                                              color={("#2D3748", "#F7FAFC")}
                                            >
                                              {attribute?.type}
                                            </chakra.span>
                                          </HStack>
                                        </Flex>

                                        <chakra.span
                                          fontWeight="bold"
                                          color={("#2D3748", "#F7FAFC")}
                                        ></chakra.span>
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            <Spacer />

                                            <HStack>
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    style={{ width: "120px" }}
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onDeactivateMag({});
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Deactivate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                            <Spacer />
                                          </HStack>
                                        </Flex>
                                      </VStack>
                                    </Flex>
                                  </Box>
                                </Flex>
                              </Flex>
                            );
                          })}
                      </Skeleton> */}

                      {/* Armor */}
                      <Skeleton loading={!Attributes}>
                        {Attributes &&
                          Attributes.Armor.map((attribute, index) => {
                            return (
                              <Flex
                                key={index}
                                p={90}
                                w="20%"
                                h="60%"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Flex
                                  direction="column"
                                  justifyContent="center"
                                  alignItems="center"
                                  w="sm"
                                  mx="auto"
                                >
                                  <Box
                                    bg="#CBD5E0"
                                    h={90}
                                    w="70%"
                                    shadow="md"
                                    bgSize="cover"
                                    bgPos="center"
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      backgroundImage: `url(${attribute?.thumbnail})`,
                                      borderRadius: "5px",
                                    }}
                                  ></Box>

                                  <Box
                                    style={{
                                      boxShadow: "5px 5px 6px 0px grey",
                                      borderRadius: "5px",
                                    }}
                                    w={{
                                      base: 40,
                                      md: 40,
                                    }}
                                    bg={("#F9FAFB", "#2D3748")}
                                    mt={-3}
                                    shadow="lg"
                                    overflow="hidden"
                                  >
                                    <chakra.h3
                                      className="NftTitle"
                                      py={1}
                                      textAlign="center"
                                      fontWeight="bold"
                                      textTransform="uppercase"
                                      color={("#1A202C", "#F7FAFC")}
                                      letterSpacing={1}
                                    >
                                      {attribute?.name}
                                    </chakra.h3>

                                    <Flex
                                      alignItems="center"
                                      justifyContent="center"
                                      py={1}
                                      px={2}
                                      bg={("#F9FAFB", "#4A5568")}
                                    >
                                      <VStack spacing="2px">
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            {" "}
                                            <chakra.span
                                              color={("#2D3748", "#F7FAFC")}
                                            >
                                              {attribute?.type}
                                            </chakra.span>
                                          </HStack>
                                        </Flex>

                                        <chakra.span
                                          fontWeight="bold"
                                          color={("#2D3748", "#F7FAFC")}
                                        ></chakra.span>
                                        <Flex
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <HStack>
                                            <Spacer />
                                            <HStack>
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    style={{ width: "120px" }}
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onDeactivateArmor({});
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Deactivate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                            <Spacer />
                                          </HStack>
                                        </Flex>
                                      </VStack>
                                    </Flex>
                                  </Box>
                                </Flex>
                              </Flex>
                            );
                          })}
                      </Skeleton>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </Scrollbars>
        )}
      </VStack>
    </>
  );
}

export default ActiveLoadout;
