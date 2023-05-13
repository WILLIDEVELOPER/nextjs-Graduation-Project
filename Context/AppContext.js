import axios from "axios";
import { useRouter } from "next/router";
import { createContext, use, useRef } from "react";
import { useState, useEffect } from "react";

export const appContext = createContext();

export const AppProvider = ({ children }) => {
  //TODO: variables

  const [error, setError] = useState("");
  const router = useRouter();

  //Todo: variables para manejo del contenido que me mostrara el navbar
  const [contentId, setContentId] = useState("home" || "HomeUser");
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
  const [userLogged, setUserLogged] = useState({});
  const [adminLogged, setAdminLogged] = useState({});

  //Todo: variables para rol usuario
  const [getAds, setGetAds] = useState([]);
  const [getUsers, setGetUsers] = useState([]);
  const [ad, setAd] = useState({
    titulo: "",
    descripcion: "",
    image: "",
    set: "",
    url: "",
  });
  const [userUpt, setUserUpt] = useState({
    username: "",
    email: "",
    password: "",
    profileImage: "",
    jobTitle: "",
    sector: "",
    country: "",
    city: "",
    about: "",
    experience: [
      {
        title: "",
        company: "",
        description: "",
      },
    ],
    personalInfo: {
      fullName: "",
      birthdate: "",
      address: "",
      phone: "",
      linkedin: "",
      website: "",
    },
    education: [
      {
        institutionName: "",
        degree: "",
        fieldOfStudy: "",
        activitiesAndSocieties: "",
      },
    ],
  });
  let rutaActual = router.asPath;
  const inputFileRef = useRef();
  const [file, setFile] = useState(null);
  let data = {};
  const [getToken, setGetToken] = useState("");
  const [listUpdate, setListUpdate] = useState(false);
  const [mesage, setMesage] = useState(false);
  const [mesageUpt, setMesageUpt] = useState(false);
  const [mesageAdd, setMesageAdd] = useState(false);
  const [updateAdId, setUpdateAdId] = useState(false);
  const [createAdId, setCreateAdId] = useState(false);

  const [messageDelete, setMessageDelete] = useState("");
  //*Funciones

  const getAllAds = async () => {
    const { data: res } = await axios.get(
      "https://nodejs-jwt-prueba.vercel.app/api/ads"
    );
    setGetAds(res);
  };

  useEffect(() => {
    rutaActual = router.asPath;

    rutaActual == "/profile" ? setContentId("HomeUser") : setContentId("home");
    rutaActual == "/adminView"
      ? setContentId("HomeAdmin")
      : setContentId("home");

    const tokenData = localStorage.getItem("token");
    setGetToken(tokenData);
    getAllAds();
  }, []);

  useEffect(() => {
    const tokenData = localStorage.getItem("token");
    setGetToken(tokenData);
    getAllAds();
  }, [listUpdate]);

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
      setUserLogged(userFound);
      setUserRoles(["egresado"]);
      router.push("/ads");
    } else if (
      roles.includes("admin") &&
      roles.includes("lider universitario")
    ) {
      setAdminLogged(userFound);
      setUserRoles(["admin", "lider universitario"]);
      router.push("/adminView");
    } else if (roles.includes("admin")) {
      setAdminLogged(userFound);
      router.push("/adminView");
      setUserRoles(["admin"]);
    } else if (roles.includes("lider universitario")) {
      setAdminLogged(userFound);
      router.push("/adminView");
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
      validation(res.userFound);
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
      if (value.includes(",")) {
        newRoles = value.split(",").map((role) => role.trim());
      } else {
        newRoles = [value];
      }
    }

    setError("Role Valido");
    setRegister({
      ...register,
      [name]: name === "roles" ? newRoles : value,
    });
  };

  const handleRegSubmit = (e) => {
    e.preventDefault();
    signUp(register);
    console.log(register);
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
    signIn(login);
  };

  //get users
  // const getAllUsers = async () => {
  //   const { data: res } = await axios.get(
  //     "https://nodejs-jwt-prueba.vercel.app/api/users",
  //     {
  //       headers: {
  //         "x-access-token": getToken,
  //       },
  //     }
  //   );
  //   setGetUsers(res);
  // };

  //* Peril usuario

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;

    // Copia actual de userUpt
    const updatedUserUpt = { ...userUpt }; // Copia el estado actual ad

    if (name === "profileImage") {
      setFile(e.target.files[0]); // Actualiza el estado file con el archivo de imagen
      updatedUserUpt[name] = e.target.files[0]["name"]; // Actualiza el campo image en el estado ad con el nombre del archivo
    } else {
      updatedUserUpt[name] = value;
      // Actualiza el campo correspondiente en el estado ad con el valor del input
    }

    const idx = name.indexOf("[");
    if (idx > -1) {
      const fieldName = name.slice(0, idx);
      const arrIdx = parseInt(name.slice(idx + 1, name.length - 1));
      updatedUserUpt[fieldName][arrIdx] = {
        ...updatedUserUpt[fieldName][arrIdx],
        [name.slice(name.lastIndexOf("[") + 1, -1)]: value,
      };
    } else if (name.startsWith("personalInfo.")) {
      const personalInfoField = name.replace("personalInfo.", "");
      updatedUserUpt.personalInfo = {
        ...updatedUserUpt.personalInfo,
        [personalInfoField]: value,
      };
    } else {
      updatedUserUpt[name] = value;
    }

    data = { ...updatedUserUpt, profileImage: file };
    setUserUpt(data);
  };

  const deleteUser = async (id) => {
    try {
      const { data: res } = await axios.delete(
        `https://nodejs-jwt-prueba.vercel.app/api/users/${id}`,
        {
          headers: {
            "x-access-token": getToken,
          },
        }
      );
      setMessageDelete("Usuario eliminado con exito");
      console.log(res);
    } catch (error) {
      setMessageDelete("Se necesita rol de admin para eliminar un usuario");
      console.log(error);
    }
  };

  const deleteAd = async (id) => {
    try {
      const config = {
        headers: {
          "x-access-token": getToken, // Asegúrate de invocar getToken() para obtener el token de acceso
          "Content-Type": "application/json", // Ejemplo de encabezado de tipo de contenido
          // Agrega otros encabezados necesarios aquí
        },
      };

      const { data: resDelete } = await axios.delete(
        `https://nodejs-jwt-prueba.vercel.app/api/ads/${id}`,
        config // Pasa el objeto de configuración con los encabezados a la petición
      );
      console.log(resDelete);
      setMessageDelete("Anuncio eliminado con exito");
    } catch (error) {
      setMessageDelete("Se necesita rol de admin para eliminar un anuncio");
      console.log(error);
    }
  };

  // cerrado de sesion

  const logOut = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    router.push("/");
  };

  //* Ad update

  const createAd = async (formData) => {
    try {
      const { data: responseData } = await axios.post(
        `https://nodejs-jwt-prueba.vercel.app/api/ads`,
        formData,
        {
          headers: {
            "x-access-token": getToken,
          },
        }
      );
      console.log(responseData); // Usa un nombre de variable diferente para la respuesta
    } catch (error) {
      console.log(error);
      // Maneja el error de manera adecuada para tu aplicación
    }
  };

  const handleChangeCreateAd = (e) => {
    const { name, value } = e.target;

    const createdAd = { ...ad }; // Copia el estado actual ad

    if (name === "image") {
      setFile(e.target.files[0]); // Actualiza el estado file con el archivo de imagen
      createdAd[name] = e.target.files[0].name; // Actualiza el campo image en el estado ad con el nombre del archivo
    } else {
      createdAd[name] = value; // Actualiza el campo correspondiente en el estado ad con el valor del input
    }
    setAd(createdAd); // Actualiza el estado ad con los cambios realizados
  };

  const handleSubmitCreateAd = async (e) => {
    e.preventDefault();

    const formData = new FormData(); // Crea un nuevo objeto FormData

    if (file) {
      formData.append("image", file); // Agrega el archivo de imagen al objeto FormData
    }

    for (const key in ad) {
      if (ad[key] !== undefined && key != "image") {
        formData.append(key, ad[key]);
      }
    }
    createAd(formData);
    setCreateAdId(!createAdId);
    setMesageAdd(!mesageAdd);
    setListUpdate(!listUpdate); // Envía el objeto FormData con la solicitud
  };

  const updateAd = async (formData, id) => {
    try {
      const { data: response } = await axios.patch(
        `https://nodejs-jwt-prueba.vercel.app/api/ads/${id}`,
        formData,
        {
          headers: {
            "x-access-token": getToken,
          },
        }
      );
      console.log(response); // Usa un nombre de variable diferente para la respuesta
    } catch (error) {
      console.log(error);
      // Maneja el error de manera adecuada para tu aplicación
    }
  };

  const handleChangeUpdateAd = async (e) => {
    const { name, value } = e.target;

    const updatedAd = { ...ad }; // Copia el estado actual ad

    if (name === "image") {
      setFile(e.target.files[0]); // Actualiza el estado file con el archivo de imagen
      updatedAd[name] = e.target.files[0].name; // Actualiza el campo image en el estado ad con el nombre del archivo
    } else {
      updatedAd[name] = value; // Actualiza el campo correspondiente en el estado ad con el valor del input
    }

    setAd(updatedAd);
  };

  const handleSubmitUpdateAd = (id) => {
    const formData = new FormData(); // Crea un nuevo objeto FormData

    if (file) {
      formData.append("image", file); // Agrega el archivo de imagen al objeto FormData
    }

    for (const key in ad) {
      if (ad[key] != "" && ad[key] != undefined && key != "image") {
        // Verifica si la propiedad está definida (no es null ni undefined)
        formData.append(key, ad[key]); // Agrega la propiedad y su valor al objeto FormData
      }
    }

    updateAd(formData, id); // Envía el objeto FormData con la solicitud
    setUpdateAdId(!updateAdId);
    setMesageUpt(!mesageUpt);
    setListUpdate(!listUpdate);
  };

  return (
    <appContext.Provider
      value={{
        //variables
        adminLogged,
        setAdminLogged,
        setUserLogged,
        setToken,
        token,
        router,

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

        //? User Update variables
        handleUpdateChange,
        inputFileRef,
        setFile,

        //? Ads variable
        getAds,
        getUsers,

        //logOut
        logOut,

        //user
        deleteUser,
        deleteAd,
        setGetUsers,
        handleChangeCreateAd,
        handleSubmitCreateAd,
        handleChangeUpdateAd,
        handleSubmitUpdateAd,
        setGetAds,
        getAllAds,
        file,
        userUpt,
        getToken,
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
      }}
    >
      {children}
    </appContext.Provider>
  );
};
