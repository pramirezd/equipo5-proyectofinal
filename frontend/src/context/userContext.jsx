import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";
import axios from "axios";

// Inicializar el contexto
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [autenticado, setAutenticado] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_APP_BACKEND_URL
          }/easycommerce/users/myProfile`,
          { withCredentials: true }
        );
        setUser(response.data);
        setAutenticado(true);
        setIsAdmin(response.data.isadmin);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setUser(null);
        setAutenticado(false);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/easycommerce/users/login`,
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
      throw new Error("Login failed. Please check your credentials.");
    }
  };

  const register = async (name, lastname, address, phone, email, password) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/easycommerce/users/register`,
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
      throw new Error("Registration failed.");
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/easycommerce/users/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
      setAutenticado(false);
      setIsAdmin(false);
    } catch (error) {
      throw new Error("Logout failed.");
    }
  };

  const authValue = useMemo(
    () => ({
      user,
      autenticado,
      isAdmin,
      login,
      register,
      logout,
    }),
    [user, autenticado, isAdmin]
  );

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <UserContext.Provider value={authValue}>{children}</UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
