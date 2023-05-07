import { createContext, useState, FunctionComponent, PropsWithChildren } from "react";
import { SetState } from "../types/setState";
import { CartItem } from "../types/Cart";

export interface CartContextType {
  cart: CartItem[];
  setCart: SetState<CartItem[]>;
}

export const CartStore = createContext<CartContextType | null>(null);

const mockCart: { name: string; price: number; quantity: number }[] = [
  {
    name: "Vanilla Red Vanilla Cake",
    price: 45.99,
    quantity: 2,
  },
  {
    name: "Strawberry Bean Cake",
    price: 30.99,
    quantity: 4,
  },
  {
    name: "Coconut Milk Cake",
    price: 20.99,
    quantity: 6,
  },
];

export const CartProvider: FunctionComponent<PropsWithChildren> = ({children}) => {
  const { Provider } = CartStore;
  const [cart, setCart] = useState(mockCart);
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
