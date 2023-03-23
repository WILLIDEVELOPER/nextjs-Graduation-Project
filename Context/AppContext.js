import axios from "axios";
import { useRouter } from "next/router";
import { createContext, use } from "react";
import { useState, useEffect } from "react";

export const appContext = createContext();

export const AppProvider = ({ children }) => {
  //TODO: variables

  const [error, setError] = useState("");
  const router = useRouter();

  //Todo: variables para manejo del contenido que me mostrara el navbar
  const [contentId, setContentId] = useState("home");
  let getId = "";

  //Todo: variables para el signUp
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
    roles: [],
  });

  //Todo: variables para el signIn
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [token, setToken] = useState("");
  const [userRoles, setUserRoles] = useState([]);
  const [userLogged, setUserLogged] = useState({})


  //Todo: variables para rol usuario
  const [getAds, setGetAds] = useState([])

  //*Funciones

  //? Content del home
  const handleNav = (e) => {
    getId = e.target.id;
    setContentId(getId);
  };

  const handleContent = (e) => {
    getId = e.target.id;
    setContentId(getId);
  };

  //? Funciones para el signUp

  const signUp = async (datos) => {
    try {
      const { data: res } = await axios.post(
        "https://nodejs-jwt-prueba.vercel.app/api/auth/signup",
        datos
      );
      console.log(res);
      setError("Usuario Creado");
      setTimeout(() => {
        setContentId("login");
      }, 1000);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  //? Funciones para el signIn

  const validation = (userFound) => {
    const roles = userFound.roles.map((role) => role.name);

    // Actualizar el estado de los roles del usuario
    if (roles.includes("egresado")) {
      setUserLogged(userFound)
      setUserRoles(["egresado"]);
      router.push("/ads")
    } else if (roles.includes("admin") && roles.includes("lider universitario")) {
      setUserRoles(["admin", "lider universitario"]);
    } else if (roles.includes("admin")) {
      setUserRoles(["admin"]);
    } else if (roles.includes("lider universitario")) {
      setUserRoles(["lider universitario"]);
    } else {
      setUserRoles([]);
    }
  };

  const signIn = async (datos) => {
    try {
      const { data: res } = await axios.post(
        "https://nodejs-jwt-prueba.vercel.app/api/auth/signin",
        datos
      );
      setToken(res.token);
      setError("Usuario Autenticado Con Exito");
      validation(res.userFound)
    } catch (error) {
      setError(error.response.data.message);
    }
  };


  //*Metodos

  //? Manejo del signUp

  const handleRegChange = (e) => {
    const { name, value } = e.target;
    let newRoles = [...register.roles];
    if (name === "roles") {
      newRoles = value.split(",").map((role) => role.trim());
      const invalidRole = newRoles.filter(element => {
        if (newRoles.length > 1) {
          if (element.includes("egresado")) {
            return true
          }
        }
        return false;
      });
      if (invalidRole.length > 0) {
        setError("La combinación de roles es inválida: " + invalidRole.join(", "));
      }else{
        setError("Role Valido")
        setRegister({
          ...register,
          [name]: name === "roles" ? newRoles : value,
        });
      }
    }  
  };
  

  const handleRegSubmit = (e) => {
    e.preventDefault();
    signUp(register);
  };

  //? Manejo del signIn

  const handleLogChange = (e) => {
    const { name, value } = e.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  const handleLogSubmit = (e) => {
    e.preventDefault();
    signIn(login)
  };

  //*Ads View =>User

  useEffect(() => {
    const getAds = async() =>{
      const {data: res} = await axios.get("https://nodejs-jwt-prueba.vercel.app/api/ads")
      setGetAds(res)
    }
    getAds() 
  }, [])
  

  return (
    <appContext.Provider
      value={{
        //? Registro
        handleRegSubmit,
        handleRegChange,

        //? Login
        handleLogChange,
        handleLogSubmit,
        userLogged,

        //? Mensaje de errores
        error,

        //? Contenido del navbar y manejo del mismo
        contentId,
        handleNav,
        handleContent,

        //? Ads variable
        getAds,
      }}
    >
      {children}
    </appContext.Provider>
  );
};
