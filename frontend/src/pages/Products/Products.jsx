// src/components/Products.js
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from 'axios'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Products = ({ limite }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  //Hacer el seteado de los productos
  useEffect(()=>{
    const getProducts = async()=>{
      try {
        const response = await axios.get('http://localhost:5000/easycommerce/products');
        const data = response.data;
        setProductos(data)
      } catch (error) {
        setError(error.message);
      }finally{
        setLoading(false)
      }
    };
    getProducts();
  }, [])
  const productosAMostrar = limite ? productos.slice(0, limite) : productos;
  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div>
      <div className="flex flex-wrap justify-center">
        {productosAMostrar.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>
      <ToastContainer
        className="fixed top-4 right-4 z-50"
        position="top-right"
      />
    </div>
  );
};

export default Products;
