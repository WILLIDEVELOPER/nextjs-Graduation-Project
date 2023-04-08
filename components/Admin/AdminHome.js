import React, { useContext, useEffect } from "react";
import NavBar from "./Context/NavBar";
import Content from "./Context/Content";
import { appContext } from "@/Context/AppContext";

export default function AdminHome() {
  const { setAdminLogged, setToken, token } = useContext(appContext);

  useEffect(() => {
    const adminData = localStorage.getItem("admin")
    const tokenData = localStorage.getItem("token")
    if (adminData && tokenData) {
      setAdminLogged(JSON.parse(adminData));
      setToken(tokenData);
    }

    
  }, [])
  

  return (
    <div className="flex justify-between bg-[#242233]">
      <Content />
      <NavBar />
    </div>
  );
}
