export default function Login() {
  return (
    <div className="bg-[#161520] p-[2rem]">
      <h1 className="mb-[1.5rem] text-white text-center font-extrabold text-4xl p-[0.5rem]">
        Iniciar Sesion
      </h1>
      <form className="flex flex-col w-[30rem] gap-[1rem] text-white">
        <div className="flex flex-col gap-[0.5rem]">
          <label className="text-[1.2rem]"> Correo Electronico</label>
          <input
            className="px-[0.6rem] bg-transparent border-solid border-[1px] rounded-md placeholder:capitalize border-slate-600 py-[0.3rem]"
            type="text"
            placeholder="name@gmail.com"
          />
        </div>
        <div className="flex flex-col gap-[0.5rem]">
          <label className="text-[1.2rem]"> Contraseña</label>
          <input
            className="px-[0.6rem] bg-transparent border-solid border-[1px] rounded-md placeholder:capitalize border-slate-600 py-[0.3rem]"
            type="password"
            placeholder="********"
          />
        </div>
        <button className="bg-[#865DFF] mt-[1rem] text-[1.3rem] text-white font-bold hover:bg-[#9776f9]   h-[3.5rem] px-[0.9rem] py-[0.5rem] rounded-xl">
          Iniciar Sesion
        </button>
      </form>
    </div>
  );
}
