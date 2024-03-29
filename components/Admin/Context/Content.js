import { appContext } from "@/Context/AppContext";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

export default function Content() {
  const {
    contentId,
    getUsers,
    getAds,
    deleteUser,
    deleteAd,
    inputFileRef,

    handleChangeCreateAd,
    handleSubmitCreateAd,

    handleChangeUpdateAd,
    handleSubmitUpdateAd,
    setContentId,
    setListUpdate,
    listUpdate,
    mesage,
    setMesage,
    mesageUpt,
    setMesageUpt,
    updateAdId,
    setUpdateAdId,
    mesageAdd,
    setMesageAdd,
    createAdId,
    setCreateAdId,
    messageDelete,
  } = useContext(appContext);

  const [showEditUser, setShowEditUser] = useState(false);

  const [getUser, setGetUser] = useState([]);
  const [getAd, setGetAd] = useState([]);

  const style = {
    width: "calc(100vw - 12rem)",
  };

  function isValidJson(jsonString) {
    try {
      const parsedJson = JSON.parse(jsonString);
      return !!parsedJson.url;
    } catch {
      return false;
    }
  }

  const { setGetUsers } = useContext(appContext);
  const getAllUsers = async (tokenData) => {
    const { data: res } = await axios.get(
      "https://nodejs-jwt-prueba.vercel.app/api/users",
      {
        headers: {
          "x-access-token": tokenData,
        },
      }
    );
    setGetUsers(res);
  };

  useEffect(() => {
    const tokenDatos = localStorage.getItem("token");
    getAllUsers(tokenDatos);
    setContentId("HomeAdmin");
  }, []);

  useEffect(() => {
    const tokenDatos = localStorage.getItem("token");
    getAllUsers(tokenDatos);
  }, [listUpdate]);

  if (contentId == "HomeAdmin") {
    return (
      <div
        style={style}
        className="p-[2rem] flex flex-col gap-[2rem] justify-center items-center text-white font-bold text-[16px]"
      >
        <div className="w-full h-full relative overflow-x-auto  ">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white font-bold uppercase bg-[#8F43EE] ">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Cargo
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Pais
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#161520]">
              {getUsers.map((user) => (
                <tr key={user?._id} className=" hover:bg-[#2c2b38]">
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src={
                        isValidJson(user.profileImage)
                          ? JSON.parse(user.profileImage)?.url
                          : "https://i.imgur.com/gxw3HHE.png"
                      }
                      alt="Jese image"
                    />

                    <div className="pl-3">
                      <div className="text-base font-semibold">
                        {user?.username}
                      </div>
                      <div className="font-normal text-gray-500">
                        {user?.email}
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4 text-white">{user?.jobTitle}</td>
                  <td className="px-6 py-4">
                    <div className="flex capitalize items-center text-white">
                      <div className="h-2.5 w-2.5  rounded-full bg-green-500 mr-2"></div>
                      {user?.country}
                    </div>
                  </td>
                  <td className=" flex  gap-[0.7rem] px-6 py-4">
                    <a
                      type="button"
                      onClick={() => {
                        const usuario = getUsers.find(
                          (item) => item._id == user._id
                        );
                        setGetUser(usuario);
                        setShowEditUser(!showEditUser);
                      }}
                      className="font-medium cursor-pointer py-[0.3rem] px-[0.6rem]  bg-blue-500 text-white rounded-md  hover:underline"
                    >
                      Ver
                    </a>
                    <a
                      type="button"
                      onClick={() => {
                        deleteUser(user._id);
                        setMesage(!mesage);
                      }}
                      className="font-medium cursor-pointer text-white py-[0.3rem] px-[0.6rem] bg-red-500 rounded-md  hover:underline"
                    >
                      Eliminar
                    </a>
                  </td>
                  {mesage && (
                    <div className="fixed  z-50 flex    justify-center  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
                      <div className="relative  w-full h-full max-w-2xl md:h-auto">
                        {/* <!-- Modal content --> */}
                        <form className="relative bg-[#161520] rounded-lg shadow ">
                          {/* <!-- Modal header --> */}
                          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-bold text-white">
                              Mensaje De Respuesta
                            </h3>
                            <button
                              type="button"
                              onClick={() => {
                                setMesage(!mesage);
                              }}
                              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              <svg
                                aria-hidden="true"
                                className="w-5 h-5"
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
                          <div className="p-6   flex gap-[0.5rem]">
                            <p>{messageDelete}</p>
                          </div>
                          {/* <!-- Modal footer --> */}
                          <div className="flex justify-center items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button
                              type="submit"
                              onClick={() => {
                                setMesage(!mesage);
                                setListUpdate(!listUpdate);
                              }}
                              className="text-white bg-blue-500 capitalize  hover:bg-red-800    font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                            >
                              Aceptar
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

                  {showEditUser && (
                    <div className="fixed  z-50 flex    justify-center  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
                      <div className="relative  w-full h-full max-w-2xl md:h-auto">
                        {/* <!-- Modal content --> */}
                        <form className="relative bg-[#161520] rounded-lg shadow ">
                          {/* <!-- Modal header --> */}
                          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-bold text-white">
                              Ver Usuario
                            </h3>
                            <button
                              type="button"
                              onClick={() => {
                                setShowEditUser(!showEditUser);
                              }}
                              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              <svg
                                aria-hidden="true"
                                className="w-5 h-5"
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
                          <div className="p-6 h-full  flex items-center gap-[0.5rem]">
                            <div className="h-full p-2">
                              <img
                                className=" rounded-full"
                                src={
                                  isValidJson(getUser.profileImage)
                                    ? JSON.parse(getUser.profileImage)?.url
                                    : "https://i.imgur.com/gxw3HHE.png"
                                }
                                alt="Jese image"
                              />
                            </div>
                            <div className="h-full capitalize flex flex-col gap-[0.3rem]">
                              <h1 className="text-white uppercase font-bold text-xl">
                                Nombre: {getUser?.username}
                              </h1>
                              <p className="capitalize">
                                email: {getUser?.email}
                              </p>
                              <p className="capitalize">
                                acerca de: {getUser?.about}
                              </p>
                              <p className="capitalize">
                                pais: {getUser?.country}
                              </p>
                              <p className="capitalize">
                                cargo: {getUser?.jobTitle}
                              </p>
                              <p className="capitalize">
                                sector: {getUser?.sector}
                              </p>
                              <p className="capitalize">
                                ciudad: {getUser?.city}
                              </p>
                              <p className="capitalize">
                                compañia: {getUser?.company}
                              </p>
                              <br />
                              <p className="font-bold text-white">
                                Personal info:{" "}
                              </p>
                              <br />
                              <p className="capitalize">
                                Nombre completo:{" "}
                                {getUser?.personalInfo?.fullName}
                              </p>
                              <p className="capitalize">
                                cumpleaños: {getUser?.personalInfo?.birthdate}
                              </p>
                              <p className="capitalize">
                                direccion: {getUser?.personalInfo?.address}
                              </p>
                              <p className="capitalize">
                                telefono: {getUser?.personalInfo?.phone}
                              </p>
                              <p className="capitalize">
                                linkedin: {getUser?.personalInfo?.linkedin}
                              </p>
                              <p className="capitalize">
                                sitio web: {getUser?.personalInfo?.website}
                              </p>
                            </div>
                          </div>
                          {/* <!-- Modal footer --> */}
                        </form>
                      </div>
                    </div>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {/* <!-- Edit user modal --> */}
        </div>
      </div>
    );
  } else if (contentId == "AdView") {
    return (
      <div
        style={style}
        className="p-[2rem] flex flex-col gap-[2rem] justify-center items-center text-white font-bold text-[16px]"
      >
        <div className="w-full h-full relative overflow-x-auto  ">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white font-bold uppercase bg-[#8F43EE] ">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  Titulo
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Descripcion
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#161520]">
              {getAds.map((ad) => (
                <tr key={ad?._id} className=" hover:bg-[#2c2b38]">
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src={
                        isValidJson(ad.image)
                          ? JSON.parse(ad.image)?.url
                          : "https://i.imgur.com/gxw3HHE.png"
                      }
                      alt="Jese image"
                    />

                    <div class="pl-3">
                      <div class="text-base font-semibold">{ad?.titulo}</div>
                      <div class="font-normal text-gray-500">{ad?.tipo}</div>
                    </div>
                  </th>
                  <td class="px-6 py-4 text-white">{ad?.descripcion}</td>
                  <td class="px-6 py-4">
                    <div class="flex capitalize items-center text-white">
                      <div class="h-2.5 w-2.5  rounded-full bg-green-500 mr-2"></div>
                      {ad?.set}
                    </div>
                  </td>
                  <td class=" flex  gap-[0.7rem] px-6 py-4">
                    <a
                      type="button"
                      onClick={() => {
                        const anuncio = getAds.find(
                          (item) => item._id == ad._id
                        );
                        setGetAd(anuncio);
                        setShowEditUser(!showEditUser);
                      }}
                      class="font-medium cursor-pointer py-[0.3rem] px-[0.6rem]  bg-blue-500 text-white rounded-md  hover:underline"
                    >
                      Ver
                    </a>
                    <a
                      type="button"
                      onClick={() => {
                        deleteAd(ad?._id);
                        setMesage(!mesage);
                        setListUpdate(!listUpdate);
                      }}
                      class="font-medium cursor-pointer text-white py-[0.3rem] px-[0.6rem] bg-red-500 rounded-md  hover:underline"
                    >
                      Eliminar
                    </a>
                    <a
                      onClick={() => {
                        setUpdateAdId(!updateAdId);
                        const anuncio = getAds.find(
                          (item) => item._id == ad._id
                        );
                        setGetAd(anuncio);
                      }}
                      class="font-medium cursor-pointer text-white py-[0.3rem] px-[0.6rem] bg-black rounded-md  hover:underline"
                    >
                      Actualizar
                    </a>
                  </td>
                  {mesage && (
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
                                setMesage(!mesage);
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
                            <p>{messageDelete}</p>
                          </div>
                          {/* <!-- Modal footer --> */}
                          <div class="flex justify-center items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button
                              type="submit"
                              onClick={() => {
                                setMesage(!mesage);
                                setListUpdate(!listUpdate);
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

                  {showEditUser && (
                    <div class="fixed  z-50 flex    justify-center  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
                      <div class="relative  w-full h-full max-w-2xl md:h-auto">
                        {/* <!-- Modal content --> */}
                        <form class="relative bg-[#161520] rounded-lg shadow ">
                          {/* <!-- Modal header --> */}
                          <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-xl font-bold text-white">
                              Ver Anuncio
                            </h3>
                            <button
                              type="button"
                              onClick={() => {
                                setShowEditUser(!showEditUser);
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
                            <img
                              class="w-[40%] rounded-full"
                              src={
                                isValidJson(getAd.image)
                                  ? JSON.parse(getAd.image)?.url
                                  : "https://i.imgur.com/gxw3HHE.png"
                              }
                              alt="Jese image"
                            />
                            <div className="h-full capitalize flex flex-col gap-[0.3rem]">
                              <h1 className="text-white uppercase font-bold text-xl">
                                {getAd?.titulo}
                              </h1>
                              <p>{getAd?.tipo}</p>
                              <p>{getAd?.descripcion}</p>
                              <p>{getAd?.set}</p>
                              <p>{getAd?.url}</p>
                            </div>
                          </div>
                          {/* <!-- Modal footer --> */}
                        </form>
                      </div>
                    </div>
                  )}

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
                            <p>Anuncio Actualizado Con exito</p>
                          </div>
                          {/* <!-- Modal footer --> */}
                          <div class="flex justify-center items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button
                              type="submit"
                              onClick={() => {
                                setMesageUpt(!mesageUpt);
                                setListUpdate(!listUpdate);
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

                  {updateAdId && (
                    <div class="fixed  z-10 flex   justify-center  w-full   md:inset-0  ">
                      <div class="relative w-full h-full max-w-2xl md:h-auto">
                        {/* <!-- Modal content --> */}
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmitUpdateAd(getAd._id);
                          }}
                          class="relative bg-[#161520] rounded-lg shadow "
                        >
                          {/* <!-- Modal header --> */}
                          <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                              Actualizar Anuncio
                            </h3>
                            <button
                              type="button"
                              onClick={() => {
                                setUpdateAdId(!setUpdateAdId);
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
                                <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                              </svg>
                            </button>
                          </div>
                          {/* <!-- Modal body --> */}
                          <div class="p-6 space-y-6">
                            <div class="grid grid-cols-6 gap-6">
                              <div class="col-span-6 ">
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                  Titulo
                                </label>
                                <input
                                  type="text"
                                  name="titulo"
                                  onChange={handleChangeUpdateAd}
                                  class="shadow-sm bg-transparent outline-none placeholder:text-white  border border-gray-300  text-sm rounded-lg block w-full p-2.5 "
                                  placeholder="Anuncio egresados"
                                />
                              </div>
                              <div class="col-span-6 ">
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                  Descripcion
                                </label>
                                <textarea
                                  type="text"
                                  name="descripcion"
                                  onChange={handleChangeUpdateAd}
                                  class="shadow-sm bg-transparent outline-none placeholder:text-white  border border-gray-300  text-sm rounded-lg block w-full p-2.5 "
                                  placeholder="Green"
                                />
                              </div>
                              <div class="col-span-6 ">
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                  Tipo
                                </label>
                                <input
                                  type="text"
                                  name="tipo"
                                  onChange={handleChangeUpdateAd}
                                  class="shadow-sm bg-transparent outline-none placeholder:text-white  border border-gray-300  text-sm rounded-lg block w-full p-2.5 "
                                  placeholder="eventos, noticias, cursos o empleo"
                                />
                              </div>
                              <div class="col-span-6 ">
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                  Imagen
                                </label>
                                <input
                                  type="file"
                                  name="image"
                                  onChange={handleChangeUpdateAd}
                                  className="focus:outline-none block w-full text-lg cursor-pointer bg-transparent border-solid border-[1px] rounded-md placeholder:capitalize border-slate-600 "
                                  ref={inputFileRef}
                                />
                              </div>
                              <div class="col-span-6 sm:col-span-3">
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                  Estado
                                </label>
                                <input
                                  type="text"
                                  name="set"
                                  onChange={handleChangeUpdateAd}
                                  class="shadow-sm bg-transparent outline-none placeholder:text-white  border border-gray-300  text-sm rounded-lg block w-full p-2.5 "
                                  placeholder="activo o inactivo"
                                />
                              </div>
                              <div class="col-span-6 sm:col-span-3">
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                  Url
                                </label>
                                <input
                                  type="text"
                                  name="url"
                                  onChange={handleChangeUpdateAd}
                                  class="shadow-sm bg-transparent outline-none placeholder:text-white  border border-gray-300  text-sm rounded-lg block w-full p-2.5 "
                                  placeholder="https......"
                                />
                              </div>
                            </div>
                          </div>
                          {/* <!-- Modal footer --> */}
                          <div class="flex justify-center items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button
                              type="submit"
                              class="text-white text-xl bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              Actualizar
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <div
            onClick={() => {
              setCreateAdId(!createAdId);
            }}
            class="flex cursor-pointer justify-end p-[1rem]"
          >
            <div class="w-24 h-24 text-3xl rounded-full flex justify-center items-center bg-blue-500">
              +
            </div>
          </div>
          {createAdId && (
            <div class="fixed  z-10 flex    justify-center  w-full   md:inset-0 h-[calc(100%-1rem)] ">
              <div class="relative w-full h-full max-w-2xl md:h-auto">
                {/* <!-- Modal content --> */}
                <form
                  onSubmit={handleSubmitCreateAd}
                  class="relative bg-[#161520] rounded-lg shadow "
                >
                  {/* <!-- Modal header --> */}
                  <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                      Crear Anuncio
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        setCreateAdId(!createAdId);
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
                        <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                      </svg>
                    </button>
                  </div>
                  {/* <!-- Modal body --> */}
                  <div class="p-6 space-y-6">
                    <div class="grid grid-cols-6 gap-6">
                      <div class="col-span-6 ">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Titulo
                        </label>
                        <input
                          type="text"
                          name="titulo"
                          onChange={handleChangeCreateAd}
                          class="shadow-sm bg-transparent outline-none placeholder:text-white  border border-gray-300  text-sm rounded-lg block w-full p-2.5 "
                          placeholder="Anuncio egresados"
                          required
                        />
                      </div>
                      <div class="col-span-6 ">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Descripcion
                        </label>
                        <textarea
                          type="text"
                          name="descripcion"
                          onChange={handleChangeCreateAd}
                          class="shadow-sm bg-transparent outline-none placeholder:text-white  border border-gray-300  text-sm rounded-lg block w-full p-2.5 "
                          placeholder="Green"
                          required
                        />
                      </div>
                      <div class="col-span-6 ">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Tipo
                        </label>
                        <input
                          type="text"
                          name="tipo"
                          onChange={handleChangeCreateAd}
                          class="shadow-sm bg-transparent outline-none placeholder:text-white  border border-gray-300  text-sm rounded-lg block w-full p-2.5 "
                          placeholder="eventos, noticias, cursos o empleo"
                          required
                        />
                      </div>
                      <div class="col-span-6 ">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Imagen
                        </label>
                        <input
                          type="file"
                          name="image"
                          onChange={handleChangeUpdateAd}
                          className="focus:outline-none block w-full text-lg cursor-pointer bg-transparent border-solid border-[1px] rounded-md placeholder:capitalize border-slate-600 "
                          ref={inputFileRef}
                        />
                      </div>
                      <div class="col-span-6 sm:col-span-3">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Estado
                        </label>
                        <input
                          type="text"
                          name="set"
                          onChange={handleChangeCreateAd}
                          class="shadow-sm bg-transparent outline-none placeholder:text-white  border border-gray-300  text-sm rounded-lg block w-full p-2.5 "
                          placeholder="activo o inactivo"
                          required
                        />
                      </div>
                      <div class="col-span-6 sm:col-span-3">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Url
                        </label>
                        <input
                          type="text"
                          name="url"
                          onChange={handleChangeCreateAd}
                          class="shadow-sm bg-transparent outline-none placeholder:text-white  border border-gray-300  text-sm rounded-lg block w-full p-2.5 "
                          placeholder="https......"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  {/* <!-- Modal footer --> */}
                  <div class="flex justify-center items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button
                      type="submit"
                      class="text-white text-xl bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Añadir
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {mesageAdd && (
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
                        setMesageAdd(!mesageAdd);
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
                    <p>Anuncio Creado Con Exito</p>
                  </div>
                  {/* <!-- Modal footer --> */}
                  <div class="flex justify-center items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button
                      type="submit"
                      onClick={() => {
                        setMesageAdd(!mesageAdd);
                        setListUpdate(!listUpdate);
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
      </div>
    );
  }
}
