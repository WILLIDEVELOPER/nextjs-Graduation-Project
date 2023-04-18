import { appContext } from "@/Context/AppContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

export default function NavbarU() {
  const { handleNav, router, getAds, setGetAds, getAllAds, logOut } = useContext(appContext);
  const [showMenu, setShowMenu] = useState(false);

  const [getUser, setGetUser] = useState({})
  const [getToken, setGetToken] = useState("")

  const [getUsuario, setGetUsuario] = useState([]);
  const [getAdmin, setGetAdmin] = useState([]);

  function isValidJson(jsonString) {
    try {
      const parsedJson = JSON.parse(jsonString);
      return !!parsedJson.url;
    } catch {
      return false;
    }
  }

  const getUserById = async(id) =>{
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
        setGetUser(resUser)
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    const userData = localStorage.getItem("usuario");
    const token = localStorage.getItem("token")
    if (userData) {
      setGetUsuario(JSON.parse(userData));
      setGetToken(token)
    }

    const adminData = localStorage.getItem("admin");
    if (adminData) {
      setGetAdmin(JSON.parse(adminData));
      setGetToken(token)
    }

    if (getAdmin) {
      getUserById(getAdmin._id)
    }

    if (getUsuario) {
      getUserById(getUsuario._id)
    }

  }, []);

  return (
    <section
      onClick={() => setShowMenu(!showMenu)}
      className="w-screen bg-[#161520] "
    >
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
                <li className="cursor-pointer"
                  onClick={() => {
                    const filtro = getAds.filter((ad) => ad.tipo == "eventos");
                    if (filtro.length > 0) {
                      setGetAds(filtro)
                    }else{
                      getAllAds()
                    }
                    
                    console.log(filtro);
                  }}
                >
                  eventos
                </li>
                <li className="cursor-pointer"
                  onClick={() => {
                    const filtro = getAds.filter((ad) => ad.tipo == "noticias");
                    if (filtro.length > 0) {
                      setGetAds(filtro)
                    }else{
                      getAllAds()
                    }
                    console.log(filtro);
                  }}
                >
                  noticias
                </li>
                <li className="cursor-pointer"
                  onClick={() => {
                    const filtro = getAds.filter((ad) => ad.tipo == "cursos");
                    if (filtro.length > 0) {
                      setGetAds(filtro)
                    }else{
                      getAllAds()
                    }
                    console.log(filtro);
                  }}
                >
                  cursos
                </li>
                <li className="cursor-pointer"
                  onClick={() => {
                    const filtro = getAds.filter((ad) => ad.tipo == "empleo");
                    if (filtro.length > 0) {
                      setGetAds(filtro)
                    }else{
                      getAllAds()
                    }
                    console.log(filtro);
                  }}
                >
                  empleo
                </li>
              </div>
            </div>
          </ul>
        </div>
        <h1 className="capitalize font-bold text-xl">
          {getUser.username}
        </h1>
        <div className="relative hover:bg-red-50 rounded-full">
          <img
            className="w-[4rem] rounded-full cursor-pointer"
            src={
              isValidJson(getUser.profileImage)
                ? JSON.parse(getUser.profileImage)?.url
                : "https://i.imgur.com/gxw3HHE.png"
            }
            alt=""
            onClick={() => setShowMenu(!showMenu)}
          />
          {showMenu && (
            <div className="absolute top-[4.75rem] right-[-2.9rem] w-[10rem] bg-[#161520] p-[1rem]">
              <ul className="list-none">
                <li
                  className="cursor-pointer"
                  onClick={() => {
                    router.push("./profile");
                  }}
                >
                  Perfil
                </li>
                <li onClick={logOut}  className="cursor-pointer">Cerrar Sesion</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
