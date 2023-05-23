import { appContext } from "@/Context/AppContext";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function NavBar() {
  const { handleNav, logOut } = useContext(appContext);
  const router = useRouter();
  return (
    <div className="p-[2rem] flex flex-col font-bold text-xl  justify-between gap-[2rem] text-center text-white bg-[#161520] w-[13rem]  h-screen">
      <div>
        <div className="py-[3rem] cursor-pointer">
          <li
            id="HomeAdmin"
            onClick={handleNav}
            className="list-none hover:bg-slate-400 py-[0.5rem] rounded-xl px-[0.5rem]"
          >
            Usuarios
          </li>
        </div>
        <div className="py-[3rem] cursor-pointer">
          <li
            id="AdView"
            onClick={handleNav}
            className="list-none hover:bg-slate-400 py-[0.5rem] rounded-xl px-[0.5rem]"
          >
            Anuncios
          </li>
        </div>
        <div className="py-[3rem] cursor-pointer">
          <li
            id="perfil"
            onClick={() => {
              router.push("./profile");
            }}
            className="list-none hover:bg-slate-400 py-[0.5rem] rounded-xl px-[0.5rem]"
          >
            Perfil
          </li>
        </div>
      </div>
      <div
        onClick={logOut}
        className="flex cursor-pointer justify-center bg-[#8F43EE] rounded-xl hover:bg-slate-300 hover:text-slate-800 py-[0.5rem] px-[0.3rem] items-center gap-[0.3rem]"
      >
        <img
          src="https://i.ibb.co/fxP3Z0z/icons8-izquierda-c-rculo-30.png"
          alt=""
        />
        Cerrar Sesion
      </div>
    </div>
  );
}
