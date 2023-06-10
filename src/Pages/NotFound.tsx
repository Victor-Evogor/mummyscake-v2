import { useLottie } from "lottie-react";
import notFound from "../lotties/page-not-found.json";
import { Box } from "@mui/material";
import { NavBar } from "../components/NavBar/NavBar";
import { Footer } from "../components/Footer/Footer";

export const NotFound = () => {
  const { View } = useLottie({
    animationData: notFound,
  });
  return (
    <Box>
      <NavBar />
      <Box
        maxWidth={"40%"}
        sx={{
          marginX: "auto",
        }}
      >
        <>{View}</>
      </Box>
      <Footer />
    </Box>
  );
};
