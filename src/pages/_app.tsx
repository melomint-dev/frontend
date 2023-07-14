import "@/styles/globals.css";
import { MantineProvider, ButtonStylesParams } from "@mantine/core";
import localFont from "next/font/local";
// import { GoogleOAuthProvider } from "@react-oauth/google";
import Head from "next/head";
import { RouterTransition } from "@/components/RouterTransition";
import { useEffect, useState } from "react";
import { AppProps } from "next/app";
// import { useCookies } from "react-cookie";
import { Manrope } from "next/font/google";

import FclContext from "@/context/MusicContext";

const manropeFont = Manrope({ subsets: ["latin"] });

import * as fcl from "@onflow/fcl";

fcl.config({
  "flow.network": "testnet",
  "accessNode.api": "https://access-testnet.onflow.org",
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
  "app.detail.title": "MeloMint",
  "0xMeloMint": "0xd4701e0b1a6cb1e2"
});

export default function App({ Component, pageProps }: AppProps) {
  // const [cookies, setCookies] = useCookies();
  // const [user, setUserData] = useState(null);

  // useEffect(() => {
  //   const token = cookies.token;
  //   if (token && !user) {
  //     setUser(token);
  //   }
  // }, [cookies.token]);

  // const setUser = async (token) => {
  //   try {
  //     const data = await getUserData(token);
  //     setUserData(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <>
      <Head>
        <title>Melomint</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <style jsx global>{`
        * {
          font-family: ${manropeFont.style.fontFamily};
        }
      `}</style>
      {/* <GoogleOAuthProvider clientId={config.GOOGLE_CLIENT_ID}> */}

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Mantine theme override here */
          colorScheme: "light",
          colors: {
            primary: [
              "#E1E7EC",
              "#9BB0C3",
              "#6487A4",
              "#496780",
              "#364E62",
              "#283B4B",
              "#1C2832",
              "#131B22",
              "#0D1217",
              "#090D0F",
            ],
            secondary: [
              "#F1F3F5",
              "#CED8E0",
              "#A9BFD4",
              "#80AAD1",
              "#4F98DC",
              "#0F89F9",
              "#2676BF",
              "#356692",
              "#3B5873",
              "#3A4C5D",
            ],
            black: [
              "#000000",
              "#111111",
              "#222222",
              "#333333",
              "#444444",
              "#555555",
              "#666666",
              "#777777",
              "#888888",
              "#999999",
            ],
          },
          components: {
            Button: {
              styles: (theme, params: ButtonStylesParams, { variant }) => ({
                label: {
                  fontWeight: 500,
                },
              }),
            },
          },
          primaryShade: 5,
          primaryColor: "primary",
          fontFamily: manropeFont.style.fontFamily,
          defaultRadius: "var(--general-box-border-radius)",
          headings: {
            fontFamily: manropeFont.style.fontFamily,
            sizes: {
              h1: { fontSize: "var(--h1)" },
              h2: { fontSize: "var(--h2)" },
              h3: { fontSize: "var(--h3)" },
              h4: { fontSize: "var(--h4)" },
              h5: { fontSize: "var(--h5)" },
              h6: { fontSize: "var(--h6)" },
            },
          },
          fontSizes: {
            xs: "0.625rem",
            sm: "0.875rem",
            md: "1rem",
            lg: "1.125rem",
            xl: "1.25rem",
            xxl: "1.5rem",
          },
        }}
      >
        <FclContext>
          <RouterTransition />
          <Component {...pageProps} />
        </FclContext>
      </MantineProvider>
      {/* </GoogleOAuthProvider> */}
    </>
  );
}
