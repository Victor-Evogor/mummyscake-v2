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
} from "@mui/material";
import { Box } from "@mui/system";
import {
  AccountCircle,
  Mail,
  Menu,
  More,
  Notifications,
  Search as SearchIcon,
} from "@mui/icons-material";
import { auth } from "../../firebase";
import {  useEffect, useRef } from "react";
import { useUser } from "../../hooks/user";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Cake } from "../../types/Cake";
import { GET_ALL_CAKES_NAME } from "../../gql/getAllCakesName.gql";

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
  {label: "cake 1"},
  {label: "cake 2"},
  {label: "cake 3"},
  {label: "cake 4"},
]

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
  const { user, setUser } = useUser();
  const searchInput = useRef<HTMLInputElement>(null);
  const { data } = useQuery<{ getAllCakes: Cake[] }>(GET_ALL_CAKES_NAME);

  useEffect(() => {
    onAuthStateChanged(auth, (userCred) => {
      if (userCred) {
        setUser(userCred);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
        >
          <Menu />
        </IconButton>
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
            options={data? data.getAllCakes.map(cake => ({label: cake.name})):mockOptions}
            renderInput={(params: AutocompleteRenderInputParams) => (
              <TextField {...params}  placeholder="Search a cake" inputRef={searchInput} key={params.id}/>
            )}
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
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={""}
              aria-haspopup="true"
              onClick={() => undefined}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
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
  );
};
