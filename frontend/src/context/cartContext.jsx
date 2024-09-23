import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./userContext"; // Importa useAuth desde el userContext

// Inicializar el contexto
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useAuth(); // Obtén el usuario autenticado

  // Obtener los favoritos al cargar el componente
  useEffect(() => {
    const fetchCart = async () => {
      if (user && user.id) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_APP_BACKEND_URL}/easycommerce/cart/user/${
              user.id
            }`,
            { withCredentials: true }
          );
          setCart(response.data); // Guardar los productos favoritos
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
