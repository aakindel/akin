import "../styles/globals.scss";
import type { AppProps } from "next/app";
import MainDSProvider from "@mainds";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainDSProvider>
      <Component {...pageProps} />
    </MainDSProvider>
  );
}

export default MyApp;
