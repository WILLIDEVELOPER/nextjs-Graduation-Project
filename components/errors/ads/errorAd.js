import { useRouter } from 'next/router'
import React from 'react'
export default function ErrorAd() {   
  const router = useRouter()
  return (
    <div className='flex flex-col text-center text-white font-bold'>
      <h1 className='text-2xl'>
        ERRO 404 PAGINA NO ENCONTRADA
      </h1>
      <a
          id="error"
          onClick={() =>{
            router.push("/")
          }}
          className="text-center text-slate-500 font-bold "
        >
          ¿No has iniciado sesion? <span className='font-bold text-blue-500 hover:underline cursor-pointer'>Click Aqui</span>
        </a>
    </div>
  )
}
