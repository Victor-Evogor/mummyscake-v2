import { User } from "firebase/auth";
import { SetState } from "./setState";
import { CartItem } from "./Cart";

export interface GlobalContextType {
  user: User | null;
  setUser: SetState<User | null>;
}
