import axios from "axios";
import { useRouter } from "next/router";
import { createContext } from "react";
import { useState, useEffect } from "react";

export const appContext = createContext();

export const AppProvider = ({ children }) => {
  //variables

  return <appContext.Provider value={{}}>{children}</appContext.Provider>;
};
