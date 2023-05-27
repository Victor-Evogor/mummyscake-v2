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
import { useUser } from "../hooks/useUser";
import { useMutation } from "@apollo/client";
import { CREATE_ORDER } from "../gql/createOrder.gql";
import { useOrder } from "../hooks/useOrder";
import { EMPTY_CART } from "../gql/emptyCart.gql";

export const OrderPage = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const { user } = useUser();
  const [createOrder] = useMutation(CREATE_ORDER);
  const [emptyCart] = useMutation(EMPTY_CART);
  const { setOrders, orders } = useOrder();
  const { setCart } = useCart();

  if (!user) return <Navigate to="/" />;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <NavBar />
      <Container>
        {cart.length ? (
          <>
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

            <List
              sx={{
                backgroundColor: "#EAEFD3",
              }}
            >
              {cart.map((cartItem) => (
                <ListItem key={cartItem.id}>
                  <ListItemButton>
                    <ListItemText
                      primary={cartItem.name}
                      secondary={cartItem.price}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
              marginY={2}
            >
              <Button
                variant="contained"
                onClick={() => {
                  createOrder({
                    variables: {
                      userId: user.uid,
                      input: {
                        value: (
                          cart as Pick<CartItem, "price" | "quantity">[]
                        ).reduce(
                          (prev, { price, quantity }) => ({
                            price: prev.price + quantity * price,
                            quantity,
                          }),
                          { price: 0, quantity: 0 }
                        ).price,
                        items: cart,
                      },
                    },
                  }).then(({ data: { createOrder } }) => {
                    setOrders([...orders, createOrder]);
                    emptyCart({
                      variables: {
                        userId: user.uid,
                      },
                    }).then(({ data }) => {
                      if (!data) return;
                      setCart(data.emptyCart.cart.items);
                      navigate("/order-success");
                    });
                  });
                }}
              >
                Proceed
              </Button>
            </Box>
          </>
        ) : (
          <Typography variant="h3" align="center" marginY={2}>
            Your Cart Is Empty, Add to it
          </Typography>
        )}
      </Container>
      <Footer />
    </Box>
  );
};
