import { Box } from "@mui/material"
import { NavBar } from "../components/NavBar/NavBar"
import { Footer } from "../components/Footer/Footer"
import { AuthForm } from "../components/AuthForm/AuthForm"

export const CreateAccount = () => {

    const onSubmit = (cred: {email: string, password: string}) =>{
        console.log(cred)
    }

    return <>
    <NavBar/>
    <Box
        sx={{
          backgroundColor: "white.main",
        }}
        py={3}
      >
        <Box sx={{
            display: "grid",
            placeItems: "center"
        }}>
          <AuthForm type="create account" onSubmit={onSubmit}/>
        </Box>
      </Box>
    <Footer/>
    </>
}