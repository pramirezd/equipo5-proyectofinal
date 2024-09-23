import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./userContext"; // Importa useAuth desde el userContext

// Inicializar el contexto
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useAuth(); // Obtén el usuario autenticado

  // Obtener el carrito al cargar el componente o cuando cambia el usuario
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
          setCart(response.data); // Guardar el carrito
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchCart(); // Ejecuta la función para obtener el carrito cuando cambia el usuario
  }, [user]); // Dependencia solo del usuario

  // Función para agregar un producto al carrito
  const addToCart = async (product) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/easycommerce/cart/add`,
        { userId: user.id, product },
        { withCredentials: true }
      );
      setCart(response.data); // Actualizar el carrito en el estado
    } catch (err) {
      console.log("Error al agregar producto al carrito:", err);
    }
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_APP_BACKEND_URL
        }/easycommerce/cart/remove/${productId}`,
        { withCredentials: true }
      );
      setCart(response.data); // Actualizar el carrito en el estado
    } catch (err) {
      console.log("Error al eliminar producto del carrito:", err);
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
