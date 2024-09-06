import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

// Inicializar el contexto
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [autenticado, setAutenticado] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/easycommerce/users/myProfile",
          { withCredentials: true }
        );
        console.log("User data:", response.data);
        setUser(response.data);
        setAutenticado(true);
        setIsAdmin(response.data.isadmin);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setUser(null);
        setAutenticado(false);
        setIsAdmin(false);
      }
    };
    checkAuth();
  }, [autenticado]);
  //Funcion para obtener el carrito
  const getCart = async (userId) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/easycommerce/cart/",
        { withCredentials: true }
      );
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Error al obtener los productos");
      setCart([]);
    }
  };
  const addToCart = async (productId, quantity) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/easycommerce/cart/add",
        { productId, quantity },
        { withCredentials: true }
      );
      setCart(response.data.cart);
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
    }
  };
  const removeFromCart = async (cartProductId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/easycommerce/cart/remove/${cartProductId}`,
        { withCredentials: true }
      );
      setCart(cart.filter((item) => item.id !== cartProductId));
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };;
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/easycommerce/users/login",
        { email, password },
        { withCredentials: true }
      );
      setUser(response.data);
      setAutenticado(true);
      setIsAdmin(response.data.isadmin);
    } catch (error) {
      setUser(null);
      setAutenticado(false);
      setIsAdmin(false);
      throw error;
    }
  };
  const register = async (name, lastname, address, phone, email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/easycommerce/users/register",
        { name, lastname, address, phone, email, password },
        { withCredentials: true }
      );
      setUser(response.data);
      setAutenticado(true);
      setIsAdmin(response.data.isadmin);
    } catch (error) {
      setUser(null);
      setAutenticado(false);
      setIsAdmin(false);
    }
  };
  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/easycommerce/users/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      setAutenticado(false);
      setIsAdmin(false);
    } catch (error) {
      throw error;
    }
  };
  //Modificar usuario
  const updateUser = async (fieldsToUpdate) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/easycommerce/user/${user.id}`,
        fieldsToUpdate,
        { withCredentials: true }
      );
      setUser(response.data); // Actualiza el estado del usuario
      alert("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };


  
  //Obtener favoritos
  const fetchFavorites = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/easycommerce/favorites",
        { withCredentials: true }
      );
      setFavorites(response.data);
    } catch (error) {
      console.error("Error al obtener favoritos:", error);
    }
  }, []);
  //Seccion para los favoritos
  const addFavorite = async (productId) => {
    try {
      await axios.post(
        "http://localhost:5000/easycommerce/favorites/add",
        { productId },
        { withCredentials: true }
      );
    
      setFavorites([...favorites, { productId }]);
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  const removeFavorite = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:5000/easycommerce/favorites/product/${productId}`,
        { withCredentials: true }
      );
      setFavorites(favorites.filter((fav) => fav.productId !== productId));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        autenticado,
        isAdmin,
        favorites,
        login,
        register,
        logout,
        getCart,
        addToCart,
        removeFromCart,
        addFavorite,
        removeFavorite,
        fetchFavorites,
        updateUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
