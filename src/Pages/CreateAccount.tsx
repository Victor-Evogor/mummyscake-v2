
import { Box } from "@mui/material";
import { NavBar } from "../components/NavBar/NavBar";
import { Footer } from "../components/Footer/Footer";
import { AuthForm } from "../components/AuthForm/AuthForm";
import { createAccount } from "../firebase";
import { useNavigate, Navigate } from "react-router-dom";
import { useUser } from "../hooks/user";
import { toast } from "react-toastify";

export const CreateAccount = () => {
  const { user } = useUser();
  if (user) return <Navigate to="/" />;
  const navigate = useNavigate();

  const onSubmit = ({
    email,
    password,
    fullName,
    phone,
  }: {
    email: string;
    password: string;
    fullName?: string;
    phone?: string;
  }) => {
    createAccount(email, password, fullName as string, phone as string).then(
      (user) => {
        console.log(user);
        navigate("/log-in");
      }
    ).catch(err => {
      if(err.message === "Firebase: Error (auth/email-already-in-use)."){
        toast.error("A user already exist with this email", { hideProgressBar: true });
      }
    });
  };


  return (
    <>
      <NavBar />
      <Box
        sx={{
          backgroundColor: "white.main",
        }}
        py={3}
      >
        <Box
          sx={{
            display: "grid",
            placeItems: "center",
          }}
        >
          <AuthForm type="create account" onSubmit={onSubmit} />
        </Box>
      </Box>
      <Footer />
    </>
  );
};
