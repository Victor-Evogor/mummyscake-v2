import { Box } from "@mui/material";
import { NavBar } from "../components/NavBar/NavBar";
import { Hero } from "../components/HeroSection/HeroSection";
import { Footer } from "../components/Footer/Footer";
import { Testimonials } from "../components/Testimonials/Testimonials";
import { Featured } from "../components/Featured/Featured";
import { CartProvider } from "../providers/CartProvider";

export const Home = () => {
  return (
    <Box sx={{ flexGrow: 1 }} bgcolor="white.main">
      <CartProvider>
        <NavBar />
      </CartProvider>
      <Hero />
      <Testimonials />
      <Featured />
      <Footer />
    </Box>
  );
};
