import { appContext } from "@/Context/AppContext";
import { useContext } from "react";

export default function Register() {
  const { error, handleContent, handleRegSubmit, handleRegChange } =
    useContext(appContext);
  return (
    <div className="bg-[#161520] p-[2rem]">
      <h1 className="mb-[1.5rem] text-white text-center font-extrabold text-4xl p-[0.5rem]">
        Iniciar Sesion
      </h1>
      <form
        onSubmit={handleRegSubmit}
        className="flex flex-col w-[30rem] gap-[1rem] text-white"
      >
        <div className="flex flex-col gap-[0.5rem]">
          <label className="text-[1.2rem]"> Nombre de Usuario</label>
          <input
            id="username"
            name="username"
            required
            onChange={handleRegChange}
            className="px-[0.6rem] bg-transparent border-solid border-[1px] rounded-md placeholder:capitalize border-slate-600 py-[0.3rem]"
            type="text"
            placeholder="Nombre de usuario"
          />
        </div>
        <div className="flex flex-col gap-[0.5rem]">
          <label className="text-[1.2rem]"> Correo Electronico</label>
          <input
            id="email"
            name="email"
            required
            onChange={handleRegChange}
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
            onChange={handleRegChange}
            className="px-[0.6rem] bg-transparent border-solid border-[1px] rounded-md  border-slate-600 py-[0.3rem]"
            type="password"
            placeholder="**************"
          />
        </div>
        <div className="flex flex-col gap-[0.5rem]">
          <label
            for="roles"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Roles
          </label>
          <select
            id="roles"
            name="roles"
            onChange={handleRegChange}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Selecciona un Rol</option>
            <option value="admin">Admin</option>
            <option value="egresado">Egresado</option>
            <option value="lider universitario">Lider Universitario</option>
            <option value="admin, lider universitario">Admin, Lider Universitario</option>
          </select>
          <p className="mt-[0.5rem] text-center text-white font-bold text-xl">
            {error}
          </p>
        </div>
        <button
          type="submit"
          className="bg-[#865DFF] mt-[1rem] text-[1.3rem] text-white font-bold hover:bg-[#9776f9]   h-[3.5rem] px-[0.9rem] py-[0.5rem] rounded-xl"
        >
          Registrar
        </button>
        <a
          id="login"
          onClick={handleContent}
          className="text-center cursor-pointer text-slate-500 font-bold hover:underline"
        >
          ¿Tienes una cuenta?
        </a>
      </form>
    </div>
  );
}
