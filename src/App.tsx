import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import { ThemeProvider } from "@mui/material";
import { themes } from "./themes";
import { Provider } from "./GlobalStore";
import { NotFound } from "./Pages/NotFound";
import { SignIn } from "./Pages/SignIn";
import { CreateAccount } from "./Pages/CreateAccount";
import { CakePage } from "./Pages/CakePage";
import { AdminPage } from "./Pages/AdminPage";
import { OrderPage } from "./Pages/OrderPage";

export const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={themes}>
        <Provider>
          <Routes>
            <Route
              index
              element={
                  <Home />
              }
            />
            <Route path="/log-in" element={<SignIn />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/cakes/:id" element={<CakePage />} />
            <Route path="/admin" element={<AdminPage/>}/>
            <Route path="/order" element={<OrderPage/>}/>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
};
