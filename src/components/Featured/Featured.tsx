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
  Tooltip
} from "@mui/material";
import { MoreVert, Favorite } from "@mui/icons-material";
import { FunctionComponent } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_CAKES } from "../../gql/getAllCakesFull.gql";
import { Cake } from "../../types/Cake";
import { Skeleton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/user";

const FeaturedItem: FunctionComponent<Cake> = ({
  name,
  description,
  price,
  size,
  image,
  id,
}) => {
  const {user} = useUser()
  const navigate = useNavigate()

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
            <IconButton onClick={()=>{
              if(!user){
                navigate("/log-in")
                return
              }
            }}>
              <Favorite />
            </IconButton>
            </Tooltip>
          </CardActions>
        </CardContent>
      </Card>
    </Grid>
  );
};

const Loading = () => {
  return (
    <Grid container spacing={2} py={2}>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}></Grid>
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
        {loading ? (
          <span>Loading Page</span>
        ) : error ? (
          <span>error page</span>
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
