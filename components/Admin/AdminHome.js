import React, { useContext, useEffect } from "react";
import NavBar from "./Context/NavBar";
import Content from "./Context/Content";
import { appContext } from "@/Context/AppContext";
import axios from "axios";

export default function AdminHome() {

  return (
    <div className="flex justify-between bg-[#242233]">
      <Content />
      <NavBar />
    </div>
  );
}
