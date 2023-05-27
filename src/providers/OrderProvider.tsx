import {
  createContext,
  useState,
  FunctionComponent,
  PropsWithChildren,
} from "react";
import { SetState } from "../types/setState";
import { OrderType } from "../types/Order";

export interface OrderContextType {
  orders: OrderType[];
  setOrders: SetState<OrderType[]>;
}

export const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const { Provider } = OrderContext;
  const [orders, setOrders] = useState<OrderType[]>([]);

  return (
    <Provider
      value={{
        orders,
        setOrders,
      }}
    >
      {children}
    </Provider>
  );
};
