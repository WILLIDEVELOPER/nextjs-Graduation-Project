import React from "react";

export default function ContentP({ content }) {
  const style = {
    width: "calc(100vw - 13rem)",
  };
  if (content == "HomeUser") {
    return (
      <div
        style={style}
        className="p-[2rem] flex flex-col gap-[2rem] justify-center items-center text-white font-bold text-[16px]"
      >
        <div className="w-full  flex items-center justify-center">
          <div className="w-full px-[4rem]  h-full  flex flex-col gap-[2rem] items-center justify-center">
            <div className="flex w-full gap-[1rem] justify-around ">
              <div className="flex w-full flex-col gap-[0.3rem]">
                <label>Usuario</label>
                <input
                  type="text"
                  className="px-[0.6rem] bg-transparent border-solid border-[1px] rounded-md placeholder:capitalize border-slate-600 py-[0.3rem]"
                  placeholder="Nombre de Usuario"
                />
              </div>
              <div className="flex w-full flex-col gap-[0.3rem]">
                <label>Correo Electronico</label>
                <input
                  type="text"
                  className="px-[0.6rem] bg-transparent border-solid border-[1px] rounded-md placeholder:capitalize border-slate-600 py-[0.3rem]"
                  placeholder="name@gmail.com"
                />
              </div>
            </div>
            <div className="flex w-full gap-[1rem] justify-around ">
              <div className="flex w-full flex-col gap-[0.3rem]">
                <label>Contraseña</label>
                <input
                  type="password"
                  className="px-[0.6rem] bg-transparent border-solid border-[1px] rounded-md placeholder:capitalize border-slate-600 py-[0.3rem]"
                  placeholder="**********"
                />
              </div>
              <div className="flex w-full flex-col gap-[0.3rem]">
                <label>Role</label>
                <input
                  type="text"
                  disabled
                  className="px-[0.6rem] bg-transparent border-solid border-[1px] rounded-md placeholder:capitalize border-slate-600 py-[0.3rem]"
                  placeholder="Role Name"
                />
              </div>
            </div>
            <div className="flex w-full gap-[1rem] justify-around ">
              <div className="flex w-full flex-col gap-[0.3rem]">
                <label>Puesto de Trabajo</label>
                <input
                  type="text"
                  className="px-[0.6rem] bg-transparent border-solid border-[1px] rounded-md placeholder:capitalize border-slate-600 py-[0.3rem]"
                  placeholder="Programador"
                />
              </div>
              <div className="flex w-full flex-col gap-[0.3rem]">
                <label>Compañia</label>
                <input
                  type="text"
                  className="px-[0.6rem] bg-transparent border-solid border-[1px] rounded-md placeholder:capitalize border-slate-600 py-[0.3rem]"
                  placeholder="Nombre de la compañia de trabajo"
                />
              </div>
            </div>
            <div className="flex w-full gap-[1rem] justify-around ">
              <div className="flex w-full flex-col gap-[0.3rem]">
                <label>Sector</label>
                <input
                  type="text"
                  className="px-[0.6rem] bg-transparent border-solid border-[1px] rounded-md placeholder:capitalize border-slate-600 py-[0.3rem]"
                  placeholder="Medico, informatico"
                />
              </div>
              <div className="flex w-full flex-col gap-[0.3rem]">
                <label>Pais</label>
                <input
                  type="text"
                  className="px-[0.6rem] bg-transparent border-solid border-[1px] rounded-md placeholder:capitalize border-slate-600 py-[0.3rem]"
                  placeholder="Canada"
                />
              </div>
            </div>
            <div className="flex w-full gap-[1rem] justify-around ">
              <div className="flex w-full flex-col gap-[0.3rem]">
                <label>Ciudad</label>
                <input
                  type="text"
                  className="px-[0.6rem] bg-transparent border-solid border-[1px] rounded-md placeholder:capitalize border-slate-600 py-[0.3rem]"
                  placeholder="Bogota"
                />
              </div>
              <div className="flex w-full flex-col gap-[0.3rem]">
                <label>Descripcion</label>
                <textarea
                  type="text"
                  className="px-[0.6rem] bg-transparent border-solid border-[1px] rounded-md placeholder:capitalize border-slate-600 py-[0.3rem]"
                  placeholder="Descripcion breve del trabajo"
                />
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-[1.5rem]">
            <img
              className="rounded-full w-[25rem] h-[17rem]"
              src="https://images.pexels.com/photos/247899/pexels-photo-247899.jpeg"
              alt=""
            />
            <h1 className="text-center text-xl">Usuario Name</h1>
          </div>
        </div>
        <div>
          <button className="cursor-pointer w-[10rem] text-2xl bg-[#161520] rounded-xl hover:bg-slate-200 hover:text-slate-800 py-[0.5rem] px-[0.3rem] ">
            Guardar
          </button>
        </div>
      </div>
    );
  }
}
