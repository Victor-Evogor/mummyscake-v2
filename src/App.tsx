import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import { ThemeProvider } from "@mui/material";
import { themes } from "./themes";
import { Provider } from "./GlobalStore";

export const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={themes}>
        <Provider>
          <Routes>
            <Route index element={<Home />} />
          </Routes>
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
};
