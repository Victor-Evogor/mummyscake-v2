import { FunctionComponent, PropsWithChildren, createContext, ReactNode } from "react";
import { User } from "firebase/auth";
import { useState } from "react";
import { GlobalContextType } from "./types/GlobalContextType";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { apollo_server } from "./environment.json";
import { Modal, Box } from "@mui/material";
import { subscribeToUser } from "./firebase";

export const GlobalContext = createContext<GlobalContextType | null>(null);
const client = new ApolloClient({
  uri: apollo_server,
  cache: new InMemoryCache(),
});

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const Provider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalItems, setModalItems] = useState<ReactNode>();
  const [user, setUser] = useState<User | null>(null);
  const { Provider } = GlobalContext;

  const monitorUser = (user: User | null) => {
    if(user){
      setUser(user);
      console.log("User already logged in");
    }else{
      setUser(null);
      console.log("User is logged out")
    }
  }

  subscribeToUser(monitorUser)

  return (
    <Provider
      value={{
        user,
        setUser,
        modalItems,
        setModalItems,
        isModalOpen,
        setIsModalOpen
      }}
    >
      
      <ApolloProvider client={client}>
      <Modal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <Box sx={style}>{modalItems}</Box>
      </Modal>
        {children}
        </ApolloProvider>
    </Provider>
  );
};
