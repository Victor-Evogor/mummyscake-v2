import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { NavBar } from "../components/NavBar/NavBar";
import { Footer } from "../components/Footer/Footer";
import { useUser } from "../hooks/useUser";
import { Navigate } from "react-router-dom";
import { useLottie } from "lottie-react";
import messageSent from "../lotties/message-sent-successfully-plane.json";

export const OrderSuccess = () => {
  const { user } = useUser();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { View } = useLottie({
    animationData: messageSent,
    loop: false,
  });

  if (!user) return <Navigate to="/" />;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <NavBar />
      <Box
        maxWidth={"30%"}
        sx={{
          marginX: "auto",
        }}
      >
        <>{View}</>
      </Box>
      <Typography variant={isMobile ? "h5" : "h3"} align="center" marginY={2}>
        Your order has been made successfully and is on it&apos;s way
      </Typography>
      <Footer />
    </Box>
  );
};
