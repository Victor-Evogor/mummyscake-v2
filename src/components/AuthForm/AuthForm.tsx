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

interface Props {
  type: "sign in" | "create account";
  onSubmit: (cred: {
    email: string;
    password: string;
    username?: string;
  }) => void;
}

export const AuthForm: FunctionComponent<Props> = ({ type, onSubmit }) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
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
        <Typography variant="h3" my={2} textAlign="center" sx={{
          textTransform: "capitalize"
        }}>
          {type}
        </Typography>
        <Divider />
        <Box
          component="form"
          my={3}
          onSubmit={(e) => {
            e.preventDefault();
            if (!passwordRef.current?.value || !emailRef.current?.value) return;
            const cred = {
              password: passwordRef.current?.value,
              email: emailRef.current?.value,
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
