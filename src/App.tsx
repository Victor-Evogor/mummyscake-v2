import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import { ThemeProvider } from "@mui/material";
import { themes } from "./themes";

export const App = () => {
  return (
    <BrowserRouter>
    <ThemeProvider theme={themes}>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};
