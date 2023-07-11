import * as fcl from "@onflow/fcl";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

import type { ReactNode } from "react";

interface IFclContext {
  currentUser: typeof fcl.currentUser | null | undefined;
  connect: () => void;
  logout: () => void;
}

export const FclContext = createContext<IFclContext>({} as IFclContext);

export const useFclContext = () => {
  const context = useContext(FclContext);
  if (context === undefined) {
    throw new Error("useFclContext must be used within a FclContextProvider");
  }
  return context;
};

export default function FclContextProvider({
  children,
}: {
  children: ReactNode;
  network?: string;
}) {
  const [currentUser, setCurrentUser] = useState<null>(null);

  const connect = useCallback(() => {
    fcl.authenticate();
  }, []);

  const logout = useCallback(async () => {
    await fcl.unauthenticate();
  }, []);

  const providerProps = useMemo(
    () => ({
      connect,
      logout,
      currentUser,
    }),
    [connect, logout, currentUser]
  );

  return (
    <FclContext.Provider
      value={{
        ...providerProps,
      }}
    >
      {children}
    </FclContext.Provider>
  );
}
