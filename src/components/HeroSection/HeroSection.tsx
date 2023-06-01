import backgroundImg from "../../assets/background.jpg";
import backgroundImgLg from "../../assets/background-lg.jpg";
import { Box } from "@mui/system";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import animations from "../../animations/HeroAnimation.module.css";

export const Hero = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        backgroundImage: `url(${isMobile ? backgroundImgLg : backgroundImg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
      }}
      component="section"
      className={animations.hero}
    >
      <Box
        sx={{
          p: {
            md: 10,
            xs: 5,
          },
        }}
      >
        <Typography
          variant={isMobile ? "h4" : "h1"}
          component="h1"
          sx={{
            fontWeight: "bold",
          }}
        >
          Mummy&apos;s Cake
        </Typography>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          sx={{
            fontWeight: "bold",
          }}
          component="p"
        >
          We deliver the best cakes at affordable prices
          <br />
          Make your orders today
        </Typography>
      </Box>
    </Box>
  );
};
