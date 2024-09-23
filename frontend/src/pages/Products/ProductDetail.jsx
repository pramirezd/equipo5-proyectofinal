import React from "react";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { useFavorite } from "../../context/favoriteContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/userContext";
import { useCart } from "../../context/cartContext";

// URL de la API
const urlApi = `${
  import.meta.env.VITE_APP_BACKEND_URL
}/easycommerce/products/product`;

const Products = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { favorites } = useFavorite();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const { setCart, fetchCart } = useCart();
  const favoritesIds = favorites.map((p) => p.product_id);

  useEffect(() => {
    const fetchProduct = () => {
      const productoEncontrado = async () => {
        const response = await fetch(`${urlApi}/${id}`);
        const data = await response.json();
        setProducto(data);
      };
      if (productoEncontrado) {
        setProducto(productoEncontrado);
        setError(null);
      } else {
        setError("Producto no encontrado");
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;
  if (!producto) return <p>Producto no encontrado</p>;

  const handleAddToCart = async () => {
    try {
      // Agregar producto al carrito en el backend
      response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/easycommerce/cart/user/${
          user.id
        }`,
        {
          product_id: id,
          quantity: 1,
        },
        { withCredentials: true }
      );
      setCart(response.data);
      fetchCart();
      // Llamar a fetchCart después de agregar el producto
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-32">
      <div className="flex gap-20 p-11">
        <div>
          <img
            src={producto.img_url}
            alt={producto.nombre}
            className="w-64 h-64"
          />
        </div>
        <div className="flex flex-col justify-center gap-4">
          <h1 className="text-2xl font-bold">{producto.nombre}</h1>
          <div>
            <p>{producto.seller}</p>
            <p className="text-xl font-semibold text-green-600">
              ${producto.price}
              <p className="font-normal text-base leading-7 text-gray-500 mb-6">
                {producto.description}
              </p>
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
      </div>
    </div>
  );
};

export default Products;
