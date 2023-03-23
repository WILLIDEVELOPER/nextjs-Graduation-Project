import { appContext } from "@/Context/AppContext";
import React, { useContext, useState } from "react";

export default function NavbarU() {
  const { handleNav, userLogged } = useContext(appContext);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <section onClick={() => setShowMenu(!showMenu)} className="w-screen bg-[#161520] ">
      <div className="flex justify-between items-center px-[3rem] py-[1rem] gap-[1rem] text-white">
        <div className="flex w-full gap-[1rem] items-center">
          <ul className="flex gap-[1.5rem] w-full  font-bold text-[1.15rem] ">
            <li
              className="cursor-pointer  hover:brightness-50"
              id="home"
              onClick={handleNav}
            >
              Anuncios
            </li>
            <div className="w-full flex justify-center ">
              <div className="flex gap-[1rem] capitalize">
                <li>eventos</li>
                <li>noticias</li>
                <li>cursos</li>
                <li>empleo</li>
              </div>
            </div>
          </ul>
        </div>
        <h1 className="capitalize font-bold text-xl">{userLogged.username}</h1>
        <div className="relative hover:bg-red-50 rounded-full">
          <img
            className="w-[4rem] rounded-full cursor-pointer"
            src="https://pic.onlinewebfonts.com/svg/img_329115.png"
            alt=""
            onClick={() => setShowMenu(!showMenu)}
          />
          {showMenu && (
            <div className="absolute top-[4.75rem] right-[-2.9rem] w-[10rem] bg-[#161520] p-[1rem]">
              <ul className="list-none">
                <li>Perfil</li>
                <li>Cerrar Sesion</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
