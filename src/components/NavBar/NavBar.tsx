import {
  AppBar,
  Badge,
  IconButton,
  Toolbar,
  Typography,
  styled,
  alpha,
  Button,
  Autocomplete,
  TextField,
  AutocompleteRenderInputParams,
  Drawer,
  Container,
  Avatar,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Collapse,
  ListItem,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  ExpandLess,
  ExpandMore,
  Mail,
  Menu,
  More,
  Notifications,
  Search as SearchIcon,
  ShoppingCart,
  Delete,
  Favorite,
  Money,
} from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../../hooks/user";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { Cake } from "../../types/Cake";
import { GET_ALL_CAKES_NAME } from "../../gql/getAllCakesName.gql";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { CartItem } from "../../types/Cart";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import format from "format-number";
import { useFavorite } from "../../hooks/useFavorite";
import { FavoriteItem } from "../FavoritePanel/FavoritePanel";
import { GET_ALL_CAKES_FAVORITE } from "../../gql/getAllCakesFavorite.gql";
import { getFavorites } from "../../utils/getFavorites";
import { CREATE_NEW_USER } from "../../gql/createNewUser.gql";
import { quantifyCakes } from "../../utils/quantifyCake";
import { REMOVE_FROM_CART } from "../../gql/removeFromCart.gql";

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledAutoComplete = styled(Autocomplete)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    marginLeft: "2rem",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const mockOptions = [
  { label: "cake 1" },
  { label: "cake 2" },
  { label: "cake 3" },
  { label: "cake 4" },
];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "17rem",
  },
}));

