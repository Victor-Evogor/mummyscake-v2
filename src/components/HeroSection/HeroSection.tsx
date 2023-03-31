import backgroundImg from "../../assets/background.jpg";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import animations from "../../animations/HeroAnimation.module.css"

export const Hero = () => {

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
      }}
      component="section"
      className={animations.hero}
    >
      <Box sx={{
        p: 10
      }}>
        <Typography variant="h1">Mummy&apos;s Cake</Typography>
        <Typography variant="h4" sx={{
            fontWeight: "bold"
        }}>
          We deliver the best cakes at affordable prices
          <br />
          Make your orders today
        </Typography>
      </Box>
    </Box>
  );
};
