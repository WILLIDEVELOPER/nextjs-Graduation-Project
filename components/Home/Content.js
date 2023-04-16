import { appContext } from "@/Context/AppContext";
import React, { use, useContext, useEffect } from "react";
import Login from "../Auth/login";
import Register from "../Auth/register";

export default function Content({ ruta }) {

  const {handleContent, setContentId } = useContext(appContext)

  useEffect(() => {
    setContentId("home")
  }, [])
  

  const style = {
    "--opacidad-negro": 0.7,
    backgroundImage:
      'linear-gradient(rgba(0, 0, 0, var(--opacidad-negro)), rgba(0, 0, 0, var(--opacidad-negro)))',
  };
  if (ruta == "home") {
    return (
      <div
        style={style}
        className="w-full h-full  flex justify-center items-center"
      >
        <div className="text-center flex flex-col items-center gap-[4rem] p-[5rem]">
          <h1 className="text-[#865DFF] font-extrabold text-7xl">
            Bienvenido Egresado
          </h1>
          <button id="register" onClick={handleContent} className="bg-[#865DFF] text-xl text-white font-bold hover:bg-[#9776f9]   w-[10rem] h-[3.5rem] py-[0.5rem] rounded-lg">
            Empezar
          </button>
        </div>
      </div>
    );
  } else if (ruta == "about") {
    return (
      <div
        style={style}
        className="w-full px-[1.2rem] h-full flex  justify-center items-center gap-[1rem]"
      >
        <div className="w-[45rem] flex flex-col ">
          <h1 className="text-[#865DFF] text-center font-bold text-4xl p-[0.5rem]">
            Querido Egresado
          </h1>
          <p className="text-white p-[0.5rem] text-[1.2rem] text-justify">
            Bienvenido a nuestro sitio de egresados. Aquí encontrarás una
            plataforma para mantenerte actualizado y conectado con la
            institución superior que te formó. En este espacio, podrás
            actualizar algunos aspectos importantes, conocimiento y
            experiencias. Te ofrecemos información relevante sobre eventos,
            cursos, oportunidades laborales y más, que te permitirán seguir
            desarrollándote y ampliando tus horizontes. Además, Esperamos que te
            sientas en casa, y que puedas seguir creciendo junto a nosotros.
            <span className="ml-[0.3rem] font-bold">
              ¡Gracias por ser parte de nuestra comunidad!
            </span>
          </p>
          <div className="w-full flex justify-center">
            <button id="contact-us" onClick={handleContent} className="bg-[#865DFF] text-[1.3rem] text-white font-bold hover:bg-[#9776f9]   h-[3.5rem] px-[0.9rem] py-[0.5rem] rounded-xl">
              Contactanos
            </button>
          </div>
        </div>
      </div>
    );
  } else if (ruta == "login") {
    return (
      <div  className="bg-[#161520] w-full h-full flex flex-col justify-center items-center">
        <Login/>
      </div> 
    )
  } else if (ruta == "register") {
    return (
      <div className="bg-[#161520] w-full h-full flex flex-col justify-center items-center">
          <Register/>
      </div>
    )
  }
}
