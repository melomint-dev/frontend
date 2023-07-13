import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

import type { ReactNode } from "react";

interface IMusicContext {
  helli: () => void;
}

export const MusicContext = createContext<IMusicContext>({} as IMusicContext);

export const useMusicContext = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error("useMusicContext must be used within a MusicContextProvider");
  }
  return context;
};

export default function MusicContextProvider({
  children,
}: {
  children: ReactNode;
  network?: string;
}) {

  const [state, setState] = useState({});

  const helli = () => {
    console.log("helli");
  };

  const providerProps = useMemo(
    () => ({
      helli,
    }),
    [helli]
  );

  return (
    <MusicContext.Provider
      value={{
        ...providerProps,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}
