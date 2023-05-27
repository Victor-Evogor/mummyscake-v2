import { Box } from "@mui/material";
import { NavBar } from "../components/NavBar/NavBar";
import { Hero } from "../components/HeroSection/HeroSection";
import { Footer } from "../components/Footer/Footer";
import { Testimonials } from "../components/Testimonials/Testimonials";
import { Featured } from "../components/Featured/Featured";
import { useQuery } from "@apollo/client";
import { GET_ALL_CAKES_FAVORITE } from "../gql/getAllCakesFavorite.gql";
import { useFavorite } from "../hooks/useFavorite";
import { useEffect } from "react";
import { getFavorites } from "../utils/getFavorites";
import { useUser } from "../hooks/useUser";

export const Home = () => {
  const { data, error } = useQuery<{
    getAllCakes: {
      id: string;
      favorites: string[];
    }[];
  }>(GET_ALL_CAKES_FAVORITE);
  const { setFavorites } = useFavorite();
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;
    if (data) {
      setFavorites(getFavorites(data.getAllCakes, user.uid));
    }
    if (error) {
      // 
    }
  }, [user]);
  return (
    <Box sx={{ flexGrow: 1 }} bgcolor="white.main">
      <NavBar />
      <Hero />
      <Testimonials />
      <Featured />
      <Footer />
    </Box>
  );
};
