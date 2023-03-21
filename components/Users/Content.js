import React from "react";

export default function ContentU() {
  return (
    <div className="grid grid-cols-4 gap-[1rem] py-[0.5rem] px-[1.5rem] ">
      <div className="flex flex-col  bg-[#161520]">
        <img
          src="https://images.pexels.com/photos/247899/pexels-photo-247899.jpeg"
          alt=""
        />
        <div className="text-white flex flex-col gap-[1.2rem] py-[1rem] px-[1.5rem]">
          <h1 className="font-bold text-2xl">Titulo</h1>
          <p className="text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo et
            minima tempore, eaque numquam vitae necessitatibus quas vel corporis
            officia eligendi. Deleniti tempora quia harum soluta quae fugit!
            Odit, pariatur porro non consequuntur nostrum officiis quibusdam
            sequi! Quisquam tenetur non expedita vel sint, eius ducimus, magnam
            quam animi saepe molestiae.
          </p>
          <div className="w-full flex justify-between">
            <h2 className="capitalize font-bold">eventos</h2>
            <button>Detalles</button>
          </div>
        </div>
      </div>
    </div>
  );
}
