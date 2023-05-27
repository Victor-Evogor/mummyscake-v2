import { useContext } from "react";
import { OrderContext, OrderContextType } from "../providers/OrderProvider";

export const useOrder = () => {
  const { orders, setOrders } = useContext(OrderContext) as OrderContextType;

  return {
    orders,
    setOrders,
  };
};
