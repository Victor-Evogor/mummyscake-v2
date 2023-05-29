import { Box } from "@mui/material"
import Lottie from "react-lottie"
import serverError from "../../lotties/internal-server-error.json"

export const Error = () => {
    return <Box>
      <Lottie options={{
        animationData: serverError
      }}/>
    </Box>
  }