export const NavBar = () => {
  const { user } = useUser();
  const searchInput = useRef<HTMLInputElement>(null);
  const { data } = useQuery<{ getAllCakes: Cake[] }>(GET_ALL_CAKES_NAME);
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDrawerCartOpen, setIsDrawerCartOpen] = useState(true);
  const { cart, setCart } = useCart();
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const { favorites } = useFavorite();
  const favoritesResult = useQuery<{
    getAllCakes: {
      id: string;
      favorites: string[];
    }[];
  }>(GET_ALL_CAKES_FAVORITE);
  const { setFavorites } = useFavorite();
  const [createNewUser] = useMutation(CREATE_NEW_USER);
  const [removeFromCart] = useMutation(REMOVE_FROM_CART);

  useEffect(() => {
    if (!user) return;
    if (favoritesResult.data) {
      setFavorites(getFavorites(favoritesResult.data.getAllCakes, user.uid));
    }
    if (favoritesResult.error) {
      console.log(favoritesResult.error);
    }
    createNewUser({
      variables: {
        userId: user.uid,
      },
    }).then(({ data }) => {
      if (!data) return;
      const quantifiedCakes = quantifyCakes(data.createUser.cart.items);
      setCart(
        quantifiedCakes.map(({ name, price, quantity, id }) => ({
          name,
          price,
          quantity,
          id,
        }))
      );
    });
  }, [user]);

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
        }}
      >
        <Box
          sx={{
            width: "24rem",
            py: "1.3rem",
          }}
        >
          <Container>
            <Typography textAlign={"right"} gutterBottom>
              <Tooltip title={"Proceed to checkout"}>
                <Button>
                  cart value: {format({ decimal: ".", round: 2, prefix: "$" })(
                    (cart as Pick<CartItem, "price" | "quantity">[]).reduce(
                      (prev, { price, quantity }) => ({
                        price: prev.price + quantity * price,
                        quantity,
                      }),
                      { price: 0, quantity: 0 }
                    ).price
                  )}
                </Button>
              </Tooltip>
            </Typography>
            {user?.photoURL ? (
              <Avatar
                sx={{
                  mx: "auto",
                  width: "5rem",
                  height: "5rem",
                }}
                src={user?.photoURL}
              >
                {user?.displayName?.split(" ")[0][0]}
                {user?.displayName?.split(" ")[1][0]}
              </Avatar>
            ) : (
              <Avatar
                sx={{
                  mx: "auto",
                  width: "5rem",
                  height: "5rem",
                }}
              >
                {user?.displayName?.split(" ")[0][0]}
                {user?.displayName?.split(" ")[1][0]}
              </Avatar>
            )}
            <List>
              <ListItemButton
                onClick={() => {
                  setIsDrawerCartOpen(!isDrawerCartOpen);
                }}
              >
                <ListItemIcon>
                  <ShoppingCart />
                </ListItemIcon>
                <ListItemText primary="Cart" />
                {isDrawerCartOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={isDrawerCartOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {cart.map(({ quantity, price, name, id }, index) => {
                    return (
                      <Link
                        key={index}
                        to={`/cakes/${id}`}
                        style={{
                          textDecoration: "none",
                          color: "initial",
                        }}
                      >
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItem
                            secondaryAction={
                              <Tooltip title="remove one">
                                <IconButton
                                  edge="end"
                                  aria-label="delete"
                                  onClick={() => {
                                    if (!user) return navigate("/log-in");
                                    removeFromCart({
                                      variables: {
                                        userId: user.uid,
                                        cakeId: id,
                                      },
                                    }).then(({ data }) => {
                                      if (!data) return;
                                      const quantifiedCakes = quantifyCakes(
                                        data.removeFromCart.cart.items
                                      );
                                      setCart(
                                        quantifiedCakes.map(
                                          ({ name, price, quantity, id }) => ({
                                            name,
                                            price,
                                            quantity,
                                            id,
                                          })
                                        )
                                      );
                                    });
                                  }}
                                  onClickCapture={(e) => e.preventDefault()}
                                >
                                  <Delete />
                                </IconButton>
                              </Tooltip>
                            }
                          >
                            <ListItemText
                              primary={name}
                              secondary={
                                <Tooltip title={`${quantity} x ${price}`}>
                                  <span>
                                    {format({
                                      decimal: ".",
                                      round: 2,
                                      prefix: "$",
                                    })(quantity * price)}
                                  </span>
                                </Tooltip>
                              }
                            />
                          </ListItem>
                        </ListItemButton>
                      </Link>
                    );
                  })}
                </List>
              </Collapse>
              <ListItemButton
                onClick={() => {
                  setIsFavoritesOpen(!isFavoritesOpen);
                }}
              >
                <ListItemIcon>
                  <Favorite />
                </ListItemIcon>
                <ListItemText primary="Favorites" />
                {isFavoritesOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={isFavoritesOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {favorites.map((id) => (
                    <FavoriteItem id={id} key={id} />
                  ))}
                </List>
              </Collapse>
              <ListItemButton
                onClick={() => {
                  setIsOrderOpen(!isOrderOpen);
                }}
              >
                <ListItemIcon>
                  <Money />
                </ListItemIcon>
                <ListItemText primary="Orders" />
                {isOrderOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </List>
            <Button
              variant="contained"
              onClick={() => {
                setIsDrawerOpen(false);
                signOut(auth);
              }}
            >
              Sign Out
            </Button>
          </Container>
        </Box>
      </Drawer>
      <AppBar position="sticky">
        <Toolbar>
          {user ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => {
                setIsDrawerOpen(true);
              }}
            >
              <Menu />
            </IconButton>
          ) : (
            <></>
          )}
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              display: { xs: "none", sm: "block" },
              textDecoration: "none",
              color: "white.main",
            }}
            href="/"
          >
            Mummy&apos;s Cake
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledAutoComplete
              placeholder="Search…"
              options={
                data
                  ? data.getAllCakes.map((cake) => ({
                      label: cake.name,
                      id: cake.id,
                    }))
                  : mockOptions
              }
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  placeholder="Search a cake"
                  inputRef={searchInput}
                  key={params.id}
                  onClick={() => console.log(params.id)}
                />
              )}
              onChange={(_, value) => {
                const { id } = value as Pick<Cake, "name" | "id">;
                navigate(`/cakes/${id}`);
              }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {user ? (
              <>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <Badge badgeContent={user ? 4 : undefined} color="error">
                    <Mail />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={user ? 17 : undefined} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>
              </>
            ) : (
              ""
            )}
            {user ? (
              <></>
            ) : (
              <Link
                to="/log-in"
                style={{
                  textDecoration: "none",
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    color: "white.main",
                    borderColor: "white.main",
                  }}
                >
                  Log In
                </Button>
              </Link>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={""}
              aria-haspopup="true"
              onClick={() => undefined}
              color="inherit"
            >
              <More />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};
