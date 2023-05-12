import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import { ThemeProvider } from "@mui/material";
import { themes } from "./themes";
import { Provider } from "./GlobalStore";
import { NotFound } from "./Pages/NotFound";
import { SignIn } from "./Pages/SignIn";
import { CreateAccount } from "./Pages/CreateAccount";
import { CakePage } from "./Pages/CakePage";
import { FavoritesProvider } from "./providers/FavoritesProvider";
import { AdminPage } from "./Pages/AdminPage";

export const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={themes}>
        <Provider>
          <Routes>
            <Route
              index
              element={
                <FavoritesProvider>
                  <Home />
                </FavoritesProvider>
              }
            />
            <Route path="/log-in" element={<SignIn />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/cakes/:id" element={<CakePage />} />
            <Route path="/admin" element={<AdminPage/>}/>
          </Routes>
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
};
