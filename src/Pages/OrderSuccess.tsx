import { Box, Typography } from "@mui/material"
import { NavBar } from "../components/NavBar/NavBar"
import { Footer } from "../components/Footer/Footer"
import { useUser } from "../hooks/useUser"
import { Navigate } from "react-router-dom"
import Lottie from "react-lottie";
import messageSent from "../lotties/message-sent-successfully-plane.json"

export const OrderSuccess = () => {
    const {user} = useUser();
    if(!user) return <Navigate to="/"/>
    return    <Box sx={{ flexGrow: 1 }}>
        <NavBar/>
        <Box maxWidth={"30%"} sx={{
            marginX: "auto"
        }}>
        <Lottie options={{
            animationData: messageSent,
            loop: false
        }}/>
        </Box>
        <Typography variant="h3" align="center" marginY={2}>Your order has been made successfully and is on it&apos;s way</Typography> 
        <Footer/>
    </Box>
}