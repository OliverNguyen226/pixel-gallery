import "../styles/globals.css";
import SiteNavigation from "../components/SiteNavigation";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <SiteNavigation />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
