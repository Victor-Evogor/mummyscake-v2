import { useContext } from "react"
import { GlobalContext } from "../GlobalStore"
import { GlobalContextType } from "../types/GlobalContextType";

export const useCart = ()=> {
    const {cart, setCart} = useContext(GlobalContext) as GlobalContextType;
    return {cart, setCart}
}