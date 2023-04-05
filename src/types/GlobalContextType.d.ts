import { User } from "firebase/auth";
import { SetState } from "./setState";

export interface GlobalContextType {
  user: User | null;
  setUser: SetState<User | null>;
}
