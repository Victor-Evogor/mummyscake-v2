import Lottie from "react-lottie"
import notFound from "../lotties/page-not-found.json";
import { Box } from "@mui/material";
import { NavBar } from "../components/NavBar/NavBar";
import { Footer } from "../components/Footer/Footer";

export const NotFound = () => {
    return <Box>
        <NavBar/>
        <Box maxWidth={"40%"} sx={{
            marginX: "auto"
        }}>
        <Lottie options={{
            animationData: notFound
        }}/>
        </Box> 
        <Footer/>
    </Box>
}