import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { FavoriteProvider } from "./context/favoriteContext.jsx";
import { CartProvider } from "./context/cartContext.jsx";
import { UserProvider } from "./context/userContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <FavoriteProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </FavoriteProvider>
    </UserProvider>
  </StrictMode>
);
