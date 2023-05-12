import { Footer } from "../components/Footer/Footer";
import { NavBar } from "../components/NavBar/NavBar";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CAKE } from "../gql/getCake.gql";
import { Cake } from "../types/Cake";
import { CakeDisplay } from "../components/CakeDisplay/CakeDisplay";
import { Container } from "@mui/material";
import { CartProvider } from "../providers/CartProvider";
import { FavoritesProvider } from "../providers/FavoritesProvider";

export const CakePage = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <Navigate to="Not found" />;
  const { data, error, loading } = useQuery<{ getCake: Cake }>(GET_CAKE, {
    variables: {
      id,
    },
  });
  return (
    <>
      <FavoritesProvider>
        <CartProvider>
          <NavBar />
        </CartProvider>
        <Container>
          {loading ? (
            <span>Loading Screen</span>
          ) : error ? (
            <Navigate to="Not found" />
          ) : !data ? (
            <span>error</span>
          ) : (
            <CartProvider>
              <CakeDisplay {...data.getCake} id={id} />
            </CartProvider>
          )}
        </Container>
      </FavoritesProvider>
      <Footer />
    </>
  );
};
