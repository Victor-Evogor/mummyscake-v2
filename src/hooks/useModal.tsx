import { useContext } from "react"
import { GlobalContext } from "../GlobalStore";
import { GlobalContextType } from "../types/GlobalContextType";


export const useModal = () => {
    const {modalItems, setModalItems, isModalOpen, setIsModalOpen} = useContext(GlobalContext) as GlobalContextType;
    return {modalItems, setModalItems, isModalOpen, setIsModalOpen};
}