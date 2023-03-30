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
  const [userLogged, setUserLogged] = useState({});

  //Todo: variables para rol usuario
  const [getAds, setGetAds] = useState([]);
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

  const inputFileRef = useRef();
  const [file, setFile] = useState(null);
  let data = {};
  let formData = new FormData();

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

  useEffect(() => {
    const storedData = localStorage.getItem("usuario");
    if (storedData) {
      setUserLogged(JSON.parse(storedData));
    }
  }, []);

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
      setUserRoles(["admin", "lider universitario"]);
    } else if (roles.includes("admin")) {
      setUserRoles(["admin"]);
    } else if (roles.includes("lider universitario")) {
      setUserRoles(["lider universitario"]);
    } else {
      setUserRoles([]);
    }
  };

  useEffect(() => {
    localStorage.setItem('usuario', JSON.stringify(userLogged));
  }, [userLogged]);

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
  const rutaActual = router.asPath;
  //*Ads View =>User

  useEffect(() => {
    const getAds = async () => {
      const { data: res } = await axios.get(
        "https://nodejs-jwt-prueba.vercel.app/api/ads"
      );
      setGetAds(res);
    };

    rutaActual == "/profile" ? setContentId("HomeUser") : setContentId("home");
    getAds();
  }, [rutaActual]);

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
    // Append the user's profile image file, if one has been selected
    if (file) {
      formData.append("profileImage", file);
    }

    // Append all other user information to the form data
    formData.append("username", userUpt.username);
    formData.append("email", userUpt.email);
    formData.append("password", userUpt.password);
    formData.append("jobTitle", userUpt.jobTitle);
    formData.append("sector", userUpt.sector);
    formData.append("country", userUpt.country);
    formData.append("city", userUpt.city);
    formData.append("about", userUpt.about);

    // Append the user's experience information to the form data
    userUpt.experience.forEach((experience, index) => {
      formData.append(`experience[${index}][title]`, experience.title);
      formData.append(`experience[${index}][company]`, experience.company);
      formData.append(
        `experience[${index}][description]`,
        experience.description
      );
    });

    // Append the user's personal information to the form data
    formData.append("fullName", userUpt.personalInfo.fullName);
    formData.append("birthdate", userUpt.personalInfo.birthdate);
    formData.append("address", userUpt.personalInfo.address);
    formData.append("phone", userUpt.personalInfo.phone);
    formData.append("linkedin", userUpt.personalInfo.linkedin);
    formData.append("website", userUpt.personalInfo.website);

    // Append the user's education information to the form data
    userUpt.education.forEach((education, index) => {
      formData.append(
        `education[${index}][institutionName]`,
        education.institutionName
      );
      formData.append(`education[${index}][degree]`, education.degree);
      formData.append(
        `education[${index}][fieldOfStudy]`,
        education.fieldOfStudy
      );
      formData.append(
        `education[${index}][activitiesAndSocieties]`,
        education.activitiesAndSocieties
      );
    });


    console.log(userUpt);

    
    const updateUser = async() =>{
      try {
        const { data: res } = await axios.patch(
          `https://nodejs-jwt-prueba.vercel.app/api/users/${userLogged._id}`,
          formData,
          {
            headers: {
              "x-access-token": token
            }
          }
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    
    updateUser()

    // Submit the form data to the server using an HTTP request
    // (implementation omitted)
  };

  // for (const key in userUpt) {
  //   if (key == "experience" || key == "education") {
  //     userUpt[key].forEach((element) => {
  //       for (const key in element) {
  //         console.log(`${key}: ${element[key]}`);
  //       }
  //     });
  //   } else if (key == "personalInfo") {
  //     for (const item in userUpt[key]) {
  //       console.log(`${item}: ${userUpt[key][item]}`);
  //     }
  //   } else {
  //     console.log(`${key}: ${userUpt[key]}`);
  //   }
  // }
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
      }}
    >
      {children}
    </appContext.Provider>
  );
};
