import { Box, Typography } from "@mui/material";
import { NavBar } from "../components/NavBar/NavBar";
import { AuthForm } from "../components/AuthForm/AuthForm";
import { Footer } from "../components/Footer/Footer";
import { signIn } from "../firebase";

import { Link, useNavigate, Navigate } from "react-router-dom";
import { useModal } from "../hooks/useModal";
import { useUser } from "../hooks/user";

export const SignIn = () => {
  const { user } = useUser();
  if (user) return <Navigate to="/" />;
  const { setModalItems, setIsModalOpen } = useModal();
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
          setModalItems(
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                User Not Found
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Try <Link to="/create-account">creating an account</Link>
              </Typography>

              <Typography sx={{ mt: 2 }}>Or recover an account</Typography>

            </>
          );
          setIsModalOpen(true);
        } else {
          setIsModalOpen(true);
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
          <AuthForm type="sign in" onSubmit={onSubmit} />
        </Box>
      </Box>
      <Footer />
    </>
  );
};
