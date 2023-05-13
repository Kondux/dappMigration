import { useState, useRef, useEffect } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import VideoPlayer from "react-background-video-player";
import { ethers } from "ethers";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import axios from "axios";
import { BrowserView, MobileView } from "react-device-detect";
import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";
// import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib";
// import Nvidia from "./Images/Nvidia4.png";
// import { TypeAnimation } from "react-type-animation";
// import { useReactCountdown } from "use-react-countdown";

// import "react-component-countdown-timer/lib/styles.css";
import * as logos from "./Logos";
import { contractABI, contractAddress } from "./Contract/FounderContract";
import {
  contractABI2,
  contractAddress2,
} from "./Contract/PublicFounderContract";
import {
  Box,
  Button,
  Flex,
  Icon,
  useColorMode,
  Spacer,
  Stack,
  // VStack,
  // Image,
  // Heading,
  Text,
  // Input,
  Divider,
  HStack,
  createIcon,
  Container,
  CloseButton,
  Center,
  SimpleGrid,
  useColorModeValue as mode,
} from "@chakra-ui/react";

import ReactiveButton from "reactive-button";

import Alert from "react-bootstrap/Alert";

import { FiClock } from "react-icons/fi";
import { AiOutlineCodeSandbox } from "react-icons/ai";
import { MdOutlineSmsFailed } from "react-icons/md";
import BannerStyleWrapper from "./minter/Minter.style";
// import bannerThumb1 from "./minter/assets/Item1.png";
// import bannerThumb2 from "./minter/assets/Item2.png";
// import bannerThumb3 from "./minter/assets/Item3.png";

// BG MAIN MOBILE
// import BGVidMobile from "./minter/assets/FounderMobile.mp4";
// import BGVidMobile from "./minter/assets/BGVidMobile.mp4";

// BG MAIN
import BGVid from "./minter/assets/Founder.webm";

import FounderPassVid from "./minter/assets/FoundersPass.webm";

// import BGVid from "./minter/assets/BGVid.mp4";
// import DNA from "./minter/assets/Dna.mp4";
// import ParticleVid from "./minter/assets/Dna.mp4";

// import Particle from "./minter/Particle";

// import Grey from "./minter/assets/GreyBox10.mp4";
// import CyGrey from "./minter/assets/CyGreyBox10.mp4";
// import Reptilian from "./minter/assets/ReptilianBox10.mp4";
// import Annunaki from "./minter/assets/AnnunakiBox10.mp4";
// import Pleiadian from "./minter/assets/PleiadianBox10.mp4";

import Footer from "../components/Footer";
// import PleiadianBase from "./Viewport/VPComponents/PleiadianBase";

// RectAreaLightUniformsLib.init();

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import { Scrollbars } from "react-custom-scrollbars-2";

const items = [
  <Box p={5}>
    <div
      className="item"
      data-value="1"
      style={{ color: "#5f9ea0", textShadow: "#FF00FF 0 2px 30px" }}
    >
      • Immediate discount of 0.2 ETH on minting costs for the Disclosure kNFT
      Collection Loot Crate
    </div>
  </Box>,
  <Box p={5}>
    <div
      className="item"
      data-value="2"
      style={{ color: "#5f9ea0", textShadow: "#FF00FF 0 2px 30px" }}
    >
      • Receive a 10% Staking bonus on KNDX
      <br></br>(Based on Variable APY - Participation dictates APY)
    </div>
  </Box>,
  <Box p={5}>
    <div
      className="item"
      data-value="3"
      style={{ color: "#5f9ea0", textShadow: "#FF00FF 0 2px 30px" }}
    >
      • Stackable with boosts up to 4 kNFT Avatars
    </div>
  </Box>,
  <Box p={5}>
    <div
      className="item"
      data-value="4"
      style={{ color: "#5f9ea0", textShadow: "#FF00FF 0 2px 30px" }}
    >
      • Entry into the monthly raffle for prizes of KNDX, ETH, kNFTs and Kondux
      swag!
      <br></br>
    </div>
  </Box>,
  <Box p={5}>
    <div
      className="item"
      data-value="5"
      style={{ color: "#5f9ea0", textShadow: "#FF00FF 0 2px 30px" }}
    >
      • Guaranteed whitelist spot available for all future Kondux created kNFT
      collections
    </div>
  </Box>,
  <Box p={5}>
    <div
      className="item"
      data-value="6"
      style={{ color: "#5f9ea0", textShadow: "#FF00FF 0 2px 30px" }}
    >
      • Early access to beta testing the Kondux ecosystem features as made
      available
    </div>
  </Box>,
];

const styles = {
  video0: {
    objectFit: "cover",
    width: "90vw",
    height: "90vh",
    position: "fixed",
    opacity: ".05",
    top: 0,
    left: 0,
    zIndex: 0,
  },

  video: {
    objectFit: "cover",
    width: "100vw",
    height: "100vh",
    position: "fixed",
    opacity: "0.9",
    top: 0,
    left: 0,
    zIndex: 0,
  },

  video2: {
    objectFit: "contain",
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1,
  },

  video3: {
    objectFit: "cover",
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 0,
  },

  confirm: {
    position: "fixed",
    // flexDirection: "row-reverse",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    opacity: "0.8",

    // transition: ".3s ease",
    // fontFamily: "Poppins, sans-serif",
    // color: "#041836",
    border: "1px black solid",
    backgroundColor: "black",
    // top: "0",
    width: "40%",
    height: "30%",
    top: "33%",
    left: "33%",
    // right: "0",
    zIndex: "4",
    borderRadius: "10px",
  },

  congrats: {
    position: "fixed",
    // flexDirection: "row-reverse",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    opacity: "0.8",

    // transition: ".3s ease",
    // fontFamily: "Poppins, sans-serif",
    // color: "#041836",
    border: "1px black solid",
    backgroundColor: "black",
    // top: "0",
    width: "100%",
    height: "30%",
    top: "33%",
    left: "0",
    // right: "0",
    zIndex: "4",
    borderRadius: "10px",
  },

  alertWL: {
    position: "fixed",
    // flexDirection: "row-reverse",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    opacity: "1",

    // transition: ".3s ease",
    // fontFamily: "Poppins, sans-serif",
    // color: "#041836",
    border: "1px black solid",
    backgroundColor: "black",
    // top: "0",
    width: "40%",
    height: "30%",
    top: "33%",
    left: "33%",
    // right: "0",
    zIndex: "10",
    borderRadius: "10px",
  },

  //Numbers
  countdown1: {
    opacity: ".5",
    fontSize: "35px",
    color: "white",
    zIndex: "1",
  },

  //Word in Countdown
  countdown: {
    opacity: ".5",
    zIndex: "1",
  },

  //Word in Countdown
  movingtext: {
    position: "absolute",
    top: 0,
    fontSize: "80px",
    fontWeight: 900,
    left: "-1vw",
    opacity: 0.75,
    zIndex: 3,
  },

  //Word in Countdown
  movingtext2: {
    position: "absolute",
    height: "200px",
    fontSize: "140px",
    fontWeight: 900,
    top: 135,
    right: "-1vw",
    opacity: 0.25,
    zIndex: 3,
  },
};

