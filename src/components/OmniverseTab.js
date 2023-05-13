import {
  Heading,
  Stack,
  Container,
  useBreakpointValue,
  Button,
  Input,
  Text,
} from "@chakra-ui/react";
import image from "../components/Staking/images/bg/HLX2.png";
import { useMoralis } from "react-moralis";
import { useState, useRef, useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import axios from "axios";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import {
  contractABI5,
  contractAddress5,
} from "../components/Contract/KNFTContract";

export function OmniverseTab() {
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

  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const [profileId, setProfileId] = useState(null);
  const [secretValue, setSecretValue] = useState(null);
  // this is where boost is getting pushed
  const [userKNFTAPR, setUserKNFTAPR] = useState([]);
  const [userKNFTdatainit, setUserKNFTdatainit] = useState([]);
  const [userKNFTdatanew, setUserKNFTdatanew] = useState([]);
  const [newUserKNFTdata, setNewUserKNFTdata] = useState([]);
  const [userKNFTAmount, setUserKNFTAmount] = useState(0);

  function setSecretFunc(string) {
    // let stringValue = string.toString();
    // console.log(string);
    setSecretValue(string);
    // console.log(secretValue);
  }

  // Gets KNFT Info from user
  async function getKNFTDatainit() {
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
          console.log("This is response data", response);

          if (
            (typeof response !== undefined || response !== null) &&
            response.data.result.length > 0
          ) {
            //cache data to local
            let dat = response.data.result;
            console.log("This is inside dat", dat);
            setUserKNFTdatainit(null);

            userKNFTdatainit.push(dat);

            console.log("Cached KNFT init", userKNFTdatainit);
          } else {
            console.log("Did not cached KNFT");
            return;
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }

  async function getKNFTDatanew() {
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
          console.log("This is new response data", response);

          if (
            (typeof response !== undefined || response !== null) &&
            response.data.result.length > 0
          ) {
            //cache data to local
            let dat = response.data.result;
            console.log("This is inside new dat", dat);
            setUserKNFTdatanew(null);
            userKNFTdatanew.push(dat);

            console.log("Cached KNFT new", userKNFTdatanew);
          } else {
            console.log("Did not cached KNFT");
            return;
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }

  async function getKNFTBoost(uniqueID) {
    if (user === null) {
      // console.log("No eth address");
      return;
    } else {
      try {
        // const ethAddress = user.get("ethAddress");

        // Stake function from contract ABI
        const sendOptions = {
          chain: chainId,
          contractAddress: contractAddress5,
          functionName: "readGen",
          abi: contractABI5,
          to: contractAddress5,
          params: {
            _tokenID: uniqueID,
            startIndex: 1,
            endIndex: 2,
          },
        };

        const knftInfo = await Moralis.executeFunction(sendOptions);

        // console.log("THIS IS knftInfo", knftInfo);

        let boost = parseInt(knftInfo._hex);

        const addBoostToData = (tokenId, boostValue) => {
          // Find the object with the specified tokenId
          let obj = { token_id: tokenId, boost: boostValue };
          newUserKNFTdata.push(obj);

          console.log("This is newUserKNFTdata", newUserKNFTdata);
        };

        addBoostToData(uniqueID, boost); // 5
      } catch (err) {}
    }
  }

  // Checks stakesinfo
  useEffect(() => {
    if (user === null) {
      console.log("Got fail");
      return;
    } else {
      getKNFTDatainit(); // knftData
      const updatedAPR = userKNFTdatainit.forEach((element) => {
        getKNFTBoost(element.token_id);
      });
      console.log("Got statesInfo");
    }
  }, []);

  // Calculates Boost for KNFT
  useEffect(() => {
    if (user === null) {
      return;
    } else {
      console.log("INIT USEFECT");

      const fetchKNFTBoost = async () => {
        console.log("FETBOOST INNER USEFECT");
        // Resets KNFT APR Array
        setNewUserKNFTdata([]);
        await getKNFTDatanew();
        // await getFPData();

        if (userKNFTdatainit === userKNFTdatanew) {
          console.log("DOESNOT EQUAL");
          const updatedAPR = userKNFTdatanew.forEach((element) => {
            getKNFTBoost(element.token_id);
          });
        } else {
          if (userKNFTdatainit) {
            console.log("INIT EQUAL");
            const updatedAPR = userKNFTdatainit.forEach((element) => {
              getKNFTBoost(element.token_id);
            });
          } else {
            return;
          }
        }
      };

      if (typeof userKNFTdatainit !== undefined && userKNFTdatainit !== null) {
        console.log("IN MAIN FETBOOST USEFECT");
        fetchKNFTBoost();
      } else {
        console.log("RETURRRRRN");
        return;
      }
    }
  }, [userKNFTdatainit]);

  useEffect(() => {
    // When a user disconnects, clear stakes info
    Moralis.onAccountChanged(function (address) {
      setUserKNFTdatainit(null);
      setUserKNFTdatanew(null);
      setNewUserKNFTdata([]);
    });

    if (user === null) {
      setUserKNFTdatainit(null);
      setUserKNFTdatanew(null);
      setNewUserKNFTdata([]);
    } else {
      return;
    }
  }, [user]);

  async function login() {
    if (user === null) {
      return;
    } else {
      if (isConnected) {
        await disconnectAsync();
      }

      const { account, chain } = await connectAsync({
        connector: new MetaMaskConnector(),
      });

      // let ethAddress = user.get("ethAddress");
      console.log("This is before stringdata", newUserKNFTdata);
      let stringdata = JSON.stringify(newUserKNFTdata);

      console.log("This is stringdata", stringdata);
      const { data } = await axios.get(
        `http://localhost:3005/requestChallenge`,
        {
          params: {
            address: account,
            chainId: "11155111",
            secret: secretValue,
            knftdata: stringdata,
          },
        }
      );

      const message = data.message;

      console.log(message);

      const signature = await signMessageAsync({ message });

      console.log(signature);

      const verification = await axios.get(
        `http://localhost:3005/verifyChallenge`,
        {
          params: {
            message: message,
            signature: signature,
            address: account,
            chainId: "11155111",
            secret: secretValue,
            knftdata: stringdata,
          },
        }
      );

      setProfileId(verification?.data?.profileId);
    }
  }

  return (
    <Scrollbars>
      <Stack
        spacing={{
          base: "8",
          lg: "6",
        }}
        style={{
          backgroundImage: `url(${image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Stack
          spacing="4"
          direction={{
            base: "column",
            lg: "row",
          }}
          justify="center"
        >
          <Stack spacing="4" padding={8}>
            <Heading
              p={useBreakpointValue({
                base: "0",
                lg: "4",
              })}
              size={useBreakpointValue({
                base: "xs",
                lg: "lg",
              })}
              fontWeight="medium"
              color="white"
            >
              Omniverse Bridge
            </Heading>

            <Text color="white">NVIDIA Omniverse Web3 Authentication 🔒</Text>
            <Input
              variant="outline"
              placeholder="Enter secret from Omniverse client here"
              color={"black"}
              onChange={(e) => setSecretFunc(e.target.value)}
            />

            {profileId ? (
              <>
                <h3 color="white">Profile ID: {profileId}</h3>
                <Button onClick={() => setProfileId(null)}>Logout</Button>
              </>
            ) : (
              <Button onClick={login}>Connect to Omniverse Instance</Button>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Scrollbars>
  );
}
