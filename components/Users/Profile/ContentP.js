import { appContext } from "@/Context/AppContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

export default function ContentP() {
  let { contentId, handleUpdateChange, inputFileRef, file, userUpt, getToken, setContentId } =
    useContext(appContext);
  const style = {
    width: "calc(100vw - 13rem)",
  };

  let formData = new FormData();

  const [getUsuario, setGetUsuario] = useState([]);
  const [getAdmin, setGetAdmin] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem("usuario");
    if (userData) {
      setGetUsuario(JSON.parse(userData));
    }

    const adminData = localStorage.getItem("admin");
    if (adminData) {
      setGetAdmin(JSON.parse(adminData));
    }
    setContentId("HomeUser")
  }, []);

  function isValidJson(jsonString) {
    try {
      const parsedJson = JSON.parse(jsonString);
      return !!parsedJson.url;
    } catch {
      return false;
    }
  }

  const updateUser = async () => {
    try {
      const { data: res } = await axios.patch(
        `https://nodejs-jwt-prueba.vercel.app/api/users/${getAdmin._id}`,
        formData,
        {
          headers: {
            "x-access-token": getToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setGetAdmin(res)
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUptSubmit = () => {
    if (file) {
      formData.append("profileImage", file);
    }

    for (const key in userUpt) {
      if (
        userUpt[key] != "" &&
        key != "experience" &&
        key != "education" &&
        key != "personalInfo"
      ) {
        formData.append(key, userUpt[key]);
      } else if (key == "experience" || key == "education") {
        const objeto = userUpt[key][0];
        for (const item in objeto) {
          if (objeto[item] != "") {
            formData.append(key, JSON.stringify(userUpt[key][0]));
          }
        }
      } else if (key == "personalInfo") {
        const objetoDos = userUpt[key];
        for (const el in objetoDos) {
          if (objetoDos[el] != "") {
            formData.append(key, JSON.stringify(userUpt[key]));
          }
        }
      }
    }

    updateUser()
  };

  if (contentId == "HomeUser") {
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
                  name="username"
                  type="text"
                  onChange={handleUpdateChange}
                  className="px-[0.6rem] bg-transparent border-solid border-[1px] rounded-md placeholder:capitalize border-slate-600 py-[0.3rem]"
                  placeholder="Nombre de Usuario"
                />
              </div>
              <div className="flex w-full flex-col gap-[0.3rem]">
                <label>Correo Electronico</label>
                <input
                  type="text"
                  name="email"
                  onChange={handleUpdateChange}
                  className="px-[0.6rem] bg-transparent border-solid border-[1px] rounded-md placeholder:capitalize border-slate-600 py-[0.3rem]"
                  placeholder="name@gmail.com"
                />
              </div>
            </div>
            <div className="flex w-full gap-[1rem] justify-around ">
              <div className="flex w-full flex-col gap-[0.3rem]">
                <label>Puesto de Trabajo</label>
                <input
                  type="text"
                  name="jobTitle"
                  onChange={handleUpdateChange}
                  className="px-[0.6rem] bg-transparent border-solid border-[1px] rounded-md placeholder:capitalize border-slate-600 py-[0.3rem]"
                  placeholder="Programador"
                />
              </div>
            </div>
            <div className="flex w-full gap-[1rem] justify-around ">
              <div className="flex w-full flex-col gap-[0.3rem]">
                <label>Sector</label>
                <input
                  type="text"
                  name="sector"
                  onChange={handleUpdateChange}
                  className="px-[0.6rem] bg-transparent border-solid border-[1px] rounded-md placeholder:capitalize border-slate-600 py-[0.3rem]"
                  placeholder="Medico, informatico"
                />
              </div>
              <div className="flex w-full flex-col gap-[0.3rem]">
                <label>Pais</label>
                <input
                  type="text"
                  name="country"
                  onChange={handleUpdateChange}
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
                  name="city"
                  onChange={handleUpdateChange}
                  className="px-[0.6rem] bg-transparent border-solid border-[1px] rounded-md placeholder:capitalize border-slate-600 py-[0.3rem]"
                  placeholder="Bogota"
                />
              </div>
              <div className="flex w-full flex-col gap-[0.3rem]">
                <label>Descripcion</label>
                <textarea
                  type="text"
                  name="about"
                  onChange={handleUpdateChange}
                  className="px-[0.6rem] bg-transparent border-solid border-[1px] rounded-md placeholder:capitalize border-slate-600 py-[0.3rem]"
                  placeholder="Descripcion breve del trabajo"
                />
              </div>
            </div>
            <div className="flex w-full flex-col gap-[0.3rem]">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Imagen de Perfil
              </label>
              <input
                type="file"
                name="profileImage"
                onChange={handleUpdateChange}
                className="focus:outline-none block w-full text-lg cursor-pointer bg-transparent border-solid border-[1px] rounded-md placeholder:capitalize border-slate-600 "
                ref={inputFileRef}
              />
            </div>
          </div>
          <div className=" flex flex-col gap-[1.5rem]">
            <img
              className="rounded-full w-[25rem] h-[17rem]"
              src={
                getAdmin && isValidJson(getAdmin.profileImage)
                  ? JSON.parse(getAdmin.profileImage)?.url
                  : getUsuario && isValidJson(getUsuario.profileImage)
                  ? JSON.parse(getUsuario.profileImage)?.url
                  : "https://i.imgur.com/gxw3HHE.png"
              }
              alt=""
            />
            <h1 className="text-center text-xl">
              {getAdmin.username || getUsuario.username}
            </h1>
          </div>
        </div>
        <div>
          <button
            type="button"
            onClick={handleUptSubmit}
            className="cursor-pointer w-[10rem] text-2xl bg-[#161520] rounded-xl hover:bg-slate-200 hover:text-slate-800 py-[0.5rem] px-[0.3rem] "
          >
            Guardar
          </button>
        </div>
      </div>
    );
  } else if (contentId == "ExpUser") {
    return (
      <div
        style={style}
        className="p-[2rem] flex flex-col gap-[2rem] justify-center items-center text-white font-bold text-[16px]"
      >
        <div className="w-full  flex items-center justify-center">
          <div className="w-full px-[4rem]  h-full  flex flex-col gap-[2rem] items-center justify-center">
            <div className="flex w-full gap-[1rem] justify-around ">
              <div className="flex w-full flex-col gap-[0.3rem]">
                <label>Titulo</label>
                <input
                  type="text"
                  name="experience[0][title]"
                  onChange={handleUpdateChange}
                  className="px-[0.6rem] bg-transparent border-solid border-[1px] rounded-md placeholder:capitalize border-slate-600 py-[0.3rem]"
                  placeholder="Titulo en la compañia"
                />
              </div>
              <div className="flex w-full flex-col gap-[0.3rem]">
                <label>Compañia de Trabajo</label>
                <input
                  type="text"
                  name="experience[0][company]"
                  onChange={handleUpdateChange}
                  className="px-[0.6rem] bg-transparent border-solid border-[1px] rounded-md placeholder:capitalize border-slate-600 py-[0.3rem]"
                  placeholder="Company"
                />
              </div>
            </div>
            <div className="flex w-full gap-[1rem] justify-around ">
              <div className="flex w-full flex-col gap-[0.3rem]">
                <label>Descripcion</label>
                <textarea
                  type="text"
                  name="experience[0][description]"
                  onChange={handleUpdateChange}
                  className="px-[0.6rem] bg-transparent border-solid border-[1px] rounded-md placeholder:capitalize border-slate-600 py-[0.3rem]"
                  placeholder="Descripcion breve del trabajo realizado"
                />
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-[1.5rem]">
            <img
              className="rounded-full w-[25rem] h-[17rem]"
              src={
                getAdmin && isValidJson(getAdmin.profileImage)
                  ? JSON.parse(getAdmin.profileImage)?.url
                  : getUsuario && isValidJson(getUsuario.profileImage)
                  ? JSON.parse(getUsuario.profileImage)?.url
                  : "https://i.imgur.com/gxw3HHE.png"
              }
              alt=""
            />
            <h1 className="text-center text-xl">
              {getAdmin.username || getUsuario.username}
            </h1>
          </div>
        </div>
        {/* <div>
          <button
            // onClick={handleUptSubmit}
            className="cursor-pointer w-[10rem] text-2xl bg-[#161520] rounded-xl hover:bg-slate-200 hover:text-slate-800 py-[0.5rem] px-[0.3rem] "
          >
            Guardar
          </button>
        </div> */}
      </div>
    );
  } else if (contentId == "EduUser") {
    return (
      <div
        style={style}
        className="p-[2rem] flex flex-col gap-[2rem] justify-center items-center text-white font-bold text-[16px]"
      >
        <div className="w-full  flex items-center justify-center">
          <div className="w-full px-[4rem]  h-full  flex flex-col gap-[2rem] items-center justify-center">
            <div className="flex w-full gap-[1rem] justify-around ">
              <div className="flex w-full flex-col gap-[0.3rem]">
                <label>Nombre del Instituto</label>
                <input
                  type="text"
                  name="education[0][institutionName]"
                  onChange={handleUpdateChange}
                  className="px-[0.6rem] bg-transparent border-solid border-[1px] rounded-md placeholder:capitalize border-slate-600 py-[0.3rem]"
                  placeholder="Institucion"
                />
              </div>
              <div className="flex w-full flex-col gap-[0.3rem]">
                <label>Grado</label>
                <input
                  type="text"
                  name="education[0][degree]"
                  onChange={handleUpdateChange}
                  className="px-[0.6rem] bg-transparent border-solid border-[1px] rounded-md placeholder:capitalize border-slate-600 py-[0.3rem]"
                  placeholder="Grado"
                />
              </div>
            </div>
            <div className="flex w-full gap-[1rem] justify-around ">
              <div className="flex w-full flex-col gap-[0.3rem]">
                <label>Carrera</label>
                <input
                  type="text"
                  name="education[0][fieldOfStudy]"
                  onChange={handleUpdateChange}
                  className="px-[0.6rem] bg-transparent border-solid border-[1px] rounded-md placeholder:capitalize border-slate-600 py-[0.3rem]"
                  placeholder="Ingenieria de Sistemas"
                />
              </div>
              <div className="flex w-full flex-col gap-[0.3rem]">
                <label>Actividades o Sociedades</label>
                <textarea
                  type="text"
                  name="education[0][activitiesAndSocieties]"
                  onChange={handleUpdateChange}
                  className="px-[0.6rem] bg-transparent border-solid border-[1px] rounded-md placeholder:capitalize border-slate-600 py-[0.3rem]"
                  placeholder="Grupos o sociedades en las que fue participe"
                />
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-[1.5rem]">
            <img
              className="rounded-full w-[25rem] h-[17rem]"
              src={
                getAdmin && isValidJson(getAdmin.profileImage)
                  ? JSON.parse(getAdmin.profileImage)?.url
                  : getUsuario && isValidJson(getUsuario.profileImage)
                  ? JSON.parse(getUsuario.profileImage)?.url
                  : "https://i.imgur.com/gxw3HHE.png"
              }
              alt=""
            />
            <h1 className="text-center text-xl">
              {getAdmin.username || getUsuario.username}
            </h1>
          </div>
        </div>
        {/* <div>
          <button
            // onClick={handleUptSubmit(getAdmin._id || getUsuario.id)}
            className="cursor-pointer w-[10rem] text-2xl bg-[#161520] rounded-xl hover:bg-slate-200 hover:text-slate-800 py-[0.5rem] px-[0.3rem] "
          >
            Guardar
          </button>
        </div> */}
      </div>
    );
  } else if (contentId == "Personal") {
    return (
      <div
        style={style}
        className="p-[2rem] flex flex-col gap-[2rem] justify-center items-center text-white font-bold text-[16px]"
      >
        <div className="w-full  flex items-center justify-center">
          <div className="w-full px-[4rem]  h-full  flex flex-col gap-[2rem] items-center justify-center">
            <div className="flex w-full gap-[1rem] justify-around ">
              <div className="flex w-full flex-col gap-[0.3rem]">
                <label>Nombre Completo</label>
                <input
                  type="text"
                  name="personalInfo.fullName"
                  onChange={handleUpdateChange}
                  className="px-[0.6rem] bg-transparent border-solid border-[1px] rounded-md placeholder:capitalize border-slate-600 py-[0.3rem]"
                  placeholder="Nombre y apellido"
                />
              </div>
              <div className="flex w-full flex-col gap-[0.3rem]">
                <label>Fecha de nacimiento</label>
                <input
                  type="date"
                  name="personalInfo.birthdate"
                  onChange={handleUpdateChange}
                  className="px-[0.6rem] bg-transparent border-solid border-[1px] rounded-md placeholder:capitalize border-slate-600 py-[0.3rem]"
                  placeholder="00/00/0000"
                />
              </div>
            </div>
            <div className="flex w-full gap-[1rem] justify-around ">
              <div className="flex w-full flex-col gap-[0.3rem]">
                <label>Direccion</label>
                <input
                  type="text"
                  name="personalInfo.address"
                  onChange={handleUpdateChange}
                  className="px-[0.6rem] bg-transparent border-solid border-[1px] rounded-md placeholder:capitalize border-slate-600 py-[0.3rem]"
                  placeholder="Calle # ##-##"
                />
              </div>
              <div className="flex w-full flex-col gap-[0.3rem]">
                <label>Telefono</label>
                <input
                  type="number"
                  name="personalInfo.phone"
                  onChange={handleUpdateChange}
                  className="px-[0.6rem] bg-transparent border-solid border-[1px] rounded-md placeholder:capitalize border-slate-600 py-[0.3rem]"
                  placeholder="123456789"
                />
              </div>
            </div>
            <div className="flex w-full gap-[1rem] justify-around ">
              <div className="flex w-full flex-col gap-[0.3rem]">
                <label>Linkedin</label>
                <input
                  type="text"
                  name="personalInfo.linkedin"
                  onChange={handleUpdateChange}
                  className="px-[0.6rem] bg-transparent border-solid border-[1px] rounded-md placeholder:capitalize border-slate-600 py-[0.3rem]"
                  placeholder="Link de linkedin"
                />
              </div>
              <div className="flex w-full flex-col gap-[0.3rem]">
                <label>Sitio Web</label>
                <input
                  type="text"
                  name="personalInfo.website"
                  onChange={handleUpdateChange}
                  className="px-[0.6rem] bg-transparent border-solid border-[1px] rounded-md placeholder:capitalize border-slate-600 py-[0.3rem]"
                  placeholder="www.mysitioweb.com"
                />
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-[1.5rem]">
            <img
              className="rounded-full w-[25rem] h-[17rem]"
              src={
                getAdmin && isValidJson(getAdmin.profileImage)
                  ? JSON.parse(getAdmin.profileImage)?.url
                  : getUsuario && isValidJson(getUsuario.profileImage)
                  ? JSON.parse(getUsuario.profileImage)?.url
                  : "https://i.imgur.com/gxw3HHE.png"
              }
              alt=""
            />
            <h1 className="text-center text-xl">
              {getAdmin.username || getUsuario.username}
            </h1>
          </div>
        </div>
        {/* <div>
          <button
            // onClick={handleUptSubmit(getAdmin._id || getUsuario.id)}
            className="cursor-pointer w-[10rem] text-2xl bg-[#161520] rounded-xl hover:bg-slate-200 hover:text-slate-800 py-[0.5rem] px-[0.3rem] "
          >
            Guardar
          </button>
        </div> */}
      </div>
    );
  }
}