// const BgVideo = () => {
//   return (
//     <div style={styles.video0}>
//       <VideoPlayer
//         className="video"
//         src={BGVid}
//         disableBackgroundCover={false}
//         autoPlay={true}
//         muted={true}
//         playsInline={true}
//         style={styles.video}
//         // containerWidth={100}
//         // containerHeight={100}
//         // horizontalAlign={0.5}
//         // verticalAlign={0.5}
//       />
//     </div>

//     // <video ref={videoRef} autoPlay loop muted style={styles.video}>
//     //   <source src={BGVid} type="video/mp4" />
//     // </video>
//   );
// };

// const BgVideoMobile = () => {
//   // const videoRef = useRef();

//   // useEffect(() => {
//   //   setTimeout(() => {
//   //     videoRef.current.play();
//   //   });
//   // }, []);

//   return (
//     <div style={styles.video0}>
//       <VideoPlayer
//         className="video"
//         src={BGVidMobile}
//         disableBackgroundCover={false}
//         autoPlay={true}
//         muted={true}
//         playsInline={true}
//         style={styles.video}
//         // containerWidth={100}
//         // containerHeight={100}
//         // horizontalAlign={0.5}
//         // verticalAlign={0.5}
//       />
//     </div>

//     // <video ref={videoRef} autoPlay loop muted style={styles.video}>
//     //   <source src={BGVid} type="video/mp4" />
//     // </video>
//   );
// };

// const BgVideo2 = () => {
//   // const videoRef = useRef();

//   // useEffect(() => {
//   //   setTimeout(() => {
//   //     videoRef.current.play();
//   //   });
//   // }, []);

//   return (
//     <VideoPlayer
//       className="video"
//       src={DNA}
//       disableBackgroundCover={true}
//       autoPlay={true}
//       muted={true}
//       playsInline={true}
//       style={styles.video3}
//       // containerWidth={100}
//       // containerHeight={100}
//       // horizontalAlign={0.5}
//       // verticalAlign={0.5}
//     />

//     // <video ref={videoRef} autoPlay playsInline loop muted style={styles.video2}>
//     //   <source src={DNA} type="video/mp4" />
//     // </video>
//   );
// };

const FounderPass = () => {
  return (
    <VideoPlayer
      className="video"
      src={FounderPassVid}
      disableBackgroundCover={true}
      autoPlay={true}
      muted={true}
      loop={false}
      playsInline={true}
      style={styles.video2}
      // containerWidth={100}
      // containerHeight={100}
      // horizontalAlign={0.5}
      // verticalAlign={0.5}
    />
  );
};

