import ContentU from "@/components/Users/Content";
import NavbarU from "@/components/Users/Navbar";
import { appContext } from "@/Context/AppContext";
import { useContext } from "react";

export default function Home() {
  const { contentId } = useContext(appContext);
  return (
    <>
      <section className="w-screen flex flex-col gap-[1rem] h-screen bg-cover  bg-[#1e1c2b]">
        <NavbarU />
        <ContentU ruta={contentId} />
      </section>
    </>
  );
}
