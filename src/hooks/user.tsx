import { useContext } from "react"
import { GlobalContext } from "../GlobalStore"
import { GlobalContextType } from "../types/GlobalContextType";

export const useUser = () => {
    const {user, setUser} = useContext(GlobalContext) as GlobalContextType;
    return {
        user,
        setUser
    }
}