import { useContext } from "react"
import {CartStore, CartContextType} from "../providers/CartProvider";

export const useCart = ()=> {
    const {cart, setCart} = useContext(CartStore) as CartContextType;
    return {cart, setCart}
}