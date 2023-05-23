import { appContext } from "@/Context/AppContext";
import React, { useContext } from "react";

export default function ContentU() {
  const { getAds } = useContext(appContext);
  function isValidJson(jsonString) {
    try {
      const parsedJson = JSON.parse(jsonString);
      return !!parsedJson.url;
    } catch {
      return false;
    }
  }
  return (
    <div className="grid grid-cols-4 gap-[1rem] py-[0.5rem] px-[1.5rem] ">
      {getAds.map((ad) => (
        <div key={ad._id} className="flex flex-col  bg-[#161520]">
          <img
            src={
              isValidJson(ad.image)
                ? JSON.parse(ad.image)?.url
                : "https://i.imgur.com/gxw3HHE.png"
            }
            alt="Jese image"
          />
          <div className="text-white flex flex-col gap-[1.2rem] py-[1rem] px-[1.5rem]">
            <h1 className="font-bold text-2xl">{ad.titulo}</h1>
            <p className="text-justify">{ad.descripcion}</p>
            <div className="w-full flex justify-between">
              <h2 className="capitalize font-bold">{ad.tipo}</h2>
              <a href={ad?.url} className="font-bold cursor-pointer">
                Detalles
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
