import { Google, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
  Grid,
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import { FunctionComponent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { signInWithGoogle } from "../../firebase";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import {
  CREATE_NEW_USER,
  CreateNewUserType,
} from "../../gql/createNewUser.gql";
import { useCart } from "../../hooks/useCart";
import { quantifyCakes } from "../../utils/quantifyCake";

interface Props {
  type: "sign in" | "create account";
  onSubmit: (cred: {
    email: string;
    password: string;
    fullName?: string;
    phone?: string;
  }) => void;
}

export const AuthForm: FunctionComponent<Props> = ({ type, onSubmit }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const fullName = useRef<HTMLInputElement>(null);
  const [createNewUser] = useMutation<CreateNewUserType>(CREATE_NEW_USER);
  const { setCart } = useCart();
  const [isFullNameValid, setIsFullNameValid] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("+234");

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePhoneChange = (newPhone: string) => {
    setPhone(newPhone);
    matchIsValidTel(newPhone);
  };

  return (
    <Paper
      variant="elevation"
      elevation={3}
      sx={{
        width: "65%",
      }}
    >
      <Container>
        <Typography
          variant={isMobile ? "h5" : "h3"}
          my={2}
          textAlign="center"
          sx={{
            textTransform: "capitalize",
          }}
        >
          {type}
        </Typography>
        <Divider />
        <Box
          component="form"
          my={3}
          onSubmit={(e) => {
            e.preventDefault();
            if (!matchIsValidTel(phone) && type === "create account") {
              toast.error("Invalid Phone number", { hideProgressBar: true });
            }
            if (
              !passwordRef.current?.value ||
              !emailRef.current?.value ||
              !isFullNameValid ||
              (type === "create account"
                ? !fullName.current?.value || !matchIsValidTel(phone)
                : false)
            )
              return;
            const cred = {
              password: passwordRef.current?.value,
              email: emailRef.current?.value,
              fullName: fullName.current?.value.trim(),
              phone: phone,
            };
            onSubmit(cred);
          }}
        >
          <Grid container spacing={3}>
            <Grid item md={6}>
              <TextField
                required
                placeholder="******"
                label="email"
                type="email"
                inputRef={emailRef}
                sx={{
                  width: "100%",
                }}
              />
            </Grid>

            <Grid item md={6}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  inputRef={passwordRef}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="password"
                />
              </FormControl>
            </Grid>

            {type === "create account" ? (
              <>
                <Grid item md={6}>
                  <TextField
                    required
                    placeholder="John Doe"
                    label="Full Name"
                    type="text"
                    inputRef={fullName}
                    sx={{
                      width: "100%",
                    }}
                    error={!isFullNameValid}
                    helperText={
                      !isFullNameValid
                        ? "Please enter your first name and your surname, e.g John Doe"
                        : undefined
                    }
                    onChange={() => {
                      if (!fullName.current) return;
                      setIsFullNameValid(
                        fullName.current.value.split(" ").length > 1
                      );
                    }}
                    onBlur={() => {
                      if (!fullName.current) return;
                      fullName.current.value = fullName.current.value.trim();
                      setIsFullNameValid(
                        fullName.current.value.split(" ").length > 1
                      );
                    }}
                  />
                </Grid>

                <Grid item md={6}>
                  <MuiTelInput
                    value={phone}
                    onChange={handlePhoneChange}
                    autoFocus
                    placeholder="Phone number"
                  />
                </Grid>
              </>
            ) : (
              <></>
            )}
          </Grid>

          <ButtonGroup
            sx={{
              marginY: 2,
              marginX: {
                xs: "auto",
                md: 0,
              },
            }}
            orientation={isMobile ? "vertical" : "horizontal"}
          >
            <Button variant="contained" type="submit">
              {type}
            </Button>
            <Button
              startIcon={<Google />}
              onClick={() => {
                signInWithGoogle()
                  .then(({ user: { uid } }) => {
                    createNewUser({
                      variables: {
                        userId: uid,
                      },
                    }).then(({ data }) => {
                      if (!data) return;
                      const quantifiedCakes = quantifyCakes(
                        data.createUser.cart.items
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
                  })
                  .catch(({ message }: Error) => {
                    if (
                      message === "Firebase: Error (auth/popup-closed-by-user)."
                    ) {
                      toast.error("Pup up closed unexpectedly", {
                        hideProgressBar: true,
                      });
                    } else {
                      toast.error(
                        "An unexpected error ocurred, please check your internet connection"
                      );
                    }
                  });
              }}
            >
              Continue With Google
            </Button>
          </ButtonGroup>
          <Typography my={3}>
            {type === "sign in" ? (
              <span>
                Don&apos;t have an account?{" "}
                <Link to="/create-account" data-test-id="create-an-account">
                  create an account
                </Link>
              </span>
            ) : (
              <span>
                Have an account?{" "}
                <Link to="/log-in" data-test-id="sign-in">
                  Sign In
                </Link>
              </span>
            )}
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
};
