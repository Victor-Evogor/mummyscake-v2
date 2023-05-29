import {
  Container,
  Typography,
  Box,
  Card,
  Grid,
  CardHeader,
  IconButton,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Tooltip,
} from "@mui/material";
import { MoreVert, Favorite, FavoriteBorder } from "@mui/icons-material";
import { FunctionComponent } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_CAKES } from "../../gql/getAllCakesFull.gql";
import { Cake } from "../../types/Cake";
import { Skeleton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useFavorite } from "../../hooks/useFavorite";
import { FAVORITE_CAKE } from "../../gql/favoriteCake.gql";
import { removeElementAtIndex } from "../../utils/removeElementAtIndex";
import { UN_FAVORITE_CAKE } from "../../gql/unFavoriteCake.gql";
import { Error } from "../ServerError/ServerError";

const FeaturedItem: FunctionComponent<Cake> = ({
  name,
  description,
  price,
  size,
  image,
  id,
}) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { setFavorites, favorites } = useFavorite();
  const [favorite] = useMutation(FAVORITE_CAKE);
  const [unFavorite] = useMutation(UN_FAVORITE_CAKE);

  return (
    <Grid item xs={4}>
      <Card
        sx={{
          backgroundColor: "white.main",
          height: "100%",
        }}
      >
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVert />
            </IconButton>
          }
          title={name}
          subheader={`${size.diameter} inches in diameter, $${price}`}
        />
        <CardContent>
          <Link to={`/cakes/${id}`}>
            <CardMedia image={`/cakes/${image}`} component="img" alt={name} />
          </Link>
          <Typography minHeight={100} variant="body2" fontSize={"1.2rem"}>
            {description}
          </Typography>
          <CardActions>
            <Link to={`/cakes/${id}`}>
              <Button variant="contained">View More</Button>
            </Link>
            <Tooltip title="Add to favorite">
              <IconButton
                onClick={() => {
                  if (!user) {
                    navigate("/log-in");
                    return;
                  }
                  if (!favorites.includes(id)) {
                    setFavorites([...favorites, id]);
                    favorite({
                      variables: {
                        userId: user.uid,
                        favoriteCakeId: id,
                      },
                    }).then(() => {
                      setFavorites([...favorites, id]);
                    });
                  } else {
                    setFavorites(
                      removeElementAtIndex(favorites, favorites.indexOf(id))
                    );
                    unFavorite({
                      variables: {
                        userId: user.uid,
                        favoriteCakeId: id,
                      },
                    });
                  }
                }}
              >
                {user ? (
                  favorites.includes(id) ? (
                    <Favorite color="error" />
                  ) : (
                    <FavoriteBorder color="error" />
                  )
                ) : (
                  <FavoriteBorder />
                )}
              </IconButton>
            </Tooltip>
          </CardActions>
        </CardContent>
      </Card>
    </Grid>
  );
};

const Loading = () => {
  const bgcolor = "primary.100"
  return (
    <Grid container spacing={2} py={2}>
      {(new Array(6)).fill(0).map((_, index)=><Grid item xs={4} key={index}>
        <Skeleton variant="text" height={40} sx={{
          bgcolor
        }} animation="wave"/>
        <Skeleton variant="text" width="60%" sx={{
          marginBottom: "1rem",
          bgcolor
        }} animation="wave"/>
        <Skeleton color="#fff" variant="rectangular" width={"100%"} height={150} sx={{
          bgcolor
        }} animation="wave"/>
        <Skeleton variant="text" sx={{
          marginTop: ".6rem",
          bgcolor
        }} animation="wave"/>
        <Skeleton variant="text" width="40%" sx={{
          bgcolor
        }} animation="wave"/>
        <Box sx={{
          display: "flex",
          gap: "5px",
          alignItems: "center"
        }}>
          <Skeleton variant="text" width="40%" height={50} sx={{
          bgcolor
        }} animation="wave"/>
          <Skeleton variant="circular" width={30} height={30} sx={{
          bgcolor
        }} animation="wave"/>
        </Box>
      </Grid>)}
    </Grid>
  );
};


export const Featured = () => {
  const { data, error, loading } = useQuery<{ getAllCakes: Cake[] }>(
    GET_ALL_CAKES,
    {
      variables: {
        limit: 6,
      },
    }
  );

  return (
    <Box bgcolor="primary.dark" color="white.main">
      <Container>
        <Typography
          variant="h3"
          textAlign="center"
          textTransform="capitalize"
          py={2}
        >
          trending cakes you should consider ordering
        </Typography>
        
        {
        loading ? (
          <Loading/>
        ) : error ? (
          <Error/>
        ) : (
          <Grid container spacing={2} py={2}>
            {data?.getAllCakes.map((cake, i) => (
              <FeaturedItem key={i} {...cake} />
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};
