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
  const [loading, setLoading] = useState(true); // Estado de carga
  const [autenticando, setAutenticando] = useState(false); // Estado para el login o registro

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

    // Ejecutar checkAuth solo si no estamos autenticando (login o registro)
    if (!autenticando) {
      checkAuth();
    }
  }, [autenticando]); // Ejecutar cuando el estado de autenticación cambia

  const login = async (email, password) => {
    setAutenticando(true);
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
      console.error("Error logging in:", error);
      setUser(null);
      setAutenticado(false);
      setIsAdmin(false);
      throw new Error("Login failed. Please check your credentials.");
    } finally {
      setAutenticando(false); // Autenticación completada
    }
  };

  const register = async (name, lastname, address, phone, email, password) => {
    setAutenticando(true);
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
      console.error("Error during registration:", error);
      setUser(null);
      setAutenticado(false);
      setIsAdmin(false);
      throw new Error("Registration failed.");
    } finally {
      setAutenticando(false); // Autenticación completada
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
    return <div>Cargando...</div>; // Mostrar indicador de carga mientras se verifica la autenticación
  }

  return (
    <UserContext.Provider value={authValue}>{children}</UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
