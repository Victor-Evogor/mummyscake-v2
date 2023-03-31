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
} from "@mui/material";
import { MoreVert, ShoppingCart, Favorite } from "@mui/icons-material";
import eggMilkCake from "../../assets/egg-milk-cake.jpg";
import { FunctionComponent } from "react";

interface Cake {
  name: string;
  description: string;
  price: number;
  size: number;
}

const FeaturedItem: FunctionComponent<Cake> = ({
  name,
  description,
  price,
  size,
}) => {
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
          subheader={`${size} inches, ${price}`}
        />
        <CardContent >
            <CardMedia image={eggMilkCake} component="img" alt="" />
            <Typography component={"div"} minHeight={100}>{description}</Typography>
          <CardActions>
            <Button endIcon={<ShoppingCart />} variant="contained">
              Add to Cart
            </Button>
            <IconButton>
              <Favorite />
            </IconButton>
          </CardActions>
        </CardContent>
      </Card>
    </Grid>
  );
};

export const Featured = () => {
  const cakes: Cake[] = [
    {
      name: "Red Velvet Cake",
      description:
        "Our moist and decadent red velvet cake is made with the finest cocoa and cream cheese frosting. It's the perfect indulgence for any occasion",
      price: 60,
      size: 9,
    },
    {
      name: "Carrot Cake",
      description:
        "Indulge in the rich and creamy flavors of our carrot cake, made with real carrots, cinnamon, and cream cheese frosting. A true classic!",
      price: 65,
      size: 10,
    },
    {
      name: "Lemon Blueberry Cake",
      description:
        "Our light and fluffy lemon blueberry cake is bursting with fresh berries and tangy lemon zest. It's a refreshing treat for any time of day",
      price: 65,
      size: 8,
    },
    {
      name: "Chocolate Fudge Cake",
      description:
        "Satisfy your sweet tooth with our rich and indulgent chocolate fudge cake, made with premium cocoa and topped with creamy ganache.",
      price: 62,
      size: 9,
    },
    {
      name: "Vanilla Bean Cake",
      description:
        "Delight in the subtle and sophisticated flavors of our vanilla bean cake, made with real vanilla beans and creamy vanilla buttercream frosting.",
      price: 60,
      size: 8,
    },
    {
      name: "Strawberry Short Cake",
      description:
        "Our classic strawberry shortcake is made with fresh strawberries, fluffy cake layers, and whipped cream. It's the perfect dessert for any summer day.",
      price: 65,
      size: 8,
    },
  ];

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
        <Grid container spacing={2} py={2}>
          {cakes.map((cake, i) => (
            <FeaturedItem key={i} {...cake} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
