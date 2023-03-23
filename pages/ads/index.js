import ContentU from "@/components/Users/Content";
import NavbarU from "@/components/Users/Navbar";
import { appContext } from "@/Context/AppContext";
import { useContext } from "react";
import ErrorAd from "@/components/errors/ads/errorAd";

export default function Home() {
  const { contentId, userLogged} =
    useContext(appContext);
  return (
    <>
      {Object.keys(userLogged).length > 0 ? (
        <section className="w-screen flex flex-col gap-[1rem] h-screen bg-cover  bg-[#1e1c2b]">
          <NavbarU />
          <ContentU ruta={contentId} />
        </section>
      ) : (
        <div className="w-screen h-screen flex justify-center items-center">
          <ErrorAd />
        </div>
      )}
    </>
  );
}
