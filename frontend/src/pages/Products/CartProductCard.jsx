import React, { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/userContext";
import { useCart } from "../../context/cartContext";
import axios from "axios"; // Para hacer las solicitudes HTTP

const CartProductCard = ({ producto }) => {
  const { user } = useAuth(); // Obtener el usuario autenticado
  const { cart, setCart } = useCart(); // Obtener el carrito y la función para actualizarlo

  // Función para manejar la eliminación de productos del carrito
  const handleRemoveClick = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_BACKEND_URL}/easycommerce/cart/user/${
          user.id
        }/product/${producto.product_id}`,
        { withCredentials: true }
      );
      // Actualizar el carrito localmente después de la eliminación
      setCart(cart.filter((p) => p.product_id !== producto.product_id));
    } catch (error) {
      console.error("Error al eliminar producto del carrito:", error);
    }
  };

  const handleAddSubClick = async ({ sign }) => {
    const quantityChange = sign === "+" ? 1 : -1;

    // Evita sumar si la cantidad ya es igual al stock
    if (sign === "+" && producto.quantity >= producto.stock) {
      return; // No permite aumentar la cantidad si alcanza el máximo de stock
    }

    // Evita restar si la cantidad ya es 1
    if (sign === "-" && producto.quantity <= 1) {
      return; // No permite disminuir la cantidad por debajo de 1
    }

    try {
      const result = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/easycommerce/cart/user/${
          user.id
        }`,
        {
          product_id: producto.product_id,
          quantity: quantityChange,
        },
        { withCredentials: true }
      );
      console.log(result);

      // Actualiza el estado del carrito
      setCart((prevCart) => {
        // Encuentra el producto en el carrito
        const productInCart = prevCart.find(
          (p) => p.product_id === producto.product_id
        );

        if (productInCart) {
          // Si el producto está en el carrito, actualiza su cantidad
          const updatedQuantity = productInCart.quantity + quantityChange;

          // Si la cantidad es 0 o menor, eliminar el producto del carrito
          if (updatedQuantity <= 0) {
            return prevCart.filter((p) => p.product_id !== producto.product_id);
          } else {
            // Si la cantidad es mayor a 0, actualiza la cantidad
            return prevCart.map((p) =>
              p.product_id === producto.product_id
                ? { ...p, quantity: updatedQuantity }
                : p
            );
          }
        }

        // Si el producto no está en el carrito, agregarlo con la cantidad inicial
        return [...prevCart, { ...producto, quantity: 1 }];
      });
    } catch (error) {
      console.error("Error al actualizar la cantidad en el carrito:", error);
    }
  };

  return (
    <div className="rounded-3xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4 ">
      <div className="col-span-12 lg:col-span-2 img box">
        <img
          src={producto.img_url}
          alt={producto.name}
          className="max-lg:w-full lg:w-[180px] rounded-lg object-cover"
        />
      </div>
      <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
        <div className="flex items-center justify-between w-full mb-4">
          <h5 className="font-manrope font-bold text-2xl leading-9 text-gray-900">
            {producto.name}
          </h5>
          <button
            className="rounded-full group flex items-center justify-center focus-within:outline-red-500"
            onClick={() => handleRemoveClick(producto)}
          >
            <svg
              width={34}
              height={34}
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="fill-red-50 transition-all duration-500 group-hover:fill-red-400"
                cx={17}
                cy={17}
                r={17}
                fill=""
              />
              <path
                className="stroke-red-500 transition-all duration-500 group-hover:stroke-white"
                d="M14.1673 13.5997V12.5923C14.1673 11.8968 14.7311 11.333 15.4266 11.333H18.5747C19.2702 11.333 19.834 11.8968 19.834 12.5923V13.5997M19.834 13.5997C19.834 13.5997 14.6534 13.5997 11.334 13.5997C6.90804 13.5998 27.0933 13.5998 22.6673 13.5997C21.5608 13.5997 19.834 13.5997 19.834 13.5997ZM12.4673 13.5997H21.534V18.8886C21.534 20.6695 21.534 21.5599 20.9807 22.1131C20.4275 22.6664 19.5371 22.6664 17.7562 22.6664H16.2451C14.4642 22.6664 13.5738 22.6664 13.0206 22.1131C12.4673 21.5599 12.4673 20.6695 12.4673 18.8886V13.5997Z"
                stroke="#EF4444"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <p className="font-normal text-base leading-7 text-gray-500 mb-6">
          {producto.description}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleAddSubClick({ sign: "-" })}
              className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300"
            >
              <svg
                className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                width={18}
                height={19}
                viewBox="0 0 18 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.5 9.5H13.5"
                  stroke=""
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <input
              type="text"
              id="number"
              className="border border-gray-200 rounded-full w-10 aspect-square outline-none text-gray-900 font-semibold text-sm py-1.5 px-3 bg-gray-100  text-center"
              placeholder={producto.quantity}
            />
            <button
              onClick={() => handleAddSubClick({ sign: "+" })}
              className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300"
            >
              <svg
                className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                width={18}
                height={19}
                viewBox="0 0 18 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.75 9.5H14.25M9 14.75V4.25"
                  stroke=""
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 text-right">
            {producto.price * producto.quantity}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
