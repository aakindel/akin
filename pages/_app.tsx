import "../styles/globals.scss";
import type { AppProps } from "next/app";
import MainDSProvider from "@mainds";
import { ThemeProvider } from "@/lib/next-themes-lib";

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
