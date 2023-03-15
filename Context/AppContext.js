import axios from "axios";
import { useRouter } from "next/router";
import { createContext } from "react";
import { useState, useEffect } from "react";

export const appContext = createContext();

export const AppProvider = ({ children }) => {
  //variables

  const [contentId, setContentId] = useState("home")
  const handleNav = (e) => {
    let getId = e.target.id;
    setContentId(getId)
  };

  return <appContext.Provider value={{contentId, handleNav}}>{children}</appContext.Provider>;
};
