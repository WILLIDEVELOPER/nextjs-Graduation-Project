import "@/styles/globals.css";
import { AppProvider } from "@/Context/AppContext";

export default function App({ Component, pageProps }) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}
