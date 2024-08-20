import { createContext, useState } from "react";
import { useContext } from "react";
const myContext = createContext();

export const ContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <myContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </myContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(myContext);
};
