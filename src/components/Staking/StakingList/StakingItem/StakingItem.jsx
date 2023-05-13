import { useState, useRef, useEffect } from "react";
import {
  Flex,
  Box,
  Stack,
  Container,
  Spacer,
  useColorModeValue,
  useColorMode,
  Icon,
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  ButtonGroup,
  // StackDivider,
  // List,
  // ListItem,
  // ListIcon,
  Button,
  // CloseButton,
  // Square,
  useBreakpointValue,
  IconButton,
  // Alert,
  // AlertIcon,
  // AlertTitle,
  // AlertDescription,
  useDisclosure,
  Link,
  VStack,
  HStack,
  // Avatar,
  Badge,
  // Checkbox,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  // Input,
  // InputGroup,
  // InputLeftElement,
  Tooltip,
  useToast,
  Spinner,
  Center,
  Skeleton,
  SimpleGrid,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import { FiArrowUpRight } from "react-icons/fi";
import { ExternalLinkIcon } from "@chakra-ui/icons";
// import { MdBuild, MdCall } from "react-icons/md";
import moment from "moment";
import axios from "axios";
import { RiShareCircleFill } from "react-icons/ri";
// import Button from "../../../../components/button";
import StakingItemStyleWrapper from "./StakingItem.style";
import backIcon from "../../icons/x.svg";
import { GiCoins } from "react-icons/gi";
import { BiCoin, BiTimeFive, BiHide } from "react-icons/bi";
import { IoRefresh, IoArrowDown } from "react-icons/io5";
import { BsDash } from "react-icons/bs";
import { ImQuestion } from "react-icons/im";
// import ProgressBar from "react-bootstrap/ProgressBar";
// import { ProgressBarComponent } from "react-progress-components";
// import ProgressBar from "react-animated-progress-bar";
import { Progress } from "antd";
// Contracts
import {
  contractABI3,
  contractAddress3,
} from "../../../Contract/StakingContract";

import {
  contractABI4,
  contractAddress4,
} from "../../../Contract/TokenContract";

import { contractABI5, contractAddress5 } from "../../../Contract/KNFTContract";
import { Stat } from "../Stat";
//
import { useMoralis } from "react-moralis";
import { useSpring, animated } from "@react-spring/three";
import { MeshDistortMaterial } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

// import Alert from "react-bootstrap/Alert";

// import { FiClock } from "react-icons/fi";
// import { GiBlacksmith } from "react-icons/gi";
// import { AiOutlineCodeSandbox } from "react-icons/ai";
// import { MdOutlineSmsFailed } from "react-icons/md";
// import { FiInfo } from "react-icons/fi";
// import { BsBoxArrowUpRight } from "react-icons/bs";
import {
  // FiEdit2,
  // FiTrash2,
  FiUnlock,
  FiRefreshCw,
  FiGift,
} from "react-icons/fi";

import Numeral from "react-numeral";

const StakingItem = ({
  title,
  icon,
  apy,
  tvl,
  stake,
  Rewards,
  amountStaked,
  balance,
}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  const [isFlip, setFlip] = useState(false);
  const [unStake, setUnStake] = useState(false);
  // const [withDraw, setWithDraw] = useState(false);
  const [minimumLocked, setMinimumLocked] = useState(0);
  // Is approved status - Will trigger button name change
  const [hasApproval, setHasApproval] = useState(false);
  const [KNDXPrice, setKNDXPrice] = useState(0);

  // All clicked statuses
  const [clickedApprove, setClickedApprove] = useState(false);
  const [refreshClicked, setRefreshClicked] = useState(false);

  const [isNewUser, setIsNewUser] = useState(null);

  const [userKNFTdata, setUserKNFTdata] = useState([]);
  const [userFPdata, setUserFPdata] = useState([]);

  const [userKNFTAmount, setUserKNFTAmount] = useState(0);
  const [userFPAmount, setUserFPAmount] = useState(0);

  const [userKNFTAPR, setUserKNFTAPR] = useState([]);

  const [percentKNFT, setPercentKNFT] = useState(0);
  const [percentFP, setPercentFP] = useState(0);

  const [stakeRewardsClicked, setStakeRewardsClicked] = useState(false);
  const [stakeRewardsIndex, setStakeRewardsIndex] = useState(0);

  const [claimRewardsClicked, setClaimRewardsClicked] = useState(false);
  const [claimRewardsIndex, setClaimRewardsIndex] = useState(0);

  const [unstakeClicked, setUnstakeClicked] = useState(false);
  const [unstakeIndex, setUnstakeIndex] = useState(0);

  const [stakeAmount, setStakeAmount] = useState("0");

  const [rewardsRate, setRewardsRate] = useState(0);

  const inputRef = useRef(0);
  // const [errorMessage, setErrorMessage] = useState("No error");

  // If 1, has approval to use tokens with stakign contract
  const [hasApprove, setHasApprove] = useState(0);

  const [walletBalance, setWalletBalance] = useState(0);

  const [stakeInfo, setStakeInfo] = useState(0);

  // Total tokens staked altogether
  const [totalStakeBalance, setTotalStakeBalance] = useState(0);

  // Total tokens user stakes
  const [totalValueStaked, setTotalValueStaked] = useState(0);

  // Total user rewards clamied
  const [totalRewardsClaimed, setTotalRewardsClaimed] = useState(0);
  //
  // const [totalUserStakeValue, setTotalUserStakeValue] = useState(0);
  // const [rewardInfo, setRewardInfo] = useState(0);
  const [durationChoice, setDurationChoice] = useState(null);

  const userDateValue = Math.round(Date.now() / 1000);
  // console.log("This is user date", userDateValue);

  // New stake has occured status
  // const [newStakeStatus, setNewStakeStatus] = useState(0);
  // const [userStakesInfo, setUserStakesInfo] = useState();

  // All the unique IDs of a user
  const [allUniqueStakes, setAllUniqueStakes] = useState([]);
  // All in depth info of user's stakes

  // This is ALL stakes info
  const [stakesInfo, setStakesInfo] = useState([]);

  // This is all the active stakes info
  // const [activeArray, setActiveArray] = useState([]);
  // const [activeArrayInfo, setActiveArrayInfo] = useState([]);

  // This is all the inactive stakes info
  // const [inactiveArray, setInactiveArray] = useState([]);
  // const [inactiveArrayInfo, setInactiveArrayInfo] = useState([]);

  // Amount of instanced staked
  const [totalInstancesStaked, setTotalInstancesStaked] = useState(0);

  const [color, setColor] = useState("#F37701");
  const [successStake, setSuccessStake] = useState(null);
  const [speedValue, setSpeedValue] = useState(2.25);
  const [distortValue, setDistortValue] = useState(0.5);
  const [blobColor, setBlobColor] = useState();

  // Status for alerts
  // const [stakeStatus, setStakeStatus] = useState(null);
  //This when waiting for verification of hash
  // const [inProcess, setInProcess] = useState(false);
  // When user needs funds
  const [refreshTable, setRefreshTable] = useState(false);

  const stats = [
    {
      label: "Total KNFT",
      value: userKNFTAmount,
      link: "https://opensea.io/collection/knft-incubator",
      delta: {
        value: percentKNFT,
        isUpwardsTrend: true,
      },
    },
    {
      label: "Total Founder Pass",
      value: userFPAmount,
      link: "https://opensea.io/collection/kondux-founders-nft",
      delta: {
        value: percentFP,
        isUpwardsTrend: true,
      },
    },
    // {
    //   label: 'Avg. Click Rate',
    //   value: '12.87%',
    //   delta: {
    //     value: '0.1%',
    //     isUpwardsTrend: false,
    //   },
    // },
  ];

  const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial);

  useEffect(() => {
    // console.log(successStake);

    if (colorMode === "light" && successStake === true) {
      // purple
      setSpeedValue(5.5);
      setDistortValue(0.9);
      setBlobColor("#32CD32");
      // console.log(blobColor);
    } else if (colorMode === "light" && successStake === false) {
      // purple
      setSpeedValue(2.25);
      setDistortValue(0.5);
      setBlobColor("red");
    } else if (colorMode === "light" && successStake === null) {
      // purple
      setSpeedValue(2.25);
      setDistortValue(0.5);
      setBlobColor("#A922C2");
    } else if (colorMode === "dark" && successStake === true) {
      setSpeedValue(5.5);
      setDistortValue(0.9);
      // orange
      setBlobColor("#32CD32");
    } else if (colorMode === "dark" && successStake === false) {
      setSpeedValue(5.5);
      setDistortValue(0.9);
      // orange
      setBlobColor("red");
    } else {
      // orange
      setSpeedValue(2.25);
      setDistortValue(0.5);
      setBlobColor("#F37705");
    }
  }, [successStake, colorMode]);

  const {
    isWeb3Enabled,
    enableWeb3,
    isAuthenticated,
    authenticate,
    Moralis,
    user,
    chainId,
    logout,
  } = useMoralis();
  // const [transHash, setTransHash] = useState("");
  // const [transHashLink, setTransHashLink] = useState("");

  // Call to get stakes info from Moralis on user connects
  useEffect(() => {
    if (user === null) {
      return;
    } else {
      const getStakes = async () => {
        await getKNFTData(); // Need to get these datas first for isNewUser to work correctly
        await getFPData();
        const getStakes = await getDepositIDs();
        // console.log("Got statesInfo");

        isNewStaker(); // this triggers if isNewUser(true || false)
        getTotalStake();
      };

      // refreshClickedFuncMount();
      getStakes(); // run it
    }

    return () => {
      // this now gets called when the component unmounts
    };
  }, [user]);

  // Calculates APR KNFT
  useEffect(() => {
    if (user === null) {
      return;
    } else {
      if (typeof userKNFTdata !== undefined && userKNFTdata !== null) {
        if (userKNFTdata.length >= 1) {
          // Turn this on once Marco replies
          // console.log("User KNFT data changed");
          getTop5KNFTBoost();
        } else {
          return;
        }
      }
    }
  }, [userKNFTdata]);

  // Calculates percent FP
  useEffect(() => {
    if (user === null) {
      return;
    } else {
      if (userFPAmount >= 1) {
        setPercentFP(10);
      } else {
        return;
      }
    }
  }, [userFPAmount]);

  const toast = useToast();
  const toastIdRef = useRef();

  // Closes last toast
  function close() {
    toast.closeAll();
  }

  const formatCommas = (number) => {
    if (number === undefined || number === null || number <= 0.009) {
      // console.log("Format 0");
      return "0";
    } else {
      return Number(number).toLocaleString();
    }
  };

  const formatPrice = (number) => {
    if (number === undefined || number === null) {
      // console.log("Format 0");
      return "0";
    } else {
      let finalNumber = formatCommas((Number(number) * KNDXPrice).toFixed(2));
      // console.log(finalNumber);
      return finalNumber;
    }
  };

  const formatPriceRew = (number) => {
    // console.log("This is number", number);
    if (number === undefined || number === null) {
      // console.log("Format 0");
      return "0";
    } else {
      let finalNumber = (Number(number) * KNDXPrice).toFixed(2);
      // console.log("This is finalNumber", finalNumber);
      let finalCommaNumber = formatCommas(finalNumber);
      // console.log("This is finalCommaNumber", finalCommaNumber);
      return finalCommaNumber;
    }
  };

  const formatCommasInput = (number) => {
    if (number === undefined || number === null) {
      // console.log("Format 0");
      return "0";
    } else {
      // console.log("Format commas old", number);

      let newNumber = Number(number).toLocaleString();

      // console.log("Format commas new", newNumber);
      return newNumber;
    }
  };

  const parseCommas = (number) => {
    // console.log(number);
    let newNumber = number.replace(/^\,/, "");
    // console.log(newNumber);
    return newNumber;
  };

  function checkTime(tlEpoch, userDateValue) {
    const timePercent = (100 - (tlEpoch - userDateValue)) / 100;

    if (timePercent >= 0 && timePercent <= 100) {
      return timePercent;
    } else {
      return 0;
    }
  }

  const refreshClickedFunc = async () => {
    setIsFullyLoaded(false);
    setRefreshClicked(true);
    const updatedStakes = await getRefreshStakes();
    // console.log("THIS IS US", updatedStakes);
    // setRefreshTable(!refreshTable);
    //Wait
    setTimeout(() => {
      // console.log("Delayed for 1 second.");
      setRefreshClicked(false);
    }, "7000");
  };

  // This only happens when a user is not new
  const refreshClickedFuncMount = async () => {
    setIsFullyLoaded(false);
    setRefreshClicked(true);
    const updatedStakes = await getRefreshStakes();
    // console.log("THIS IS US", updatedStakes);
    // setRefreshTable(!refreshTable);
    //Wait
    setTimeout(() => {
      // console.log("Delayed for 1 second.");
      setRefreshClicked(false);
    }, "0001");
  };

  // This only happens when user is new
  const refreshClickedFuncMountNewUser = async () => {
    setIsFullyLoaded(false);
    setRefreshClicked(true);
    const updatedStakes = await getRefreshStakesNewUser();
    // console.log("THIS IS US", updatedStakes);
    // setRefreshTable(!refreshTable);
    //Wait
    setTimeout(() => {
      // console.log("Delayed for 1 second.");
      setRefreshClicked(false);
    }, "0001");
  };

  function stakeRewardsClickedFunc(stakeid, index) {
    setStakeRewardsClicked(true);
    setStakeRewardsIndex(index);
    stakeRewards(stakeid);
  }

  function claimRewardsClickedFunc(stakeid, index) {
    setClaimRewardsClicked(true);
    setClaimRewardsIndex(index);
    claimRewards(stakeid);
  }

  function unstakeClickedFunc(stake, stakeid, index) {
    setUnstakeClicked(true);
    setUnstakeIndex(index);
    withdrawTokens(stake, stakeid);
  }

  function unstakeEarlyClickedFunc(stake, stakeid, index) {
    setUnstakeClicked(true);
    setUnstakeIndex(index);
    withdrawTokensEarly(stake, stakeid);
  }

  function spinnerToast() {
    toast({
      isClosable: true,
      position: "bottom",
      duration: 24000,
      render: () => (
        <Box m={3} color="white" p={8} bg="green.500" borderRadius="0.375rem">
          <Center>
            {" "}
            <Spinner />
          </Center>

          <p
            style={{
              textAlign: "center",
              fontFamily: "Rubiks, sans-serif",
              fontWeight: "400",
            }}
          >
            Waiting for blockchain verification...
          </p>
          <p
            style={{
              textAlign: "center",
              fontFamily: "Rubiks, sans-serif",
              fontWeight: "400",
            }}
          >
            This may take a minute for your transaction to be verified on the
            blockchain.{" "}
          </p>
        </Box>
      ),
    });
  }

  function spinnerToastForApproval() {
    toast({
      isClosable: true,
      position: "bottom",
      duration: 24000,
      render: () => (
        <Box m={3} color="white" p={8} bg="green.500" borderRadius="0.375rem">
          <Center>
            {" "}
            <Spinner />
          </Center>
          <p
            style={{
              textAlign: "center",
              fontFamily: "Rubiks, sans-serif",
              fontWeight: "400",
            }}
          >
            Waiting for blockchain verification of token approval...
          </p>
          <p
            style={{
              textAlign: "center",
              fontFamily: "Rubiks, sans-serif",
              fontWeight: "400",
            }}
          >
            This may take a minute for your transaction to be verified on the
            blockchain.{" "}
          </p>
        </Box>
      ),
    });
  }

  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true });

  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  useEffect(() => {
    if (colorMode === "light") {
      setColor("purple");
    } else {
      setColor("#F37701");
    }
  }, [colorMode]);

  // Close Button that resets everything
  // const closeAll = () => {
  //   setInProcess(false);
  //   // setConfirmMessage(false);
  //   setCloseStatus(true);
  //   setStakeStatus(null);
  //   // setVerifiedStatus(false);
  // };

  // Close Button for Mint
  // const closeMint = () => {
  //   setBoxReveal(false);
  //   setTransition(true);
  // };

  // Close Funds Button for Mint
  // const closeFunds = () => {
  //   setCloseFundsStatus(true);
  //   setNeedFunds(false);
  // };

  // Gets KNFT Info from user
  async function getKNFTData() {
    if (user === null) {
      return;
    } else {
      const ethAddress = user.get("ethAddress");
      // console.log("Cached KNFT length", userKNFTdata.length);
      const options = {
        method: "GET",
        url: `https://deep-index.moralis.io/api/v2/${ethAddress}/nft`,
        params: {
          chain: "0xaa36a7",
          format: "decimal",
          normalizeMetadata: true,
          token_addresses: "0x443525E4D78Dc29544CD30F097809d0Abe68DF32",
          mediaItems: false,
          address: ethAddress,
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
          // console.log("This is response data", response.data);

          if (typeof response !== undefined || response !== null) {
            if (response.data.result.length > 0) {
              //cache data to local
              setUserKNFTdata(response.data.result);
              // console.log(userKNFTdata);
              if (
                response.data.result.length !== null ||
                typeof response.data.result.length !== undefined
              ) {
                setUserKNFTAmount(response.data.result.length);
              } else {
                setUserKNFTAmount(0);
                return;
              }

              // console.log("Cached KNFT", userKNFTdata);
            } else {
              // console.log("Did not cached KNFT");
              return;
            }
            // console.log("This is KNFT data", response);
          } else {
            return;
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }

  // Gets FP Info from user
  async function getFPData() {
    if (user === null) {
      return;
    } else {
      const ethAddress = user.get("ethAddress");

      const options = {
        method: "GET",
        url: `https://deep-index.moralis.io/api/v2/${ethAddress}/nft`,
        params: {
          chain: "0xaa36a7",
          format: "decimal",
          normalizeMetadata: true,
          token_addresses: "0x434fD7FEEc752c4BfA4a59d0272c503ffD313499",
          mediaItems: false,
          address: ethAddress,
        },
        headers: {
          accept: "application/json",
          "X-API-Key":
            "QiMu7qQwH6b0wUeilUh9fWUW2EHtaNxcoRqcMA5tasRH0oTbL2GRCKLl2W0Joqd5",
        },
      };
      // console.log("Cached FP length", userFPdata.length);
      await axios
        .request(options)
        .then(function (response) {
          // console.log("This is response data", response.data);
          if (typeof response !== undefined || response !== null) {
            if (response.data.result.length > 0) {
              //cache data to local
              setUserFPdata(response.data.result);
              // console.log("Cached FP", userFPdata);
              if (
                response.data.result.length !== null ||
                typeof response.data.result.length !== undefined
              ) {
                setUserFPAmount(response.data.result.length);
              } else {
                setUserFPAmount(0);
                return;
              }
            } else {
              // console.log("Did not cached FP");
              return;
            }
            // console.log("This is FP data", response);
          } else {
            return;
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }

  // Gets KNFT Info from user
  // async function getKNFTDataAfter() {
  //   if (user === null) {
  //     return;
  //   } else {
  //     const ethAddress = user.get("ethAddress");
  //     // console.log("Cached KNFT length", userKNFTdata.length);
  //     const options = {
  //       method: "GET",
  //       url: `https://deep-index.moralis.io/api/v2/${ethAddress}/nft`,
  //       params: {
  //         chain: "0xaa36a7",
  //         format: "decimal",
  //         normalizeMetadata: true,
  //         token_addresses: "0x443525E4D78Dc29544CD30F097809d0Abe68DF32",
  //         mediaItems: false,
  //         address: ethAddress,
  //       },
  //       headers: {
  //         accept: "application/json",
  //         "X-API-Key":
  //           "QiMu7qQwH6b0wUeilUh9fWUW2EHtaNxcoRqcMA5tasRH0oTbL2GRCKLl2W0Joqd5",
  //       },
  //     };

  //     await axios
  //       .request(options)
  //       .then(function (response) {
  //         // console.log("This is response data", response.data);

  //         if (response !== undefined) {
  //           if (
  //             response.data.result.length > 0 &&
  //             response.data.result.length !== userKNFTdata.length &&
  //             userKNFTdata.length !== undefined
  //           ) {
  //             //cache data to local
  //             setUserKNFTdata(response.data.result);
  //             setUserKNFTAmount(userKNFTdata?.length);
  //             console.log("Cached KNFT", userKNFTdata);
  //           } else {
  //             console.log("Did not cached KNFT");
  //             return;
  //           }
  //           console.log("This is KNFT data", response);
  //         } else {
  //           return;
  //         }
  //       })
  //       .catch(function (error) {
  //         console.error(error);
  //       });
  //   }
  // }

  // Gets FP Info from user
  // async function getFPDataAfter() {
  //   if (user === null) {
  //     return;
  //   } else {
  //     const ethAddress = user.get("ethAddress");

  //     const options = {
  //       method: "GET",
  //       url: `https://deep-index.moralis.io/api/v2/${ethAddress}/nft`,
  //       params: {
  //         chain: "0xaa36a7",
  //         format: "decimal",
  //         normalizeMetadata: true,
  //         token_addresses: "0x434fD7FEEc752c4BfA4a59d0272c503ffD313499",
  //         mediaItems: false,
  //         address: ethAddress,
  //       },
  //       headers: {
  //         accept: "application/json",
  //         "X-API-Key":
  //           "QiMu7qQwH6b0wUeilUh9fWUW2EHtaNxcoRqcMA5tasRH0oTbL2GRCKLl2W0Joqd5",
  //       },
  //     };
  //     // console.log("Cached FP length", userFPdata.length);
  //     await axios
  //       .request(options)
  //       .then(function (response) {
  //         // console.log("This is response data", response.data);
  //         if (response !== undefined) {
  //           if (
  //             response.data.result.length > 0 &&
  //             response.data.result.length !== userFPdata?.length &&
  //             userKNFTdata?.length !== undefined
  //           ) {
  //             //cache data to local
  //             setUserFPdata(response.data.result);
  //             console.log("Cached FP", userFPdata);
  //             setUserFPAmount(userFPdata.length);
  //           } else {
  //             console.log("Did not cached FP");
  //             return;
  //           }
  //           console.log("This is FP data", response);
  //         } else {
  //           return;
  //         }
  //       })
  //       .catch(function (error) {
  //         console.error(error);
  //       });
  //   }
  // }

  // ReadGen from KNFT contract, gets DNA of KNFT and tells boost
  // async function getKNFTBoost(uniqueID) {
  //   if (user === null) {
  //     // console.log("No eth address");
  //     return;
  //   } else {
  //     try {
  //       // const ethAddress = user.get("ethAddress");

  //       // Stake function from contract ABI
  //       const sendOptions = {
  //         chain: chainId,
  //         contractAddress: contractAddress5,
  //         functionName: "readGen",
  //         abi: contractABI5,
  //         to: contractAddress5,
  //         params: {
  //           _tokenID: uniqueID,
  //           startIndex: 1,
  //           endIndex: 2,
  //         },
  //       };

  //       const knftInfo = await Moralis.executeFunction(sendOptions);

  //       // console.log("THIS IS knftInfo", knftInfo);

  //       let boost = parseInt(knftInfo._hex);

  //       userKNFTAPR.push(boost);
  //       // console.log("This is userKNFTAPR", userKNFTAPR);

  //       if (userKNFTAPR.length > 0) {
  //         const totalAPR = userKNFTAPR.reduce((a, b) => a + b);
  //         setPercentKNFT(totalAPR);
  //       }
  //       // Need to push the int to the overall APR array

  //       // setStakesInfo(sortedStakesData);
  //     } catch (err) {}
  //   }
  // }

  async function getTop5KNFTBoost() {
    if (user === null) {
      // console.log("No eth address");
      return;
    } else {
      try {
        // console.log("TOP 5");

        const ethAddress = user.get("ethAddress");

        const sendOptions1 = {
          chain: chainId,
          contractAddress: contractAddress3,
          functionName: "getDepositIds",
          abi: contractABI3,
          to: contractAddress3,
          params: {
            _user: ethAddress,
          },
        };

        const getDepositIDInfo = await Moralis.executeFunction(sendOptions1);

        // console.log("getDepositIDInfo", getDepositIDInfo);

        if (
          getDepositIDInfo.length !== undefined &&
          getDepositIDInfo.length >= 1
        ) {
          const firstStakeId = parseInt(getDepositIDInfo[0]._hex);
          const sendOptions2 = {
            chain: chainId,
            contractAddress: contractAddress3,
            functionName: "getTop5BonusesAndIds",
            abi: contractABI3,
            to: contractAddress3,
            params: {
              _staker: ethAddress,
              _depositId: firstStakeId,
            },
          };

          const knftBoostInfo = await Moralis.executeFunction(sendOptions2);

          // console.log("THIS IS knftBoostInfo", knftBoostInfo);
          let top5BoostArray = knftBoostInfo.top5Bonuses;

          // Array that boost are pushed into
          let finalBoostArray = [];

          for (const element of top5BoostArray) {
            // Parse and divide by 100 since hex number is interval of 100s
            finalBoostArray.push(parseInt(element._hex) / 100);
          }

          // console.log("This is finalBoostArray", finalBoostArray);

          if (finalBoostArray.length > 0) {
            // Add all boosts together
            const totalAPR = finalBoostArray.reduce((a, b) => a + b);
            setPercentKNFT(totalAPR);
          }
        } else {
          return;
        }
      } catch (err) {}
    }
  }

  async function getWalletBalance() {
    if (user === null) {
      return;
    } else {
      const ethAddress = user.get("ethAddress");

      const options = {
        method: "GET",
        url: `https://deep-index.moralis.io/api/v2/${ethAddress}/erc20`,
        params: {
          chain: "0xaa36a7",
          token_addresses: "0x2fa9e338CFe579Ff4575BeD2e1Ea407e811F35bc",
        },
        headers: {
          accept: "application/json",
          "X-API-Key":
            "QiMu7qQwH6b0wUeilUh9fWUW2EHtaNxcoRqcMA5tasRH0oTbL2GRCKLl2W0Joqd5",
        },
      };

      axios
        .request(options)
        .then(function (response) {
          if (
            (typeof response.data !== undefined ||
              response.data !== undefined) &&
            response.data.length > 0
          ) {
            // console.log("This is response data", response);
            const userBalance = response.data[0].balance / 1000000000;
            // console.log(userBalance);
            const roundedBalance = Math.floor(userBalance);
            // console.log(roundedBalance);
            setWalletBalance(roundedBalance);
            // console.log(walletBalance);
          } else {
            setWalletBalance(0);
            return;
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }

  async function getKNDXPrice() {
    if (user === null) {
      return;
    } else {
      const ethAddress = user.get("ethAddress");

      const options = {
        method: "GET",
        url: `https://deep-index.moralis.io/api/v2/erc20/0x7ca5af5ba3472af6049f63c1abc324475d44efc1/price`,
        params: {
          chain: "0x1",
          exchange: "uniswap-v2",
        },
        headers: {
          accept: "application/json",
          "X-API-Key":
            "QiMu7qQwH6b0wUeilUh9fWUW2EHtaNxcoRqcMA5tasRH0oTbL2GRCKLl2W0Joqd5",
        },
      };

      axios
        .request(options)
        .then(function (response) {
          // console.log("This is response data", response);
          const price = response.data.usdPrice;

          setKNDXPrice(price);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }

  // Gets total value for amount of KNDX staked
  async function getTotalStake() {
    if (user === null) {
      try {
        // const ethAddress = user.get("ethAddress");

        //Check allowance
        // console.log("This is totalStaked function");

        const sendOptions = {
          chain: chainId,
          contractAddress: contractAddress3,
          functionName: "getTotalStaked",
          abi: contractABI3,
          to: contractAddress3,
          params: {
            _token: "0x2fa9e338CFe579Ff4575BeD2e1Ea407e811F35bc",
          },
        };

        const totalStaked = await Moralis.executeFunction(sendOptions);

        // console.log("This is totalStaked ", totalStaked);

        const totalStakedParse = parseInt(totalStaked._hex / 1000000000);

        // console.log("This is totalStakedParse", totalStakedParse);

        const roundedAmount = Number(totalStakedParse).toFixed(0);

        setTotalStakeBalance(roundedAmount);
      } catch (err) {
        // Show message for confirmation
      }
    } else {
      try {
        // const ethAddress = user.get("ethAddress");

        //Check allowance
        // console.log("This is totalStaked function");

        const sendOptions = {
          chain: chainId,
          contractAddress: contractAddress3,
          functionName: "getTotalStaked",
          abi: contractABI3,
          to: contractAddress3,
          params: {
            _token: "0x2fa9e338CFe579Ff4575BeD2e1Ea407e811F35bc",
          },
        };

        const totalStaked = await Moralis.executeFunction(sendOptions);

        // console.log("This is totalStaked ", totalStaked);

        const totalStakedParse = parseInt(totalStaked._hex / 1000000000);

        // console.log("This is totalStakedParse", totalStakedParse);

        const roundedAmount = Number(totalStakedParse).toFixed(0);

        setTotalStakeBalance(roundedAmount);
      } catch (err) {
        // Show message for confirmation
      }
    }
  }

  async function getUserTotalStaked() {
    if (user === null) {
      // console.log("No user");
      return;
    } else {
      try {
        const ethAddress = user.get("ethAddress");

        //Check allowance
        // console.log("This is totalStaked function");

        const sendOptions = {
          chain: chainId,
          contractAddress: contractAddress3,
          functionName: "getUserTotalStakedByCoin",
          abi: contractABI3,
          to: contractAddress3,
          params: {
            _user: ethAddress,
            _token: "0x2fa9e338CFe579Ff4575BeD2e1Ea407e811F35bc",
          },
        };

        const totalUserStaked = await Moralis.executeFunction(sendOptions);

        // console.log("This is totalUserStaked", totalUserStaked);

        const totalUserStakedParse = parseInt(
          totalUserStaked._hex / 1000000000
        );

        // console.log("This is totalUserStakedParse", totalUserStakedParse);

        const roundedAmount = Number(totalUserStakedParse).toFixed(0);

        setTotalValueStaked(roundedAmount);
      } catch (err) {
        // Show message for confirmation
      }
    }
  }

  async function getUserTotalRewards() {
    if (user === null) {
      // console.log("No user");
      return;
    } else {
      try {
        const ethAddress = user.get("ethAddress");

        //Check allowance
        // console.log("This is totalStaked function");

        const sendOptions = {
          chain: chainId,
          contractAddress: contractAddress3,
          functionName: "getUserTotalRewardsByCoin",
          abi: contractABI3,
          to: contractAddress3,
          params: {
            _user: ethAddress,
            _token: "0x2fa9e338CFe579Ff4575BeD2e1Ea407e811F35bc",
          },
        };

        const totalUserRewards = await Moralis.executeFunction(sendOptions);

        // console.log("This is totalUserStaked", totalUserStaked);

        const totalUserRewardsParse = parseInt(
          totalUserRewards._hex / 1000000000
        );

        // console.log("This is totalUserStakedParse", totalUserStakedParse);

        const roundedAmount = Number(totalUserRewardsParse).toFixed(0);

        setTotalRewardsClaimed(roundedAmount);
      } catch (err) {
        // Show message for confirmation
      }
    }
  }

  //Allowance - This fucntion is ran in the beginning
  async function approveTokensCheck() {
    if (user === null) {
      // console.log("No user");
      return;
    } else {
      try {
        // console.log("This approve tokens function");

        const ethAddress = user.get("ethAddress");

        //Check allowance
        const sendOptions = {
          chain: chainId,
          contractAddress: contractAddress4,
          functionName: "allowance",
          abi: contractABI4,
          to: contractAddress4,
          params: {
            holder: ethAddress,
            spender: "0xeb6f10e7Df3Ec9EC16e9716bC188cda2cFc9e7c8",
          },
        };

        // Checks wallet if has allowance
        const hasApproveStake = await Moralis.executeFunction(sendOptions);

        let amount = parseInt(hasApproveStake._hex / 1000000000).toString();

        // console.log("This is hasApprove amount", amount);

        // This will make var numeric value for hasApprove
        return Number(amount);

        // console.log("This is transaction approval hex ", hasApproveStake);
        // console.log("This is hasApprove", hasApprove);
      } catch (err) {
        // Show message for confirmation
      }
    }
  }

  //Approve
  async function approveStake() {
    if (user === null) {
      // console.log("No user");
      return;
    } else {
      try {
        // console.log("This approve stake function");

        // const ethAddress = user.get("ethAddress");

        //Needs to approve tokens ---
        const sendOptions = {
          chain: chainId,
          contractAddress: contractAddress4,
          functionName: "approve",
          abi: contractABI4,
          to: contractAddress4,
          params: {
            spender: "0xeb6f10e7Df3Ec9EC16e9716bC188cda2cFc9e7c8",
            amount: "10000000000000000000000000000000000000",
          },
        };

        const approveStake = await Moralis.executeFunction(sendOptions);

        // console.log("This is transaction hash ", approveStake);

        // Set waiting spinner
        spinnerToastForApproval();
        // spinnerToast();

        // Wait until the transaction is confirmed, return receipt

        const approveStake_receipt = await approveStake.wait();
        // console.log("This is approveStake_receipt ", approveStake_receipt);
        // setVerifiedStatus(true);

        let transLink =
          "https://sepolia.etherscan.io/tx/" +
          approveStake_receipt.transactionHash;
        // console.log("This is transhash updated", transLink);

        let approveAmount = parseInt(
          approveStake_receipt.logs[0].data / 1000000000
        );

        // console.log("This is approve amount ", approveAmount);
        setClickedApprove(false);
        close();
        if (approveAmount > 0) {
          close();
          toast({
            isClosable: true,
            position: "bottom",
            render: () => (
              <Box
                m={5}
                color="white"
                p={5}
                bg="green.500"
                borderRadius="0.375rem"
              >
                You approved your tokens!{" "}
                <Link
                  style={{
                    textAlign: "center",
                    fontFamily: "Rubiks, sans-serif",
                    fontWeight: "400",
                  }}
                  href={transLink}
                  isExternal={true}
                >
                  <ExternalLinkIcon mx="5px" />
                </Link>
              </Box>
            ),
          });
          setHasApprove(approveAmount);
          // console.log("has approve", hasApprove);
          stakeTokens(approveAmount);
        } else {
          close();
          toast({
            title: "Something went wrong",
            description: "Please try approval again.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          return;
        }
      } catch (err) {
        close();
        setClickedApprove(false);
        close();
        // Show message for confirmation
        toast({
          title: "Something went wrong with approval.",
          description: "Please try again.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return;
      }
    }
  }

  //StakeTokens Deposit
  async function stakeTokens(approveAmountString) {
    // approveAmount = stake amount
    // hasApprove = approval amount

    const approvalAmount = Number(approveAmountString);

    if (user === null) {
      // console.log("No user");
      return;
    } else {
      setClickedApprove(true);

      // This checks is wallet has approval for tokens
      let approvalAmountNumber = await approveTokensCheck(); // we get back large number

      if (approvalAmountNumber > 0) {
        // User is approved with this amount
        setHasApprove(approvalAmount); //hasApprove
      } else {
        approveStake();
      }

      // console.log("This is hasApprove", hasApprove); //Stake Amount
      // console.log("This is approveAmount", approvalAmountNumber); //Approved amount

      if (stakeAmount > 0) {
        try {
          // If everything is perfecrt

          // console.log("This is stakeAmount", stakeAmount);
          if (
            (approvalAmountNumber > 0 ||
              hasApprove >= approvalAmountNumber ||
              hasApprove > 0) &&
            durationChoice !== null
          ) {
            // When hasApprove === number > 0, approveStake = true
            setHasApproval(true);
            // console.log(durationChoice);

            // Value sent with transaction
            const convertedStakeAmount = (stakeAmount * 1000000000).toString();

            // Value in toast
            const convertedStakeFinal = (stakeAmount * 1).toString();

            const commaAmount = formatCommas(convertedStakeFinal);
            // console.log(
            //   "This is amount:",
            //   approveAmountString,
            //   "This is converted amount:",
            //   convertedStakeAmount,
            //   "This is ETH amount:",
            //   Moralis.Units.ETH(approveAmountString),
            //   "THis is chainId:",
            //   chainId,
            //   "This is Timelock",
            //   durationChoice
            // );

            const sendOptions = {
              chain: chainId,
              contractAddress: contractAddress3,
              functionName: "deposit",
              abi: contractABI3,
              to: contractAddress3,
              params: {
                _amount: convertedStakeAmount,
                _timelock: durationChoice,
                _token: "0x2fa9e338CFe579Ff4575BeD2e1Ea407e811F35bc",
              },
            };

            const stakeToken = await Moralis.executeFunction(sendOptions);

            // console.log("This is transaction hash ", stakeToken);

            // Set waiting spinner
            spinnerToast();

            const stake_receipt = await stakeToken.wait();
            // console.log("This is stake_receipt ", stake_receipt);

            // console.log(
            //   "This is stake_transHash ",
            //   stake_receipt.transactionHash
            // );
            //Get trans hash

            // If trans hash is successful
            // Show message for confirmation

            let transLink =
              "https://sepolia.etherscan.io/tx/" +
              stake_receipt.transactionHash;
            // console.log("This is transhash updated", transLink);

            // this will push new stake to stakeInfo
            const newStakeId = await parseInt(
              stake_receipt.events[2].topics[1]
            );
            const confirmationReciept = await stake_receipt.confirmations;

            // Get all new info for stakes
            if (
              newStakeId > -1 &&
              newStakeId !== null &&
              confirmationReciept > 0
            ) {
              // console.log("I'm in if loop after stake receipt");

              //This consolidates all stakesInfo
              await getDepositInfo(newStakeId);

              // This is updates Moralis with newStake info
              onStakesUpdated();
            } else {
              // console.log("I'm in else loop after stake receipt");
              return;
            }

            //Closes last toast
            close();
            // if statement if verified on hash, show toast else give error

            if (newStakeId > -1) {
              //Animation
              setSuccessStake(true);
              close();

              toast({
                isClosable: true,
                position: "bottom",
                render: () => (
                  <Box
                    m={3}
                    color="white"
                    p={3}
                    bg="green.500"
                    borderRadius="0.375rem"
                  >
                    You have successfully staked {commaAmount} KNDX!
                    <Link
                      style={{
                        textAlign: "center",
                        fontFamily: "Rubiks, sans-serif",
                        fontWeight: "400",
                      }}
                      href={transLink}
                      isExternal={true}
                    >
                      <ExternalLinkIcon mx="5px" />
                    </Link>
                  </Box>
                ),
              });

              // This is updates Moralis with newStake info
              // onStakesUpdated();

              // //Checks Moralis again
              // getStakesFromMoralis();

              // console.log("This is refreshTable end", refreshTable);

              setRefreshTable(!refreshTable);
              setTimeout(() => {
                // console.log("this is the blob message");
                setSuccessStake(null);
              }, 20000);
            } else {
              //Animation
              setSuccessStake(false);
              close();
              toast({
                title: "Something went wrong with verifying stake",
                description: "Please try again.",
                status: "error",
                duration: 9000,
                isClosable: true,
              });

              setTimeout(() => {
                // console.log("this is the blob message");
                setSuccessStake(null);
              }, 20000);
              return;
            }

            setRefreshTable(!refreshTable);
            setClickedApprove(false);
          } else if (
            (approvalAmountNumber > 0 ||
              hasApprove > 0 ||
              hasApprove >= approvalAmountNumber) &&
            durationChoice === null
          ) {
            // console.log("has approval, but no duration choice");
            close();
            toast({
              title: "Need to select a duration",
              description: "Please try again.",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
            setClickedApprove(false);
          }

          //This is when a user approve token value lower than stake amount
          else if (
            approvalAmountNumber > 0 ||
            hasApprove > 0 ||
            approvalAmountNumber < hasApprove
          ) {
            // console.log("has approval, but no duration choice");
            close();
            toast({
              title:
                "Need to approve tokens again. Please increase spending cap value.",
              description: "Please approve again.",
              status: "error",
              duration: 9000,
              isClosable: true,
            });

            approveStake();
            setClickedApprove(false);
          } else {
            //Try to approve
            // ("staketoken goes to approve");
            approveStake();
          }
          // console.log("This stake token function");

          // const ethAddress = user.get("ethAddress");
        } catch (err) {
          setClickedApprove(false);
          close();
          if (err.message.includes("own")) {
            toast({
              title: "Can't stake more than you own",
              description: "Please try again.",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          } else if (approvalAmountNumber < hasApprove) {
            close();
            if (err.message.includes("denied")) {
              toast({
                title: "User denied transaction.",
                description: "Please try again.",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            } else {
              close();
              toast({
                title:
                  "Please increase spending cap value. Need to approve tokens again. ",
                description: "Please approve again.",
                status: "error",
                duration: 9000,
                isClosable: true,
              });

              approveStake();
            }

            setClickedApprove(false);
          } else {
            close();
            return;
          }
        }
      } else {
        setClickedApprove(false);
        toast({
          title: "Amount input needs to be greater than 0",
          description: "Please change and try again.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return;
      }
    }
  }

  // Gets stake amount for a specific depositID
  async function getStakedAmount() {
    if (user === null) {
      // console.log("No eth address");
      return;
    } else {
      try {
        // console.log("This staked Amount function");

        const ethAddress = user.get("ethAddress");

        // Stake function from contract ABI
        const sendOptions = {
          chain: chainId,
          contractAddress: contractAddress3,
          functionName: "getStakedAmount",
          abi: contractABI3,
          to: contractAddress3,
          params: {
            _staker: ethAddress,
          },
        };

        const stakedAmountInfo = await Moralis.executeFunction(sendOptions);

        // console.log("This is transaction hash ", stakedAmountInfo);

        const stakeInfo = Math.floor(stakedAmountInfo / 1000000000).toString();

        // console.log("This is stakeInfo", stakeInfo);
        setStakeInfo(stakeInfo);

        // return;
      } catch (err) {}
    }
  }

  // Gets all DepositIds from user
  async function getDepositIDs() {
    if (user === null) {
      // console.log("No eth address");
      return;
    } else {
      try {
        // console.log("This all staked IDs function");

        const ethAddress = user.get("ethAddress");

        // console.log("THis is chainId:", chainId, "This is staker:", ethAddress);
        // Stake function from contract ABI
        const sendOptions = {
          chain: chainId,
          contractAddress: contractAddress3,
          functionName: "getDepositIds",
          abi: contractABI3,
          to: contractAddress3,
          params: {
            _user: ethAddress,
          },
        };

        const getDepositIDInfo = await Moralis.executeFunction(sendOptions);

        // console.log("This is transaction hash ", getDepositIDInfo);
        // This pushes UniqueStakeIDs to allUniqueStakes

        //Clear AUS
        setAllUniqueStakes([]);

        // When this is done, do the next step
        for (const element of getDepositIDInfo) {
          if (allUniqueStakes.includes(parseInt(element._hex))) {
            return;
            // console.log("This is el", element);
          } else {
            // console.log("This is el push", element);
            allUniqueStakes.push(parseInt(element._hex));
          }
        }
        // console.log("This is statesInfo before AUS pushed", stakesInfo);

        // This clears old data from staksInfo
        await setStakesInfo([]); // This clears local stakesInfo

        // console.log("This is statesInfo after AUS pushed", stakesInfo);

        // get depositInfo()

        for (const element of allUniqueStakes) {
          await getDepositInfo(element);
        }

        // const updatedStakes = await allUniqueStakes.forEach((element) => {
        //   getDepositInfo(element);
        // });

        // console.log("This is all Unique IDs", allUniqueStakes);
        // setTotalInstancesStaked(0);

        // const uniqueStakeIDs = getDepositIDInfo.length;
        // // console.log("This is uniqueStakeIDs", uniqueStakeIDs);
        // setTotalInstancesStaked(uniqueStakeIDs);

        return;
      } catch (err) {}
    }
  }

  // Takes in DepositID and gets Stake Amount, Rewards, and Timelock
  async function getDepositInfo(uniqueStakeID) {
    if (user === null) {
      // console.log("No eth address");
      return;
    } else {
      try {
        // console.log("This deposit info function");

        const ethAddress = user.get("ethAddress");

        // Stake function from contract ABI
        const sendOptions = {
          chain: chainId,
          contractAddress: contractAddress3,
          functionName: "getDepositInfo",
          abi: contractABI3,
          to: contractAddress3,
          params: {
            _depositId: uniqueStakeID,
          },
        };

        const depositInfo = await Moralis.executeFunction(sendOptions);

        // console.log("THIS IS depositInfo", depositInfo);

        ///Change bigNumber to string
        let rew = (
          parseInt(depositInfo._unclaimedRewards._hex) / 1000000000
        ).toString();
        let sta = (parseInt(depositInfo._stake._hex) / 1000000000).toString();

        // Logic for making stakes hidden or active
        let stakeStatus = "active";
        // let hiddenStatus = false;

        // console.log("THIS Is rew", rew);

        if (sta <= 0.99) {
          stakeStatus = "inactive";
          // hiddenStatus = true;
        } else {
          stakeStatus = "active";
          // hiddenStatus = false;
        }

        // If stake amount is greater than 0, we get time lock info and push stakes to stakeInfo

        const sendOptions2 = {
          chain: chainId,
          contractAddress: contractAddress3,
          functionName: "getTimelock",
          abi: contractABI3,
          to: contractAddress3,
          params: {
            _depositId: uniqueStakeID,
          },
        };

        const timeLockInfo = await Moralis.executeFunction(sendOptions2);

        const sendOptions3 = {
          chain: chainId,
          contractAddress: contractAddress3,
          functionName: "getDepositTimestamp",
          abi: contractABI3,
          to: contractAddress3,
          params: {
            _depositId: uniqueStakeID,
          },
        };

        const timeLockStampInfo = await Moralis.executeFunction(sendOptions3);

        // console.log("THIS IS timeLockStampInfo", timeLockStampInfo);

        // End time lock info
        let tle = parseInt(timeLockInfo._hex);
        let et = Number(tle);

        // Start time lock info
        let tls = parseInt(timeLockStampInfo._hex);
        let st = Number(tls);

        let formatTime = moment.unix(et).format("L h:mm A");
        let formattedStartTime = moment.unix(st).format();
        let formattedEndTime = moment.unix(et).format();
        // console.log("THIS IS sta in tl", sta);

        // amount of stakeleft
        // let sl = parseInt(stakeLeftInfo._hex) / 1000000000;
        // var randomNumber = Math.floor(Math.random() * textArray.length);

        // const sendOptions4 = {
        //   chain: chainId,
        //   contractAddress: contractAddress3,
        //   functionName: "calculateKNFTBoostPercentage",
        //   abi: contractABI3,
        //   to: contractAddress3,
        //   params: {
        //     _staker: ethAddress,
        //     _depositId: uniqueStakeID,
        //   },
        // };

        // const boostInfo = await Moralis.executeFunction(sendOptions4);

        // console.log("THIS IS boostInfo", boostInfo);

        // let boostVar = parseInt(boostInfo._hex);

        let obj = {
          stakeid: uniqueStakeID,
          status: stakeStatus,
          stake: Math.floor(sta),
          rewards: rew,
          stakeCompound: Number(Math.floor(sta) + Number(rew)).toFixed(0),
          timelock: formatTime,
          startTime: formattedStartTime,
          endTime: formattedEndTime,
          // boost: boostVar,
          // isHidden: hiddenStatus,
          tlEpoch: et,
        };

        // Check if stakesInfo already contains an object with this stakeid
        let existingStakeIndex = stakesInfo.findIndex(
          (stake) => stake.stakeid === uniqueStakeID
        );

        if (existingStakeIndex !== -1) {
          // If it does, replace that object
          stakesInfo[existingStakeIndex] = obj;
        } else {
          // Otherwise, add the new object to the array
          stakesInfo.push(obj);
        }

        const sortedStakesData = stakesInfo.sort(
          (a, b) => a.stakeid - b.stakeid
        );

        setStakesInfo(sortedStakesData);
      } catch (err) {}
    }
  }

  async function getRewardsAmount() {
    // Need to make Axios call to AWS for WL Address - WL Buyer
    // setInProcess(true);

    if (user === null) {
      // console.log("No eth address");
      return;
    } else {
      try {
        // console.log("This staked Amount function");

        const ethAddress = user.get("ethAddress");

        // Stake function from contract ABI
        const sendOptions = {
          chain: chainId,
          contractAddress: contractAddress3,
          functionName: "calculateRewards",
          abi: contractABI3,
          to: contractAddress3,
          params: {
            _staker: ethAddress,
          },
        };

        const rewardsAmountInfo = await Moralis.executeFunction(sendOptions);

        // console.log("This is transaction hash ", rewardsAmountInfo);

        const rewardsInfo = rewardsAmountInfo.toString();
        // console.log("This is rewardsInfo", rewardsInfo);
        setStakeInfo(rewardsInfo);

        // return;
      } catch (err) {}
    }
  }

  async function getRefreshStakes() {
    // Need to make Axios call to AWS for WL Address - WL Buyer
    // setInProcess(true);

    if (user === null) {
      // console.log("No eth address");
      return;
    } else {
      try {
        getKNDXPrice();
        getWalletBalance();
        getUserTotalStaked();
        getUserTotalRewards();
        getStakedAmount();
        getRewardsAmount();
        // This one generates all stake info

        await getDepositIDs();

        // console.log("THIS IS STAKE INFO", stakesInfo);
        await getKNFTData();
        getTop5KNFTBoost();
        await getFPData();
        onStakesUpdated();
        // !refreshTable, rerenders component
        setIsFullyLoaded(true);
        setRefreshTable(!refreshTable);
        return stakesInfo;
      } catch (err) {}
    }
  }

  async function getRefreshStakesNewUser() {
    // Need to make Axios call to AWS for WL Address - WL Buyer
    // setInProcess(true);

    if (user === null) {
      // console.log("No eth address");
      return;
    } else {
      try {
        getKNDXPrice();
        getWalletBalance();
        getUserTotalStaked();
        getUserTotalRewards();
        getStakedAmount();
        getRewardsAmount();
        // This one generates all stake info
        await getDepositIDs();
        // This one saves on Moralis new data

        // console.log("THIS IS allUniqueStakes", allUniqueStakes);

        // allUniqueStakes.filter(
        //   (item, index) => allUniqueStakes.indexOf(item) === index
        // );

        // console.log("THIS IS new allUniqueStakes", allUniqueStakes);

        // need to get uniqueIds, run depositinfo
        // Get user wallet balance of KNDX and info of amount staked

        // Clear stakesInfo
        // setStakesInfo([]);

        // console.log("THIS IS STAKE INFO", stakesInfo);

        // if (allUniqueStakes.length > 0) {
        //   allUniqueStakes.forEach(async (element) => getDepositInfo(element));
        // } else {
        //   return;
        // }

        // console.log("THIS IS STAKE INFO", stakesInfo);
        await getKNFTData();
        await getFPData();

        // onStakesUpdated();
        // !refreshTable, rerenders component
        setIsFullyLoaded(true);
        setRefreshTable(!refreshTable);
        return stakesInfo;
      } catch (err) {}
    }
  }

  async function getRewardsPerHour() {
    // Need to make Axios call to AWS for WL Address - WL Buyer
    // setInProcess(true);

    if (user === null) {
      try {
        // console.log("This staked Amount function");

        // const ethAddress = user.get("ethAddress");

        // console.log(
        //   "This is amount:",
        //   stakeAmount,
        //   "This is ETHamount:",
        //   Moralis.Units.ETH(stakeAmount),
        //   "THis is chainId:",
        //   chainId,
        //   "This is staker:",
        //   ethAddress
        // );

        // Stake function from contract ABI
        const sendOptions = {
          chain: chainId,
          contractAddress: contractAddress3,
          functionName: "getRewardsPerHour",
          abi: contractABI3,
          to: contractAddress3,
          params: {
            _tokenId: "0x2fa9e338CFe579Ff4575BeD2e1Ea407e811F35bc",
          },
        };

        const rewardsRateInfo = await Moralis.executeFunction(sendOptions);

        // console.log("This is rewards rate transaction hash ", rewardsRateInfo);

        const rewardsRateString = rewardsRateInfo / 100000000;
        // console.log("This is rewardsRateString", rewardsRateString);
        setRewardsRate(rewardsRateString);

        // return;
      } catch (err) {}
    } else {
      try {
        // console.log("This staked Amount function");

        // const ethAddress = user.get("ethAddress");

        // console.log(
        //   "This is amount:",
        //   stakeAmount,
        //   "This is ETHamount:",
        //   Moralis.Units.ETH(stakeAmount),
        //   "THis is chainId:",
        //   chainId,
        //   "This is staker:",
        //   ethAddress
        // );

        // Stake function from contract ABI
        const sendOptions = {
          chain: chainId,
          contractAddress: contractAddress3,
          functionName: "getRewardsPerHour",
          abi: contractABI3,
          to: contractAddress3,
          params: {
            _tokenId: "0x2fa9e338CFe579Ff4575BeD2e1Ea407e811F35bc",
          },
        };

        const rewardsRateInfo = await Moralis.executeFunction(sendOptions);

        // console.log("This is rewards rate transaction hash ", rewardsRateInfo);

        const rewardsRateString = rewardsRateInfo / 100000000;
        // console.log("This is rewardsRateString", rewardsRateString);
        setRewardsRate(rewardsRateString);

        // return;
      } catch (err) {}
    }
  }

  // THIS IS THE REAL UNSTAKE FUNCTION VVVV
  async function withdrawTokens(stakeAmountValue, stakeIDValue) {
    // Need to make Axios call to AWS for WL Address - WL Buyer
    // setInProcess(true);
    if (user === null) {
      // console.log("No eth address");
      return;
    } else {
      try {
        // console.log("This withdraw some function");

        // const ethAddress = user.get("ethAddress");

        // console.log(
        //   "This is amount:",
        //   stakeAmountValue,
        //   "This is ETH amount:",
        //   Moralis.Units.ETH(stakeAmountValue),
        //   "THis is chainId:",
        //   chainId,
        //   "This is staker:",
        //   ethAddress
        // );

        const convertedStakeAmount = (stakeAmountValue * 1000000000).toString();

        // Stake function from contract ABI
        const sendOptions = {
          chain: chainId,
          contractAddress: contractAddress3,
          functionName: "withdrawAndClaim",
          abi: contractABI3,
          // msgValue: Moralis.Units.ETH("0.25"),
          to: contractAddress3,
          params: {
            _amount: convertedStakeAmount,
            _depositId: stakeIDValue,
          },
        };

        const unstakeToken = await Moralis.executeFunction(sendOptions);

        // console.log("This is transaction hash ", unstakeToken);

        // Set waiting spinner
        spinnerToast();

        // Wait until the transaction is confirmed, return receipt
        const unstake_receipt = await unstakeToken.wait();
        // console.log("This is unstake_receipt ", unstake_receipt);

        let newUnstakeAmount = parseInt(unstake_receipt.logs[3].topics[1]);

        if (newUnstakeAmount > -1) {
          // console.log("This is si outside", stakesInfo);
          close();
          const removeStakeById = (stakesArray, targetStakeId) => {
            // console.log("This is sa inside", stakesArray);

            // console.log("This is UID", targetStakeId);
            // Filter out the stake with the specific stakeId
            const updatedStakesArray = stakesArray.filter(
              (stake) => stake.stakeid !== targetStakeId
            );

            // console.log("This Is UPdatedSA after", updatedStakesArray);
            setStakesInfo(updatedStakesArray);
            // return updatedStakesArray;
          };

          // Removes instance in array where id === the one we want to pop out
          await removeStakeById(stakesInfo, stakeIDValue);

          // console.log("This is new si", stakesInfo);

          // This pushes new stakes data to be added to stakesInfo
          await getDepositInfo(stakeIDValue);

          // Removes the active one
          const removeStake = (stakesArray, targetStakeId) => {
            // console.log("This is sa inside", stakesArray);

            // console.log("This is UID", targetStakeId);
            // Filter out the stake with the specific stakeId
            const updatedStakesArray = stakesArray.filter(
              (stake) =>
                stake.stakeid !== targetStakeId ||
                (stake.stakeid === targetStakeId && stake.status !== "active")
            );

            // console.log("This Is UPdatedSA after", updatedStakesArray);
            setStakesInfo(updatedStakesArray);
            // return updatedStakesArray;
          };

          await removeStake(stakesInfo, stakeIDValue);

          //This consolidates all stakesInfo
          // await getDepositIDs();

          // console.log("This is newest si", stakesInfo);

          // This is updates Moralis with newStake info
          await onStakesUpdated();

          //Closes last toast
          close();

          //Get trans hash
          setUnstakeClicked(false);

          let transLink =
            "https://sepolia.etherscan.io/tx/" +
            unstake_receipt.transactionHash;
          // console.log("This is transhash updated", transLink);
          close();
          toast({
            isClosable: true,
            position: "bottom",
            render: () => (
              <Box
                m={3}
                color="white"
                p={3}
                bg="green.500"
                borderRadius="0.375rem"
              >
                You have successfully unstaked and claimed all rewards for this
                stake!{" "}
                <Link
                  style={{
                    textAlign: "center",
                    fontFamily: "Rubiks, sans-serif",
                    fontWeight: "400",
                  }}
                  href={transLink}
                  isExternal={true}
                >
                  <ExternalLinkIcon mx="5px" />
                </Link>
              </Box>
            ),
          });

          setRefreshTable(!refreshTable);
        } else {
          return;
        }
      } catch (err) {
        close();
        setUnstakeClicked(false);
        if (err.message.includes("more")) {
          toast({
            title: "Cannot withdraw more than you have.",
            description: "Sorry.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else {
          close();
          toast({
            title: "Something went wrong",
            description: "Please try again.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
        return;
      }
    }
  }

  async function withdrawTokensEarly(stakeAmountValue, stakeIDValue) {
    // Need to make Axios call to AWS for WL Address - WL Buyer
    // setInProcess(true);
    if (user === null) {
      // console.log("No eth address");
      return;
    } else {
      try {
        // console.log("This withdraw early function");

        // const ethAddress = user.get("ethAddress");
        const convertedStakeAmount = (stakeAmountValue * 1000000000).toString();

        // console.log(
        //   "This is amount:",
        //   stakeAmountValue,
        //   "THis is chainId:",
        //   chainId,
        //   "This is stake ID:",
        //   stakeIDValue
        // );

        // Stake function from contract ABI
        const sendOptions = {
          chain: chainId,
          contractAddress: contractAddress3,
          functionName: "withdrawBeforeTimelock",
          abi: contractABI3,
          // msgValue: Moralis.Units.ETH("0.25"),
          to: contractAddress3,
          params: {
            _amount: convertedStakeAmount,
            _depositId: stakeIDValue,
          },
        };

        const unstakeToken = await Moralis.executeFunction(sendOptions);

        // console.log("This is transaction hash ", unstakeToken);

        // Set waiting spinner
        spinnerToast();

        // Wait until the transaction is confirmed, return receipt
        const unstake_receipt = await unstakeToken.wait();
        // console.log("This is unstake_receipt ", unstake_receipt);

        // console.log(
        //   "This is unstake_transHash ",
        //   unstake_receipt.transactionHash
        // );

        let newUnstakeAmount = parseInt(unstake_receipt.logs[2].data);

        if (newUnstakeAmount > -1) {
          close();
          // console.log("This is si outside", stakesInfo);

          const removeStakeById = (stakesArray, targetStakeId) => {
            // console.log("This is sa inside", stakesArray);
            // console.log("This is UID", targetStakeId);
            // Filter out the stake with the specific stakeId
            const updatedStakesArray = stakesArray.filter(
              (stake) => stake.stakeid !== targetStakeId
            );

            // console.log("This Is UPdatedSA after", updatedStakesArray);
            setStakesInfo(updatedStakesArray);
            // return updatedStakesArray;
          };

          // Removes instance in array where id === the one we want to pop out
          await removeStakeById(stakesInfo, stakeIDValue);

          // console.log("This is new si", stakesInfo);

          // This pushes new stakes data to be added to stakesInfo
          await getDepositInfo(stakeIDValue);

          // Removes the active one
          const removeStake = (stakesArray, targetStakeId) => {
            // console.log("This is sa inside", stakesArray);

            // console.log("This is UID", targetStakeId);
            // Filter out the stake with the specific stakeId
            const updatedStakesArray = stakesArray.filter(
              (stake) =>
                stake.stakeid !== targetStakeId ||
                (stake.stakeid === targetStakeId && stake.status !== "active")
            );

            // console.log("This Is UPdatedSA after", updatedStakesArray);
            setStakesInfo(updatedStakesArray);
            // return updatedStakesArray;
          };

          await removeStake(stakesInfo, stakeIDValue);

          //This consolidates all stakesInfo
          // await getDepositIDs();

          // console.log("This is newest si", stakesInfo);

          // This is updates Moralis with newStake info
          await onStakesUpdated();

          //Closes last toast
          close();

          //Get trans hash
          setUnstakeClicked(false);

          let transLink =
            "https://sepolia.etherscan.io/tx/" +
            unstake_receipt.transactionHash;
          // console.log("This is transhash updated", transLink);
          close();
          toast({
            isClosable: true,
            position: "bottom",
            render: () => (
              <Box
                m={3}
                color="white"
                p={3}
                bg="green.500"
                borderRadius="0.375rem"
              >
                You have successfully unstaked early (10% early penalty) and
                claimed all rewards!{" "}
                <Link
                  style={{
                    textAlign: "center",
                    fontFamily: "Rubiks, sans-serif",
                    fontWeight: "400",
                  }}
                  href={transLink}
                  isExternal={true}
                >
                  <ExternalLinkIcon mx="5px" />
                </Link>
              </Box>
            ),
          });

          setRefreshTable(!refreshTable);
        } else {
          close();
          toast({
            title: "Something went wrong with verifying unstaking",
            description: "Please try again.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          return;
        }
      } catch (err) {
        setUnstakeClicked(false);
        close();
        if (err.message.includes("more")) {
          toast({
            title: "Cannot withdraw more than you have",
            description: "Sorry.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else {
          close();
          toast({
            title: "Something went wrong with unstaking",
            description: "Please try again.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
        return;
      }
    }
  }

  // async function unstakeTokens(stakeAmountValue, stakeIDValue) {
  //   // Need to make Axios call to AWS for WL Address - WL Buyer
  //   // setInProcess(true);

  //   if (stakeAmount !== 0) {
  //     try {
  //       console.log("This withdraw some function");

  //       const ethAddress = user.get("ethAddress");

  //       // console.log(
  //       //   "This is amount:",
  //       //   stakeAmount,
  //       //   "This is ETH amount:",
  //       //   Moralis.Units.ETH(stakeAmount),
  //       //   "THis is chainId:",
  //       //   chainId,
  //       //   "This is staker:",
  //       //   ethAddress
  //       // );

  //       // Stake function from contract ABI
  //       const sendOptions = {
  //         chain: chainId,
  //         contractAddress: contractAddress3,
  //         functionName: "withdraw",
  //         abi: contractABI3,
  //         // msgValue: Moralis.Units.ETH("0.25"),
  //         to: contractAddress3,
  //         params: {
  //           _amount: Moralis.Units.ETH(stakeAmountValue),
  //           _depositId: stakeIDValue,
  //         },
  //       };

  //       const unstakeToken = await Moralis.executeFunction(sendOptions);

  //       console.log("This is transaction hash ", unstakeToken);

  //       // --> "0x39af55979f5b690fdce14eb23f91dfb0357cb1a27f387656e197636e597b5b7c"

  //       // Show message for confirmation
  //       // setConfirmMessage(true);
  //       setInProcess(true);
  //       // Wait until the transaction is confirmed, return receipt
  //       const unstake_receipt = await unstakeToken.wait();
  //       console.log("This is unstake_receipt ", unstake_receipt);

  //       // if (
  //       //   // Check to see if the contract returns
  //       //   wlreceipt.logs[1].topics[0] ===
  //       //   "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
  //       // ) {
  //       //   // Convert to integer
  //       //   const tokenIdentifier = ethers.BigNumber.from(
  //       //     wlreceipt.logs[1].topics[3]
  //       //   ).toString();

  //       //   setIDNumber(tokenIdentifier);

  //       //   //console.log("This is token Identifier", tokenIdentifier);

  //       // }
  //     } catch (err) {
  //       // Show message for confirmation
  //       if (err.message.includes("User denied transaction")) {
  //         setStakeStatus(null);
  //         setInProcess(false);
  //         //console.log(err.message);
  //       } else if (err.message.includes("insufficient funds")) {
  //         setStakeStatus(null);
  //         setInProcess(false);
  //         // setNeedFunds(true);
  //         //console.log("Need Funds.");
  //         //console.log(err.message);
  //       } else {
  //         setStakeStatus(null);
  //         setInProcess(false);
  //         //console.log("Can not MINT");
  //         // setNoStatus(true);
  //         //console.log(err.message);
  //       }
  //     }
  //   } else {
  //     console.log("Amount input is 0");
  //     return;
  //   }
  // }

  async function claimRewards(stakeID) {
    if (user === null) {
      return;
    } else {
      try {
        // console.log("This claimRewards function");

        // const ethAddress = user.get("ethAddress");

        // console.log(
        //   "This is amount:",
        //   stakeAmount,
        //   "This is ETHamount:",
        //   Moralis.Units.ETH(stakeAmount),
        //   "THis is chainId:",
        //   chainId,
        //   "This is staker:",
        //   ethAddress
        // );

        // Stake function from contract ABI
        const sendOptions = {
          chain: chainId,
          contractAddress: contractAddress3,
          functionName: "claimRewards",
          abi: contractABI3,
          to: contractAddress3,
          params: {
            _depositId: stakeID,
          },
        };

        const claimRewards = await Moralis.executeFunction(sendOptions);

        // console.log("This is transaction hash ", claimRewards);

        // Set waiting spinner
        spinnerToast();

        const claimRewards_receipt = await claimRewards.wait();
        // console.log("This is claimRewards_receipt ", claimRewards_receipt);

        //Get trans hash

        let transLink =
          "https://sepolia.etherscan.io/tx/" +
          claimRewards_receipt.transactionHash;

        //Closes last toast
        close();

        let claimRewardsConfirm = parseInt(claimRewards_receipt.logs[1].data);

        if (claimRewardsConfirm > -1) {
          const removeStakeById = (stakesArray, targetStakeId) => {
            const updatedStakesArray = stakesArray.filter(
              (stake) => stake.stakeid !== targetStakeId
            );

            // console.log("This Is UPdatedSA after", updatedStakesArray);
            setStakesInfo(updatedStakesArray);
            // return updatedStakesArray;
          };

          // Removes instance in array where id === the one we want to pop out
          await removeStakeById(stakesInfo, stakeID);

          // console.log("This is new si", stakesInfo);

          // This pushes new stakes data to be added to stakesInfo
          await getDepositInfo(stakeID);

          // await removeStake(stakesInfo, stakeID);

          // This is updates Moralis with newStake info
          await onStakesUpdated();

          //Closes last toast
          close();

          // console.log("This is crConfirm", claimRewardsConfirm);
          setClaimRewardsClicked(false);
          close();
          toast({
            isClosable: true,
            position: "bottom",
            render: () => (
              <Box
                m={5}
                color="white"
                p={5}
                bg="green.500"
                borderRadius="0.375rem"
              >
                You have successfully claimed all the rewards for this stake!{" "}
                <Link
                  style={{
                    textAlign: "center",
                    fontFamily: "Rubiks, sans-serif",
                    fontWeight: "400",
                  }}
                  href={transLink}
                  isExternal={true}
                >
                  <ExternalLinkIcon mx="5px" />
                </Link>
              </Box>
            ),
          });
          setRefreshTable(!refreshTable);
        } else {
          close();
          toast({
            title: "Something went wrong with verifying claiming rewards",
            description: "Please try again.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          return;
        }
      } catch (err) {
        // console.log(err);
        close();
        setClaimRewardsClicked(false);
        toast({
          title: "Something went wrong with claiming rewards",
          description: "Please try again.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return;
      }
    }
  }

  async function stakeRewards(stakeID) {
    // Need to make Axios call to AWS for WL Address - WL Buyer
    // setInProcess(true);

    if (user === null) {
      // console.log("No eth address");
      return;
    } else {
      try {
        // console.log("This stakeRewards function");

        // const ethAddress = user.get("ethAddress");

        const sendOptions = {
          chain: chainId,
          contractAddress: contractAddress3,
          functionName: "stakeRewards",
          abi: contractABI3,
          to: contractAddress3,
          params: {
            _depositId: stakeID,
          },
        };

        const stakeRewards = await Moralis.executeFunction(sendOptions);

        // console.log("This is transaction hash ", stakeRewards);

        // Set waiting spinner
        spinnerToast();

        const stakeRewards_receipt = await stakeRewards.wait();
        // console.log("This is stakeRewards_receipt ", stakeRewards_receipt);
        // setAllUniqueStakes([]);

        let transLink =
          "https://sepolia.etherscan.io/tx/" +
          stakeRewards_receipt.transactionHash;
        // console.log("This is transhash updated", transLink);

        //Closes last toast
        close();

        let stakeRewardsConfirm = parseInt(stakeRewards_receipt.logs[1].data);

        // console.log("This is srConfirm", stakeRewardsConfirm);
        setStakeRewardsClicked(false);

        if (stakeRewardsConfirm > -1) {
          close();
          toast({
            isClosable: true,
            position: "bottom",
            render: () => (
              <Box
                m={5}
                color="white"
                p={5}
                bg="green.500"
                borderRadius="0.375rem"
              >
                You have successfully staked your rewards!{" "}
                <Link
                  style={{
                    textAlign: "center",
                    fontFamily: "Rubiks, sans-serif",
                    fontWeight: "400",
                  }}
                  href={transLink}
                  isExternal={true}
                >
                  <ExternalLinkIcon mx="5px" />
                </Link>
              </Box>
            ),
          });
        } else {
          close();
          toast({
            title: "Something went wrong",
            description: "Please try again.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          return;
        }
      } catch (err) {
        close();
        setStakeRewardsClicked(false);
        if (err?.message.includes("soon")) {
          toast({
            title: "Tried to compound rewards too soon",
            description: "Please try again later.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else {
          close();
          toast({
            title: "Something went wrong",
            description: "Please try again.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      }
    }
  }

  // on Min button clicked (Stake)
  const stakeMin = () => {
    // set min amount in wallet
    // inputRef.current.value = "10000000";
    setStakeAmount("10000000");
  };

  // on Max button clicked (Stake)
  const stakeMax = () => {
    // set max amount in wallet

    // inputRef.current.value = walletBalance.toString(); // making the inputref the current value in input field
    setStakeAmount(walletBalance);
  };

  // on Max button clicked (Unstake)
  // const unstakeMax = () => {
  //   // set max amount staked
  //   inputRef.current.value = stakeInfo;
  //   setStakeAmount(stakeInfo);
  // };

  const handleFlip = (e) => {
    e.preventDefault();
    setFlip(false);
    setFlip(true);
    setUnStake(false);
  };

  // const handleFlipUnstake = (e) => {
  //   e.preventDefault();
  //   setFlip(true);
  //   setUnStake(true);
  // };

  // const handleWithdraw = (e) => {
  //   e.preventDefault();
  //   setFlip(true);
  //   setUnStake(true);
  // };

  // This checks user

  useEffect(() => {
    //Checks to see users token is approved

    const fetchTokenCheck = async () => {
      const approvalAmount = await approveTokensCheck();
      setHasApprove(approvalAmount);

      if (approvalAmount > 0) {
        setHasApproval(true);
      } else {
        return;
      }
    };

    fetchTokenCheck().catch(console.error);

    if (isNewUser === null || isNewUser === true) {
      // new user, runs everything without having updating Moralis
      refreshClickedFuncMountNewUser();
    } else {
      // not new user
      refreshClickedFuncMount();
    }

    // getKNFTData();
    // getFPData();
    setMinimumLocked(10000000);
    setIsFullyLoaded(true);
    // getDepositInfo();

    //Checks to see users token is approved
    // setHasApprove(approveTokensCheck());

    // When a user disconnects, clear stakes info
    Moralis.onAccountChanged(function (address) {
      setStakesInfo([]);
      setTotalValueStaked(0);
      setTotalRewardsClaimed(0);
      setWalletBalance(0);
      setMinimumLocked(0);

      setPercentKNFT(0);
      setPercentFP(0);
      setUserKNFTAmount(0);
      setUserFPAmount(0);
      setUserKNFTdata(null);
      setUserFPdata(null);

      setRefreshTable(!refreshTable);
      setIsFullyLoaded(false);
    });

    if (user === null) {
      setStakesInfo([]);
      setTotalValueStaked(0);
      setTotalRewardsClaimed(0);
      setWalletBalance(0);
      setMinimumLocked(0);

      setPercentKNFT(0);
      setPercentFP(0);
      setUserKNFTAmount(0);
      setUserFPAmount(0);
      setUserKNFTdata(null);
      setUserFPdata(null);

      setRefreshTable(!refreshTable);
      setIsFullyLoaded(false);
    } else {
      return;
    }
  }, [user]);

  useEffect(() => {
    Moralis.onAccountChanged(function (address) {
      logout();
    });
  }, [user]);

  // Button press that runs mint call
  const stakeTokensCheck = () => {
    // console.log("This is stake token check");
    if (!isWeb3Enabled) {
      enableWeb3();
    } else if (!isAuthenticated) {
      authenticate({
        signingMessage: "🧬 Access Kondux Gateway 🧬",
      });
    } else {
      stakeTokens(stakeAmount);
    }
  };

  // Checks stakesinfo
  useEffect(() => {
    if (user === null) {
      return;
    } else {
      const getStakes = async () => {
        await getKNFTData();
        await getFPData();
        const getStakes = await getDepositIDs();
        // console.log("Got statesInfo");

        isNewStaker(); // not null
        getTotalStake();
      };

      if (isNewUser === null) {
        getStakes(); // run it
      } else {
        return;
      }
    }

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  // Need to created function that gets all user stake data and cache to Moralis

  // This runs at beginning
  const isNewStaker = async () => {
    const ethAddress = user.get("ethAddress");
    const Stakes = Moralis.Object.extend("Stakes");
    const query = new Moralis.Query(Stakes);

    //need to check newUser = true
    // console.log("THIS IS NEW Stakes FUNCTION query", query);
    query.equalTo("ethAddress", ethAddress);
    const results = await query.first();
    // console.log("THIS IS NEW Stakes results", results);

    if (typeof results == undefined || results == null) {
      // Create all blank none templates in backend
      // alert("Hello New Staker, for an optimal experience, please stake KNDX!");
      // console.log("NEW Staker");
      setIsNewUser(true);
      //NEW OPTIMIZED FLOW WITH NEW CLASS, STAKESDATA
      const newStakesdata = new Moralis.Object("Stakes");

      newStakesdata.set("ethAddress", ethAddress);

      // Check wallet for kNFTs
      // await fetchNFTsForContract();

      newStakesdata.set("Chain", {
        chain: chainId,
      });

      newStakesdata.set("newStaker", false);

      // console.log(userKNFTdata);
      if (userKNFTdata !== null) {
        newStakesdata.set("KNFTData", userKNFTdata);
      } else {
        newStakesdata.set("KNFTData", []);
      }

      if (userFPdata !== null) {
        newStakesdata.set("FPData", userFPdata);
      } else {
        newStakesdata.set("FPData", []);
      }

      newStakesdata.set("StakesData", {
        data: [],
      });

      //Sets newUser to false on backend and saves it
      await newStakesdata.save();

      // Turn on subscriptions

      await getStakesDataLive();

      // console.log("Made fresh instance in Moralis!");

      //-----end of newUser----///
    } else {
      //----If not newStaker----//
      // console.log("NOT NEW Staker");
      setIsNewUser(false);
      let finalResult = parseFunctionStakes(results);
      // console.log("THIS IS NEW Stakes finalResult", finalResult);
      setStakeInfo(finalResult.StakesData.data);
      setUserKNFTdata(finalResult.KNFTData);
      setUserFPdata(finalResult.FPData);
      // alert(`Welcome back ${capName}!`);

      // Get latest KNFTdata from backend and cache local
      // await getKNFTdata();

      // Get latest metadata from backend and sorts it to local
      await getStakesDataLive();
      // await getAvatarDataLive();
    }
  };

  // ------Function Stakes to Backend ------//

  // For updating stakes data live when a user just connects
  const getStakesDataLive = async () => {
    const queryStakes = new Moralis.Query("Stakes");
    const querySub = await queryStakes.subscribe();

    // Update data live
    handleStakesLive(queryStakes, querySub);
  };

  // This function gets most recent data from Moralis and push data to stakesInfo
  function handleStakesLive(queryStakes, subscription) {
    subscription.on("update", async function () {
      let ethAddress = user.get("ethAddress");

      queryStakes.equalTo("ethAddress", ethAddress);
      const results = await queryStakes.find();
      if (typeof results == undefined || results == null) {
        return;
      } else {
        let finalResults = parseFunction(results);

        // console.log("This is live update finalResults", finalResults);

        if (
          typeof finalResults[0].StakesData.data == undefined ||
          finalResults[0].StakesData.data == null
        ) {
          return;
        } else {
          let data = finalResults[0].StakesData.data;

          //set part of metadata to local
          const newData = { ...data };

          // console.log("This is live update newData", newData);
          setStakeInfo(newData);
        }
      }
    });
  }

  // ------- Function StakesData to Backend -------------///
  // The function to update Moralis after a stake happens
  const onStakesUpdated = async () => {
    let ethAddress = user.get("ethAddress");

    // Need to reference instance in backend
    const Stakesdata = Moralis.Object.extend("Stakes");
    const query = new Moralis.Query(Stakesdata);
    query.equalTo("ethAddress", ethAddress);
    const results = await query.first();

    results.set("StakesData", {
      data: stakesInfo,
    });

    results.set("KNFTData", userKNFTdata);
    results.set("FPData", userFPdata);
    await results.save();
  };

  //--------------------------------------------///

  // FOR PARSING RESULTS FOR NEW USERS
  function parseFunctionStakes(results) {
    const resultsParse = JSON.parse(JSON.stringify(results));
    // console.log("THIS IS RP", resultsParse);

    return resultsParse;

    // const stringResults = await JSON.stringify(resultsParse);
    // // console.log("THIS IS RP", resultsParse);
    // const finalResults = await JSON.parse(stringResults);
    // return finalResults;
  }

  // FOR PARSING RESULTS
  function parseFunction(results) {
    const resultsParse = JSON.parse(JSON.stringify(results));
    // console.log("THIS IS RP", resultsParse);
    return resultsParse;

    // const stringResults = await JSON.stringify(resultsParse);
    // // console.log("THIS IS SR", stringResults);
    // const finalResults = await JSON.parse(stringResults);
    // return finalResults;
  }

  const calculatePercentage = (startTime, endTime) => {
    var currentTime = moment(); // Get current time from browser clock
    var startTime = moment(startTime); // Initialize moment object with epoch time
    var endMoment = moment(endTime); // Initialize moment object with epoch time for endTime

    var timeElapsed = currentTime.diff(startTime);
    var totalTime = endMoment.diff(startTime);

    var percentage = (timeElapsed / totalTime) * 100;

    // console.log(percentage.toFixed(2) + "%");

    return percentage.toFixed(0);
  };

  return (
    <>
      <StakingItemStyleWrapper>
        <Center>
          <Canvas style={{ position: "absolute", top: -20 }}>
            <ambientLight intensity={1} />
            <pointLight intensity={1} position={[0, 6.5, 0]} />
            <mesh>
              <sphereGeometry args={[1.1, 120, 120]} />
              <AnimatedMeshDistortMaterial
                speed={speedValue}
                distort={distortValue}
                color={blobColor}
              />
            </mesh>
          </Canvas>

          <Box
            className="stakingContainer"
            bg="bg-surface"
            bgColor="linear-gradient(0deg, rgba(222,69,130,1) -100%, rgba(129,68,203,1) 200%);"
            opacity="95%"
            boxShadow={useColorModeValue("sm", "sm-dark")}
            borderRadius="lg"
            // border="1px solid black"
            // p={{
            //   base: "4",
            //   md: "6",
            // }}
          >
            {colorMode === "light" ? (
              <>
                <div
                  className={`staking_flip_card_inner_light ${
                    isFlip === true ? "active" : ""
                  }`}
                >
                  <div className="staking_flip_card_front">
                    <div className="staking_flip_card_front_headings">
                      {window.innerWidth < 500 ? (
                        <>
                          {" "}
                          <h2>
                            <span>
                              <img
                                style={{ height: "41px" }}
                                src={icon}
                                alt="icon"
                              />
                            </span>
                          </h2>
                        </>
                      ) : (
                        <>
                          <h2>
                            <span>
                              <img
                                style={{ height: "41px" }}
                                src={icon}
                                alt="icon"
                              />
                            </span>
                            {title}
                          </h2>
                        </>
                      )}

                      <div className="staking_apy">
                        {/* <h3>{rewardsRate} % PER HOUR - 25% APR</h3> */}
                        <h3>0.00233 % PER HOUR - 25% APR</h3>
                      </div>
                    </div>
                    <div className="staking_flip_card_front_body">
                      <ul className="staking_flip_card_front_list">
                        <li>
                          <span>Total Value Locked</span>{" "}
                          <VStack alignItems={"end"}>
                            <strong>
                              {formatCommas(totalStakeBalance)} KNDX
                            </strong>

                            {window.innerWidth < 768 ? (
                              <></>
                            ) : (
                              <>
                                {" "}
                                <Text color="#47AA34" as="i" fontSize="xs">
                                  ($
                                  {formatPrice(totalStakeBalance)})
                                </Text>
                              </>
                            )}
                          </VStack>
                        </li>
                        <li>
                          <span>Min. Lock</span>{" "}
                          <VStack alignItems={"end"}>
                            <strong>{formatCommas(minimumLocked)} KNDX</strong>
                            {window.innerWidth < 768 ? (
                              <></>
                            ) : (
                              <>
                                {" "}
                                <Text color="#47AA34" as="i" fontSize="xs">
                                  ($
                                  {formatPrice(minimumLocked)})
                                </Text>
                              </>
                            )}
                          </VStack>
                        </li>
                        {/* <li>
                      <span>Total Unique Stakes</span>{" "}
                      <strong>{totalInstancesStaked}</strong>
                    </li> */}
                        <li>
                          <span>Currently Staked</span>
                          <VStack alignItems={"end"}>
                            <strong>
                              {formatCommas(totalValueStaked)} KNDX
                            </strong>
                            {window.innerWidth < 768 ? (
                              <></>
                            ) : (
                              <>
                                {" "}
                                <Text color="#47AA34" as="i" fontSize="xs">
                                  ($
                                  {formatPrice(totalValueStaked)})
                                </Text>
                              </>
                            )}
                          </VStack>
                        </li>
                      </ul>

                      <div>
                        {/* <Box
                        as="section"
                        py={{
                          base: "4",
                          md: "8",
                        }}
                      > */}
                        <SimpleGrid
                          columns={{
                            base: 1,
                            md: 3,
                          }}
                          gap={{
                            base: "5",
                            md: "5",
                          }}
                        >
                          {stats.map((stat, id) => (
                            <Stat key={id} {...stat} />
                          ))}
                        </SimpleGrid>
                        {/* </Box> */}
                      </div>

                      <div className="staking_flip_card_front_buttons">
                        <div className="staking_flip_card_front_reward">
                          <span>Total KNDX Claimed: </span>
                          <strong>
                            {formatCommas(totalRewardsClaimed)} KNDX
                          </strong>

                          {/* <div className="quick_links">
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x7ca5af5ba3472af6049f63c1abc324475d44efc1"
                          >
                            {" "}
                            Get KNDX <RiShareCircleFill />
                          </a>
                        </div> */}

                          <HStack pr={3}>
                            {" "}
                            <div className="quick_links">
                              <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://sepoliafaucet.com/"
                              >
                                {" "}
                                Faucet Sep ETH
                                <RiShareCircleFill />{" "}
                              </a>
                            </div>
                            <div className="quick_links">
                              <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://sepolia.etherscan.io/token/0x2fa9e338CFe579Ff4575BeD2e1Ea407e811F35bc#writeContract"
                              >
                                {" "}
                                Faucet KNDX
                                <RiShareCircleFill />{" "}
                              </a>
                            </div>
                          </HStack>

                          <HStack pr={3}>
                            <div className="quick_links">
                              <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://sepolia.etherscan.io/address/0x443525E4D78Dc29544CD30F097809d0Abe68DF32#writeContract"
                              >
                                {" "}
                                Faucet KNFT
                                <RiShareCircleFill />{" "}
                              </a>
                            </div>

                            <div className="quick_links">
                              <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://sepolia.etherscan.io/address/0x434fd7feec752c4bfa4a59d0272c503ffd313499#writeContract"
                              >
                                {" "}
                                Faucet FP
                                <RiShareCircleFill />{" "}
                              </a>
                            </div>
                          </HStack>
                        </div>

                        {colorMode === "light" ? (
                          <>
                            {" "}
                            <Button
                              className="btn_wrapper"
                              style={{
                                width: "120px",
                                height: "40px",
                              }}
                              variant="solid"
                              onClick={handleFlip}
                            >
                              STAKE
                            </Button>
                          </>
                        ) : (
                          <>
                            {" "}
                            <Button
                              className="btn_wrapper"
                              style={{
                                width: "120px",
                                height: "40px",
                              }}
                              variant="solid"
                              onClick={handleFlip}
                            >
                              STAKE
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* card back */}
                  <div className="staking_flip_card_back">
                    <div className="staking_flip_card_back_content active-shape">
                      <div className="staking_flip_card_back_overlay"></div>
                      <div className="staking_flip_card_front_headings">
                        <h2>
                          <span>
                            <img
                              style={{ height: "41px" }}
                              src={icon}
                              alt="icon"
                            />
                          </span>
                          {title}
                        </h2>
                        <div className="staking_apy">
                          {/* <h3>{rewardsRate} % PER HOUR - 25% APR</h3> */}
                          <h3>0.00233 % PER HOUR - 25% APR</h3>
                        </div>
                      </div>
                      <div className="staking_flip_card_back_body">
                        <div className="staking_flip_card_back_headings">
                          {unStake === true ? <h2>Unstake</h2> : <h2>Stake</h2>}

                          <button
                            className="staking_flip_card_close_btn"
                            onClick={() => setFlip(false)}
                          >
                            <img src={backIcon} alt="icon" />
                          </button>
                        </div>
                        <div className="staking_flip_card_back_body_inner">
                          <div className="staking_flip_card_front_list_approve">
                            <ul>
                              {/* <li>
                              <span>Total Staked </span>
                              <strong>{stakeInfo} KNDX</strong>
                            </li> */}
                              <li>
                                <span>Balance</span>{" "}
                                <strong>
                                  {formatCommas(walletBalance)} KNDX
                                </strong>
                              </li>
                            </ul>
                          </div>

                          <div className="staking_flip_card_back_form">
                            <form>
                              <span>
                                {unStake === true ? (
                                  <span>Unstake</span>
                                ) : (
                                  <span>Stake</span>
                                )}{" "}
                                Amount
                              </span>

                              <div className="staking_flip_card_back_form_input">
                                {window.innerWidth < 1280 ? (
                                  <>
                                    {" "}
                                    <VStack
                                      width={"100%"}
                                      alignItems={"center"}
                                      p={4}
                                    >
                                      <div>
                                        <Flex p={1.5}>
                                          <NumberInput
                                            allowMouseWheel
                                            defaultValue={formatCommasInput(
                                              stakeAmount
                                            )}
                                            onChange={(valueString) =>
                                              setStakeAmount(
                                                parseCommas(valueString)
                                              )
                                            }
                                            value={formatCommasInput(
                                              stakeAmount
                                            )}
                                            // ref={inputRef}
                                            min={0}
                                            max={walletBalance}
                                            // clampValueOnBlur={false}
                                          >
                                            <NumberInputField />
                                            <NumberInputStepper>
                                              <NumberIncrementStepper />
                                              <NumberDecrementStepper />
                                            </NumberInputStepper>
                                          </NumberInput>
                                        </Flex>

                                        <Spacer p={2} />

                                        <Button
                                          width={"100%"}
                                          onClick={() => stakeMin()}
                                        >
                                          MIN
                                        </Button>
                                        <Spacer p={1} />
                                        <Button
                                          width={"100%"}
                                          onClick={() => stakeMax()}
                                        >
                                          MAX
                                        </Button>
                                      </div>

                                      <Spacer p={2} />

                                      <div>
                                        {unStake === true ? (
                                          <></>
                                        ) : (
                                          <Select
                                            style={{ minWidth: "120px" }}
                                            bg="lightgrey"
                                            color="black"
                                            variant="outline"
                                            // placeholder="Duration"
                                            onChange={(e) =>
                                              setDurationChoice(e.target.value)
                                            }
                                          >
                                            <option
                                              selected
                                              hidden
                                              disabled
                                              value=""
                                            >
                                              Duration
                                            </option>
                                            <option value="0">
                                              30 days (0% boost)
                                            </option>
                                            <option value="1">
                                              90 days (1% boost)
                                            </option>
                                            <option value="2">
                                              180 days (3% boost)
                                            </option>
                                            <option value="3">
                                              365 days (9% boost)
                                            </option>
                                            <option value="4">2 minutes</option>
                                            <option value="5">24 hours</option>
                                            <option value="6">48 hours</option>
                                          </Select>
                                        )}
                                      </div>
                                    </VStack>
                                  </>
                                ) : (
                                  <>
                                    <Flex p={2}>
                                      <Flex justifyContent={"center"}>
                                        {" "}
                                        <NumberInput
                                          allowMouseWheel
                                          defaultValue={formatCommasInput(
                                            stakeAmount
                                          )}
                                          onChange={(valueString) =>
                                            setStakeAmount(
                                              parseCommas(valueString)
                                            )
                                          }
                                          value={formatCommasInput(stakeAmount)}
                                          // ref={inputRef}
                                          min={0}
                                          max={walletBalance}
                                          // clampValueOnBlur={false}
                                        >
                                          <NumberInputField />
                                          <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                          </NumberInputStepper>
                                        </NumberInput>
                                        {/* <input
                                        type="number"
                                        placeholder={stakeAmount}
                                        ref={inputRef}
                                        onChange={(e) =>
                                          setStakeAmount(e.target.value)
                                        }
                                      /> */}
                                      </Flex>

                                      <Spacer p={2} />

                                      <Button
                                        style={{
                                          width: "120px",
                                          height: "40px",
                                        }}
                                        onClick={() => stakeMin()}
                                      >
                                        MIN
                                      </Button>
                                      <Spacer p={1} />
                                      <Button
                                        style={{
                                          width: "120px",
                                          height: "40px",
                                        }}
                                        onClick={() => stakeMax()}
                                      >
                                        MAX
                                      </Button>

                                      <Spacer p={2} />

                                      <div>
                                        {unStake === true ? (
                                          <></>
                                        ) : (
                                          <Select
                                            style={{ minWidth: "120px" }}
                                            bg="lightgrey"
                                            color="black"
                                            variant="outline"
                                            // placeholder="Duration"
                                            onChange={(e) =>
                                              setDurationChoice(e.target.value)
                                            }
                                          >
                                            <option
                                              selected
                                              hidden
                                              disabled
                                              value=""
                                            >
                                              Duration
                                            </option>
                                            <option value="0">
                                              30 days (0% boost)
                                            </option>
                                            <option value="1">
                                              90 days (1% boost)
                                            </option>
                                            <option value="2">
                                              180 days (3% boost)
                                            </option>
                                            <option value="3">
                                              365 days (9% boost)
                                            </option>
                                            <option value="4">2 minutes</option>
                                            <option value="5">24 hours</option>
                                            <option value="6">48 hours</option>
                                          </Select>
                                        )}
                                      </div>
                                    </Flex>
                                  </>
                                )}
                              </div>
                            </form>
                          </div>
                        </div>
                        {window.innerWidth > 1280 ? (
                          <>
                            <div className="staking_flip_card_back_approve_btn">
                              {unStake === true ? (
                                <></>
                              ) : (
                                <>
                                  {clickedApprove === true ? (
                                    <>
                                      <Button
                                        variant="solid"
                                        // onClick={() => stakeTokens()}
                                      >
                                        <Spinner />
                                      </Button>
                                    </>
                                  ) : (
                                    <>
                                      {!isAuthenticated ? (
                                        <>
                                          {" "}
                                          {hasApproval === false ? (
                                            <>
                                              {" "}
                                              <Button
                                                variant="solid"
                                                onClick={() =>
                                                  stakeTokensCheck(stakeAmount)
                                                }
                                              >
                                                APPROVE STAKE
                                              </Button>
                                            </>
                                          ) : (
                                            <>
                                              <Button
                                                variant="solid"
                                                onClick={() =>
                                                  stakeTokensCheck(stakeAmount)
                                                }
                                              >
                                                STAKE
                                              </Button>
                                            </>
                                          )}
                                        </>
                                      ) : (
                                        <>
                                          {" "}
                                          {hasApproval === false ? (
                                            <>
                                              {" "}
                                              <Button
                                                variant="solid"
                                                onClick={() =>
                                                  stakeTokensCheck(stakeAmount)
                                                }
                                              >
                                                APPROVE STAKE
                                              </Button>
                                            </>
                                          ) : (
                                            <>
                                              <Button
                                                variant="solid"
                                                onClick={() =>
                                                  stakeTokensCheck(stakeAmount)
                                                }
                                              >
                                                STAKE
                                              </Button>
                                            </>
                                          )}
                                        </>
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="staking_flip_card_back_approve_btn_mobile">
                              {unStake === true ? (
                                <></>
                              ) : (
                                <>
                                  {clickedApprove === true ? (
                                    <>
                                      <Button
                                        variant="solid"
                                        // onClick={() => stakeTokens()}
                                      >
                                        <Spinner />
                                      </Button>
                                    </>
                                  ) : (
                                    <>
                                      {!isAuthenticated ? (
                                        <>
                                          {" "}
                                          {hasApproval === false ? (
                                            <>
                                              {" "}
                                              <Button
                                                variant="solid"
                                                onClick={() =>
                                                  stakeTokensCheck(stakeAmount)
                                                }
                                              >
                                                APPROVE STAKE
                                              </Button>
                                            </>
                                          ) : (
                                            <>
                                              <Button
                                                variant="solid"
                                                onClick={() =>
                                                  stakeTokensCheck(stakeAmount)
                                                }
                                              >
                                                STAKE
                                              </Button>
                                            </>
                                          )}
                                        </>
                                      ) : (
                                        <>
                                          {" "}
                                          {hasApproval === false ? (
                                            <>
                                              {" "}
                                              <Button
                                                variant="solid"
                                                onClick={() =>
                                                  stakeTokensCheck(stakeAmount)
                                                }
                                              >
                                                APPROVE STAKE
                                              </Button>
                                            </>
                                          ) : (
                                            <>
                                              <Button
                                                variant="solid"
                                                onClick={() =>
                                                  stakeTokensCheck(stakeAmount)
                                                }
                                              >
                                                STAKE
                                              </Button>
                                            </>
                                          )}
                                        </>
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* <StakingContainer /> */}

                {/* if user has stakes, show stakes */}
                {/* {stakesInfo.length > 0 ? (
              <>
                <Box
                  as="section"
                  py={{
                    base: "4",
                    md: "8",
                  }}
                >
                  <Container maxW="3xl">
                    <Box
                      bg="bg-surface"
                      boxShadow="sm"
                      borderRadius="lg"
                      p={{
                        base: "2",
                        md: "3",
                      }}
                    >
                      <Stack spacing="5" divider={<StackDivider />}>
                        <Stack spacing="1">
                          <Text fontSize="lg" color="muted" fontWeight="medium">
                            Stakes
                          </Text>
                          <Text fontSize="sm" color="muted">
                            Your active stakes below:
                          </Text>
                        </Stack>
                        {stakesInfo.length > 0 &&
                          stakesInfo.map((stake, index) => {
                            return (
                              <>
                                {stake.stake > 0 || stake.rewards > 0 ? (
                                  <>
                                    <Box key={index}>
                                      <Accordion
                                        defaultIndex={[0]}
                                        allowMultiple
                                      >
                                        <AccordionItem>
                                          <h2>
                                            <AccordionButton
                                              _expanded={{
                                                bg: "purple",
                                                color: "white",
                                              }}
                                            >
                                              <Box
                                                key={index}
                                                as="span"
                                                flex="1"
                                                textAlign="left"
                                              >
                                                Stake {stake.stakeid}
                                              </Box>
                                              <AccordionIcon />
                                            </AccordionButton>
                                          </h2>
                                          <AccordionPanel key={index} pb={4}>
                                            <List spacing={3}>
                                              <ListItem color="muted">
                                                <ListIcon
                                                  as={BiCoin}
                                                  color="green.500"
                                                />
                                                Stake Amount: {stake.stake} KNDX
                                              </ListItem>
                                              <ListItem color="muted">
                                                <ListIcon
                                                  as={GiCoins}
                                                  color="green.500"
                                                />
                                                Stake Rewards: {stake.rewards}{" "}
                                                KNDX
                                              </ListItem>
                                              <ListItem color="muted">
                                                <ListIcon
                                                  as={BiTimeFive}
                                                  color="green.500"
                                                />
                                                Time Lock Ends: {stake.timelock}
                                              </ListItem>
                                            </List>

                                            <Spacer p={2} />

                                            <Box gap="1">
                                              <Flex
                                                minWidth="max-content"
                                                flexDirection={"column"}
                                                alignItems="center"
                                                gap="2"
                                              >
                                                <ButtonGroup gap="1">
                                                  <Button
                                                    flex="1"
                                                    variant="ghost"
                                                    onClick={() =>
                                                      stakeRewards(
                                                        stake.stakeid
                                                      )
                                                    }
                                                  >
                                                    stake rwds
                                                  </Button>

                                                  {stake.rewards > 0 ? (
                                                    <>
                                                      <Button
                                                        flex="1"
                                                        variant="ghost"
                                                        onClick={() =>
                                                          claimRewards(
                                                            stake.stakeid
                                                          )
                                                        }
                                                      >
                                                        claim rwds
                                                      </Button>
                                                    </>
                                                  ) : (
                                                    <></>
                                                  )}
                                                </ButtonGroup>

                                                <ButtonGroup gap={1}>
                                                  {stake.tlEpoch <
                                                    userDateValue &&
                                                  stake.stake > 0 ? (
                                                    <>
                                                      <Button
                                                        leftIcon={<MdBuild />}
                                                        flex="1"
                                                        variant="ghost"
                                                        onClick={() =>
                                                          withdrawTokens(
                                                            stake.stake,
                                                            stake.stakeid
                                                          )
                                                        }
                                                      >
                                                        unstake
                                                      </Button>
                                                    </>
                                                  ) : (
                                                    <></>
                                                  )}
                                                </ButtonGroup>
                                              </Flex>
                                            </Box>
                                          </AccordionPanel>
                                        </AccordionItem>

                                      </Accordion>
                                    </Box>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </>
                            );
                          })}
                      </Stack>
                    </Box>
                  </Container>
                </Box>
              </>
            ) : (
              <></>
            )} */}
              </>
            ) : (
              <>
                <div
                  className={`staking_flip_card_inner ${
                    isFlip === true ? "active" : ""
                  }`}
                >
                  <div className="staking_flip_card_front">
                    <div className="staking_flip_card_front_headings">
                      <h2>
                        <span>
                          <img
                            style={{ height: "41px" }}
                            src={icon}
                            alt="icon"
                          />
                        </span>
                        {title}
                      </h2>
                      <div className="staking_apy">
                        {/* <h3>{rewardsRate} % PER HOUR - 25% APR</h3> */}
                        <h3>0.00233 % PER HOUR - 25% APR</h3>
                      </div>
                    </div>
                    <div className="staking_flip_card_front_body">
                      <ul className="staking_flip_card_front_list">
                        <li>
                          <span>Total Value Locked</span>{" "}
                          <VStack alignItems={"end"}>
                            <strong>
                              {formatCommas(totalStakeBalance)} KNDX
                            </strong>
                            {window.innerWidth < 768 ? (
                              <></>
                            ) : (
                              <>
                                {" "}
                                <Text color="#47AA34" as="i" fontSize="xs">
                                  ($
                                  {formatPrice(totalStakeBalance)})
                                </Text>
                              </>
                            )}
                          </VStack>
                        </li>
                        <li>
                          <span>Min. Lock</span>{" "}
                          <VStack alignItems={"end"}>
                            <strong>{formatCommas(minimumLocked)} KNDX</strong>
                            {window.innerWidth < 768 ? (
                              <></>
                            ) : (
                              <>
                                {" "}
                                <Text color="#47AA34" as="i" fontSize="xs">
                                  ($
                                  {formatPrice(minimumLocked)})
                                </Text>
                              </>
                            )}
                          </VStack>
                        </li>
                        <li>
                          <span>Currently Staked</span>
                          <VStack alignItems={"end"}>
                            <strong>
                              {formatCommas(totalValueStaked)} KNDX
                            </strong>
                            {window.innerWidth < 768 ? (
                              <></>
                            ) : (
                              <>
                                {" "}
                                <Text color="#47AA34" as="i" fontSize="xs">
                                  ($
                                  {formatPrice(totalValueStaked)})
                                </Text>
                              </>
                            )}
                          </VStack>
                        </li>
                      </ul>

                      <div>
                        {/* <Box
                        as="section"
                        py={{
                          base: "4",
                          md: "8",
                        }}
                      > */}
                        <SimpleGrid
                          columns={{
                            base: 1,
                            md: 3,
                          }}
                          gap={{
                            base: "5",
                            md: "5",
                          }}
                        >
                          {stats.map((stat, id) => (
                            <Stat key={id} {...stat} />
                          ))}
                        </SimpleGrid>
                        {/* </Box> */}
                      </div>

                      <div className="staking_flip_card_front_buttons">
                        <div className="staking_flip_card_front_reward">
                          <span>Total KNDX Claimed: </span>
                          <strong>
                            {formatCommas(totalRewardsClaimed)} KNDX
                          </strong>

                          {/* <div className="quick_links">
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x7ca5af5ba3472af6049f63c1abc324475d44efc1"
                          >
                            {" "}
                            Get KNDX <RiShareCircleFill />
                          </a>
                        </div> */}

                          <HStack pr={3}>
                            {" "}
                            <div className="quick_links">
                              <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://sepoliafaucet.com/"
                              >
                                {" "}
                                Faucet Sep ETH
                                <RiShareCircleFill />{" "}
                              </a>
                            </div>
                            <div className="quick_links">
                              <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://sepolia.etherscan.io/token/0x2fa9e338CFe579Ff4575BeD2e1Ea407e811F35bc#writeContract"
                              >
                                {" "}
                                Faucet KNDX
                                <RiShareCircleFill />{" "}
                              </a>
                            </div>
                          </HStack>

                          <HStack pr={3}>
                            <div className="quick_links">
                              <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://sepolia.etherscan.io/address/0x443525E4D78Dc29544CD30F097809d0Abe68DF32#writeContract"
                              >
                                {" "}
                                Faucet KNFT
                                <RiShareCircleFill />{" "}
                              </a>
                            </div>

                            <div className="quick_links">
                              <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://sepolia.etherscan.io/address/0x434fd7feec752c4bfa4a59d0272c503ffd313499#writeContract"
                              >
                                {" "}
                                Faucet FP
                                <RiShareCircleFill />{" "}
                              </a>
                            </div>
                          </HStack>
                        </div>

                        {colorMode === "light" ? (
                          <>
                            {" "}
                            <Button
                              style={{
                                width: "120px",
                                height: "40px",
                              }}
                              variant="solid"
                              onClick={handleFlip}
                            >
                              STAKE
                            </Button>
                          </>
                        ) : (
                          <>
                            {" "}
                            <Button
                              style={{
                                width: "120px",
                                height: "40px",
                              }}
                              variant="solid"
                              onClick={handleFlip}
                            >
                              STAKE
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* card back */}
                  <div className="staking_flip_card_back">
                    <div className="staking_flip_card_back_content active-shape">
                      <div className="staking_flip_card_back_overlay"></div>
                      <div className="staking_flip_card_front_headings">
                        <h2>
                          <span>
                            <img
                              style={{ height: "41px" }}
                              src={icon}
                              alt="icon"
                            />
                          </span>
                          {title}
                        </h2>
                        <div className="staking_apy">
                          {/* <h3>{rewardsRate} % PER HOUR - 25% APR</h3> */}
                          <h3>0.00233 % PER HOUR - 25% APR</h3>
                        </div>
                      </div>
                      <div className="staking_flip_card_back_body">
                        <div className="staking_flip_card_back_headings">
                          {unStake === true ? <h2>Unstake</h2> : <h2>Stake</h2>}

                          <button
                            className="staking_flip_card_close_btn"
                            onClick={() => setFlip(false)}
                          >
                            <img src={backIcon} alt="icon" />
                          </button>
                        </div>
                        <div className="staking_flip_card_back_body_inner">
                          <div className="staking_flip_card_front_list_approve">
                            <ul>
                              {/* <li>
                              <span>Total Staked </span>
                              <strong>{stakeInfo} KNDX</strong>
                            </li> */}
                              <li>
                                <span>Balance</span>{" "}
                                <strong>
                                  {formatCommas(walletBalance)} KNDX
                                </strong>
                              </li>
                            </ul>
                          </div>

                          <div className="staking_flip_card_back_form">
                            <form>
                              <span>
                                {unStake === true ? (
                                  <span>Unstake</span>
                                ) : (
                                  <span>Stake</span>
                                )}{" "}
                                Amount
                              </span>

                              <div className="staking_flip_card_back_form_input">
                                {window.innerWidth < 1280 ? (
                                  <>
                                    {" "}
                                    <VStack
                                      width={"100%"}
                                      alignItems={"center"}
                                      p={4}
                                    >
                                      <div>
                                        <Flex p={1.5}>
                                          <NumberInput
                                            allowMouseWheel
                                            defaultValue={formatCommasInput(
                                              stakeAmount
                                            )}
                                            onChange={(valueString) =>
                                              setStakeAmount(
                                                parseCommas(valueString)
                                              )
                                            }
                                            value={formatCommasInput(
                                              stakeAmount
                                            )}
                                            // ref={inputRef}
                                            min={0}
                                            max={walletBalance}
                                            // clampValueOnBlur={false}
                                          >
                                            <NumberInputField />
                                            <NumberInputStepper>
                                              <NumberIncrementStepper />
                                              <NumberDecrementStepper />
                                            </NumberInputStepper>
                                          </NumberInput>
                                        </Flex>

                                        <Spacer p={2} />

                                        <Button
                                          width={"100%"}
                                          onClick={() => stakeMin()}
                                        >
                                          MIN
                                        </Button>
                                        <Spacer p={1} />
                                        <Button
                                          width={"100%"}
                                          onClick={() => stakeMax()}
                                        >
                                          MAX
                                        </Button>
                                      </div>

                                      <Spacer p={2} />

                                      <div>
                                        {unStake === true ? (
                                          <></>
                                        ) : (
                                          <Select
                                            style={{ minWidth: "120px" }}
                                            bg="lightgrey"
                                            color="black"
                                            variant="outline"
                                            // placeholder="Duration"
                                            onChange={(e) =>
                                              setDurationChoice(e.target.value)
                                            }
                                          >
                                            <option
                                              selected
                                              hidden
                                              disabled
                                              value=""
                                            >
                                              Duration
                                            </option>
                                            <option value="0">
                                              30 days (0% boost)
                                            </option>
                                            <option value="1">
                                              90 days (1% boost)
                                            </option>
                                            <option value="2">
                                              180 days (3% boost)
                                            </option>
                                            <option value="3">
                                              365 days (9% boost)
                                            </option>
                                            <option value="4">2 minutes</option>
                                            <option value="5">24 hours</option>
                                            <option value="6">48 hours</option>
                                          </Select>
                                        )}
                                      </div>
                                    </VStack>
                                  </>
                                ) : (
                                  <>
                                    <Flex p={2}>
                                      <Flex justifyContent={"center"}>
                                        {" "}
                                        <NumberInput
                                          allowMouseWheel
                                          defaultValue={formatCommasInput(
                                            stakeAmount
                                          )}
                                          onChange={(valueString) =>
                                            setStakeAmount(
                                              parseCommas(valueString)
                                            )
                                          }
                                          value={formatCommasInput(stakeAmount)}
                                          // ref={inputRef}
                                          min={0}
                                          max={walletBalance}
                                          // clampValueOnBlur={false}
                                        >
                                          <NumberInputField />
                                          <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                          </NumberInputStepper>
                                        </NumberInput>
                                        {/* <input
                                        type="number"
                                        placeholder={stakeAmount}
                                        ref={inputRef}
                                        onChange={(e) =>
                                          setStakeAmount(e.target.value)
                                        }
                                      /> */}
                                      </Flex>
                                      <Spacer p={2} />

                                      <Button
                                        style={{
                                          width: "120px",
                                          height: "40px",
                                        }}
                                        onClick={() => stakeMin()}
                                      >
                                        MIN
                                      </Button>
                                      <Spacer p={1} />
                                      <Button
                                        style={{
                                          width: "120px",
                                          height: "40px",
                                        }}
                                        onClick={() => stakeMax()}
                                      >
                                        MAX
                                      </Button>

                                      <Spacer p={2} />

                                      <div>
                                        {unStake === true ? (
                                          <></>
                                        ) : (
                                          <Select
                                            style={{ minWidth: "120px" }}
                                            bg="lightgrey"
                                            color="black"
                                            variant="outline"
                                            // placeholder="Duration"
                                            onChange={(e) =>
                                              setDurationChoice(e.target.value)
                                            }
                                          >
                                            <option
                                              selected
                                              hidden
                                              disabled
                                              value=""
                                            >
                                              Duration
                                            </option>
                                            <option value="0">
                                              30 days (0% boost)
                                            </option>
                                            <option value="1">
                                              90 days (1% boost)
                                            </option>
                                            <option value="2">
                                              180 days (3% boost)
                                            </option>
                                            <option value="3">
                                              365 days (9% boost)
                                            </option>
                                            <option value="4">2 minutes</option>
                                            <option value="5">24 hours</option>
                                            <option value="6">48 hours</option>
                                          </Select>
                                        )}
                                      </div>
                                    </Flex>
                                  </>
                                )}
                              </div>
                            </form>
                          </div>
                        </div>

                        {window.innerWidth > 1280 ? (
                          <>
                            <div className="staking_flip_card_back_approve_btn">
                              {unStake === true ? (
                                <></>
                              ) : (
                                <>
                                  {clickedApprove === true ? (
                                    <>
                                      <Button
                                        variant="solid"
                                        // onClick={() => stakeTokens()}
                                      >
                                        <Spinner />
                                      </Button>
                                    </>
                                  ) : (
                                    <>
                                      {!isAuthenticated ? (
                                        <>
                                          {" "}
                                          {hasApproval === false ? (
                                            <>
                                              {" "}
                                              <Button
                                                variant="solid"
                                                onClick={() =>
                                                  stakeTokensCheck(stakeAmount)
                                                }
                                              >
                                                APPROVE STAKE
                                              </Button>
                                            </>
                                          ) : (
                                            <>
                                              <Button
                                                variant="solid"
                                                onClick={() =>
                                                  stakeTokensCheck(stakeAmount)
                                                }
                                              >
                                                STAKE
                                              </Button>
                                            </>
                                          )}
                                        </>
                                      ) : (
                                        <>
                                          {" "}
                                          {hasApproval === false ? (
                                            <>
                                              {" "}
                                              <Button
                                                variant="solid"
                                                onClick={() =>
                                                  stakeTokensCheck(stakeAmount)
                                                }
                                              >
                                                APPROVE STAKE
                                              </Button>
                                            </>
                                          ) : (
                                            <>
                                              <Button
                                                variant="solid"
                                                onClick={() =>
                                                  stakeTokensCheck(stakeAmount)
                                                }
                                              >
                                                STAKE
                                              </Button>
                                            </>
                                          )}
                                        </>
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="staking_flip_card_back_approve_btn_mobile">
                              {unStake === true ? (
                                <></>
                              ) : (
                                <>
                                  {clickedApprove === true ? (
                                    <>
                                      <Button
                                        variant="solid"
                                        // onClick={() => stakeTokens()}
                                      >
                                        <Spinner />
                                      </Button>
                                    </>
                                  ) : (
                                    <>
                                      {!isAuthenticated ? (
                                        <>
                                          {" "}
                                          {hasApproval === false ? (
                                            <>
                                              {" "}
                                              <Button
                                                variant="solid"
                                                onClick={() =>
                                                  stakeTokensCheck(stakeAmount)
                                                }
                                              >
                                                APPROVE STAKE
                                              </Button>
                                            </>
                                          ) : (
                                            <>
                                              <Button
                                                variant="solid"
                                                onClick={() =>
                                                  stakeTokensCheck(stakeAmount)
                                                }
                                              >
                                                STAKE
                                              </Button>
                                            </>
                                          )}
                                        </>
                                      ) : (
                                        <>
                                          {" "}
                                          {hasApproval === false ? (
                                            <>
                                              {" "}
                                              <Button
                                                variant="solid"
                                                onClick={() =>
                                                  stakeTokensCheck(stakeAmount)
                                                }
                                              >
                                                APPROVE STAKE
                                              </Button>
                                            </>
                                          ) : (
                                            <>
                                              <Button
                                                variant="solid"
                                                onClick={() =>
                                                  stakeTokensCheck(stakeAmount)
                                                }
                                              >
                                                STAKE
                                              </Button>
                                            </>
                                          )}
                                        </>
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* <Spacer p={5} /> */}

                {/* <StakingContainer /> */}

                {/* if user has stakes, show stakes */}
                {/* {stakesInfo.length > 0 ? (
              <>
                {" "}
                <Box
                  as="section"
                  py={{
                    base: "4",
                    md: "8",
                  }}
                >
                  <Container maxW="3xl">
                    <Box
                      bg="bg-surface"
                      boxShadow="sm"
                      borderRadius="lg"
                      p={{
                        base: "2",
                        md: "3",
                      }}
                    >
                      <Stack spacing="5" divider={<StackDivider />}>
                        <Stack spacing="1">
                          <Text fontSize="lg" fontWeight="medium">
                            Stakes
                          </Text>
                          <Text fontSize="sm" color="muted">
                            Your active stakes below:
                          </Text>
                        </Stack>
                        {stakesInfo.length > 0 &&
                          stakesInfo.map((stake, index) => {
                            return (
                              <>
                                {stake.stake > 0 || stake.rewards > 0 ? (
                                  <>
                                    <Box key={index}>
                                      <Accordion
                                        defaultIndex={[0]}
                                        allowMultiple
                                      >
                                        <AccordionItem>
                                          <h2>
                                            <AccordionButton
                                              _expanded={{
                                                bg: "purple",
                                                color: "white",
                                              }}
                                            >
                                              <Box
                                                key={index}
                                                as="span"
                                                flex="1"
                                                textAlign="left"
                                              >
                                                Stake {stake.stakeid}
                                              </Box>
                                              <AccordionIcon />
                                            </AccordionButton>
                                          </h2>
                                          <AccordionPanel key={index} pb={4}>
                                            <List spacing={3}>
                                              <ListItem>
                                                <ListIcon
                                                  as={BiCoin}
                                                  color="green.500"
                                                />
                                                Stake Amount: {stake.stake} KNDX
                                              </ListItem>
                                              <ListItem>
                                                <ListIcon
                                                  as={GiCoins}
                                                  color="green.500"
                                                />
                                                Stake Rewards: {stake.rewards}{" "}
                                                KNDX
                                              </ListItem>
                                              <ListItem>
                                                <ListIcon
                                                  as={BiTimeFive}
                                                  color="green.500"
                                                />
                                                Time Lock Ends: {stake.timelock}
                                              </ListItem>
                                            </List>

                                            <Spacer p={2} />

                                            <Box gap="1">
                                              <Flex
                                                minWidth="max-content"
                                                flexDirection={"column"}
                                                alignItems="center"
                                                gap="2"
                                              >
                                                <ButtonGroup gap="1">
                                                  <Button
                                                    flex="1"
                                                    colorScheme="orange"
                                                    onClick={() =>
                                                      stakeRewards(
                                                        stake.stakeid
                                                      )
                                                    }
                                                  >
                                                    stake rwds
                                                  </Button>

                                                  {stake.rewards > 0 ? (
                                                    <>
                                                      <Button
                                                        flex="1"
                                                        colorScheme="orange"
                                                        onClick={() =>
                                                          claimRewards(
                                                            stake.stakeid
                                                          )
                                                        }
                                                      >
                                                        claim rwds
                                                      </Button>
                                                    </>
                                                  ) : (
                                                    <></>
                                                  )}
                                                </ButtonGroup>

                                                <ButtonGroup gap={1}>
                                                  {stake.tlEpoch <
                                                    userDateValue &&
                                                  stake.stake > 0 ? (
                                                    <>
                                                      <Button
                                                        leftIcon={<MdBuild />}
                                                        flex="1"
                                                        colorScheme="orange"
                                                        onClick={() =>
                                                          withdrawTokens(
                                                            stake.stake,
                                                            stake.stakeid
                                                          )
                                                        }
                                                      >
                                                        unstake
                                                      </Button>
                                                    </>
                                                  ) : (
                                                    <></>
                                                  )}
                                                </ButtonGroup>
                                              </Flex>
                                            </Box>
                                          </AccordionPanel>
                                        </AccordionItem>
                                      </Accordion>
                                    </Box>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </>
                            );
                          })}
                      </Stack>
                    </Box>
                  </Container>
                </Box>
              </>
            ) : (
              <></>
            )} */}

                {/* When waiting for hash receipt */}
                {/* {inProcess === true &&
            stakeStatus === null &&
            verifiedStatus === false ? (
              <>
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
                      This may take a minute to be verified on the blockchain.{" "}
                    </p>
                  </Flex>
                </Alert>
              </>
            ) : (
              <></>
            )}

            {inProcess === true && verifiedStatus === true ? (
              <>
                <Alert
                  style={styles.confirm}
                  variant="success"
                  onClose={() => closeAll()}
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
                      <a
                        href={transHashLink}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          textAlign: "center",
                          fontFamily: "Rubiks, sans-serif",
                          fontWeight: "400",
                        }}
                      >
                        Congratulations! View on Etherscan.
                      </a>
                      You have successfully staked!
                    </Alert.Heading>

                    <Flex justifyContent="center">
                      <Button
                        onClick={() => closeAll()}
                        variant="outline-success"
                        style={{ color: color }}
                      >
                        Close
                      </Button>
                    </Flex>
                  </Flex>
                </Alert>
              </>
            ) : (
              <></>
            )}

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
                    Something went wrong. <br></br> .{" "}
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

            {needFunds === true && closeFundsStatus === false ? (
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
                    You need to add more funds in your wallet to start the
                    transaction.
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
            )} */}
              </>
            )}
          </Box>
        </Center>
        {/* This is table for Stakes */}
      </StakingItemStyleWrapper>

      {/* Table Container below */}
      <Container
        borderRadius={"0.5rem"}
        opacity="95%"
        w={"90vw"}
        py={{
          base: "4",
          md: "8",
        }}
        px={{
          base: "0",
          md: "0",
        }}
      >
        <Box
          bg={useColorModeValue("#5C5D6B", "#1e1f35")}
          color={useColorModeValue("white", "white")}
          boxShadow={useColorModeValue("sm", "sm-dark")}
          // boxShadow={{
          //   base: "sm",
          //   md: "sm",
          // }}
          borderRadius={{
            base: "lg",
            md: "lg",
          }}
        >
          {/* Table STACK */}
          <Stack spacing="5">
            <Box
              px={{
                base: "4",
                md: "6",
              }}
              pt="5"
            >
              <Stack
                direction={{
                  base: "column",
                  md: "row",
                }}
                justify="space-between"
              >
                <Text
                  color={useColorModeValue("white", "white")}
                  fontSize="lg"
                  fontWeight="medium"
                >
                  Stakes
                </Text>

                {refreshClicked === true ? (
                  <>
                    <IconButton
                      icon={<Spinner fontSize="1.25rem" />}
                      variant="ghost"
                      aria-label="Refresh Stakes"
                      // onClick={() => setRefreshTable(!refreshTable)}
                    />
                  </>
                ) : (
                  <>
                    <Tooltip label="Refresh User Data">
                      <IconButton
                        icon={<IoRefresh fontSize="1.25rem" />}
                        variant="ghost"
                        aria-label="Refresh Stakes"
                        onClick={() => refreshClickedFunc()}
                      />
                    </Tooltip>
                  </>
                )}

                {/* <InputGroup maxW="xs">
                <InputLeftElement pointerEvents="none">
                  <Icon as={FiSearch} color="muted" boxSize="5" />
                </InputLeftElement>
                <Input placeholder="Search" />
              </InputGroup> */}
              </Stack>
            </Box>

            <Box overflowX="auto">
              <Table
                borderRadius={"0.5rem"}
                // variant="striped"
                bg={useColorModeValue("#5C5D6B", "#1e1f35")}
              >
                <Thead>
                  <Tr>
                    <Th
                      bg={useColorModeValue("#5C5D6B", "#1e1f35")}
                      color={useColorModeValue("white", "white")}
                    >
                      <HStack spacing="3">
                        {/* <Checkbox /> */}
                        <HStack spacing="1">
                          <Text color={useColorModeValue("white", "white")}>
                            Stakes
                          </Text>
                          <Icon
                            as={IoArrowDown}
                            color={useColorModeValue("white", "white")}
                            boxSize="4"
                          />
                        </HStack>
                      </HStack>
                    </Th>
                    <Th
                      bg={useColorModeValue("#5C5D6B", "#1e1f35")}
                      color={useColorModeValue("white", "white")}
                    >
                      Status
                    </Th>
                    <Th
                      bg={useColorModeValue("#5C5D6B", "#1e1f35")}
                      color={useColorModeValue("white", "white")}
                    >
                      {" "}
                      <Icon as={BiCoin} color="green.500" /> Initial Stake
                    </Th>
                    <Th
                      bg={useColorModeValue("#5C5D6B", "#1e1f35")}
                      color={useColorModeValue("white", "white")}
                    >
                      {" "}
                      <Icon as={BiCoin} color="green.500" /> Compounded Stake
                    </Th>
                    <Th
                      bg={useColorModeValue("#5C5D6B", "#1e1f35")}
                      color={useColorModeValue("white", "white")}
                    >
                      {" "}
                      <Icon as={GiCoins} color="green.500" /> Est. Rewards
                    </Th>
                    <Th
                      bg={useColorModeValue("#5C5D6B", "#1e1f35")}
                      color={useColorModeValue("white", "white")}
                    >
                      <Icon as={BiTimeFive} color="green.500" /> Stake Progress
                    </Th>
                    <Th
                      bg={useColorModeValue("#5C5D6B", "#1e1f35")}
                      color={useColorModeValue("white", "white")}
                    >
                      <Icon as={BiTimeFive} color="green.500" /> Time Lock Ends
                    </Th>

                    <Th
                      bg={useColorModeValue("#5C5D6B", "#1e1f35")}
                      color={useColorModeValue("white", "white")}
                    >
                      Actions{" "}
                    </Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {!refreshTable && stakesInfo.length > 0 ? (
                    <>
                      {isFullyLoaded === true ? (
                        <>
                          {stakesInfo?.map((stake, index) => (
                            <Tr key={index}>
                              <Td>
                                <HStack spacing="3">
                                  <Box>
                                    <Text fontWeight="medium" color="white">
                                      {" "}
                                      Stake ID: {stake.stakeid}
                                    </Text>
                                  </Box>
                                </HStack>
                              </Td>
                              <Td>
                                {stake.stake <= 0.99 &&
                                stake.rewards <= 0.99 ? (
                                  <Badge
                                    variant="solid"
                                    size="sm"
                                    colorScheme={
                                      colorMode === "light" ? "pink" : "purple"
                                    }
                                  >
                                    completed
                                  </Badge>
                                ) : (
                                  <Badge
                                    size="sm"
                                    variant="solid"
                                    colorScheme={
                                      stake.status === "active" &&
                                      colorMode === "light"
                                        ? "cyan"
                                        : "teal"
                                    }
                                  >
                                    {stake.status}
                                  </Badge>
                                )}
                              </Td>
                              <Td>
                                <VStack>
                                  <Text color="white">
                                    {formatCommas(stake.stake)} KNDX
                                  </Text>

                                  <Text color="#47AA34" as="i" fontSize="xs">
                                    ($
                                    {formatPrice(stake.stake)})
                                  </Text>
                                </VStack>
                              </Td>
                              <Td>
                                <Text color="white">
                                  {formatCommas(stake.stakeCompound)} KNDX
                                </Text>
                              </Td>
                              <Td>
                                <VStack>
                                  <Badge variant="subtle" colorScheme={"green"}>
                                    <HStack spacing="1">
                                      <Icon as={FiArrowUpRight} />
                                      <Text>
                                        {" "}
                                        ${formatPriceRew(stake.rewards)}
                                      </Text>
                                    </HStack>
                                  </Badge>
                                </VStack>
                              </Td>

                              <Td>
                                {stake.tlEpoch - userDateValue > 0 ? (
                                  <>
                                    {/* <ProgressBar
                                      progress={calculatePercentage(
                                        stake.startTime,
                                        stake.endTime
                                      )}
                                    /> */}

                                    <Progress
                                      percent={calculatePercentage(
                                        stake.startTime,
                                        stake.endTime
                                      )}
                                      size="small"
                                    />
                                    {/* <ProgressBar
                                      width="100px"
                                      height="10px"
                                      rect
                                      fontColor="white"
                                      percentage={calculatePercentage(
                                        stake.startTime,
                                        stake.endTime
                                      )}
                                      rectPadding="1px"
                                      rectBorderRadius="20px"
                                      trackPathColor="transparent"
                                      bgColor="#333333"
                                      trackBorderColor="white"
                                    /> */}

                                    {/* <Progress
                                      hasStripe
                                      colorScheme="green"
                                      // isAnimated="true"
                                      aria-valuenow={calculatePercentage(
                                        stake.startTime,
                                        stake.endTime
                                      )}
                                      value={calculatePercentage(
                                        stake.startTime,
                                        stake.endTime
                                      )}
                                    /> */}
                                  </>
                                ) : (
                                  <>
                                    <Progress
                                      percent={calculatePercentage(
                                        stake.startTime,
                                        stake.endTime
                                      )}
                                      size="small"
                                    />
                                    {/* <ProgressBar
                                      width="100px"
                                      height="10px"
                                      rect
                                      fontColor="white"
                                      percentage={calculatePercentage(
                                        stake.startTime,
                                        stake.endTime
                                      )}
                                      rectPadding="1px"
                                      rectBorderRadius="20px"
                                      trackPathColor="transparent"
                                      bgColor="#333333"
                                      trackBorderColor="white"
                                    /> */}
                                  </>
                                )}
                              </Td>

                              <Td>
                                <Text color="white">
                                  {stake.timelock}
                                  {/* <Rating defaultValue={member.rating} size="xl" /> */}
                                </Text>
                              </Td>

                              <Td>
                                <HStack spacing="1">
                                  {/* {stake.rewards <= 0 ? (
                                    <>
                                      {" "}
                                      <IconButton
                                        icon={<BsDash fontSize="1.25rem" />}
                                        variant="ghost"
                                        aria-label=""
                                      />
                                    </>
                                  ) : (
                                    <>
                                      {stakeRewardsClicked === true &&
                                      stakeRewardsIndex === index ? (
                                        <>
                                          <IconButton
                                            icon={
                                              <Spinner fontSize="1.25rem" />
                                            }
                                            variant="ghost"
                                            aria-label="Stake Rewards"
                                            // onClick={() => setRefreshTable(!refreshTable)}
                                          />
                                        </>
                                      ) : (
                                        <>
                                          {" "}
                                          <Tooltip label="Stake Rewards">
                                            <IconButton
                                              icon={
                                                <FiRefreshCw fontSize="1.25rem" />
                                              }
                                              variant="ghost"
                                              aria-label="Stake Rewards"
                                              onClick={() =>
                                                stakeRewardsClickedFunc(
                                                  stake.stakeid,
                                                  index
                                                )
                                              }
                                            />
                                          </Tooltip>
                                        </>
                                      )}
                                    </>
                                  )} */}

                                  {stake.tlEpoch < userDateValue &&
                                  stake.stake > 0 ? (
                                    <>
                                      {stake.stake <= 0.99 &&
                                      stake.rewards <= 0.99 ? (
                                        <>
                                          {" "}
                                          <IconButton
                                            icon={<BsDash fontSize="1.25rem" />}
                                            variant="ghost"
                                            aria-label=""
                                          />
                                        </>
                                      ) : (
                                        <>
                                          {stake.rewards <= 0.99 ? (
                                            <>
                                              {" "}
                                              <IconButton
                                                icon={
                                                  <BsDash fontSize="1.25rem" />
                                                }
                                                variant="ghost"
                                                aria-label=""
                                              />
                                            </>
                                          ) : (
                                            <>
                                              {claimRewardsClicked === true &&
                                              claimRewardsIndex === index ? (
                                                <>
                                                  <IconButton
                                                    icon={
                                                      <Spinner fontSize="1.25rem" />
                                                    }
                                                    variant="ghost"
                                                    aria-label="Claim Rewards"
                                                  />
                                                </>
                                              ) : (
                                                <>
                                                  <Tooltip label="Claim Rewards">
                                                    <IconButton
                                                      icon={
                                                        <FiGift fontSize="1.25rem" />
                                                      }
                                                      variant="ghost"
                                                      aria-label="Claim Rewards"
                                                      onClick={() =>
                                                        claimRewardsClickedFunc(
                                                          stake.stakeid,
                                                          index
                                                        )
                                                      }
                                                    />
                                                  </Tooltip>
                                                </>
                                              )}
                                            </>
                                          )}
                                        </>
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      {" "}
                                      <IconButton
                                        icon={<BsDash fontSize="1.25rem" />}
                                        variant="ghost"
                                        aria-label=""
                                      />
                                    </>
                                  )}

                                  {stake.tlEpoch < userDateValue &&
                                  stake.stake > 0 ? (
                                    <>
                                      {unstakeClicked === true &&
                                      unstakeIndex === index ? (
                                        <>
                                          <IconButton
                                            icon={
                                              <Spinner fontSize="1.25rem" />
                                            }
                                            variant="ghost"
                                            aria-label="Stake Rewards"
                                            // FULLY DONE WITH STAKING
                                          />
                                        </>
                                      ) : (
                                        <>
                                          <Tooltip label="Unstake">
                                            <IconButton
                                              icon={
                                                <FiUnlock fontSize="1.25rem" />
                                              }
                                              variant="ghost"
                                              aria-label="Unstake"
                                              onClick={() =>
                                                unstakeClickedFunc(
                                                  stake.stake,
                                                  stake.stakeid,
                                                  index
                                                )
                                              }
                                            />
                                          </Tooltip>
                                        </>
                                      )}{" "}
                                    </>
                                  ) : (
                                    <>
                                      {stake.stake <= 0.99 &&
                                      stake.rewards <= 0.99 ? (
                                        <>
                                          {" "}
                                          <IconButton
                                            icon={<BsDash fontSize="1.25rem" />}
                                            variant="ghost"
                                            aria-label=""
                                          />
                                        </>
                                      ) : (
                                        <>
                                          <Tooltip label="Unstake Early">
                                            <IconButton
                                              icon={
                                                <FiUnlock fontSize="1.25rem" />
                                              }
                                              variant="ghost"
                                              aria-label="Unstake Early"
                                              onClick={() =>
                                                unstakeEarlyClickedFunc(
                                                  stake.stake,
                                                  stake.stakeid,
                                                  index
                                                )
                                              }
                                            />
                                          </Tooltip>
                                        </>
                                      )}
                                    </>
                                  )}
                                </HStack>
                              </Td>
                            </Tr>
                          ))}
                        </>
                      ) : (
                        <>
                          {/* <Stack>
                            <Skeleton height="20px" />
                            <Skeleton height="20px" />
                            <Skeleton height="20px" />
                          </Stack> */}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {isFullyLoaded === true ? (
                        <>
                          {stakesInfo?.map((stake, index) => (
                            <Tr key={index}>
                              <Td>
                                <HStack spacing="3">
                                  <Box>
                                    <Text fontWeight="medium" color="white">
                                      {" "}
                                      Stake ID: {stake.stakeid}
                                    </Text>
                                    {/* <Text color="muted">{member.handle}</Text> */}
                                  </Box>
                                </HStack>
                              </Td>
                              <Td>
                                {stake.stake <= 0.99 &&
                                stake.rewards <= 0.99 ? (
                                  <Badge
                                    variant="solid"
                                    size="sm"
                                    colorScheme={
                                      colorMode === "light" ? "pink" : "purple"
                                    }
                                  >
                                    completed
                                  </Badge>
                                ) : (
                                  <Badge
                                    size="sm"
                                    variant="solid"
                                    colorScheme={
                                      stake.status === "active" &&
                                      colorMode === "light"
                                        ? "cyan"
                                        : "teal"
                                    }
                                  >
                                    {stake.status}
                                  </Badge>
                                )}
                              </Td>
                              <Td>
                                <VStack>
                                  <Text color="white">
                                    {formatCommas(stake.stake)} KNDX
                                  </Text>

                                  <Text color="#47AA34" as="i" fontSize="xs">
                                    ($
                                    {formatPrice(stake.stake)})
                                  </Text>
                                </VStack>
                              </Td>
                              <Td>
                                <Text color="white">
                                  {formatCommas(stake.stakeCompound)} KNDX
                                </Text>
                              </Td>
                              <Td>
                                <VStack>
                                  <Badge variant="subtle" colorScheme={"green"}>
                                    <HStack spacing="1">
                                      <Icon as={FiArrowUpRight} />
                                      <Text>
                                        {" "}
                                        ${formatPriceRew(stake.rewards)}
                                      </Text>
                                    </HStack>
                                  </Badge>
                                </VStack>
                              </Td>

                              <Td>
                                {stake.tlEpoch - userDateValue > 0 ? (
                                  <>
                                    {/* <ProgressBar
                                      progress={calculatePercentage(
                                        stake.startTime,
                                        stake.endTime
                                      )}
                                    /> */}

                                    <Progress
                                      percent={calculatePercentage(
                                        stake.startTime,
                                        stake.endTime
                                      )}
                                      size="small"
                                    />

                                    {/* <ProgressBar
                                      width="100px"
                                      height="10px"
                                      rect
                                      fontColor="white"
                                      percentage={calculatePercentage(
                                        stake.startTime,
                                        stake.endTime
                                      )}
                                      rectPadding="1px"
                                      rectBorderRadius="20px"
                                      trackPathColor="transparent"
                                      bgColor="#333333"
                                      trackBorderColor="white"
                                    /> */}

                                    {/* <Progress
                                      hasStripe
                                      colorScheme="green"
                                      // isAnimated="true"
                                      aria-valuenow={calculatePercentage(
                                        stake.startTime,
                                        stake.endTime
                                      )}
                                      value={calculatePercentage(
                                        stake.startTime,
                                        stake.endTime
                                      )}
                                    /> */}
                                  </>
                                ) : (
                                  <>
                                    <Progress
                                      percent={calculatePercentage(
                                        stake.startTime,
                                        stake.endTime
                                      )}
                                      size="small"
                                    />
                                    {/* <ProgressBar
                                      width="100px"
                                      height="10px"
                                      rect
                                      fontColor="white"
                                      percentage={calculatePercentage(
                                        stake.startTime,
                                        stake.endTime
                                      )}
                                      rectPadding="1px"
                                      rectBorderRadius="20px"
                                      trackPathColor="transparent"
                                      bgColor="#333333"
                                      trackBorderColor="white"
                                    /> */}
                                  </>
                                )}
                              </Td>
                              <Td>
                                <Text color="white">
                                  {stake.timelock}
                                  {/* <Rating defaultValue={member.rating} size="xl" /> */}
                                </Text>
                              </Td>

                              <Td>
                                <HStack spacing="1">
                                  {/* {stake.rewards <= 0 ? (
                                    <>
                                      {" "}
                                      <IconButton
                                        icon={<BsDash fontSize="1.25rem" />}
                                        variant="ghost"
                                        aria-label=""
                                      />
                                    </>
                                  ) : (
                                    <>
                                      {stakeRewardsClicked === true ? (
                                        <>
                                          <IconButton
                                            icon={
                                              <Spinner fontSize="1.25rem" />
                                            }
                                            variant="ghost"
                                            aria-label="Stake Rewards"
                                            // onClick={() => setRefreshTable(!refreshTable)}
                                          />
                                        </>
                                      ) : (
                                        <>
                                          {" "}
                                          <Tooltip label="Stake Rewards">
                                            <IconButton
                                              icon={
                                                <FiRefreshCw fontSize="1.25rem" />
                                              }
                                              variant="ghost"
                                              aria-label="Stake Rewards"
                                              onClick={() =>
                                                stakeRewardsClickedFunc(
                                                  stake.stakeid,
                                                  index
                                                )
                                              }
                                            />
                                          </Tooltip>
                                        </>
                                      )}
                                    </>
                                  )} */}

                                  {stake.tlEpoch < userDateValue &&
                                  stake.stake > 0 ? (
                                    <>
                                      {stake.stake <= 0.99 &&
                                      stake.rewards <= 0.99 ? (
                                        <>
                                          {" "}
                                          <IconButton
                                            icon={<BsDash fontSize="1.25rem" />}
                                            variant="ghost"
                                            aria-label=""
                                          />
                                        </>
                                      ) : (
                                        <>
                                          {stake.rewards <= 0.99 ? (
                                            <>
                                              {" "}
                                              <IconButton
                                                icon={
                                                  <BsDash fontSize="1.25rem" />
                                                }
                                                variant="ghost"
                                                aria-label=""
                                              />
                                            </>
                                          ) : (
                                            <>
                                              {claimRewardsClicked === true &&
                                              claimRewardsIndex === index ? (
                                                <>
                                                  <IconButton
                                                    icon={
                                                      <Spinner fontSize="1.25rem" />
                                                    }
                                                    variant="ghost"
                                                    aria-label="Claim Rewards"
                                                  />
                                                </>
                                              ) : (
                                                <>
                                                  <Tooltip label="Claim Rewards">
                                                    <IconButton
                                                      icon={
                                                        <FiGift fontSize="1.25rem" />
                                                      }
                                                      variant="ghost"
                                                      aria-label="Claim Rewards"
                                                      onClick={() =>
                                                        claimRewardsClickedFunc(
                                                          stake.stakeid,
                                                          index
                                                        )
                                                      }
                                                    />
                                                  </Tooltip>
                                                </>
                                              )}
                                            </>
                                          )}
                                        </>
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      {" "}
                                      <IconButton
                                        icon={<BsDash fontSize="1.25rem" />}
                                        variant="ghost"
                                        aria-label=""
                                      />
                                    </>
                                  )}

                                  {stake.tlEpoch < userDateValue &&
                                  stake.stake > 0 ? (
                                    <>
                                      {unstakeClicked === true &&
                                      unstakeIndex === index ? (
                                        <>
                                          <IconButton
                                            icon={
                                              <Spinner fontSize="1.25rem" />
                                            }
                                            variant="ghost"
                                            aria-label="Stake Rewards"
                                            // onClick={() => setRefreshTable(!refreshTable)}
                                          />
                                        </>
                                      ) : (
                                        <>
                                          <Tooltip label="Unstake">
                                            <IconButton
                                              icon={
                                                <FiUnlock fontSize="1.25rem" />
                                              }
                                              variant="ghost"
                                              aria-label="Unstake"
                                              onClick={() =>
                                                unstakeClickedFunc(
                                                  stake.stake,
                                                  stake.stakeid,
                                                  index
                                                )
                                              }
                                            />
                                          </Tooltip>
                                        </>
                                      )}{" "}
                                    </>
                                  ) : (
                                    <>
                                      {stake.stake <= 0.99 &&
                                      stake.rewards <= 0.99 ? (
                                        <>
                                          {" "}
                                          <IconButton
                                            icon={<BsDash fontSize="1.25rem" />}
                                            variant="ghost"
                                            aria-label=""
                                          />
                                        </>
                                      ) : (
                                        <>
                                          <Tooltip label="Unstake Early">
                                            <IconButton
                                              icon={
                                                <FiUnlock fontSize="1.25rem" />
                                              }
                                              variant="ghost"
                                              aria-label="Unstake Early"
                                              onClick={() =>
                                                unstakeEarlyClickedFunc(
                                                  stake.stake,
                                                  stake.stakeid,
                                                  index
                                                )
                                              }
                                            />
                                          </Tooltip>
                                        </>
                                      )}
                                    </>
                                  )}
                                </HStack>
                              </Td>
                            </Tr>
                          ))}
                        </>
                      ) : (
                        <>
                          {" "}
                          {/* <Stack>
                            <Skeleton height="20px" />
                            <Skeleton height="20px" />
                            <Skeleton height="20px" />
                          </Stack> */}
                        </>
                      )}
                    </>
                  )}
                </Tbody>
              </Table>
            </Box>

            <Box
              px={{
                base: "4",
                md: "6",
              }}
              pb="5"
            >
              <HStack spacing="3" justify="space-between">
                {/* {!isMobile && (
                <Text color="muted" fontSize="sm">
                  Showing 1 to 5 of 42 results
                </Text>
              )} */}
                <ButtonGroup
                  spacing="3"
                  justifyContent="space-between"
                  width={{
                    base: "full",
                    md: "auto",
                  }}
                  variant="secondary"
                ></ButtonGroup>
              </HStack>
            </Box>
          </Stack>
        </Box>
      </Container>

      <Spacer />

      <Box
        bg={useColorModeValue("#5C5D6B", "#1e1f35")}
        color={useColorModeValue("white", "white")}
        boxShadow={useColorModeValue("sm", "sm-dark")}
        // boxShadow={{
        //   base: "sm",
        //   md: "sm",
        // }}
        borderColor="transparent"
        borderRadius={{
          base: "lg",
          md: "lg",
        }}
      >
        <Accordion
          borderColor="transparent"
          defaultIndex={[0]}
          allowMultiple
          allowToggle
        >
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box color="white" flex="1" textAlign="left">
                  How to test stake
                </Box>
                <AccordionIcon color="white" />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text fontSize="sm" color="white" fontWeight="small">
                1. Connect wallet to Sepolia Testnet (make sure to turn on
                Testnets in MM).
                <br></br>2. Faucet some test Sepolia ETH. (Click link above,
                need to sign up for service. )<br></br>3. Faucet test KNDX from
                Etherscan. (Click link above, connect test wallet to Etherscan,
                Go to 9. faucet and write. Wait for verification.)
                <br></br> 4. Faucet some test KNFTs (Click link above, go to 5.
                faucetBonus and enter a number between 2-5 to set bonus
                parameter and write. Wait for verification.).
                <br></br> 5. Faucet a test FP (Click link above, go to 2. faucet
                and write. Wait for verification.).
                <br></br> 6. Create a stake in dApp (Enter amount and duration).
                <br></br> 7. Approve token permission with staking contract.
                Wait for verification.
                <br></br> 8. Approve stake function with staking contract. Wait
                for verification.
              </Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </>
  );
};

export default StakingItem;
