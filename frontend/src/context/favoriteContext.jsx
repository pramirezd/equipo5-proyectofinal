import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./userContext"; // Importa useAuth desde el userContext

// Inicializar el contexto
const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth(); // Obtén el usuario autenticado

  // Obtener los favoritos al cargar el componente
  useEffect(() => {
    const fetchFavorites = async () => {
      if (user && user.id) {
        try {
          const response = await axios.get(
            `${
              import.meta.env.VITE_APP_BACKEND_URL
            }/easycommerce/favorites/user/${user.id}`,
            {
              withCredentials: true, // Enviar cookies para autenticar al usuario
            }
          );
          setFavorites(response.data); // Guardar los productos favoritos
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchFavorites();
  }, [user]);

  return (
    <FavoriteContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => useContext(FavoriteContext);
