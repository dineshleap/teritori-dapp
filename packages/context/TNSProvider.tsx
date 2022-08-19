import React, { createContext, useContext, useState } from "react";

interface DefaultValue {
  name: string;
  setName: (name: string) => void;
}
const defaultValue: DefaultValue = {
  name: "",
  setName: undefined,
};

const TNSContext = createContext(defaultValue);

export const TNSContextProvider: React.FC = ({ children }) => {
  // The entered name
  const [name, setName] = useState("");

  return (
    <TNSContext.Provider
      value={{
        name,
        setName,
      }}
    >
      {children}
    </TNSContext.Provider>
  );
};

export const useTNS = () => useContext(TNSContext);
