import { Box } from "@mui/material";
import { useLottie } from "lottie-react";
import serverError from "../../lotties/internal-server-error.json";

export const Error = () => {
  const { View } = useLottie({
    animationData: serverError,
  });
  return (
    <Box>
      <>{View}</>
    </Box>
  );
};
