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
    if (getId == "home") {
      setContentId("home");
    } else if (getId == "about") {
      setContentId("about");
    } else if (getId == "contact-us") {
      setContentId("contact-us");
    } else {
      setContentId("");
    }
  };

  return <appContext.Provider value={{contentId, handleNav}}>{children}</appContext.Provider>;
};
