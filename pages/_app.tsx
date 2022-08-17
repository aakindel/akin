import "../styles/globals.scss";
import type { AppProps } from "next/app";
import MainDSProvider from "../design_systems/mainds";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainDSProvider>
      <Component {...pageProps} />
    </MainDSProvider>
  );
}

export default MyApp;
