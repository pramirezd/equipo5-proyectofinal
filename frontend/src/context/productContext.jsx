import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/easycommerce/products", { withCredentials: true });
      setProducts(response.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      throw error;
    }
  };

  return (
    <ProductContext.Provider value={{ products, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
