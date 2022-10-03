import "../styles/globals.scss";
import type { AppProps } from "next/app";
import MainDSProvider from "@mainds";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      disableTransitionOnChange
      attribute="class"
      storageKey="akin-theme"
      defaultTheme="mds-light"
      themes={["mds-light", "mds-dark"]}
    >
      <MainDSProvider>
        <Component {...pageProps} />
      </MainDSProvider>
    </ThemeProvider>
  );
}

export default MyApp;
