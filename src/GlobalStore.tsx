import { FunctionComponent, PropsWithChildren, createContext } from "react";
import { User } from "firebase/auth";
import { useState } from "react";
import { GlobalContextType } from "./types/GlobalContextType";

export const GlobalContext = createContext<GlobalContextType | null>(null);

export const Provider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const { Provider } = GlobalContext;

  return (
    <Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </Provider>
  );
};
