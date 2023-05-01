import { User } from "firebase/auth";
import { SetState } from "./setState";
import { ReactNode } from "react";

export interface GlobalContextType {
  user: User | null;
  setUser: SetState<User | null>;
  modalItems: ReactNode;
  setModalItems: SetState<ReactNode>;
  isModalOpen: boolean,
  setIsModalOpen: SetState<boolean>
}
