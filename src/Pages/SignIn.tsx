import { Box } from "@mui/material";
import { NavBar } from "../components/NavBar/NavBar";
import { AuthForm } from "../components/AuthForm/AuthForm";
import { Footer } from "../components/Footer/Footer";
import { signIn } from "../firebase";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../hooks/user";
import { CartProvider } from "../providers/CartProvider";

export const SignIn = () => {
  const { user } = useUser();
  if (user) return <Navigate to="/" />;
  const navigate = useNavigate();

  const onSubmit = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    signIn(email, password)
      .then(() => {
        navigate("/");
      })
      .catch((error: Error) => {
        if (error.message === "Firebase: Error (auth/user-not-found).") {
          toast.error("Incorrect credentials", { hideProgressBar: true });
        }
      });
  };

  return (
    <>
    <CartProvider>
      <NavBar />
      </CartProvider>
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
          <AuthForm type="sign in" onSubmit={onSubmit} />
        </Box>
      </Box>
      <Footer />
    </>
  );
};
