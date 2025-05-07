import "@/styles/globals.css";
import { UserProvider } from "@/context/UserContext";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return <UserProvider>{getLayout(<Component {...pageProps} />)}</UserProvider>;
}

export default MyApp;