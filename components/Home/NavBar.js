import { appContext } from "@/Context/AppContext";
import React, { useContext } from "react";

export default function NavBar() {
  const { handleNav } = useContext(appContext);
  return (
    <section className="w-screen bg-[#161520] ">
      <div className="flex justify-between px-[3rem] py-[1rem] gap-[1rem] text-white">
        <div className="flex gap-[1rem] items-center">
          <img
            className="w-[4rem] rounded-full mr-[1rem]"
            src="https://pic.onlinewebfonts.com/svg/img_329115.png"
            alt=""
          />
          <ul className="flex gap-[1.5rem]  font-bold text-[1.15rem] ">
            <li className="cursor-pointer  hover:brightness-50" id="home" onClick={handleNav}>
              Inicio
            </li>
            <li className="cursor-pointer hover:brightness-50" id="about" onClick={handleNav}>
              Acerca de
            </li>
            <li className="cursor-pointer hover:brightness-50 " id="contact-us" onClick={handleNav}>
              Contactanos
            </li>
          </ul>
        </div>
        <div className="flex gap-[1rem] items-center font-bold text-[1.15rem]">
          <button onClick={handleNav} id="login" className="hover:bg-[#865DFF] focus:bg-[#865DFF] rounded-xl p-[0.5rem]">
            Iniciar Sesion
          </button>
          <button id="register" onClick={handleNav} className="hover:bg-[#865DFF] focus:bg-[#865DFF] rounded-xl p-[0.5rem]">
            Registrarse
          </button>
        </div>
      </div>
    </section>
  );
}
