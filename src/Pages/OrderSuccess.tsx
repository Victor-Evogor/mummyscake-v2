import { Box } from "@mui/material"
import { NavBar } from "../components/NavBar/NavBar"
import { Footer } from "../components/Footer/Footer"
import { useUser } from "../hooks/useUser"
import { Navigate } from "react-router-dom"

export const OrderSuccess = () => {
    const {user} = useUser();
    if(!user) return <Navigate to="/"/>
    return    <Box sx={{ flexGrow: 1 }}>
        <NavBar/>
        <span>Your order has been made successfully and is on it&apos;s way</span> 
        <Footer/>
    </Box>
}