import React, { useState } from "react";
import Content from "./Content";

export default function NavBar() {
  const [rutaFinal, setRutaFinal] = useState("")
  const handleNav = (e) =>{
    let getId = e.target.id
    if (getId == "home") {
      setRutaFinal("home")
    }else if(getId == "about"){
      setRutaFinal("hola")
    }else if(getId == "contact-us"){
      setRutaFinal("chao")
    }else{
      setRutaFinal("")
    }
  }
  return (
    <main className="flex flex-col">
      <section className="w-screen bg-[#161520] ">
        <div className="flex justify-between px-[3rem] py-[1.7rem] gap-[1rem] text-white">
          <div className="flex gap-[1rem] items-center">
            <img
              className="w-[4rem] rounded-full mr-[1rem]"
              src="https://pic.onlinewebfonts.com/svg/img_329115.png"
              alt=""
            />
            <ul className="flex gap-[1.5rem] font-bold text-[1.15rem] ">
              <li className="cursor-pointer" id="home" onClick={handleNav}>Inicio</li>
              <li className="cursor-pointer" id="about" onClick={handleNav}>Acerca de </li>
              <li className="cursor-pointer" id="contact-us" onClick={handleNav}>Contactanos</li>
            </ul>
          </div>
          <div className="flex gap-[1rem] items-center font-bold text-[1.15rem]">
            <button className="hover:bg-[#865DFF] rounded-xl p-[0.5rem]">
              Iniciar Sesion
            </button>
            <button className="hover:bg-[#865DFF] rounded-xl p-[0.5rem]">
              Registrarse
            </button>
          </div>
        </div>
      </section>
      <Content ruta={rutaFinal}/>
    </main>
  );
}
