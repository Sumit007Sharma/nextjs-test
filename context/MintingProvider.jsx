import { createContext, useContext, useState } from "react";

const MintingProviderContext = createContext();

// EDITION DETAILS HERE
const editionDetailsData = {
  songName: "",
  description: "",
  editionSize: "",
  price: "",
  images: "",
  audio: "",
};

// MINTING CREATOR DETAILS
const mintingCreatorData = {
  performers: "",
  songWriters: "",
  producers: "",
  others: "",
};

// HIDDEN GYM DETAILS
const hiddenGymData = {
  editionName: "",
  description: "",
  file: "",
  gemGenerated: "",
};

export function useMintingProvider() {
  return useContext(MintingProviderContext);
}

export default function MintingProvider({ children }) {
  // EDITION DETAILS HERE
  const [editionDetails, setEditionDetails] = useState(editionDetailsData);

  // MINTING DETAILS HERE
  const [mintingCreator, setMintingCreator] = useState(mintingCreatorData);

  // HIDEN GYM  DETAILS HERE
  const [gymDetails, setGymDetails] = useState(hiddenGymData);

  const value = {
    editionDetails,
    setEditionDetails,
    mintingCreator,
    setMintingCreator,
    gymDetails,
    setGymDetails,
  };

  return (
    <MintingProviderContext.Provider value={value}>
      {children}
    </MintingProviderContext.Provider>
  );
}
