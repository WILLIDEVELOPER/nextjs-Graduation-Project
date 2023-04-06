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
  let formData = new FormData();

  //*Funciones

  useEffect(() => {
    localStorage.setItem("usuario", JSON.stringify(userLogged));
    localStorage.setItem("admin", JSON.stringify(adminLogged));
    localStorage.setItem("token", token);

    const userData = localStorage.getItem("usuario");
    const tokenData = localStorage.getItem("token");
    const adminData = localStorage.getItem("admin");
    if (userData && tokenData) {
      setUserLogged(JSON.parse(userData));
      setToken(tokenData);
    }

    if (adminData && tokenData) {
      setAdminLogged(JSON.parse(adminData));
      setToken(tokenData);
    }
  }, []);

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
      newRoles = value.split(",").map((role) => role.trim());
      const invalidRole = newRoles.filter((element) => {
        if (newRoles.length > 1) {
          if (element.includes("egresado")) {
            return true;
          }
        }
        return false;
      });
      if (invalidRole.length > 0) {
        setError(
          "La combinación de roles es inválida: " + invalidRole.join(", ")
        );
      } else {
        setError("Role Valido");
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
    signIn(login);
  };

  //get users
  const getAllUsers = async () => {
    const { data: res } = await axios.get(
      "https://nodejs-jwt-prueba.vercel.app/api/users",
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    setGetUsers(res);
  };

  //*Ads View =>User

  useEffect(() => {
    rutaActual = router.asPath;
    const getAds = async () => {
      const { data: res } = await axios.get(
        "https://nodejs-jwt-prueba.vercel.app/api/ads"
      );
      setGetAds(res);
    };

    rutaActual == "/profile" ? setContentId("HomeUser") : setContentId("home");
    rutaActual == "/adminView"
      ? setContentId("HomeAdmin")
      : setContentId("home");

    if (rutaActual == "/adminView") {
      getAllUsers();
    }
    getAds();
  }, [rutaActual, getUsers]);

  //* Peril usuario

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;

    // Copia actual de userUpt
    const updatedUserUpt = { ...userUpt };

    if (name == "profileImage") {
      setFile(e.target.files[0]);
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

    const updateUser = async () => {
      try {
        const { data: res } = await axios.patch(
          `https://nodejs-jwt-prueba.vercel.app/api/users/${userLogged._id}`,
          formData,
          {
            headers: {
              "x-access-token": token,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };

    updateUser();
  };

  const deleteUser = async (id) => {
    try {
      const { data: res } = await axios.delete(
        `https://nodejs-jwt-prueba.vercel.app/api/users/${id}`,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  // cerrado de sesion

  const logOut = () => {
    if (rutaActual == "/adminView") {
      localStorage.removeItem("admin");
      localStorage.removeItem("token");
      router.push("/");
    } else {
      localStorage.removeItem("usuario");
      localStorage.removeItem("token");
      router.push("/");
    }
  };

  return (
    <appContext.Provider
      value={{
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
        handleUptSubmit,
        inputFileRef,
        setFile,

        //? Ads variable
        getAds,
        getUsers,

        //logOut
        logOut,

        //user
        deleteUser,
      }}
    >
      {children}
    </appContext.Provider>
  );
};
