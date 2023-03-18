"use client";

import { useEffect, useState } from "react";
import {
  streamfiABI,
  streamfiContractAddress,
} from "../context/abis/streamfiABI";
import { ethers } from "ethers";

export default function Home() {
  const [account, setAccount] = useState("");

  useEffect(() => {
    async function connectWithMetaMask() {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      }
    }
    connectWithMetaMask();
  }, []);

  const createNFTHandler = async () => {
    // If wallet not connected
    if (typeof window.ethereum === undefined)
      alert("Please connect your wallet!");
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner();

    const streamfiContract = new ethers.Contract(
      streamfiContractAddress,
      streamfiABI,
      provider
    );

    async function getGasPrice() {
      let feeData = (await provider.getGasPrice()).toNumber();
      return feeData;
    }

    async function getNonce(signer) {
      let nonce = await provider.getTransactionCount(account);
      return nonce;
    }

    try {
      const nonce = await getNonce(account);
      const gasFee = await getGasPrice();
      // uint256 price, string memory coverImage, string memory audioFile,
      // string memory name, uint BPM, string memory songKey, string memory genre,
      // string memory description, uint editionSize
      let rawTxn = await streamfiContract.populateTransaction.safeMint(
        23,
        "23",
        "hola there",
        "check this out",
        232,
        "121",
        "hola",
        "hi there",
        242,
        { gasPrice: gasFee, nonce: nonce }
      );
      console.log(
        "...Submitting transaction with gas price of:",
        ethers.utils.formatUnits(gasFee, "gwei"),
        " - & nonce:",
        nonce
      );
      let signedTxn = await signer.sendTransaction(rawTxn);
      let reciept = await signedTxn.wait();
      if (reciept) {
        console.log(
          "Transaction is successful!!!" + "\n" + "Transaction Hash:",
          signedTxn.hash +
            "\n" +
            "Block Number: " +
            reciept.blockNumber +
            "\n" +
            "Navigate to https://polygonscan.com/tx/" +
            signedTxn.hash,
          "to see your transaction"
        );
      } else {
        console.log("Error submitting transaction");
      }
    } catch (e) {
      console.log(e);
    }
    // const walletAddr = "0x0aF1d6ea82adeb637f31F5a6e0cE3049AA3f8B28";
    // const nonce = await provider.getTransactionCount(walletAddr);
    // let gasFee = await provider.getFeeData();

    // // The symbol name for the token
    // const sym = await streamfiContract.symbol();

    // gasFee = toNumber(gasFee.gasPrice);

    // // await signer.sendTransaction(tx);
    // const data = {
    //   price: "23",
    //   time: "23",
    //   coverImage: "hola there",
    //   audioFile: "check this out",
    //   name: "hola there",
    //   BPM: 121,
    //   songKey: "hola",
    //   genre: "hi there",
    //   description: "test description",
    //   editionSize: 89,
    // };

    // let rawTx = streamfiContract.emit("safeMint", [
    //   "23",
    //   "23",
    //   "hola there",
    //   "check this out",
    //   "hola there",
    //   121,
    //   "hola",
    //   "hi there",
    //   "test description",
    //   89,
    // ]);

    // console.log("test");
    // await signer.sendTransaction(rawTx);

    // // await streamfiContract.safeMint.populateTransaction(
    // //   walletAddr,
    // //   data,
    // //   {
    // //     gasPrice: gasFee,
    // //     nonce: nonce,
    // //   }
    // // );

    // await rawTx.wait();

    // console.log({ streamfiContract });
  };
  return (
    <div>
      <button onClick={createNFTHandler}>Mint NFT</button>
    </div>
  );
}
