import { useState, createContext, useContext, useEffect } from "react";

const StreamfiProviderContext = createContext();

export function useStreamfiProvider() {
  return useContext(StreamfiProviderContext);
}

// verified on goerli testnet
// //////////////////////////

// streamfi contract
// https://goerli.etherscan.io/address/0xc343137bfb99085a94d29fdb7a96684182cab23d

// transferNFT contract
// https://goerli.etherscan.io/address/0x572b2fc736eb623bb1e291ec386289145a7659f3

// gem contract
// https://goerli.etherscan.io/address/0x4b342781ecdbe64aa0097b44e99e02f37f411f80

export default function StreamfiProvider({ children }) {
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

  const value = { account };

  return (
    <StreamfiProviderContext.Provider value={value}>
      {children}
    </StreamfiProviderContext.Provider>
  );
}
