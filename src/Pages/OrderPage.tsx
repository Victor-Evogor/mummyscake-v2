import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { NavBar } from "../components/NavBar/NavBar";
import { Footer } from "../components/Footer/Footer";
import { useCart } from "../hooks/useCart";
import format from "format-number";
import { CartItem } from "../types/Cart";
import { Navigate, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/user";

export const OrderPage = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const {user} = useUser();

    if(!user) return <Navigate to="/"/>

  return (
    <Box sx={{ flexGrow: 1 }}>
      <NavBar />
      <Container>
        <Typography variant="h3" align="center" marginY={2}>
          Make An Order
        </Typography>
        <Typography align="center" variant="h4">
          {format({ decimal: ".", round: 2, prefix: "$" })(
            (cart as Pick<CartItem, "price" | "quantity">[]).reduce(
              (prev, { price, quantity }) => ({
                price: prev.price + quantity * price,
                quantity,
              }),
              { price: 0, quantity: 0 }
            ).price
          )}
        </Typography>

        <List sx={{
            backgroundColor: "#EAEFD3"
        }}>
          {cart.map((cartItem) => (
            <ListItem key={cartItem.id}>
              <ListItemButton>
                <ListItemText primary={cartItem.name} secondary={cartItem.price}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{
            display: "flex",
            justifyContent: "center"
        }} marginY={2}>
            <Button variant="contained">Proceed</Button>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};
