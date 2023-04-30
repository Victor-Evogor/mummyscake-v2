import { useState, FunctionComponent } from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Box,
  Paper,
  Grid,
  Rating,
  Container,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";
import {
  Share as ShareIcon,
  ExpandMore as ExpandMoreIcon,
  Favorite as FavoriteIcon,
  ShoppingCart,
} from "@mui/icons-material";

import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Cake } from "../../types/Cake";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const CakeDisplay: FunctionComponent<Omit<Cake, "id">> = ({
  image,
  description,
  ingredients,
  name,
  allergens,
  delivery_info,
  flavors,
  nutritional_info,
  occasion,
  price,
  rating,
  reviews,
  size,
  weight,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid py={2} container>
      <Grid item xs={4}>
        <Card sx={{ width: "100%" }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <ShareIcon />
              </IconButton>
            }
            title={name}
            subheader={
              delivery_info.available ? (
                <Typography color={"success.main"}>Stock Available</Typography>
              ) : (
                <Typography color="error.main">Stock Unavailable</Typography>
              )
            }
          />
          <CardMedia
            component="img"
            height="194"
            image={`/cakes/${image}`}
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="ratings">
              <Rating value={rating} max={5} precision={0.1} readOnly />
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph fontWeight={600}>
                Ingredients:
              </Typography>
              <ul>
                {ingredients.map((ingredient, index) => {
                  return <li key={index}>{ingredient}</li>;
                })}
              </ul>

              <Typography paragraph fontWeight={600}>
                Flavors:
              </Typography>
              <ul>
                {flavors.map((flavor, index) => {
                  return <li key={index}>{flavor}</li>;
                })}
              </ul>

              <Typography paragraph fontWeight={600}>
                Nutrition:
              </Typography>
              <ul>
                <li>
                  <Typography component="span">Calories</Typography>:{" "}
                  {nutritional_info.calories}<Typography component="span" fontWeight={600}>g</Typography>
                </li>
                <li>
                  <Typography component="span">Fat</Typography>:{" "}
                  {nutritional_info.fat}<Typography component="span" fontWeight={600}>g</Typography>
                </li>
                <li>
                  <Typography component="span">Sugar</Typography>:{" "}
                  {nutritional_info.sugar}<Typography component="span" fontWeight={600}>g</Typography>
                </li>
                <li>
                  <Typography component="span">Protein</Typography>:{" "}
                  {nutritional_info.protein}<Typography component="span" fontWeight={600}>g</Typography>
                </li>
              </ul>

              <Typography paragraph fontWeight={600}>
                Allergens:
              </Typography>
              <ul>
                {allergens.map((allergen, index) => {
                  return <li key={index}>{allergen}</li>;
                })}
              </ul>
              <Typography paragraph fontWeight={600}>
                Size:
              </Typography>
              <ul>
                <li>
                  <Typography component="span">Diameter</Typography>:{" "}
                  {size.diameter}<Typography component="span" fontWeight={600}>in</Typography>
                </li>
                <li>
                  <Typography component="span">Height</Typography>:{" "}
                  {size.height}<Typography component="span" fontWeight={600}>in</Typography>
                </li>
                <li>
                  <Typography component="span">Serving size</Typography>:{" "}
                  {size.serving_size}
                </li>
              </ul>
              <Typography paragraph>
                <Typography component="span" fontWeight={600}>
                  Weight:
                </Typography>{" "}
                <Typography component="span">{weight}<Typography component="span" fontWeight={600}>lbs</Typography></Typography>
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>
      <Grid item xs={8}>
        <Container>
          <AppBar
            position="static"
            sx={{
              borderRadius: "1rem",
            }}
          >
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography>${price}</Typography>
              <Button
                endIcon={<ShoppingCart />}
                variant="contained"
                color="secondary"
              >
                Add to Cart
              </Button>
            </Toolbar>
          </AppBar>
          <Grid container spacing={2} py={2}>
            {reviews.map(({ comment, user }, index) => (
              <Grid item key={index} xs={Math.floor(12 / reviews.length)}>
                <Paper
                  key={index}
                  elevation={2}
                  sx={{
                    px: 2,
                    py: 2,
                  }}
                >
                  <Typography>{comment}</Typography>
                  <Typography
                    sx={{
                      fontStyle: "italic",
                    }}
                  >
                    &mdash; {user}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Typography>
            <Typography component={"span"} fontWeight={800}>
              Best Occasion:
            </Typography>{" "}
            {occasion}
          </Typography>
        </Container>
      </Grid>
    </Grid>
  );
};
