import { Footer } from "../components/Footer/Footer";
import { NavBar } from "../components/NavBar/NavBar";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CAKE } from "../gql/getCake.gql";
import { Cake } from "../types/Cake";
import { CakeDisplay } from "../components/CakeDisplay/CakeDisplay";
import { Container } from "@mui/material";

export const CakePage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, loading } = useQuery<{ getCake: Cake }>(GET_CAKE, {
    variables: {
      id,
    },
  });
  return (
    <>
      <NavBar />
      <Container>
      {loading ? (
        <span>Loading Screen</span>
      ) : error ? (
        <span>{JSON.stringify(error)}</span>
      ) : !data ? (
        <span>error</span>
      ) : (
        <CakeDisplay {...data.getCake} />
      )}
      </Container>
      <Footer />
    </>
  );
};
