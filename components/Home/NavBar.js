import React from "react";

export default function NavBar() {
  return (
    <section className="w-screen bg-slate-600 ">
      <div className="flex justify-between px-[4rem] py-[1rem] gap-[1rem] text-white">
        <div className="flex gap-[1rem] items-center">
          <img
            className="w-[5.5rem] "
            src="https://res.cloudinary.com/dstwpmmob/image/upload/v1678369902/anuncios/olsafkey56rhi9tacrlj.png"
            alt=""
          />
          <ul className="flex gap-[1rem]">
            <li>Inicio</li>
            <li>Acerca de </li>
            <li>Contactanos</li>
            <li>Ayuda</li>
          </ul>
        </div>
        <div className="flex gap-[1rem] items-center">
            <button>Iniciar Sesion</button>
            <button>Registrarse</button>
        </div>
      </div>
    </section>
  );
}
