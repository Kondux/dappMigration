import { ContactsOutlined } from "@ant-design/icons";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useEffect, useState, useMemo } from "react";
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";
import { useIPFS } from "./useIPFS";

export const useNFTTokenIds = (addr, limit = 10) => {
  const { token } = useMoralisWeb3Api();
  const { chainId } = useMoralisDapp();
  const { resolveLink } = useIPFS();
  const [totalNFTs, setTotalNFTs] = useState();
  const [fetchSuccess, setFetchSuccess] = useState(true);
  const getAllTokenIdsOpts = {
    chain: chainId,
    address: addr,
    limit: limit,
  };

  const {
    fetch: getNFTTokenIds,
    data,
    error,
    isLoading,
    isFetching,
  } = useMoralisWeb3ApiCall(token.getAllTokenIds, getAllTokenIdsOpts, {
    autoFetch: !!token && addr !== "explore",
  });

  // useEffect(() => {
  //   async function asyncSetTokenIds() {
  //     if (data?.result) {
  //       const NFTs = data.result;
  //       setTotalNFTs(data.total);
  //       setFetchSuccess(true);

  //       for (let NFT of NFTs) {
  //         if (NFT?.metadata) {
  //           NFT.metadata = JSON.parse(NFT.metadata);
  //           NFT.image = resolveLink(NFT.metadata?.image);
  //         } else if (NFT?.token_uri) {
  //           // try {
  //           //   await fetch(NFT.token_uri)
  //           //     .then((response) => response.json())
  //           //     .then((data) => {
  //           //       NFT.image = resolveLink(data.image);
  //           //     });
  //           // } catch (error) {
  //           //   setFetchSuccess(false);

  //           /*          !!Temporary work around to avoid CORS issues when retrieving NFT images!!
  //             Create a proxy server as per https://dev.to/terieyenike/how-to-create-a-proxy-server-on-heroku-5b5c
  //             Replace <your url here> with your proxy server_url below
  //             Remove comments :) */

  //           try {
  //             await fetch(
  //               `https://immense-brushlands-70914.herokuapp.com/${NFT.token_uri}`
  //             )
  //               .then((response) => response.json())
  //               .then((data) => {
  //                 NFT.image = resolveLink(data.image);
  //               });
  //           } catch (error) {
  //             setFetchSuccess(false);
  //           }
  //         }
  //       }
  //       setNFTTokenIds(NFTs);
  //       console.log(data);
  //     } else {
  //       console.log(data);
  //     }
  //   }

  //   asyncSetTokenIds();
  // }, [data]);

  //   return {
  //     getNFTTokenIds,
  //     NFTTokenIds,
  //     totalNFTs,
  //     fetchSuccess,
  //     error,
  //     isLoading,
  //   };
  // };

  const NFTTokenIds = useMemo(() => {
    console.log("fetching tokenIds data");
    if (!data?.result || !data?.result.length) {
      return data;
    }
    const formattedResult = data.result.map((nft) => {
      try {
        if (nft.metadata) {
          const metadata = JSON.parse(nft.metadata);
          const image = resolveLink(metadata?.image);
          return { ...nft, image, metadata };
        }
      } catch (error) {
        return nft;
      }
      return nft;
    });

    return { ...data, result: formattedResult };
  }, [data]);

  return { getNFTTokenIds, data: NFTTokenIds, error, isLoading, isFetching };
};
