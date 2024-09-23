import React, { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Para hacer las solicitudes HTTP
import { useAuth } from "../../context/userContext"; // Para obtener el usuario autenticado
import { useFavorite } from "../../context/favoriteContext";
import { useCart } from "../../context/cartContext";

const ProductCard = ({ producto }) => {
  const [isLiked, setIsLiked] = useState(false); // Estado inicial basado en isFavorite
  const { user } = useAuth(); // Obtener el usuario autenticado
  const { fetchCart } = useCart();
  const { favorites, setFavorites } = useFavorite(); // También necesitamos actualizar favorites
  const favoritesIds = favorites.map((p) => p.product_id);

  const navigate = useNavigate();

  // useEffect para inicializar isLiked solo cuando cambian los favoritos globales
  useEffect(() => {
    if (favoritesIds.includes(producto.id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [favoritesIds, producto.id]); // Solo ejecuta cuando cambian los favoritos globales o el producto

  // Función para manejar el clic del corazón
  const handleLikeClick = async () => {
    if (!user || !user.id) {
      navigate("/login");
      return;
    }

    const newLikedState = !isLiked;
    setIsLiked(newLikedState); // Cambia el estado de isLiked inmediatamente

    try {
      if (newLikedState) {
        // Si el producto no está marcado como favorito, hacer un POST
        await axios.post(
          `${
            import.meta.env.VITE_APP_BACKEND_URL
          }/easycommerce/favorites/user/${user.id}`,
          {
            product_id: producto.id,
          },
          { withCredentials: true } // Enviar cookies de autenticación si es necesario
        );
        console.log("Producto añadido a favoritos");

        // Actualizar el estado global de favoritos
        setFavorites([...favorites, { product_id: producto.id }]);
      } else {
        // Si el producto ya está marcado como favorito, hacer un DELETE
        await axios.delete(
          `${
            import.meta.env.VITE_APP_BACKEND_URL
          }/easycommerce/favorites/user/${user.id}/product/${producto.id}`,
          { withCredentials: true }
        );
        console.log("Producto eliminado de favoritos");

        // Actualizar el estado global de favoritos removiendo el producto
        setFavorites(favorites.filter((fav) => fav.product_id !== producto.id));
      }
    } catch (error) {
      console.error("Error al añadir/eliminar favorito:", error);
      setIsLiked(!newLikedState); // Volver al estado anterior si hay error
    }
  };

  const handleAddToCart = async (product_id) => {
    if (!user || !user.id) {
      navigate("/login");
      return;
    }
    try {
      // Agregar producto al carrito en el backend
      await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/easycommerce/cart/user/${
          user.id
        }`,
        {
          product_id: product_id,
          quantity: 1,
        },
        { withCredentials: true }
      );
      fetchCart();
      // Llamar a fetchCart después de agregar el producto
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
    }
  };

  return (
    <div className="relative m-4 p-4 rounded-lg shadow-md w-[250px] flex flex-col items-start transform transition-all duration-500 hover:-translate-y-2">
      <div className="absolute top-2 right-2">
        {isLiked ? (
          <AiFillHeart
            className="text-red-500 cursor-pointer text-2xl transition-colors duration-300"
            onClick={handleLikeClick}
          />
        ) : (
          <AiOutlineHeart
            className="text-red-400 hover:text-red-500 cursor-pointer text-2xl transition-colors duration-300"
            onClick={handleLikeClick}
          />
        )}
      </div>

      <div className="flex justify-center w-full">
        <img src={producto.img_url} alt={producto.name} className="w-32 h-32" />
      </div>
      <div className="flex flex-col gap-4 items-start w-full">
        <div>
          <p>{producto.name}</p>
          <div>
            <span className="font-semibold">{producto.brand}</span>
            <p className="text-2xl text-green-600 font-bold">
              ${producto.price}
            </p>
          </div>
        </div>
        <Link to={`/product/${producto.id}`}>
          <button className="font-semibold hover:underline">See Details</button>
        </Link>
        <button
          onClick={() => handleAddToCart(producto.id)}
          className="w-full rounded-lg p-2 bg-blue-500 text-white"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
