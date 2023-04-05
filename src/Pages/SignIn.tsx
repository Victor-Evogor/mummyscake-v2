import { Box } from "@mui/material";
import { NavBar } from "../components/NavBar/NavBar";
import { AuthForm } from "../components/AuthForm/AuthForm";
import { Footer } from "../components/Footer/Footer";

export const SignIn = () => {
  const onSubmit = (cred: {email: string, password: string}) => {
    console.log(cred)
  }

  return (
    <>
      <NavBar />
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
          <AuthForm type="sign in" onSubmit={onSubmit}/>
        </Box>
      </Box>
      <Footer/>
    </>
  );
};
