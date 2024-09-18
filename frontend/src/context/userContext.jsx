import React, { useState, createContext, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// Inicializar el contexto
const UserContext = createContext();
const API_URL = 'http://localhost:3000';

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [autenticado, setAutenticado] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/easycommerce/users/myProfile`,
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
      }
    };
    checkAuth();
  }, [autenticado]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${API_URL}/easycommerce/users/login`,
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
        `${API_URL}/easycommerce/users/register`,
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
      throw error;
    }
  };
  const logout = async () => {
    try {
      await axios.post(
        `${API_URL}/easycommerce/users/logout`,
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

  return (
    <UserContext.Provider
      value={{ user, autenticado, isAdmin, login, register, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(UserContext);
