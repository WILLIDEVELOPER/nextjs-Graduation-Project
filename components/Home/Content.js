import React from "react";

export default function Content({ ruta }) {
  const style = {
    "--opacidad-negro": 0.7,
    backgroundImage:
      'linear-gradient(rgba(0, 0, 0, var(--opacidad-negro)), rgba(0, 0, 0, var(--opacidad-negro))), url("img/background__welcome.jpg")',
  };
  if (ruta == "home") {
    return (
      <div
        style={style}
        className="w-full h-[41.3rem]  flex justify-center items-center"
      >
        <div className="text-center flex flex-col items-center gap-[4rem] p-[5rem]">
          <h1 className="text-[#865DFF] font-extrabold text-7xl">
            Bienvenido Egresado
          </h1>
          <button className="bg-[#865DFF] text-xl text-white font-bold hover:bg-[#9776f9]   w-[10rem] h-[3.5rem] py-[0.5rem] rounded-lg">
            Empezar
          </button>
        </div>
      </div>
    );
  } else if (ruta == "about") {
    return (
      <div
        style={style}
        className="w-full px-[1.2rem] h-[41.3rem] flex  items-center gap-[1rem]"
      >
        <div className="w-[45rem] flex flex-col ">
          <h1 className="text-[#865DFF] text-center font-bold text-3xl p-[0.5rem]">
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
            sientas en casa, y que puedas seguir creciendo junto a
            nosotros. 
            <span className="ml-[0.3rem] font-bold">
              ¡Gracias por ser parte de nuestra comunidad!
            </span>
          </p>
          <div className="w-full flex justify-center">
            <button className="bg-[#865DFF] text-[1.3rem] text-white font-bold hover:bg-[#9776f9]   h-[3.5rem] px-[0.9rem] py-[0.5rem] rounded-xl">
              Contactanos
            </button>
          </div>
        </div>
        <div className="w-[45rem]">
          <img src="https://imgs.search.brave.com/PV-vp2jW0-b_EmXFeqthcpNkaXT2sw-EwAMyMf0a06w/rs:fit:800:609:1/g:ce/aHR0cDovL2l0bi5l/ZHUuY28vd2ViL2lt/YWdlcy9pbWFnZW5l/c19JVE4vTnVldmFz/L2VncmVzYWRvczIu/anBn"></img>
        </div>
      </div>
    );
  } else if (ruta == "contact-us") {
    return <div>{ruta}</div>;
  }
}
