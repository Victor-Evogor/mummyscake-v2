import {
  createContext,
  useState,
  FunctionComponent,
  PropsWithChildren,
} from "react";
import { SetState } from "../types/setState";
import { CartItem } from "../types/Cart";

export interface CartContextType {
  cart: CartItem[];
  setCart: SetState<CartItem[]>;
}

export const CartStore = createContext<CartContextType | null>(null);


export const CartProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const { Provider } = CartStore;
  const [cart, setCart] = useState<CartItem[]>([]);
  return (
    <Provider
      value={{
        cart,
        setCart,
      }}
    >
      {children}
    </Provider>
  );
};
