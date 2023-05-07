import { FunctionComponent, PropsWithChildren, createContext } from "react";
import { User } from "firebase/auth";
import { useState } from "react";
import { GlobalContextType } from "./types/GlobalContextType";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { apollo_server } from "./environment.json";
import { subscribeToUser } from "./firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const monitorUser = (user: User | null) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  };

  subscribeToUser(monitorUser);

  return (
    <Provider
      value={{
        user,
        setUser
      }}
    >
      <ApolloProvider client={client}>
        <ToastContainer />
        {children}
      </ApolloProvider>
    </Provider>
  );
};
