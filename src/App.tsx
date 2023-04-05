import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import { ThemeProvider } from "@mui/material";
import { themes } from "./themes";
import { Provider } from "./GlobalStore";
import { NotFound } from "./Pages/NotFound";
import { SignIn } from "./Pages/SignIn";
import { CreateAccount } from "./Pages/CreateAccount";

export const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={themes}>
        <Provider>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/log-in" element={<SignIn/>}/>
            <Route path="/create-account" element={<CreateAccount/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
};
