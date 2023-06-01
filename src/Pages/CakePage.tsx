import { Footer } from "../components/Footer/Footer";
import { NavBar } from "../components/NavBar/NavBar";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CAKE } from "../gql/getCake.gql";
import { Cake } from "../types/Cake";
import { CakeDisplay } from "../components/CakeDisplay/CakeDisplay";
import { Container, Skeleton, Grid, Box } from "@mui/material";
import { Error } from "../components/ServerError/ServerError";

const Loading = () => {
  return (
    <Grid
      py={2}
      container
      columnSpacing={2}
      sx={{
        width: {
          xs: "100%",
        },
      }}
    >
      <Grid
        item
        md={4}
        sx={{
          width: {
            xs: "100%",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Skeleton
            variant="circular"
            width={50}
            height={50}
            animation="wave"
          />
          <Box
            sx={{
              width: "100%",
              marginLeft: "10px",
            }}
          >
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" width="70%" animation="wave" />
          </Box>
        </Box>
        <Skeleton
          variant="rectangular"
          height={120}
          sx={{
            my: "1rem",
          }}
          animation="wave"
        />
        <Skeleton variant="text" animation="wave" />
      </Grid>
      <Grid
        item
        md={8}
        sx={{
          width: {
            xs: "100%",
          },
        }}
      >
        <Skeleton height={64} />
        <Grid
          container
          columnSpacing={2}
          sx={{
            justifyContent: {
              xs: "flex-end",
              md: "initial",
            },
          }}
        >
          <Grid item xs={6}>
            <Skeleton variant="rectangular" height={80} />
          </Grid>
          <Grid item xs={6}>
            <Skeleton variant="rectangular" height={80} />
          </Grid>
        </Grid>
        <Skeleton
          variant="text"
          width="60%"
          sx={{
            marginTop: ".4rem",
          }}
        />
      </Grid>
    </Grid>
  );
};

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
      <NavBar />
      <Container>
        {loading ? (
          <Loading />
        ) : error ? (
          <Navigate to="Not found" />
        ) : !data ? (
          <Error />
        ) : (
          <CakeDisplay {...data.getCake} id={id} />
        )}
      </Container>
      <Footer />
    </>
  );
};