function Minter() {
  const {
    web3,
    Moralis,
    user,
    logout,
    isWeb3Enabled,
    isAuthenticated,
    authenticate,
    enableWeb3,
  } = useMoralis();
  const [name, setName] = useState("");
  const [quanity, setQuanity] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const { colorMode, toggleColorMode } = useColorMode();
  const [color, setColor] = useState("#F37701");

  useEffect(() => {
    if (colorMode === "light") {
      setColor("purple");
    } else {
      setColor("#F37701");
    }
  }, [colorMode]);

  useEffect(() => {
    setTimeout(function () {
      // so people cannot mint earlier
      setMintReady(true);
    }, 1000);
  }, []);

  const [hidden, setHidden] = useState(false);
  // const [open, setOpen] = useState(false);
  // const [count, setCount] = useState(1);
  const [mintStatus, setMintStatus] = useState(null);
  const [inProcess, setInProcess] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState(null);
  const [IDNumber, setIDNumber] = useState(null);
  const { walletAddress, currentChainId } = useMoralisDapp();
  const [totalNFTs, setTotalNFTs] = useState([]);
  const [boxDisplay, setBoxDisplay] = useState(null);
  const [boxReveal, setBoxReveal] = useState(false);
  const [transition, setTransition] = useState(false);

  const [userName, setUserName] = useState("");
  const [isHidden, setNotificaitonHidden] = useState(false);
  const [emoji, setEmoji] = useState();
  const [bannerStatus, setBannerStatus] = useState(true);

  // const [freeStatus, setFreeStatus] = useState(false);
  // const [ogStatus, setOGStatus] = useState(false);
  // const [wlStatus, setWLStatus] = useState(false);
  const [noStatus, setNoStatus] = useState(false);
  // const [publicStatus, setPublicStatus] = useState(false);

  const [needFunds, setNeedFunds] = useState(false);

  const [closeFundsStatus, setCloseFundsStatus] = useState(false);
  const [closeStatus, setCloseStatus] = useState(false);
  const [mintReady, setMintReady] = useState(false);

  const navigate = useNavigate();

  // const Web3Api = useMoralisWeb3Api();

  useEffect(() => {
    let emojiArray = [
      "☕",
      "🍺",
      "🥂",
      "🧃",
      "🥤",
      "🍻",
      "🥛",
      "🍆",
      "🍌",
      "🍹",
      "🍷",
      "🥃",
      "🍵",
      "🍶",
      "🍾",
      "🍸",
      "🧬",
      "🛸",
      "🪐",
      "🌌",
      "🌠",
      "🚀",
      "🛰️",
      "🗺️",
      "🎁",
      "🕹️",
      "⚖️",
      "🧪",
      "💊",
    ];
    setEmoji(emojiArray[getRandomInt(0, 14)]);
  }, []);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  const clickHidden = () => {
    setNotificaitonHidden(true);
    setBannerStatus(false);
  };

  useEffect(() => {
    if (user?.get("username") === undefined) {
      setUserName("None");
    } else {
      setUserName(user?.get("username"));
    }
  }, [user]);

  // To change countdown time
  // const useReactCountdown = () => {
  //   //COUNTDOWN
  //   const [timerDays, setTimerDays] = useState("00");
  //   const [timerHours, setTimerHours] = useState("00");
  //   const [timerMinutes, setTimerMinutes] = useState("00");
  //   const [timerSeconds, setTimerSeconds] = useState("00");

  //   let interval = useRef();

  //   const startTimer = () => {
  //     // Get countdown date in UTC
  //     const countdownDate = new Date("October 2, 2022 16:00:00 GMT");
  //     // //console.log("This is countdownDate: ", countdownDate);
  //     //Convert to milliseconds
  //     const UTCCount = countdownDate.getTime();
  //     // //console.log("This is UTC Count: ", UTCCount);

  //     interval = setInterval(() => {
  //       const now = Date.now();
  //       // //console.log("This is now: ", now);
  //       // const UTCNow = now.getTime();
  //       // //console.log("This is now UTC: ", UTCNow);
  //       const distance = UTCCount - now;

  //       const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  //       const hours = Math.floor(
  //         (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  //       );
  //       const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  //       const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  //       if (distance < 0) {
  //         // Stop
  //         clearInterval(interval.current);
  //       } else {
  //         // Update
  //         setTimerDays(days);
  //         setTimerHours(hours);
  //         setTimerMinutes(minutes);
  //         setTimerSeconds(seconds);
  //       }
  //     }, 1000);
  //   };

  //   useEffect(() => {
  //     startTimer();
  //     return () => {
  //       clearInterval(interval.current);
  //     };
  //   });

  //   // Logic
  //   return {
  //     days: timerDays,
  //     hours: timerHours,
  //     minutes: timerMinutes,
  //     seconds: timerSeconds,
  //   };
  // };

  // Countdown Timer
  const [days, setDays] = useState("00");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  // Needs to be converted to UTC, using local

  // Changes URL if IPFS Link
  const useIPFS = () => {
    const resolveLink = (url) => {
      if (!url || !url.includes("ipfs://")) return url;
      return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
    };

    return { resolveLink };
  };

  const { resolveLink } = useIPFS();

  // Listens for boxDisplay changes
  useEffect(() => {
    if (boxDisplay === null) {
      return;
    }
    //Duration of Founder Pass video
    if (boxDisplay === "Founder") {
      setTimeout(function () {
        // shows alert about what race they opened
        setBoxReveal(true);
      }, 23000);
    }
  }, [boxDisplay]);

  useEffect(() => {
    if (transition === true) {
      //push back to homepage
      return navigate("/MinterBox");
    } else {
      return;
    }
  }, [transition]);

  useEffect(() => {
    if (!isWeb3Enabled) {
      enableWeb3();
    }
  }, [isWeb3Enabled]);

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     authenticate({
  //       signingMessage: "🧬 Access Kondux Gateway 🧬",
  //     });
  //   }
  //   // } else {
  //   //   getNFTs();
  //   // }
  // }, [isAuthenticated]);

  const price = 0.65;

  const settings = {
    // count is in seconds (set for 3 Days right now)
    count: 259200,
    showTitle: true,
    labelSize: 14,
    backgroundColor: "transparent",
    color: "#fff",
    dayTitle: "",
    hourTitle: "",
    minuteTitle: "",
    secondTitle: "",
    id: "countdownwrap",
    zIndex: 5,
  };

  // Contract Call Function
  // OG Contract Call Function to Disclosure Box mint OG
  async function mintFounderFree() {
    // Need to make Axios call to AWS for WL Address - WL Buyer
    setInProcess(true);

    const res = await axios
      .get(
        "https://h7af1y611a.execute-api.us-east-1.amazonaws.com/" +
          walletAddress +
          "/proofFreeFounders"
      )
      .then(async (res) => {
        //console.log("This is res: ", res);

        const data = res.data;
        const proof = data.response;

        // Whitelist function from contract ABI
        const sendWLOptions = {
          contractAddress: contractAddress,
          functionName: "whitelistMintFreeFounders",
          abi: contractABI,
          // msgValue: Moralis.Units.ETH("0.2"),
          to: contractAddress,
          params: { _merkleProof: proof },
        };

        const whitelistMint = await Moralis.executeFunction(sendWLOptions);

        //console.log("This is transaction hash ", whitelistMint);

        // --> "0x39af55979f5b690fdce14eb23f91dfb0357cb1a27f387656e197636e597b5b7c"

        // Show message for confirmation
        setConfirmMessage(true);

        // Wait until the transaction is confirmed, return receipt
        const wlreceipt = await whitelistMint.wait();
        //console.log("This is wlreceipt ", wlreceipt);

        if (
          // Check to see if the contract returns
          wlreceipt.logs[0].topics[0] ===
          "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
        ) {
          // Convert to integer
          const tokenIdentifier = ethers.BigNumber.from(
            wlreceipt.logs[0].topics[3]
          ).toString();

          setIDNumber(tokenIdentifier);

          //console.log("This is token Identifier", tokenIdentifier);

          if (tokenIdentifier >= 0) {
            // Show success alert
            setMintStatus(true);

            //Logic for Box Display
            setBoxDisplay("Founder");
            // //console.log("This is randomRace", randomRace);

            // Show Kondux box
          } else {
            // Show error message
            setMintStatus(false);
            return;
          }
        }
      })
      .catch(async (err) => {
        // Show message for confirmation

        if (err.message.includes("User denied transaction")) {
          setMintStatus(null);
          setInProcess(false);
          //console.log(err.message);
        } else {
          setMintStatus(null);
          setInProcess(false);
          //console.log("Starting 020 OG MINT");
          await mint020OG();
          //console.log(err.message);
        }
      });
  }

  // Contract Call Function
  // OG Contract Call Function to Disclosure Box mint OG
  async function mint020OG() {
    // Need to make Axios call to AWS for WL Address - WL Buyer
    setInProcess(true);

    const res = await axios
      .get(
        "https://h7af1y611a.execute-api.us-east-1.amazonaws.com/" +
          walletAddress +
          "/proof020"
      )
      .then(async (res) => {
        //console.log("This is res: ", res);

        const data = res.data;
        const proof = data.response;

        // Whitelist function from contract ABI
        const sendWLOptions = {
          contractAddress: contractAddress,
          functionName: "whitelistMintFounders020",
          abi: contractABI,
          msgValue: Moralis.Units.ETH("0.2"),
          to: contractAddress,
          params: { _merkleProof: proof },
        };

        const whitelistMint = await Moralis.executeFunction(sendWLOptions);

        //console.log("This is transaction hash ", whitelistMint);

        // --> "0x39af55979f5b690fdce14eb23f91dfb0357cb1a27f387656e197636e597b5b7c"

        // Show message for confirmation
        setConfirmMessage(true);

        // Wait until the transaction is confirmed, return receipt
        const wlreceipt = await whitelistMint.wait();
        //console.log("This is wlreceipt ", wlreceipt);

        if (
          // Check to see if the contract returns
          wlreceipt.logs[1].topics[0] ===
          "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
        ) {
          // Convert to integer
          const tokenIdentifier = ethers.BigNumber.from(
            wlreceipt.logs[1].topics[3]
          ).toString();

          setIDNumber(tokenIdentifier);

          //console.log("This is token Identifier", tokenIdentifier);

          if (tokenIdentifier >= 0) {
            // Show success alert
            setMintStatus(true);

            //Logic for Box Display
            setBoxDisplay("Founder");
            // //console.log("This is randomRace", randomRace);

            // Show Kondux box
          } else {
            // Show error message
            setMintStatus(false);
            return;
          }
        }
      })
      .catch(async (err) => {
        // Show message for confirmation

        if (err.message.includes("User denied transaction")) {
          setMintStatus(null);
          setInProcess(false);
          //console.log(err.message);
        } else if (err.message.includes("insufficient funds")) {
          setMintStatus(null);
          setInProcess(false);
          setNeedFunds(true);
          //console.log("Need Funds.");
          //console.log(err.message);
        } else {
          setMintStatus(null);
          setInProcess(false);
          //console.log("Start 025 WL MINT");
          await mint025Public();
          // setOGStatus(true);
          //console.log(err.message);
        }
      });
  }

  // Contract Call Function
  // OG Contract Call Function to Disclosure Box mint OG
  // async function mint025WL() {
  //   // Need to make Axios call to AWS for WL Address - WL Buyer
  //   setInProcess(true);

  //   const res = await axios
  //     .get(
  //       "https://h7af1y611a.execute-api.us-east-1.amazonaws.com/" +
  //         walletAddress +
  //         "/proof025"
  //     )
  //     .then(async (res) => {
  //       //console.log("This is res: ", res);

  //       const data = res.data;
  //       const proof = data.response;

  //       // Whitelist function from contract ABI
  //       const sendWLOptions = {
  //         contractAddress: contractAddress,
  //         functionName: "whitelistMintFounders025",
  //         abi: contractABI,
  //         msgValue: Moralis.Units.ETH("0.25"),
  //         to: contractAddress,
  //         params: { _merkleProof: proof },
  //       };

  //       const whitelistMint = await Moralis.executeFunction(sendWLOptions);

  //       //console.log("This is transaction hash ", whitelistMint);

  //       // --> "0x39af55979f5b690fdce14eb23f91dfb0357cb1a27f387656e197636e597b5b7c"

  //       // Show message for confirmation
  //       setConfirmMessage(true);

  //       // Wait until the transaction is confirmed, return receipt
  //       const wlreceipt = await whitelistMint.wait();
  //       //console.log("This is wlreceipt ", wlreceipt);

  //       if (
  //         // Check to see if the contract returns
  //         wlreceipt.logs[1].topics[0] ===
  //         "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
  //       ) {
  //         // Convert to integer
  //         const tokenIdentifier = ethers.BigNumber.from(
  //           wlreceipt.logs[1].topics[3]
  //         ).toString();

  //         setIDNumber(tokenIdentifier);

  //         //console.log("This is token Identifier", tokenIdentifier);

  //         if (tokenIdentifier >= 0) {
  //           // Show success alert
  //           setMintStatus(true);

  //           //Logic for Box Display
  //           setBoxDisplay("Founder");
  //           // //console.log("This is randomRace", randomRace);

  //           // Show Kondux box
  //         } else {
  //           // Show error message
  //           setMintStatus(false);
  //           return;
  //         }
  //       }
  //     })
  //     .catch(async (err) => {
  //       // Show message for confirmation

  //       if (err.message.includes("User denied transaction")) {
  //         setMintStatus(null);
  //         setInProcess(false);
  //         //console.log(err.message);
  //       } else if (err.message.includes("insufficient funds")) {
  //         setMintStatus(null);
  //         setInProcess(false);
  //         setNeedFunds(true);
  //         //console.log("Need Funds.");
  //         //console.log(err.message);
  //       } else {
  //         setMintStatus(null);
  //         setInProcess(false);
  //         //console.log("Can not MINT");
  //         await mint025Public();
  //         // await mint040Public();
  //         //console.log(err.message);
  //       }
  //     });
  // }

  // Contract Call Function
  // OG Contract Call Function to Disclosure Box mint OG
  async function mint025Public() {
    // Need to make Axios call to AWS for WL Address - WL Buyer
    setInProcess(true);

    try {
      // console.log("This is public mint");

      // Whitelist function from contract ABI
      const sendWLOptions = {
        contractAddress: contractAddress2,
        functionName: "publicMint",
        abi: contractABI2,
        msgValue: Moralis.Units.ETH("0.25"),
        to: contractAddress2,
      };

      const whitelistMint = await Moralis.executeFunction(sendWLOptions);

      // console.log("This is transaction hash ", whitelistMint);

      // --> "0x39af55979f5b690fdce14eb23f91dfb0357cb1a27f387656e197636e597b5b7c"

      // Show message for confirmation
      setConfirmMessage(true);

      // Wait until the transaction is confirmed, return receipt
      const wlreceipt = await whitelistMint.wait();
      // console.log("This is wlreceipt ", wlreceipt);

      if (
        // Check to see if the contract returns
        wlreceipt.logs[1].topics[0] ===
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
      ) {
        // Convert to integer
        const tokenIdentifier = ethers.BigNumber.from(
          wlreceipt.logs[1].topics[3]
        ).toString();

        setIDNumber(tokenIdentifier);

        //console.log("This is token Identifier", tokenIdentifier);

        if (tokenIdentifier >= 0) {
          // Show success alert
          setMintStatus(true);

          //Logic for Box Display
          setBoxDisplay("Founder");
          // //console.log("This is randomRace", randomRace);

          // Show Kondux box
        } else {
          // Show error message
          setMintStatus(false);
          return;
        }
      }
    } catch (err) {
      // Show message for confirmation

      if (err.message.includes("User denied transaction")) {
        setMintStatus(null);
        setInProcess(false);
        //console.log(err.message);
      } else if (err.message.includes("insufficient funds")) {
        setMintStatus(null);
        setInProcess(false);
        setNeedFunds(true);
        //console.log("Need Funds.");
        //console.log(err.message);
      } else {
        setMintStatus(null);
        setInProcess(false);
        //console.log("Can not MINT");
        // setNoStatus(true);
        //console.log(err.message);
      }
    }
  }

  const mintAll = async () => {
    if (noStatus === false) {
      await mintFounderFree();
    } else {
      return;
    }

    // //console.log("WL MINT done");
  };

  // Button press that runs mint call
  const showCanvas = () => {
    if (!isWeb3Enabled) {
      enableWeb3();
    }
    if (!isAuthenticated) {
      authenticate({
        signingMessage: "🧬 Access Kondux Gateway 🧬",
      });
    } else {
      mintAll();
    }
  };

  // Test Button press that runs Box call
  const showBox = () => {
    if (!isWeb3Enabled) {
      enableWeb3();
    }
    if (!isAuthenticated) {
      authenticate({
        signingMessage: "🧬 Access Kondux Gateway 🧬",
      });
    } else {
      const raceArr = ["Grey", "CyGrey", "Reptilian", "Annunaki", "Pleiadian"];

      const randomPick = raceArr[Math.floor(Math.random() * raceArr.length)];

      //Logic for Box Display
      setBoxDisplay(randomPick);
      setHidden(true);
    }
  };

  // Gives access to box
  const boxProceed = () => {
    setHidden(true);
  };

  // Close Button that resets everything
  const closeAll = () => {
    // setInProcess(false);
    // setConfirmMessage(false);
    setCloseStatus(true);
    setMintStatus(null);
  };

  // Close Button for Mint
  const closeMint = () => {
    setBoxReveal(false);
    setTransition(true);
  };

  // Close Funds Button for Mint
  const closeFunds = () => {
    setCloseFundsStatus(true);
    setNeedFunds(false);
  };

  const NotificationIcon = createIcon({
    displayName: "Notification",
    viewBox: "0 0 128 128",
    path: (
      <g id="Notification">
        <rect
          className="cls-1"
          x="1"
          y="45"
          fill={"#fbcc88"}
          width="108"
          height="82"
        />
        <circle className="cls-2" fill={"#8cdd79"} cx="105" cy="86" r="22" />
        <rect
          className="cls-3"
          fill={"#f6b756"}
          x="1"
          y="122"
          width="108"
          height="5"
        />
        <path
          className="cls-4"
          fill={"#7ece67"}
          d="M105,108A22,22,0,0,1,83.09,84a22,22,0,0,0,43.82,0A22,22,0,0,1,105,108Z"
        />
        <path
          fill={"#f6b756"}
          className="cls-3"
          d="M109,107.63v4A22,22,0,0,1,83.09,88,22,22,0,0,0,109,107.63Z"
        />
        <path
          className="cls-5"
          fill={"#d6ac90"}
          d="M93,30l16,15L65.91,84.9a16,16,0,0,1-21.82,0L1,45,17,30Z"
        />
        <path
          className="cls-6"
          fill={"#cba07a"}
          d="M109,45,65.91,84.9a16,16,0,0,1-21.82,0L1,45l2.68-2.52c43.4,40.19,41.54,39.08,45.46,40.6A16,16,0,0,0,65.91,79.9l40.41-37.42Z"
        />
        <path
          className="cls-7"
          fill={"#dde1e8"}
          d="M93,1V59.82L65.91,84.9a16,16,0,0,1-16.77,3.18C45.42,86.64,47,87.6,17,59.82V1Z"
        />
        <path
          className="cls-8"
          fill={"#c7cdd8"}
          d="M74,56c-3.56-5.94-3-10.65-3-17.55a16.43,16.43,0,0,0-12.34-16,5,5,0,1,0-7.32,0A16,16,0,0,0,39,38c0,7.13.59,12-3,18a3,3,0,0,0,0,6H50.41a5,5,0,1,0,9.18,0H74a3,3,0,0,0,0-6ZM53.2,21.37a3,3,0,1,1,3.6,0,1,1,0,0,0-.42.7,11.48,11.48,0,0,0-2.77,0A1,1,0,0,0,53.2,21.37Z"
        />
        <path
          className="cls-3"
          fill={"#f6b756"}
          d="M46.09,86.73,3,127H1v-1c6-5.62-1.26,1.17,43.7-40.78A1,1,0,0,1,46.09,86.73Z"
        />
        <path
          className="cls-3"
          fill={"#f6b756"}
          d="M109,126v1h-2L63.91,86.73a1,1,0,0,1,1.39-1.49C111,127.85,103.11,120.51,109,126Z"
        />
        <path
          className="cls-8"
          fill={"#c7cdd8"}
          d="M93,54.81v5L65.91,84.9a16,16,0,0,1-16.77,3.18C45.42,86.64,47,87.6,17,59.82v-5L44.09,79.9a16,16,0,0,0,21.82,0Z"
        />
        <path
          className="cls-9"
          fill={"#fff"}
          d="M101,95c-.59,0-.08.34-8.72-8.3a1,1,0,0,1,1.44-1.44L101,92.56l15.28-15.28a1,1,0,0,1,1.44,1.44C100.21,96.23,101.6,95,101,95Z"
        />
        <path
          className="cls-3"
          fill={"#f6b756"}
          d="M56.8,18.38a3,3,0,1,0-3.6,0A1,1,0,0,1,52,20,5,5,0,1,1,58,20,1,1,0,0,1,56.8,18.38Z"
        />
        <path
          className="cls-1"
          fill={"#fbcc88"}
          d="M71,42.17V35.45c0-8.61-6.62-16-15.23-16.43A16,16,0,0,0,39,35c0,7.33.58,12-3,18H74A21.06,21.06,0,0,1,71,42.17Z"
        />
        <path
          className="cls-3"
          fill={"#f6b756"}
          d="M74,53H36a21.36,21.36,0,0,0,1.86-4H72.14A21.36,21.36,0,0,0,74,53Z"
        />
        <path
          className="cls-3"
          fill={"#f6b756"}
          d="M59.59,59a5,5,0,1,1-9.18,0"
        />
        <path
          className="cls-1"
          fill={"#fbcc88"}
          d="M74,59H36a3,3,0,0,1,0-6H74a3,3,0,0,1,0,6Z"
        />
      </g>
    ),
  });

  return (
    <>
      <Scrollbars>
        <Flex direction="column">
          {/* NOTIFICATION */}
          {isHidden === true ? (
            <div style={{ marginTop: "69px" }}></div>
          ) : (
            <Box
              style={{ zIndex: 11 }}
              as="section"
              // pb={{ base: "12", md: "24" }}
              // pt={{ base: "12", md: "20" }}
            >
              <Box
                bg="bg-accent"
                color="on-accent"
                position="relative"
                style={{ zIndex: 11 }}
                pt={{ base: "5", md: "5" }}
              >
                <BrowserView>
                  <Container py={{ base: "4", md: "8" }} style={{ zIndex: 11 }}>
                    <Stack
                      direction={{ base: "row", md: "row" }}
                      justify="center"
                      spacing={{ base: "1", md: "1" }}
                      pe={{ base: "4", sm: "0" }}
                      style={{ zIndex: 11 }}
                    >
                      {!isAuthenticated ? (
                        <>
                          <Text fontWeight="medium" style={{ zIndex: 11 }}>
                            Please connect wallet 👋
                          </Text>
                        </>
                      ) : (
                        <>
                          <Text fontWeight="medium" style={{ zIndex: 11 }}>
                            Greetings! 👋
                          </Text>
                          <Text color="on-accent-muted" style={{ zIndex: 11 }}>
                            {userName}
                          </Text>
                          <Text fontWeight="medium" style={{ zIndex: 11 }}>
                            {emoji}
                          </Text>
                        </>
                      )}
                    </Stack>
                    <CloseButton
                      position="absolute"
                      right="100"
                      top="2.5"
                      onClick={clickHidden}
                      pt={{ base: "9", md: "8" }}
                    />
                  </Container>
                </BrowserView>
              </Box>
            </Box>
          )}

          <BannerStyleWrapper>
            <div>
              {hidden === false ? (
                <>
                  <BrowserView>
                    <div>
                      <video
                        className="myvideo"
                        src={BGVid}
                        autoPlay
                        loop
                        muted
                      />
                    </div>
                  </BrowserView>

                  {inProcess === false ? (
                    // Not In Process of Minting
                    <>
                      <Flex
                        style={{ height: "60vh" }}
                        alignItems="center"
                        justifyContents="center"
                      >
                        <Container>
                          {/* <div className="col-lg-6">
                        <div className="banner-image-area3">
                         
                          <Particle />
                          <img
                            className="banner-image banner-image1"
                            src={bannerThumb1}
                            alt="bithu banner thumb"
                          />
                          <img
                            className="banner-image banner-image2"
                            src={bannerThumb2}
                            alt="bithu banner thumb"
                          />
                          <img
                            className="banner-image banner-image3"
                            src={bannerThumb3}
                            alt="bithu banner thumb"
                          />
                        </div>
                      </div> */}

                          {/* <VStack>
                          <Image
                            width="50%"
                            // boxSize="150px"
                            // objectFit="cover"
                            zIndex="5"
                            src={`${Nvidia}`}
                            m={50}
                          />
                        </VStack> */}

                          <div className="col-lg-6">
                            <div className="banner-conent3">
                              {/* <h4 className="banner-subtitle text-uppercase">
                                        Whitelist :{" "}
                                        <span className="red-color">
                                            Soldout
                                        </span>
                                    </h4> */}

                              <BrowserView>
                                <h1
                                  className="banner-title text-uppercase"
                                  style={{
                                    zIndex: 8,
                                    fontSize: "75px",
                                    textAlign: "center",
                                    marginBottom: "0px",
                                  }}
                                >
                                  <Text
                                    bgGradient="linear(to-l, #7928CA, #FF0080)"
                                    bgClip="text"
                                    fontSize="75px"
                                    fontWeight="extrabold"
                                    style={{
                                      // zIndex: 8,
                                      // fontSize: "75px",
                                      // textAlign: "center"
                                      padding: "400px 0px 0px 0px",
                                    }}
                                  >
                                    FOUNDERS
                                    <br></br>
                                    PASS MINT
                                  </Text>
                                  {/* <Marquee
                                    className="movingText"
                                    style={styles.movingtext}
                                    direction={"right"}
                                    speed={500}
                                    gradient={false}
                                  >
                                    <h1 style={{ color: "#5f9ea0" }}>
                                      WHITELIST{" "}
                                    </h1>
                                  </Marquee> */}
                                  <br></br>{" "}
                                  {/* <Marquee
                                    style={styles.movingtext2}
                                    speed={500}
                                    gradient={false}
                                  >
                                    <h1 style={{ color: "#DD6B02" }}>MINT </h1>
                                  </Marquee>{" "} */}
                                </h1>
                              </BrowserView>

                              <MobileView>
                                <Flex
                                  pt={"200px"}
                                  pb={"50px"}
                                  justifyContent="center"
                                >
                                  <Text
                                    bgGradient="linear(to-l, #7928CA, #FF0080)"
                                    bgClip="text"
                                    fontSize="35px"
                                    fontWeight="extrabold"
                                    style={{
                                      // zIndex: 8,
                                      // fontSize: "75px",
                                      // textAlign: "center"
                                      padding: "300px 0px 0px 0px",
                                    }}
                                  >
                                    FOUNDERS
                                    <br></br>
                                    PASS MINT
                                  </Text>
                                </Flex>
                              </MobileView>

                              <Flex justifyContent="center">
                                <div
                                  className="mint_timer"
                                  style={{ zIndex: 9999 }}
                                >
                                  <div
                                    className="timer timer_1"
                                    style={{ zIndex: 9999 }}
                                  >
                                    {/* <CountdownTimer
                                  style={{ zIndex: 9999 }}
                                  {...settings}
                                /> */}

                                    <div style={{ zIndex: 9999 }}>
                                      <Flex justifyContent="center">
                                        <Text
                                          fontSize="md"
                                          className="text-uppercase"
                                          color={mode("white", "#5f9ea0")}
                                          style={{
                                            zIndex: 9999,
                                            // color: "#5f9ea0",
                                            // textShadow: "#FF00FF 1px 0 50px",
                                          }}
                                        >
                                          MINT START:
                                        </Text>
                                      </Flex>

                                      <Flex
                                        style={{ width: "100%" }}
                                        justifyContent="space-around"
                                        gap={3}
                                      >
                                        <Flex direction="column">
                                          <h2 style={styles.countdown1}>
                                            {days}
                                          </h2>
                                          <Text
                                            className="durationName"
                                            bgClip="text"
                                            fontSize="xl"
                                            fontWeight="extrabold"
                                            style={styles.countdown}
                                            bgGradient="linear(to-l, #7928CA, #FF0080)"
                                          >
                                            DAYS
                                          </Text>
                                        </Flex>

                                        <Flex direction="column">
                                          <h2 style={styles.countdown1}>
                                            {hours}
                                          </h2>
                                          <Text
                                            className="durationName"
                                            bgClip="text"
                                            fontSize="xl"
                                            fontWeight="extrabold"
                                            style={styles.countdown}
                                            bgGradient="linear(to-l, #7928CA, #FF0080)"
                                          >
                                            HOURS
                                          </Text>
                                        </Flex>

                                        <Flex direction="column">
                                          <h2 style={styles.countdown1}>
                                            {minutes}
                                          </h2>
                                          <Text
                                            className="durationName"
                                            bgClip="text"
                                            fontSize="xl"
                                            fontWeight="extrabold"
                                            style={styles.countdown}
                                            bgGradient="linear(to-l, #7928CA, #FF0080)"
                                          >
                                            MINUTES
                                          </Text>
                                        </Flex>

                                        <Flex direction="column">
                                          <h2 style={styles.countdown1}>
                                            {seconds}
                                          </h2>

                                          <Text
                                            className="durationName"
                                            bgClip="text"
                                            fontSize="xl"
                                            fontWeight="extrabold"
                                            style={styles.countdown}
                                            bgGradient="linear(to-l, #7928CA, #FF0080)"
                                          >
                                            SECONDS
                                          </Text>
                                        </Flex>
                                      </Flex>
                                    </div>
                                  </div>
                                </div>
                              </Flex>

                              <Flex
                                justifyContent="center"
                                direction="column"
                                padding="20px 0px"
                              >
                                {/* <h1
                                className="banner-title text-uppercase"
                                style={{
                                  zIndex: 8,
                                  fontSize: "45px",
                                  textAlign: "center",
                                  padding: "0px 0px 10px 0px",
                                }}
                              >
                                SUBSCRIBE
                              </h1>
                              <div
                                className="banner-bottom-text text-uppercase"
                                style={{
                                  textAlign: "center",
                                  fontSize: "24px",
                                }}
                              >
                                Stay up to date!
                              </div> */}
                                <Container
                                  p={10}
                                  style={{
                                    width: "100vw",
                                  }}
                                >
                                  <Flex
                                    justifyContent="center"
                                    style={{
                                      width: "100%",
                                    }}
                                  >
                                    <AliceCarousel
                                      style={{
                                        width: "50%",
                                      }}
                                      autoPlay
                                      autoPlayControls
                                      autoPlayStrategy="none"
                                      autoPlayInterval={10000}
                                      animationDuration={400}
                                      animationType="fadeout"
                                      infinite
                                      touchTracking={false}
                                      disableDotsControls
                                      disableButtonsControls
                                      items={items}
                                    />
                                  </Flex>
                                </Container>

                                <MobileView>
                                  <Flex justifyContent="center">
                                    <Flex pb={10} justifyContent="center">
                                      {/* <div className="banner-btn-area">
                                                    <span
                                                        className="input-number-decrement"
                                                        onClick={() =>
                                                            count > 1
                                                                ? setCount(
                                                                      count -
                                                                          1
                                                                  )
                                                                : count
                                                        }
                                                    >
                                                        –
                                                    </span>
                                                    <input
                                                        className="input-number"
                                                        type="text"
                                                        value={count}
                                                        onChange={(e) =>
                                                            setCount(
                                                                e.target
                                                                    .value
                                                            )
                                                        }
                                                    />
                                                    <span
                                                        className="input-number-increment"
                                                        onClick={() =>
                                                            setCount(
                                                                count + 1
                                                            )
                                                        }
                                                    >
                                                        +
                                                    </span>
                                                </div> */}

                                      <Flex
                                        flexDirection="row"
                                        alignItems="center"
                                        justifyContent="center"
                                      >
                                        <Spacer />
                                        <div>
                                          {/* <EmailSignUp style={{ zIndex: 10 }} /> */}

                                          <>
                                            <ReactiveButton
                                              style={{
                                                marginTop: "35px",
                                                // padding: "20px",
                                                marginBottom: "20px",
                                                fontSize: "30px",
                                                // borderRadius: "10px",
                                                backgroundColor: "#f47900",
                                                height: "80px",
                                              }}
                                              width={"200px"}
                                              color={"secondary"}
                                              className="glow-on-hover"
                                              idleText={
                                                <span>
                                                  <Flex
                                                    direction="column"
                                                    alignItems="center"
                                                  >
                                                    <div>Mint Now</div>
                                                  </Flex>
                                                </span>
                                              }
                                              type={"button"}
                                              // color="primary-alta"
                                              size={"large"}
                                              shadow={true}
                                              // type="primary"
                                              // lg
                                              // variant="mint"
                                              // disabled={isFetching}
                                              onClick={() =>
                                                // //console.log(
                                                //   "THE FUTURE IS LOOKING BRIGHT! KONDUX!"
                                                // )
                                                // setHidden(true)

                                                //Test Box Mint Function
                                                // showBox()

                                                // Uncomment when running production to get WLMint function working
                                                showCanvas()
                                              }
                                            ></ReactiveButton>
                                          </>

                                          <Spacer p={10} />
                                        </div>
                                      </Flex>
                                    </Flex>
                                  </Flex>
                                </MobileView>

                                {noStatus === true && closeStatus === false ? (
                                  <Alert
                                    style={styles.alertWL}
                                    class="alert alert-warning alert-dismissible fade show"
                                    role="alert"
                                    variant="danger"
                                  >
                                    <Flex
                                      padding="50px"
                                      flexDirection="column"
                                      alignItems="center"
                                      justifyContent="center"
                                    >
                                      <Icon
                                        className="Icons"
                                        as={MdOutlineSmsFailed}
                                        style={{
                                          margin: "15px",
                                          color: "#f47900",
                                          width: "75px",
                                          height: "75px",
                                        }}
                                        color="on-accent-subtle"
                                      />
                                      <Alert.Heading
                                        style={{
                                          textAlign: "center",
                                          fontFamily: "Poppins, sans-serif",
                                          fontWeight: "600",
                                        }}
                                      >
                                        Sorry...
                                      </Alert.Heading>
                                      <p
                                        style={{
                                          textAlign: "center",
                                          fontFamily: "Rubiks, sans-serif",
                                          fontWeight: "400",
                                        }}
                                      >
                                        But unfortunately, you cannot mint.{" "}
                                        <br></br> Stay tuned for the next
                                        opportunity.{" "}
                                      </p>
                                    </Flex>
                                    <Button
                                      onClick={() => setCloseStatus(true)}
                                      variant="outline-success"
                                      paddingBottom={5}
                                      style={{ color: color }}
                                    >
                                      Close
                                    </Button>
                                  </Alert>
                                ) : (
                                  <></>
                                )}

                                {needFunds === true &&
                                closeFundsStatus === false ? (
                                  <Alert
                                    style={styles.alertWL}
                                    class="alert alert-warning alert-dismissible fade show"
                                    role="alert"
                                    variant="danger"
                                  >
                                    <Flex
                                      padding="50px"
                                      flexDirection="column"
                                      alignItems="center"
                                      justifyContent="center"
                                    >
                                      <Icon
                                        className="Icons"
                                        as={MdOutlineSmsFailed}
                                        style={{
                                          margin: "15px",
                                          color: "#f47900",
                                          width: "75px",
                                          height: "75px",
                                        }}
                                        color="on-accent-subtle"
                                      />
                                      <Alert.Heading
                                        style={{
                                          textAlign: "center",
                                          fontFamily: "Poppins, sans-serif",
                                          fontWeight: "600",
                                        }}
                                      >
                                        Sorry...
                                      </Alert.Heading>
                                      <p
                                        style={{
                                          textAlign: "center",
                                          fontFamily: "Rubiks, sans-serif",
                                          fontWeight: "400",
                                        }}
                                      >
                                        You need to add more funds in your
                                        wallet to start the transaction.
                                      </p>
                                    </Flex>
                                    <Button
                                      onClick={() => closeFunds()}
                                      variant="outline-success"
                                      paddingBottom={5}
                                      style={{ color: color }}
                                    >
                                      Close
                                    </Button>
                                  </Alert>
                                ) : (
                                  <></>
                                )}

                                <Container>
                                  <Container p={5}>
                                    <div
                                      className="banner-bottom-text-bold text-uppercase"
                                      style={{
                                        textAlign: "center",
                                        fontWeight: "600",
                                      }}
                                    >
                                      OG WL Founders Pass Mint Price <br></br>
                                    </div>

                                    <div
                                      className="banner-bottom-text text-uppercase"
                                      style={{
                                        textAlign: "center",
                                        fontSize: "24px",
                                      }}
                                    >
                                      0.2 ETH + Gas
                                    </div>
                                  </Container>

                                  <Container>
                                    <br></br>
                                    <div
                                      className="banner-bottom-text-bold text-uppercase"
                                      style={{
                                        textAlign: "center",
                                        fontWeight: "600",
                                      }}
                                    >
                                      All Other WL Founders Pass Mint Price{" "}
                                      <br></br>
                                    </div>

                                    <div
                                      className="banner-bottom-text text-uppercase"
                                      style={{
                                        textAlign: "center",
                                        fontSize: "24px",
                                      }}
                                    >
                                      0.25 ETH + Gas
                                    </div>
                                  </Container>

                                  {/* <span className="totalprice">
                                                    TOTAL PRICE:{" "}
                                                    {(
                                                        count * price
                                                    ).toFixed(2)}{" "}
                                                    ETH
                                                </span> */}

                                  <br></br>
                                </Container>

                                <BrowserView>
                                  <Flex pb={10} justifyContent="center">
                                    <Flex
                                      flexDirection="row"
                                      alignItems="center"
                                      justifyContent="center"
                                    >
                                      <Spacer />
                                      <div>
                                        <ReactiveButton
                                          style={{
                                            marginTop: "35px",
                                            // padding: "20px",
                                            marginBottom: "20px",
                                            fontSize: "30px",
                                            // borderRadius: "10px",
                                            backgroundColor: "#f47900",
                                            height: "80px",
                                          }}
                                          width={"200px"}
                                          color={"secondary"}
                                          className="glow-on-hover"
                                          idleText={
                                            <span>
                                              <Flex
                                                direction="column"
                                                alignItems="center"
                                              >
                                                <div>Mint Now</div>
                                              </Flex>
                                            </span>
                                          }
                                          type={"button"}
                                          // color="primary-alta"
                                          size={"large"}
                                          shadow={true}
                                          // type="primary"
                                          // lg
                                          // variant="mint"
                                          // disabled={isFetching}
                                          onClick={
                                            () =>
                                              // setHidden(true)

                                              //Test Box Mint Function
                                              // showBox()

                                              // Uncomment when running production to get WLMint function working
                                              showCanvas()

                                            // //console.log(
                                            //   "THE FUTURE IS LOOKING BRIGHT! KONDUX!"
                                            // )
                                          }
                                        ></ReactiveButton>

                                        <Spacer p={10} />
                                      </div>
                                    </Flex>
                                  </Flex>
                                </BrowserView>
                              </Flex>

                              {/* <div className="banner-bottom-text text-uppercase">
                                                OG Whitelist Mint Price 0.65
                                                Eth + Gas
                                            </div> */}
                            </div>
                          </div>
                        </Container>
                      </Flex>

                      <Container
                        style={{ zIndex: 9999 }}
                        pt={{
                          base: "420px",
                          md: "300px",
                          lg: "300px",
                        }}
                      >
                        <Stack
                          pt={20}
                          pl={20}
                          pr={20}
                          spacing="8"
                          style={{ zIndex: 9999 }}
                        >
                          {/* <Text
                          style={{ zIndex: 9999 }}
                          fontSize={{
                            base: "md",
                            md: "lg",
                          }}
                          fontWeight="medium"
                          color="muted"
                          textAlign="center"
                        >
                         
                        </Text> */}

                          <Box>
                            <Container py={{ base: "4", md: "8" }}>
                              <HStack>
                                <Divider />
                                <Text
                                  fontSize="lg"
                                  fontWeight="medium"
                                  whiteSpace="nowrap"
                                >
                                  Kondux Has Been Featured In:
                                </Text>
                                <Divider />
                              </HStack>
                            </Container>
                          </Box>

                          <SimpleGrid
                            style={{ zIndex: 9999 }}
                            gap={{
                              base: "4",
                              md: "6",
                            }}
                            columns={{
                              base: 1,
                              md: 3,
                            }}
                          >
                            {Object.entries(logos).map(([name, Logo]) => (
                              <Center
                                style={{ opacity: "0.85" }}
                                key={name}
                                bg="bg-surface"
                                bgGradient={[
                                  "linear(to-tr, teal.300, yellow.400)",
                                  "linear(to-t, blue.200, teal.500)",
                                  "linear(to-b, orange.100, purple.300)",
                                ]}
                                py={{
                                  base: "4",
                                  md: "8",
                                }}
                                boxShadow={mode("sm", "sm-dark")}
                                borderRadius="lg"
                              >
                                <Logo
                                  style={{ zIndex: 9999 }}
                                  h={{
                                    base: "8",
                                    md: "10",
                                  }}
                                  maxW="180px"
                                  fill="emphasized"
                                />
                              </Center>
                            ))}
                          </SimpleGrid>
                        </Stack>
                      </Container>

                      <Box style={{ textAlign: "center" }}>
                        <Footer />
                      </Box>
                    </>
                  ) : (
                    <>
                      {/* In Process of Minting */}

                      {confirmMessage === true && mintStatus === null ? (
                        <Alert
                          style={styles.confirm}
                          variant="primary"
                          onClose={() => closeAll()}
                        >
                          <Flex
                            padding="50px"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Icon
                              className="Icons"
                              as={FiClock}
                              style={{
                                margin: "15px",
                                color: "#f47900",
                                width: "75px",
                                height: "75px",
                              }}
                              color="on-accent-subtle"
                            />
                            <Alert.Heading
                              style={{
                                textAlign: "center",
                                fontFamily: "Poppins, sans-serif",
                                fontWeight: "600",
                              }}
                            >
                              Waiting for blockchain verification...
                            </Alert.Heading>
                            <p
                              style={{
                                textAlign: "center",
                                fontFamily: "Rubiks, sans-serif",
                                fontWeight: "400",
                              }}
                            >
                              This may take a minute for the mint to be verified
                              on the blockchain.{" "}
                            </p>
                          </Flex>
                        </Alert>
                      ) : (
                        <></>
                      )}

                      {mintStatus === true ? (
                        <Alert
                          style={styles.confirm}
                          variant="success"
                          onClose={() => boxProceed()}
                          dismissible
                        >
                          <Flex
                            padding="50px"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Icon
                              className="Icons"
                              as={AiOutlineCodeSandbox}
                              style={{
                                margin: "15px",
                                color: "#f47900",
                                width: "75px",
                                height: "75px",
                              }}
                              color="on-accent-subtle"
                            />

                            <Alert.Heading
                              style={{
                                textAlign: "center",
                                fontFamily: "Poppins, sans-serif",
                                fontWeight: "600",
                              }}
                            >
                              Mint verified! <br></br>
                            </Alert.Heading>
                            <p
                              style={{
                                textAlign: "center",
                                fontFamily: "Rubiks, sans-serif",
                                fontWeight: "400",
                              }}
                            >
                              Proceed ahead!
                            </p>
                            <Flex justifyContent="center">
                              <Button
                                onClick={() => boxProceed()}
                                variant="outline-success"
                                style={{ color: color }}
                              >
                                PROCEED
                              </Button>
                            </Flex>
                          </Flex>
                        </Alert>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </>
              ) : (
                <>
                  {hidden === true ? (
                    <>
                      {boxDisplay === "Founder" ? (
                        <>
                          <FounderPass />
                        </>
                      ) : (
                        <></>
                      )}

                      <BrowserView>
                        {/* Alert that shows up after box video is done */}
                        {boxReveal === true ? (
                          <>
                            <Alert
                              style={styles.confirm}
                              variant="success"
                              onClose={() => closeMint()}
                              dismissible
                            >
                              <Flex
                                padding="50px"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Icon
                                  className="Icons"
                                  as={AiOutlineCodeSandbox}
                                  style={{
                                    margin: "15px",
                                    color: "#f47900",
                                    width: "75px",
                                    height: "75px",
                                  }}
                                  color="on-accent-subtle"
                                />

                                <Alert.Heading
                                  style={{
                                    textAlign: "center",
                                    fontFamily: "Poppins, sans-serif",
                                    fontWeight: "600",
                                  }}
                                >
                                  <p
                                    style={{
                                      textAlign: "center",
                                      fontFamily: "Rubiks, sans-serif",
                                      fontWeight: "400",
                                    }}
                                  >
                                    Congratulations!
                                  </p>
                                  You have minted one of the first Kondux
                                  Founders Pass in history!
                                </Alert.Heading>

                                <Flex justifyContent="center">
                                  <a
                                    href="https://kondux.info/disclosure-knft-collection-dynamic-nft/"
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <Button
                                      onClick={() => closeMint()}
                                      variant="outline-success"
                                      style={{ color: color }}
                                    >
                                      LEARN MORE ABOUT YOUR KNFT HERE
                                    </Button>
                                  </a>
                                </Flex>
                              </Flex>
                            </Alert>
                          </>
                        ) : (
                          <></>
                        )}
                      </BrowserView>

                      <MobileView>
                        {/* Alert that shows up after box video is done */}
                        {boxReveal === true ? (
                          <>
                            <Alert
                              style={styles.congrats}
                              variant="success"
                              onClose={() => closeMint()}
                              dismissible
                            >
                              <Flex
                                padding="50px"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Icon
                                  className="Icons"
                                  as={AiOutlineCodeSandbox}
                                  style={{
                                    margin: "15px",
                                    color: "#f47900",
                                    width: "75px",
                                    height: "75px",
                                  }}
                                  color="on-accent-subtle"
                                />

                                <Alert.Heading
                                  style={{
                                    textAlign: "center",
                                    fontFamily: "Poppins, sans-serif",
                                    fontWeight: "600",
                                  }}
                                >
                                  <p
                                    style={{
                                      textAlign: "center",
                                      fontFamily: "Rubiks, sans-serif",
                                      fontWeight: "400",
                                    }}
                                  >
                                    Congratulations!
                                  </p>
                                  You have minted one of the first Kondux
                                  Founders Pass in history!
                                </Alert.Heading>

                                <Flex justifyContent="center">
                                  <a
                                    href="https://kondux.info/disclosure-knft-collection-dynamic-nft/"
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <Button
                                      onClick={() => closeMint()}
                                      variant="outline-success"
                                      style={{ color: color }}
                                    >
                                      LEARN MORE ABOUT YOUR KNFT HERE
                                    </Button>
                                  </a>
                                </Flex>
                              </Flex>
                            </Alert>
                          </>
                        ) : (
                          <></>
                        )}
                      </MobileView>
                      {/* When Close Button is clicked in Alert after video is played, Canvas shows up */}
                      {/* {transition === true ? <></> : <></>} */}
                    </>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>
          </BannerStyleWrapper>
        </Flex>
      </Scrollbars>
    </>
  );
}

export default Minter;
