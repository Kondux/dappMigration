import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Center,
  Heading,
  chakra,
  Spacer,
  Flex,
  VStack,
  HStack,
  useColorMode,
} from "@chakra-ui/react";
import { Scrollbars } from "react-custom-scrollbars-2";
import {
  AwesomeButtonProgress,
  AwesomeButtonSocial,
} from "react-awesome-button";
// import "../../node_modules/react-awesome-button/dist/themes/theme-rickiest.css";
import { Card, Image, Tooltip, Skeleton } from "antd";

import { useMoralis, useNewMoralisObject } from "react-moralis";
import Moralis from "moralis-v1";

// import { useVerifyMetadata } from "../hooks/useVerifyMetadata";
// import { useNFTBalance } from "../hooks/useNFTBalance";

function NftOwned({
  bgFilter,
  musicFilter,
  avatarFilter,
  skinFilter,
  headFilter,
  eyesFilter,
  armorFilter,
  weaponFilter,
}) {
  const { isAuthenticated, user, chainId } = useMoralis();

  const ethAddress = user.get("ethAddress");
  const [kNFTsOwned, setKNFTsOwned] = useState(undefined);
  const { colorMode, toggleColorMode } = useColorMode();
  const [filterActive, setFilterActive] = useState(false);

  // const { verifyMetadata } = useVerifyMetadata();

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
      // Show what the user has (KNFTS)

      // Check wallet for kNFTs
      await fetchNFTsForContract();

      //Sets newUser to false on backend and saves it
      // results.set("newUser", false);
      // await results.save();
      //-----end of newUser----///
    } else {
      //----If not newUser----//

      // Get latest KNFTdata from backend and cache local
      await getKNFTdata();

      // Get latest metadata from backend and sorts it to local
      // await getMetadata();
    }
  };

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
      headers: {
        accept: "application/json",
        "X-API-Key":
          "QiMu7qQwH6b0wUeilUh9fWUW2EHtaNxcoRqcMA5tasRH0oTbL2GRCKLl2W0Joqd5",
      },
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
      setKNFTsOwned(res);
      setTimeout(() => {
        // console.log("kNFTsOwned", kNFTsOwned);
      }, 5000);
    } else {
      // console.log("Does not have any KNFTS.");
      return;
    }
  };

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
    setKNFTsOwned(parseResults);

    const options = {
      method: "GET",
      url: `https://deep-index.moralis.io/api/v2/${ethAddress}/nft`,
      params: {
        chain: "eth",
        format: "decimal",
        token_addresses: "0x7eD509A69F7FD93fD59A557369a9a5dCc1499685",
      },
      headers: {
        accept: "application/json",
        "X-API-Key":
          "QiMu7qQwH6b0wUeilUh9fWUW2EHtaNxcoRqcMA5tasRH0oTbL2GRCKLl2W0Joqd5",
      },
    };

    await axios
      .request(options)
      .then(async function (response) {
        // await setKNFTsOwned(response.data.result);
        // console.log("THIS IS kNFTsOwned", kNFTsOwned);
        // console.log("This is res: ", response.data.result);
        await checkKNFTs(response.data, parseResults);
      })
      .catch(function (error) {
        console.error(error);
      });

    // console.log("THIS IS kNFTsOwned", kNFTsOwned);
  };

  // ------- Function to cache KNFTs to Backend-------------///
  const checkKNFTs = async (res, parseResults) => {
    console.log("THIS IS RES", res);
    console.log("THIS IS currentData", kNFTsOwned);
    console.log("THIS IS kNFTOwn", parseResults);

    // await setKNFTsOwned(res);

    if (res.result.length > 0) {
      // We have a user with cached KNFTS
      if (res.result.length !== parseResults.Amount) {
        // If current length of KNFTs is different
        // Then update

        // Need to reference instance in backend
        const newKNFTOwned = Moralis.Object.extend("KNFT");
        const query = new Moralis.Query(newKNFTOwned);
        query.equalTo("ethAddress", ethAddress);
        const results = await query.first();

        // update that data
        results.set("Owned", res.result);
        results.set("Amount", res.result.length);
        await results.save();
        setKNFTsOwned(res);
        // console.log("Some new KNFTs.");
        // console.log("New Current kNFTsOwned:", kNFTsOwned);
      } else {
        console.log("No new KNFTs.");
        setTimeout(() => {
          // console.log("Current kNFTsOwned:", kNFTsOwned);
        }, 2500);
      }
    }
  };

  // FOR PARSING RESULTS FOR NEW USERS
  function parseFunctionNewUser(results) {
    const resultsParse = JSON.parse(JSON.stringify(results));
    const stringResults = JSON.stringify(resultsParse);
    const finalResults = JSON.parse(stringResults);
    return finalResults;
  }

  useEffect(() => {
    if (
      bgFilter === false &&
      musicFilter === false &&
      avatarFilter === false &&
      skinFilter === false &&
      headFilter === false &&
      eyesFilter === false &&
      armorFilter === false &&
      weaponFilter === false
    ) {
      setFilterActive(false);
      // console.log("This is FA False", filterActive);
    } else {
      setFilterActive(true);
      // console.log("This is FA True", filterActive);
    }

    // need other filter logic
  }, [
    bgFilter,
    musicFilter,
    avatarFilter,
    skinFilter,
    headFilter,
    eyesFilter,
    armorFilter,
    weaponFilter,
  ]);

  const { Meta } = Card;

  const TestNFTs = {
    Background: [
      // {
      //   type: "Background",
      //   name: "First Contact",
      //   thumbnail:
      //     "https://lh3.googleusercontent.com/zBRVzgRKvT11BhbjN-PtLjELIF74X5zlVpcVzCda9zOC--qzvrseSn9tOpvHjjlg2WrLO94-bisOMo6YEfptHLx9jHKDrjI9Iw29Cpc",
      //   link: "FirstContact.glb",
      // },
      // {
      //   type: "Background",
      //   name: "Nucleus",
      //   thumbnail: "https://i.postimg.cc/mg6L9KNj/Nuc.png",
      //   link: "Nucleus.glb",
      // },
      // {
      //   type: "Background",
      //   name: "Cyber City",
      //   thumbnail: "https://i.postimg.cc/HkdtZH97/Cyber-City.png",
      //   link: "CyberCity.glb",
      // },
      // {
      //   type: "Background",
      //   name: "Space Station",
      //   thumbnail: "https://i.postimg.cc/m2SMJS3F/Space.png",
      //   link: "Space.glb",
      // },
      // {
      //   type: "Background",
      //   name: "Vaporware",
      //   thumbnail: "https://i.postimg.cc/cH5wN18m/Vaporware.png",
      //   link: "Vaporware.glb",
      // },
      // {
      //   type: "Background",
      //   name: "Moon",
      //   thumbnail: "https://i.postimg.cc/56dHJ9fR/Moon.png",
      //   link: "Moon.glb",
      // },
      // {
      //   type: "Background",
      //   name: "Pyramids",
      //   thumbnail: "https://i.postimg.cc/Vvh0DX4r/Pyramid.png",
      //   link: "Pyramids.glb",
      // },
      // {
      //   type: "Background",
      //   name: "Island",
      //   thumbnail: "https://i.postimg.cc/wBnDX3gj/island.jpg",
      //   link: "Island.glb",
      // },
      // {
      //   type: "Background",
      //   name: "Gallery",
      //   thumbnail: "https://i.postimg.cc/25Wt14S8/Gallery.png",
      //   link: "Gallery.glb",
      // },
      // {
      //   type: "Background",
      //   name: "Gallery",
      //   thumbnail: "https://i.postimg.cc/25Wt14S8/Gallery.png",
      //   link: "Gallery2.glb",
      // },
    ],

    Music: [
      // {
      //   type: "Music",
      //   name: "Starchaser",
      //   thumbnail: "https://i.postimg.cc/7YbM6CbW/album-art3.jpg",
      //   link: "EmbraceTheMartian",
      // },
      // {
      //   type: "Music",
      //   name: "Sun Worshipper",
      //   thumbnail: "https://i.postimg.cc/TYSjWRDY/album-art2.jpg",
      //   link: "DayNNight",
      // },
      // {
      //   type: "Music",
      //   name: "So Easy",
      //   thumbnail: "https://i.postimg.cc/qB1x4cBK/album-art1.jpg",
      //   link: "Solitude",
      // },
      // {
      //   type: "Music",
      //   name: "Probe The Booty",
      //   thumbnail: "https://i.postimg.cc/NjkYXJCS/Probe-The-Booty.png",
      //   link: "ProbeTheBooty",
      // },
      //   {
      //     type: "Music",
      //     name: "Embrace The Martian",
      //     thumbnail: "https://i.postimg.cc/FHKyX0GV/Embrace.jpg",
      //     link: "EmbraceTheMartian",
      //   },
      //   {
      //     type: "Music",
      //     name: "Day 'N' Night",
      //     thumbnail:
      //       "https://upload.wikimedia.org/wikipedia/en/9/9b/Day_N_Night-Kid_Cudi_.jpg",
      //     link: "DayNNight",
      //   },
      //   {
      //     type: "Music",
      //     name: "Solitude",
      //     thumbnail: "https://f4.bcbits.com/img/a2518596266_16.jpg",
      //     link: "Solitude",
      //   },
      //   {
      //     type: "Music",
      //     name: "Probe The Booty",
      //     thumbnail: "https://i.postimg.cc/NjkYXJCS/Probe-The-Booty.png",
      //     link: "ProbeTheBooty",
      //   },
    ],

    Avatar: [
      // {
      //   type: "Avatar",
      //   name: "Kube",
      //   thumbnail: "https://i.postimg.cc/mrhnx15D/Kube.png",
      //   link: "Kube.glb",
      // },
      // {
      //   type: "Avatar",
      //   name: "Greylian",
      //   thumbnail: "https://i.postimg.cc/xjxXfmfx/Grey.png",
      //   link: "RealGrey.glb",
      // },
      // {
      //   type: "Avatar",
      //   name: "Reptilian",
      //   thumbnail: "https://i.postimg.cc/ydzVjFmP/Rept.png",
      //   link: "Reptilian.glb",
      // },
      // {
      //   type: "Avatar",
      //   name: "CyGrey",
      //   thumbnail: "https://i.postimg.cc/kV97h8bQ/CyGrey.png",
      //   link: "CyGrey.glb",
      // },
      // {
      //   type: "Avatar",
      //   name: "Pleiadian",
      //   thumbnail: "https://i.postimg.cc/fR3QgWGJ/Pleiadian.png",
      //   link: "PleiadianBase.glb",
      // },
      // {
      //     type: "Avatar",
      //     name: "Greylian",
      //     thumbnail: "https://i.postimg.cc/bDmnHL5q/GREYBASE.png",
      //     link: "Greylian.glb",
      // },
      // {
      //   type: "Avatar",
      //   name: "Bored Ape",
      //   thumbnail: "https://i.postimg.cc/Lsw8MrN0/BAYC.png",
      //   link: "BAYC.glb",
      // },
    ],

    Skin: [
      // {
      //   type: "Skin",
      //   name: "Pleiadian Thor",
      //   thumbnail: "https://i.postimg.cc/vZpwRFyX/ThorBase.png",
      //   link: "Thor.glb",
      // },
      // {
      //   type: "Skin",
      //   name: "Pleiadian Rameses",
      //   thumbnail: "https://i.postimg.cc/mD4vj2mv/RamsBase.png",
      //   link: "Rameses.glb",
      // },
      // {
      //   type: "Skin",
      //   name: "Pleiadian Astra",
      //   thumbnail: "https://i.postimg.cc/s26jzkHL/Astra-Base.png",
      //   link: "Princess.glb",
      // },
      // {
      //   type: "Skin",
      //   name: "Pleiadian Amber",
      //   thumbnail: "https://i.postimg.cc/yYCdJF04/Amber.png",
      //   link: "Amber.glb",
      // },
      // {
      //     type: "Skin",
      //     name: "Greylian Tan",
      //     thumbnail: "https://i.postimg.cc/S2ZrkKYJ/TanSkin.png",
      //     link: "https://i.ibb.co/93rg4wC/bgScreen.png",
      // },
      // {
      //     type: "Skin",
      //     name: "Greylian Dark",
      //     thumbnail: "https://i.postimg.cc/r0yJB4mB/DarkSkin.png",
      //     link: "https://i.ibb.co/M7FYJX5/bgScreen.png",
      // },
    ],

    Head: [
      // {
      //   type: "Head",
      //   name: "Helmet",
      //   thumbnail: "https://i.ibb.co/nLq1Nxm/helmet.png",
      //   link: "https://i.ibb.co/nLq1Nxm/helmet.png",
      // },
    ],

    Eyes: [
      // {
      //   type: "Eyes",
      //   name: "Greylian Red",
      //   thumbnail: "https://i.postimg.cc/c699NFfX/RedEyes.png",
      //   link: "https://i.ibb.co/93rg4wC/bgScreen.png",
      // },
      // {
      //   type: "Eyes",
      //   name: "Greylian Green",
      //   thumbnail: "https://i.postimg.cc/fJVHWYKZ/Green-Eyes.png",
      //   link: "https://i.ibb.co/M7FYJX5/bgScreen.png",
      // },
      // {
      //   type: "Eyes",
      //   name: "Greylian Blue",
      //   thumbnail: "https://i.postimg.cc/PP0SCN3D/BlueEyes.png",
      //   link: "https://i.ibb.co/M7FYJX5/bgScreen.png",
      // },
    ],

    Mag: [
      // {
      //     type: "Mag",
      //     name: "Greylian Red",
      //     thumbnail: "https://i.postimg.cc/VS2fTqD6/RedMag.png",
      //     link: "https://i.ibb.co/93rg4wC/bgScreen.png",
      // },
      // {
      //     type: "Mag",
      //     name: "Greylian Blue",
      //     thumbnail: "https://i.postimg.cc/sBMfw6Pq/BlueMag.png",
      //     link: "https://i.ibb.co/93rg4wC/bgScreen.png",
      // },
      // {
      //     type: "Mag",
      //     name: "Greylian Green",
      //     thumbnail: "https://i.postimg.cc/sM6DPdW5/GreenMag.png",
      //     link: "https://i.ibb.co/93rg4wC/bgScreen.png",
      // },
    ],

    Armor: [
      // {
      //   type: "Armor",
      //   name: "Nano",
      //   thumbnail:
      //     "https://i.postimg.cc/fRQRsWTn/Screenshot-2022-07-06-114233.png",
      //   link: "https://i.ibb.co/M7FYJX5/bgScreen.png",
      // },
      // {
      //   type: "Armor",
      //   name: "Alpha",
      //   thumbnail: "https://i.postimg.cc/dthLL0Dq/Alpha.png",
      //   link: "https://i.ibb.co/M7FYJX5/bgScreen.png",
      // },
      // {
      //   type: "Armor",
      //   name: "Beta",
      //   thumbnail: "https://i.postimg.cc/KjHjJ6pS/Beta.png",
      //   link: "https://i.ibb.co/M7FYJX5/bgScreen.png",
      // },
      // {
      //   type: "Armor",
      //   name: "Pleiadian Gun Metal",
      //   thumbnail: "https://i.postimg.cc/PqYsT3rH/Thor-Armor-Gun-Metal.png",
      //   link: "https://i.ibb.co/M7FYJX5/bgScreen.png",
      // },
      // {
      //   type: "Armor",
      //   name: "Pleiadian Cloth Gold",
      //   thumbnail: "https://i.postimg.cc/P5gsLMYr/RamsGold.png",
      //   link: "https://i.ibb.co/M7FYJX5/bgScreen.png",
      // },
      // {
      //     type: "Armor",
      //     name: "Greylian Black",
      //     thumbnail: "https://i.postimg.cc/f3fCqCw7/Black-Armor.png",
      //     link: "https://i.ibb.co/93rg4wC/bgScreen.png",
      // },
      // {
      //     type: "Armor",
      //     name: "Greylian White",
      //     thumbnail: "https://i.postimg.cc/xk2gPhST/White-Armor.png",
      //     link: "https://i.ibb.co/M7FYJX5/bgScreen.png",
      // },
      // {
      //     type: "Armor",
      //     name: "Greylian Earth",
      //     thumbnail: "https://i.postimg.cc/rDWQxc3P/Earth-Armor.png",
      //     link: "https://i.ibb.co/93rg4wC/bgScreen.png",
      // },
      // {
      //     type: "Armor",
      //     name: "Greylian Sun",
      //     thumbnail: "https://i.postimg.cc/0r2W3TKz/Sun-Armor-ong.png",
      //     link: "https://i.ibb.co/M7FYJX5/bgScreen.png",
      // },
      // {
      //   type: "Armor",
      //   name: "CyGrey Kondux Gear",
      //   thumbnail: "https://i.postimg.cc/cLY4yXNJ/Gear.png",
      //   link: "https://i.ibb.co/M7FYJX5/bgScreen.png",
      // },
    ],

    // Head: [
    //   {
    //     type: "Head",
    //     name: "Damaged Helmet",
    //     thumbnail: "https://i.ibb.co/WHBnVWX/helmet-Screen.png",
    //     link: "https://i.ibb.co/WHBnVWX/helmet-Screen.png",
    //   },
    //   {
    //     type: "Head",
    //     name: "Spartan Helmet",
    //     thumbnail: "https://i.ibb.co/0YgXg3X/Spartan.png",
    //     link: "https://i.ibb.co/0YgXg3X/Spartan.png",
    //   },
    // ],
    // UpperBody: [
    //   {
    //     type: "Upper Body",
    //     name: "Hooded Armor",
    //     thumbnail: "https://i.postimg.cc/0N0JNDYj/Hooded.png",
    //     link: "https://i.postimg.cc/0N0JNDYj/Hooded.png",
    //   },
    //   {
    //     type: "Upper Body",
    //     name: "Bulletproof Vest",
    //     thumbnail: "https://i.postimg.cc/JzJk99tb/Bulletproof.png",
    //     link: "https://i.postimg.cc/JzJk99tb/Bulletproof.png",
    //   },
    // ],
    // LeftHand: [
    //   {
    //     type: "Left Hand",
    //     name: "Alien Shield",
    //     thumbnail: "https://i.postimg.cc/DzW5s6cC/Alien-Shield.png",
    //     link: "https://i.postimg.cc/DzW5s6cC/Alien-Shield.png",
    //   },
    //   {
    //     type: "Left Hand",
    //     name: "Medieval Shield",
    //     thumbnail: "https://i.postimg.cc/RZpXNyw6/Medieval-Shield.png",
    //     link: "https://i.postimg.cc/RZpXNyw6/Medieval-Shield.png",
    //   },
    // ],
    // RightHand: [
    //   {
    //     type: "Right Hand",
    //     name: "Ice Sword",
    //     thumbnail: "https://i.ibb.co/TKT6Kwg/Sword-Screen.png",
    //     link: "https://i.ibb.co/TKT6Kwg/Sword-Screen.png",
    //   },
    //   {
    //     type: "Right Hand",
    //     name: "Fire Sword",
    //     thumbnail: "https://i.ibb.co/m023y2C/Fire-Sword.png",
    //     link: "https://i.ibb.co/m023y2C/Fire-Sword.png",
    //   },
    // ],
    // LowerBody: [
    //   {
    //     type: "Lower Body",
    //     name: "Samurai Skirt",
    //     thumbnail: "https://i.postimg.cc/Rh8wM5k4/samurai-skirt.png",
    //     link: "https://i.postimg.cc/Rh8wM5k4/samurai-skirt.png",
    //   },
    //   {
    //     type: "Lower Body",
    //     name: "Cyberpunk Jeans",
    //     thumbnail: "https://i.postimg.cc/Gt9kwhSX/Cyberpunk.png",
    //     link: "https://i.postimg.cc/Gt9kwhSX/Cyberpunk.png",
    //   },
    // ],
    // Back: [
    //   {
    //     type: "Back",
    //     name: "Jetpack",
    //     thumbnail: "https://i.ibb.co/0sJHWnv/Jetpack-Screen.png",
    //     link: "https://i.ibb.co/0sJHWnv/Jetpack-Screen.png",
    //   },
    //   {
    //     type: "Back",
    //     name: "Rucksack",
    //     thumbnail: "https://i.postimg.cc/XYg6mjSM/RuckSack.png",
    //     link: "https://i.postimg.cc/XYg6mjSM/RuckSack.png",
    //   },
    // ],
    Weapon: [
      // {
      //   type: "Weapon",
      //   name: "Laser Sword",
      //   thumbnail: "https://i.ibb.co/RBKH2Tk/Laser-Sword.png",
      //   link: "https://i.ibb.co/RBKH2Tk/Laser-Sword.png",
      // },
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
      height: "72vh",
      backgroundColor: "darkgrey",
      // backgroundColor: "#171923",
      borderRadius: "10px",
      overflowX: "hidden",
      // border: "4px solid ",
      // overflowY: "scroll",
    },
    ScrollLight: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "35vw",
      height: "72vh",
      backgroundColor: "lightgrey",
      borderRadius: "10px",
      overflowX: "hidden",
      // border: "4px solid ",
      // overflowY: "scroll",
    },
  };

  const Attributes = {
    Background: [
      {
        type: "Background",
        name: "First Contact",
        thumbnail:
          "https://lh3.googleusercontent.com/zBRVzgRKvT11BhbjN-PtLjELIF74X5zlVpcVzCda9zOC--qzvrseSn9tOpvHjjlg2WrLO94-bisOMo6YEfptHLx9jHKDrjI9Iw29Cpc",
        link: "https://lh3.googleusercontent.com/zBRVzgRKvT11BhbjN-PtLjELIF74X5zlVpcVzCda9zOC--qzvrseSn9tOpvHjjlg2WrLO94-bisOMo6YEfptHLx9jHKDrjI9Iw29Cpc",
      },
    ],

    Music: [
      {
        type: "Music",
        name: "Skullbeatz - Bad Cat",
        thumbnail:
          "https://uimg.ngfiles.com/profile/2788/2788317.jpg?f1475835794",
        link: "https://uimg.ngfiles.com/profile/2788/2788317.jpg?f1475835794",
      },
    ],

    Avatar: [
      {
        type: "Avatar",
        name: "Robot",
        thumbnail: "https://i.ibb.co/wNF9XDg/Avatar-Screen.png",
        link: "https://i.ibb.co/wNF9XDg/Avatar-Screen.png",
      },
    ],
    Skin: [
      {
        type: "Skin",
        name: "Blue Paint",
        thumbnail: "https://i.ibb.co/93rg4wC/bgScreen.png",
        link: "https://i.ibb.co/93rg4wC/bgScreen.png",
      },
    ],
    Head: [
      {
        type: "Head",
        name: "Damaged Helmet",
        thumbnail: "https://i.ibb.co/WHBnVWX/helmet-Screen.png",
        link: "https://i.ibb.co/WHBnVWX/helmet-Screen.png",
      },
    ],
    UpperBody: [
      {
        type: "Upper Body",
        name: "None",
        thumbnail: "",
        link: "IPFS LINK",
      },
    ],
    LeftHand: [
      {
        type: "Left Hand",
        name: "None",
        thumbnail: "",
        link: "IPFS LINK",
      },
    ],
    RightHand: [
      {
        type: "Right Hand",
        name: "Ice Sword",
        thumbnail: "https://i.ibb.co/TKT6Kwg/Sword-Screen.png",
        link: "https://i.ibb.co/TKT6Kwg/Sword-Screen.png",
      },
    ],
    LowerBody: [
      {
        type: "Lower Body",
        name: "None",
        thumbnail: "",
        link: "IPFS LINK",
      },
    ],
    Back: [
      {
        type: "Back",
        name: "Jetpack",
        thumbnail: "https://i.ibb.co/0sJHWnv/Jetpack-Screen.png",
        link: "https://i.ibb.co/0sJHWnv/Jetpack-Screen.png",
      },
    ],
  };

  // FOR HOVERING OVER NFTS ---///

  const [isOpen, setIsOpen] = React.useState(false);
  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);
  const initRef = useRef();

  // ------- Function BG to Backend -------------///
  const onActivateBackground = async ({ type, name, thumbnail, link }) => {
    let ethAddress = user.get("ethAddress");

    // Need to reference instance in backend
    const Metadata = Moralis.Object.extend("Metadata");
    const query = new Moralis.Query(Metadata);
    query.equalTo("ethAddress", ethAddress);
    const results = await query.first();

    // update that data
    results.set("Background.type", type);
    results.set("Background.name", name);
    results.set("Background.thumbnail", thumbnail);
    results.set("Background.link", link);
    await results.save();
  };

  // ------- Function Music to Backend -------------///
  const onActivateMusic = async ({ type, name, thumbnail, link }) => {
    let ethAddress = user.get("ethAddress");

    // Need to reference instance in backend
    const Metadata = Moralis.Object.extend("Metadata");
    const query = new Moralis.Query(Metadata);
    query.equalTo("ethAddress", ethAddress);
    const results = await query.first();

    // update that data
    results.set("Music.type", type);
    results.set("Music.name", name);
    results.set("Music.thumbnail", thumbnail);
    results.set("Music.link", link);
    await results.save();
  };

  // ------- Function Avatar to Backend -------------///
  const onActivateAvatarBox = async ({
    type,
    name,
    token_id,
    thumbnail,
    link,
  }) => {
    let ethAddress = user.get("ethAddress");

    // Need to reference instance in backend
    const Metadata = Moralis.Object.extend("Metadata");
    const query = new Moralis.Query(Metadata);
    query.equalTo("ethAddress", ethAddress);
    const results = await query.first();

    // update that data
    results.set("Avatar.type", type);
    results.set("Avatar.name", name);
    results.set("Avatar.token_id", token_id);
    results.set("Avatar.thumbnail", thumbnail);
    results.set("Avatar.link", link);
    await results.save();
  };

  // ------- Function Avatar to Backend -------------///
  const onActivateAvatar = async ({ type, name, thumbnail, link }) => {
    let ethAddress = user.get("ethAddress");

    // Need to reference instance in backend
    const Metadata = Moralis.Object.extend("Metadata");
    const query = new Moralis.Query(Metadata);
    query.equalTo("ethAddress", ethAddress);
    const results = await query.first();

    // update that data
    results.set("Avatar.type", type);
    results.set("Avatar.name", name);
    results.set("Avatar.thumbnail", thumbnail);
    results.set("Avatar.link", link);
    await results.save();
  };

  // ------- Function Skin to Backend -------------///
  const onActivateSkin = async ({ type, name, thumbnail, link }) => {
    let ethAddress = user.get("ethAddress");

    // Need to reference instance in backend
    const Metadata = Moralis.Object.extend("Metadata");
    const query = new Moralis.Query(Metadata);
    query.equalTo("ethAddress", ethAddress);
    const results = await query.first();

    // update that data
    results.set("Skin.type", type);
    results.set("Skin.name", name);
    results.set("Skin.thumbnail", thumbnail);
    results.set("Skin.link", link);
    await results.save();
  };

  // ------- Function Head to Backend -------------///
  const onActivateHead = async ({ type, name, thumbnail, link }) => {
    let ethAddress = user.get("ethAddress");

    // Need to reference instance in backend
    const Metadata = Moralis.Object.extend("Metadata");
    const query = new Moralis.Query(Metadata);
    query.equalTo("ethAddress", ethAddress);
    const results = await query.first();

    // update that data
    results.set("Head.type", type);
    results.set("Head.name", name);
    results.set("Head.thumbnail", thumbnail);
    results.set("Head.link", link);
    await results.save();
  };

  // ------- Function Eyes to Backend -------------///
  const onActivateEyes = async ({ type, name, thumbnail, link }) => {
    let ethAddress = user.get("ethAddress");

    // Need to reference instance in backend
    const Metadata = Moralis.Object.extend("Metadata");
    const query = new Moralis.Query(Metadata);
    query.equalTo("ethAddress", ethAddress);
    const results = await query.first();

    // update that data
    results.set("Eyes.type", type);
    results.set("Eyes.name", name);
    results.set("Eyes.thumbnail", thumbnail);
    results.set("Eyes.link", link);
    await results.save();
  };

  // ------- Function Mag to Backend -------------///
  const onActivateMag = async ({ type, name, thumbnail, link }) => {
    let ethAddress = user.get("ethAddress");

    // Need to reference instance in backend
    const Metadata = Moralis.Object.extend("Metadata");
    const query = new Moralis.Query(Metadata);
    query.equalTo("ethAddress", ethAddress);
    const results = await query.first();

    // update that data
    results.set("Mag.type", type);
    results.set("Mag.name", name);
    results.set("Mag.thumbnail", thumbnail);
    results.set("Mag.link", link);
    await results.save();
  };

  // ------- Function Armor to Backend -------------///
  const onActivateArmor = async ({ type, name, thumbnail, link }) => {
    let ethAddress = user.get("ethAddress");

    // Need to reference instance in backend
    const Metadata = Moralis.Object.extend("Metadata");
    const query = new Moralis.Query(Metadata);
    query.equalTo("ethAddress", ethAddress);
    const results = await query.first();

    // update that data
    results.set("Armor.type", type);
    results.set("Armor.name", name);
    results.set("Armor.thumbnail", thumbnail);
    results.set("Armor.link", link);
    await results.save();
  };

  // ------- Function UpperBody to Backend -------------///
  const onActivateUpperBody = async ({ type, name, thumbnail, link }) => {
    let ethAddress = user.get("ethAddress");

    // Need to reference instance in backend
    const Metadata = Moralis.Object.extend("Metadata");
    const query = new Moralis.Query(Metadata);
    query.equalTo("ethAddress", ethAddress);
    const results = await query.first();

    // update that data
    results.set("UpperBody.type", type);
    results.set("UpperBody.name", name);
    results.set("UpperBody.thumbnail", thumbnail);
    results.set("UpperBody.link", link);
    await results.save();
  };

  // ------- Function LeftHand to Backend -------------///
  const onActivateLeftHand = async ({ type, name, thumbnail, link }) => {
    let ethAddress = user.get("ethAddress");

    // Need to reference instance in backend
    const Metadata = Moralis.Object.extend("Metadata");
    const query = new Moralis.Query(Metadata);
    query.equalTo("ethAddress", ethAddress);
    const results = await query.first();

    // update that data
    results.set("LeftHand.type", type);
    results.set("LeftHand.name", name);
    results.set("LeftHand.thumbnail", thumbnail);
    results.set("LeftHand.link", link);
    await results.save();
  };

  // ------- Function RightHand to Backend -------------///
  const onActivateRightHand = async ({ type, name, thumbnail, link }) => {
    let ethAddress = user.get("ethAddress");

    // Need to reference instance in backend
    const Metadata = Moralis.Object.extend("Metadata");
    const query = new Moralis.Query(Metadata);
    query.equalTo("ethAddress", ethAddress);
    const results = await query.first();

    // update that data
    results.set("RightHand.type", type);
    results.set("RightHand.name", name);
    results.set("RightHand.thumbnail", thumbnail);
    results.set("RightHand.link", link);
    await results.save();
  };

  // ------- Function LowerBody to Backend -------------///
  const onActivateLowerBody = async ({ type, name, thumbnail, link }) => {
    let ethAddress = user.get("ethAddress");

    // Need to reference instance in backend
    const Metadata = Moralis.Object.extend("Metadata");
    const query = new Moralis.Query(Metadata);
    query.equalTo("ethAddress", ethAddress);
    const results = await query.first();

    // update that data
    results.set("LowerBody.type", type);
    results.set("LowerBody.name", name);
    results.set("LowerBody.thumbnail", thumbnail);
    results.set("LowerBody.link", link);
    await results.save();
  };

  // ------- Function Back to Backend -------------///
  const onActivateBack = async ({ type, name, thumbnail, link }) => {
    let ethAddress = user.get("ethAddress");

    // Need to reference instance in backend
    const Metadata = Moralis.Object.extend("Metadata");
    const query = new Moralis.Query(Metadata);
    query.equalTo("ethAddress", ethAddress);
    const results = await query.first();

    // update that data
    results.set("Back.type", type);
    results.set("Back.name", name);
    results.set("Back.thumbnail", thumbnail);
    results.set("Back.link", link);
    await results.save();
  };

  // ------- Function Weapon to Backend -------------///
  const onActivateWeapon = async ({ type, name, thumbnail, link }) => {
    let ethAddress = user.get("ethAddress");

    // Need to reference instance in backend
    const Metadata = Moralis.Object.extend("Metadata");
    const query = new Moralis.Query(Metadata);
    query.equalTo("ethAddress", ethAddress);
    const results = await query.first();

    // update that data
    results.set("Weapon.type", type);
    results.set("Weapon.name", name);
    results.set("Weapon.thumbnail", thumbnail);
    results.set("Weapon.link", link);
    await results.save();
  };

  // FOR PARSING RESULTS
  function parseFunction(results) {
    const resultsParse = JSON.parse(JSON.stringify(results));
    const stringResults = JSON.stringify(resultsParse[0]);
    const finalResults = JSON.parse(stringResults);
    return finalResults;
  }

  // Need to make logic to check wallet address and see if they have nfts from contract address (Copy metadata)
  // After, if the data is new, cache Metadata in Moralis
  // If not new, pull data from cache

  if (!isAuthenticated) {
    return (
      <div className="NftOwnedContainer">
        <Box>
          <p>You need to connect your wallet first.</p>
        </Box>
      </div>
    );
  }

  if (TestNFTs === null) {
    return (
      <>
        {" "}
        <h1>🖼️ NFTs Owned</h1>
        <div style={styles.Scroll}>
          <div style={{ padding: "10px", width: "100%" }}>
            <div style={styles.NFTs}>
              <Box>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Cannot access NFT Metadata.
                </p>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  (Server Error) Please try again.
                </p>
              </Box>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (TestNFTs?.length === 0) {
    return (
      <>
        {" "}
        <h1>🖼️ NFTs Owned</h1>
        <div style={styles.Scroll}>
          <div style={{ padding: "20px", width: "100%" }}>
            <div style={styles.NFTs}>
              <Box>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  You have no kNFTs. Please go to the Marketplace and acquire
                  some awesome kNFTs! 👽
                </p>
              </Box>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {" "}
      <VStack mr={"40px"} ml={"40px"} mb={"40px"}>
        {colorMode === "dark" ? (
          <>
            <HStack
              style={{
                paddingTop: "30px",
                paddingBottom: "10px",
              }}
            >
              <Center>
                <h4>🖼️ </h4>
              </Center>

              <Flex alignItems="center" justifyContent="center">
                <h4
                  style={{
                    // paddingTop: "30px",
                    // paddingBottom: "10px",
                    color: "white",
                  }}
                >
                  Your KNFTs
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
                <h4>🖼️ </h4>
              </Center>

              <Flex alignItems="center" justifyContent="center">
                <h4
                  style={{
                    // paddingTop: "30px",
                    // paddingBottom: "10px",
                    color: "white",
                  }}
                >
                  Your KNFTs
                </h4>
              </Flex>
            </HStack>
          </>
        )}

        {colorMode === "dark" ? (
          <Scrollbars style={styles.Scroll}>
            <div>
              <Box style={styles.NFTs}>
                {filterActive === false ? (
                  <>
                    {/* Background */}
                    <Skeleton loading={!TestNFTs}>
                      {kNFTsOwned === undefined ? (
                        <></>
                      ) : (
                        <>
                          {kNFTsOwned?.Owned !== undefined &&
                            kNFTsOwned?.Owned?.filter(
                              (nft) => nft.type === "Background"
                            ).map((nft, index) => {
                              //Verify Metadata
                              // nft = verifyMetadata(nft);

                              return (
                                <Flex
                                  key={index}
                                  p={90}
                                  w="17%"
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
                                      h={110}
                                      w="70%"
                                      shadow="md"
                                      bgSize="cover"
                                      bgPos="center"
                                      style={{
                                        boxShadow: "5px 5px 6px 0px grey",
                                        backgroundImage: `url(${nft?.thumbnail})`,
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
                                        {nft?.name}
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
                                                {nft?.type}
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
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onActivateBackground({
                                                        type: nft?.type,
                                                        name: nft?.name,
                                                        thumbnail:
                                                          nft?.thumbnail,
                                                        link: nft?.link,
                                                      });
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Activate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                          </Flex>
                                        </VStack>
                                      </Flex>
                                    </Box>
                                  </Flex>
                                </Flex>
                              );
                            })}
                        </>
                      )}
                    </Skeleton>

                    {/* Music */}
                    <Skeleton loading={!TestNFTs}>
                      {TestNFTs.Music === undefined ? (
                        <></>
                      ) : (
                        <>
                          {TestNFTs.Music[0]?.name !== "None" &&
                            TestNFTs.Music.map((nft, index) => {
                              //Verify Metadata
                              // nft = verifyMetadata(nft);

                              return (
                                <Flex
                                  key={index}
                                  p={90}
                                  w="17%"
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
                                      h={110}
                                      w="70%"
                                      shadow="md"
                                      bgSize="cover"
                                      bgPos="center"
                                      style={{
                                        boxShadow: "5px 5px 6px 0px grey",
                                        backgroundImage: `url(${nft?.thumbnail})`,
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
                                        {nft?.name}
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
                                                {nft?.type}
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
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onActivateMusic({
                                                        type: nft?.type,
                                                        name: nft?.name,
                                                        thumbnail:
                                                          nft?.thumbnail,
                                                        link: nft?.link,
                                                      });
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Activate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                          </Flex>
                                        </VStack>
                                      </Flex>
                                    </Box>
                                  </Flex>
                                </Flex>
                              );
                            })}
                        </>
                      )}
                    </Skeleton>

                    {/* Avatar Box*/}
                    <Skeleton loading={!TestNFTs}>
                      {kNFTsOwned === undefined ? (
                        <></>
                      ) : (
                        <>
                          {kNFTsOwned?.Owned !== undefined &&
                            kNFTsOwned?.Owned?.filter(
                              (nft) => nft.type === "Avatar"
                            ).map((nft, index) => {
                              //Verify Metadata
                              // nft = verifyMetadata(nft);
                              return (
                                <Flex
                                  key={index}
                                  p={90}
                                  w="17%"
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
                                      h={110}
                                      w="70%"
                                      shadow="md"
                                      bgSize="cover"
                                      bgPos="center"
                                      style={{
                                        boxShadow: "5px 5px 6px 0px grey",
                                        backgroundImage: `url(${nft?.thumbnail})`,
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
                                        {nft?.name} {nft?.token_id}
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
                                                Avatar
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
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onActivateAvatarBox({
                                                        type: nft?.type,
                                                        name: nft?.name,
                                                        token_id: nft?.token_id,
                                                        thumbnail:
                                                          nft?.thumbnail,
                                                        link: nft?.link,
                                                      });
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Activate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                          </Flex>
                                        </VStack>
                                      </Flex>
                                    </Box>
                                  </Flex>
                                </Flex>
                              );

                              // return (
                              //   <Popover
                              //     closeOnBlur={false}
                              //     placement="bottom"
                              //     // strategy="fixed"
                              //     initialFocusRef={initRef}
                              //   >
                              //     {({ isOpen, onClose }) => (
                              //       <>
                              //         <PopoverTrigger>
                              //           <Box>
                              //             <Card
                              //               hoverable
                              //               // onClick={() => getMeta(this.nft.link)}
                              //               style={{
                              //                 width: 100,
                              //                 height: 200,
                              //                 border: "3px solid #e7eaf3",
                              //                 boxShadow: "5px 5px 6px 0px grey",
                              //               }}
                              //               cover={
                              //                 <Image
                              //                   preview={false}
                              //                   src={nft?.thumbnail || "error"}
                              //                   fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
                              //                   alt=""
                              //                   style={{ height: "100px" }}
                              //                   // onClick={() =>
                              //                   //   window.open(
                              //                   //     `${getExplorer(chainId)}address/${
                              //                   //       nft.token_address
                              //                   //     }`,
                              //                   //     "_blank"
                              //                   //   )
                              //                   // }
                              //                 />
                              //               }
                              //               key={index}
                              //             >
                              //               <Meta
                              //                 style={{ padding: "4px" }}
                              //                 title={nft?.type}
                              //                 description={nft?.name}
                              //                 // link={nft.link}
                              //                 // onClick={() =>
                              //                 //   window.open(
                              //                 //     `${getExplorer(chainId)}address/${
                              //                 //       nft.token_address
                              //                 //     }`,
                              //                 //     "_blank"
                              //                 //   )
                              //                 // }
                              //               />
                              //               {/* <span>
                              //   {" "}
                              //   <FileSearchOutlined
                              //     onClick={() =>
                              //       window.open(
                              //         `${getExplorer(chainId)}address/${
                              //           nft.token_address
                              //         }`,
                              //         "_blank"
                              //       )
                              //     }
                              //   />
                              // </span> */}
                              //             </Card>
                              //           </Box>
                              //         </PopoverTrigger>
                              //         <Portal>
                              //           <PopoverContent>
                              //             <PopoverHeader>Confirmation</PopoverHeader>
                              //             <PopoverCloseButton />
                              //             <PopoverBody>
                              //               <Box p={2}>
                              //                 Are you sure you want to activate this{" "}
                              //                 {nft?.type} asset?
                              //               </Box>
                              //               <ButtonGroup size="sm">
                              //                 <Button
                              //                   colorScheme="red"
                              //                   onClick={() => {
                              //                     onActivate();
                              //                     onClose();
                              //                   }}
                              //                   ref={initRef}
                              //                 >
                              //                   Activate
                              //                 </Button>
                              //                 <Button
                              //                   variant="outline"
                              //                   onClick={onClose}
                              //                   ref={initRef}
                              //                 >
                              //                   Cancel
                              //                 </Button>
                              //               </ButtonGroup>
                              //             </PopoverBody>
                              //           </PopoverContent>
                              //         </Portal>
                              //       </>
                              //     )}
                              //   </Popover>
                              // );
                            })}
                        </>
                      )}
                    </Skeleton>

                    {/* Skin */}
                    <Skeleton loading={!TestNFTs}>
                      {kNFTsOwned === undefined ? (
                        <></>
                      ) : (
                        <>
                          {kNFTsOwned?.Owned !== undefined &&
                            kNFTsOwned?.Owned?.filter(
                              (nft) => nft.type === "Skin"
                            ).map((nft, index) => {
                              //Verify Metadata
                              // nft = verifyMetadata(nft);

                              return (
                                <Flex
                                  key={index}
                                  p={90}
                                  w="17%"
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
                                      h={110}
                                      w="70%"
                                      shadow="md"
                                      bgSize="cover"
                                      bgPos="center"
                                      style={{
                                        boxShadow: "5px 5px 6px 0px grey",
                                        backgroundImage: `url(${nft?.thumbnail})`,
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
                                        {nft?.name}
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
                                                {nft?.type}
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
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onActivateSkin({
                                                        type: nft?.type,
                                                        name: nft?.name,
                                                        thumbnail:
                                                          nft?.thumbnail,
                                                        link: nft?.link,
                                                      });
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Activate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                          </Flex>
                                        </VStack>
                                      </Flex>
                                    </Box>
                                  </Flex>
                                </Flex>
                              );
                            })}
                        </>
                      )}
                    </Skeleton>

                    {/* Head */}
                    <Skeleton loading={!TestNFTs}>
                      {TestNFTs.Head === undefined ? (
                        <></>
                      ) : (
                        <>
                          {TestNFTs.Head[0]?.name !== "None" &&
                            TestNFTs.Head.map((nft, index) => {
                              //Verify Metadata
                              // nft = verifyMetadata(nft);

                              return (
                                <Flex
                                  key={index}
                                  p={90}
                                  w="17%"
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
                                      h={110}
                                      w="70%"
                                      shadow="md"
                                      bgSize="cover"
                                      bgPos="center"
                                      style={{
                                        boxShadow: "5px 5px 6px 0px grey",
                                        backgroundImage: `url(${nft?.thumbnail})`,
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
                                        {nft?.name}
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
                                                {nft?.type}
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
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onActivateHead({
                                                        type: nft?.type,
                                                        name: nft?.name,
                                                        thumbnail:
                                                          nft?.thumbnail,
                                                        link: nft?.link,
                                                      });
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Activate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                          </Flex>
                                        </VStack>
                                      </Flex>
                                    </Box>
                                  </Flex>
                                </Flex>
                              );
                            })}
                        </>
                      )}
                    </Skeleton>

                    {/* Eyes */}
                    <Skeleton loading={!TestNFTs}>
                      {TestNFTs.Eyes === undefined ? (
                        <></>
                      ) : (
                        <>
                          {TestNFTs.Eyes[0]?.name !== "None" &&
                            TestNFTs.Eyes.map((nft, index) => {
                              //Verify Metadata
                              // nft = verifyMetadata(nft);

                              return (
                                <Flex
                                  key={index}
                                  p={90}
                                  w="17%"
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
                                      h={110}
                                      w="70%"
                                      shadow="md"
                                      bgSize="cover"
                                      bgPos="center"
                                      style={{
                                        boxShadow: "5px 5px 6px 0px grey",
                                        backgroundImage: `url(${nft?.thumbnail})`,
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
                                        {nft?.name}
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
                                                {nft?.type}
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
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onActivateEyes({
                                                        type: nft?.type,
                                                        name: nft?.name,
                                                        thumbnail:
                                                          nft?.thumbnail,
                                                        link: nft?.link,
                                                      });
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Activate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                          </Flex>
                                        </VStack>
                                      </Flex>
                                    </Box>
                                  </Flex>
                                </Flex>
                              );
                            })}
                        </>
                      )}
                    </Skeleton>

                    {/* Armor */}
                    <Skeleton loading={!TestNFTs}>
                      {TestNFTs.Armor === undefined ? (
                        <></>
                      ) : (
                        <>
                          {TestNFTs.Armor[0]?.name !== "None" &&
                            TestNFTs.Armor.map((nft, index) => {
                              //Verify Metadata
                              // nft = verifyMetadata(nft);

                              return (
                                <Flex
                                  key={index}
                                  p={90}
                                  w="17%"
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
                                      h={110}
                                      w="70%"
                                      rounded="5px"
                                      shadow="md"
                                      bgSize="cover"
                                      bgPos="center"
                                      style={{
                                        boxShadow: "5px 5px 6px 0px grey",
                                        backgroundImage: `url(${nft?.thumbnail})`,
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
                                        {nft?.name}
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
                                                {nft?.type}
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
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onActivateArmor({
                                                        type: nft?.type,
                                                        name: nft?.name,
                                                        thumbnail:
                                                          nft?.thumbnail,
                                                        link: nft?.link,
                                                      });
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Activate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                          </Flex>
                                        </VStack>
                                      </Flex>
                                    </Box>
                                  </Flex>
                                </Flex>
                              );
                            })}
                        </>
                      )}
                    </Skeleton>

                    {/* UpperBody */}
                    <Skeleton loading={!TestNFTs}>
                      {TestNFTs.UpperBody === undefined ? (
                        <></>
                      ) : (
                        <>
                          {TestNFTs.UpperBody[0]?.name !== "None" &&
                            TestNFTs.UpperBody.map((nft, index) => {
                              //Verify Metadata
                              // nft = verifyMetadata(nft);

                              return (
                                <Flex
                                  key={index}
                                  p={90}
                                  w="17%"
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
                                      h={110}
                                      w="70%"
                                      shadow="md"
                                      bgSize="cover"
                                      bgPos="center"
                                      style={{
                                        boxShadow: "5px 5px 6px 0px grey",
                                        backgroundImage: `url(${nft?.thumbnail})`,
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
                                        {nft?.name}
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
                                                {nft?.type}
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
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onActivateUpperBody({
                                                        type: nft?.type,
                                                        name: nft?.name,
                                                        thumbnail:
                                                          nft?.thumbnail,
                                                        link: nft?.link,
                                                      });
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Activate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                          </Flex>
                                        </VStack>
                                      </Flex>
                                    </Box>
                                  </Flex>
                                </Flex>
                              );
                            })}
                        </>
                      )}
                    </Skeleton>

                    {/* LeftHand */}
                    <Skeleton loading={!TestNFTs}>
                      {TestNFTs.LeftHand === undefined ? (
                        <></>
                      ) : (
                        <>
                          {" "}
                          {TestNFTs.LeftHand[0]?.name !== "None" &&
                            TestNFTs.LeftHand.map((nft, index) => {
                              //Verify Metadata
                              // nft = verifyMetadata(nft);

                              return (
                                <Flex
                                  key={index}
                                  p={90}
                                  w="17%"
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
                                      h={110}
                                      w="70%"
                                      shadow="md"
                                      bgSize="cover"
                                      bgPos="center"
                                      style={{
                                        boxShadow: "5px 5px 6px 0px grey",
                                        backgroundImage: `url(${nft?.thumbnail})`,
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
                                        {nft?.name}
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
                                                {nft?.type}
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
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onActivateLeftHand({
                                                        type: nft?.type,
                                                        name: nft?.name,
                                                        thumbnail:
                                                          nft?.thumbnail,
                                                        link: nft?.link,
                                                      });
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Activate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                          </Flex>
                                        </VStack>
                                      </Flex>
                                    </Box>
                                  </Flex>
                                </Flex>
                              );
                            })}
                        </>
                      )}
                    </Skeleton>

                    {/* RightHand */}
                    <Skeleton loading={!TestNFTs}>
                      {TestNFTs.RightHand === undefined ? (
                        <></>
                      ) : (
                        <>
                          {TestNFTs.RightHand[0]?.name !== "None" &&
                            TestNFTs.RightHand.map((nft, index) => {
                              //Verify Metadata
                              // nft = verifyMetadata(nft);

                              return (
                                <Flex
                                  key={index}
                                  p={90}
                                  w="17%"
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
                                      h={110}
                                      w="70%"
                                      shadow="md"
                                      bgSize="cover"
                                      bgPos="center"
                                      style={{
                                        boxShadow: "5px 5px 6px 0px grey",
                                        backgroundImage: `url(${nft?.thumbnail})`,
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
                                        {nft?.name}
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
                                                {nft?.type}
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
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onActivateRightHand({
                                                        type: nft?.type,
                                                        name: nft?.name,
                                                        thumbnail:
                                                          nft?.thumbnail,
                                                        link: nft?.link,
                                                      });
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Activate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                          </Flex>
                                        </VStack>
                                      </Flex>
                                    </Box>
                                  </Flex>
                                </Flex>
                              );
                            })}
                        </>
                      )}
                    </Skeleton>

                    {/* LowerBody*/}
                    <Skeleton loading={!TestNFTs}>
                      {TestNFTs.LowerBody === undefined ? (
                        <></>
                      ) : (
                        <>
                          {TestNFTs.LowerBody[0]?.name !== "None" &&
                            TestNFTs.LowerBody.map((nft, index) => {
                              //Verify Metadata
                              // nft = verifyMetadata(nft);

                              return (
                                <Flex
                                  key={index}
                                  p={90}
                                  w="17%"
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
                                      h={110}
                                      w="70%"
                                      shadow="md"
                                      bgSize="cover"
                                      bgPos="center"
                                      style={{
                                        boxShadow: "5px 5px 6px 0px grey",
                                        backgroundImage: `url(${nft?.thumbnail})`,
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
                                        {nft?.name}
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
                                                {nft?.type}
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
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onActivateLowerBody({
                                                        type: nft?.type,
                                                        name: nft?.name,
                                                        thumbnail:
                                                          nft?.thumbnail,
                                                        link: nft?.link,
                                                      });
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Activate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                          </Flex>
                                        </VStack>
                                      </Flex>
                                    </Box>
                                  </Flex>
                                </Flex>
                              );
                            })}
                        </>
                      )}
                    </Skeleton>

                    {/* Back*/}
                    <Skeleton loading={!TestNFTs}>
                      {TestNFTs.Back === undefined ? (
                        <></>
                      ) : (
                        <>
                          {TestNFTs.Back[0]?.name !== "None" &&
                            TestNFTs.Back.map((nft, index) => {
                              //Verify Metadata
                              // nft = verifyMetadata(nft);

                              return (
                                <Flex
                                  key={index}
                                  p={90}
                                  w="17%"
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
                                      h={110}
                                      w="70%"
                                      shadow="md"
                                      bgSize="cover"
                                      bgPos="center"
                                      style={{
                                        boxShadow: "5px 5px 6px 0px grey",
                                        backgroundImage: `url(${nft?.thumbnail})`,
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
                                        {nft?.name}
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
                                                {nft?.type}
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
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onActivateBack({
                                                        type: nft?.type,
                                                        name: nft?.name,
                                                        thumbnail:
                                                          nft?.thumbnail,
                                                        link: nft?.link,
                                                      });
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Activate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                          </Flex>
                                        </VStack>
                                      </Flex>
                                    </Box>
                                  </Flex>
                                </Flex>
                              );
                            })}
                        </>
                      )}
                    </Skeleton>

                    {/* Weapon*/}
                    <Skeleton loading={!TestNFTs}>
                      {TestNFTs.Weapon === undefined ? (
                        <></>
                      ) : (
                        <>
                          {TestNFTs.Weapon[0]?.name !== "None" &&
                            TestNFTs.Weapon.map((nft, index) => {
                              //Verify Metadata
                              // nft = verifyMetadata(nft);

                              return (
                                <Flex
                                  key={index}
                                  p={90}
                                  w="17%"
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
                                      h={110}
                                      w="70%"
                                      shadow="md"
                                      bgSize="cover"
                                      bgPos="center"
                                      style={{
                                        boxShadow: "5px 5px 6px 0px grey",
                                        backgroundImage: `url(${nft?.thumbnail})`,
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
                                        {nft?.name}
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
                                                {nft?.type}
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
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onActivateWeapon({
                                                        type: nft?.type,
                                                        name: nft?.name,
                                                        thumbnail:
                                                          nft?.thumbnail,
                                                        link: nft?.link,
                                                      });
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Activate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                          </Flex>
                                        </VStack>
                                      </Flex>
                                    </Box>
                                  </Flex>
                                </Flex>
                              );
                            })}
                        </>
                      )}
                    </Skeleton>
                  </>
                ) : (
                  <>
                    {/* Background */}
                    <Skeleton loading={!TestNFTs}>
                      {bgFilter === false ? (
                        <></>
                      ) : (
                        <>
                          {kNFTsOwned === undefined ? (
                            <></>
                          ) : (
                            <>
                              {kNFTsOwned?.Owned !== undefined &&
                                kNFTsOwned?.Owned?.filter(
                                  (nft) => nft.type === "Background"
                                ).map((nft, index) => {
                                  //Verify Metadata
                                  // nft = verifyMetadata(nft);

                                  return (
                                    <Flex
                                      key={index}
                                      p={90}
                                      w="17%"
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
                                          h={110}
                                          w="70%"
                                          shadow="md"
                                          bgSize="cover"
                                          bgPos="center"
                                          style={{
                                            boxShadow: "5px 5px 6px 0px grey",
                                            backgroundImage: `url(${nft?.thumbnail})`,
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
                                            {nft?.name}
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
                                                    color={
                                                      ("#2D3748", "#F7FAFC")
                                                    }
                                                  >
                                                    {nft?.type}
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
                                                  <Center>
                                                    <Spacer>
                                                      <AwesomeButtonProgress
                                                        type="secondary"
                                                        size="medium"
                                                        loadingLabel="Wait..."
                                                        resultLabel="Done!"
                                                        action={(e, alert) => {
                                                          onActivateBackground({
                                                            type: nft?.type,
                                                            name: nft?.name,
                                                            thumbnail:
                                                              nft?.thumbnail,
                                                            link: nft?.link,
                                                          });
                                                          setTimeout(() => {
                                                            alert("Success!");
                                                          }, 5000);
                                                        }}
                                                      >
                                                        Activate
                                                      </AwesomeButtonProgress>
                                                    </Spacer>
                                                  </Center>
                                                </HStack>
                                              </Flex>
                                            </VStack>
                                          </Flex>
                                        </Box>
                                      </Flex>
                                    </Flex>
                                  );
                                })}
                            </>
                          )}
                        </>
                      )}
                    </Skeleton>

                    {/* Music */}
                    <Skeleton loading={!TestNFTs}>
                      {musicFilter === false ? (
                        <></>
                      ) : (
                        <>
                          {TestNFTs.Music === undefined ? (
                            <></>
                          ) : (
                            <>
                              {TestNFTs.Music[0]?.name !== "None" &&
                                TestNFTs.Music.map((nft, index) => {
                                  //Verify Metadata
                                  // nft = verifyMetadata(nft);

                                  return (
                                    <Flex
                                      key={index}
                                      p={90}
                                      w="17%"
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
                                          h={110}
                                          w="70%"
                                          shadow="md"
                                          bgSize="cover"
                                          bgPos="center"
                                          style={{
                                            boxShadow: "5px 5px 6px 0px grey",
                                            backgroundImage: `url(${nft?.thumbnail})`,
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
                                            {nft?.name}
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
                                                    color={
                                                      ("#2D3748", "#F7FAFC")
                                                    }
                                                  >
                                                    {nft?.type}
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
                                                  <Center>
                                                    <Spacer>
                                                      <AwesomeButtonProgress
                                                        type="secondary"
                                                        size="medium"
                                                        loadingLabel="Wait..."
                                                        resultLabel="Done!"
                                                        action={(e, alert) => {
                                                          onActivateMusic({
                                                            type: nft?.type,
                                                            name: nft?.name,
                                                            thumbnail:
                                                              nft?.thumbnail,
                                                            link: nft?.link,
                                                          });
                                                          setTimeout(() => {
                                                            alert("Success!");
                                                          }, 5000);
                                                        }}
                                                      >
                                                        Activate
                                                      </AwesomeButtonProgress>
                                                    </Spacer>
                                                  </Center>
                                                </HStack>
                                              </Flex>
                                            </VStack>
                                          </Flex>
                                        </Box>
                                      </Flex>
                                    </Flex>
                                  );
                                })}
                            </>
                          )}
                        </>
                      )}
                    </Skeleton>

                    {/* Avatar */}
                    <Skeleton loading={!kNFTsOwned}>
                      {avatarFilter === false ? (
                        <></>
                      ) : (
                        <>
                          {kNFTsOwned === undefined ? (
                            <></>
                          ) : (
                            <>
                              {kNFTsOwned?.Owned !== undefined &&
                                kNFTsOwned?.Owned?.filter(
                                  (nft) => nft.type === "Avatar"
                                ).map((nft, index) => {
                                  //Verify Metadata
                                  // nft = verifyMetadata(nft);
                                  return (
                                    <Flex
                                      key={index}
                                      p={90}
                                      w="17%"
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
                                          h={110}
                                          w="70%"
                                          shadow="md"
                                          bgSize="cover"
                                          bgPos="center"
                                          style={{
                                            boxShadow: "5px 5px 6px 0px grey",
                                            backgroundImage: `url(${nft?.thumbnail})`,
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
                                            {nft?.name} {nft?.token_id}
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
                                                    color={
                                                      ("#2D3748", "#F7FAFC")
                                                    }
                                                  >
                                                    Avatar
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
                                                  <Center>
                                                    <Spacer>
                                                      <AwesomeButtonProgress
                                                        type="secondary"
                                                        size="medium"
                                                        loadingLabel="Wait..."
                                                        resultLabel="Done!"
                                                        action={(e, alert) => {
                                                          onActivateAvatarBox({
                                                            type: nft?.type,
                                                            name: nft?.name,
                                                            token_id:
                                                              nft?.token_id,
                                                            thumbnail:
                                                              nft?.thumbnail,
                                                            link: nft?.link,
                                                          });
                                                          setTimeout(() => {
                                                            alert("Success!");
                                                          }, 5000);
                                                        }}
                                                      >
                                                        Activate
                                                      </AwesomeButtonProgress>
                                                    </Spacer>
                                                  </Center>
                                                </HStack>
                                              </Flex>
                                            </VStack>
                                          </Flex>
                                        </Box>
                                      </Flex>
                                    </Flex>
                                  );

                                  // return (
                                  //   <Popover
                                  //     closeOnBlur={false}
                                  //     placement="bottom"
                                  //     // strategy="fixed"
                                  //     initialFocusRef={initRef}
                                  //   >
                                  //     {({ isOpen, onClose }) => (
                                  //       <>
                                  //         <PopoverTrigger>
                                  //           <Box>
                                  //             <Card
                                  //               hoverable
                                  //               // onClick={() => getMeta(this.nft.link)}
                                  //               style={{
                                  //                 width: 100,
                                  //                 height: 200,
                                  //                 border: "3px solid #e7eaf3",
                                  //                 boxShadow: "5px 5px 6px 0px grey",
                                  //               }}
                                  //               cover={
                                  //                 <Image
                                  //                   preview={false}
                                  //                   src={nft?.thumbnail || "error"}
                                  //                   fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
                                  //                   alt=""
                                  //                   style={{ height: "100px" }}
                                  //                   // onClick={() =>
                                  //                   //   window.open(
                                  //                   //     `${getExplorer(chainId)}address/${
                                  //                   //       nft.token_address
                                  //                   //     }`,
                                  //                   //     "_blank"
                                  //                   //   )
                                  //                   // }
                                  //                 />
                                  //               }
                                  //               key={index}
                                  //             >
                                  //               <Meta
                                  //                 style={{ padding: "4px" }}
                                  //                 title={nft?.type}
                                  //                 description={nft?.name}
                                  //                 // link={nft.link}
                                  //                 // onClick={() =>
                                  //                 //   window.open(
                                  //                 //     `${getExplorer(chainId)}address/${
                                  //                 //       nft.token_address
                                  //                 //     }`,
                                  //                 //     "_blank"
                                  //                 //   )
                                  //                 // }
                                  //               />
                                  //               {/* <span>
                                  //   {" "}
                                  //   <FileSearchOutlined
                                  //     onClick={() =>
                                  //       window.open(
                                  //         `${getExplorer(chainId)}address/${
                                  //           nft.token_address
                                  //         }`,
                                  //         "_blank"
                                  //       )
                                  //     }
                                  //   />
                                  // </span> */}
                                  //             </Card>
                                  //           </Box>
                                  //         </PopoverTrigger>
                                  //         <Portal>
                                  //           <PopoverContent>
                                  //             <PopoverHeader>Confirmation</PopoverHeader>
                                  //             <PopoverCloseButton />
                                  //             <PopoverBody>
                                  //               <Box p={2}>
                                  //                 Are you sure you want to activate this{" "}
                                  //                 {nft?.type} asset?
                                  //               </Box>
                                  //               <ButtonGroup size="sm">
                                  //                 <Button
                                  //                   colorScheme="red"
                                  //                   onClick={() => {
                                  //                     onActivate();
                                  //                     onClose();
                                  //                   }}
                                  //                   ref={initRef}
                                  //                 >
                                  //                   Activate
                                  //                 </Button>
                                  //                 <Button
                                  //                   variant="outline"
                                  //                   onClick={onClose}
                                  //                   ref={initRef}
                                  //                 >
                                  //                   Cancel
                                  //                 </Button>
                                  //               </ButtonGroup>
                                  //             </PopoverBody>
                                  //           </PopoverContent>
                                  //         </Portal>
                                  //       </>
                                  //     )}
                                  //   </Popover>
                                  // );
                                })}
                            </>
                          )}
                        </>
                      )}
                    </Skeleton>

                    {/* Skin */}
                    <Skeleton loading={!TestNFTs}>
                      {skinFilter === false ? (
                        <></>
                      ) : (
                        <>
                          {kNFTsOwned === undefined ? (
                            <></>
                          ) : (
                            <>
                              {kNFTsOwned?.Owned !== undefined &&
                                kNFTsOwned?.Owned?.filter(
                                  (nft) => nft.type === "Skin"
                                ).map((nft, index) => {
                                  //Verify Metadata
                                  // nft = verifyMetadata(nft);

                                  return (
                                    <Flex
                                      key={index}
                                      p={90}
                                      w="17%"
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
                                          h={110}
                                          w="70%"
                                          shadow="md"
                                          bgSize="cover"
                                          bgPos="center"
                                          style={{
                                            boxShadow: "5px 5px 6px 0px grey",
                                            backgroundImage: `url(${nft?.thumbnail})`,
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
                                            {nft?.name}
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
                                                    color={
                                                      ("#2D3748", "#F7FAFC")
                                                    }
                                                  >
                                                    {nft?.type}
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
                                                  <Center>
                                                    <Spacer>
                                                      <AwesomeButtonProgress
                                                        type="secondary"
                                                        size="medium"
                                                        loadingLabel="Wait..."
                                                        resultLabel="Done!"
                                                        action={(e, alert) => {
                                                          onActivateSkin({
                                                            type: nft?.type,
                                                            name: nft?.name,
                                                            thumbnail:
                                                              nft?.thumbnail,
                                                            link: nft?.link,
                                                          });
                                                          setTimeout(() => {
                                                            alert("Success!");
                                                          }, 5000);
                                                        }}
                                                      >
                                                        Activate
                                                      </AwesomeButtonProgress>
                                                    </Spacer>
                                                  </Center>
                                                </HStack>
                                              </Flex>
                                            </VStack>
                                          </Flex>
                                        </Box>
                                      </Flex>
                                    </Flex>
                                  );
                                })}
                            </>
                          )}
                        </>
                      )}
                    </Skeleton>

                    {/* Head */}
                    <Skeleton loading={!TestNFTs}>
                      {headFilter === false ? (
                        <></>
                      ) : (
                        <>
                          {TestNFTs.Head === undefined ? (
                            <></>
                          ) : (
                            <>
                              {TestNFTs.Head[0]?.name !== "None" &&
                                TestNFTs.Head.map((nft, index) => {
                                  //Verify Metadata
                                  // nft = verifyMetadata(nft);

                                  return (
                                    <Flex
                                      key={index}
                                      p={90}
                                      w="17%"
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
                                          h={110}
                                          w="70%"
                                          shadow="md"
                                          bgSize="cover"
                                          bgPos="center"
                                          style={{
                                            boxShadow: "5px 5px 6px 0px grey",
                                            backgroundImage: `url(${nft?.thumbnail})`,
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
                                            {nft?.name}
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
                                                    color={
                                                      ("#2D3748", "#F7FAFC")
                                                    }
                                                  >
                                                    {nft?.type}
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
                                                  <Center>
                                                    <Spacer>
                                                      <AwesomeButtonProgress
                                                        type="secondary"
                                                        size="medium"
                                                        loadingLabel="Wait..."
                                                        resultLabel="Done!"
                                                        action={(e, alert) => {
                                                          onActivateHead({
                                                            type: nft?.type,
                                                            name: nft?.name,
                                                            thumbnail:
                                                              nft?.thumbnail,
                                                            link: nft?.link,
                                                          });
                                                          setTimeout(() => {
                                                            alert("Success!");
                                                          }, 5000);
                                                        }}
                                                      >
                                                        Activate
                                                      </AwesomeButtonProgress>
                                                    </Spacer>
                                                  </Center>
                                                </HStack>
                                              </Flex>
                                            </VStack>
                                          </Flex>
                                        </Box>
                                      </Flex>
                                    </Flex>
                                  );
                                })}
                            </>
                          )}
                        </>
                      )}
                    </Skeleton>

                    {/* Eyes */}
                    <Skeleton loading={!TestNFTs}>
                      {eyesFilter === false ? (
                        <></>
                      ) : (
                        <>
                          {TestNFTs.Eyes === undefined ? (
                            <></>
                          ) : (
                            <>
                              {TestNFTs.Eyes[0]?.name !== "None" &&
                                TestNFTs.Eyes.map((nft, index) => {
                                  //Verify Metadata
                                  // nft = verifyMetadata(nft);

                                  return (
                                    <Flex
                                      key={index}
                                      p={90}
                                      w="17%"
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
                                          h={110}
                                          w="70%"
                                          shadow="md"
                                          bgSize="cover"
                                          bgPos="center"
                                          style={{
                                            boxShadow: "5px 5px 6px 0px grey",
                                            backgroundImage: `url(${nft?.thumbnail})`,
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
                                            {nft?.name}
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
                                                    color={
                                                      ("#2D3748", "#F7FAFC")
                                                    }
                                                  >
                                                    {nft?.type}
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
                                                  <Center>
                                                    <Spacer>
                                                      <AwesomeButtonProgress
                                                        type="secondary"
                                                        size="medium"
                                                        loadingLabel="Wait..."
                                                        resultLabel="Done!"
                                                        action={(e, alert) => {
                                                          onActivateEyes({
                                                            type: nft?.type,
                                                            name: nft?.name,
                                                            thumbnail:
                                                              nft?.thumbnail,
                                                            link: nft?.link,
                                                          });
                                                          setTimeout(() => {
                                                            alert("Success!");
                                                          }, 5000);
                                                        }}
                                                      >
                                                        Activate
                                                      </AwesomeButtonProgress>
                                                    </Spacer>
                                                  </Center>
                                                </HStack>
                                              </Flex>
                                            </VStack>
                                          </Flex>
                                        </Box>
                                      </Flex>
                                    </Flex>
                                  );
                                })}
                            </>
                          )}
                        </>
                      )}
                    </Skeleton>

                    {/* Armor */}
                    <Skeleton loading={!TestNFTs}>
                      {armorFilter === false ? (
                        <></>
                      ) : (
                        <>
                          {TestNFTs.Armor === undefined ? (
                            <></>
                          ) : (
                            <>
                              {TestNFTs.Armor[0]?.name !== "None" &&
                                TestNFTs.Armor.map((nft, index) => {
                                  //Verify Metadata
                                  // nft = verifyMetadata(nft);

                                  return (
                                    <Flex
                                      key={index}
                                      p={90}
                                      w="17%"
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
                                          h={110}
                                          w="70%"
                                          rounded="5px"
                                          shadow="md"
                                          bgSize="cover"
                                          bgPos="center"
                                          style={{
                                            boxShadow: "5px 5px 6px 0px grey",
                                            backgroundImage: `url(${nft?.thumbnail})`,
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
                                            {nft?.name}
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
                                                    color={
                                                      ("#2D3748", "#F7FAFC")
                                                    }
                                                  >
                                                    {nft?.type}
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
                                                  <Center>
                                                    <Spacer>
                                                      <AwesomeButtonProgress
                                                        type="secondary"
                                                        size="medium"
                                                        loadingLabel="Wait..."
                                                        resultLabel="Done!"
                                                        action={(e, alert) => {
                                                          onActivateArmor({
                                                            type: nft?.type,
                                                            name: nft?.name,
                                                            thumbnail:
                                                              nft?.thumbnail,
                                                            link: nft?.link,
                                                          });
                                                          setTimeout(() => {
                                                            alert("Success!");
                                                          }, 5000);
                                                        }}
                                                      >
                                                        Activate
                                                      </AwesomeButtonProgress>
                                                    </Spacer>
                                                  </Center>
                                                </HStack>
                                              </Flex>
                                            </VStack>
                                          </Flex>
                                        </Box>
                                      </Flex>
                                    </Flex>
                                  );
                                })}
                            </>
                          )}
                        </>
                      )}
                    </Skeleton>

                    {/* UpperBody */}
                    <Skeleton loading={!TestNFTs}>
                      {TestNFTs.UpperBody === undefined ? (
                        <></>
                      ) : (
                        <>
                          {TestNFTs.UpperBody[0]?.name !== "None" &&
                            TestNFTs.UpperBody.map((nft, index) => {
                              //Verify Metadata
                              // nft = verifyMetadata(nft);

                              return (
                                <Flex
                                  key={index}
                                  p={90}
                                  w="17%"
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
                                      h={110}
                                      w="70%"
                                      shadow="md"
                                      bgSize="cover"
                                      bgPos="center"
                                      style={{
                                        boxShadow: "5px 5px 6px 0px grey",
                                        backgroundImage: `url(${nft?.thumbnail})`,
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
                                        {nft?.name}
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
                                                {nft?.type}
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
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onActivateUpperBody({
                                                        type: nft?.type,
                                                        name: nft?.name,
                                                        thumbnail:
                                                          nft?.thumbnail,
                                                        link: nft?.link,
                                                      });
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Activate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                          </Flex>
                                        </VStack>
                                      </Flex>
                                    </Box>
                                  </Flex>
                                </Flex>
                              );
                            })}
                        </>
                      )}
                    </Skeleton>

                    {/* LeftHand */}
                    <Skeleton loading={!TestNFTs}>
                      {TestNFTs.LeftHand === undefined ? (
                        <></>
                      ) : (
                        <>
                          {" "}
                          {TestNFTs.LeftHand[0]?.name !== "None" &&
                            TestNFTs.LeftHand.map((nft, index) => {
                              //Verify Metadata
                              // nft = verifyMetadata(nft);

                              return (
                                <Flex
                                  key={index}
                                  p={90}
                                  w="17%"
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
                                      h={110}
                                      w="70%"
                                      shadow="md"
                                      bgSize="cover"
                                      bgPos="center"
                                      style={{
                                        boxShadow: "5px 5px 6px 0px grey",
                                        backgroundImage: `url(${nft?.thumbnail})`,
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
                                        {nft?.name}
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
                                                {nft?.type}
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
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onActivateLeftHand({
                                                        type: nft?.type,
                                                        name: nft?.name,
                                                        thumbnail:
                                                          nft?.thumbnail,
                                                        link: nft?.link,
                                                      });
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Activate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                          </Flex>
                                        </VStack>
                                      </Flex>
                                    </Box>
                                  </Flex>
                                </Flex>
                              );
                            })}
                        </>
                      )}
                    </Skeleton>

                    {/* RightHand */}
                    <Skeleton loading={!TestNFTs}>
                      {TestNFTs.RightHand === undefined ? (
                        <></>
                      ) : (
                        <>
                          {TestNFTs.RightHand[0]?.name !== "None" &&
                            TestNFTs.RightHand.map((nft, index) => {
                              //Verify Metadata
                              // nft = verifyMetadata(nft);

                              return (
                                <Flex
                                  key={index}
                                  p={90}
                                  w="17%"
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
                                      h={110}
                                      w="70%"
                                      shadow="md"
                                      bgSize="cover"
                                      bgPos="center"
                                      style={{
                                        boxShadow: "5px 5px 6px 0px grey",
                                        backgroundImage: `url(${nft?.thumbnail})`,
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
                                        {nft?.name}
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
                                                {nft?.type}
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
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onActivateRightHand({
                                                        type: nft?.type,
                                                        name: nft?.name,
                                                        thumbnail:
                                                          nft?.thumbnail,
                                                        link: nft?.link,
                                                      });
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Activate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                          </Flex>
                                        </VStack>
                                      </Flex>
                                    </Box>
                                  </Flex>
                                </Flex>
                              );
                            })}
                        </>
                      )}
                    </Skeleton>

                    {/* LowerBody*/}
                    <Skeleton loading={!TestNFTs}>
                      {TestNFTs.LowerBody === undefined ? (
                        <></>
                      ) : (
                        <>
                          {TestNFTs.LowerBody[0]?.name !== "None" &&
                            TestNFTs.LowerBody.map((nft, index) => {
                              //Verify Metadata
                              // nft = verifyMetadata(nft);

                              return (
                                <Flex
                                  key={index}
                                  p={90}
                                  w="17%"
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
                                      h={110}
                                      w="70%"
                                      shadow="md"
                                      bgSize="cover"
                                      bgPos="center"
                                      style={{
                                        boxShadow: "5px 5px 6px 0px grey",
                                        backgroundImage: `url(${nft?.thumbnail})`,
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
                                        {nft?.name}
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
                                                {nft?.type}
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
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onActivateLowerBody({
                                                        type: nft?.type,
                                                        name: nft?.name,
                                                        thumbnail:
                                                          nft?.thumbnail,
                                                        link: nft?.link,
                                                      });
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Activate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                          </Flex>
                                        </VStack>
                                      </Flex>
                                    </Box>
                                  </Flex>
                                </Flex>
                              );
                            })}
                        </>
                      )}
                    </Skeleton>

                    {/* Back*/}
                    <Skeleton loading={!TestNFTs}>
                      {TestNFTs.Back === undefined ? (
                        <></>
                      ) : (
                        <>
                          {TestNFTs.Back[0]?.name !== "None" &&
                            TestNFTs.Back.map((nft, index) => {
                              //Verify Metadata
                              // nft = verifyMetadata(nft);

                              return (
                                <Flex
                                  key={index}
                                  p={90}
                                  w="17%"
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
                                      h={110}
                                      w="70%"
                                      shadow="md"
                                      bgSize="cover"
                                      bgPos="center"
                                      style={{
                                        boxShadow: "5px 5px 6px 0px grey",
                                        backgroundImage: `url(${nft?.thumbnail})`,
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
                                        {nft?.name}
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
                                                {nft?.type}
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
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onActivateBack({
                                                        type: nft?.type,
                                                        name: nft?.name,
                                                        thumbnail:
                                                          nft?.thumbnail,
                                                        link: nft?.link,
                                                      });
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Activate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                          </Flex>
                                        </VStack>
                                      </Flex>
                                    </Box>
                                  </Flex>
                                </Flex>
                              );
                            })}
                        </>
                      )}
                    </Skeleton>

                    {/* Weapon */}
                    <Skeleton loading={!TestNFTs}>
                      {weaponFilter === false ? (
                        <></>
                      ) : (
                        <>
                          {TestNFTs.Weapon === undefined ? (
                            <></>
                          ) : (
                            <>
                              {TestNFTs.Weapon[0]?.name !== "None" &&
                                TestNFTs.Weapon.map((nft, index) => {
                                  //Verify Metadata
                                  // nft = verifyMetadata(nft);

                                  return (
                                    <Flex
                                      key={index}
                                      p={90}
                                      w="17%"
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
                                          h={110}
                                          w="70%"
                                          shadow="md"
                                          bgSize="cover"
                                          bgPos="center"
                                          style={{
                                            boxShadow: "5px 5px 6px 0px grey",
                                            backgroundImage: `url(${nft?.thumbnail})`,
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
                                            {nft?.name}
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
                                                    color={
                                                      ("#2D3748", "#F7FAFC")
                                                    }
                                                  >
                                                    {nft?.type}
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
                                                  <Center>
                                                    <Spacer>
                                                      <AwesomeButtonProgress
                                                        type="secondary"
                                                        size="medium"
                                                        loadingLabel="Wait..."
                                                        resultLabel="Done!"
                                                        action={(e, alert) => {
                                                          onActivateWeapon({
                                                            type: nft?.type,
                                                            name: nft?.name,
                                                            thumbnail:
                                                              nft?.thumbnail,
                                                            link: nft?.link,
                                                          });
                                                          setTimeout(() => {
                                                            alert("Success!");
                                                          }, 5000);
                                                        }}
                                                      >
                                                        Activate
                                                      </AwesomeButtonProgress>
                                                    </Spacer>
                                                  </Center>
                                                </HStack>
                                              </Flex>
                                            </VStack>
                                          </Flex>
                                        </Box>
                                      </Flex>
                                    </Flex>
                                  );
                                })}
                            </>
                          )}
                        </>
                      )}
                    </Skeleton>
                  </>
                )}
              </Box>
            </div>
          </Scrollbars>
        ) : (
          <Scrollbars style={styles.ScrollLight}>
            <div>
              <Box style={styles.NFTs}>
                {filterActive === false ? (
                  <>
                    {/* Background */}
                    <Skeleton loading={!TestNFTs}>
                      {kNFTsOwned === undefined ? (
                        <></>
                      ) : (
                        <>
                          {kNFTsOwned?.Owned !== undefined &&
                            kNFTsOwned?.Owned?.filter(
                              (nft) => nft.type === "Background"
                            ).map((nft, index) => {
                              //Verify Metadata
                              // nft = verifyMetadata(nft);

                              return (
                                <Flex
                                  key={index}
                                  p={90}
                                  w="17%"
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
                                      h={110}
                                      w="70%"
                                      shadow="md"
                                      bgSize="cover"
                                      bgPos="center"
                                      style={{
                                        boxShadow: "5px 5px 6px 0px grey",
                                        backgroundImage: `url(${nft?.thumbnail})`,
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
                                        {nft?.name}
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
                                                {nft?.type}
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
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onActivateBackground({
                                                        type: nft?.type,
                                                        name: nft?.name,
                                                        thumbnail:
                                                          nft?.thumbnail,
                                                        link: nft?.link,
                                                      });
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Activate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                          </Flex>
                                        </VStack>
                                      </Flex>
                                    </Box>
                                  </Flex>
                                </Flex>
                              );
                            })}
                        </>
                      )}
                    </Skeleton>

                    {/* Music */}
                    <Skeleton loading={!TestNFTs}>
                      {TestNFTs.Music === undefined ? (
                        <></>
                      ) : (
                        <>
                          {TestNFTs.Music[0]?.name !== "None" &&
                            TestNFTs.Music.map((nft, index) => {
                              //Verify Metadata
                              // nft = verifyMetadata(nft);

                              return (
                                <Flex
                                  key={index}
                                  p={90}
                                  w="17%"
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
                                      h={110}
                                      w="70%"
                                      shadow="md"
                                      bgSize="cover"
                                      bgPos="center"
                                      style={{
                                        boxShadow: "5px 5px 6px 0px grey",
                                        backgroundImage: `url(${nft?.thumbnail})`,
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
                                        {nft?.name}
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
                                                {nft?.type}
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
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onActivateMusic({
                                                        type: nft?.type,
                                                        name: nft?.name,
                                                        thumbnail:
                                                          nft?.thumbnail,
                                                        link: nft?.link,
                                                      });
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Activate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                          </Flex>
                                        </VStack>
                                      </Flex>
                                    </Box>
                                  </Flex>
                                </Flex>
                              );
                            })}
                        </>
                      )}
                    </Skeleton>

                    {/* Avatar */}
                    <Skeleton loading={!kNFTsOwned}>
                      {kNFTsOwned === undefined ? (
                        <></>
                      ) : (
                        <>
                          {kNFTsOwned?.Owned !== undefined &&
                            kNFTsOwned?.Owned?.filter(
                              (nft) => nft.type === "Avatar"
                            ).map((nft, index) => {
                              //Verify Metadata
                              // nft = verifyMetadata(nft);
                              return (
                                <Flex
                                  key={index}
                                  p={90}
                                  w="17%"
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
                                      h={110}
                                      w="70%"
                                      shadow="md"
                                      bgSize="cover"
                                      bgPos="center"
                                      style={{
                                        boxShadow: "5px 5px 6px 0px grey",
                                        backgroundImage: `url(${nft?.thumbnail})`,
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
                                        {nft?.name} {nft?.token_id}
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
                                                Avatar
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
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onActivateAvatarBox({
                                                        type: nft?.type,
                                                        name: nft?.name,
                                                        token_id: nft?.token_id,
                                                        thumbnail:
                                                          nft?.thumbnail,
                                                        link: nft?.link,
                                                      });
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Activate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                          </Flex>
                                        </VStack>
                                      </Flex>
                                    </Box>
                                  </Flex>
                                </Flex>
                              );
                            })}
                        </>
                      )}
                    </Skeleton>

                    {/* Skin */}
                    <Skeleton loading={!TestNFTs}>
                      {kNFTsOwned === undefined ? (
                        <></>
                      ) : (
                        <>
                          {kNFTsOwned?.Owned !== undefined &&
                            kNFTsOwned?.Owned?.filter(
                              (nft) => nft.type === "Skin"
                            ).map((nft, index) => {
                              //Verify Metadata
                              // nft = verifyMetadata(nft);
                              return (
                                <Flex
                                  key={index}
                                  p={90}
                                  w="17%"
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
                                      h={110}
                                      w="70%"
                                      shadow="md"
                                      bgSize="cover"
                                      bgPos="center"
                                      style={{
                                        boxShadow: "5px 5px 6px 0px grey",
                                        backgroundImage: `url(${nft?.thumbnail})`,
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
                                        {nft?.name}
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
                                                {nft?.type}
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
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onActivateSkin({
                                                        type: nft?.type,
                                                        name: nft?.name,
                                                        thumbnail:
                                                          nft?.thumbnail,
                                                        link: nft?.link,
                                                      });
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Activate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                          </Flex>
                                        </VStack>
                                      </Flex>
                                    </Box>
                                  </Flex>
                                </Flex>
                              );
                            })}
                        </>
                      )}
                    </Skeleton>

                    {/* Head */}
                    <Skeleton loading={!TestNFTs}>
                      {TestNFTs.Head === undefined ? (
                        <></>
                      ) : (
                        <>
                          {TestNFTs.Head[0]?.name !== "None" &&
                            TestNFTs.Head.map((nft, index) => {
                              //Verify Metadata
                              // nft = verifyMetadata(nft);
                              return (
                                <Flex
                                  key={index}
                                  p={90}
                                  w="17%"
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
                                      h={110}
                                      w="70%"
                                      shadow="md"
                                      bgSize="cover"
                                      bgPos="center"
                                      style={{
                                        boxShadow: "5px 5px 6px 0px grey",
                                        backgroundImage: `url(${nft?.thumbnail})`,
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
                                        {nft?.name}
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
                                                {nft?.type}
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
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onActivateHead({
                                                        type: nft?.type,
                                                        name: nft?.name,
                                                        thumbnail:
                                                          nft?.thumbnail,
                                                        link: nft?.link,
                                                      });
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Activate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                          </Flex>
                                        </VStack>
                                      </Flex>
                                    </Box>
                                  </Flex>
                                </Flex>
                              );
                            })}
                        </>
                      )}
                    </Skeleton>

                    {/* Eyes */}
                    <Skeleton loading={!TestNFTs}>
                      {TestNFTs.Eyes === undefined ? (
                        <></>
                      ) : (
                        <>
                          {TestNFTs.Eyes[0]?.name !== "None" &&
                            TestNFTs.Eyes.map((nft, index) => {
                              //Verify Metadata
                              // nft = verifyMetadata(nft);

                              return (
                                <Flex
                                  key={index}
                                  p={90}
                                  w="17%"
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
                                      h={110}
                                      w="70%"
                                      shadow="md"
                                      bgSize="cover"
                                      bgPos="center"
                                      style={{
                                        boxShadow: "5px 5px 6px 0px grey",
                                        backgroundImage: `url(${nft?.thumbnail})`,
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
                                        {nft?.name}
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
                                                {nft?.type}
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
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onActivateEyes({
                                                        type: nft?.type,
                                                        name: nft?.name,
                                                        thumbnail:
                                                          nft?.thumbnail,
                                                        link: nft?.link,
                                                      });
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Activate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                          </Flex>
                                        </VStack>
                                      </Flex>
                                    </Box>
                                  </Flex>
                                </Flex>
                              );
                            })}
                        </>
                      )}
                    </Skeleton>

                    {/* Armor */}
                    <Skeleton loading={!TestNFTs}>
                      {TestNFTs.Armor === undefined ? (
                        <></>
                      ) : (
                        <>
                          {TestNFTs.Armor[0]?.name !== "None" &&
                            TestNFTs.Armor.map((nft, index) => {
                              //Verify Metadata
                              // nft = verifyMetadata(nft);

                              return (
                                <Flex
                                  key={index}
                                  p={90}
                                  w="17%"
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
                                      h={110}
                                      w="70%"
                                      shadow="md"
                                      bgSize="cover"
                                      bgPos="center"
                                      style={{
                                        boxShadow: "5px 5px 6px 0px grey",
                                        backgroundImage: `url(${nft?.thumbnail})`,
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
                                        {nft?.name}
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
                                                {nft?.type}
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
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onActivateArmor({
                                                        type: nft?.type,
                                                        name: nft?.name,
                                                        thumbnail:
                                                          nft?.thumbnail,
                                                        link: nft?.link,
                                                      });
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Activate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                          </Flex>
                                        </VStack>
                                      </Flex>
                                    </Box>
                                  </Flex>
                                </Flex>
                              );
                            })}
                        </>
                      )}
                    </Skeleton>

                    {/* UpperBody */}
                    <Skeleton loading={!TestNFTs}>
                      {TestNFTs.UpperBody === undefined ? (
                        <></>
                      ) : (
                        <>
                          {TestNFTs.UpperBody[0]?.name !== "None" &&
                            TestNFTs.UpperBody.map((nft, index) => {
                              //Verify Metadata
                              // nft = verifyMetadata(nft);

                              return (
                                <Flex
                                  key={index}
                                  p={90}
                                  w="17%"
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
                                      h={110}
                                      w="70%"
                                      shadow="md"
                                      bgSize="cover"
                                      bgPos="center"
                                      style={{
                                        boxShadow: "5px 5px 6px 0px grey",
                                        backgroundImage: `url(${nft?.thumbnail})`,
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
                                        {nft?.name}
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
                                                {nft?.type}
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
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onActivateUpperBody({
                                                        type: nft?.type,
                                                        name: nft?.name,
                                                        thumbnail:
                                                          nft?.thumbnail,
                                                        link: nft?.link,
                                                      });
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Activate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                          </Flex>
                                        </VStack>
                                      </Flex>
                                    </Box>
                                  </Flex>
                                </Flex>
                              );
                            })}
                        </>
                      )}
                    </Skeleton>

                    {/* LeftHand */}
                    <Skeleton loading={!TestNFTs}>
                      {TestNFTs.LeftHand === undefined ? (
                        <></>
                      ) : (
                        <>
                          {TestNFTs.LeftHand[0]?.name !== "None" &&
                            TestNFTs.LeftHand.map((nft, index) => {
                              //Verify Metadata
                              // nft = verifyMetadata(nft);

                              return (
                                <Flex
                                  key={index}
                                  p={90}
                                  w="17%"
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
                                      h={110}
                                      w="70%"
                                      shadow="md"
                                      bgSize="cover"
                                      bgPos="center"
                                      style={{
                                        boxShadow: "5px 5px 6px 0px grey",
                                        backgroundImage: `url(${nft?.thumbnail})`,
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
                                        {nft?.name}
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
                                                {nft?.type}
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
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onActivateLeftHand({
                                                        type: nft?.type,
                                                        name: nft?.name,
                                                        thumbnail:
                                                          nft?.thumbnail,
                                                        link: nft?.link,
                                                      });
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Activate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                          </Flex>
                                        </VStack>
                                      </Flex>
                                    </Box>
                                  </Flex>
                                </Flex>
                              );
                            })}
                        </>
                      )}
                    </Skeleton>

                    {/* RightHand */}
                    <Skeleton loading={!TestNFTs}>
                      {TestNFTs.RightHand === undefined ? (
                        <></>
                      ) : (
                        <>
                          {TestNFTs.RightHand[0]?.name !== "None" &&
                            TestNFTs.RightHand.map((nft, index) => {
                              //Verify Metadata
                              // nft = verifyMetadata(nft);

                              return (
                                <Flex
                                  key={index}
                                  p={90}
                                  w="17%"
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
                                      h={110}
                                      w="70%"
                                      shadow="md"
                                      bgSize="cover"
                                      bgPos="center"
                                      style={{
                                        boxShadow: "5px 5px 6px 0px grey",
                                        backgroundImage: `url(${nft?.thumbnail})`,
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
                                        {nft?.name}
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
                                                {nft?.type}
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
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onActivateRightHand({
                                                        type: nft?.type,
                                                        name: nft?.name,
                                                        thumbnail:
                                                          nft?.thumbnail,
                                                        link: nft?.link,
                                                      });
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Activate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                          </Flex>
                                        </VStack>
                                      </Flex>
                                    </Box>
                                  </Flex>
                                </Flex>
                              );
                            })}
                        </>
                      )}
                    </Skeleton>

                    {/* LowerBody*/}
                    <Skeleton loading={!TestNFTs}>
                      {TestNFTs.LowerBody === undefined ? (
                        <></>
                      ) : (
                        <>
                          {TestNFTs.LowerBody[0]?.name !== "None" &&
                            TestNFTs.LowerBody.map((nft, index) => {
                              //Verify Metadata
                              // nft = verifyMetadata(nft);

                              return (
                                <Flex
                                  key={index}
                                  p={90}
                                  w="17%"
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
                                      h={110}
                                      w="70%"
                                      shadow="md"
                                      bgSize="cover"
                                      bgPos="center"
                                      style={{
                                        boxShadow: "5px 5px 6px 0px grey",
                                        backgroundImage: `url(${nft?.thumbnail})`,
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
                                        {nft?.name}
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
                                                {nft?.type}
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
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onActivateLowerBody({
                                                        type: nft?.type,
                                                        name: nft?.name,
                                                        thumbnail:
                                                          nft?.thumbnail,
                                                        link: nft?.link,
                                                      });
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Activate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                          </Flex>
                                        </VStack>
                                      </Flex>
                                    </Box>
                                  </Flex>
                                </Flex>
                              );
                            })}
                        </>
                      )}
                    </Skeleton>

                    {/* Back*/}
                    <Skeleton loading={!TestNFTs}>
                      {TestNFTs.Back === undefined ? (
                        <></>
                      ) : (
                        <>
                          {TestNFTs.Back[0]?.name !== "None" &&
                            TestNFTs.Back.map((nft, index) => {
                              //Verify Metadata
                              // nft = verifyMetadata(nft);

                              return (
                                <Flex
                                  key={index}
                                  p={90}
                                  w="17%"
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
                                      h={110}
                                      w="70%"
                                      shadow="md"
                                      bgSize="cover"
                                      bgPos="center"
                                      style={{
                                        boxShadow: "5px 5px 6px 0px grey",
                                        backgroundImage: `url(${nft?.thumbnail})`,
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
                                        {nft?.name}
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
                                                {nft?.type}
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
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onActivateBack({
                                                        type: nft?.type,
                                                        name: nft?.name,
                                                        thumbnail:
                                                          nft?.thumbnail,
                                                        link: nft?.link,
                                                      });
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Activate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                          </Flex>
                                        </VStack>
                                      </Flex>
                                    </Box>
                                  </Flex>
                                </Flex>
                              );
                            })}
                        </>
                      )}
                    </Skeleton>

                    {/* Weapon*/}
                    <Skeleton loading={!TestNFTs}>
                      {TestNFTs.Weapon === undefined ? (
                        <></>
                      ) : (
                        <>
                          {TestNFTs.Weapon[0]?.name !== "None" &&
                            TestNFTs.Weapon.map((nft, index) => {
                              //Verify Metadata
                              // nft = verifyMetadata(nft);

                              return (
                                <Flex
                                  key={index}
                                  p={90}
                                  w="17%"
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
                                      h={110}
                                      w="70%"
                                      shadow="md"
                                      bgSize="cover"
                                      bgPos="center"
                                      style={{
                                        boxShadow: "5px 5px 6px 0px grey",
                                        backgroundImage: `url(${nft?.thumbnail})`,
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
                                        {nft?.name}
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
                                                {nft?.type}
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
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onActivateWeapon({
                                                        type: nft?.type,
                                                        name: nft?.name,
                                                        thumbnail:
                                                          nft?.thumbnail,
                                                        link: nft?.link,
                                                      });
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Activate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                          </Flex>
                                        </VStack>
                                      </Flex>
                                    </Box>
                                  </Flex>
                                </Flex>
                              );
                            })}
                        </>
                      )}
                    </Skeleton>
                  </>
                ) : (
                  <>
                    {/* Background */}
                    <Skeleton loading={!TestNFTs}>
                      {bgFilter === false ? (
                        <></>
                      ) : (
                        <>
                          {kNFTsOwned === undefined ? (
                            <></>
                          ) : (
                            <>
                              {kNFTsOwned?.Owned !== undefined &&
                                kNFTsOwned?.Owned?.filter(
                                  (nft) => nft.type === "Background"
                                ).map((nft, index) => {
                                  //Verify Metadata
                                  // nft = verifyMetadata(nft);

                                  return (
                                    <Flex
                                      key={index}
                                      p={90}
                                      w="17%"
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
                                          h={110}
                                          w="70%"
                                          shadow="md"
                                          bgSize="cover"
                                          bgPos="center"
                                          style={{
                                            boxShadow: "5px 5px 6px 0px grey",
                                            backgroundImage: `url(${nft?.thumbnail})`,
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
                                            {nft?.name}
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
                                                    color={
                                                      ("#2D3748", "#F7FAFC")
                                                    }
                                                  >
                                                    {nft?.type}
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
                                                  <Center>
                                                    <Spacer>
                                                      <AwesomeButtonProgress
                                                        type="secondary"
                                                        size="medium"
                                                        loadingLabel="Wait..."
                                                        resultLabel="Done!"
                                                        action={(e, alert) => {
                                                          onActivateBackground({
                                                            type: nft?.type,
                                                            name: nft?.name,
                                                            thumbnail:
                                                              nft?.thumbnail,
                                                            link: nft?.link,
                                                          });
                                                          setTimeout(() => {
                                                            alert("Success!");
                                                          }, 5000);
                                                        }}
                                                      >
                                                        Activate
                                                      </AwesomeButtonProgress>
                                                    </Spacer>
                                                  </Center>
                                                </HStack>
                                              </Flex>
                                            </VStack>
                                          </Flex>
                                        </Box>
                                      </Flex>
                                    </Flex>
                                  );
                                })}
                            </>
                          )}
                        </>
                      )}
                    </Skeleton>

                    {/* Music */}
                    <Skeleton loading={!TestNFTs}>
                      {musicFilter === false ? (
                        <></>
                      ) : (
                        <>
                          {TestNFTs.Music === undefined ? (
                            <></>
                          ) : (
                            <>
                              {TestNFTs.Music[0]?.name !== "None" &&
                                TestNFTs.Music.map((nft, index) => {
                                  //Verify Metadata
                                  // nft = verifyMetadata(nft);

                                  return (
                                    <Flex
                                      key={index}
                                      p={90}
                                      w="17%"
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
                                          h={110}
                                          w="70%"
                                          shadow="md"
                                          bgSize="cover"
                                          bgPos="center"
                                          style={{
                                            boxShadow: "5px 5px 6px 0px grey",
                                            backgroundImage: `url(${nft?.thumbnail})`,
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
                                            {nft?.name}
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
                                                    color={
                                                      ("#2D3748", "#F7FAFC")
                                                    }
                                                  >
                                                    {nft?.type}
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
                                                  <Center>
                                                    <Spacer>
                                                      <AwesomeButtonProgress
                                                        type="secondary"
                                                        size="medium"
                                                        loadingLabel="Wait..."
                                                        resultLabel="Done!"
                                                        action={(e, alert) => {
                                                          onActivateMusic({
                                                            type: nft?.type,
                                                            name: nft?.name,
                                                            thumbnail:
                                                              nft?.thumbnail,
                                                            link: nft?.link,
                                                          });
                                                          setTimeout(() => {
                                                            alert("Success!");
                                                          }, 5000);
                                                        }}
                                                      >
                                                        Activate
                                                      </AwesomeButtonProgress>
                                                    </Spacer>
                                                  </Center>
                                                </HStack>
                                              </Flex>
                                            </VStack>
                                          </Flex>
                                        </Box>
                                      </Flex>
                                    </Flex>
                                  );
                                })}
                            </>
                          )}
                        </>
                      )}
                    </Skeleton>

                    {/* Avatar */}
                    <Skeleton loading={!kNFTsOwned}>
                      {avatarFilter === false ? (
                        <></>
                      ) : (
                        <>
                          {kNFTsOwned === undefined ? (
                            <></>
                          ) : (
                            <>
                              {kNFTsOwned?.Owned !== undefined &&
                                kNFTsOwned?.Owned?.filter(
                                  (nft) => nft.type === "Avatar"
                                ).map((nft, index) => {
                                  //Verify Metadata
                                  // nft = verifyMetadata(nft);
                                  return (
                                    <Flex
                                      key={index}
                                      p={90}
                                      w="17%"
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
                                          h={110}
                                          w="70%"
                                          shadow="md"
                                          bgSize="cover"
                                          bgPos="center"
                                          style={{
                                            boxShadow: "5px 5px 6px 0px grey",
                                            backgroundImage: `url(${nft?.thumbnail})`,
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
                                            {nft?.name} {nft?.token_id}
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
                                                    color={
                                                      ("#2D3748", "#F7FAFC")
                                                    }
                                                  >
                                                    Avatar
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
                                                  <Center>
                                                    <Spacer>
                                                      <AwesomeButtonProgress
                                                        type="secondary"
                                                        size="medium"
                                                        loadingLabel="Wait..."
                                                        resultLabel="Done!"
                                                        action={(e, alert) => {
                                                          onActivateAvatarBox({
                                                            type: nft?.type,
                                                            name: nft?.name,
                                                            token_id:
                                                              nft?.token_id,
                                                            thumbnail:
                                                              nft?.thumbnail,
                                                            link: nft?.link,
                                                          });
                                                          setTimeout(() => {
                                                            alert("Success!");
                                                          }, 5000);
                                                        }}
                                                      >
                                                        Activate
                                                      </AwesomeButtonProgress>
                                                    </Spacer>
                                                  </Center>
                                                </HStack>
                                              </Flex>
                                            </VStack>
                                          </Flex>
                                        </Box>
                                      </Flex>
                                    </Flex>
                                  );
                                })}
                            </>
                          )}
                        </>
                      )}
                    </Skeleton>

                    {/* Skin */}
                    <Skeleton loading={!TestNFTs}>
                      {skinFilter === false ? (
                        <></>
                      ) : (
                        <>
                          {kNFTsOwned === undefined ? (
                            <></>
                          ) : (
                            <>
                              {kNFTsOwned?.Owned !== undefined &&
                                kNFTsOwned?.Owned?.filter(
                                  (nft) => nft.type === "Skin"
                                ).map((nft, index) => {
                                  //Verify Metadata
                                  // nft = verifyMetadata(nft);
                                  return (
                                    <Flex
                                      key={index}
                                      p={90}
                                      w="17%"
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
                                          h={110}
                                          w="70%"
                                          shadow="md"
                                          bgSize="cover"
                                          bgPos="center"
                                          style={{
                                            boxShadow: "5px 5px 6px 0px grey",
                                            backgroundImage: `url(${nft?.thumbnail})`,
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
                                            {nft?.name}
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
                                                    color={
                                                      ("#2D3748", "#F7FAFC")
                                                    }
                                                  >
                                                    {nft?.type}
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
                                                  <Center>
                                                    <Spacer>
                                                      <AwesomeButtonProgress
                                                        type="secondary"
                                                        size="medium"
                                                        loadingLabel="Wait..."
                                                        resultLabel="Done!"
                                                        action={(e, alert) => {
                                                          onActivateSkin({
                                                            type: nft?.type,
                                                            name: nft?.name,
                                                            thumbnail:
                                                              nft?.thumbnail,
                                                            link: nft?.link,
                                                          });
                                                          setTimeout(() => {
                                                            alert("Success!");
                                                          }, 5000);
                                                        }}
                                                      >
                                                        Activate
                                                      </AwesomeButtonProgress>
                                                    </Spacer>
                                                  </Center>
                                                </HStack>
                                              </Flex>
                                            </VStack>
                                          </Flex>
                                        </Box>
                                      </Flex>
                                    </Flex>
                                  );
                                })}
                            </>
                          )}
                        </>
                      )}
                    </Skeleton>

                    {/* Head */}
                    <Skeleton loading={!TestNFTs}>
                      {headFilter === false ? (
                        <></>
                      ) : (
                        <>
                          {TestNFTs.Head === undefined ? (
                            <></>
                          ) : (
                            <>
                              {TestNFTs.Head[0]?.name !== "None" &&
                                TestNFTs.Head.map((nft, index) => {
                                  //Verify Metadata
                                  // nft = verifyMetadata(nft);
                                  return (
                                    <Flex
                                      key={index}
                                      p={90}
                                      w="17%"
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
                                          h={110}
                                          w="70%"
                                          shadow="md"
                                          bgSize="cover"
                                          bgPos="center"
                                          style={{
                                            boxShadow: "5px 5px 6px 0px grey",
                                            backgroundImage: `url(${nft?.thumbnail})`,
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
                                            {nft?.name}
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
                                                    color={
                                                      ("#2D3748", "#F7FAFC")
                                                    }
                                                  >
                                                    {nft?.type}
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
                                                  <Center>
                                                    <Spacer>
                                                      <AwesomeButtonProgress
                                                        type="secondary"
                                                        size="medium"
                                                        loadingLabel="Wait..."
                                                        resultLabel="Done!"
                                                        action={(e, alert) => {
                                                          onActivateHead({
                                                            type: nft?.type,
                                                            name: nft?.name,
                                                            thumbnail:
                                                              nft?.thumbnail,
                                                            link: nft?.link,
                                                          });
                                                          setTimeout(() => {
                                                            alert("Success!");
                                                          }, 5000);
                                                        }}
                                                      >
                                                        Activate
                                                      </AwesomeButtonProgress>
                                                    </Spacer>
                                                  </Center>
                                                </HStack>
                                              </Flex>
                                            </VStack>
                                          </Flex>
                                        </Box>
                                      </Flex>
                                    </Flex>
                                  );
                                })}
                            </>
                          )}
                        </>
                      )}
                    </Skeleton>

                    {/* Eyes */}
                    <Skeleton loading={!TestNFTs}>
                      {eyesFilter === false ? (
                        <></>
                      ) : (
                        <>
                          {TestNFTs.Eyes === undefined ? (
                            <></>
                          ) : (
                            <>
                              {TestNFTs.Eyes[0]?.name !== "None" &&
                                TestNFTs.Eyes.map((nft, index) => {
                                  //Verify Metadata
                                  // nft = verifyMetadata(nft);

                                  return (
                                    <Flex
                                      key={index}
                                      p={90}
                                      w="17%"
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
                                          h={110}
                                          w="70%"
                                          shadow="md"
                                          bgSize="cover"
                                          bgPos="center"
                                          style={{
                                            boxShadow: "5px 5px 6px 0px grey",
                                            backgroundImage: `url(${nft?.thumbnail})`,
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
                                            {nft?.name}
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
                                                    color={
                                                      ("#2D3748", "#F7FAFC")
                                                    }
                                                  >
                                                    {nft?.type}
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
                                                  <Center>
                                                    <Spacer>
                                                      <AwesomeButtonProgress
                                                        type="secondary"
                                                        size="medium"
                                                        loadingLabel="Wait..."
                                                        resultLabel="Done!"
                                                        action={(e, alert) => {
                                                          onActivateEyes({
                                                            type: nft?.type,
                                                            name: nft?.name,
                                                            thumbnail:
                                                              nft?.thumbnail,
                                                            link: nft?.link,
                                                          });
                                                          setTimeout(() => {
                                                            alert("Success!");
                                                          }, 5000);
                                                        }}
                                                      >
                                                        Activate
                                                      </AwesomeButtonProgress>
                                                    </Spacer>
                                                  </Center>
                                                </HStack>
                                              </Flex>
                                            </VStack>
                                          </Flex>
                                        </Box>
                                      </Flex>
                                    </Flex>
                                  );
                                })}
                            </>
                          )}
                        </>
                      )}
                    </Skeleton>

                    {/* Armor */}
                    <Skeleton loading={!TestNFTs}>
                      {armorFilter === false ? (
                        <></>
                      ) : (
                        <>
                          {TestNFTs.Armor === undefined ? (
                            <></>
                          ) : (
                            <>
                              {TestNFTs.Armor[0]?.name !== "None" &&
                                TestNFTs.Armor.map((nft, index) => {
                                  //Verify Metadata
                                  // nft = verifyMetadata(nft);

                                  return (
                                    <Flex
                                      key={index}
                                      p={90}
                                      w="17%"
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
                                          h={110}
                                          w="70%"
                                          shadow="md"
                                          bgSize="cover"
                                          bgPos="center"
                                          style={{
                                            boxShadow: "5px 5px 6px 0px grey",
                                            backgroundImage: `url(${nft?.thumbnail})`,
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
                                            {nft?.name}
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
                                                    color={
                                                      ("#2D3748", "#F7FAFC")
                                                    }
                                                  >
                                                    {nft?.type}
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
                                                  <Center>
                                                    <Spacer>
                                                      <AwesomeButtonProgress
                                                        type="secondary"
                                                        size="medium"
                                                        loadingLabel="Wait..."
                                                        resultLabel="Done!"
                                                        action={(e, alert) => {
                                                          onActivateArmor({
                                                            type: nft?.type,
                                                            name: nft?.name,
                                                            thumbnail:
                                                              nft?.thumbnail,
                                                            link: nft?.link,
                                                          });
                                                          setTimeout(() => {
                                                            alert("Success!");
                                                          }, 5000);
                                                        }}
                                                      >
                                                        Activate
                                                      </AwesomeButtonProgress>
                                                    </Spacer>
                                                  </Center>
                                                </HStack>
                                              </Flex>
                                            </VStack>
                                          </Flex>
                                        </Box>
                                      </Flex>
                                    </Flex>
                                  );
                                })}
                            </>
                          )}
                        </>
                      )}
                    </Skeleton>

                    {/* UpperBody */}
                    <Skeleton loading={!TestNFTs}>
                      {TestNFTs.UpperBody === undefined ? (
                        <></>
                      ) : (
                        <>
                          {TestNFTs.UpperBody[0]?.name !== "None" &&
                            TestNFTs.UpperBody.map((nft, index) => {
                              //Verify Metadata
                              // nft = verifyMetadata(nft);

                              return (
                                <Flex
                                  key={index}
                                  p={90}
                                  w="17%"
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
                                      h={110}
                                      w="70%"
                                      shadow="md"
                                      bgSize="cover"
                                      bgPos="center"
                                      style={{
                                        boxShadow: "5px 5px 6px 0px grey",
                                        backgroundImage: `url(${nft?.thumbnail})`,
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
                                        {nft?.name}
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
                                                {nft?.type}
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
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onActivateUpperBody({
                                                        type: nft?.type,
                                                        name: nft?.name,
                                                        thumbnail:
                                                          nft?.thumbnail,
                                                        link: nft?.link,
                                                      });
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Activate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                          </Flex>
                                        </VStack>
                                      </Flex>
                                    </Box>
                                  </Flex>
                                </Flex>
                              );
                            })}
                        </>
                      )}
                    </Skeleton>

                    {/* LeftHand */}
                    <Skeleton loading={!TestNFTs}>
                      {TestNFTs.LeftHand === undefined ? (
                        <></>
                      ) : (
                        <>
                          {TestNFTs.LeftHand[0]?.name !== "None" &&
                            TestNFTs.LeftHand.map((nft, index) => {
                              //Verify Metadata
                              // nft = verifyMetadata(nft);

                              return (
                                <Flex
                                  key={index}
                                  p={90}
                                  w="17%"
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
                                      h={110}
                                      w="70%"
                                      shadow="md"
                                      bgSize="cover"
                                      bgPos="center"
                                      style={{
                                        boxShadow: "5px 5px 6px 0px grey",
                                        backgroundImage: `url(${nft?.thumbnail})`,
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
                                        {nft?.name}
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
                                                {nft?.type}
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
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onActivateLeftHand({
                                                        type: nft?.type,
                                                        name: nft?.name,
                                                        thumbnail:
                                                          nft?.thumbnail,
                                                        link: nft?.link,
                                                      });
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Activate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                          </Flex>
                                        </VStack>
                                      </Flex>
                                    </Box>
                                  </Flex>
                                </Flex>
                              );
                            })}
                        </>
                      )}
                    </Skeleton>

                    {/* RightHand */}
                    <Skeleton loading={!TestNFTs}>
                      {TestNFTs.RightHand === undefined ? (
                        <></>
                      ) : (
                        <>
                          {TestNFTs.RightHand[0]?.name !== "None" &&
                            TestNFTs.RightHand.map((nft, index) => {
                              //Verify Metadata
                              // nft = verifyMetadata(nft);

                              return (
                                <Flex
                                  key={index}
                                  p={90}
                                  w="17%"
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
                                      h={110}
                                      w="70%"
                                      shadow="md"
                                      bgSize="cover"
                                      bgPos="center"
                                      style={{
                                        boxShadow: "5px 5px 6px 0px grey",
                                        backgroundImage: `url(${nft?.thumbnail})`,
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
                                        {nft?.name}
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
                                                {nft?.type}
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
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onActivateRightHand({
                                                        type: nft?.type,
                                                        name: nft?.name,
                                                        thumbnail:
                                                          nft?.thumbnail,
                                                        link: nft?.link,
                                                      });
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Activate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                          </Flex>
                                        </VStack>
                                      </Flex>
                                    </Box>
                                  </Flex>
                                </Flex>
                              );
                            })}
                        </>
                      )}
                    </Skeleton>

                    {/* LowerBody*/}
                    <Skeleton loading={!TestNFTs}>
                      {TestNFTs.LowerBody === undefined ? (
                        <></>
                      ) : (
                        <>
                          {TestNFTs.LowerBody[0]?.name !== "None" &&
                            TestNFTs.LowerBody.map((nft, index) => {
                              //Verify Metadata
                              // nft = verifyMetadata(nft);

                              return (
                                <Flex
                                  key={index}
                                  p={90}
                                  w="17%"
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
                                      h={110}
                                      w="70%"
                                      shadow="md"
                                      bgSize="cover"
                                      bgPos="center"
                                      style={{
                                        boxShadow: "5px 5px 6px 0px grey",
                                        backgroundImage: `url(${nft?.thumbnail})`,
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
                                        {nft?.name}
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
                                                {nft?.type}
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
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onActivateLowerBody({
                                                        type: nft?.type,
                                                        name: nft?.name,
                                                        thumbnail:
                                                          nft?.thumbnail,
                                                        link: nft?.link,
                                                      });
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Activate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                          </Flex>
                                        </VStack>
                                      </Flex>
                                    </Box>
                                  </Flex>
                                </Flex>
                              );
                            })}
                        </>
                      )}
                    </Skeleton>

                    {/* Back*/}
                    <Skeleton loading={!TestNFTs}>
                      {TestNFTs.Back === undefined ? (
                        <></>
                      ) : (
                        <>
                          {TestNFTs.Back[0]?.name !== "None" &&
                            TestNFTs.Back.map((nft, index) => {
                              //Verify Metadata
                              // nft = verifyMetadata(nft);

                              return (
                                <Flex
                                  key={index}
                                  p={90}
                                  w="17%"
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
                                      h={110}
                                      w="70%"
                                      shadow="md"
                                      bgSize="cover"
                                      bgPos="center"
                                      style={{
                                        boxShadow: "5px 5px 6px 0px grey",
                                        backgroundImage: `url(${nft?.thumbnail})`,
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
                                        {nft?.name}
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
                                                {nft?.type}
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
                                              <Center>
                                                <Spacer>
                                                  <AwesomeButtonProgress
                                                    type="secondary"
                                                    size="medium"
                                                    loadingLabel="Wait..."
                                                    resultLabel="Done!"
                                                    action={(e, alert) => {
                                                      onActivateBack({
                                                        type: nft?.type,
                                                        name: nft?.name,
                                                        thumbnail:
                                                          nft?.thumbnail,
                                                        link: nft?.link,
                                                      });
                                                      setTimeout(() => {
                                                        alert("Success!");
                                                      }, 5000);
                                                    }}
                                                  >
                                                    Activate
                                                  </AwesomeButtonProgress>
                                                </Spacer>
                                              </Center>
                                            </HStack>
                                          </Flex>
                                        </VStack>
                                      </Flex>
                                    </Box>
                                  </Flex>
                                </Flex>
                              );
                            })}
                        </>
                      )}
                    </Skeleton>

                    {/* Weapon */}
                    <Skeleton loading={!TestNFTs}>
                      {weaponFilter === false ? (
                        <></>
                      ) : (
                        <>
                          {TestNFTs.Weapon === undefined ? (
                            <></>
                          ) : (
                            <>
                              {TestNFTs.Weapon[0]?.name !== "None" &&
                                TestNFTs.Weapon.map((nft, index) => {
                                  //Verify Metadata
                                  // nft = verifyMetadata(nft);

                                  return (
                                    <Flex
                                      key={index}
                                      p={90}
                                      w="17%"
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
                                          h={110}
                                          w="70%"
                                          shadow="md"
                                          bgSize="cover"
                                          bgPos="center"
                                          style={{
                                            boxShadow: "5px 5px 6px 0px grey",
                                            backgroundImage: `url(${nft?.thumbnail})`,
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
                                            {nft?.name}
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
                                                    color={
                                                      ("#2D3748", "#F7FAFC")
                                                    }
                                                  >
                                                    {nft?.type}
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
                                                  <Center>
                                                    <Spacer>
                                                      <AwesomeButtonProgress
                                                        type="secondary"
                                                        size="medium"
                                                        loadingLabel="Wait..."
                                                        resultLabel="Done!"
                                                        action={(e, alert) => {
                                                          onActivateWeapon({
                                                            type: nft?.type,
                                                            name: nft?.name,
                                                            thumbnail:
                                                              nft?.thumbnail,
                                                            link: nft?.link,
                                                          });
                                                          setTimeout(() => {
                                                            alert("Success!");
                                                          }, 5000);
                                                        }}
                                                      >
                                                        Activate
                                                      </AwesomeButtonProgress>
                                                    </Spacer>
                                                  </Center>
                                                </HStack>
                                              </Flex>
                                            </VStack>
                                          </Flex>
                                        </Box>
                                      </Flex>
                                    </Flex>
                                  );
                                })}
                            </>
                          )}
                        </>
                      )}
                    </Skeleton>
                  </>
                )}
              </Box>
            </div>
          </Scrollbars>
        )}
      </VStack>
    </>
  );
}

export default NftOwned;
