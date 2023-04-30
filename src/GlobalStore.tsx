import { FunctionComponent, PropsWithChildren, createContext } from "react";
import { User } from "firebase/auth";
import { useState } from "react";
import { GlobalContextType } from "./types/GlobalContextType";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { apollo_server } from "./environment.json";

export const GlobalContext = createContext<GlobalContextType | null>(null);
const client = new ApolloClient({
  uri: apollo_server,
  cache: new InMemoryCache(),
});

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
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </Provider>
  );
};
