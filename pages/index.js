import Content from "@/components/Home/Content";
import NavBar from "@/components/Home/NavBar";
import { appContext } from "@/Context/AppContext";
import { useContext } from "react";

export default function Home() {
  const { contentId } = useContext(appContext);
  return (
    <>
      <section className="w-screen flex flex-col h-screen bg-cover  bg-[url('https://images.pexels.com/photos/247899/pexels-photo-247899.jpeg')]">
        <NavBar />
        <Content ruta={contentId} />
      </section>
    </>
  );
}
