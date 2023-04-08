import { appContext } from "@/Context/AppContext";
import { useContext } from "react";

export default function Login() {
  const {
    error,
    handleLogChange,
    handleLogSubmit,
    handleContent,
    adminLogged,
    setToken,
    userLogged,
    token
  } = useContext(appContext);

  if (Object.keys(adminLogged).length > 0) {
    localStorage.setItem("admin", JSON.stringify(adminLogged));
    localStorage.setItem("token", token);
  }else if (Object.keys(userLogged).length > 0) {
    localStorage.setItem("usuario", JSON.stringify(userLogged));
    localStorage.setItem("token", token);
  }

  return (
    <div className="bg-[#161520] p-[2rem]">
      <h1 className="mb-[1.5rem] text-white text-center font-extrabold text-4xl p-[0.5rem]">
        Iniciar Sesion
      </h1>
      <form
        onSubmit={handleLogSubmit}
        className="flex flex-col w-[30rem] gap-[1rem] text-white"
      >
        <div className="flex flex-col gap-[0.5rem]">
          <label className="text-[1.2rem]"> Correo Electronico</label>
          <input
            id="email"
            name="email"
            required
            onChange={handleLogChange}
            className="px-[0.6rem] bg-transparent border-solid border-[1px] rounded-md  border-slate-600 py-[0.3rem]"
            type="text"
            placeholder="name@gmail.com"
          />
        </div>
        <div className="flex flex-col gap-[0.5rem]">
          <label className="text-[1.2rem]"> Contraseña</label>
          <input
            id="password"
            name="password"
            required
            onChange={handleLogChange}
            className="px-[0.6rem] bg-transparent border-solid border-[1px] rounded-md placeholder:capitalize border-slate-600 py-[0.3rem]"
            type="password"
            placeholder="********"
          />
          <p className="mt-[0.5rem] text-center text-white font-bold text-xl">
            {error}
          </p>
        </div>
        <button
          type="submit"
          className="bg-[#865DFF] mt-[1rem] text-[1.3rem] text-white font-bold hover:bg-[#9776f9]   h-[3.5rem] px-[0.9rem] py-[0.5rem] rounded-xl"
        >
          Iniciar Sesion
        </button>
        <a
          id="register"
          onClick={handleContent}
          className="text-center cursor-pointer text-slate-500 font-bold hover:underline"
        >
          ¿No tienes una cuenta?
        </a>
      </form>
    </div>
  );
}
