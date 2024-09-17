import React from "react";
import { useAuth } from "../../context/userContext"; // Si tienes un contexto de autenticación
import { useCart } from "../../context/cartContext"; // Si tienes un contexto de carrito
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CarouselProductCard = ({
  id,
  name,
  description,
  price,
  image,
  brand,
}) => {
  const { user } = useAuth(); // Obtener el usuario autenticado
  const { cart, setCart } = useCart(); // Obtener y actualizar el carrito
  const quantity = 1; // Definir la cantidad a agregar

  const navigate = useNavigate();

  const handleAddToCart = async () => {
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
          product_id: id,
          quantity: quantity,
        },
        { withCredentials: true }
      );

      // Llamar a fetchCart después de agregar el producto
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-7">
      <div className="flex gap-3 rounded-lg p-7 shadow-lg">
        <div className="flex flex-col gap-3 rounded-lg p-4 shadow-xl">
          <p className="text-xl text-blue-500 font-semibold">Best Sellers</p>
          <div className="flex flex-col flex-grow w-[270px] p-2">
            <p className="text-lg font-semibold">{name}</p>
            <span className="font-semibold">{brand}</span>
            <p className="text-md font-light">{description}</p>
          </div>
          <div className="p-2"></div>
          <div className="flex items-center flex-grow p-2 gap-2">
            <p className="font-bold text-2xl text-green-600">${price}</p>
            <p className="font-thin">Credit or Debit</p>
          </div>
          <button
            onClick={handleAddToCart} // Llamada correcta a la función
            className="rounded-lg p-2 bg-blue-500 text-white"
          >
            Add To Cart
          </button>
        </div>
        <div className="">
          <img
            className="object-cover object-center w-full rounded-lg h-96 p-4"
            src={image}
            alt={name}
          />
        </div>
      </div>
    </div>
  );
};

export default CarouselProductCard;
