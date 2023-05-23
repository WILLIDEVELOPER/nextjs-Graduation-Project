import { appContext } from "@/Context/AppContext";
import React, { useContext } from "react";

export default function NavBarP() {
  const { handleNav, router } = useContext(appContext);
  return (
    <div className="p-[2rem] flex flex-col font-bold text-xl  justify-between gap-[2rem] text-center text-white bg-[#161520] w-[13rem]  h-screen">
      <div>
        <div className="py-[3rem] cursor-pointer">
          <li
            id="HomeUser"
            onClick={handleNav}
            className="list-none hover:bg-slate-400 py-[0.5rem] rounded-xl px-[0.5rem]"
          >
            Home
          </li>
        </div>
        {/* <div className="py-[3rem] cursor-pointer">
          <li
            id="ExpUser"
            onClick={handleNav}
            className="list-none hover:bg-slate-400 py-[0.5rem] rounded-xl px-[0.5rem]"
          >
            Experiencia
          </li>
        </div>
        <div className="py-[3rem] cursor-pointer">
          <li
            id="EduUser"
            onClick={handleNav}
            className="list-none hover:bg-slate-400 py-[0.5rem] rounded-xl"
          >
            Educacion
          </li>
        </div> */}
        <div className="py-[3rem] cursor-pointer">
          <li
            id="Personal"
            onClick={handleNav}
            className="list-none hover:bg-slate-400 py-[0.5rem] rounded-xl"
          >
            Personal
          </li>
        </div>
      </div>
      <div
        onClick={() => {
          router.push("/ads");
        }}
        className="flex cursor-pointer justify-center bg-[#8F43EE] rounded-xl hover:bg-slate-300 hover:text-slate-800 py-[0.5rem] px-[0.3rem] items-center gap-[0.3rem]"
      >
        <img
          src="https://i.ibb.co/fxP3Z0z/icons8-izquierda-c-rculo-30.png"
          alt=""
        />
        Volver
      </div>
    </div>
  );
}
