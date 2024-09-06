// src/components/ProductDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/userContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useAuth();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/easycommerce/products/product/${id}`
        );
        const data = response.data;
        setProducto(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
  
  const handleAddToCart = () => {
    if (producto) {
      addToCart(producto.id, 1); 
      toast.success("Producto Agregado al carrito")
    } else {
      toast.error("Error al agregar producto al carrito");
    }
  };

  if (loading) return <p>Loading Product...</p>;
  if (error) return <p>{error}</p>;
  if (!producto) return <p>Product not found</p>;

  return (
    <div className="flex flex-col items-center mt-32">
      <div className=" flex gap-20 p-11">
        <div>
          <img src={`http://localhost:5000/${producto.img_url}`} className="w-80 h-80" />
        </div>
        <div className="flex flex-col justify-center gap-4">
          <h1 className="text-2xl font-bold">{producto.name}</h1>
          <div>
            <p>{producto.description}</p>
            <p className="text-xl font-semibold text-green-600">
              ${producto.price}
            </p>
          </div>
          <div>
            <p className="text-lg font-semibold">
              {"\u00A9"} {producto.brand}
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
          <button
              onClick={handleAddToCart}
              className="w-full p-2 bg-blue-500 rounded-lg text-white font-semibold"
            >
              Add To Cart
            </button>
          </div>
        </div>
        <ToastContainer
        className="fixed top-4 right-4 z-50"
        position="top-right"
      />
      </div>
      
    </div>
  );
};

export default ProductDetail;
