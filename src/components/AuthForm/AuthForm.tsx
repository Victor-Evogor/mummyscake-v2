import { Google, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Grid,
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import { FunctionComponent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";

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
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const fullName = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("+234");

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePhoneChange = (
    newPhone: string
  ) => {
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
          variant="h3"
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
            if (
              !passwordRef.current?.value ||
              !emailRef.current?.value ||
              (type === "create account" ? !fullName.current?.value ||
              !matchIsValidTel(phone): false)
            )
              return;
            const cred = {
              password: passwordRef.current?.value,
              email: emailRef.current?.value,
              fullName: fullName.current?.value,
              phone: phone,
            };
            onSubmit(cred);
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={6}>
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

            <Grid item xs={6}>
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
                <Grid item xs={6}>
                  <TextField
                    required
                    placeholder=""
                    label="Full Name"
                    type="text"
                    inputRef={fullName}
                    sx={{
                      width: "100%",
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
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
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Remember password"
            />
          </FormGroup>
          <ButtonGroup>
            <Button variant="contained" type="submit">
              {type}
            </Button>
            <Button startIcon={<Google />}>Google Sign In</Button>
          </ButtonGroup>
          <Typography my={3}>
            {type === "sign in" ? (
              <span>
                Don&apos;t have an account?{" "}
                <Link to="/create-account">create an account</Link>
              </span>
            ) : (
              <span>
                Have an account? <Link to="/log-in">Sign In</Link>
              </span>
            )}
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
};
