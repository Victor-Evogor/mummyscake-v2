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

const mockCart: {name: string, price: number, quantity: number}[] = [
  {
    name: "Vanilla Red Vanilla Cake",
    price: 45.99,
    quantity: 2,
  },
  {
    name: "Strawberry Bean Cake",
    price: 30.99,
    quantity: 4
  },
  {
    name: "Coconut Milk Cake",
    price: 20.99,
    quantity: 6
  }
];

export const Provider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState(mockCart);
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
        setUser,
        cart,
        setCart
      }}
    >
      <ApolloProvider client={client}>
        <ToastContainer />
        {children}
      </ApolloProvider>
    </Provider>
  );
};
