import { appContext } from "@/Context/AppContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

export default function ContentP() {
  let {
    contentId,
    handleUpdateChange,
    inputFileRef,
    file,
    userUpt,
    setContentId,
    mesageUpt,
    setMesageUpt,
    router
  } = useContext(appContext);
  const style = {
    width: "calc(100vw - 13rem)",
  };

  let formData = new FormData();

  const [getUsuario, setGetUsuario] = useState([]);
  const [getAdmin, setGetAdmin] = useState([]);
  const [getToken, setGetToken] = useState("");
  const [getUser, setGetUser] = useState({});

  const getUserById = async (id) => {
    if (id) {
      try {
        const { data: resUser } = await axios.get(
          `https://nodejs-jwt-prueba.vercel.app/api/users/${id}`,
          {
            headers: {
              "x-access-token": getToken,
            },
          }
        );
        console.log(resUser);
        setGetUser(resUser);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("usuario");
    const token = localStorage.getItem("token");
    if (userData) {
      setGetUsuario(JSON.parse(userData));
      setGetToken(token);
    }

    const adminData = localStorage.getItem("admin");
    if (adminData) {
      setGetAdmin(JSON.parse(adminData));
      setGetToken(token);
    }
    setContentId("HomeUser");

    if (getAdmin) {
      getUserById(getAdmin._id);
    }

    if (getUsuario) {
      getUserById(getUsuario._id);
    }
  }, []);

  function isValidJson(jsonString) {
    try {
      const parsedJson = JSON.parse(jsonString);
      return !!parsedJson.url;
    } catch {
      return false;
    }
  }

  const handleUptSubmit = () => {
    if (file) {
      formData.append("profileImage", file);
    }

    for (const key in userUpt) {
      if (
        userUpt[key] != "" &&
        userUpt[key] != undefined &&
        key != "profileImage"
      ) {
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
    }

    if (getAdmin) {
      updateUser(getAdmin._id);
      setMesageUpt(!mesageUpt)
    }

    if (getUsuario) {
      updateUser(getUsuario._id);
      setMesageUpt(!mesageUpt)
    }
  };

  const updateUser = async (id) => {
    if (id) {
      try {
        const { data: respuesta } = await axios.patch(
          `https://nodejs-jwt-prueba.vercel.app/api/users/${id}`,
          formData,
          {
            headers: {
              "x-access-token": getToken,
            },
          }
        );
        console.log(respuesta);
      } catch (error) {
        console.log(error);
      }
    }
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
                isValidJson(getUser.profileImage)
                  ? JSON.parse(getUser.profileImage)?.url
                  : isValidJson(getUser.imagen)
                  ? JSON.parse(getUser.imagen)?.url
                  : "https://i.imgur.com/gxw3HHE.png"
              }
              alt=""
            />
            <h1 className="text-center text-xl">{getUser.username}</h1>
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
        {mesageUpt && (
                    <div class="fixed  z-50 flex    justify-center  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
                      <div class="relative  w-full h-full max-w-2xl md:h-auto">
                        {/* <!-- Modal content --> */}
                        <form class="relative bg-[#161520] rounded-lg shadow ">
                          {/* <!-- Modal header --> */}
                          <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-xl font-bold text-white">
                              Mensaje De Respuesta
                            </h3>
                            <button
                              type="button"
                              onClick={() => {
                                setMesageUpt(!mesageUpt);
                              }}
                              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              <svg
                                aria-hidden="true"
                                class="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                            </button>
                          </div>
                          {/* <!-- Modal body --> */}
                          <div class="p-6   flex gap-[0.5rem]">
                            <p>Usuario Actualizado Con exito</p>
                          </div>
                          {/* <!-- Modal footer --> */}
                          <div class="flex justify-center items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button
                              type="submit"
                              onClick={() => {
                                setMesageUpt(!mesageUpt);
                                router.push("/ads")
                              }}
                              class="text-white bg-blue-500 capitalize  hover:bg-red-800    font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                            >
                              Aceptar
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
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
                isValidJson(getUser.profileImage)
                  ? JSON.parse(getUser.profileImage)?.url
                  : isValidJson(getUser.imagen)
                  ? JSON.parse(getUser.imagen)?.url
                  : "https://i.imgur.com/gxw3HHE.png"
              }
              alt=""
            />
            <h1 className="text-center text-xl">{getUser.username}</h1>
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
                isValidJson(getUser.profileImage)
                  ? JSON.parse(getUser.profileImage)?.url
                  : isValidJson(getUser.imagen)
                  ? JSON.parse(getUser.imagen)?.url
                  : "https://i.imgur.com/gxw3HHE.png"
              }
              alt=""
            />
            <h1 className="text-center text-xl">{getUser.username}</h1>
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
                isValidJson(getUser.profileImage)
                  ? JSON.parse(getUser.profileImage)?.url
                  : isValidJson(getUser.imagen)
                  ? JSON.parse(getUser.imagen)?.url
                  : "https://i.imgur.com/gxw3HHE.png"
              }
              alt=""
            />
            <h1 className="text-center text-xl">{getUser.username}</h1>
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
