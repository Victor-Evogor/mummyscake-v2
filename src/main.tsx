import { CssBaseline } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { FavoritesProvider } from "./providers/FavoritesProvider";
import { CartProvider } from "./providers/CartProvider";
import { OrderProvider } from "./providers/OrderProvider";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <CssBaseline />
    <FavoritesProvider>
      <CartProvider>
        <OrderProvider>
          <App />
        </OrderProvider>
      </CartProvider>
    </FavoritesProvider>
  </StrictMode>
);
