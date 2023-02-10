export default function Login() {
  return (
    <div className="w-full relative ">
      <div className="w-full h-full fixed flex top-0 left-0 justify-center items-center">
        <div className="h-[55%] w-[50%]">
          <div className="w-full h-full bg-slate-800 flex justify-center items-center">
            <form className="h-5/6 p-5">
              <h1 className="capitalize text-white font-bold text-2xl mb-8 text-center">
                Inicia Sesión
              </h1>
              <input
                placeholder="Usuario"
                className="bg-slate-600 p-3 w-full mb-7 rounded-md"
              />
              <input
                placeholder="Contraseña"
                className="bg-slate-600 p-3 w-full mb-7 rounded-md"
              ></input>
              <button
                type="submit"
                className="bg-blue-600 mt-3 w-full px-4 py-2 text-white rounded-md hover:bg-indigo-400"
              >
                Entrar
              </button>
              <a className="mt-2 flex justify-center hover:underline text-slate-400 hover:text-slate-600">
                Crear Una Cuenta
              </a>
            </form>
          </div>
        </div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt=""
      />
    </div>
  );
}
