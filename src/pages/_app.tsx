import "@/styles/globals.css";
import { MantineProvider, ButtonStylesParams } from "@mantine/core";
import localFont from "next/font/local";
// import { GoogleOAuthProvider } from "@react-oauth/google";
import Head from "next/head";
import { RouterTransition } from "@/components/RouterTransition";
import { useEffect, useState } from "react";
import { AppProps } from "next/app";
import { Manrope } from "next/font/google";
import { Notifications } from "@mantine/notifications";

import FclContext from "@/context/MusicContext";
import { useUser } from "@/hooks/person.swr";

const manropeFont = Manrope({ subsets: ["latin"] });

import * as fcl from "@onflow/fcl";
import { useRouter } from "next/router";

fcl.config({
  "flow.network": "testnet",
  "accessNode.api": "https://access-testnet.onflow.org",
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
  "app.detail.title": "MeloMint",
  "0xMeloMint": "0x7d5835e221b85422",
});

export default function App({ Component, pageProps }: AppProps) {
  const { userData, isUserDataLoading, errorFetchingUserData } = useUser();

  const router = useRouter();

  useEffect(() => {
    console.log("router", router.pathname);
  }, [router.pathname]);

  useEffect(() => {
    console.log(userData, isUserDataLoading, errorFetchingUserData);
  }, [userData, isUserDataLoading, errorFetchingUserData]);
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
              "#ebf6ff",
              "#9BB0C3",
              "#6487A4",
              "#283b4bb3",
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
        <Notifications />
        <FclContext>
          <RouterTransition />
          <Component {...pageProps} />
        </FclContext>
      </MantineProvider>
      {/* </GoogleOAuthProvider> */}
    </>
  );
}
